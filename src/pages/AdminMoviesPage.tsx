import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import PageShell from '../components/PageShell';
import { deleteMovie, fetchMovies } from '../api/movies';
import type { MovieListItem } from '../types/movie';

export const AdminMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const loadMovies = () => {
    setIsLoading(true);
    fetchMovies({ ordering: '-release_date', page_size: 50 })
      .then((data) => setMovies(data.results))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingSlug(slug);
    try {
      await deleteMovie(slug);
      loadMovies();
    } finally {
      setDeletingSlug(null);
    }
  };

  return (
    <PageShell>
      <div className="px-6 md:px-12 lg:px-24 py-6 pb-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="section-title">Manage Movies</h1>
            <Link
              to="/admin/movies/new"
              className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold px-5 py-2.5 rounded-full text-sm tracking-wide transition-all duration-200"
            >
              <Plus size={16} />
              Add Movie
            </Link>
          </div>

          {isLoading ? (
            <p className="text-gray-400">Loading movies...</p>
          ) : (
            <div className="flex flex-col gap-3">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-card border border-white/5 rounded-2xl p-4 flex items-center gap-4"
                >
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-14 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <h3 className="text-white font-bold truncate">{movie.title}</h3>
                    <p className="text-gray-400 text-xs mt-1">
                      {movie.release_date} · {movie.duration_minutes} min ·{' '}
                      <span className="capitalize">{movie.status.replace('_', ' ')}</span>
                      {movie.is_trending && <span className="text-primary ml-1">· Trending</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      to={`/admin/movies/${movie.slug}/edit`}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white p-2.5 rounded-full transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(movie.slug, movie.title)}
                      disabled={deletingSlug === movie.slug}
                      className="bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-red-400 p-2.5 rounded-full transition-colors disabled:opacity-50"
                      aria-label="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default AdminMoviesPage;
