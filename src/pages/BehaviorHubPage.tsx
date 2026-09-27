import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, Clock, ArrowRight, ShieldCheck, Sparkles, Dog, Cat } from 'lucide-react';
import { allArticles } from '../data/mockData';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const BehaviorHubPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const behaviorArticles = allArticles.filter(
    (a) => a.category === 'behavior' || a.subCategory?.toLowerCase().includes('behavior') || a.subCategory?.toLowerCase().includes('psychology') || a.title.toLowerCase().startsWith('why ')
  );

  const filteredArticles = behaviorArticles.filter((a) => {
    const matchesPet =
      activeFilter === 'all' ||
      (activeFilter === 'dog' && (a.petType === 'dog' || a.category === 'dogs')) ||
      (activeFilter === 'cat' && (a.petType === 'cat' || a.category === 'cats'));

    const matchesSearch =
      searchFilter === '' ||
      a.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesPet && matchesSearch;
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
              <span>THE PETZORA BEHAVIOR KNOWLEDGE HUB</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Why Does My Pet Do That?
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              From head tilts and midnight zoomies to why your cat kneads blankets and your dog follows you into the bathroom. Discover what animal behaviorists have decoded.
            </p>

            {/* Quick Search */}
            <div className="pt-4 max-w-xl">
              <div className="flex items-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 text-white focus-within:border-[#D95D39] transition-all">
                <Search className="w-5 h-5 text-stone-300 ml-2 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search curious behaviors (e.g. stare, knead, tilt, follow)..."
                  className="w-full bg-transparent text-sm text-white placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#D95D39] text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-[#D95D39]'
              }`}
            >
              All Behaviors ({behaviorArticles.length})
            </button>
            <button
              onClick={() => setActiveFilter('dog')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeFilter === 'dog'
                  ? 'bg-[#D95D39] text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-[#D95D39]'
              }`}
            >
              <Dog className="w-3.5 h-3.5" />
              <span>Canine Habits</span>
            </button>
            <button
              onClick={() => setActiveFilter('cat')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeFilter === 'cat'
                  ? 'bg-[#D95D39] text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-[#D95D39]'
              }`}
            >
              <Cat className="w-3.5 h-3.5" />
              <span>Feline Habits</span>
            </button>
          </div>

          <span className="text-xs font-mono text-stone-500">
            Showing {filteredArticles.length} Behavior Guides
          </span>
        </div>

        {/* AdSense Slot */}
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-behavior-top" />

        {/* Behavior Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group"
            >
              <Link to={`/${article.category}/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider font-semibold">
                    {article.subCategory || 'Behavior'}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readingTime}
                    </span>
                    <span>&bull;</span>
                    <span>By {article.author.name}</span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors line-clamp-2 leading-snug">
                    <Link to={`/${article.category}/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-[#D95D39]">
                  <span>Decode Behavior</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
