import { prisma } from '../lib/prisma.js';
import { createRazorpayOrder, fetchRazorpayPayment, verifyRazorpaySignature } from '../lib/razorpay.js';
import { generateDonationReference } from '../lib/reference.js';
import { HttpError } from '../lib/httpError.js';
import { env } from '../env.js';
import { donationTiers } from './donationTiers.js';
import type { CreateOrderInput, VerifyPaymentInput } from './donations.schemas.js';

function maskPan(pan: string): string {
  return `${pan.slice(0, 5)}****${pan.slice(9)}`;
}

export async function createOrder(input: CreateOrderInput) {
  const tier = donationTiers[input.scheme];

  let amountPaise: number;
  if (tier.amountPaise !== null) {
    // Fixed tier — the client's submitted amount is ignored entirely; the price is
    // server-authoritative so a tampered request body can never change what gets charged.
    amountPaise = tier.amountPaise;
  } else {
    if (!input.amount) {
      throw new HttpError(400, 'Enter a donation amount');
    }
    amountPaise = Math.round(input.amount * 100);
    if (amountPaise < env.MIN_GENERAL_DONATION_PAISE) {
      const minRupees = env.MIN_GENERAL_DONATION_PAISE / 100;
      throw new HttpError(400, `General donations must be at least ₹${minRupees}`);
    }
  }

  const reference = generateDonationReference();

  const order = await createRazorpayOrder({
    amountPaise,
    currency: 'INR',
    receipt: reference,
    notes: {
      reference,
      scheme: input.scheme,
      donorName: input.donor.name,
      donorEmail: input.donor.email,
      pan: input.donor.pan,
    },
  });

  const donation = await prisma.donation.create({
    data: {
      reference,
      scheme: input.scheme,
      schemeLabel: tier.label,
      amountPaise,
      currency: 'INR',
      donorName: input.donor.name,
      donorEmail: input.donor.email,
      donorPan: input.donor.pan,
      donorMobile: input.donor.mobile,
      donorPhone: input.donor.phone || null,
      addressLine1: input.donor.addressLine1,
      addressLine2: input.donor.addressLine2 || null,
      city: input.donor.city,
      state: input.donor.state,
      pincode: input.donor.pincode,
      razorpayOrderId: order.id,
      status: 'CREATED',
    },
  });

  return {
    reference: donation.reference,
    razorpayOrderId: order.id,
    razorpayKeyId: env.RAZORPAY_KEY_ID,
    amountPaise,
    currency: 'INR',
    donorName: donation.donorName,
    donorEmail: donation.donorEmail,
    donorMobile: donation.donorMobile,
  };
}

export async function verifyPayment(reference: string, input: VerifyPaymentInput) {
  const donation = await prisma.donation.findUnique({ where: { reference } });
  if (!donation) {
    throw new HttpError(404, 'Donation not found');
  }

  if (donation.razorpayOrderId !== input.razorpayOrderId) {
    throw new HttpError(400, 'Order mismatch');
  }

  const signatureValid = verifyRazorpaySignature(input.razorpayOrderId, input.razorpayPaymentId, input.razorpaySignature);

  if (!signatureValid) {
    await prisma.donation.update({ where: { reference }, data: { status: 'FAILED' } });
    throw new HttpError(400, 'Payment verification failed', { reason: 'signature_mismatch' });
  }

  const payment = await fetchRazorpayPayment(input.razorpayPaymentId);

  if (payment.status !== 'captured') {
    await prisma.donation.update({
      where: { reference },
      data: { status: 'FAILED', razorpayPaymentId: input.razorpayPaymentId, razorpaySignature: input.razorpaySignature },
    });
    throw new HttpError(400, 'Payment was not captured', { reason: 'not_captured' });
  }

  await prisma.donation.update({
    where: { reference },
    data: {
      status: 'PAID',
      razorpayPaymentId: input.razorpayPaymentId,
      razorpaySignature: input.razorpaySignature,
      paymentMethod: payment.method ?? null,
      vpa: (payment as { vpa?: string }).vpa ?? null,
      razorpayCreatedAt: new Date(payment.created_at * 1000),
    },
  });

  return { verified: true as const, reference };
}

export async function cancelOrder(reference: string) {
  const donation = await prisma.donation.findUnique({ where: { reference } });
  if (!donation) {
    throw new HttpError(404, 'Donation not found');
  }

  // Only CREATED -> CANCELLED. Never clobber a PAID/FAILED row — protects against a race where
  // the Checkout modal's ondismiss fires after a handler-driven verify already completed.
  if (donation.status !== 'CREATED') {
    return { status: donation.status };
  }

  const updated = await prisma.donation.update({ where: { reference }, data: { status: 'CANCELLED' } });
  return { status: updated.status };
}

export interface ListDonationsParams {
  from?: Date;
  to?: Date;
  /** Omit for no cap — used by the full-range export, where the whole match set is wanted. */
  limit?: number;
}

export async function listDonationsForAdmin(params: ListDonationsParams = {}) {
  const { from, to, limit = 200 } = params;

  const donations = await prisma.donation.findMany({
    where: from || to ? { createdAt: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : undefined,
    orderBy: { createdAt: 'desc' },
    ...(limit ? { take: limit } : {}),
  });

  return donations.map((donation) => ({
    id: donation.id,
    reference: donation.reference,
    donorName: donation.donorName,
    donorEmail: donation.donorEmail,
    donorMobile: donation.donorMobile,
    schemeLabel: donation.schemeLabel,
    amountPaise: donation.amountPaise,
    currency: donation.currency,
    status: donation.status,
    createdAt: donation.createdAt,
  }));
}

export async function getDonationStats() {
  const [paidAgg, paidDonorEmails, pendingCount, cancelledCount] = await Promise.all([
    prisma.donation.aggregate({
      where: { status: 'PAID' },
      _sum: { amountPaise: true },
      _count: true,
    }),
    prisma.donation.findMany({
      where: { status: 'PAID' },
      distinct: ['donorEmail'],
      select: { donorEmail: true },
    }),
    prisma.donation.count({ where: { status: 'CREATED' } }),
    prisma.donation.count({ where: { status: 'CANCELLED' } }),
  ]);

  return {
    totalRaisedPaise: paidAgg._sum.amountPaise ?? 0,
    paidDonationsCount: paidAgg._count,
    uniqueDonorsCount: paidDonorEmails.length,
    pendingDonationsCount: pendingCount,
    cancelledDonationsCount: cancelledCount,
  };
}

export async function getReceipt(reference: string) {
  const donation = await prisma.donation.findUnique({ where: { reference } });
  if (!donation) {
    throw new HttpError(404, 'Donation not found');
  }

  return {
    reference: donation.reference,
    status: donation.status,
    schemeLabel: donation.schemeLabel,
    amountPaise: donation.amountPaise,
    currency: donation.currency,
    donorName: donation.donorName,
    donorEmail: donation.donorEmail,
    donorMobile: donation.donorMobile,
    donorPanMasked: maskPan(donation.donorPan),
    addressLine1: donation.addressLine1,
    addressLine2: donation.addressLine2,
    city: donation.city,
    state: donation.state,
    pincode: donation.pincode,
    paymentMethod: donation.paymentMethod,
    vpa: donation.vpa,
    razorpayPaymentId: donation.razorpayPaymentId,
    razorpayCreatedAt: donation.razorpayCreatedAt,
    createdAt: donation.createdAt,
  };
}
