import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { allArticles, petCategories } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
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

  const normalizedQuery = query.toLowerCase().trim();

  const matchingArticles = query.length > 1
    ? allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(normalizedQuery) ||
          a.excerpt.toLowerCase().includes(normalizedQuery) ||
          a.category.toLowerCase().includes(normalizedQuery) ||
          (a.subCategory && a.subCategory.toLowerCase().includes(normalizedQuery))
      ).slice(0, 6)
    : [];

  const handleSelectArticle = (category: string, slug: string) => {
    onClose();
    navigate(`/${category}/${slug}`);
  };

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const popularSearches = [
    'Puppy Feeding Schedule',
    'Cat Happy Signs',
    'Toxic Foods for Cats',
    'Dog Potty Training',
    'How Often to Bathe Dog',
    'Separation Anxiety',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-stone-950/70 backdrop-blur-sm transition-all"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleFullSearch} className="relative flex items-center border-b border-stone-200 dark:border-stone-800 p-4 sm:p-5">
          <Search className="w-5 h-5 text-stone-400 dark:text-stone-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search puppy care, cat behavior, nutrition, training tips..."
            className="w-full text-base sm:text-lg bg-transparent text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="px-2 py-1 text-xs font-mono rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
          >
            ESC
          </button>
        </form>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {query.length > 1 ? (
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Articles &amp; Guides ({matchingArticles.length})
                </span>
                <span className="text-[11px] text-stone-500">Press Enter for full results</span>
              </div>

              {matchingArticles.length > 0 ? (
                <div className="space-y-2">
                  {matchingArticles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => handleSelectArticle(article.category, article.slug)}
                      className="w-full text-left p-3 rounded-2xl hover:bg-orange-50/70 dark:hover:bg-stone-800/80 transition-colors flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate">
                            {article.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                            <span className="capitalize text-orange-600 dark:text-orange-400 font-medium">
                              {article.subCategory || article.category}
                            </span>
                            <span>•</span>
                            <span>{article.readingTime}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-stone-500">
                  <p className="text-sm font-medium">No pet guides matched &ldquo;{query}&rdquo;</p>
                  <p className="text-xs mt-1 text-stone-400">
                    Try searching for common topics like &ldquo;nutrition&rdquo;, &ldquo;puppy&rdquo;, or &ldquo;cat toys&rdquo;.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Pet Categories Quick Browse */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium mb-3">
                  Browse by Category
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {petCategories.slice(0, 6).map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        onClose();
                        navigate(`/${cat.slug}`);
                      }}
                      className="p-3 text-left rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-orange-50 dark:hover:bg-stone-800 border border-stone-100 dark:border-stone-800 transition-colors"
                    >
                      <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-stone-500 truncate">
                        {cat.subTopics.slice(0, 2).join(', ')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Searches */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium mb-2.5">
                  Popular Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-orange-100 dark:hover:bg-orange-950/40 hover:text-orange-700 dark:hover:text-orange-300 transition-colors flex items-center gap-1.5"
                    >
                      <Tag className="w-3 h-3 text-stone-400" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 sm:px-6 bg-stone-50 dark:bg-stone-950/60 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-xs text-stone-500">
          <span>Petzora Knowledge Base</span>
          <span>petzora.shop</span>
        </div>
      </div>
    </div>
  );
};
