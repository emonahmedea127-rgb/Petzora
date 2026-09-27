import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Menu, X, Heart, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenSubscribe?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenSubscribe }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dogs', path: '/dogs' },
    { name: 'Cats', path: '/cats' },
    { name: 'Pet Care', path: '/pet-care' },
    { name: 'Nutrition', path: '/nutrition' },
    { name: 'Training', path: '/training' },
    { name: 'Health', path: '/health' },
    { name: 'Product Guides', path: '/product-guides' },
    { name: 'Stories', path: '/stories' },
    { name: 'About', path: '/about' },
  ];

  const handleSubscribeClick = () => {
    if (onOpenSubscribe) {
      onOpenSubscribe();
    } else {
      const el = document.getElementById('newsletter-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-stone-950/95 backdrop-blur-md shadow-sm border-b border-amber-900/10 dark:border-stone-800'
          : 'bg-white/90 dark:bg-stone-950/90 backdrop-blur-sm border-b border-amber-900/5 dark:border-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo: Petzora with minimal paw icon */}
        <Link
          to="/"
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/20 group-hover:scale-105 transition-transform">
            {/* Minimal SVG paw icon */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="6" cy="7.5" rx="2" ry="2.8" />
              <ellipse cx="18" cy="7.5" rx="2" ry="2.8" />
              <ellipse cx="10" cy="5" rx="2.1" ry="3" />
              <ellipse cx="14" cy="5" rx="2.1" ry="3" />
              <path d="M12 10.5c-3.2 0-5.8 2.2-5.8 5.2 0 1.9 1.2 3.8 3.2 4.6 1.6.6 3.6.6 5.2 0 2-.8 3.2-2.7 3.2-4.6 0-3-2.6-5.2-5.8-5.2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-2xl font-serif font-black tracking-tight text-stone-900 dark:text-white flex items-center">
              Petzora
            </span>
            <span className="text-[10px] font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase -mt-1 font-semibold">
              Better Care. Happier Pets.
            </span>
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? 'text-orange-600 dark:text-orange-400 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side actions: Search, Newsletter, Theme toggle, Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search pet articles"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-orange-500/50 hover:bg-orange-50/50 dark:hover:bg-stone-900 transition-colors flex items-center gap-2 text-xs"
          >
            <Search className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            <span className="hidden md:inline font-normal text-stone-500 dark:text-stone-400">
              Search pet guides...
            </span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-stone-100 dark:bg-stone-800 text-stone-500 rounded border border-stone-200 dark:border-stone-700">
              ⌘K
            </kbd>
          </button>

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-full text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Newsletter / Subscribe CTA */}
          <button
            type="button"
            onClick={handleSubscribeClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-sm hover:shadow transition-all"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Join 45k+ Pet Parents</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="xl:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleSubscribeClick();
              }}
              className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Subscribe to Pet Care Newsletter</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
