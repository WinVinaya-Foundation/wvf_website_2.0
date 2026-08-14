import type { Request, Response } from 'express';
import { HttpError } from '../lib/httpError.js';
import { loginSchema } from './auth.schemas.js';
import * as authService from './auth.service.js';

export async function loginHandler(req: Request, res: Response): Promise<void> {
  const input = loginSchema.parse(req.body);
  const result = await authService.login(input);
  res.status(200).json(result);
}

export async function meHandler(req: Request, res: Response): Promise<void> {
  if (!req.auth) {
    throw new HttpError(401, 'Authentication required');
  }
  const user = await authService.getCurrentUser(req.auth.userId);
  res.status(200).json({ user });
}
