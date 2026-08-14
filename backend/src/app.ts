import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './env.js';
import { donationsRouter } from './donations/donations.routes.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_ORIGIN }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/donations', donationsRouter);

app.use(notFoundHandler);
app.use(errorHandler);
