import fs from 'fs';
import path from 'path';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';
import { EBOOK_UPLOADS_DIR } from './ebook.storage.js';

export interface CreateEbookInput {
  title: string;
  author: string;
  publishedAt?: string | Date;
  description: string;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  coverImageUrl?: string | null;
  isActive?: boolean;
}

export interface UpdateEbookInput {
  title?: string;
  author?: string;
  publishedAt?: string | Date;
  description?: string;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  coverImageUrl?: string | null;
  isActive?: boolean;
}

export const ebookService = {
  async getPublicEbooks() {
    return prisma.ebook.findMany({
      where: { isActive: true },
      orderBy: { publishedAt: 'desc' },
    });
  },

  async getAllAdminEbooks() {
    return prisma.ebook.findMany({
      orderBy: { publishedAt: 'desc' },
    });
  },

  async getEbookById(id: string) {
    const ebook = await prisma.ebook.findUnique({ where: { id } });
    if (!ebook) {
      throw new HttpError(44, 'E-book not found');
    }
    return ebook;
  },

  async createEbook(input: CreateEbookInput) {
    return prisma.ebook.create({
      data: {
        title: input.title.trim(),
        author: input.author.trim(),
        publishedAt: input.publishedAt ? new Date(input.publishedAt) : new Date(),
        description: input.description.trim(),
        fileUrl: input.fileUrl || null,
        fileName: input.fileName || null,
        fileSize: input.fileSize || null,
        coverImageUrl: input.coverImageUrl || null,
        isActive: input.isActive ?? true,
      },
    });
  },

  async updateEbook(id: string, input: UpdateEbookInput) {
    await this.getEbookById(id);

    return prisma.ebook.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title.trim() }),
        ...(input.author !== undefined && { author: input.author.trim() }),
        ...(input.publishedAt !== undefined && { publishedAt: new Date(input.publishedAt) }),
        ...(input.description !== undefined && { description: input.description.trim() }),
        ...(input.fileUrl !== undefined && { fileUrl: input.fileUrl }),
        ...(input.fileName !== undefined && { fileName: input.fileName }),
        ...(input.fileSize !== undefined && { fileSize: input.fileSize }),
        ...(input.coverImageUrl !== undefined && { coverImageUrl: input.coverImageUrl }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
      },
    });
  },

  async toggleEbookStatus(id: string, isActive: boolean) {
    await this.getEbookById(id);
    return prisma.ebook.update({
      where: { id },
      data: { isActive },
    });
  },

  async deleteEbook(id: string) {
    const ebook = await this.getEbookById(id);

    // Unlink physical PDF file if present
    if (ebook.fileUrl && ebook.fileUrl.startsWith('/uploads/ebooks/')) {
      const fileName = path.basename(ebook.fileUrl);
      const filePath = path.join(EBOOK_UPLOADS_DIR, fileName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error(`Failed to delete ebook PDF file at ${filePath}:`, err);
        }
      }
    }

    // Unlink physical Cover Image file if present
    if (ebook.coverImageUrl && ebook.coverImageUrl.startsWith('/uploads/ebooks/')) {
      const coverFileName = path.basename(ebook.coverImageUrl);
      const coverFilePath = path.join(EBOOK_UPLOADS_DIR, coverFileName);
      if (fs.existsSync(coverFilePath)) {
        try {
          fs.unlinkSync(coverFilePath);
        } catch (err) {
          console.error(`Failed to delete ebook cover image file at ${coverFilePath}:`, err);
        }
      }
    }

    return prisma.ebook.delete({ where: { id } });
  },
};
