import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';
import type { InquiryStatus } from '@prisma/client';

export interface CreateInquiryInput {
  name: string;
  email: string;
  phone?: string | null;
  reason: string;
  message: string;
}

export interface UpdateInquiryInput {
  status?: InquiryStatus;
  adminNotes?: string | null;
}

export const contactService = {
  async createInquiry(input: CreateInquiryInput) {
    return prisma.contactInquiry.create({
      data: {
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone ? input.phone.trim() : null,
        reason: input.reason.trim(),
        message: input.message.trim(),
        status: 'NEW',
      },
    });
  },

  async getAllAdminInquiries() {
    return prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async getInquiryById(id: string) {
    const inquiry = await prisma.contactInquiry.findUnique({ where: { id } });
    if (!inquiry) {
      throw new HttpError(404, 'Contact inquiry not found');
    }
    return inquiry;
  },

  async updateInquiry(id: string, input: UpdateInquiryInput) {
    await this.getInquiryById(id);
    return prisma.contactInquiry.update({
      where: { id },
      data: {
        ...(input.status !== undefined && { status: input.status }),
        ...(input.adminNotes !== undefined && { adminNotes: input.adminNotes ? input.adminNotes.trim() : null }),
      },
    });
  },

  async deleteInquiry(id: string) {
    await this.getInquiryById(id);
    return prisma.contactInquiry.delete({ where: { id } });
  },
};
