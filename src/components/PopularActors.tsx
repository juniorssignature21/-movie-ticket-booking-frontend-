import React, { useEffect, useState } from 'react';
import { fetchActors } from '../api/movies';
import type { Actor } from '../types/movie';

export const PopularActors: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActors()
      .then((data) => setActors(data.results.slice(0, 5)))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && actors.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-6 md:px-12 lg:px-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
        {/* Title Bar */}
        <div className="flex items-center justify-between">
          <h2 className="section-title">Popular Actors</h2>
        </div>

        {/* Actors Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 justify-items-center">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-card animate-pulse mb-4" />
                </div>
              ))
            : actors.map((actor) => (
                <div key={actor.id} className="flex flex-col items-center text-center group">
                  {/* Circular Avatar */}
                  <div className="actor-circle w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4">
                    <img
                      src={actor.image_url}
                      alt={actor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Actor Info */}
                  <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors duration-200">
                    {actor.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm font-medium mt-1">{actor.role}</p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default PopularActors;
