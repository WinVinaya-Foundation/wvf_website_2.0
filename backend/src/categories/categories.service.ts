import type { CategoryColor } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';

export interface CreateCategoryInput {
  label: string;
  color: CategoryColor;
}

export interface UpdateCategoryInput {
  label?: string;
  color?: CategoryColor;
}

export const categoriesService = {
  async getAllCategories() {
    return prisma.category.findMany({ orderBy: { label: 'asc' } });
  },

  async getCategoryById(id: string) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new HttpError(404, 'Category not found');
    }
    return category;
  },

  async createCategory(data: CreateCategoryInput) {
    const existing = await prisma.category.findUnique({ where: { label: data.label } });
    if (existing) {
      throw new HttpError(409, 'A category with this name already exists');
    }
    return prisma.category.create({ data });
  },

  async updateCategory(id: string, data: UpdateCategoryInput) {
    await this.getCategoryById(id);
    if (data.label) {
      const existing = await prisma.category.findUnique({ where: { label: data.label } });
      if (existing && existing.id !== id) {
        throw new HttpError(409, 'A category with this name already exists');
      }
    }
    return prisma.category.update({ where: { id }, data });
  },

  async deleteCategory(id: string) {
    await this.getCategoryById(id);
    const [eventCount, albumCount] = await Promise.all([
      prisma.event.count({ where: { categoryId: id } }),
      prisma.galleryAlbum.count({ where: { categoryId: id } }),
    ]);
    if (eventCount > 0 || albumCount > 0) {
      throw new HttpError(400, 'Cannot delete a category that is still used by events or gallery albums');
    }
    return prisma.category.delete({ where: { id } });
  },
};
