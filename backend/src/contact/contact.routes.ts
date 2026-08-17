import { Router } from 'express';
import { HttpError } from '../lib/httpError.js';
import { contactService } from './contact.service.js';

export const publicContactRouter = Router();

// POST /api/contact - Submit a contact message from public website
publicContactRouter.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, reason, message } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      throw new HttpError(400, 'Name is required');
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      throw new HttpError(400, 'Email address is required');
    }
    if (!reason || typeof reason !== 'string' || !reason.trim()) {
      throw new HttpError(400, 'Reason for contact is required');
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      throw new HttpError(400, 'Message is required');
    }

    const inquiry = await contactService.createInquiry({
      name,
      email,
      phone,
      reason,
      message,
    });

    res.status(201).json({ success: true, inquiry });
  } catch (err) {
    next(err);
  }
});
