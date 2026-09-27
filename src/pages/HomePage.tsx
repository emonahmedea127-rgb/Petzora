import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Apple,
  Bone,
  ShoppingBag,
  HelpCircle,
  Users,
} from 'lucide-react';
import { allArticles, petCategories, editorialTeam } from '../data/mockData';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const HomePage: React.FC = () => {
  // Articles data segmentation
  const featuredLead = allArticles.find((a) => a.isFeatured) || allArticles[0];
  const featuredSub = allArticles.filter((a) => a.id !== featuredLead.id).slice(0, 4);

  const latestGuides = allArticles.slice(0, 6);
  const dogArticles = allArticles.filter((a) => a.category === 'dogs' || a.petType === 'dog').slice(0, 4);
  const catArticles = allArticles.filter((a) => a.category === 'cats' || a.petType === 'cat').slice(0, 4);
  const nutritionArticles = allArticles.filter((a) => a.category === 'nutrition').slice(0, 3);
  const healthArticles = allArticles.filter((a) => a.category === 'health').slice(0, 3);
  const productGuides = allArticles.filter((a) => a.category === 'product-guides').slice(0, 3);
  const petStories = allArticles.filter((a) => a.category === 'stories').slice(0, 2);

  const scrollToGuides = () => {
    const el = document.getElementById('explore-topics');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLatest = () => {
    const el = document.getElementById('latest-guides');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <SEO
        title="Petzora – Better Care. Happier Pets. | Expert Dog & Cat Guides"
        description="Practical pet care advice, puppy training, cat health, canine nutrition, product recommendations, and heartwarming stories for dog and cat owners on petzora.shop."
        canonicalUrl="https://petzora.shop"
        ogType="website"
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-white to-stone-50 dark:from-stone-900 dark:via-stone-950 dark:to-stone-950 border-b border-stone-200/70 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Hero Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/70 border border-orange-200 dark:border-orange-800/80 text-orange-800 dark:text-orange-300 text-xs font-mono font-semibold tracking-wider uppercase">
                <Heart className="w-3.5 h-3.5 fill-current text-orange-600" />
                <span>YOUR PET. YOUR FAMILY.</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-stone-900 dark:text-white leading-[1.12]">
                Better Care. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                  Happier Pets.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl font-normal">
                Practical pet care advice, positive training routines, veterinary-checked nutrition guides, and heartwarming real-life stories for devoted dog and cat parents.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToGuides}
                  className="px-7 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm shadow-md hover:shadow-lg shadow-orange-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Pet Guides</span>
                </button>
                <button
                  type="button"
                  onClick={scrollToLatest}
                  className="px-7 py-3.5 rounded-2xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Latest Articles</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Small Trust Indicators */}
              <div className="pt-6 border-t border-stone-200/80 dark:border-stone-800/80">
                <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 font-semibold">
                  Trusted Pet Advice Backed By Science
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium text-stone-700 dark:text-stone-300">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pet Care Guides</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Training Tips</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Apple className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Nutrition Advice</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Product Reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10 group">
                <img
                  src="/src/assets/images/hero_dog_cat_home_1790494898814.jpg"
                  alt="Happy golden retriever and tabby cat resting together peacefully in a bright, modern living room"
                  className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider font-semibold w-max mb-2">
                    Expertise You Can Trust
                  </span>
                  <p className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
                    Helping you raise thriving, healthy companions from puppyhood &amp; kittenhood to golden senior years.
                  </p>
                  <p className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                    <span>Reviewed by Dr. Clara Vance, DVM</span>
                    <span>•</span>
                    <span>petzora.shop</span>
                  </p>
                </div>
              </div>

              {/* Floating Quick Stat Card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/70 text-orange-600 flex items-center justify-center font-bold text-sm">
                  100%
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 dark:text-white">Evidence-Based</p>
                  <p className="text-[11px] text-stone-500">Zero sponsored health claims</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. EXPLORE PET TOPICS */}
      <section id="explore-topics" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
            Browse Essential Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white tracking-tight mt-1">
            Explore Pet Topics
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">
            Curated guides, behavioral routines, and nutritional breakdowns tailored specifically for your furry family members.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {petCategories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              to={`/${cat.slug}`}
              className="group flex flex-col p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-1 transition-all text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden mb-3.5 shadow-sm group-hover:scale-105 transition-transform">
                <img
                  src={cat.coverImage}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif font-bold text-stone-900 dark:text-white text-base group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                {cat.subTopics.slice(0, 3).join(', ')}
              </p>
              <span className="mt-3 text-[11px] font-semibold text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Read guides &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Non-intrusive Ad Placement Slot (Header/Sub-Topic position) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-home-top-leaderboard" />
      </div>

      {/* 3. FEATURED ARTICLES (1 Large + 4 Smaller) */}
      <section className="py-16 bg-stone-100/70 dark:bg-stone-900/40 border-y border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
                Editor&apos;s Highlights
              </span>
              <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white tracking-tight mt-1">
                Featured Stories &amp; Essential Guides
              </h2>
            </div>
            <Link
              to="/dogs"
              className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              <span>Explore all articles</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 1 Large Featured Article */}
            <article className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-md group hover:shadow-xl transition-all">
              <Link to={`/${featuredLead.category}/${featuredLead.slug}`} className="block relative aspect-video sm:aspect-[16/10] overflow-hidden">
                <img
                  src={featuredLead.featuredImage}
                  alt={featuredLead.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-orange-600 text-white text-xs font-semibold uppercase tracking-wider shadow">
                    Featured Guide
                  </span>
                </div>
              </Link>
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                  <span className="text-orange-600 dark:text-orange-400 uppercase font-semibold">
                    {featuredLead.subCategory || featuredLead.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredLead.readingTime}
                  </span>
                  <span>•</span>
                  <span>{featuredLead.createdAt}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  <Link to={`/${featuredLead.category}/${featuredLead.slug}`}>
                    {featuredLead.title}
                  </Link>
                </h3>

                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                  {featuredLead.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredLead.author.avatar}
                      alt={featuredLead.author.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-orange-500/30"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900 dark:text-white">
                        {featuredLead.author.name}
                      </p>
                      <p className="text-[10px] text-stone-500">
                        {featuredLead.author.role}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/${featuredLead.category}/${featuredLead.slug}`}
                    className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>

            {/* 4 Smaller Featured Articles */}
            <div className="lg:col-span-5 space-y-4">
              {featuredSub.map((subArt) => (
                <article
                  key={subArt.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-orange-500/40 hover:shadow-md transition-all flex gap-4 items-center group"
                >
                  <Link
                    to={`/${subArt.category}/${subArt.slug}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0"
                  >
                    <img
                      src={subArt.featuredImage}
                      alt={subArt.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span className="font-semibold text-orange-600 dark:text-orange-400 uppercase">
                        {subArt.subCategory || subArt.category}
                      </span>
                      <span>•</span>
                      <span>{subArt.readingTime}</span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug line-clamp-2">
                      <Link to={`/${subArt.category}/${subArt.slug}`}>
                        {subArt.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                      By {subArt.author.name}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. LATEST PET GUIDES GRID */}
      <section id="latest-guides" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
              Fresh From Our Editorial Team
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white tracking-tight mt-1">
              Latest Pet Guides
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
              Up-to-date preventive healthcare advice, hygiene guides, and behavioral routines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestGuides.map((guide) => (
            <article
              key={guide.id}
              className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
            >
              <Link to={`/${guide.category}/${guide.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                <img
                  src={guide.featuredImage}
                  alt={guide.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-stone-950/70 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider">
                    {guide.subCategory || guide.category}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{guide.createdAt}</span>
                    <span>•</span>
                    <span>{guide.readingTime}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug line-clamp-2">
                    <Link to={`/${guide.category}/${guide.slug}`}>
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={guide.author.avatar}
                      alt={guide.author.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                      {guide.author.name}
                    </span>
                  </div>
                  <Link
                    to={`/${guide.category}/${guide.slug}`}
                    className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Read &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. DOG CARE SECTION */}
      <section className="py-16 bg-amber-50/40 dark:bg-stone-900/60 border-t border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/60 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-xs font-semibold mb-2">
                <Bone className="w-3.5 h-3.5" />
                <span>Canine Life &amp; Training</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
                Everything About Dogs
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
                Puppy care routines, loose-leash training, canine nutrition, and grooming essentials.
              </p>
            </div>
            <Link
              to="/dogs"
              className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              <span>View all dog guides</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dogArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-md transition-all flex flex-col group"
              >
                <Link to={`/${article.category}/${article.slug}`} className="block relative aspect-video overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold uppercase">
                      {article.subCategory || 'Dogs'}
                    </span>
                  </div>
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 dark:text-white text-base group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                      <Link to={`/${article.category}/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-between">
                    <span>{article.readingTime}</span>
                    <span className="text-orange-600 dark:text-orange-400 font-semibold group-hover:translate-x-1 transition-transform">
                      Read &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CAT CARE SECTION */}
      <section className="py-16 bg-white dark:bg-stone-950 border-t border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Feline Enrichment &amp; Wellness</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
                Everything About Cats
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
                Kitten care, subtle behavior clues, safe indoor stimulation, and feline nutrition.
              </p>
            </div>
            <Link
              to="/cats"
              className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              <span>View all cat guides</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {catArticles.map((article) => (
              <article
                key={article.id}
                className="bg-stone-50 dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-md transition-all flex flex-col group"
              >
                <Link to={`/${article.category}/${article.slug}`} className="block relative aspect-video overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold uppercase">
                      {article.subCategory || 'Cats'}
                    </span>
                  </div>
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 dark:text-white text-base group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                      <Link to={`/${article.category}/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-between">
                    <span>{article.readingTime}</span>
                    <span className="text-orange-600 dark:text-orange-400 font-semibold group-hover:translate-x-1 transition-transform">
                      Read &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page AdSense banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-home-mid-banner" />
      </div>

      {/* 7. NUTRITION & HEALTH DUAL SECTION */}
      <section className="py-16 sm:py-20 bg-stone-100/60 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Pet Nutrition */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-amber-600" />
                  <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">
                    Healthy Nutrition for Happy Pets
                  </h3>
                </div>
                <Link to="/nutrition" className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline">
                  All Nutrition &rarr;
                </Link>
              </div>

              <div className="space-y-4">
                {nutritionArticles.map((art) => (
                  <article
                    key={art.id}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 flex gap-4 items-center group hover:border-orange-500/50 transition-all"
                  >
                    <img
                      src={art.featuredImage}
                      alt={art.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="text-[10px] font-mono text-amber-600 uppercase font-semibold">
                        {art.subCategory || 'Nutrition'}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2">
                        <Link to={`/${art.category}/${art.slug}`}>
                          {art.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-stone-500">{art.readingTime} • By {art.author.name}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right: Health & Wellness */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">
                    Keeping Your Pets Healthy &amp; Safe
                  </h3>
                </div>
                <Link to="/health" className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline">
                  All Health &rarr;
                </Link>
              </div>

              <div className="space-y-4">
                {healthArticles.map((art) => (
                  <article
                    key={art.id}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 flex gap-4 items-center group hover:border-orange-500/50 transition-all"
                  >
                    <img
                      src={art.featuredImage}
                      alt={art.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="text-[10px] font-mono text-emerald-600 uppercase font-semibold">
                        {art.subCategory || 'Health'}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2">
                        <Link to={`/${art.category}/${art.slug}`}>
                          {art.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-stone-500">{art.readingTime} • By {art.author.name}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. PET PRODUCT GUIDES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
              Buyer&apos;s Roundups
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white tracking-tight mt-1">
              Tested &amp; Recommended Pet Products
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
              Independent reviews of durable harnesses, interactive cat toys, ergonomic beds, and puppy starters.
            </p>
          </div>
          <Link to="/product-guides" className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline">
            Browse All Product Guides &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productGuides.map((prod) => (
            <article
              key={prod.id}
              className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
            >
              <Link to={`/${prod.category}/${prod.slug}`} className="block relative aspect-video overflow-hidden">
                <img
                  src={prod.featuredImage}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-xs font-mono text-orange-600 dark:text-orange-400 font-semibold uppercase">
                    {prod.subCategory || 'Gear Review'}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2 mt-1">
                    <Link to={`/${prod.category}/${prod.slug}`}>
                      {prod.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2">
                    {prod.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-orange-600 dark:text-orange-400">
                  <span>View Buyer&apos;s Checklist</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. HEARTWARMING PET STORIES */}
      <section className="py-16 bg-amber-50/50 dark:bg-stone-900/60 border-t border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
                Community &amp; Adoption
              </span>
              <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white tracking-tight mt-1">
                Inspiring Pet Stories &amp; Community
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
                Touching adoption journeys, shelter transformations, and the unbreakable human-animal bond.
              </p>
            </div>
            <Link to="/stories" className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline">
              Read all stories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {petStories.map((story) => (
              <article
                key={story.id}
                className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-xl transition-all grid grid-cols-1 sm:grid-cols-12 group"
              >
                <Link to={`/${story.category}/${story.slug}`} className="sm:col-span-5 relative aspect-square sm:aspect-auto overflow-hidden">
                  <img
                    src={story.featuredImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-mono text-orange-600 dark:text-orange-400 uppercase font-semibold">
                      {story.subCategory}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2 mt-1">
                      <Link to={`/${story.category}/${story.slug}`}>
                        {story.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3 mt-2">
                      {story.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                    <span>By {story.author.name}</span>
                    <span className="text-orange-600 dark:text-orange-400 font-semibold">Read Story &rarr;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. MEET OUR PET CARE EXPERTS & CONTRIBUTORS */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
            Expertise You Can Trust
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">
            Every Petzora guide is researched, written, or medically reviewed by licensed veterinarians, certified animal behaviorists, and experienced rescue advocates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {editorialTeam.map((author) => (
            <div
              key={author.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-orange-500/20 mb-4 shadow"
              />
              <h3 className="font-serif font-bold text-stone-900 dark:text-white text-lg">
                <Link to={`/author/${author.slug}`} className="hover:text-orange-600 transition-colors">
                  {author.name}
                </Link>
              </h3>
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mt-0.5">
                {author.role}
              </p>
              {author.credentials && (
                <p className="text-[11px] font-mono text-stone-500 mt-1">
                  {author.credentials}
                </p>
              )}
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-3 flex-1">
                {author.bio}
              </p>
              <Link
                to={`/author/${author.slug}`}
                className="mt-4 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-orange-600 hover:text-white transition-colors"
              >
                View Articles &amp; Bio &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 11. TRUST / WHY PET PARENTS TRUST PETZORA */}
      <section className="py-16 bg-stone-900 text-stone-100 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
                OUR EDITORIAL MISSION
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                Why Pet Parents Trust Petzora
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed">
                On the internet, misleading pet advice can risk an animal&apos;s life. That is why Petzora adheres to strict veterinary advisory protocols, zero sensationalist health myths, and complete editorial independence.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Fact-Checked Health Content</h4>
                    <p className="text-xs text-stone-400">All medical, toxic ingredient, and symptom articles undergo rigorous veterinary review.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Gentle, Positive Reinforcement</h4>
                    <p className="text-xs text-stone-400">We champion Fear-Free, positive reinforcement techniques that build joyful lifelong trust.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Independent Product Testing</h4>
                    <p className="text-xs text-stone-400">No brand pays to dictate our buying guides or product safety ratings.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <p className="text-3xl font-serif font-bold text-orange-400">45k+</p>
                <p className="text-xs font-medium text-white">Subscribed Pet Parents</p>
                <p className="text-[11px] text-stone-400">Receiving weekly care digests</p>
              </div>
              <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <p className="text-3xl font-serif font-bold text-emerald-400">100%</p>
                <p className="text-xs font-medium text-white">Veterinary Reviewed</p>
                <p className="text-[11px] text-stone-400">Strict medical accuracy</p>
              </div>
              <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <p className="text-3xl font-serif font-bold text-amber-400">16+</p>
                <p className="text-xs font-medium text-white">In-Depth Guides</p>
                <p className="text-[11px] text-stone-400">Puppy to senior care</p>
              </div>
              <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <p className="text-3xl font-serif font-bold text-sky-400">Zero</p>
                <p className="text-xs font-medium text-white">Sponsored Bias</p>
                <p className="text-[11px] text-stone-400">Genuine reader advocacy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BOTTOM AD PLACEMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-home-bottom-banner" />
      </div>
    </div>
  );
};
