import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { HttpError } from '../lib/httpError.js';
import { newsletterUpload } from './newsletter.storage.js';
import { newsletterService } from './newsletter.service.js';

export const adminNewsletterRouter = Router();

adminNewsletterRouter.use(authenticate);

const newsletterFields = newsletterUpload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
]);

// GET /api/admin/newsletter - Fetch all newsletter issues
adminNewsletterRouter.get('/', async (_req, res, next) => {
  try {
    const newsletters = await newsletterService.getAllAdminNewsletters();
    res.json({ newsletters });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/newsletter - Create newsletter issue with optional PDF and cover image file uploads
adminNewsletterRouter.post('/', newsletterFields, async (req, res, next) => {
  try {
    const { title, issueLabel, publishedAt, description, coverImageUrl, isActive } = req.body || {};

    if (!title || typeof title !== 'string' || !title.trim()) {
      throw new HttpError(400, 'Title is required');
    }
    if (!issueLabel || typeof issueLabel !== 'string' || !issueLabel.trim()) {
      throw new HttpError(400, 'Issue label is required');
    }
    if (!description || typeof description !== 'string' || !description.trim()) {
      throw new HttpError(400, 'Description is required');
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const pdfFile = files?.['file']?.[0];
    const coverFile = files?.['coverImage']?.[0];

    const fileUrl = pdfFile ? `/uploads/newsletters/${pdfFile.filename}` : null;
    const fileName = pdfFile ? pdfFile.originalname : null;
    const fileSize = pdfFile ? pdfFile.size : null;

    const finalCoverUrl = coverFile ? `/uploads/newsletters/${coverFile.filename}` : coverImageUrl || null;

    const newsletter = await newsletterService.createNewsletter({
      title,
      issueLabel,
      publishedAt,
      description,
      fileUrl,
      fileName,
      fileSize,
      coverImageUrl: finalCoverUrl,
      isActive: isActive !== undefined ? String(isActive) === 'true' || isActive === true : true,
    });

    res.status(201).json({ newsletter });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/newsletter/:id - Update newsletter issue with optional PDF and cover image file uploads
adminNewsletterRouter.put('/:id', newsletterFields, async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { title, issueLabel, publishedAt, description, coverImageUrl, isActive } = req.body || {};

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const pdfFile = files?.['file']?.[0];
    const coverFile = files?.['coverImage']?.[0];

    const fileUrl = pdfFile ? `/uploads/newsletters/${pdfFile.filename}` : undefined;
    const fileName = pdfFile ? pdfFile.originalname : undefined;
    const fileSize = pdfFile ? pdfFile.size : undefined;

    const finalCoverUrl = coverFile ? `/uploads/newsletters/${coverFile.filename}` : coverImageUrl !== undefined ? coverImageUrl : undefined;

    const newsletter = await newsletterService.updateNewsletter(id, {
      ...(title !== undefined && { title }),
      ...(issueLabel !== undefined && { issueLabel }),
      ...(publishedAt !== undefined && { publishedAt }),
      ...(description !== undefined && { description }),
      ...(fileUrl !== undefined && { fileUrl, fileName, fileSize }),
      ...(finalCoverUrl !== undefined && { coverImageUrl: finalCoverUrl }),
      ...(isActive !== undefined && { isActive: String(isActive) === 'true' || isActive === true }),
    });

    res.json({ newsletter });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/newsletter/:id/status - Toggle active status
adminNewsletterRouter.patch('/:id/status', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      throw new HttpError(400, 'isActive parameter must be a boolean');
    }
    const newsletter = await newsletterService.toggleNewsletterStatus(id, isActive);
    res.json({ newsletter });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/newsletter/:id - Delete newsletter issue
adminNewsletterRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await newsletterService.deleteNewsletter(id);
    res.json({ success: true, message: 'Newsletter issue deleted successfully' });
  } catch (err) {
    next(err);
  }
});
