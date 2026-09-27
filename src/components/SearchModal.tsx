import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, BookOpen, Tag, History, Clock } from 'lucide-react';
import { allArticles, petCategories } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('petzora_recent_searches');
      return stored ? JSON.parse(stored) : ['Why dogs tilt their head', 'Puppy feeding schedule', 'Safe indoor cat toys'];
    } catch {
      return ['Why dogs tilt their head', 'Puppy feeding schedule', 'Safe indoor cat toys'];
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

  const normalizedQuery = query.toLowerCase().trim();

  const matchingArticles = query.length > 1
    ? allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(normalizedQuery) ||
          a.excerpt.toLowerCase().includes(normalizedQuery) ||
          a.category.toLowerCase().includes(normalizedQuery) ||
          (a.subCategory && a.subCategory.toLowerCase().includes(normalizedQuery))
      ).slice(0, 7)
    : [];

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

  const trendingSearches = [
    'Why Does My Dog Follow Me Everywhere?',
    'Why Cats Sleep on Your Chest',
    'Foods Dogs Should Never Eat',
    'Puppy Training Mistakes to Avoid',
    'Why Dogs Tilt Their Head',
    'Can Dogs Eat Bananas?',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4 bg-stone-950/80 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FAF7F2] dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <form onSubmit={handleFullSearch} className="relative flex items-center border-b border-stone-200/80 dark:border-stone-800 p-4 sm:p-6 bg-white dark:bg-stone-950">
          <Search className="w-6 h-6 text-[#D95D39] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Petzora..."
            className="w-full text-lg sm:text-xl font-serif bg-transparent text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 mr-2"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="px-2.5 py-1 text-xs font-mono rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
          >
            ESC
          </button>
        </form>

        {/* Content Container */}
        <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-7 space-y-6">
          {query.length > 1 ? (
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200 dark:border-stone-800">
                <span className="text-xs font-mono uppercase tracking-wider text-[#D95D39] font-bold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  Matching Guides ({matchingArticles.length})
                </span>
                <span className="text-[11px] text-stone-500">Press Enter for complete results</span>
              </div>

              {matchingArticles.length > 0 ? (
                <div className="space-y-2">
                  {matchingArticles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => handleSelectArticle(article.category, article.slug, article.title)}
                      className="w-full text-left p-3.5 rounded-2xl bg-white dark:bg-stone-800/80 hover:bg-orange-50/70 dark:hover:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60 transition-colors flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm sm:text-base font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors truncate">
                            {article.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                            <span className="capitalize font-mono text-[#D95D39] font-semibold text-[11px]">
                              {article.subCategory || article.category}
                            </span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D95D39] group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-stone-500">
                  <p className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">
                    No pet guides found matching &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs mt-1 text-stone-400">
                    Try searching for common topics like &ldquo;nutrition&rdquo;, &ldquo;puppy training&rdquo;, or &ldquo;cat tail&rdquo;.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-[#D95D39]" />
                      <span>Recent Searches</span>
                    </p>
                    <button
                      onClick={() => {
                        setRecentSearches([]);
                        try {
                          localStorage.removeItem('petzora_recent_searches');
                        } catch {}
                      }}
                      className="text-[10px] text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleQuickTermClick(term)}
                        className="px-3 py-1.5 rounded-full text-xs bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-[#D95D39] hover:text-[#D95D39] transition-all flex items-center gap-1.5"
                      >
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-2.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#D95D39]" />
                  <span>Trending Searches</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQuickTermClick(term)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-orange-100/60 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-[#D95D39] hover:text-white transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-3">
                  Popular Categories
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {petCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        onClose();
                        navigate(`/${cat.slug}`);
                      }}
                      className="p-3 text-left rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 hover:border-[#D95D39] transition-colors"
                    >
                      <p className="text-xs font-bold text-stone-900 dark:text-white">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-stone-500 truncate mt-0.5">
                        {cat.subTopics.slice(0, 2).join(', ')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 sm:px-6 bg-stone-100 dark:bg-stone-950 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>Petzora Pet Care Knowledge Hub</span>
          <span className="font-mono">petzora.shop</span>
        </div>
      </div>
    </div>
  );
};
