import { Router } from 'express';
import { categoriesService } from './categories.service.js';

export const categoriesRouter = Router();

// GET /api/categories - Public route returning all categories
categoriesRouter.get('/', async (_req, res, next) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
});
