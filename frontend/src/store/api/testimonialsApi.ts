import { baseApi } from './baseApi';

export type TestimonialCategoryType = 'CANDIDATE' | 'CORPORATE' | 'INSTITUTIONAL';

export interface TestimonialItem {
  id: string;
  category: TestimonialCategoryType;
  name: string;
  role: string;
  quote: string;
  disability?: string | null;
  title?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialInput {
  category: TestimonialCategoryType;
  name: string;
  role: string;
  quote: string;
  disability?: string;
  title?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicTestimonials: builder.query<TestimonialItem[], { category?: TestimonialCategoryType } | void>({
      query: (arg) => ({
        url: '/testimonials',
        method: 'GET',
        params: arg?.category ? { category: arg.category } : undefined,
      }),
      transformResponse: (response: { testimonials: TestimonialItem[] }) => response.testimonials,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Testimonials' as const, id })), { type: 'Testimonials', id: 'LIST' }]
          : [{ type: 'Testimonials', id: 'LIST' }],
    }),

    getAdminTestimonials: builder.query<TestimonialItem[], void>({
      query: () => ({ url: '/admin/testimonials', method: 'GET' }),
      transformResponse: (response: { testimonials: TestimonialItem[] }) => response.testimonials,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Testimonials' as const, id })), { type: 'Testimonials', id: 'ADMIN_LIST' }]
          : [{ type: 'Testimonials', id: 'ADMIN_LIST' }],
    }),

    createTestimonial: builder.mutation<TestimonialItem, TestimonialInput>({
      query: (data) => ({ url: '/admin/testimonials', method: 'POST', data }),
      transformResponse: (response: { testimonial: TestimonialItem }) => response.testimonial,
      invalidatesTags: [{ type: 'Testimonials', id: 'LIST' }, { type: 'Testimonials', id: 'ADMIN_LIST' }],
    }),

    updateTestimonial: builder.mutation<TestimonialItem, { id: string; data: Partial<TestimonialInput> }>({
      query: ({ id, data }) => ({ url: `/admin/testimonials/${id}`, method: 'PUT', data }),
      transformResponse: (response: { testimonial: TestimonialItem }) => response.testimonial,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Testimonials', id },
        { type: 'Testimonials', id: 'LIST' },
        { type: 'Testimonials', id: 'ADMIN_LIST' },
      ],
    }),

    toggleTestimonialStatus: builder.mutation<TestimonialItem, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({ url: `/admin/testimonials/${id}/status`, method: 'PATCH', data: { isActive } }),
      transformResponse: (response: { testimonial: TestimonialItem }) => response.testimonial,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Testimonials', id },
        { type: 'Testimonials', id: 'LIST' },
        { type: 'Testimonials', id: 'ADMIN_LIST' },
      ],
    }),

    deleteTestimonial: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/admin/testimonials/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Testimonials', id: 'LIST' }, { type: 'Testimonials', id: 'ADMIN_LIST' }],
    }),
  }),
});

export const {
  useGetPublicTestimonialsQuery,
  useGetAdminTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useToggleTestimonialStatusMutation,
  useDeleteTestimonialMutation,
} = testimonialsApi;
