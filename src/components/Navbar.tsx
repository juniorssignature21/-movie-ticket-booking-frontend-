import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Menu, User, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Movies', to: '/movies' },
    { label: 'Tickets', to: '/bookings' },
    { label: 'Offers', to: '/movies' },
    ...(user?.is_staff
      ? [
          { label: 'Admin', to: '/admin/movies' },
          { label: 'Front Desk', to: '/frontdesk' },
        ]
      : []),
  ];

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-1 text-2xl font-bold tracking-tight">
          <img src={logo} alt="Logo" width={70} />
        </Link>

        {/* Center: Desktop Nav Pill */}
        <div className="hidden md:flex items-center bg-[#161616] border border-white/10 rounded-full px-1.5 py-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-gray-400 hover:text-white px-5 py-2 text-sm font-medium rounded-full hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Switcher */}
          <button className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm font-semibold transition-colors duration-200">
            <Globe size={18} className="text-gray-400" />
            <span>E</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-semibold transition-colors duration-200"
              >
                <User size={18} />
                <span className="max-w-[120px] truncate">{user?.first_name || user?.email}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-4 py-2 rounded-full text-sm transition-all duration-200"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/signup"
              className="bg-primary hover:bg-primary/95 text-white font-bold px-6 py-2.5 rounded-full text-sm tracking-wide transition-all duration-200 shadow-md shadow-primary/20 hover:scale-105"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button className="flex items-center gap-1 text-gray-300 text-sm font-semibold">
            <Globe size={16} />
            <span>E</span>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 py-6 px-6 flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white text-base font-semibold py-2 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2" />
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white text-base font-semibold py-2 transition-colors duration-200"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold w-full py-3 rounded-full text-center text-sm transition-all duration-200"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="bg-primary hover:bg-primary/90 text-white font-bold w-full py-3 rounded-full text-center text-sm transition-all duration-200"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
