import { randomBytes } from 'node:crypto';

/**
 * WVF + compact date + 10 hex random chars (40 bits entropy). Doubles as the Razorpay `receipt`
 * value and the public donate/thank-you page lookup key, so it must not be guessable from a
 * bare timestamp the way the legacy `'WWF' . time()` reference was.
 */
export function generateDonationReference(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = randomBytes(5).toString('hex');
  return `WVF${date}${random}`;
}
