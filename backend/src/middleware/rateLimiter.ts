import { rateLimit } from 'express-rate-limit';

/** Global rate limiter: Max 300 requests per 15 minutes per IP address */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

/** Form submission rate limiter: Max 5 submissions per 15 minutes per IP address to prevent spam bots */
export const formSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many submissions sent from this IP address. Please wait 15 minutes before submitting again.',
  },
});

/** Admin Login rate limiter: Max 5 attempts per 15 minutes per IP to prevent Brute-Force & Credential Stuffing */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many failed login attempts from this IP address. Account access locked for 15 minutes for security.',
  },
});
