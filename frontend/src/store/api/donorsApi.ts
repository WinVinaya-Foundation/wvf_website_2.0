import { baseApi } from './baseApi';
import type { DonationStatus } from './donationsApi';

export interface AdminDonationListItem {
  id: string;
  reference: string;
  donorName: string;
  donorEmail: string;
  donorMobile: string;
  schemeLabel: string;
  amountPaise: number;
  currency: string;
  status: DonationStatus;
  createdAt: string;
}

export interface DonorStats {
  totalRaisedPaise: number;
  paidDonationsCount: number;
  uniqueDonorsCount: number;
  pendingDonationsCount: number;
  cancelledDonationsCount: number;
}

export interface DonorsResponse {
  donations: AdminDonationListItem[];
  stats: DonorStats;
}

export interface ExportDonorsRange {
  from: string | null;
  to: string | null;
}

export const donorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDonors: builder.query<DonorsResponse, void>({
      query: () => ({ url: '/admin/donors', method: 'GET' }),
      providesTags: ['Donors'],
    }),
    // A query (not a mutation) since it only reads data — but it's triggered imperatively via
    // useLazyExportDonorsQuery from a click handler, not rendered/subscribed to like getDonors.
    exportDonors: builder.query<AdminDonationListItem[], ExportDonorsRange>({
      query: ({ from, to }) => ({
        url: '/admin/donors/export',
        method: 'GET',
        params: { ...(from ? { from } : {}), ...(to ? { to } : {}) },
      }),
      transformResponse: (response: { donations: AdminDonationListItem[] }) => response.donations,
    }),
  }),
});

export const { useGetDonorsQuery, useLazyExportDonorsQuery } = donorsApi;
