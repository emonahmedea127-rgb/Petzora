import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Menu, X, Bookmark, Mail, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSavedArticles } from '../context/SavedArticlesContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  onOpenSubscribe?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenSaved, onOpenSubscribe }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { savedArticleSlugs } = useSavedArticles();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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
    { name: 'Care', path: '/pet-care' },
    { name: 'Health', path: '/health' },
    { name: 'Nutrition', path: '/nutrition' },
    { name: 'Training', path: '/training' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Stories', path: '/stories' },
  ];

  const handleNewsletterClick = () => {
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
          ? 'bg-[#FAF7F2]/95 dark:bg-stone-950/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 dark:border-stone-800'
          : 'bg-[#FAF7F2] dark:bg-stone-950 border-b border-stone-200/60 dark:border-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Editorial Brand Logo: PETZORA */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-stone-900 dark:text-white uppercase transition-colors">
              PETZORA
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#D95D39] dark:text-[#E07A5F] uppercase font-bold -mt-1">
              MAGAZINE &bull; CARE &bull; STORIES
            </span>
          </div>
        </Link>

        {/* Desktop Editorial Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-semibold uppercase tracking-wider">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname === link.path || location.pathname.startsWith(`${link.path}/`);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? 'text-[#D95D39] dark:text-[#E07A5F] font-bold'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1.5 inset-x-0 h-0.5 bg-[#D95D39] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side tools: Search, Saved, Newsletter, Dark Mode, Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Search trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search Petzora"
            className="p-2 sm:px-3 sm:py-2 rounded-full border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-[#D95D39] hover:bg-orange-50/50 dark:hover:bg-stone-900 transition-colors flex items-center gap-2 text-xs"
          >
            <Search className="w-4 h-4 text-stone-600 dark:text-stone-400" />
            <span className="hidden xl:inline text-stone-500 dark:text-stone-400 font-normal">
              Search...
            </span>
            <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-stone-100 dark:bg-stone-800 text-stone-500 rounded border border-stone-200 dark:border-stone-700">
              ⌘K
            </kbd>
          </button>

          {/* Saved Articles Bookmark Trigger */}
          <button
            type="button"
            onClick={onOpenSaved}
            aria-label="View saved articles"
            className="relative p-2 rounded-full text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors border border-transparent hover:border-stone-200 dark:hover:border-stone-800"
            title="Saved Reading List"
          >
            <Bookmark className="w-4 h-4" />
            {savedArticleSlugs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D95D39] text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                {savedArticleSlugs.length}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-full text-stone-700 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Newsletter Subscribe CTA */}
          <button
            type="button"
            onClick={handleNewsletterClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-full bg-[#D95D39] hover:bg-[#C24D2B] text-white shadow-sm hover:shadow transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Newsletter</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2]/98 dark:bg-stone-950/98 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname === link.path || location.pathname.startsWith(`${link.path}/`);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-colors ${
                    isActive
                      ? 'bg-orange-100/70 dark:bg-orange-950/50 text-[#D95D39] dark:text-[#E07A5F]'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSaved();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Bookmark className="w-4 h-4 text-[#D95D39]" />
              <span>Saved Reading List ({savedArticleSlugs.length})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNewsletterClick();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#D95D39] hover:bg-[#C24D2B] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Subscribe to Petzora Pack</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
