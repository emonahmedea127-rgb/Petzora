import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Heart, Sparkles, Filter } from 'lucide-react';
import { petzoraPicks } from '../data/mockData';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const ReviewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Petzora Picks' },
    { id: 'dog-beds', label: 'Dog Beds' },
    { id: 'water-fountains', label: 'Water Fountains' },
    { id: 'pet-cameras', label: 'Pet Cameras' },
    { id: 'leashes', label: 'Leashes' },
    { id: 'grooming-tools', label: 'Grooming Tools' },
    { id: 'carriers', label: 'Carriers' },
  ];

  const filteredPicks = selectedCategory === 'all'
    ? petzoraPicks
    : petzoraPicks.filter((p) => p.category === selectedCategory);

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

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-500">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              Zero Paid Placements
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-[#D95D39]">
              <CheckCircle2 className="w-4 h-4" />
              Honest Pros &amp; Cons
            </span>
            <span>&bull;</span>
            <Link to="/affiliate-disclosure" className="underline hover:text-stone-800 dark:hover:text-stone-200">
              Affiliate Transparency
            </Link>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#D95D39] text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-[#D95D39]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* AdSense slot */}
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-reviews-top" />

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPicks.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Product Image */}
              <div className="relative aspect-video overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={product.featuredImage}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider font-semibold">
                    {product.categoryLabel}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white text-xs font-mono font-bold shadow-sm">
                    {product.priceRange}
                  </span>
                </div>
              </div>

              {/* Product Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-orange-50/70 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/60">
                    <span className="text-[11px] font-mono text-[#D95D39] dark:text-[#E07A5F] font-bold block uppercase tracking-wide">
                      Best For
                    </span>
                    <p className="text-xs text-stone-800 dark:text-stone-200 font-medium mt-0.5">
                      {product.bestFor}
                    </p>
                  </div>

                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-white leading-snug">
                    {product.title}
                  </h2>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  {/* Pros & Cons */}
                  <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px] font-mono uppercase">
                        Pros:
                      </span>
                      {product.pros.map((pro, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-stone-700 dark:text-stone-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{pro}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1 pt-1.5">
                      <span className="font-bold text-amber-600 dark:text-amber-400 text-[11px] font-mono uppercase">
                        Cons:
                      </span>
                      {product.cons.map((con, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-stone-600 dark:text-stone-400">
                          <XCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-500">
                    Editorial Selection
                  </span>
                  <Link
                    to="/contact"
                    className="px-4 py-2 rounded-xl bg-[#D95D39] hover:bg-[#C24D2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>View Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Review Notice */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 space-y-2">
          <h3 className="font-serif font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Our Review Ethics &amp; Standards</span>
          </h3>
          <p className="leading-relaxed">
            Petzora maintains strict separation between editorial evaluations and commercial affiliate partnerships. We never accept payment in exchange for a favorable rating, nor do we award five-star endorsements to unvetted products. Learn more in our{' '}
            <Link to="/affiliate-disclosure" className="text-[#D95D39] underline font-medium">Affiliate Disclosure</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};
