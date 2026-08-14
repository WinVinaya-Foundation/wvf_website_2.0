import { createHmac, timingSafeEqual } from 'node:crypto';
import Razorpay from 'razorpay';
import { env } from '../env.js';

export const razorpayClient = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export interface CreateRazorpayOrderInput {
  amountPaise: number;
  currency: string;
  receipt: string;
  notes: Record<string, string>;
}

export async function createRazorpayOrder(input: CreateRazorpayOrderInput) {
  return razorpayClient.orders.create({
    amount: input.amountPaise,
    currency: input.currency,
    receipt: input.receipt,
    payment_capture: true,
    notes: input.notes,
  });
}

export async function fetchRazorpayPayment(paymentId: string) {
  return razorpayClient.payments.fetch(paymentId);
}

/** Same HMAC-SHA256(order_id + "|" + payment_id, key_secret) scheme Razorpay's Checkout handler
 * signs with — mirrors the legacy PHP verification exactly, done server-side here instead. */
export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  const expected = createHmac('sha256', env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex');

  const expectedBuffer = Buffer.from(expected, 'hex');
  const providedBuffer = Buffer.from(signature, 'hex');

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, providedBuffer);
}
