import { apiClient } from './client';
import type { Seat, Showtime, Theater } from '../types/cinema';

export async function fetchTheaters(city?: string): Promise<Theater[]> {
  const { data } = await apiClient.get('/theaters/', { params: city ? { city } : {} });
  return data;
}

export async function fetchShowtimesForMovie(
  movieSlug: string,
  params: { date?: string; city?: string } = {},
): Promise<Showtime[]> {
  const { data } = await apiClient.get(`/movies/${movieSlug}/showtimes/`, { params });
  return data;
}

export async function fetchShowtime(id: number): Promise<Showtime> {
  const { data } = await apiClient.get(`/showtimes/${id}/`);
  return data;
}

export async function fetchShowtimeSeats(id: number): Promise<Seat[]> {
  const { data } = await apiClient.get(`/showtimes/${id}/seats/`);
  return data;
}
