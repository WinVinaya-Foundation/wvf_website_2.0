import type { Request, Response, NextFunction } from 'express';
import { sanitizeObject } from '../lib/security.js';

/** Express middleware that automatically sanitizes incoming request body text to protect against XSS injection attacks. */
export function sanitizeRequestBody(req: Request, _res: Response, next: NextFunction): void {
  if (req.body && typeof req.body === 'object' && !(req.body instanceof Buffer)) {
    req.body = sanitizeObject(req.body);
  }
  next();
}
