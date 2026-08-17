import fs from 'fs';
import path from 'path';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';
import { NEWSLETTER_UPLOADS_DIR } from './newsletter.storage.js';

export interface CreateNewsletterInput {
  title: string;
  issueLabel: string;
  publishedAt?: string | Date;
  description: string;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  coverImageUrl?: string | null;
  isActive?: boolean;
}

export interface UpdateNewsletterInput {
  title?: string;
  issueLabel?: string;
  publishedAt?: string | Date;
  description?: string;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  coverImageUrl?: string | null;
  isActive?: boolean;
}

function removeFileFromDisk(fileUrl?: string | null) {
  if (!fileUrl) return;
  try {
    if (fileUrl.startsWith('/uploads/newsletters/')) {
      const fileName = fileUrl.slice('/uploads/newsletters/'.length);
      const fullPath = path.join(NEWSLETTER_UPLOADS_DIR, fileName);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
  } catch (err) {
    console.error(`Failed to remove newsletter file from disk (${fileUrl}):`, err);
  }
}

export const newsletterService = {
  /** Public: fetch active newsletters ordered by publishedAt desc */
  async getPublicNewsletters() {
    return prisma.newsletter.findMany({
      where: { isActive: true },
      orderBy: { publishedAt: 'desc' },
    });
  },

  /** Admin: fetch all newsletters */
  async getAllAdminNewsletters() {
    return prisma.newsletter.findMany({
      orderBy: { publishedAt: 'desc' },
    });
  },

  /** Admin: get single newsletter */
  async getNewsletterById(id: string) {
    const item = await prisma.newsletter.findUnique({ where: { id } });
    if (!item) {
      throw new HttpError(404, 'Newsletter issue not found');
    }
    return item;
  },

  /** Admin: create newsletter */
  async createNewsletter(data: CreateNewsletterInput) {
    return prisma.newsletter.create({
      data: {
        title: data.title.trim(),
        issueLabel: data.issueLabel.trim(),
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
        description: data.description.trim(),
        fileUrl: data.fileUrl || null,
        fileName: data.fileName || null,
        fileSize: data.fileSize || null,
        coverImageUrl: data.coverImageUrl || null,
        isActive: data.isActive ?? true,
      },
    });
  },

  /** Admin: update newsletter */
  async updateNewsletter(id: string, data: UpdateNewsletterInput) {
    const existing = await this.getNewsletterById(id);

    // Clean up old file if replacing
    if (data.fileUrl !== undefined && data.fileUrl !== existing.fileUrl) {
      removeFileFromDisk(existing.fileUrl);
    }

    return prisma.newsletter.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title.trim() }),
        ...(data.issueLabel !== undefined && { issueLabel: data.issueLabel.trim() }),
        ...(data.publishedAt !== undefined && { publishedAt: new Date(data.publishedAt) }),
        ...(data.description !== undefined && { description: data.description.trim() }),
        ...(data.fileUrl !== undefined && { fileUrl: data.fileUrl || null }),
        ...(data.fileName !== undefined && { fileName: data.fileName || null }),
        ...(data.fileSize !== undefined && { fileSize: data.fileSize || null }),
        ...(data.coverImageUrl !== undefined && { coverImageUrl: data.coverImageUrl || null }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });
  },

  /** Admin: toggle active status */
  async toggleNewsletterStatus(id: string, isActive: boolean) {
    await this.getNewsletterById(id);
    return prisma.newsletter.update({
      where: { id },
      data: { isActive },
    });
  },

  /** Admin: delete newsletter and unlinks physical file */
  async deleteNewsletter(id: string) {
    const item = await this.getNewsletterById(id);
    removeFileFromDisk(item.fileUrl);
    return prisma.newsletter.delete({ where: { id } });
  },
};
