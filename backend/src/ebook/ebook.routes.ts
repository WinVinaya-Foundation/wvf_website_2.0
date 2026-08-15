import { Router } from 'express';
import { ebookService } from './ebook.service.js';

export const publicEbookRouter = Router();

// GET /api/ebook - Fetch active e-books for public website
publicEbookRouter.get('/', async (_req, res, next) => {
  try {
    const ebooks = await ebookService.getPublicEbooks();
    res.json({ ebooks });
  } catch (err) {
    next(err);
  }
});
