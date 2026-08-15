import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './env.js';
import { authRouter } from './auth/auth.routes.js';
import { adminDonationsRouter } from './donations/donations.admin.routes.js';
import { donationsRouter } from './donations/donations.routes.js';
import { reportsRouter } from './reports/reports.routes.js';
import { adminReportsRouter } from './reports/reports.admin.routes.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: env.FRONTEND_ORIGIN }));
app.use(express.json());

// Serve static upload files (reports, documents, etc.)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/admin/donors', adminDonationsRouter);
app.use('/api/admin/reports', adminReportsRouter);
app.use('/api/donations', donationsRouter);
app.use('/api/reports', reportsRouter);

app.use(notFoundHandler);
app.use(errorHandler);
