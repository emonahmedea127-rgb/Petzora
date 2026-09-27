import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, BookOpen, ArrowRight, X, Clock, Heart } from 'lucide-react';
import { allArticles, petCategories } from '../data/mockData';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const query = searchTerm.toLowerCase().trim();

  const matchingArticles = query.length > 0
    ? allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query) ||
          (a.subCategory && a.subCategory.toLowerCase().includes(query)) ||
          a.author.name.toLowerCase().includes(query)
      )
    : [];

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
        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>PET CARE KNOWLEDGE BASE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Search Pet Care Guides &amp; Tips
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Find answers on puppy training, kitten socialization, canine nutrition, and feline wellness.
          </p>

          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center rounded-2xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 p-2 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
              <Search className="w-5 h-5 text-stone-400 ml-3 mr-2 shrink-0" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by topic, keyword, or question..."
                className="w-full bg-transparent text-sm sm:text-base text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSearchParams({});
                  }}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-600 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs sm:text-sm transition-colors shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* AdSense slot */}
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-search-top" />

        {/* Results */}
        {query ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-white">
                Results for &ldquo;{query}&rdquo;
              </h2>
              <span className="text-xs font-mono text-stone-500">
                {matchingArticles.length} guides found
              </span>
            </div>

            {matchingArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchingArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
                  >
                    <Link
                      to={`/${article.category}/${article.slug}`}
                      className="block relative aspect-video overflow-hidden"
                    >
                      <img
                        src={article.featuredImage}
                        alt={article.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-stone-950/70 backdrop-blur-md text-white text-[11px] font-semibold uppercase">
                          {article.subCategory || article.category}
                        </span>
                      </div>
                    </Link>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                          <span>{article.readingTime}</span>
                          <span>•</span>
                          <span>{article.createdAt}</span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2 mt-1">
                          <Link to={`/${article.category}/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2 mt-1">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                        <span>By {article.author.name}</span>
                        <Link
                          to={`/${article.category}/${article.slug}`}
                          className="text-orange-600 font-semibold hover:underline"
                        >
                          Read &rarr;
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-stone-500 space-y-3 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
                <p className="text-base font-semibold text-stone-800 dark:text-stone-200">
                  No matching pet guides found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Try broader search terms like &ldquo;dog&rdquo;, &ldquo;cat&rdquo;, &ldquo;nutrition&rdquo;, or &ldquo;puppy training&rdquo;.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 pt-4">
            <h2 className="text-base font-mono uppercase tracking-wider text-stone-500 font-semibold text-center">
              Explore by Popular Topics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {petCategories.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-orange-500/50 hover:shadow-md transition-all text-center group"
                >
                  <p className="text-sm font-bold font-serif text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors">
                    {c.name}
                  </p>
                  <p className="text-[10px] text-stone-500 mt-1 line-clamp-1">
                    {c.subTopics.slice(0, 2).join(', ')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
