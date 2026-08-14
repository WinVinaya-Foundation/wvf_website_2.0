import { z } from 'zod';
import { indianStates } from './indianStates.js';

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const mobileRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^\d{6}$/;

const donorSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  pan: z
    .string()
    .trim()
    .toUpperCase()
    .regex(panRegex, 'Enter a valid PAN (e.g. ABCDE1234F)'),
  mobile: z.string().trim().regex(mobileRegex, 'Enter a valid 10-digit Indian mobile number'),
  phone: z
    .string()
    .trim()
    .regex(mobileRegex, 'Enter a valid 10-digit phone number')
    .optional()
    .or(z.literal('')),
  addressLine1: z.string().trim().min(1, 'Address line 1 is required'),
  addressLine2: z.string().trim().optional().or(z.literal('')),
  city: z.string().trim().min(1, 'City is required'),
  state: z.enum(indianStates, { message: 'Select a valid state' }),
  pincode: z.string().trim().regex(pincodeRegex, 'Enter a valid 6-digit PIN code'),
});

export const createOrderSchema = z.object({
  scheme: z.enum(['STUDENT_ENGLISH', 'STUDENT_ENGLISH_SOFTSKILLS', 'STUDENT_ENGLISH_SOFTSKILLS_IT_BFSI', 'RURAL_ENTREPRENEURS', 'GENERAL']),
  amount: z.coerce.number().positive('Enter a donation amount').optional(),
  donor: donorSchema,
});

export const verifyPaymentSchema = z.object({
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
