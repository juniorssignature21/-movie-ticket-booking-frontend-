import React from 'react';
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

export const Index: React.FC = () => {
  // Mock data for New Releases (6 items matching the spec: "Movie Name", year 2002, rating 4.6)
  const newReleaseImages = [
    new URL('../assets/new-releases/Rectangle 16.png', import.meta.url).href,
    new URL('../assets/new-releases/Rectangle 17.png', import.meta.url).href,
    new URL('../assets/new-releases/Rectangle 35.png', import.meta.url).href,
    new URL('../assets/new-releases/Rectangle 36.png', import.meta.url).href,
    new URL('../assets/new-releases/Rectangle 37.png', import.meta.url).href,
    new URL('../assets/new-releases/Rectangle 38.png', import.meta.url).href,
  ];

  const newReleases = Array.from({ length: 6 }, (_, index) => ({
    id: `new-${index + 1}`,
    title: 'Movie Name',
    image: newReleaseImages[index],
    year: 2002,
    rating: 4.6,
  }));

  // Mock data for Upcoming (6 items, styled in a similar high-quality format)
  const upcomingImages = [
    new URL('../assets/upcoming/Rectangle 35.png', import.meta.url).href,
    new URL('../assets/upcoming/Rectangle 38.png', import.meta.url).href,
    new URL('../assets/upcoming/Rectangle 39.png', import.meta.url).href,
    new URL('../assets/upcoming/Rectangle 40.png', import.meta.url).href,
    new URL('../assets/upcoming/Rectangle 41.png', import.meta.url).href,
    new URL('../assets/upcoming/Rectangle 42.png', import.meta.url).href,
  ];

  const upcomingMovies = Array.from({ length: 6 }, (_, index) => ({
    id: `upcoming-${index + 1}`,
    title: 'Movie Name',
    image: upcomingImages[index],
    year: 2002,
    rating: 4.6,
  }));

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
        <MovieGrid title="New Release" movies={newReleases} />

        {/* 6. Upcoming movie grid */}
        <MovieGrid title="Upcoming" movies={upcomingMovies} />

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
