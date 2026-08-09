import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 md:pt-32">{children}</main>
      <Footer />
    </div>
  );
};

export default PageShell;
