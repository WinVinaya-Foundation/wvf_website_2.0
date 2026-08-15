import { TestimonialCategory } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';

export interface CreateTestimonialInput {
  category: TestimonialCategory;
  name: string;
  role: string;
  quote: string;
  disability?: string;
  title?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateTestimonialInput {
  category?: TestimonialCategory;
  name?: string;
  role?: string;
  quote?: string;
  disability?: string;
  title?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export const testimonialsService = {
  async getAllPublicTestimonials(category?: TestimonialCategory) {
    return prisma.testimonial.findMany({
      where: {
        isActive: true,
        ...(category && { category }),
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  },

  async getAllAdminTestimonials() {
    return prisma.testimonial.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  },

  async getTestimonialById(id: string) {
    const item = await prisma.testimonial.findUnique({ where: { id } });
    if (!item) {
      throw new HttpError(404, 'Testimonial not found');
    }
    return item;
  },

  async createTestimonial(data: CreateTestimonialInput) {
    return prisma.testimonial.create({
      data: {
        category: data.category,
        name: data.name,
        role: data.role,
        quote: data.quote,
        disability: data.disability || null,
        title: data.title || null,
        sortOrder: data.sortOrder ?? 0,
        isActive: data.isActive ?? true,
      },
    });
  },

  async updateTestimonial(id: string, data: UpdateTestimonialInput) {
    await this.getTestimonialById(id);
    return prisma.testimonial.update({
      where: { id },
      data,
    });
  },

  async toggleTestimonialStatus(id: string, isActive: boolean) {
    await this.getTestimonialById(id);
    return prisma.testimonial.update({
      where: { id },
      data: { isActive },
    });
  },

  async deleteTestimonial(id: string) {
    await this.getTestimonialById(id);
    return prisma.testimonial.delete({ where: { id } });
  },
};
