import type { Request, Response } from 'express';
import { exportDonorsQuerySchema } from './donations.admin.schemas.js';
import * as donationsService from './donations.service.js';

const EXPORT_ROW_CAP = 10000;

export async function listDonorsHandler(_req: Request, res: Response): Promise<void> {
  const [donations, stats] = await Promise.all([
    donationsService.listDonationsForAdmin(),
    donationsService.getDonationStats(),
  ]);
  res.status(200).json({ donations, stats });
}

export async function exportDonorsHandler(req: Request, res: Response): Promise<void> {
  const { from, to } = exportDonorsQuerySchema.parse(req.query);

  const donations = await donationsService.listDonationsForAdmin({
    from: from ? new Date(`${from}T00:00:00.000Z`) : undefined,
    // End-of-day so a "to" date includes donations made on that day.
    to: to ? new Date(`${to}T23:59:59.999Z`) : undefined,
    limit: EXPORT_ROW_CAP,
  });

  res.status(200).json({ donations });
}
