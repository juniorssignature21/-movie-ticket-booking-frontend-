import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchOffers } from '../api/content';
import type { DiscountOffer as DiscountOfferType } from '../types/content';

export const DiscountOffers: React.FC = () => {
  const [offers, setOffers] = useState<DiscountOfferType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOffers()
      .then(setOffers)
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && offers.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-6 md:px-12 lg:px-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
        {/* Title Bar */}
        <div className="flex items-center justify-between">
          <h2 className="section-title">Discount Offer</h2>

          <Link
            to="/movies"
            className="bg-primary hover:bg-primary/95 text-white font-semibold px-5 py-2.5 rounded-full text-xs md:text-sm tracking-wide transition-all duration-200 hover:scale-105 shadow-sm shadow-primary/10"
          >
            See more
          </Link>
        </div>

        {/* 2x2 Grid of Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {offers.map((offer) => {
            if (offer.is_banner) {
              return (
                <div
                  key={offer.id}
                  className="relative h-[250px] sm:h-[300px] md:h-auto min-h-[220px] rounded-2xl overflow-hidden border border-white/5 group bg-card"
                >
                  <img
                    src={offer.image_url}
                    alt="Promo Combo"
                    className="w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Glassmorphic Overlay Card */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent flex items-center justify-center p-6 text-center">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-xs flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        {offer.discount_percent}%
                      </span>
                      <span className="text-xs font-bold text-white tracking-widest mt-0.5">OFF</span>
                      <span className="text-gray-300 text-xs md:text-sm font-semibold mt-2 uppercase tracking-wide">
                        {offer.banner_subtitle || offer.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={offer.id}
                to="/movies"
                className="flex flex-col bg-card border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/20 transition-all duration-300"
              >
                {/* Widescreen Movie Header Image */}
                <div className="aspect-[16/9] w-full overflow-hidden relative">
                  <img
                    src={offer.image_url}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Lower Details */}
                <div className="p-5 flex flex-col items-start text-left">
                  <h3 className="text-white font-bold text-lg md:text-xl group-hover:text-primary transition-colors duration-200">
                    {offer.title}
                  </h3>

                  {/* Pricing Box */}
                  <div className="flex items-center mt-3 gap-2.5">
                    {/* Original Price */}
                    <span className="text-primary/70 line-through text-sm sm:text-base font-semibold">
                      ₦{Number(offer.original_price).toLocaleString()}
                    </span>

                    {/* Discount Badge */}
                    <span className="bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold px-2 py-0.5 rounded-full">
                      -{offer.discount_percent}%
                    </span>

                    {/* Final Price */}
                    <span className="text-white text-lg sm:text-xl font-extrabold ml-1">
                      ₦{Number(offer.final_price).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DiscountOffers;
