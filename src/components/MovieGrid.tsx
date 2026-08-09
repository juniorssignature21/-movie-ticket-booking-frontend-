import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

interface MovieGridProps {
  title: string;
  seeMoreTo?: string;
  movies: Array<{
    id: number | string;
    slug: string;
    title: string;
    image: string;
    year: number;
    rating: number;
    trailerUrl?: string;
  }>;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ title, movies, seeMoreTo = '/movies' }) => {
  return (
    <section className="py-12 md:py-16 px-6 md:px-12 lg:px-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
        {/* Title Bar */}
        <div className="flex items-center justify-between">
          <h2 className="section-title">{title}</h2>

          <Link
            to={seeMoreTo}
            className="bg-primary hover:bg-primary/95 text-white font-semibold px-5 py-2.5 rounded-full text-xs md:text-sm tracking-wide transition-all duration-200 hover:scale-105 shadow-sm shadow-primary/10"
          >
            See more
          </Link>
        </div>

        {/* Grid - 6 cards (2 rows x 3 columns on desktop, responsive) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {movies.slice(0, 6).map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.slug}`} className="w-full">
              <MovieCard
                id={movie.id}
                title={movie.title}
                image={movie.image}
                year={movie.year}
                rating={movie.rating}
                trailerUrl={movie.trailerUrl}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieGrid;
