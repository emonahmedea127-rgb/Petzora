import React, { useState, useEffect } from 'react';
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
  Bookmark,
  Check,
  Loader2,
} from 'lucide-react';
import { petCategories, foodGuideItems, editorialTeam } from '../data/mockData';
import { SEO } from '../components/SEO';
import { SafeImage } from '../components/SafeImage';
import { useSavedArticles } from '../context/SavedArticlesContext';
import { getPublishedArticles } from '../lib/supabase';
import { Article } from '../types';

export const HomePage: React.FC = () => {
  const { toggleSaveArticle, isArticleSaved } = useSavedArticles();
  const [foodFilter, setFoodFilter] = useState<'all' | 'safe' | 'toxic'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Dynamic Supabase articles state
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const data = await getPublishedArticles();
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

  // Filtered dynamic subsets from Supabase
  const heroArticle = articles.find((a) => a.isFeatured) || articles[0];
  const trendingArticles = articles.slice(0, 5);
  const editorsPickLead = articles.find((a) => a.isEditorPick) || articles[0];
  const editorsPickSubs = articles.filter((a) => a.id !== editorsPickLead?.id).slice(0, 4);

  const dogArticles = articles.filter(
    (a) => a.category === 'dogs' || a.categorySlug === 'dogs' || a.tags?.includes('dog')
  ).slice(0, 6);

  const catArticles = articles.filter(
    (a) => a.category === 'cats' || a.categorySlug === 'cats' || a.tags?.includes('cat')
  ).slice(0, 6);

  const behaviorArticles = articles.filter(
    (a) => a.category === 'behavior' || a.categorySlug === 'behavior' || a.title.toLowerCase().startsWith('why')
  ).slice(0, 6);

  const healthArticles = articles.filter(
    (a) => a.category === 'health' || a.category === 'care' || a.category === 'pet-care'
  ).slice(0, 4);

  const petStories = articles.filter(
    (a) => a.category === 'stories' || a.categorySlug === 'stories'
  ).slice(0, 4);

  const popularArticles = articles.filter((a) => a.isPopular).slice(0, 5);

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
        title="PETZORA – Everything Your Pet Deserves | Magazine, Care & Guides"
        description="Care better. Understand more. Love deeper. Veterinary-reviewed guides, puppy training, cat health, nutrition advice, and pet product reviews on petzora.shop."
        canonicalUrl="https://petzora.shop"
        ogType="website"
      />

      {/* ========================================================
          1. EDITORIAL PET HERO
         ======================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-stone-200/80 dark:border-stone-800">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-100/60 via-orange-100/40 to-transparent dark:from-stone-900/60 dark:to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/70 border border-orange-200 dark:border-orange-900/60 text-[#D95D39] dark:text-[#E07A5F] text-xs font-mono font-bold tracking-wider uppercase">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>PET MEDIA &bull; LIFESTYLE &bull; KNOWLEDGE HUB</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-stone-900 dark:text-white leading-[1.08]">
                Everything Your Pet Deserves.
              </h1>

              <p className="text-lg sm:text-xl font-serif italic text-[#D95D39] dark:text-[#E07A5F] font-medium">
                Care better. Understand more. Love deeper.
              </p>

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
                  onClick={() => handleHeroScrollTo('food-guide-section')}
                  className="px-7 py-3.5 rounded-full bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Food Safety Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Topic Links */}
              <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono font-semibold">
                <span className="text-stone-400 uppercase tracking-wider text-[11px] mr-1">Quick Dive:</span>
                {['Dogs', 'Cats', 'Training', 'Nutrition', 'Health'].map((name) => (
                  <Link
                    key={name}
                    to={`/${name.toLowerCase()}`}
                    className="px-3 py-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#D95D39] hover:text-[#D95D39] transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Hero Image Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10 group">
                <SafeImage
                  src={heroArticle?.featuredImage || '/images/hero-dog-cat.webp'}
                  alt="Golden retriever and domestic tabby cat sleeping peacefully side by side"
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-102 transition-transform duration-700"
                  priority={true}
                  fallbackSrc="/images/pet-fallback.webp"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest font-semibold w-max mb-2">
                    {heroArticle ? 'FEATURED PUBLICATION' : 'EDITORIAL MISSION'}
                  </span>
                  <p className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                    {heroArticle ? (
                      <Link to={`/${heroArticle.category}/${heroArticle.slug}`} className="hover:underline">
                        {heroArticle.title}
                      </Link>
                    ) : (
                      'Helping you raise thriving, well-understood companions from kittenhood & puppyhood to golden years.'
                    )}
                  </p>
                  <p className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                    <span>Evidence-based veterinary insights</span>
                    <span>&bull;</span>
                    <span>petzora.shop</span>
                  </p>
                </div>
              </div>

              {/* Floating Trending Card inside Hero */}
              {heroArticle && (
                <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 max-w-xs p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-2xl">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold text-[#D95D39] mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>FEATURED GUIDE</span>
                  </div>
                  <Link
                    to={`/${heroArticle.category}/${heroArticle.slug}`}
                    className="text-xs sm:text-sm font-serif font-bold text-stone-900 dark:text-white hover:text-[#D95D39] transition-colors line-clamp-2"
                  >
                    {heroArticle.title}
                  </Link>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 mt-2 pt-1 border-t border-stone-100 dark:border-stone-800">
                    <span>{heroArticle.readingTime}</span>
                    <span className="text-[#D95D39] font-semibold">Read guide &rarr;</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TRENDING NOW STRIP (Rendered when articles exist)
         ======================================================== */}
      {trendingArticles.length > 0 && (
        <section className="bg-white dark:bg-stone-900 border-b border-stone-200/80 dark:border-stone-800 py-3.5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
            <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D95D39] text-white text-[11px] font-mono font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>TRENDING NOW</span>
            </div>

            <div className="flex-1 overflow-x-auto scrollbar-none flex items-center gap-6 text-xs font-medium whitespace-nowrap text-stone-700 dark:text-stone-300">
              {trendingArticles.map((art) => (
                <Link
                  key={art.id}
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
      )}

      {/* ========================================================
          3. EDITOR'S PICKS (Rendered when articles exist)
         ======================================================== */}
      {editorsPickLead && (
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
              to="/guides"
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
                <SafeImage
                  src={editorsPickLead.featuredImage}
                  alt={editorsPickLead.imageAlt || editorsPickLead.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  fallbackSrc="/images/pet-fallback.webp"
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
                    {editorsPickLead.category}
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

            {/* Smaller Editorial Cards */}
            <div className="lg:col-span-5 space-y-4">
              {editorsPickSubs.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-center text-xs text-stone-500">
                  More editor picks will appear as new guides are published.
                </div>
              ) : (
                editorsPickSubs.map((subArt) => (
                  <article
                    key={subArt.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-[#D95D39]/40 hover:shadow-md transition-all flex gap-4 items-center group"
                  >
                    <Link
                      to={`/${subArt.category}/${subArt.slug}`}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0"
                    >
                      <SafeImage
                        src={subArt.featuredImage}
                        alt={subArt.imageAlt || subArt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        fallbackSrc="/images/pet-fallback.webp"
                      />
                    </Link>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500">
                        <span className="font-bold text-[#D95D39] uppercase">
                          {subArt.category}
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
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          4. EXPLORE CATEGORIES
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
                <SafeImage
                  src={cat.coverImage || '/images/hero-dog-cat.webp'}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                  fallbackSrc="/images/pet-fallback.webp"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
                <div className="relative z-10 space-y-1.5">
                  <h3 className="font-serif font-black text-xl text-white tracking-tight group-hover:text-[#F4A261] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. EVERYTHING DOGS (Rendered if dog articles exist)
         ======================================================== */}
      {dogArticles.length > 0 && (
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
                  <SafeImage
                    src={article.featuredImage}
                    alt={article.imageAlt || article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    fallbackSrc="/images/pet-fallback.webp"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                      Dogs
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                      <span>{article.readingTime}</span>
                      <span>&bull;</span>
                      <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
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
      )}

      {/* ========================================================
          6. INSIDE THE WORLD OF CATS (Rendered if cat articles exist)
         ======================================================== */}
      {catArticles.length > 0 && (
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
                    <SafeImage
                      src={article.featuredImage}
                      alt={article.imageAlt || article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      fallbackSrc="/images/pet-fallback.webp"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                        Cats
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                        <span>{article.readingTime}</span>
                        <span>&bull;</span>
                        <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
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
      )}

      {/* ========================================================
          7. BEHAVIOR & WELLNESS (Rendered if behavior articles exist)
         ======================================================== */}
      {behaviorArticles.length > 0 && (
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-stone-900 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D95D39]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E07A5F] font-bold">
                    PET PSYCHOLOGY &bull; HABITS DECODED
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white mt-1">
                    Why Does My Pet Do That?
                  </h2>
                </div>
                <Link
                  to="/behavior"
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition border border-white/20 w-max"
                >
                  Explore Behavior Hub
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {behaviorArticles.slice(0, 3).map((art) => (
                  <Link
                    key={art.id}
                    to={`/${art.category}/${art.slug}`}
                    className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-orange-500/50 transition group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold">
                        {art.category}
                      </span>
                      <h3 className="font-serif font-bold text-base text-white group-hover:text-orange-400 transition-colors mt-1.5 leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-2 line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-orange-400 mt-4 flex items-center gap-1">
                      Read answer &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          8. FOOD SAFETY CHECKER (Evidence-Based Interactive Tool)
         ======================================================== */}
      <section id="food-guide-section" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase">
            <Apple className="w-3.5 h-3.5" />
            <span>CLINICAL FOOD SAFETY LIST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Can My Dog or Cat Eat This?
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300">
            A quick veterinary reference guide on safe human foods and toxic pet hazards.
          </p>

          <div className="flex items-center justify-center gap-2 pt-4">
            {(['all', 'safe', 'toxic'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setFoodFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                  foodFilter === filter
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-stone-400'
                }`}
              >
                {filter === 'all' ? 'All Foods' : filter === 'safe' ? 'Safe Foods' : 'Toxic Foods'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFoodItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                item.safety === 'safe'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/50'
                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className="text-2xl shrink-0 p-2 rounded-xl bg-white dark:bg-stone-900 shadow-xs">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                      {item.name}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                        item.safety === 'safe'
                          ? 'bg-emerald-200/70 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200'
                          : 'bg-rose-200/70 text-rose-900 dark:bg-rose-900 dark:text-rose-200'
                      }`}
                    >
                      {item.safety}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {item.notes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          9. VETERINARY EDITORIAL BOARD
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-stone-100/70 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
              TRUST &bull; INTEGRITY &bull; EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
              Reviewed by Veterinary Professionals
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300">
              Every guide on Petzora is created with input from licensed veterinarians, certified animal behaviorists, and experienced rescue caregivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {editorialTeam.map((author) => (
              <div
                key={author.id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 flex flex-col items-center text-center space-y-3.5 shadow-sm"
              >
                <SafeImage
                  src={author.avatar || '/images/author-clara.webp'}
                  alt={author.name}
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-orange-500/30"
                  loading="lazy"
                  fallbackSrc="/images/author-clara.webp"
                />
                <div>
                  <h3 className="font-serif font-bold text-stone-900 dark:text-white text-base">
                    {author.name}
                  </h3>
                  <p className="text-xs font-mono text-[#D95D39] font-semibold mt-0.5">
                    {author.role}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    {author.credentials}
                  </p>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {author.bio}
                </p>
                <Link
                  to={`/author/${author.slug}`}
                  className="text-xs font-semibold text-[#D95D39] hover:underline pt-1 inline-flex items-center gap-1"
                >
                  <span>View author bio</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          10. NEWSLETTER SIGNUP
         ======================================================== */}
      <section className="py-14 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#D95D39] text-white shadow-xl text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight">
              Join 45,000+ Caring Pet Parents
            </h2>
            <p className="text-sm text-orange-100 leading-relaxed">
              Get weekly veterinary-reviewed care checklists, training breakdowns, safe food alerts, and wholesome adoption stories directly to your inbox.
            </p>
          </div>

          {newsletterSuccess ? (
            <div className="p-4 rounded-2xl bg-white/20 text-sm font-semibold max-w-md mx-auto">
              ✓ Thank you! You&apos;re now subscribed to the Petzora weekly dispatch.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full bg-white text-stone-900 placeholder-stone-500 text-sm outline-none shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider transition shadow-sm"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-orange-200">
            Zero spam. Unsubscribe anytime. View our <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </div>
  );
};
