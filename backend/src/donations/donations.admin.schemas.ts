import { z } from 'zod';

export const exportDonorsQuerySchema = z.object({
  from: z.iso.date().optional(),
  to: z.iso.date().optional(),
});

export type ExportDonorsQuery = z.infer<typeof exportDonorsQuerySchema>;
