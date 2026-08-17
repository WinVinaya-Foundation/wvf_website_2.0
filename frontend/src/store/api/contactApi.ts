import { baseApi } from './baseApi';

export type InquiryStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'ARCHIVED';

export interface ContactInquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  reason: string;
  message: string;
  status: InquiryStatus;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  reason: string;
  message: string;
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation<{ success: boolean; inquiry: ContactInquiryItem }, SubmitContactFormPayload>({
      query: (payload) => ({ url: '/contact', method: 'POST', data: payload }),
      invalidatesTags: [{ type: 'ContactInquiries', id: 'ADMIN_LIST' }],
    }),

    getAdminInquiries: builder.query<ContactInquiryItem[], void>({
      query: () => ({ url: '/admin/contact', method: 'GET' }),
      transformResponse: (response: { inquiries: ContactInquiryItem[] }) => response.inquiries,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'ContactInquiries' as const, id })), { type: 'ContactInquiries', id: 'ADMIN_LIST' }]
          : [{ type: 'ContactInquiries', id: 'ADMIN_LIST' }],
    }),

    updateInquiryStatus: builder.mutation<ContactInquiryItem, { id: string; status?: InquiryStatus; adminNotes?: string | null }>({
      query: ({ id, ...payload }) => ({ url: `/admin/contact/${id}`, method: 'PATCH', data: payload }),
      transformResponse: (response: { inquiry: ContactInquiryItem }) => response.inquiry,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'ContactInquiries', id },
        { type: 'ContactInquiries', id: 'ADMIN_LIST' },
      ],
    }),

    deleteInquiry: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `/admin/contact/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'ContactInquiries', id: 'ADMIN_LIST' }],
    }),
  }),
});

export const {
  useSubmitContactFormMutation,
  useGetAdminInquiriesQuery,
  useUpdateInquiryStatusMutation,
  useDeleteInquiryMutation,
} = contactApi;
