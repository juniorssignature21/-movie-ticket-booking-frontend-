import React from 'react';
import {
  CalendarCheck,
  ShieldCheck,
  Armchair,
  Tag,
  QrCode,
  History,
} from 'lucide-react';

export const AppDownload: React.FC = () => {
  const features = [
    {
      icon: <CalendarCheck className="w-6 h-6 text-primary" />,
      title: 'Easy Booking',
      desc: 'Book movies in just a few taps',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: 'Secure Payments',
      desc: 'Fast & secure payment options',
    },
    {
      icon: <Armchair className="w-6 h-6 text-primary" />,
      title: 'Choose Your Seat',
      desc: 'Pick the perfect seat before anyone else',
    },
    {
      icon: <Tag className="w-6 h-6 text-primary" />,
      title: 'Exciting Offers',
      desc: 'Exclusive deals just for you',
    },
    {
      icon: <QrCode className="w-6 h-6 text-primary" />,
      title: 'Digital Tickets',
      desc: 'Get your QR ticket instantly',
    },
    {
      icon: <History className="w-6 h-6 text-primary" />,
      title: 'Booking History',
      desc: 'Track all your bookings easily',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#0d0d0d] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Overlapping Mockups & App Stores */}
          <div className="lg:col-span-5 flex flex-col items-center gap-10">
            {/* Phone Frames Mockup */}
            <div className="relative w-full max-w-[320px] h-[400px] sm:h-[460px]">
              
              {/* Phone 1 (Back/Left) */}
              <div className="absolute top-0 left-0 w-[60%] aspect-[9/18] rounded-[24px] border-4 border-zinc-700 bg-zinc-950 overflow-hidden shadow-2xl z-10 rotate-[-8deg] transform hover:rotate-0 hover:scale-105 transition-all duration-300">
                <img
                  src="https://picsum.photos/seed/nollyapp1/280/560"
                  alt="App UI Screen 1"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[35%] h-3 bg-black rounded-full" /> {/* Notch */}
              </div>

              {/* Phone 2 (Front/Right) */}
              <div className="absolute top-8 right-0 w-[60%] aspect-[9/18] rounded-[24px] border-4 border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl z-20 rotate-[6deg] transform hover:rotate-0 hover:scale-105 transition-all duration-300">
                <img
                  src="https://picsum.photos/seed/nollyapp2/280/560"
                  alt="App UI Screen 2"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[35%] h-3 bg-black rounded-full" /> {/* Notch */}
              </div>
            </div>

            {/* App Badges */}
            <div className="flex flex-row items-center gap-4 w-full justify-center">
              {/* Google Play */}
              <a
                href="#"
                className="flex items-center gap-2 bg-[#161616] border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-102"
              >
                {/* SVG Google Play Icon */}
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M5,3.06c-0.12,0.13-0.2,0.34-0.2,0.61v16.66c0,0.27,0.08,0.48,0.2,0.61L5.07,21L14,12.07v-0.14L5.07,3L5,3.06z" />
                  <path d="M17.02,15.11l-3.02-3.04v-0.14l3.02-3.04l0.07,0.04l3.57,2.03c1.02,0.58,1.02,1.53,0,2.11l-3.57,2.03 C17.09,15.08,17.05,15.1,17.02,15.11z" />
                  <path d="M14,12.07L5.07,21c0.32,0.34,0.85,0.38,1.44,0.05l10.51-5.94L14,12.07z" />
                  <path d="M14,11.93l3.02-5.94L6.51,2.89c-0.59-0.33-1.12-0.29-1.44,0.05L14,11.93z" />
                </svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase">Get it on</span>
                  <span className="text-sm font-bold text-white mt-1">Google Play</span>
                </div>
              </a>

              {/* App Store */}
              <a
                href="#"
                className="flex items-center gap-2 bg-[#161616] border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-102"
              >
                {/* SVG Apple Icon */}
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,21.97C14.32,22,13.89,21.18,12.37,21.18C10.84,21.18,10.37,21.95,9.1,22C7.79,22.05,6.8,20.68,5.96,19.47C4.25,17,2.94,12.45,4.7,9.39C5.57,7.87,7.13,6.91,8.82,6.88C10.1,6.86,11.32,7.75,12.11,7.75C12.89,7.75,14.37,6.68,15.92,6.84C16.57,6.87,18.39,7.1,19.56,8.82C19.47,8.88,17.39,10.1,17.41,12.63C17.44,15.65,20.06,16.66,20.1,16.67C20.08,16.74,19.67,18.11,18.71,19.5M15.97,4.17C16.63,3.37,17.07,2.28,16.95,1C16,1.04,14.9,1.6,14.24,2.38C13.68,3.04,13.19,4.14,13.34,5.39C14.39,5.47,15.4,4.88,15.97,4.17Z" />
                </svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase">Download on the</span>
                  <span className="text-sm font-bold text-white mt-1">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Feature Grid */}
          <div className="lg:col-span-7 flex flex-col text-left gap-6 md:gap-8">
            <div className="space-y-3">
              <span className="text-primary font-bold text-sm uppercase tracking-wider">Experience Convenience</span>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                9jaCine App is Available for Android & iOS
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-card border border-white/5 transition-all duration-300 hover:border-primary/10 hover:scale-[1.01]">
                  <div className="bg-primary/5 border border-primary/10 p-3 h-fit rounded-xl flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-white font-bold text-base sm:text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unified Bottom Stats Bar */}
        <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-16 w-full md:w-auto">
            {/* Stat 1 */}
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl md:text-4xl font-extrabold text-white">10k+</span>
              <span className="text-gray-400 text-xs md:text-sm mt-1 font-medium">App Downloads</span>
            </div>
            
            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            
            {/* Stat 2 */}
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl md:text-4xl font-extrabold text-white">4.9 ★</span>
              <span className="text-gray-400 text-xs md:text-sm mt-1 font-medium">Store Reviews</span>
            </div>
            
            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            
            {/* Stat 3 */}
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl md:text-4xl font-extrabold text-white">50k+</span>
              <span className="text-gray-400 text-xs md:text-sm mt-1 font-medium">Active Bookings</span>
            </div>
          </div>

          {/* CTA */}
          <button className="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-3.5 rounded-full text-base tracking-wide transition-all duration-200 hover:scale-105 shadow-md shadow-primary/20 w-full md:w-auto">
            Get The App
          </button>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
