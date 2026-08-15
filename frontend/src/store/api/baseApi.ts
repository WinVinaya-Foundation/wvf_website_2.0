import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { apiClient } from '../../service/apiClient';

export interface ApiError {
  status?: number;
  message: string;
  details?: unknown;
}

type AxiosBaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: unknown;
  params?: unknown;
};

const axiosBaseQuery = (): BaseQueryFn<AxiosBaseQueryArgs, unknown, ApiError> => async ({ url, method, data, params }) => {
  try {
    const result = await apiClient({ url, method, data, params });
    return { data: result.data };
  } catch (err) {
    const axiosError = err as AxiosError<{ error?: string; details?: unknown }>;
    return {
      error: {
        status: axiosError.response?.status,
        message: axiosError.response?.data?.error ?? axiosError.message,
        details: axiosError.response?.data?.details,
      },
    };
  }
};

/** The single RTK Query instance for the app — domain endpoint files (authApi, donorsApi, …)
 * attach to it via `injectEndpoints` rather than each creating their own `createApi`. */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['CurrentUser', 'Donors', 'Reports', 'Events', 'Gallery', 'Categories', 'Stories', 'Testimonials', 'Blogs', 'Newsletters', 'Ebooks'],
  endpoints: () => ({}),
});
