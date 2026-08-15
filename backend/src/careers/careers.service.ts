import fs from 'fs';
import path from 'path';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';
import { CAREERS_UPLOADS_DIR } from './careers.storage.js';
import type { EmploymentType } from '@prisma/client';

export interface CreateJobInput {
  title: string;
  department?: string | null;
  employmentType?: EmploymentType;
  location: string;
  experience: string;
  description: string;
  requirements?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  isActive?: boolean;
}

export interface UpdateJobInput {
  title?: string;
  department?: string | null;
  employmentType?: EmploymentType;
  location?: string;
  experience?: string;
  description?: string;
  requirements?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  isActive?: boolean;
}

export const careersService = {
  async getPublicJobOpenings() {
    return prisma.jobOpening.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getAllAdminJobOpenings() {
    return prisma.jobOpening.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async getJobById(id: string) {
    const job = await prisma.jobOpening.findUnique({ where: { id } });
    if (!job) {
      throw new HttpError(404, 'Job opening not found');
    }
    return job;
  },

  async createJob(input: CreateJobInput) {
    return prisma.jobOpening.create({
      data: {
        title: input.title.trim(),
        department: input.department ? input.department.trim() : null,
        employmentType: input.employmentType || 'FULL_TIME',
        location: input.location.trim(),
        experience: input.experience.trim(),
        description: input.description.trim(),
        requirements: input.requirements ? input.requirements.trim() : null,
        fileUrl: input.fileUrl || null,
        fileName: input.fileName || null,
        fileSize: input.fileSize || null,
        isActive: input.isActive ?? true,
      },
    });
  },

  async updateJob(id: string, input: UpdateJobInput) {
    await this.getJobById(id);

    return prisma.jobOpening.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title.trim() }),
        ...(input.department !== undefined && { department: input.department ? input.department.trim() : null }),
        ...(input.employmentType !== undefined && { employmentType: input.employmentType }),
        ...(input.location !== undefined && { location: input.location.trim() }),
        ...(input.experience !== undefined && { experience: input.experience.trim() }),
        ...(input.description !== undefined && { description: input.description.trim() }),
        ...(input.requirements !== undefined && { requirements: input.requirements ? input.requirements.trim() : null }),
        ...(input.fileUrl !== undefined && { fileUrl: input.fileUrl }),
        ...(input.fileName !== undefined && { fileName: input.fileName }),
        ...(input.fileSize !== undefined && { fileSize: input.fileSize }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
      },
    });
  },

  async toggleJobStatus(id: string, isActive: boolean) {
    await this.getJobById(id);
    return prisma.jobOpening.update({
      where: { id },
      data: { isActive },
    });
  },

  async deleteJob(id: string) {
    const job = await this.getJobById(id);

    // Unlink physical PDF file if present
    if (job.fileUrl && job.fileUrl.startsWith('/uploads/careers/')) {
      const fileName = path.basename(job.fileUrl);
      const filePath = path.join(CAREERS_UPLOADS_DIR, fileName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error(`Failed to delete job PDF file at ${filePath}:`, err);
        }
      }
    }

    return prisma.jobOpening.delete({ where: { id } });
  },
};
