import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { exportDonorsHandler, listDonorsHandler } from './donations.admin.controller.js';

export const adminDonationsRouter = Router();

adminDonationsRouter.use(authenticate);
adminDonationsRouter.get('/', listDonorsHandler);
adminDonationsRouter.get('/export', exportDonorsHandler);
