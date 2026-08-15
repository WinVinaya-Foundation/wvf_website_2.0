import { baseApi } from './baseApi';

export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';

export interface JobItem {
  id: string;
  title: string;
  department?: string | null;
  employmentType: EmploymentType;
  location: string;
  experience: string;
  description: string;
  requirements?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const careersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCareers: builder.query<JobItem[], void>({
      query: () => ({ url: '/careers', method: 'GET' }),
      transformResponse: (response: { jobs: JobItem[] }) => response.jobs,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Careers' as const, id })), { type: 'Careers', id: 'LIST' }]
          : [{ type: 'Careers', id: 'LIST' }],
    }),

    getAdminCareers: builder.query<JobItem[], void>({
      query: () => ({ url: '/admin/careers', method: 'GET' }),
      transformResponse: (response: { jobs: JobItem[] }) => response.jobs,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Careers' as const, id })), { type: 'Careers', id: 'ADMIN_LIST' }]
          : [{ type: 'Careers', id: 'ADMIN_LIST' }],
    }),

    createCareer: builder.mutation<JobItem, FormData>({
      query: (formData) => ({ url: '/admin/careers', method: 'POST', data: formData }),
      transformResponse: (response: { job: JobItem }) => response.job,
      invalidatesTags: [{ type: 'Careers', id: 'LIST' }, { type: 'Careers', id: 'ADMIN_LIST' }],
    }),

    updateCareer: builder.mutation<JobItem, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({ url: `/admin/careers/${id}`, method: 'PUT', data: formData }),
      transformResponse: (response: { job: JobItem }) => response.job,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Careers', id },
        { type: 'Careers', id: 'LIST' },
        { type: 'Careers', id: 'ADMIN_LIST' },
      ],
    }),

    toggleCareerStatus: builder.mutation<JobItem, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({ url: `/admin/careers/${id}/status`, method: 'PATCH', data: { isActive } }),
      transformResponse: (response: { job: JobItem }) => response.job,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Careers', id },
        { type: 'Careers', id: 'LIST' },
        { type: 'Careers', id: 'ADMIN_LIST' },
      ],
    }),

    deleteCareer: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `/admin/careers/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Careers', id: 'LIST' }, { type: 'Careers', id: 'ADMIN_LIST' }],
    }),
  }),
});

export const {
  useGetPublicCareersQuery,
  useGetAdminCareersQuery,
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useToggleCareerStatusMutation,
  useDeleteCareerMutation,
} = careersApi;
