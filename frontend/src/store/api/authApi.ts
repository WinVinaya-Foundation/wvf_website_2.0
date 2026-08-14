import { baseApi } from './baseApi';
import { setToken } from '../slices/authSlice';

export type UserRole = 'OWNER';

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (payload) => ({ url: '/auth/login', method: 'POST', data: payload }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        // Store the token and seed getCurrentUser's cache from the login response, so the
        // dashboard doesn't need a redundant /auth/me round-trip immediately after signing in.
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.token));
          dispatch(authApi.util.upsertQueryData('getCurrentUser', undefined, data.user));
        } catch {
          // Rejection is surfaced to the caller via the mutation's own error state / .unwrap().
        }
      },
    }),
    getCurrentUser: builder.query<AdminUser, void>({
      query: () => ({ url: '/auth/me', method: 'GET' }),
      transformResponse: (response: { user: AdminUser }) => response.user,
      providesTags: ['CurrentUser'],
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery } = authApi;
