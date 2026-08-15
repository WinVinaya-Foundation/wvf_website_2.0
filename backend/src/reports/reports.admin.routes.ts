import { Router } from 'express';
import type { ReportCategory } from '@prisma/client';
import { authenticate } from '../middleware/authenticate.js';
import { HttpError } from '../lib/httpError.js';
import { env } from '../env.js';
import { reportUpload, getCategoryFolder } from './reports.storage.js';
import { reportsService } from './reports.service.js';

export const adminReportsRouter = Router();

// Protect all admin report routes
adminReportsRouter.use(authenticate);

// GET /api/admin/reports - Get all reports (active and inactive) + max file size setting
adminReportsRouter.get('/', async (req, res, next) => {
  try {
    const category = req.query.category as ReportCategory | undefined;
    const reports = await reportsService.getAllAdminReports(category);
    res.json({
      reports,
      maxFileSizeMb: env.MAX_REPORT_FILE_SIZE_MB,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/reports - Upload & create a new report
adminReportsRouter.post('/', reportUpload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new HttpError(400, 'Report document file is required');
    }

    const { title, category, year, description, isActive } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      throw new HttpError(400, 'Title is required');
    }

    if (!category || !['ANNUAL', 'FINANCIAL', 'LEGAL', 'RESEARCH'].includes(category)) {
      throw new HttpError(400, 'Valid category (ANNUAL, FINANCIAL, LEGAL, RESEARCH) is required');
    }

    const categoryFolder = getCategoryFolder(category);
    const fileUrl = `/uploads/reports/${categoryFolder}/${req.file.filename}`;

    const report = await reportsService.createReport({
      title: title.trim(),
      category: category as ReportCategory,
      year: year ? String(year).trim() : undefined,
      description: description ? String(description).trim() : undefined,
      fileUrl,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      isActive: isActive !== undefined ? String(isActive) === 'true' || isActive === true : true,
    });

    res.status(201).json({ report });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/reports/:id/status - Toggle active/inactive status
adminReportsRouter.patch('/:id/status', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      throw new HttpError(400, 'isActive parameter must be a boolean');
    }
    const report = await reportsService.toggleReportStatus(id, isActive);
    res.json({ report });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/reports/:id - Update report metadata and optional file replacement
adminReportsRouter.put('/:id', reportUpload.single('file'), async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { title, category, year, description, isActive } = req.body;

    let fileData: { fileUrl?: string; fileName?: string; fileSize?: number; mimeType?: string } = {};

    if (req.file) {
      const cat = category || (await reportsService.getReportById(id)).category;
      const categoryFolder = getCategoryFolder(cat);
      fileData = {
        fileUrl: `/uploads/reports/${categoryFolder}/${req.file.filename}`,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
      };
    }

    const report = await reportsService.updateReport(id, {
      ...(title !== undefined && { title: String(title).trim() }),
      ...(category !== undefined && { category: category as ReportCategory }),
      ...(year !== undefined && { year: String(year).trim() }),
      ...(description !== undefined && { description: String(description).trim() }),
      ...(isActive !== undefined && { isActive: String(isActive) === 'true' || isActive === true }),
      ...fileData,
    });

    res.json({ report });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/reports/:id - Delete report and remove file from disk
adminReportsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await reportsService.deleteReport(id);
    res.json({ success: true, message: 'Report deleted successfully' });
  } catch (err) {
    next(err);
  }
});
