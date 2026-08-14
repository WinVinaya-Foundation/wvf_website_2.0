import { Router } from 'express';
import { createOrderLimiter, donationsGeneralLimiter } from '../middleware/rateLimiters.js';
import { cancelOrderHandler, createOrderHandler, getReceiptHandler, verifyPaymentHandler } from './donations.controller.js';

export const donationsRouter = Router();

donationsRouter.use(donationsGeneralLimiter);

donationsRouter.post('/orders', createOrderLimiter, createOrderHandler);
donationsRouter.post('/:reference/verify', verifyPaymentHandler);
donationsRouter.post('/:reference/cancel', cancelOrderHandler);
donationsRouter.get('/:reference', getReceiptHandler);
