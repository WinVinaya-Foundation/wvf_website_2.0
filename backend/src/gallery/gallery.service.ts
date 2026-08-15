import fs from 'fs';
import path from 'path';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';
import { UPLOADS_BASE_DIR } from './gallery.storage.js';

export interface CreateAlbumInput {
  title: string;
  categoryId: string;
  dateLabel: string;
  isActive?: boolean;
}

export interface UpdateAlbumInput {
  title?: string;
  categoryId?: string;
  dateLabel?: string;
  isActive?: boolean;
}

export interface NewPhotoInput {
  imageUrl: string;
  caption?: string;
  altText?: string;
}

function removeFileFromDisk(imageUrl: string) {
  try {
    if (imageUrl.startsWith('/uploads/')) {
      const relativePath = imageUrl.slice('/uploads/'.length);
      const fullPath = path.join(UPLOADS_BASE_DIR, relativePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
  } catch (err) {
    console.error(`Failed to remove gallery file from disk (${imageUrl}):`, err);
  }
}

const photosOrderBy = { sortOrder: 'asc' as const };

export const galleryService = {
  async getPublicAlbums() {
    return prisma.galleryAlbum.findMany({
      where: { isActive: true },
      include: { category: true, photos: { orderBy: photosOrderBy } },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getAllAdminAlbums() {
    return prisma.galleryAlbum.findMany({
      include: { category: true, photos: { orderBy: photosOrderBy } },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getAlbumById(id: string) {
    const album = await prisma.galleryAlbum.findUnique({
      where: { id },
      include: { category: true, photos: { orderBy: photosOrderBy } },
    });
    if (!album) {
      throw new HttpError(404, 'Gallery album not found');
    }
    return album;
  },

  async createAlbum(data: CreateAlbumInput, photos: NewPhotoInput[]) {
    return prisma.galleryAlbum.create({
      data: {
        title: data.title,
        categoryId: data.categoryId,
        dateLabel: data.dateLabel,
        isActive: data.isActive ?? true,
        photos: {
          create: photos.map((photo, index) => ({
            imageUrl: photo.imageUrl,
            caption: photo.caption || null,
            altText: photo.altText || null,
            sortOrder: index,
          })),
        },
      },
      include: { category: true, photos: { orderBy: photosOrderBy } },
    });
  },

  async updateAlbum(id: string, data: UpdateAlbumInput) {
    await this.getAlbumById(id);
    return prisma.galleryAlbum.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.dateLabel !== undefined && { dateLabel: data.dateLabel }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
      include: { category: true, photos: { orderBy: photosOrderBy } },
    });
  },

  async toggleAlbumStatus(id: string, isActive: boolean) {
    await this.getAlbumById(id);
    return prisma.galleryAlbum.update({
      where: { id },
      data: { isActive },
      include: { category: true, photos: { orderBy: photosOrderBy } },
    });
  },

  async deleteAlbum(id: string) {
    const album = await this.getAlbumById(id);
    for (const photo of album.photos) {
      removeFileFromDisk(photo.imageUrl);
    }
    return prisma.galleryAlbum.delete({ where: { id } });
  },

  async addPhotos(albumId: string, photos: NewPhotoInput[]) {
    const album = await this.getAlbumById(albumId);
    const startOrder = album.photos.length;
    await prisma.galleryPhoto.createMany({
      data: photos.map((photo, index) => ({
        albumId,
        imageUrl: photo.imageUrl,
        caption: photo.caption || null,
        altText: photo.altText || null,
        sortOrder: startOrder + index,
      })),
    });
    return this.getAlbumById(albumId);
  },

  async deletePhoto(albumId: string, photoId: string) {
    const photo = await prisma.galleryPhoto.findUnique({ where: { id: photoId } });
    if (!photo || photo.albumId !== albumId) {
      throw new HttpError(404, 'Gallery photo not found');
    }
    removeFileFromDisk(photo.imageUrl);
    await prisma.galleryPhoto.delete({ where: { id: photoId } });
    return this.getAlbumById(albumId);
  },
};
