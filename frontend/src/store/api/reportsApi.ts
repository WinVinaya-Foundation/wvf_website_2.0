import { baseApi } from './baseApi';

export type ReportCategory = 'ANNUAL' | 'FINANCIAL' | 'LEGAL' | 'RESEARCH';

export interface ReportItem {
  id: string;
  title: string;
  category: ReportCategory;
  year?: string | null;
  description?: string | null;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminReportsResponse {
  reports: ReportItem[];
  maxFileSizeMb: number;
}

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicReports: builder.query<ReportItem[], { category?: ReportCategory } | void>({
      query: (arg) => ({
        url: '/reports',
        method: 'GET',
        params: arg?.category ? { category: arg.category } : undefined,
      }),
      transformResponse: (response: { reports: ReportItem[] }) => response.reports,
      providesTags: ['Reports'],
    }),

    getAdminReports: builder.query<AdminReportsResponse, { category?: ReportCategory } | void>({
      query: (arg) => ({
        url: '/admin/reports',
        method: 'GET',
        params: arg?.category ? { category: arg.category } : undefined,
      }),
      providesTags: ['Reports'],
    }),

    createReport: builder.mutation<ReportItem, FormData>({
      query: (formData) => ({
        url: '/admin/reports',
        method: 'POST',
        data: formData,
      }),
      invalidatesTags: ['Reports'],
    }),

    updateReport: builder.mutation<ReportItem, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/admin/reports/${id}`,
        method: 'PUT',
        data: formData,
      }),
      invalidatesTags: ['Reports'],
    }),

    toggleReportStatus: builder.mutation<ReportItem, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `/admin/reports/${id}/status`,
        method: 'PATCH',
        data: { isActive },
      }),
      invalidatesTags: ['Reports'],
    }),

    deleteReport: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/admin/reports/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reports'],
    }),
  }),
});

export const {
  useGetPublicReportsQuery,
  useGetAdminReportsQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useToggleReportStatusMutation,
  useDeleteReportMutation,
} = reportsApi;
