import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, ArrowRight, BookOpen, Clock, Loader2 } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { searchPublishedArticles } from '../lib/supabase';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [searching, setSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('petzora_recent_searches');
      return stored ? JSON.parse(stored) : ['Dog training', 'Cat nutrition', 'Puppy care'];
    } catch {
      return ['Dog training', 'Cat nutrition', 'Puppy care'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Debounced search
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length > 1) {
      setSearching(true);
      const timer = setTimeout(async () => {
        const matches = await searchPublishedArticles(trimmed);
        setResults(matches.slice(0, 6));
        setSearching(false);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setSearching(false);
    }
  }, [query]);

  if (!isOpen) return null;

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('petzora_recent_searches', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleSelectArticle = (category: string, slug: string, title: string) => {
    saveRecentSearch(title);
    onClose();
    navigate(`/${category}/${slug}`);
  };

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query.trim());
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleQuickTermClick = (term: string) => {
    saveRecentSearch(term);
    setQuery(term);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4 bg-stone-950/80 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden text-stone-900 dark:text-stone-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleFullSearch} className="relative border-b border-stone-200 dark:border-stone-800 p-4 sm:p-5 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search puppy training, cat health, food safety..."
            className="flex-1 bg-transparent text-sm sm:text-base text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
          />
          {searching && <Loader2 className="w-4 h-4 text-[#D95D39] animate-spin" />}
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono uppercase tracking-wider text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 px-2 py-1 rounded-lg border border-stone-200 dark:border-stone-800"
          >
            Esc
          </button>
        </form>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Query Results */}
          {query.trim().length > 1 ? (
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-stone-400 mb-3 font-semibold">
                <span>Matching Published Articles ({results.length})</span>
                {results.length > 0 && (
                  <button
                    type="button"
                    onClick={handleFullSearch}
                    className="text-[#D95D39] hover:underline"
                  >
                    View All Results &rarr;
                  </button>
                )}
              </div>

              {results.length === 0 && !searching ? (
                <div className="py-8 text-center text-xs text-stone-500 space-y-1">
                  <p className="font-semibold text-stone-700 dark:text-stone-300">
                    No articles found for &ldquo;{query}&rdquo;
                  </p>
                  <p>Try searching for broader terms like puppy, cats, nutrition, or training.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => handleSelectArticle(art.category, art.slug, art.title)}
                      className="w-full p-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-left transition flex items-center gap-3.5 group"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-200 dark:bg-stone-800">
                        <SafeImage
                          src={art.featuredImage}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          fallbackSrc="/images/pet-fallback.webp"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 uppercase">
                          <span className="text-[#D95D39] font-bold">{art.category}</span>
                          <span>&bull;</span>
                          <span>{art.readingTime}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors truncate">
                          {art.title}
                        </h4>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D95D39] transition shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Default: Recent Searches & Quick Categories */
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 font-semibold block mb-2">
                    Recent Searches
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickTermClick(term)}
                        className="px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs text-stone-700 dark:text-stone-300 transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-mono uppercase text-stone-400 font-semibold block mb-2">
                  Browse by Category
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Dogs', 'Cats', 'Care', 'Health', 'Nutrition', 'Training', 'Reviews', 'Stories'].map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          onClose();
                          navigate(`/${cat.toLowerCase()}`);
                        }}
                        className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-xs font-serif font-bold text-stone-900 dark:text-white hover:text-[#D95D39] text-left transition border border-stone-200/60 dark:border-stone-800"
                      >
                        {cat} &rarr;
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
