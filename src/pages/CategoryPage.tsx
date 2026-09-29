import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Tag, BookOpen, Clock, ShieldCheck, Heart, Loader2 } from 'lucide-react';
import { petCategories } from '../data/mockData';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { SafeImage } from '../components/SafeImage';
import { getPublishedArticles, getCategories } from '../lib/supabase';
import { Article, CategoryInfo } from '../types';

interface CategoryPageProps {
  categorySlug?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug: propSlug }) => {
  const params = useParams<{ category: string }>();
  const activeSlug = (propSlug || params.category || 'dogs').toLowerCase();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>(petCategories);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState<number>(9);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const [arts, cats] = await Promise.all([
        getPublishedArticles({ category: activeSlug }),
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
  }, [activeSlug]);

  const categoryInfo = categories.find((c) => c.slug.toLowerCase() === activeSlug) || {
    id: activeSlug,
    name: activeSlug.charAt(0).toUpperCase() + activeSlug.slice(1).replace('-', ' '),
    slug: activeSlug,
    description: `Expert pet care advice, veterinary-approved guides, and practical lifestyle tips for ${activeSlug.replace('-', ' ')}.`,
    coverImage: '/images/hero-dog-cat.webp',
  };

  const displayedArticles = articles.slice(0, visibleCount);
  const featuredInCat = articles.find((a) => a.isFeatured) || articles[0];

  return (
    <div className="py-8 sm:py-12 space-y-12 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title={`${categoryInfo.name} Guides & Care Advice | Petzora`}
        description={categoryInfo.description}
        ogImage={categoryInfo.coverImage || '/images/hero-dog-cat.webp'}
        canonicalUrl={`https://petzora.shop/${categoryInfo.slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: categoryInfo.name, url: `/${categoryInfo.slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
          <Link to="/" className="hover:text-stone-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-stone-900 dark:text-white font-semibold">
            {categoryInfo.name}
          </span>
        </nav>

        {/* Category Header Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white p-8 sm:p-14 lg:p-16 border border-stone-800 shadow-xl">
          <SafeImage
            src={categoryInfo.coverImage || '/images/hero-dog-cat.webp'}
            alt={categoryInfo.name}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            priority={true}
            fallbackSrc="/images/pet-fallback.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-orange-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
              {articles.length} Published Guide{articles.length === 1 ? '' : 's'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
              {categoryInfo.name}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
              {categoryInfo.description}
            </p>
          </div>
        </div>

        {/* Articles Content Section */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#D95D39] animate-spin" />
            <p className="text-xs font-mono text-stone-500">Loading {categoryInfo.name} articles...</p>
          </div>
        ) : articles.length === 0 ? (
          /* Clean Empty State */
          <div className="p-12 sm:p-16 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-stone-800 text-[#D95D39] flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                No Guides Published in {categoryInfo.name} Yet
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                Our veterinary advisory board is actively writing and reviewing guides for this topic. When articles are published in this category from our editorial CMS, they will appear right here!
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <Link
                to="/"
                className="px-5 py-2.5 rounded-full bg-[#D95D39] hover:bg-[#C24D2B] text-white text-xs font-semibold uppercase tracking-wider transition"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Article in Category */}
            {featuredInCat && (
              <div className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-md grid grid-cols-1 lg:grid-cols-12 group hover:shadow-xl transition-all">
                <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden">
                  <SafeImage
                    src={featuredInCat.featuredImage}
                    alt={featuredInCat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={true}
                    fallbackSrc="/images/pet-fallback.webp"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#D95D39] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow">
                      Featured Guide
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featuredInCat.readingTime}</span>
                      <span>&bull;</span>
                      <span>By {featuredInCat.author.name}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors leading-tight">
                      <Link to={`/${featuredInCat.category}/${featuredInCat.slug}`}>
                        {featuredInCat.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                      {featuredInCat.excerpt}
                    </p>
                  </div>

                  <Link
                    to={`/${featuredInCat.category}/${featuredInCat.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D95D39] hover:underline pt-2"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedArticles.map((article) => (
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
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      fallbackSrc="/images/pet-fallback.webp"
                    />
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                        <span>{article.readingTime}</span>
                        <span>&bull;</span>
                        <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors leading-snug line-clamp-2">
                        <Link to={`/${article.category}/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                      <span className="text-stone-500">By {article.author.name}</span>
                      <Link
                        to={`/${article.category}/${article.slug}`}
                        className="font-semibold text-[#D95D39] hover:underline"
                      >
                        Read &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < articles.length && (
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 9)}
                  className="px-6 py-3 rounded-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:border-[#D95D39] text-xs font-mono font-semibold uppercase tracking-wider transition"
                >
                  Load More Guides ({articles.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
