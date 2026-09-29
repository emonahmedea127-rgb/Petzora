import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Search, Heart, Clock, Loader2 } from 'lucide-react';
import { petCategories } from '../data/mockData';
import { SEO } from '../components/SEO';
import { SafeImage } from '../components/SafeImage';
import { getPublishedArticles, getCategories } from '../lib/supabase';
import { Article, CategoryInfo } from '../types';

export const BlogArchivePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>(petCategories);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const [arts, cats] = await Promise.all([
        getPublishedArticles(),
        getCategories(),
      ]);
      if (mounted) {
        setArticles(arts);
        if (cats.length > 0) setCategories(cats);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.subCategory && article.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 sm:py-12 space-y-12 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="All Pet Care Guides, Nutrition &amp; Training Articles | Petzora Archive"
        description="Browse the complete catalog of Petzora puppy, kitten, dog, and cat care guides, veterinary nutrition breakdowns, and positive training tutorials."
        canonicalUrl="https://petzora.shop/guides"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'All Guides', url: '/guides' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>THE PETZORA COMPREHENSIVE ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            All Pet Guides &amp; Articles
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            Veterinary-reviewed health guides, positive dog training routines, kitten socialization advice, and safe nutritional schedules.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === 'all'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              All Topics ({articles.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border-none text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Articles Grid or Empty State */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
            <p className="text-xs font-mono text-stone-500">Loading published guides...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-3 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-stone-800 text-orange-600 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
              No Articles Found
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search query or selecting a different category filter.'
                : 'No articles have been published in the database yet. When published from the editorial CMS, they will appear here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => (
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
                      <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                      <Link to={`/${article.category}/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SafeImage
                        src={article.author.avatar || '/images/author-clara.webp'}
                        alt={article.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                        loading="lazy"
                        fallbackSrc="/images/author-clara.webp"
                      />
                      <span className="text-xs text-stone-600 dark:text-stone-400">
                        {article.author.name}
                      </span>
                    </div>

                    <Link
                      to={`/${article.category}/${article.slug}`}
                      className="text-xs font-semibold text-orange-600 hover:underline flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
