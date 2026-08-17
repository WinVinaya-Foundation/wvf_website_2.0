import { Router } from 'express';
import { careersService } from './careers.service.js';

export const publicCareersRouter = Router();

// GET /api/careers - Fetch active job openings for public website
publicCareersRouter.get('/', async (_req, res, next) => {
  try {
    const jobs = await careersService.getPublicJobOpenings();
    res.json({ jobs });
  } catch (err) {
    next(err);
  }
});
