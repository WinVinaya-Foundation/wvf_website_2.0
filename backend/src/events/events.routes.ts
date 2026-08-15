import { Router } from 'express';
import type { EventStatus } from '@prisma/client';
import { eventsService } from './events.service.js';

export const eventsRouter = Router();

// GET /api/events - Public route returning active events
eventsRouter.get('/', async (req, res, next) => {
  try {
    const status = req.query.status as EventStatus | undefined;
    const events = await eventsService.getPublicEvents(status);
    res.json({ events });
  } catch (err) {
    next(err);
  }
});
