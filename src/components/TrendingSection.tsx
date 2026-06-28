import React from 'react';
import { Play } from 'lucide-react';
import MovieCard from './MovieCard';

export const TrendingSection: React.FC = () => {
  const trendingMovies = [
    {
      id: 1,
      title: 'Love In Every Word',
      image: new URL('../assets/trending/Rectangle 8.png', import.meta.url).href,
      year: 2026,
      rating: 4.6,
    },
    {
      id: 2,
      title: 'Behind The Scenes',
      image: new URL('../assets/trending/Rectangle 9.png', import.meta.url).href,
      year: 2026,
      rating: 4.6,
    },
    {
      id: 3,
      title: 'Oversabi Aunty',
      image: new URL('../assets/trending/Rectangle 9-1.png', import.meta.url).href,
      year: 2026,
      rating: 4.6,
    },
    {
      id: 4,
      title: 'The Herd',
      image: new URL('../assets/trending/Rectangle 35.png', import.meta.url).href,
      year: 2026,
      rating: 4.6,
    },
    {
      id: 5,
      title: 'Oba Olorun',
      image: new URL('../assets/trending/Rectangle 36.png', import.meta.url).href,
      year: 2026,
      rating: 4.6,
    },
    {
      id: 6,
      title: 'Alaagba',
      image: new URL('../assets/trending/Rectangle 37.png', import.meta.url).href,
      year: 2026,
      rating: 4.6,
    },
  ];

  return (
    <section className="py-12 md:py-20 px-6 md:px-12 lg:px-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="section-title">Trending Now</h2>
        </div>

        {/* Scrollable Row */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x scroll-smooth -mx-6 px-6 md:mx-0 md:px-0">
          {trendingMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="min-w-[200px] sm:min-w-[240px] md:min-w-[260px] max-w-[280px] snap-start flex-shrink-0"
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                image={movie.image}
                year={movie.year}
                rating={movie.rating}
                rank={index + 1}
                showAvailability={true}
              />
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-start mt-2">
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-200 hover:scale-105 shadow-md shadow-primary/20">
            <Play size={14} className="fill-white text-white" />
            <span>Watch thrillers</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
