import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Tag, BookOpen, Clock, ShieldCheck, Heart } from 'lucide-react';
import { allArticles, petCategories } from '../data/mockData';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { PetCategory } from '../types';

interface CategoryPageProps {
  categorySlug?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug: propSlug }) => {
  const params = useParams<{ category: string }>();
  const activeSlug = (propSlug || params.category || 'dogs') as PetCategory;
  const [selectedSubTopic, setSelectedSubTopic] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(9);

  const categoryInfo = petCategories.find((c) => c.slug === activeSlug) || {
    id: activeSlug,
    name: activeSlug.charAt(0).toUpperCase() + activeSlug.slice(1).replace('-', ' '),
    slug: activeSlug,
    description: `Expert pet care advice, veterinary-approved guides, and practical lifestyle tips for ${activeSlug.replace('-', ' ')}.`,
    coverImage: '/src/assets/images/hero_dog_cat_home_1790494898814.jpg',
    iconName: 'Heart',
    subTopics: ['General Care', 'Health', 'Nutrition', 'Training', 'Lifestyle'],
  };

  // Filter articles for this category
  const categoryArticles = allArticles.filter(
    (a) => a.category === activeSlug || (activeSlug === 'dogs' && a.petType === 'dog') || (activeSlug === 'cats' && a.petType === 'cat')
  );

  const subTopics = ['all', ...categoryInfo.subTopics];

  const filteredArticles = selectedSubTopic === 'all'
    ? categoryArticles
    : categoryArticles.filter(
        (a) => a.subCategory?.toLowerCase() === selectedSubTopic.toLowerCase()
      );

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const featuredInCat = categoryArticles.find((a) => a.isFeatured) || categoryArticles[0];

  return (
    <div className="py-8 sm:py-12 space-y-12 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title={`${categoryInfo.name} Guides & Care Advice | Petzora`}
        description={categoryInfo.description}
        ogImage={categoryInfo.coverImage}
        canonicalUrl={`https://petzora.shop/${categoryInfo.slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: categoryInfo.name, url: `/${categoryInfo.slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <Link to="/" className="hover:text-stone-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-stone-800 dark:text-stone-200 font-medium capitalize">
            {categoryInfo.name}
          </span>
        </nav>

        {/* Category Header Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-stone-900 text-white p-8 sm:p-12 lg:p-16 border border-stone-800">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <img
              src={categoryInfo.coverImage}
              alt={categoryInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Petzora Category Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
              {categoryInfo.name}
            </h1>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              {categoryInfo.description}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-stone-400">
              <span>{categoryArticles.length} Published Articles</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Veterinary Reviewed
              </span>
            </div>
          </div>
        </div>

        {/* Sub-Topics Filter Bar */}
        {categoryInfo.subTopics.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {subTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedSubTopic(topic);
                  setVisibleCount(9);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all capitalize ${
                  selectedSubTopic === topic
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-orange-500/50'
                }`}
              >
                {topic === 'all' ? 'All Guides' : topic}
              </button>
            ))}
          </div>
        )}

        {/* AdSense horizontal slot */}
        <AdSenseSlot slotType="horizontal-banner" slotId={`petzora-category-${categoryInfo.slug}-top`} />

        {/* Lead Featured Article in Category */}
        {featuredInCat && selectedSubTopic === 'all' && (
          <article className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <Link
              to={`/${featuredInCat.category}/${featuredInCat.slug}`}
              className="lg:col-span-6 rounded-2xl overflow-hidden aspect-video block"
            >
              <img
                src={featuredInCat.featuredImage}
                alt={featuredInCat.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                <span className="text-orange-600 uppercase font-semibold">
                  {featuredInCat.subCategory || featuredInCat.category}
                </span>
                <span>•</span>
                <span>{featuredInCat.readingTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors leading-tight">
                <Link to={`/${featuredInCat.category}/${featuredInCat.slug}`}>
                  {featuredInCat.title}
                </Link>
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {featuredInCat.excerpt}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredInCat.author.avatar}
                    alt={featuredInCat.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-white">
                      {featuredInCat.author.name}
                    </p>
                    <p className="text-[10px] text-stone-500">{featuredInCat.author.role}</p>
                  </div>
                </div>
                <Link
                  to={`/${featuredInCat.category}/${featuredInCat.slug}`}
                  className="text-xs font-semibold text-orange-600 hover:underline flex items-center gap-1"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Articles Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white">
              {selectedSubTopic === 'all'
                ? `All ${categoryInfo.name} Guides`
                : `${selectedSubTopic} Articles`}
            </h2>
            <span className="text-xs font-mono text-stone-500">
              Showing {displayedArticles.length} of {filteredArticles.length}
            </span>
          </div>

          {displayedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
                >
                  <Link
                    to={`/${article.category}/${article.slug}`}
                    className="block relative aspect-[16/10] overflow-hidden"
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
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span>{article.createdAt}</span>
                        <span>•</span>
                        <span>{article.readingTime}</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
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
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="w-6 h-6 rounded-full object-cover"
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
              <p className="text-base font-semibold">No articles found in this sub-topic yet.</p>
              <p className="text-xs mt-1 text-stone-400">
                Check back soon or browse all {categoryInfo.name} guides.
              </p>
              <button
                onClick={() => setSelectedSubTopic('all')}
                className="mt-4 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredArticles.length && (
            <div className="text-center pt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-8 py-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-all"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>

        {/* Bottom category AdSense slot */}
        <AdSenseSlot slotType="horizontal-banner" slotId={`petzora-category-${categoryInfo.slug}-bottom`} />
      </div>
    </div>
  );
};
