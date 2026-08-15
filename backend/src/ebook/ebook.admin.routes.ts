import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { HttpError } from '../lib/httpError.js';
import { ebookUpload } from './ebook.storage.js';
import { ebookService } from './ebook.service.js';

export const adminEbookRouter = Router();

adminEbookRouter.use(authenticate);

const ebookFields = ebookUpload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
]);

// GET /api/admin/ebook - Fetch all e-books
adminEbookRouter.get('/', async (_req, res, next) => {
  try {
    const ebooks = await ebookService.getAllAdminEbooks();
    res.json({ ebooks });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/ebook - Create e-book with optional PDF and cover image file uploads
adminEbookRouter.post('/', ebookFields, async (req, res, next) => {
  try {
    const { title, author, publishedAt, description, coverImageUrl, isActive } = req.body || {};

    if (!title || typeof title !== 'string' || !title.trim()) {
      throw new HttpError(400, 'Title is required');
    }
    if (!author || typeof author !== 'string' || !author.trim()) {
      throw new HttpError(400, 'Author is required');
    }
    if (!description || typeof description !== 'string' || !description.trim()) {
      throw new HttpError(400, 'Description is required');
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const pdfFile = files?.['file']?.[0];
    const coverFile = files?.['coverImage']?.[0];

    const fileUrl = pdfFile ? `/uploads/ebooks/${pdfFile.filename}` : null;
    const fileName = pdfFile ? pdfFile.originalname : null;
    const fileSize = pdfFile ? pdfFile.size : null;

    const finalCoverUrl = coverFile ? `/uploads/ebooks/${coverFile.filename}` : coverImageUrl || null;

    const ebook = await ebookService.createEbook({
      title,
      author,
      publishedAt,
      description,
      fileUrl,
      fileName,
      fileSize,
      coverImageUrl: finalCoverUrl,
      isActive: isActive !== undefined ? String(isActive) === 'true' || isActive === true : true,
    });

    res.status(201).json({ ebook });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/ebook/:id - Update e-book with optional PDF and cover image file uploads
adminEbookRouter.put('/:id', ebookFields, async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { title, author, publishedAt, description, coverImageUrl, isActive } = req.body || {};

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const pdfFile = files?.['file']?.[0];
    const coverFile = files?.['coverImage']?.[0];

    const fileUrl = pdfFile ? `/uploads/ebooks/${pdfFile.filename}` : undefined;
    const fileName = pdfFile ? pdfFile.originalname : undefined;
    const fileSize = pdfFile ? pdfFile.size : undefined;

    const finalCoverUrl = coverFile ? `/uploads/ebooks/${coverFile.filename}` : coverImageUrl !== undefined ? coverImageUrl : undefined;

    const ebook = await ebookService.updateEbook(id, {
      ...(title !== undefined && { title }),
      ...(author !== undefined && { author }),
      ...(publishedAt !== undefined && { publishedAt }),
      ...(description !== undefined && { description }),
      ...(fileUrl !== undefined && { fileUrl, fileName, fileSize }),
      ...(finalCoverUrl !== undefined && { coverImageUrl: finalCoverUrl }),
      ...(isActive !== undefined && { isActive: String(isActive) === 'true' || isActive === true }),
    });

    res.json({ ebook });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/ebook/:id/status - Toggle active status
adminEbookRouter.patch('/:id/status', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      throw new HttpError(400, 'isActive parameter must be a boolean');
    }
    const ebook = await ebookService.toggleEbookStatus(id, isActive);
    res.json({ ebook });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/ebook/:id - Delete e-book
adminEbookRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await ebookService.deleteEbook(id);
    res.json({ success: true, message: 'E-book deleted successfully' });
  } catch (err) {
    next(err);
  }
});
