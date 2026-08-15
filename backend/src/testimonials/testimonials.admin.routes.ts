import { Router } from 'express';
import { TestimonialCategory } from '@prisma/client';
import { authenticate } from '../middleware/authenticate.js';
import { HttpError } from '../lib/httpError.js';
import { testimonialsService } from './testimonials.service.js';

export const adminTestimonialsRouter = Router();

adminTestimonialsRouter.use(authenticate);

// GET /api/admin/testimonials - Get all testimonials for admin
adminTestimonialsRouter.get('/', async (_req, res, next) => {
  try {
    const testimonials = await testimonialsService.getAllAdminTestimonials();
    res.json({ testimonials });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/testimonials - Create new testimonial
adminTestimonialsRouter.post('/', async (req, res, next) => {
  try {
    const { category, name, role, quote, disability, title, sortOrder, isActive } = req.body;
    if (!category || !name || !role || !quote) {
      throw new HttpError(400, 'Category, name, role, and quote are required');
    }

    if (!Object.values(TestimonialCategory).includes(category as TestimonialCategory)) {
      throw new HttpError(400, 'Invalid testimonial category');
    }

    const testimonial = await testimonialsService.createTestimonial({
      category: category as TestimonialCategory,
      name: String(name).trim(),
      role: String(role).trim(),
      quote: String(quote).trim(),
      disability: disability ? String(disability).trim() : undefined,
      title: title ? String(title).trim() : undefined,
      sortOrder: typeof sortOrder === 'number' ? sortOrder : 0,
      isActive: typeof isActive === 'boolean' ? isActive : true,
    });

    res.status(201).json({ testimonial });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/testimonials/:id - Update testimonial
adminTestimonialsRouter.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const { category, name, role, quote, disability, title, sortOrder, isActive } = req.body;

    const testimonial = await testimonialsService.updateTestimonial(id, {
      ...(category && { category: category as TestimonialCategory }),
      ...(name && { name: String(name).trim() }),
      ...(role && { role: String(role).trim() }),
      ...(quote && { quote: String(quote).trim() }),
      disability: disability !== undefined ? (disability ? String(disability).trim() : undefined) : undefined,
      title: title !== undefined ? (title ? String(title).trim() : undefined) : undefined,
      ...(typeof sortOrder === 'number' && { sortOrder }),
      ...(typeof isActive === 'boolean' && { isActive }),
    });

    res.json({ testimonial });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/testimonials/:id/status - Toggle active visibility
adminTestimonialsRouter.patch('/:id/status', async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      throw new HttpError(400, 'isActive (boolean) is required');
    }

    const testimonial = await testimonialsService.toggleTestimonialStatus(id, isActive);
    res.json({ testimonial });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/testimonials/:id - Delete testimonial
adminTestimonialsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id as string;
    await testimonialsService.deleteTestimonial(id);
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (err) {
    next(err);
  }
});
