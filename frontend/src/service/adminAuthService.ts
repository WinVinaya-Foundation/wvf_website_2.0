import { apiClient } from './apiClient';

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

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', payload);
  return data;
}

export async function getCurrentUser(): Promise<AdminUser> {
  const { data } = await apiClient.get<{ user: AdminUser }>('/auth/me');
  return data.user;
}
