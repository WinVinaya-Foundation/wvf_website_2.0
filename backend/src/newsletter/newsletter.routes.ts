import { Router } from 'express';
import { newsletterService } from './newsletter.service.js';

export const publicNewsletterRouter = Router();

// GET /api/newsletter - Fetch active published newsletters
publicNewsletterRouter.get('/', async (_req, res, next) => {
  try {
    const newsletters = await newsletterService.getPublicNewsletters();
    res.json({ newsletters });
  } catch (err) {
    next(err);
  }
});
