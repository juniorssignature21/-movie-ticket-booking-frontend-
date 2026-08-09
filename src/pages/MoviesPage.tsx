import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import MovieCard from '../components/MovieCard';
import { fetchMovies, type MovieListParams } from '../api/movies';
import type { MovieListItem, MovieStatus } from '../types/movie';

const TABS: { label: string; status?: MovieStatus }[] = [
  { label: 'Now Showing', status: 'now_showing' },
  { label: 'Upcoming', status: 'upcoming' },
];

export const MoviesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params: MovieListParams = { status: TABS[activeTab].status };
    if (search.trim()) params.search = search.trim();

    setIsLoading(true);
    const timeout = setTimeout(() => {
      fetchMovies(params)
        .then((data) => setMovies(data.results))
        .finally(() => setIsLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [activeTab, search]);

  return (
    <PageShell>
      <div className="px-6 md:px-12 lg:px-24 py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="section-title">Movies</h1>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="bg-card border border-white/10 rounded-full px-5 py-2.5 text-white text-sm outline-none focus:border-primary transition-colors w-full md:w-72"
            />
          </div>

          <div className="flex items-center bg-[#161616] border border-white/10 rounded-full px-1.5 py-1 w-fit">
            {TABS.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === idx ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <p className="text-gray-400">Loading movies...</p>
          ) : movies.length === 0 ? (
            <p className="text-gray-400">No movies found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {movies.map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.slug}`} className="w-full">
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    image={movie.poster_url}
                    year={new Date(movie.release_date).getFullYear()}
                    rating={parseFloat(movie.average_rating)}
                    trailerUrl={movie.trailer_url}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default MoviesPage;
