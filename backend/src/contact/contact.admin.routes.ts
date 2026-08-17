import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { contactService } from './contact.service.js';

export const adminContactRouter = Router();

adminContactRouter.use(authenticate);

// GET /api/admin/contact - Fetch all contact inquiries
adminContactRouter.get('/', async (_req, res, next) => {
  try {
    const inquiries = await contactService.getAllAdminInquiries();
    res.json({ inquiries });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/contact/:id - Update status or admin notes
adminContactRouter.patch('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { status, adminNotes } = req.body || {};
    const inquiry = await contactService.updateInquiry(id, { status, adminNotes });
    res.json({ inquiry });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/contact/:id - Delete inquiry
adminContactRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await contactService.deleteInquiry(id);
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    next(err);
  }
});
