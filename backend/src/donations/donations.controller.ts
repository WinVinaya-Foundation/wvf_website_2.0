import type { Request, Response } from 'express';
import { HttpError } from '../lib/httpError.js';
import { createOrderSchema, verifyPaymentSchema } from './donations.schemas.js';
import * as donationsService from './donations.service.js';

function getReferenceParam(req: Request): string {
  const { reference } = req.params;
  if (typeof reference !== 'string' || reference.length === 0) {
    throw new HttpError(400, 'Missing donation reference');
  }
  return reference;
}

export async function createOrderHandler(req: Request, res: Response): Promise<void> {
  const input = createOrderSchema.parse(req.body);
  const result = await donationsService.createOrder(input);
  res.status(201).json(result);
}

export async function verifyPaymentHandler(req: Request, res: Response): Promise<void> {
  const input = verifyPaymentSchema.parse(req.body);
  const result = await donationsService.verifyPayment(getReferenceParam(req), input);
  res.status(200).json(result);
}

export async function cancelOrderHandler(req: Request, res: Response): Promise<void> {
  const result = await donationsService.cancelOrder(getReferenceParam(req));
  res.status(200).json(result);
}

export async function getReceiptHandler(req: Request, res: Response): Promise<void> {
  const result = await donationsService.getReceipt(getReferenceParam(req));
  res.status(200).json(result);
}
