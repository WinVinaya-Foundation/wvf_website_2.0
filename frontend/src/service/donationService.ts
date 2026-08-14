import { apiClient } from './apiClient';

export type DonationScheme =
  | 'STUDENT_ENGLISH'
  | 'STUDENT_ENGLISH_SOFTSKILLS'
  | 'STUDENT_ENGLISH_SOFTSKILLS_IT_BFSI'
  | 'RURAL_ENTREPRENEURS'
  | 'GENERAL';

export type DonationStatus = 'CREATED' | 'PAID' | 'FAILED' | 'CANCELLED';

export interface DonorDetails {
  name: string;
  email: string;
  pan: string;
  mobile: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CreateDonationOrderPayload {
  scheme: DonationScheme;
  amount?: number;
  donor: DonorDetails;
}

export interface CreateDonationOrderResponse {
  reference: string;
  razorpayOrderId: string;
  razorpayKeyId: string;
  amountPaise: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorMobile: string;
}

export interface VerifyDonationPaymentPayload {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface DonationReceipt {
  reference: string;
  status: DonationStatus;
  schemeLabel: string;
  amountPaise: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorMobile: string;
  donorPanMasked: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string | null;
  vpa: string | null;
  razorpayPaymentId: string | null;
  razorpayCreatedAt: string | null;
  createdAt: string;
}

export async function createDonationOrder(payload: CreateDonationOrderPayload): Promise<CreateDonationOrderResponse> {
  const { data } = await apiClient.post<CreateDonationOrderResponse>('/donations/orders', payload);
  return data;
}

export async function verifyDonationPayment(reference: string, payload: VerifyDonationPaymentPayload): Promise<{ verified: true }> {
  const { data } = await apiClient.post<{ verified: true }>(`/donations/${reference}/verify`, payload);
  return data;
}

export async function cancelDonationOrder(reference: string): Promise<{ status: DonationStatus }> {
  const { data } = await apiClient.post<{ status: DonationStatus }>(`/donations/${reference}/cancel`);
  return data;
}

export async function getDonationReceipt(reference: string): Promise<DonationReceipt> {
  const { data } = await apiClient.get<DonationReceipt>(`/donations/${reference}`);
  return data;
}
