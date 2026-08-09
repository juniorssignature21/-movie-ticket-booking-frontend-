import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import MovieCard from './MovieCard';
import { fetchMovies } from '../api/movies';
import type { MovieListItem } from '../types/movie';

export const TrendingSection: React.FC = () => {
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies({ is_trending: true, ordering: '-average_rating' })
      .then((data) => setMovies(data.results))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && movies.length === 0) return null;

  return (
    <section className="py-12 md:py-20 px-6 md:px-12 lg:px-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="section-title">Trending Now</h2>
        </div>

        {/* Scrollable Row */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x scroll-smooth -mx-6 px-6 md:mx-0 md:px-0">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[200px] sm:min-w-[240px] md:min-w-[260px] max-w-[280px] aspect-[2/3] rounded-xl bg-card animate-pulse flex-shrink-0"
                />
              ))
            : movies.map((movie, index) => (
                <Link
                  key={movie.id}
                  to={`/movies/${movie.slug}`}
                  className="min-w-[200px] sm:min-w-[240px] md:min-w-[260px] max-w-[280px] snap-start flex-shrink-0"
                >
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    image={movie.poster_url}
                    year={new Date(movie.release_date).getFullYear()}
                    rating={parseFloat(movie.average_rating)}
                    rank={index + 1}
                    showAvailability={movie.status === 'now_showing'}
                    trailerUrl={movie.trailer_url}
                  />
                </Link>
              ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-start mt-2">
          <Link
            to="/movies"
            className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-200 hover:scale-105 shadow-md shadow-primary/20"
          >
            <Play size={14} className="fill-white text-white" />
            <span>Watch thrillers</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
