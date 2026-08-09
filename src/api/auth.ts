import { apiClient } from './client';
import type { AuthTokens, LoginPayload, RegisterPayload, User } from '../types/user';

export async function register(payload: RegisterPayload): Promise<{ user: User } & AuthTokens> {
  const { data } = await apiClient.post('/auth/register/', payload);
  return data;
}

export async function login(payload: LoginPayload): Promise<AuthTokens> {
  const { data } = await apiClient.post('/auth/login/', payload);
  return data;
}

export async function logout(refresh: string): Promise<void> {
  await apiClient.post('/auth/logout/', { refresh });
}

export async function fetchMe(): Promise<User> {
  const { data } = await apiClient.get('/auth/me/');
  return data;
}

export async function updateMe(payload: Partial<User>): Promise<User> {
  const { data } = await apiClient.patch('/auth/me/', payload);
  return data;
}
