import type { DonationScheme } from '@prisma/client';

export interface DonationTier {
  label: string;
  /** null means the amount is user-entered (GENERAL only) — every other scheme is fixed and
   * server-authoritative; the client-submitted amount is never trusted for priced tiers. */
  amountPaise: number | null;
}

export const donationTiers: Record<DonationScheme, DonationTier> = {
  STUDENT_ENGLISH: {
    label: 'Support-A-Student: English Training',
    amountPaise: 500000,
  },
  STUDENT_ENGLISH_SOFTSKILLS: {
    label: 'Support-A-Student: English + Soft Skills',
    amountPaise: 1000000,
  },
  STUDENT_ENGLISH_SOFTSKILLS_IT_BFSI: {
    label: 'Support-A-Student: English, Soft Skills + IT or BFSI',
    amountPaise: 2500000,
  },
  RURAL_ENTREPRENEURS: {
    label: 'Empower Rural Entrepreneurs',
    amountPaise: 2500000,
  },
  GENERAL: {
    label: 'Helping Hands — General Donation',
    amountPaise: null,
  },
};
