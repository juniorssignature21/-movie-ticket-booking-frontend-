import { apiClient } from './client';
import type { Booking } from '../types/booking';
import type { Paginated } from '../types/movie';
import type { User } from '../types/user';

export interface AdminDashboard {
  user_count: number;
  staff_count: number;
  booking_count: number;
  confirmed_booking_count: number;
  total_earnings: string;
}

export interface CreateStaffPayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

export async function fetchAdminDashboard(): Promise<AdminDashboard> {
  const { data } = await apiClient.get('/admin/dashboard/');
  return data;
}

export async function fetchAdminUsers(page = 1): Promise<Paginated<User>> {
  const { data } = await apiClient.get('/admin/users/', { params: { page, page_size: 50 } });
  return data;
}

export async function createStaff(payload: CreateStaffPayload): Promise<User> {
  const { data } = await apiClient.post('/admin/users/', payload);
  return data;
}

export async function fetchAdminBookings(page = 1): Promise<Paginated<Booking>> {
  const { data } = await apiClient.get('/admin/bookings/', { params: { page, page_size: 50 } });
  return data;
}
