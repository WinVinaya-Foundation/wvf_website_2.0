import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../lib/httpError.js';
import { verifyAuthToken } from '../lib/jwt.js';

declare global {
  namespace Express {
    interface Request {
      auth?: { userId: string; role: string };
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    throw new HttpError(401, 'Authentication required');
  }

  try {
    const payload = verifyAuthToken(header.slice('Bearer '.length));
    req.auth = { userId: payload.sub, role: payload.role };
    next();
  } catch {
    throw new HttpError(401, 'Invalid or expired session');
  }
}
