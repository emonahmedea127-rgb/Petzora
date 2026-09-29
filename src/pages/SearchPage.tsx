import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, BookOpen, ArrowRight, X, Clock, Heart, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { SafeImage } from '../components/SafeImage';
import { searchPublishedArticles } from '../lib/supabase';
import { Article } from '../types';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchTerm(q);
    if (q.trim()) {
      let mounted = true;
      setLoading(true);
      searchPublishedArticles(q).then((res) => {
        if (mounted) {
          setResults(res);
          setLoading(false);
        }
      });
      return () => {
        mounted = false;
      };
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  return (
    <div className="py-8 sm:py-12 space-y-12 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title={searchTerm ? `Search Results for "${searchTerm}" | Petzora` : 'Search Pet Guides & Advice | Petzora'}
        description={`Explore dog, cat, puppy, and kitten guides matching ${searchTerm || 'your query'} on petzora.shop.`}
        canonicalUrl="https://petzora.shop/search"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Search', url: '/search' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#D95D39] text-xs font-mono font-semibold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>SEARCH THE PETZORA ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Find Veterinary Answers
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            Search our comprehensive library of canine care routines, feline wellness, and training tutorials.
          </p>
        </div>

        {/* Search Bar Input */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keywords (e.g. puppy biting, senior cat nutrition, tick prevention)..."
              className="w-full pl-12 pr-28 py-3.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D95D39] shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-[#D95D39] hover:bg-[#C24D2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results Info */}
        {searchTerm && (
          <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>
              Showing {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{searchTerm}&rdquo;
            </span>
            <button
              onClick={() => {
                setSearchTerm('');
                setSearchParams({});
              }}
              className="text-[#D95D39] hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Results Grid */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#D95D39] animate-spin" />
            <p className="text-xs font-mono text-stone-500">Searching published guides...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-3 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-stone-800 text-[#D95D39] flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
              {searchTerm ? 'No Guides Matched Your Search' : 'Start Searching Above'}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {searchTerm
                ? 'Try checking for typos or searching for broader terms like "puppy", "cats", "health", or "diet".'
                : 'Enter a topic, symptom, or training question to search our veterinary guides.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((article) => (
              <article
                key={article.id}
                className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
              >
                <Link
                  to={`/${article.category}/${article.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden"
                >
                  <SafeImage
                    src={article.featuredImage}
                    alt={article.imageAlt || article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    fallbackSrc="/images/pet-fallback.webp"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-stone-950/70 backdrop-blur-md text-white text-[11px] font-semibold uppercase">
                      {article.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readingTime}</span>
                      <span>&bull;</span>
                      <span>By {article.author.name}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors leading-snug line-clamp-2">
                      <Link to={`/${article.category}/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-mono">
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      to={`/${article.category}/${article.slug}`}
                      className="text-xs font-semibold text-[#D95D39] hover:underline flex items-center gap-1"
                    >
                      <span>Read guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="pt-8">
          <AdSenseSlot slotType="horizontal-banner" slotId="petzora-search-bottom-banner" />
        </div>
      </div>
    </div>
  );
};
