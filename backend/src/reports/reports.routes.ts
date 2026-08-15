import { Router } from 'express';
import type { ReportCategory } from '@prisma/client';
import { reportsService } from './reports.service.js';

export const reportsRouter = Router();

// GET /api/reports - Public route returning active reports
reportsRouter.get('/', async (req, res, next) => {
  try {
    const category = req.query.category as ReportCategory | undefined;
    const reports = await reportsService.getPublicReports(category);
    res.json({ reports });
  } catch (err) {
    next(err);
  }
});
