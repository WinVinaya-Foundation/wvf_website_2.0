import type { EventStatus } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';

export interface CreateEventInput {
  title: string;
  categoryId: string;
  status: EventStatus;
  dateLabel: string;
  isDateTBA?: boolean;
  location: string;
  description: string;
  ctaLabel?: string;
  ctaLink?: string;
  isActive?: boolean;
}

export interface UpdateEventInput {
  title?: string;
  categoryId?: string;
  status?: EventStatus;
  dateLabel?: string;
  isDateTBA?: boolean;
  location?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
  isActive?: boolean;
}

const withCategory = { category: true } as const;

export const eventsService = {
  async getPublicEvents(status?: EventStatus) {
    return prisma.event.findMany({
      where: {
        isActive: true,
        ...(status ? { status } : {}),
      },
      include: withCategory,
      orderBy: { createdAt: 'desc' },
    });
  },

  async getAllAdminEvents(status?: EventStatus) {
    return prisma.event.findMany({
      where: status ? { status } : {},
      include: withCategory,
      orderBy: { createdAt: 'desc' },
    });
  },

  async getEventById(id: string) {
    const event = await prisma.event.findUnique({ where: { id }, include: withCategory });
    if (!event) {
      throw new HttpError(404, 'Event not found');
    }
    return event;
  },

  async createEvent(data: CreateEventInput) {
    return prisma.event.create({
      data: {
        title: data.title,
        categoryId: data.categoryId,
        status: data.status,
        dateLabel: data.dateLabel,
        isDateTBA: data.isDateTBA ?? false,
        location: data.location,
        description: data.description,
        ctaLabel: data.ctaLabel || null,
        ctaLink: data.ctaLink || null,
        isActive: data.isActive ?? true,
      },
      include: withCategory,
    });
  },

  async updateEvent(id: string, data: UpdateEventInput) {
    await this.getEventById(id);

    return prisma.event.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.dateLabel !== undefined && { dateLabel: data.dateLabel }),
        ...(data.isDateTBA !== undefined && { isDateTBA: data.isDateTBA }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.ctaLabel !== undefined && { ctaLabel: data.ctaLabel || null }),
        ...(data.ctaLink !== undefined && { ctaLink: data.ctaLink || null }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
      include: withCategory,
    });
  },

  async toggleEventStatus(id: string, isActive: boolean) {
    await this.getEventById(id);
    return prisma.event.update({
      where: { id },
      data: { isActive },
      include: withCategory,
    });
  },

  async deleteEvent(id: string) {
    await this.getEventById(id);
    return prisma.event.delete({ where: { id } });
  },
};
