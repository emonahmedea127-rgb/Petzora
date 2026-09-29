import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Heart, Sparkles, Filter, Loader2, BookOpen } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SafeImage } from '../components/SafeImage';
import { getPublishedArticles } from '../lib/supabase';
import { Article } from '../types';

export const ReviewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const data = await getPublishedArticles({ category: 'reviews' });
      if (mounted) {
        setArticles(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F2] dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Petzora Picks: Honest Dog &amp; Cat Product Reviews | Petzora"
        description="Independent, safety-first buying guides for orthopedic dog beds, quiet pet water fountains, cameras, leashes, and grooming tools on petzora.shop."
        canonicalUrl="https://petzora.shop/reviews"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Petzora Picks', url: '/reviews' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D95D39] bg-orange-100/70 dark:bg-orange-950/60 px-3.5 py-1.5 rounded-full font-bold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>PETZORA PICKS &bull; BUYER&apos;S GUIDES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Tested &amp; Recommended Pet Gear
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            Independent, safety-evaluated gear for devoted dog and cat parents. We prioritize anatomical comfort, pet-safe materials, and longevity over marketing hype.
          </p>
        </div>

        {/* Content list or clean empty state */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#D95D39] animate-spin" />
            <p className="text-xs font-mono text-stone-500">Loading product reviews...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-center space-y-3 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-stone-800 text-[#D95D39] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
              No Product Reviews Published Yet
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Our gear testing team is currently hands-on testing orthopedic dog beds, fountains, and interactive toys. Reviews will be published directly from the editorial dashboard.
            </p>
            <div className="pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D95D39] hover:bg-[#C24D2B] text-white text-xs font-semibold uppercase tracking-wider transition"
              >
                <span>Back to Homepage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => (
              <article
                key={item.id}
                className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-xl transition-all flex flex-col group"
              >
                <Link
                  to={`/${item.category}/${item.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden"
                >
                  <SafeImage
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    fallbackSrc="/images/pet-fallback.webp"
                  />
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D95D39] font-bold">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors leading-snug">
                      <Link to={`/${item.category}/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-mono">{item.readingTime}</span>
                    <Link
                      to={`/${item.category}/${item.slug}`}
                      className="text-xs font-semibold uppercase tracking-wider text-[#D95D39] hover:underline flex items-center gap-1"
                    >
                      <span>Read Review</span>
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
