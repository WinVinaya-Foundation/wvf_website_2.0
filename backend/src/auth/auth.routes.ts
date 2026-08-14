import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { loginLimiter } from '../middleware/rateLimiters.js';
import { loginHandler, meHandler } from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/login', loginLimiter, loginHandler);
authRouter.get('/me', authenticate, meHandler);
