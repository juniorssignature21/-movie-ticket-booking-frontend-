import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import banner from '../assets/banner.png';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-start overflow-hidden bg-[#0d0d0d] pt-24 pb-12 px-6 md:px-12 lg:px-24">
      {/* Background Image Container */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[60%] h-full z-0 select-none">
        <img
          src={banner}
          alt="Hero Movie Backdrop"
          className="object-cover object-center md:object-center w-full h-full grayscale"
        />
        {/* Gradients to blend the image into the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent md:hidden" />
      </div>

      {/* Hero Content */}
      <div className="max-w-3xl relative z-10 text-left flex flex-col items-start gap-4 md:gap-6 animate-scroll-fade">
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Movies Your Way.
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-accentGreen tracking-tight leading-tight">
            Anytime.
          </h1>
        </div>

        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
          Discover movies, book seats, pay securely and enjoy unforgettable cinema experiences.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2 w-full sm:w-auto">
          <Link
            to="/movies"
            className="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-4 rounded-full text-base tracking-wide transition-all duration-200 shadow-lg shadow-primary/20 hover:scale-105 text-center"
          >
            Book a Movie Now
          </Link>

          <Link
            to="/movies"
            className="flex items-center justify-center gap-2 text-white hover:text-primary px-6 py-4 rounded-full text-base font-semibold border border-white/10 hover:border-primary/30 bg-white/5 hover:bg-white/10 transition-all duration-200 group"
          >
            <span className="bg-white/10 group-hover:bg-primary/20 p-1.5 rounded-full transition-colors duration-200">
              <Play size={16} className="fill-white text-white group-hover:fill-primary group-hover:text-primary transition-colors" />
            </span>
            <span>Watch thriller</span>
          </Link>
        </div>
      </div>
      
      {/* Bottom overlay fading into next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
