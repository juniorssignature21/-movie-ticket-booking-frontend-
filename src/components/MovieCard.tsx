import React from 'react';
import { Star } from 'lucide-react';

export interface MovieCardProps {
  id: string | number;
  title: string;
  image: string;
  year: number;
  rating: number;
  rank?: number;
  showAvailability?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  title,
  image,
  year,
  rating,
  rank,
  showAvailability = false,
}) => {
  return (
    <div className="flex flex-col w-full group">
      {/* Poster Container */}
      <div className="movie-card aspect-[2/3] relative">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Dark Gradient Overlay at the bottom of the poster */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        
        {/* Large Rank Overlay */}
        {rank !== undefined && (
          <div className="absolute bottom-2 left-3 select-none">
            <span className="text-5xl md:text-6xl font-black text-white/90 font-mono tracking-tighter filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {rank}
            </span>
          </div>
        )}
      </div>

      {/* Details Box */}
      <div className="mt-3 flex flex-col items-start text-left px-1">
        <h3 className="font-bold text-white text-base md:text-lg line-clamp-1 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        
        {showAvailability && (
          <span className="text-primary text-xs md:text-sm font-semibold mt-0.5">
            Available in Cinema
          </span>
        )}
        
        <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs md:text-sm">
          <span>{year}</span>
          <span className="w-1 h-1 bg-gray-500 rounded-full" />
          <div className="flex items-center gap-0.5 text-yellow-500 font-medium">
            <Star size={14} className="fill-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
