import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import TrendingSection from '../components/TrendingSection';
import MovieGrid from '../components/MovieGrid';
import PopularActors from '../components/PopularActors';
import DiscountOffers from '../components/DiscountOffers';
import NollyGist from '../components/NollyGist';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import { fetchMovies } from '../api/movies';
import type { MovieListItem } from '../types/movie';

function toGridMovies(movies: MovieListItem[]) {
  return movies.map((m) => ({
    id: m.id,
    slug: m.slug,
    title: m.title,
    image: m.poster_url,
    year: new Date(m.release_date).getFullYear(),
    rating: parseFloat(m.average_rating),
    trailerUrl: m.trailer_url,
  }));
}

export const Index: React.FC = () => {
  const [newReleases, setNewReleases] = useState<ReturnType<typeof toGridMovies>>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<ReturnType<typeof toGridMovies>>([]);

  useEffect(() => {
    fetchMovies({ status: 'now_showing', ordering: '-release_date' }).then((data) =>
      setNewReleases(toGridMovies(data.results)),
    );
    fetchMovies({ status: 'upcoming', ordering: '-release_date' }).then((data) =>
      setUpcomingMovies(toGridMovies(data.results)),
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* Main Layout Sections */}
      <main className="flex-grow">
        {/* 2. Hero banner */}
        <HeroSection />

        {/* 3. Stats details */}
        <StatsSection />

        {/* 4. Trending movies row */}
        <TrendingSection />

        {/* 5. New Release movie grid */}
        {newReleases.length > 0 && <MovieGrid title="New Release" movies={newReleases} />}

        {/* 6. Upcoming movie grid */}
        {upcomingMovies.length > 0 && <MovieGrid title="Upcoming" movies={upcomingMovies} seeMoreTo="/movies" />}

        {/* 7. Popular actors row */}
        <PopularActors />

        {/* 8. Discount offer cards */}
        <DiscountOffers />

        {/* 9. Nolly news and blog */}
        <NollyGist />

        {/* 10. App download features list */}
        <AppDownload />
      </main>

      {/* 11. Footer links */}
      <Footer />
    </div>
  );
};

export default Index;
