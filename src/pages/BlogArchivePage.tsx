import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Search, Heart, Clock } from 'lucide-react';
import { allArticles, petCategories } from '../data/mockData';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { SafeImage } from '../components/SafeImage';

export const BlogArchivePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = allArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      article.category === selectedCategory ||
      (selectedCategory === 'dogs' && article.petType === 'dog') ||
      (selectedCategory === 'cats' && article.petType === 'cat');

    const matchesSearch =
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
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              All Topics
            </button>
            {petCategories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                  selectedCategory === c.slug
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Quick Filter Search */}
          <div className="relative shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword..."
              className="pl-9 pr-4 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-orange-500 w-full md:w-60"
            />
          </div>
        </div>

        {/* AdSense Slot */}
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-archive-top" />

        {/* Articles Grid */}
        {filtered.length > 0 ? (
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
                      {article.subCategory || article.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                      <span>{article.readingTime}</span>
                      <span>•</span>
                      <span>{article.createdAt}</span>
                    </div>
                    <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                      <Link to={`/${article.category}/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SafeImage
                        src={article.author.avatar}
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
                      className="text-xs font-semibold text-orange-600 hover:underline"
                    >
                      Read &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-stone-500 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
            <p className="text-base font-semibold">No pet guides match your current filter.</p>
            <p className="text-xs mt-1 text-stone-400">Try adjusting your category selection or clear your search term.</p>
          </div>
        )}

        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-archive-bottom" />
      </div>
    </div>
  );
};
