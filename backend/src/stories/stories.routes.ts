import { Router } from 'express';
import { storiesService } from './stories.service.js';

export const storiesRouter = Router();

// GET /api/stories - Public route to fetch active success stories
storiesRouter.get('/', async (_req, res, next) => {
  try {
    const stories = await storiesService.getAllPublicStories();
    res.json({ stories });
  } catch (err) {
    next(err);
  }
});
