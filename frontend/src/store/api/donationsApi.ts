import { baseApi } from './baseApi';

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

export const donationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDonationOrder: builder.mutation<CreateDonationOrderResponse, CreateDonationOrderPayload>({
      query: (payload) => ({ url: '/donations/orders', method: 'POST', data: payload }),
    }),
    verifyDonationPayment: builder.mutation<{ verified: true }, { reference: string; payload: VerifyDonationPaymentPayload }>({
      query: ({ reference, payload }) => ({ url: `/donations/${reference}/verify`, method: 'POST', data: payload }),
    }),
    cancelDonationOrder: builder.mutation<{ status: DonationStatus }, string>({
      query: (reference) => ({ url: `/donations/${reference}/cancel`, method: 'POST' }),
    }),
    getDonationReceipt: builder.query<DonationReceipt, string>({
      query: (reference) => ({ url: `/donations/${reference}`, method: 'GET' }),
    }),
  }),
});

export const {
  useCreateDonationOrderMutation,
  useVerifyDonationPaymentMutation,
  useCancelDonationOrderMutation,
  useGetDonationReceiptQuery,
} = donationsApi;
