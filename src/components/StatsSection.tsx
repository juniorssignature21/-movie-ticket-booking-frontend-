import React from 'react';
import { Armchair, Popcorn, CalendarCheck, Tag, ShieldCheck } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <Armchair className="w-8 h-8 text-primary" />,
      number: '2000+',
      label: 'Movies',
    },
    {
      icon: <Popcorn className="w-8 h-8 text-primary" />,
      number: '500+',
      label: 'Cinemas',
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-primary" />,
      number: '24/7',
      label: 'Booking',
    },
    {
      icon: <Tag className="w-8 h-8 text-primary" />,
      number: '+30%',
      label: 'Discounts',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      number: '100%',
      label: 'Secure',
    },
  ];

  return (
    <section className="bg-statsBg py-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-primary/20 hover:scale-[1.02]"
            >
              <div className="bg-white/5 p-4 rounded-full mb-3 flex items-center justify-center">
                {stat.icon}
              </div>
              <span className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">
                {stat.number}
              </span>
              <span className="text-gray-400 text-xs md:text-sm font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
