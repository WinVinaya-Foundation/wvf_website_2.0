import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  RAZORPAY_KEY_ID: z.string().min(1, 'RAZORPAY_KEY_ID is required'),
  RAZORPAY_KEY_SECRET: z.string().min(1, 'RAZORPAY_KEY_SECRET is required'),
  FRONTEND_ORIGIN: z.string().min(1).default('http://localhost:5173'),
  MIN_GENERAL_DONATION_PAISE: z.coerce.number().int().positive().default(50000),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().min(1).default('12h'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:');
  console.error(z.prettifyError(parsed.error));
  throw new Error('Invalid environment configuration — see errors above. Check backend/.env against backend/.env.example.');
}

export const env = parsed.data;
