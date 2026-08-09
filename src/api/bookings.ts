import { apiClient } from './client';
import type { Booking, BookingWithPayment, CreateBookingPayload, FrontdeskBookingPayload } from '../types/booking';
import type { Paginated } from '../types/movie';

export async function createBooking(payload: CreateBookingPayload): Promise<BookingWithPayment> {
  const { data } = await apiClient.post('/bookings/', payload);
  return data;
}

export async function createFrontdeskBooking(payload: FrontdeskBookingPayload): Promise<Booking> {
  const { data } = await apiClient.post('/frontdesk/bookings/', payload);
  return data;
}

export async function fetchMyBookings(): Promise<Paginated<Booking>> {
  const { data } = await apiClient.get('/bookings/');
  return data;
}

export async function fetchBooking(reference: string): Promise<Booking> {
  const { data } = await apiClient.get(`/bookings/${reference}/`);
  return data;
}

export async function cancelBooking(reference: string): Promise<Booking> {
  const { data } = await apiClient.post(`/bookings/${reference}/cancel/`);
  return data;
}

export async function verifyPayment(reference: string): Promise<Booking> {
  const { data } = await apiClient.post(`/payments/verify/${reference}/`);
  return data;
}
