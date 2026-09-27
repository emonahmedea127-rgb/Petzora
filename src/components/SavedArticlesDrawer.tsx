import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Bookmark, Trash2, ArrowRight, Clock } from 'lucide-react';
import { useSavedArticles } from '../context/SavedArticlesContext';
import { SafeImage } from './SafeImage';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({ isOpen, onClose }) => {
  const { savedArticles, toggleSaveArticle, clearSavedArticles } = useSavedArticles();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center">
                <Bookmark className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h2 id="saved-drawer-title" className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                  Saved Guides ({savedArticles.length})
                </h2>
                <p className="text-[11px] text-stone-500">Your personal Petzora reading list</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close saved drawer"
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {savedArticles.length > 0 ? (
              savedArticles.map((article) => (
                <div
                  key={article.slug}
                  className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800 flex gap-3 items-center group hover:border-orange-500/40 transition-all"
                >
                  <Link
                    to={`/${article.category}/${article.slug}`}
                    onClick={onClose}
                    className="w-16 h-16 rounded-xl overflow-hidden shrink-0 block"
                  >
                    <SafeImage
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                      fallbackSrc="/images/pet-fallback.webp"
                    />
                  </Link>

                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-semibold uppercase">
                      {article.subCategory || article.category}
                    </span>
                    <h3 className="text-xs font-serif font-bold text-stone-900 dark:text-white leading-snug line-clamp-2">
                      <Link
                        to={`/${article.category}/${article.slug}`}
                        onClick={onClose}
                        className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readingTime}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveArticle(article)}
                    title="Remove from saved"
                    className="p-2 text-stone-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-stone-800 dark:text-stone-200 text-base">
                  No Saved Articles Yet
                </h3>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Click the bookmark icon on any guide or article to save it for later reference while training or caring for your pet.
                </p>
                <Link
                  to="/dogs"
                  onClick={onClose}
                  className="mt-2 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-500 transition-colors"
                >
                  Explore Trending Guides
                </Link>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {savedArticles.length > 0 && (
            <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 flex items-center justify-between">
              <button
                onClick={clearSavedArticles}
                className="text-xs text-stone-500 hover:text-red-500 transition-colors"
              >
                Clear all saved
              </button>
              <Link
                to="/guides"
                onClick={onClose}
                className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
              >
                <span>Browse All Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
