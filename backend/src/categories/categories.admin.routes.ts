import { Router } from 'express';
import type { CategoryColor } from '@prisma/client';
import { authenticate } from '../middleware/authenticate.js';
import { HttpError } from '../lib/httpError.js';
import { categoriesService } from './categories.service.js';

export const adminCategoriesRouter = Router();

const VALID_COLORS = ['PRIMARY', 'SECONDARY', 'INFO', 'WARNING', 'SUCCESS', 'ERROR'];

adminCategoriesRouter.use(authenticate);

// POST /api/admin/categories - Create a new category
adminCategoriesRouter.post('/', async (req, res, next) => {
  try {
    const { label, color } = req.body;

    if (!label || typeof label !== 'string' || !label.trim()) {
      throw new HttpError(400, 'Label is required');
    }
    if (!color || !VALID_COLORS.includes(color)) {
      throw new HttpError(400, `Valid color (${VALID_COLORS.join(', ')}) is required`);
    }

    const category = await categoriesService.createCategory({
      label: label.trim(),
      color: color as CategoryColor,
    });

    res.status(201).json({ category });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/categories/:id - Update a category
adminCategoriesRouter.put('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { label, color } = req.body;

    if (color !== undefined && !VALID_COLORS.includes(color)) {
      throw new HttpError(400, `Valid color (${VALID_COLORS.join(', ')}) is required`);
    }

    const category = await categoriesService.updateCategory(id, {
      ...(label !== undefined && { label: String(label).trim() }),
      ...(color !== undefined && { color: color as CategoryColor }),
    });

    res.json({ category });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/categories/:id - Delete a category (only if unused)
adminCategoriesRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await categoriesService.deleteCategory(id);
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
});
