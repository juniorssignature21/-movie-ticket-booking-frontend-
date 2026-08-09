export interface Theater {
  id: number;
  name: string;
  city: string;
  address: string;
}

export interface Screen {
  id: number;
  name: string;
  theater: Theater;
}

export interface Showtime {
  id: number;
  movie: number;
  movie_title: string;
  screen: Screen;
  start_time: string;
  format: '2D' | '3D' | 'IMAX';
  price_regular: string;
  price_premium: string;
  price_vip: string;
}

export type SeatType = 'regular' | 'premium' | 'vip';

export interface Seat {
  id: number;
  row_label: string;
  number: number;
  seat_type: SeatType;
  is_active: boolean;
  is_booked: boolean;
  price: number;
}
