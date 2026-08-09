export type MovieStatus = 'now_showing' | 'upcoming' | 'ended';

export interface Genre {
  id: number;
  name: string;
}

export interface Actor {
  id: number;
  name: string;
  image_url: string;
  role: string;
  bio: string;
}

export interface MovieCast {
  actor: Actor;
  character_name: string;
}

export interface MovieListItem {
  id: number;
  title: string;
  slug: string;
  poster_url: string;
  trailer_url: string;
  release_date: string;
  duration_minutes: number;
  average_rating: string;
  status: MovieStatus;
  is_trending: boolean;
  age_rating: string;
}

export interface MovieDetail extends MovieListItem {
  synopsis: string;
  banner_url: string;
  language: string;
  genres: Genre[];
  cast: MovieCast[];
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface MovieWritePayload {
  title: string;
  synopsis: string;
  poster_url: string;
  banner_url?: string;
  trailer_url?: string;
  duration_minutes: number;
  release_date: string;
  age_rating: string;
  average_rating?: number;
  language: string;
  status: MovieStatus;
  is_trending: boolean;
  genres: number[];
}

export interface MovieWriteResult extends MovieWritePayload {
  id: number;
  slug: string;
}
