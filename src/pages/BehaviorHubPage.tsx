import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, Clock, ArrowRight, ShieldCheck, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SafeImage } from '../components/SafeImage';
import { getPublishedArticles } from '../lib/supabase';
import { Article } from '../types';

export const BehaviorHubPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const data = await getPublishedArticles({ category: 'behavior' });
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

  const filteredArticles = articles.filter((a) => {
    return (
      searchFilter === '' ||
      a.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchFilter.toLowerCase())
    );
  });

  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F2] dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Why Does My Pet Do That? Pet Behavior Knowledge Hub | Petzora"
        description="Decode why your dog or cat stares, kneads, tilts their head, follows you to the bathroom, or meows at night. Evidence-based pet behavior guides."
        canonicalUrl="https://petzora.shop/behavior"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Why Does My Pet Do That?', url: '/behavior' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hub Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white p-8 sm:p-14 border border-stone-800 shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#D95D39]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D95D39]/30 text-[#E07A5F] text-xs font-mono font-semibold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>THE PET BEHAVIOR ENCYCLOPEDIA</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight">
              Why Does My Pet Do That?
            </h1>

            <p className="text-base sm:text-lg text-stone-300 font-sans leading-relaxed">
              From pack bonding and nocturnal hunting instincts to head tilts and kneading paws—decode your dog or cat&apos;s fascinating communication signals through certified positive animal behavior research.
            </p>

            <div className="pt-2 max-w-md">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search habits (e.g. staring, barking, kneading)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-stone-400 text-xs outline-none focus:bg-white/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content list or clean empty state */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#D95D39] animate-spin" />
            <p className="text-xs font-mono text-stone-500">Loading behavior guides...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-center space-y-3 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-stone-800 text-[#D95D39] flex items-center justify-center mx-auto">
              <HelpCircle className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
              No Behavior Guides Published Yet
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              {searchFilter
                ? 'No behavior articles matched your search query.'
                : 'Our behaviorists are currently researching and drafting articles on curious dog and cat habits. When published from the CMS, they will appear right here!'}
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
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-xl transition-all flex flex-col group"
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

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D95D39] font-bold">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors leading-snug">
                      <Link to={`/${article.category}/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-mono">{article.readingTime}</span>
                    <Link
                      to={`/${article.category}/${article.slug}`}
                      className="text-xs font-semibold uppercase tracking-wider text-[#D95D39] hover:underline flex items-center gap-1"
                    >
                      <span>Read Guide</span>
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
