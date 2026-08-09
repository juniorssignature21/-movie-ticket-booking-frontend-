import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { AuthTokens } from '../types/user';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1';

const ACCESS_TOKEN_KEY = '9jacine_access_token';
const REFRESH_TOKEN_KEY = '9jacine_refresh_token';

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  set: (tokens: AuthTokens) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // Skips ngrok's free-tier browser-warning interstitial when the API is tunneled
    // through ngrok; harmless no-op against any other host (e.g. plain localhost).
    'ngrok-skip-browser-warning': 'true',
  },
});

apiClient.interceptors.request.use((config) => {
  const access = tokenStorage.getAccess();
  if (access && config.headers) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) return null;

  try {
    const response = await axios.post<{ access: string }>(`${API_BASE_URL}/auth/refresh/`, { refresh });
    const access = response.data.access;
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    return access;
  } catch {
    tokenStorage.clear();
    return null;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccess = await refreshPromise;
      if (newAccess) {
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { detail?: unknown } | undefined;
    if (data?.detail) {
      if (typeof data.detail === 'string') return data.detail;
      if (typeof data.detail === 'object') {
        const firstKey = Object.keys(data.detail)[0];
        const value = (data.detail as Record<string, unknown>)[firstKey];
        if (Array.isArray(value)) return String(value[0]);
        if (typeof value === 'string') return value;
      }
    }
  }
  return fallback;
}
