import { apiClient } from './apiClient';
import type { DonationStatus } from './donationService';

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

export async function getDonors(): Promise<DonorsResponse> {
  const { data } = await apiClient.get<DonorsResponse>('/admin/donors');
  return data;
}

export interface ExportDonorsRange {
  from: string | null;
  to: string | null;
}

export async function exportDonors({ from, to }: ExportDonorsRange): Promise<AdminDonationListItem[]> {
  const { data } = await apiClient.get<{ donations: AdminDonationListItem[] }>('/admin/donors/export', {
    params: { ...(from ? { from } : {}), ...(to ? { to } : {}) },
  });
  return data.donations;
}
