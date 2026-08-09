import { apiClient } from './client';
import type {
  Actor,
  Genre,
  MovieDetail,
  MovieListItem,
  MovieWritePayload,
  MovieWriteResult,
  Paginated,
} from '../types/movie';

export interface MovieListParams {
  status?: 'now_showing' | 'upcoming' | 'ended';
  is_trending?: boolean;
  genre?: string;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export async function fetchMovies(params: MovieListParams = {}): Promise<Paginated<MovieListItem>> {
  const { data } = await apiClient.get('/movies/', { params });
  return data;
}

export async function fetchMovie(slug: string): Promise<MovieDetail> {
  const { data } = await apiClient.get(`/movies/${slug}/`);
  return data;
}

export async function fetchGenres(): Promise<Genre[]> {
  const { data } = await apiClient.get('/genres/');
  return data;
}

export async function fetchActors(): Promise<Paginated<Actor>> {
  const { data } = await apiClient.get('/actors/');
  return data;
}

export async function createMovie(payload: MovieWritePayload): Promise<MovieWriteResult> {
  const { data } = await apiClient.post('/movies/', payload);
  return data;
}

export async function updateMovie(slug: string, payload: MovieWritePayload): Promise<MovieWriteResult> {
  const { data } = await apiClient.put(`/movies/${slug}/`, payload);
  return data;
}

export async function deleteMovie(slug: string): Promise<void> {
  await apiClient.delete(`/movies/${slug}/`);
}
