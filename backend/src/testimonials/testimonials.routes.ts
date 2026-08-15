import { Router } from 'express';
import { TestimonialCategory } from '@prisma/client';
import { testimonialsService } from './testimonials.service.js';

export const testimonialsRouter = Router();

// GET /api/testimonials - Get all active public testimonials (optional ?category=CANDIDATE|CORPORATE|INSTITUTIONAL)
testimonialsRouter.get('/', async (req, res, next) => {
  try {
    const categoryParam = req.query.category as string | undefined;
    const validCategory =
      categoryParam && Object.values(TestimonialCategory).includes(categoryParam as TestimonialCategory)
        ? (categoryParam as TestimonialCategory)
        : undefined;

    const testimonials = await testimonialsService.getAllPublicTestimonials(validCategory);
    res.json({ testimonials });
  } catch (err) {
    next(err);
  }
});
