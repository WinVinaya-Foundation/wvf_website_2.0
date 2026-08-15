import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';

export interface CreateStoryInput {
  name: string;
  role: string;
  description: string;
  videoUrl: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateStoryInput {
  name?: string;
  role?: string;
  description?: string;
  videoUrl?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export const storiesService = {
  async getAllPublicStories() {
    return prisma.story.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  },

  async getAllAdminStories() {
    return prisma.story.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  },

  async getStoryById(id: string) {
    const story = await prisma.story.findUnique({ where: { id } });
    if (!story) {
      throw new HttpError(404, 'Story not found');
    }
    return story;
  },

  async createStory(data: CreateStoryInput) {
    return prisma.story.create({
      data: {
        name: data.name,
        role: data.role,
        description: data.description,
        videoUrl: data.videoUrl,
        sortOrder: data.sortOrder ?? 0,
        isActive: data.isActive ?? true,
      },
    });
  },

  async updateStory(id: string, data: UpdateStoryInput) {
    await this.getStoryById(id);
    return prisma.story.update({
      where: { id },
      data,
    });
  },

  async toggleStoryStatus(id: string, isActive: boolean) {
    await this.getStoryById(id);
    return prisma.story.update({
      where: { id },
      data: { isActive },
    });
  },

  async deleteStory(id: string) {
    await this.getStoryById(id);
    return prisma.story.delete({ where: { id } });
  },
};
