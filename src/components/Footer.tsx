import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '#' },
        { label: 'Movies', href: '#' },
        { label: 'Tickets', href: '#' },
        { label: 'Offers', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'FAQ', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-black text-gray-400 py-16 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4 text-left">
            <a href="#" className="flex items-center gap-1 text-2xl font-bold tracking-tight">
              <span className="text-white">9ja</span>
              <span className="flex items-center justify-center text-primary">
                {/* Film Reel Icon */}
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1" fill="currentColor"/>
                  <circle cx="8.5" cy="8.5" r="1.2" fill="black"/>
                  <circle cx="15.5" cy="8.5" r="1.2" fill="black"/>
                  <circle cx="8.5" cy="15.5" r="1.2" fill="black"/>
                  <circle cx="15.5" cy="15.5" r="1.2" fill="black"/>
                </svg>
              </span>
              <span className="text-white">Cine</span>
            </a>
            <p className="text-gray-300 font-bold text-sm tracking-wide mt-1 uppercase">
              Watch. Book. Enjoy.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xs mt-2 leading-relaxed">
              Your ultimate gateway to the best of Nollywood and international blockbusters. Book cinema seats easily.
            </p>
            <div className="flex flex-col gap-1.5 text-gray-500 text-xs sm:text-sm mt-1">
              <p>10 Factory Rd, Aba, Abia State, Nigeria</p>
              <a href="tel:+2349150391829" className="hover:text-primary transition-colors">
                Careline: 0915 039 1829
              </a>
              <a href="tel:+2347040748233" className="hover:text-primary transition-colors">
                Adverts &amp; Marketing: 0704 074 8233
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-4 sm:gap-6 text-left">
            {columns.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                  {col.title}
                </h4>
                <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
                  {col.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.href}
                      className="hover:text-primary hover:underline transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4 text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              {/* Facebook Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              {/* Instagram Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4.5 h-4.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* X / Twitter Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
                aria-label="X (Twitter)"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* YouTube Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
                aria-label="YouTube"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-2 leading-relaxed">
              Stay connected. Get the latest movie teasers and ticket discount alerts.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 w-full" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} 9jaCine Booking Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
