import fs from 'fs';
import path from 'path';
import type { ReportCategory } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';
import { UPLOADS_BASE_DIR } from './reports.storage.js';

export interface CreateReportInput {
  title: string;
  category: ReportCategory;
  year?: string;
  description?: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  isActive?: boolean;
}

export interface UpdateReportInput {
  title?: string;
  category?: ReportCategory;
  year?: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  isActive?: boolean;
}

function removeFileFromDisk(fileUrl: string) {
  try {
    // fileUrl is like "/uploads/reports/annual/123_file.pdf"
    if (fileUrl.startsWith('/uploads/')) {
      const relativePath = fileUrl.slice('/uploads/'.length);
      const fullPath = path.join(UPLOADS_BASE_DIR, relativePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
  } catch (err) {
    console.error(`Failed to remove file from disk (${fileUrl}):`, err);
  }
}

export const reportsService = {
  async getPublicReports(category?: ReportCategory) {
    return prisma.report.findMany({
      where: {
        isActive: true,
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getAllAdminReports(category?: ReportCategory) {
    return prisma.report.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: 'desc' },
    });
  },

  async getReportById(id: string) {
    const report = await prisma.report.findUnique({ where: { id } });
    if (!report) {
      throw new HttpError(404, 'Report not found');
    }
    return report;
  },

  async createReport(data: CreateReportInput) {
    return prisma.report.create({
      data: {
        title: data.title,
        category: data.category,
        year: data.year || null,
        description: data.description || null,
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        isActive: data.isActive ?? true,
      },
    });
  },

  async updateReport(id: string, data: UpdateReportInput) {
    const existing = await this.getReportById(id);

    // If a new file is uploaded, remove the old file from disk
    if (data.fileUrl && data.fileUrl !== existing.fileUrl) {
      removeFileFromDisk(existing.fileUrl);
    }

    return prisma.report.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.year !== undefined && { year: data.year || null }),
        ...(data.description !== undefined && { description: data.description || null }),
        ...(data.fileUrl !== undefined && { fileUrl: data.fileUrl }),
        ...(data.fileName !== undefined && { fileName: data.fileName }),
        ...(data.fileSize !== undefined && { fileSize: data.fileSize }),
        ...(data.mimeType !== undefined && { mimeType: data.mimeType }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });
  },

  async toggleReportStatus(id: string, isActive: boolean) {
    await this.getReportById(id);
    return prisma.report.update({
      where: { id },
      data: { isActive },
    });
  },

  async deleteReport(id: string) {
    const existing = await this.getReportById(id);
    removeFileFromDisk(existing.fileUrl);
    return prisma.report.delete({ where: { id } });
  },
};
