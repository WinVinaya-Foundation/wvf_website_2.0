import { baseApi } from './baseApi';

export interface EbookItem {
  id: string;
  title: string;
  author: string;
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

export const ebookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicEbooks: builder.query<EbookItem[], void>({
      query: () => ({ url: '/ebook', method: 'GET' }),
      transformResponse: (response: { ebooks: EbookItem[] }) => response.ebooks,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Ebooks' as const, id })), { type: 'Ebooks', id: 'LIST' }]
          : [{ type: 'Ebooks', id: 'LIST' }],
    }),

    getAdminEbooks: builder.query<EbookItem[], void>({
      query: () => ({ url: '/admin/ebook', method: 'GET' }),
      transformResponse: (response: { ebooks: EbookItem[] }) => response.ebooks,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Ebooks' as const, id })), { type: 'Ebooks', id: 'ADMIN_LIST' }]
          : [{ type: 'Ebooks', id: 'ADMIN_LIST' }],
    }),

    createEbook: builder.mutation<EbookItem, FormData>({
      query: (formData) => ({ url: '/admin/ebook', method: 'POST', data: formData }),
      transformResponse: (response: { ebook: EbookItem }) => response.ebook,
      invalidatesTags: [{ type: 'Ebooks', id: 'LIST' }, { type: 'Ebooks', id: 'ADMIN_LIST' }],
    }),

    updateEbook: builder.mutation<EbookItem, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({ url: `/admin/ebook/${id}`, method: 'PUT', data: formData }),
      transformResponse: (response: { ebook: EbookItem }) => response.ebook,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Ebooks', id },
        { type: 'Ebooks', id: 'LIST' },
        { type: 'Ebooks', id: 'ADMIN_LIST' },
      ],
    }),

    toggleEbookStatus: builder.mutation<EbookItem, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({ url: `/admin/ebook/${id}/status`, method: 'PATCH', data: { isActive } }),
      transformResponse: (response: { ebook: EbookItem }) => response.ebook,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Ebooks', id },
        { type: 'Ebooks', id: 'LIST' },
        { type: 'Ebooks', id: 'ADMIN_LIST' },
      ],
    }),

    deleteEbook: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `/admin/ebook/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Ebooks', id: 'LIST' }, { type: 'Ebooks', id: 'ADMIN_LIST' }],
    }),
  }),
});

export const {
  useGetPublicEbooksQuery,
  useGetAdminEbooksQuery,
  useCreateEbookMutation,
  useUpdateEbookMutation,
  useToggleEbookStatusMutation,
  useDeleteEbookMutation,
} = ebookApi;
