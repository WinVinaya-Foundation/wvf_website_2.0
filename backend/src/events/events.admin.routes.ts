import { Router } from 'express';
import type { EventStatus } from '@prisma/client';
import { authenticate } from '../middleware/authenticate.js';
import { HttpError } from '../lib/httpError.js';
import { categoriesService } from '../categories/categories.service.js';
import { eventsService } from './events.service.js';

export const adminEventsRouter = Router();

const VALID_STATUSES = ['UPCOMING', 'COMPLETED'];

adminEventsRouter.use(authenticate);

// GET /api/admin/events - Get all events (active and inactive)
adminEventsRouter.get('/', async (req, res, next) => {
  try {
    const status = req.query.status as EventStatus | undefined;
    const events = await eventsService.getAllAdminEvents(status);
    res.json({ events });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/events - Create a new event
adminEventsRouter.post('/', async (req, res, next) => {
  try {
    const { title, categoryId, status, dateLabel, isDateTBA, location, description, ctaLabel, ctaLink, isActive } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      throw new HttpError(400, 'Title is required');
    }
    if (!categoryId || typeof categoryId !== 'string') {
      throw new HttpError(400, 'Category is required');
    }
    await categoriesService.getCategoryById(categoryId);
    if (!status || !VALID_STATUSES.includes(status)) {
      throw new HttpError(400, `Valid status (${VALID_STATUSES.join(', ')}) is required`);
    }
    if (!dateLabel || typeof dateLabel !== 'string' || !dateLabel.trim()) {
      throw new HttpError(400, 'Date label is required');
    }
    if (!location || typeof location !== 'string' || !location.trim()) {
      throw new HttpError(400, 'Location is required');
    }
    if (!description || typeof description !== 'string' || !description.trim()) {
      throw new HttpError(400, 'Description is required');
    }

    const event = await eventsService.createEvent({
      title: title.trim(),
      categoryId,
      status: status as EventStatus,
      dateLabel: dateLabel.trim(),
      isDateTBA: Boolean(isDateTBA),
      location: location.trim(),
      description: description.trim(),
      ctaLabel: ctaLabel ? String(ctaLabel).trim() : undefined,
      ctaLink: ctaLink ? String(ctaLink).trim() : undefined,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    res.status(201).json({ event });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/events/:id - Update an event
adminEventsRouter.put('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { title, categoryId, status, dateLabel, isDateTBA, location, description, ctaLabel, ctaLink, isActive } = req.body;

    if (categoryId !== undefined) {
      await categoriesService.getCategoryById(categoryId);
    }
    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      throw new HttpError(400, `Valid status (${VALID_STATUSES.join(', ')}) is required`);
    }

    const event = await eventsService.updateEvent(id, {
      ...(title !== undefined && { title: String(title).trim() }),
      ...(categoryId !== undefined && { categoryId: String(categoryId) }),
      ...(status !== undefined && { status: status as EventStatus }),
      ...(dateLabel !== undefined && { dateLabel: String(dateLabel).trim() }),
      ...(isDateTBA !== undefined && { isDateTBA: Boolean(isDateTBA) }),
      ...(location !== undefined && { location: String(location).trim() }),
      ...(description !== undefined && { description: String(description).trim() }),
      ...(ctaLabel !== undefined && { ctaLabel: String(ctaLabel).trim() }),
      ...(ctaLink !== undefined && { ctaLink: String(ctaLink).trim() }),
      ...(isActive !== undefined && { isActive: Boolean(isActive) }),
    });

    res.json({ event });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/events/:id/status - Toggle active/inactive visibility
adminEventsRouter.patch('/:id/status', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      throw new HttpError(400, 'isActive parameter must be a boolean');
    }
    const event = await eventsService.toggleEventStatus(id, isActive);
    res.json({ event });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/events/:id - Delete an event
adminEventsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await eventsService.deleteEvent(id);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
});
