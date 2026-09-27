import React, { useState } from 'react';
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
  ShoppingBag,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Bookmark,
  Check,
} from 'lucide-react';
import { allArticles, petCategories, petzoraPicks, foodGuideItems, editorialTeam } from '../data/mockData';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { useSavedArticles } from '../context/SavedArticlesContext';

export const HomePage: React.FC = () => {
  const { toggleSaveArticle, isArticleSaved } = useSavedArticles();
  const [foodFilter, setFoodFilter] = useState<'all' | 'safe' | 'toxic'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Section 2: Hero feature
  const heroTrendingArticle = allArticles.find((a) => a.slug === 'why-does-my-dog-follow-me-everywhere') || allArticles[0];

  // Section 3: Trending Strip articles
  const trendingArticles = [
    { title: 'Why Cats Sleep on Your Chest', slug: 'why-cats-sleep-on-your-chest', category: 'cats' },
    { title: 'Foods Dogs Should Never Eat', slug: 'foods-dogs-should-never-eat', category: 'nutrition' },
    { title: 'Signs Your Cat Really Trusts You', slug: '10-signs-your-cat-loves-you', category: 'cats' },
    { title: 'Puppy Training Mistakes to Avoid', slug: 'the-puppy-training-mistake-most-new-owners-make', category: 'training' },
    { title: 'Why Dogs Tilt Their Head', slug: 'why-dogs-tilt-their-head', category: 'behavior' },
  ];

  // Section 4: Editor's Picks (1 large + 4 smaller)
  const editorsPickLead = allArticles.find((a) => a.slug === 'signs-your-dog-sees-you-as-family') || allArticles[1];
  const editorsPickSubs = [
    allArticles.find((a) => a.slug === 'why-does-my-cat-follow-me-into-the-bathroom') || allArticles[2],
    allArticles.find((a) => a.slug === 'the-puppy-training-mistake-most-new-owners-make') || allArticles[3],
    allArticles.find((a) => a.slug === 'how-often-should-you-really-bathe-your-dog') || allArticles[4],
    allArticles.find((a) => a.slug === 'what-your-cats-tail-is-trying-to-tell-you') || allArticles[5],
  ];

  // Section 6: Everything Dogs
  const dogArticles = allArticles.filter((a) => a.category === 'dogs' || a.petType === 'dog').slice(0, 5);

  // Section 7: Inside Cats
  const catArticles = allArticles.filter((a) => a.category === 'cats' || a.petType === 'cat').slice(0, 5);

  // Section 8: Why Does My Pet Do That? (Behavior Hub)
  const behaviorArticles = allArticles.filter(
    (a) => a.category === 'behavior' || a.title.toLowerCase().startsWith('why ')
  ).slice(0, 6);

  // Section 9: Pet Health & Wellness
  const healthArticles = allArticles.filter((a) => a.category === 'health' || a.category === 'pet-care').slice(0, 4);

  // Section 11: Pet Stories
  const petStories = allArticles.filter((a) => a.category === 'stories').slice(0, 4);

  // Section 13: Popular Right Now (01 - 05)
  const popularArticles = [
    { num: '01', title: 'Why Does My Dog Sleep Touching Me?', slug: 'why-does-my-dog-sleep-touching-me', category: 'behavior', time: '4 min' },
    { num: '02', title: '10 Signs Your Cat Loves You', slug: '10-signs-your-cat-loves-you', category: 'cats', time: '5 min' },
    { num: '03', title: 'Can Dogs Eat Bananas?', slug: 'can-dogs-eat-bananas', category: 'nutrition', time: '4 min' },
    { num: '04', title: 'Why Cats Follow Their Owners Everywhere', slug: 'why-does-my-cat-follow-me-into-the-bathroom', category: 'cats', time: '4 min' },
    { num: '05', title: 'How Often Should You Feed a Puppy?', slug: 'the-puppy-training-mistake-most-new-owners-make', category: 'training', time: '7 min' },
  ];

  const filteredFoodItems = foodFilter === 'all'
    ? foodGuideItems
    : foodGuideItems.filter((item) => item.safety === foodFilter);

  const handleHeroScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="bg-[#FAF7F2] dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="PETZORA – Everything Your Pet Deserves | Magazine, Care &amp; Stories"
        description="Care better. Understand more. Love deeper. Expert-inspired guides, real pet stories, training tips, nutrition advice, and trusted product reviews on petzora.shop."
        canonicalUrl="https://petzora.shop"
        ogType="website"
      />

      {/* ========================================================
          2. EDITORIAL PET HERO
         ======================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-stone-200/80 dark:border-stone-800">
        {/* Soft background decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-100/60 via-orange-100/40 to-transparent dark:from-stone-900/60 dark:to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/70 border border-orange-200 dark:border-orange-900/60 text-[#D95D39] dark:text-[#E07A5F] text-xs font-mono font-bold tracking-wider uppercase">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>PET MEDIA &bull; LIFESTYLE &bull; KNOWLEDGE HUB</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-stone-900 dark:text-white leading-[1.08]">
                Everything Your Pet Deserves.
              </h1>

              {/* Secondary Line */}
              <p className="text-lg sm:text-xl font-serif italic text-[#D95D39] dark:text-[#E07A5F] font-medium">
                Care better. Understand more. Love deeper.
              </p>

              {/* Description */}
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-xl">
                Expert-inspired guides, real pet stories, training tips, nutrition advice and trusted product recommendations for happier dogs, cats and pet parents.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleHeroScrollTo('explore-categories')}
                  className="px-7 py-3.5 rounded-full bg-[#D95D39] hover:bg-[#C24D2B] text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Pet Care</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroScrollTo('pet-stories')}
                  className="px-7 py-3.5 rounded-full bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Latest Stories</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Small Category Quick Links */}
              <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono font-semibold">
                <span className="text-stone-400 uppercase tracking-wider text-[11px] mr-1">Quick Dive:</span>
                <Link to="/dogs" className="px-3 py-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#D95D39] hover:text-[#D95D39] transition-colors">
                  Dogs
                </Link>
                <Link to="/cats" className="px-3 py-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#D95D39] hover:text-[#D95D39] transition-colors">
                  Cats
                </Link>
                <Link to="/training" className="px-3 py-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#D95D39] hover:text-[#D95D39] transition-colors">
                  Training
                </Link>
                <Link to="/nutrition" className="px-3 py-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#D95D39] hover:text-[#D95D39] transition-colors">
                  Nutrition
                </Link>
                <Link to="/health" className="px-3 py-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#D95D39] hover:text-[#D95D39] transition-colors">
                  Health
                </Link>
              </div>
            </div>

            {/* Right Hero Image Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10 group">
                <img
                  src="/src/assets/images/hero_dog_cat_home_1790494898814.jpg"
                  alt="Golden retriever and domestic tabby cat sleeping peacefully side by side in bright modern interior"
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest font-semibold w-max mb-2">
                    EDITORIAL FEATURE
                  </span>
                  <p className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                    Helping you raise thriving, well-understood companions from kittenhood &amp; puppyhood to golden years.
                  </p>
                  <p className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                    <span>Evidence-based veterinary insights</span>
                    <span>&bull;</span>
                    <span>petzora.shop</span>
                  </p>
                </div>
              </div>

              {/* Floating Trending Card inside Hero */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 max-w-xs p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold text-[#D95D39] mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>TRENDING</span>
                </div>
                <Link
                  to={`/${heroTrendingArticle.category}/${heroTrendingArticle.slug}`}
                  className="text-xs sm:text-sm font-serif font-bold text-stone-900 dark:text-white hover:text-[#D95D39] transition-colors line-clamp-2"
                >
                  {heroTrendingArticle.title}
                </Link>
                <div className="flex items-center justify-between text-[10px] text-stone-500 mt-2 pt-1 border-t border-stone-100 dark:border-stone-800">
                  <span>{heroTrendingArticle.readingTime}</span>
                  <span className="text-[#D95D39] font-semibold">Read guide &rarr;</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. TRENDING NOW STRIP
         ======================================================== */}
      <section className="bg-white dark:bg-stone-900 border-b border-stone-200/80 dark:border-stone-800 py-3.5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D95D39] text-white text-[11px] font-mono font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>TRENDING NOW</span>
          </div>

          <div className="flex-1 overflow-x-auto scrollbar-none flex items-center gap-6 text-xs font-medium whitespace-nowrap text-stone-700 dark:text-stone-300">
            {trendingArticles.map((art, idx) => (
              <Link
                key={idx}
                to={`/${art.category}/${art.slug}`}
                className="hover:text-[#D95D39] transition-colors flex items-center gap-2 group"
              >
                <span className="text-[#D95D39] font-bold">&bull;</span>
                <span className="group-hover:underline">{art.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Optional Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-home-top-strip" />
      </div>

      {/* ========================================================
          4. EDITOR'S PICKS (1 Large + 4 Smaller)
         ======================================================== */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
              MAGAZINE HIGHLIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white mt-1">
              Editor&apos;s Picks
            </h2>
          </div>
          <Link
            to="/dogs"
            className="text-xs font-mono uppercase tracking-wider text-[#D95D39] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Guides</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 1 Large Editorial Article */}
          <article className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-md group hover:shadow-xl transition-all">
            <Link to={`/${editorsPickLead.category}/${editorsPickLead.slug}`} className="block relative aspect-video sm:aspect-[16/10] overflow-hidden">
              <img
                src={editorsPickLead.featuredImage}
                alt={editorsPickLead.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#D95D39] text-white text-[10px] font-mono uppercase tracking-wider font-bold shadow">
                  Editor&apos;s Pick
                </span>
              </div>
            </Link>

            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                <span className="text-[#D95D39] uppercase font-bold">
                  {editorsPickLead.subCategory || editorsPickLead.category}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {editorsPickLead.readingTime}
                </span>
                <span>&bull;</span>
                <span>By {editorsPickLead.author.name}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white leading-tight group-hover:text-[#D95D39] transition-colors">
                <Link to={`/${editorsPickLead.category}/${editorsPickLead.slug}`}>
                  {editorsPickLead.title}
                </Link>
              </h3>

              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                {editorsPickLead.excerpt}
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => toggleSaveArticle(editorsPickLead)}
                  className={`text-xs font-mono flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                    isArticleSaved(editorsPickLead.slug)
                      ? 'border-[#D95D39] text-[#D95D39] bg-orange-50 dark:bg-orange-950/40'
                      : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isArticleSaved(editorsPickLead.slug) ? 'fill-current' : ''}`} />
                  <span>{isArticleSaved(editorsPickLead.slug) ? 'Saved' : 'Save Guide'}</span>
                </button>

                <Link
                  to={`/${editorsPickLead.category}/${editorsPickLead.slug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-[#D95D39] hover:underline flex items-center gap-1"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>

          {/* 4 Smaller Editorial Cards */}
          <div className="lg:col-span-5 space-y-4">
            {editorsPickSubs.map((subArt) => (
              <article
                key={subArt.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-[#D95D39]/40 hover:shadow-md transition-all flex gap-4 items-center group"
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
                  <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500">
                    <span className="font-bold text-[#D95D39] uppercase">
                      {subArt.subCategory || subArt.category}
                    </span>
                    <span>&bull;</span>
                    <span>{subArt.readingTime}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors leading-snug line-clamp-2">
                    <Link to={`/${subArt.category}/${subArt.slug}`}>
                      {subArt.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                    {subArt.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. EXPLORE CATEGORIES
         ======================================================== */}
      <section id="explore-categories" className="py-14 sm:py-20 bg-stone-100/70 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
              CURATED PET CARE HUBS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
              Explore Categories
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300">
              High-impact veterinary guides, training tutorials, and lifestyle breakdowns for your family.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {petCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.slug}`}
                className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all aspect-[4/5] flex flex-col justify-end p-5 text-white"
              >
                {/* Background Image */}
                <img
                  src={cat.coverImage}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10 space-y-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono font-semibold uppercase">
                    {cat.articleCount || 30}+ Guides
                  </span>
                  <h3 className="font-serif font-black text-xl text-white tracking-tight group-hover:text-[#F4A261] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed">
                    {cat.subTopics.slice(0, 3).join(' &bull; ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. EVERYTHING DOGS
         ======================================================== */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
              CANINE KNOWLEDGE &bull; PUPPIES &bull; TRAINING &bull; HEALTH
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white mt-1">
              Everything Dogs
            </h2>
          </div>
          <Link
            to="/dogs"
            className="text-xs font-mono uppercase tracking-wider text-[#D95D39] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Browse All Dog Guides</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dogArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
            >
              <Link to={`/${article.category}/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                    {article.subCategory || 'Dogs'}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                    <span>{article.readingTime}</span>
                    <span>&bull;</span>
                    <span>{article.createdAt}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors leading-snug line-clamp-2">
                    <Link to={`/${article.category}/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
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
      </section>

      {/* ========================================================
          7. INSIDE THE WORLD OF CATS
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-stone-100/60 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
                FELINE WELLNESS &bull; ENRICHMENT &bull; BEHAVIOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white mt-1">
                Inside the World of Cats
              </h2>
            </div>
            <Link
              to="/cats"
              className="text-xs font-mono uppercase tracking-wider text-[#D95D39] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Explore All Cat Guides</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
              >
                <Link to={`/${article.category}/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                      {article.subCategory || 'Cats'}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                      <span>{article.readingTime}</span>
                      <span>&bull;</span>
                      <span>{article.createdAt}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors leading-snug line-clamp-2">
                      <Link to={`/${article.category}/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
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
        </div>
      </section>

      {/* ========================================================
          8. WHY DOES MY PET DO THAT? (Behavior Hub)
         ======================================================== */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-stone-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D95D39]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D95D39]/30 text-[#E07A5F] text-xs font-mono font-bold uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>PET BEHAVIOR KNOWLEDGE HUB</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white">
                  Why Does My Pet Do That?
                </h2>
                <p className="text-sm text-stone-300 max-w-xl leading-relaxed">
                  Searchable behavioral insights decoded by certified canine behaviorists and feline researchers.
                </p>
              </div>

              <Link
                to="/behavior"
                className="px-5 py-2.5 rounded-full bg-[#D95D39] hover:bg-[#C24D2B] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
              >
                <span>Explore All Behaviors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {behaviorArticles.map((art) => (
                <div
                  key={art.id}
                  className="p-5 rounded-2xl bg-stone-850/80 border border-stone-750 hover:border-[#D95D39] transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                    <span className="text-[#D95D39] font-bold uppercase">
                      {art.subCategory || 'Behavior'}
                    </span>
                    <span>{art.readingTime}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-[#F4A261] transition-colors line-clamp-2">
                    <Link to={`/${art.category}/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                  <Link
                    to={`/${art.category}/${art.slug}`}
                    className="text-xs font-semibold text-[#D95D39] hover:underline inline-flex items-center gap-1 pt-1"
                  >
                    <span>Read Explanation</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-home-mid-banner" />
      </div>

      {/* ========================================================
          9. PET HEALTH & WELLNESS (With Required Disclaimer)
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-white dark:bg-stone-900 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
                PREVENTIVE CARE &bull; VET GUIDES &bull; SYMPTOMS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white mt-1">
                Pet Health &amp; Wellness
              </h2>
            </div>
            <Link
              to="/health"
              className="text-xs font-mono uppercase tracking-wider text-[#D95D39] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View Health Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Explicit Medical Educational Disclaimer Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-100 flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Veterinary Advisory Notice:</strong> Petzora publishes general educational content to help owners understand preventive care, early symptom recognition, and dental hygiene. Petzora is not a veterinary hospital. Always consult your personal licensed veterinarian for medical emergencies, diagnostic tests, or prescription medications.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthArticles.map((article) => (
              <article
                key={article.id}
                className="bg-[#FAF7F2] dark:bg-stone-800/60 rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-700/60 hover:shadow-md transition-all flex flex-col group p-4 space-y-3"
              >
                <Link to={`/${article.category}/${article.slug}`} className="block aspect-video rounded-xl overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] font-mono text-[#D95D39] font-bold uppercase">
                    {article.subCategory || 'Health'}
                  </span>
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors line-clamp-2">
                    <Link to={`/${article.category}/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-[#D95D39] flex items-center justify-between border-t border-stone-200 dark:border-stone-700">
                  <span>{article.readingTime}</span>
                  <span>Read Guide &rarr;</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          10. FEED THEM BETTER (Pet Nutrition)
         ======================================================== */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
              CANINE &amp; FELINE NUTRITION &bull; FOOD SAFETY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white mt-1">
              Feed Them Better
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
              Evidence-based feeding schedules, toxic pantry warnings, and healthy treat guides.
            </p>
          </div>
          <Link
            to="/nutrition"
            className="text-xs font-mono uppercase tracking-wider text-[#D95D39] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>All Nutrition Guides</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Visual Food Guide Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white">
              Visual Kitchen Food Safety Guide
            </h3>
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setFoodFilter('all')}
                className={`px-3 py-1 rounded-full font-semibold ${
                  foodFilter === 'all' ? 'bg-[#D95D39] text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                All Foods
              </button>
              <button
                onClick={() => setFoodFilter('safe')}
                className={`px-3 py-1 rounded-full font-semibold ${
                  foodFilter === 'safe' ? 'bg-emerald-600 text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                Safe Treats
              </button>
              <button
                onClick={() => setFoodFilter('toxic')}
                className={`px-3 py-1 rounded-full font-semibold ${
                  foodFilter === 'toxic' ? 'bg-red-600 text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                Toxic Hazards
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredFoodItems.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${
                  item.safety === 'safe'
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                    : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                }`}
              >
                <div>
                  <span className="text-2xl block mb-1">{item.icon}</span>
                  <p className="text-xs font-bold text-stone-900 dark:text-white line-clamp-1">
                    {item.name}
                  </p>
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase mt-1 ${
                      item.safety === 'safe'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                    }`}
                  >
                    {item.safety}
                  </span>
                </div>
                <p className="text-[10px] text-stone-600 dark:text-stone-400 line-clamp-2 leading-tight">
                  {item.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          11. PET STORIES YOU'LL LOVE
         ======================================================== */}
      <section id="pet-stories" className="py-14 sm:py-20 bg-stone-100/70 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
                HEARTWARMING ADOPTIONS &bull; RESCUE JOURNEYS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white mt-1">
                Pet Stories You&apos;ll Love
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
                Emotional memoirs, shelter transformations, and the unbreakable human-animal bond.
              </p>
            </div>
            <Link
              to="/stories"
              className="text-xs font-mono uppercase tracking-wider text-[#D95D39] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Read All Stories</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {petStories.map((story) => (
              <article
                key={story.id}
                className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all grid grid-cols-1 sm:grid-cols-12 group"
              >
                <Link to={`/${story.category}/${story.slug}`} className="sm:col-span-5 relative aspect-square sm:aspect-auto overflow-hidden">
                  <img
                    src={story.featuredImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#D95D39] uppercase font-bold">
                      {story.subCategory}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors line-clamp-2">
                      <Link to={`/${story.category}/${story.slug}`}>
                        {story.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                      {story.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                    <span>{story.readingTime} read</span>
                    <span className="text-[#D95D39] font-semibold">Read story &rarr;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          12. PETZORA PICKS (Product Reviews)
         ======================================================== */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
              INDEPENDENT BUYING ROUNDUPS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white mt-1">
              Petzora Picks
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
              Beds, fountains, leashes, cameras, and gear vetted for animal safety and ergonomic longevity.
            </p>
          </div>
          <Link
            to="/reviews"
            className="text-xs font-mono uppercase tracking-wider text-[#D95D39] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Browse All Picks</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {petzoraPicks.slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between p-6 space-y-4"
            >
              <div className="space-y-3">
                <div className="aspect-video rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={prod.featuredImage}
                    alt={prod.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#D95D39] font-bold uppercase">{prod.categoryLabel}</span>
                  <span className="text-stone-500 font-bold">{prod.priceRange}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white leading-snug">
                  {prod.title}
                </h3>
                <div className="p-2 rounded-xl bg-orange-50/60 dark:bg-orange-950/30 text-[11px] text-stone-700 dark:text-stone-300">
                  <strong className="text-[#D95D39]">Best For:</strong> {prod.bestFor}
                </div>
                <p className="text-xs text-stone-500 line-clamp-2">
                  {prod.shortDescription}
                </p>
              </div>

              <Link
                to="/reviews"
                className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#D95D39] hover:text-white text-stone-800 dark:text-stone-200 text-xs font-semibold uppercase tracking-wider text-center transition-colors"
              >
                View Full Review &amp; Pros &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          13. POPULAR RIGHT NOW (Numbered 01 to 05)
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-stone-100/60 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
              READERSHIP FAVORITES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white mt-1">
              Popular Right Now
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {popularArticles.map((item) => (
              <Link
                key={item.num}
                to={`/${item.category}/${item.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-[#D95D39] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <span className="text-3xl font-serif font-black text-[#D95D39]/40 group-hover:text-[#D95D39] transition-colors block">
                    {item.num}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors line-clamp-3 leading-snug">
                    {item.title}
                  </h3>
                </div>
                <div className="text-[10px] font-mono text-stone-400 flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span className="capitalize">{item.category}</span>
                  <span>{item.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          14. NEWSLETTER ("Join the Petzora Pack")
         ======================================================== */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 dark:from-stone-900 dark:to-stone-950 border border-stone-200 dark:border-stone-800 shadow-sm text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D95D39]/10 text-[#D95D39] text-xs font-mono font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>WEEKLY DIGEST</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Join the Petzora Pack
          </h2>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            Get useful pet care tips, adorable stories and new guides delivered to your inbox.
          </p>

          {newsletterSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center justify-center gap-2 text-xs">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You&apos;re subscribed! Welcome to the Petzora family.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="pt-2 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                className="flex-1 px-4 py-3 rounded-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-[#D95D39]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#D95D39] hover:bg-[#C24D2B] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ========================================================
          15. ABOUT PETZORA EDITORIAL STATEMENT
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-stone-900 text-stone-100 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
                OUR EDITORIAL MISSION
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                About Petzora
              </h2>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                Petzora (<strong>petzora.shop</strong>) is a modern pet media publication founded on a simple truth: our dogs and cats are family. In an internet crowded with clickbait myths and harsh outdated training advice, Petzora provides a calm, veterinary-reviewed sanctuary.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Veterinary Fact-Checking</h3>
                    <p className="text-xs text-stone-400">All health, toxicity, and nutrition articles undergo clinical review.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Fear-Free Positive Training</h3>
                    <p className="text-xs text-stone-400">We champion gentle, science-proven communication that builds lifelong trust.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Independent Product Guidance</h3>
                    <p className="text-xs text-stone-400">We evaluate gear for safety and durability with zero sponsored ratings.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <p className="text-3xl font-serif font-black text-[#D95D39]">45k+</p>
                <p className="text-xs font-bold text-white">Pet Parents</p>
                <p className="text-[11px] text-stone-400">Read Petzora weekly</p>
              </div>
              <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <p className="text-3xl font-serif font-black text-emerald-400">100%</p>
                <p className="text-xs font-bold text-white">Evidence-Based</p>
                <p className="text-[11px] text-stone-400">Zero myth bias</p>
              </div>
              <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <p className="text-3xl font-serif font-black text-amber-400">8+</p>
                <p className="text-xs font-bold text-white">Pet Care Hubs</p>
                <p className="text-[11px] text-stone-400">Dogs, Cats, Behavior</p>
              </div>
              <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <p className="text-3xl font-serif font-black text-sky-400">Fear-Free</p>
                <p className="text-xs font-bold text-white">Gentle Methods</p>
                <p className="text-[11px] text-stone-400">Humane animal welfare</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final Ad Slot before Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-home-bottom-banner" />
      </div>

    </div>
  );
};
