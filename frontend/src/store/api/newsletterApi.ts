import { baseApi } from './baseApi';

export interface NewsletterItem {
  id: string;
  title: string;
  issueLabel: string;
  publishedAt: string;
  description: string;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  coverImageUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicNewsletters: builder.query<NewsletterItem[], void>({
      query: () => ({ url: '/newsletter', method: 'GET' }),
      transformResponse: (response: { newsletters: NewsletterItem[] }) => response.newsletters,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Newsletters' as const, id })), { type: 'Newsletters', id: 'LIST' }]
          : [{ type: 'Newsletters', id: 'LIST' }],
    }),

    getAdminNewsletters: builder.query<NewsletterItem[], void>({
      query: () => ({ url: '/admin/newsletter', method: 'GET' }),
      transformResponse: (response: { newsletters: NewsletterItem[] }) => response.newsletters,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Newsletters' as const, id })), { type: 'Newsletters', id: 'ADMIN_LIST' }]
          : [{ type: 'Newsletters', id: 'ADMIN_LIST' }],
    }),

    createNewsletter: builder.mutation<NewsletterItem, FormData>({
      query: (formData) => ({
        url: '/admin/newsletter',
        method: 'POST',
        data: formData,
      }),
      transformResponse: (response: { newsletter: NewsletterItem }) => response.newsletter,
      invalidatesTags: [{ type: 'Newsletters', id: 'LIST' }, { type: 'Newsletters', id: 'ADMIN_LIST' }],
    }),

    updateNewsletter: builder.mutation<NewsletterItem, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/admin/newsletter/${id}`,
        method: 'PUT',
        data: formData,
      }),
      transformResponse: (response: { newsletter: NewsletterItem }) => response.newsletter,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Newsletters', id },
        { type: 'Newsletters', id: 'LIST' },
        { type: 'Newsletters', id: 'ADMIN_LIST' },
      ],
    }),

    toggleNewsletterStatus: builder.mutation<NewsletterItem, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({ url: `/admin/newsletter/${id}/status`, method: 'PATCH', data: { isActive } }),
      transformResponse: (response: { newsletter: NewsletterItem }) => response.newsletter,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Newsletters', id },
        { type: 'Newsletters', id: 'LIST' },
        { type: 'Newsletters', id: 'ADMIN_LIST' },
      ],
    }),

    deleteNewsletter: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/admin/newsletter/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Newsletters', id: 'LIST' }, { type: 'Newsletters', id: 'ADMIN_LIST' }],
    }),
  }),
});

export const {
  useGetPublicNewslettersQuery,
  useGetAdminNewslettersQuery,
  useCreateNewsletterMutation,
  useUpdateNewsletterMutation,
  useToggleNewsletterStatusMutation,
  useDeleteNewsletterMutation,
} = newsletterApi;
