import type { Seat, Showtime } from './cinema';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
export type PaymentStatus = 'pending' | 'success' | 'failed';
export type PaymentMethod = 'online' | 'cash' | 'pos';

export interface BookingSeat {
  seat: Seat;
  price: string;
}

export interface Payment {
  paystack_reference: string;
  status: PaymentStatus;
  method: PaymentMethod;
  paid_at: string | null;
}

export interface Booking {
  reference: string;
  showtime: Showtime;
  seats: BookingSeat[];
  payment: Payment | null;
  status: BookingStatus;
  total_amount: string;
  created_at: string;
  customer_email: string;
  customer_name: string;
}

export interface BookingWithPayment extends Booking {
  authorization_url: string;
}

export interface CreateBookingPayload {
  showtime_id: number;
  seat_ids: number[];
}

export interface FrontdeskBookingPayload {
  showtime_id: number;
  seat_ids: number[];
  customer_email: string;
  customer_first_name?: string;
  customer_last_name?: string;
  payment_method: 'cash' | 'pos';
}
