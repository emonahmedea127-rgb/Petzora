import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ChevronRight,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Calendar,
  Bookmark,
  Share2,
  Copy,
  Check,
  BookOpen,
  FileText,
  Loader2,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { TableOfContents } from '../components/TableOfContents';
import { AuthorCard } from '../components/AuthorCard';
import { SafeImage } from '../components/SafeImage';
import { useSavedArticles } from '../context/SavedArticlesContext';
import { getArticleBySlug, getRelatedArticles } from '../lib/supabase';
import { allArticles } from '../data/mockData';
import { Article } from '../types';

export const ArticleDetailPage: React.FC = () => {
  const { slug, category } = useParams<{ slug: string; category?: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { toggleSaveArticle, isArticleSaved } = useSavedArticles();

  // Scroll reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch article from Supabase dynamically by slug
  useEffect(() => {
    let mounted = true;

    async function fetchArticle() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setNotFound(false);

      const art = await getArticleBySlug(slug, category);
      if (!mounted) return;

      if (!art) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setArticle(art);
      setLoading(false);

      // Fetch dynamic related articles from same category/tags
      const related = await getRelatedArticles(art.slug, art.category, art.tags, 3);
      if (mounted) {
        setRelatedArticles(related);
      }
    }

    fetchArticle();
    return () => {
      mounted = false;
    };
  }, [slug, category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] dark:bg-stone-950 flex flex-col items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-[#D95D39] animate-spin mb-3" />
        <p className="text-xs font-mono text-stone-500">Loading guide from Petzora archive...</p>
      </div>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/404" replace />;
  }

  const currentUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://petzora.shop/${article.category}/${article.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(article.featuredImage)}&description=${encodeURIComponent(article.title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} - ${currentUrl}`)}`,
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    {
      name: article.category.charAt(0).toUpperCase() + article.category.slice(1).replace('-', ' '),
      url: `/${article.category}`,
    },
    { name: article.title, url: `/${article.category}/${article.slug}` },
  ];

  const isSaved = isArticleSaved(article.slug);

  // Safeguard: Ensure article body content is never truncated (< 2500 chars), empty or an unrendered comment
  const fallbackArticle = allArticles.find((a) => a.slug === article.slug);
  const isInvalidOrTooShort =
    !article.content ||
    article.content.trim().length < 2500 ||
    article.content.trim().startsWith('<!--') ||
    article.content.includes('supabase-seed-articles.sql');

  const resolvedBodyContent = !isInvalidOrTooShort
    ? article.content
    : fallbackArticle?.content || article.content || '';

  return (
    <div className="bg-[#FAF7F2] dark:bg-stone-950 min-h-screen text-stone-900 dark:text-stone-100 transition-colors pb-16">
      {/* 1. TOP READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-stone-200/50 dark:bg-stone-800">
        <div
          className="h-full bg-[#D95D39] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <SEO
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.excerpt}
        ogImage={article.featuredImage}
        ogType="article"
        publishedTime={article.publishedAt || article.createdAt}
        modifiedTime={article.updatedAt}
        authorName={article.author.name}
        category={article.category}
        breadcrumbs={breadcrumbs}
        faqs={article.faqList}
        canonicalUrl={article.canonicalUrl || `https://petzora.shop/${article.category}/${article.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-6 flex-wrap"
        >
          <Link to="/" className="hover:text-stone-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to={`/${article.category}`}
            className="capitalize hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            {article.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-stone-800 dark:text-stone-200 font-medium truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center space-y-6 mb-10">
          <div className="inline-flex items-center gap-2">
            <Link
              to={`/${article.category}`}
              className="px-4 py-1.5 rounded-full bg-[#D95D39] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-sm hover:bg-[#C24D2B] transition-colors"
            >
              {article.subCategory || article.category}
            </Link>
            <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-stone-900 dark:text-white leading-[1.12]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed italic max-w-2xl mx-auto">
            {article.excerpt}
          </p>

          {/* Author and Date Meta Bar */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to={`/author/${article.author.slug}`}>
                <SafeImage
                  src={article.author.avatar || '/images/author-clara.webp'}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#D95D39]/30"
                  priority={true}
                  fallbackSrc="/images/author-clara.webp"
                />
              </Link>
              <div className="text-left">
                <Link
                  to={`/author/${article.author.slug}`}
                  className="font-serif font-bold text-stone-900 dark:text-white hover:text-[#D95D39] transition-colors text-sm"
                >
                  {article.author.name}
                </Link>
                <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mt-0.5">
                  <span>{article.author.role}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Bookmark & Share Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleSaveArticle(article)}
                className={`p-2.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-mono ${
                  isSaved
                    ? 'border-[#D95D39] text-[#D95D39] bg-orange-50 dark:bg-orange-950/40'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                }`}
                title={isSaved ? 'Remove from Saved Articles' : 'Save for Offline Reading'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="p-2.5 rounded-full border border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-600 dark:text-stone-400 transition flex items-center gap-1.5 text-xs font-mono"
                title="Copy Link to Article"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Hero Image */}
        <figure className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl mb-12 border border-stone-200/80 dark:border-stone-800">
          <SafeImage
            src={article.featuredImage}
            alt={article.imageAlt || article.title}
            className="w-full h-[320px] sm:h-[480px] lg:h-[540px] object-cover"
            priority={true}
            fallbackSrc="/images/pet-fallback.webp"
          />
          {article.imageCaption && (
            <figcaption className="p-3.5 sm:px-6 bg-white dark:bg-stone-900 text-xs text-stone-500 dark:text-stone-400 text-center italic border-t border-stone-200 dark:border-stone-800">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Main Content Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Main Article Body (8 cols) */}
          <main className="lg:col-span-8 space-y-8">
            {/* Rich HTML Content from CMS */}
            {resolvedBodyContent ? (
              <div
                className="article-content max-w-none text-stone-800 dark:text-stone-200 font-sans text-base sm:text-lg leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: resolvedBodyContent }}
              />
            ) : null}

            {/* Backward-compatible sections renderer */}
            {article.sections && article.sections.length > 0 && (
              <div className="space-y-6">
                {article.sections.map((section, idx) => {
                  if (section.type === 'heading') {
                    return (
                      <h2
                        key={idx}
                        className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-stone-900 dark:text-white pt-6 border-t border-stone-200/80 dark:border-stone-800"
                      >
                        {section.headingText}
                      </h2>
                    );
                  }
                  if (section.type === 'paragraph') {
                    return (
                      <p key={idx} className="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
                        {section.content}
                      </p>
                    );
                  }
                  if (section.type === 'tipBox') {
                    return (
                      <div key={idx} className="my-6 p-5 sm:p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-amber-950 dark:text-amber-100 space-y-2">
                        <div className="flex items-center gap-2 text-[#D95D39] font-bold text-sm">
                          <Lightbulb className="w-5 h-5 text-amber-600" />
                          <span>{section.tipTitle || 'Pro Pet Tip'}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{section.tipText}</p>
                      </div>
                    );
                  }
                  if (section.type === 'warningBox') {
                    return (
                      <div key={idx} className="my-6 p-5 sm:p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-950 dark:text-red-100 space-y-2">
                        <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-bold text-sm">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <span>{section.warningTitle || 'Veterinary Health Alert'}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-red-900 dark:text-red-200">{section.warningText}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}

            {/* Tags strip */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase text-stone-400">Filed under:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Card at End of Article */}
            <div className="pt-6">
              <AuthorCard author={article.author} />
            </div>
          </main>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Table of contents */}
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <div className="sticky top-20 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-3">
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#D95D39]" />
                  <span>In This Guide</span>
                </h3>
                <TableOfContents items={article.tableOfContents} />
              </div>
            )}

            {/* Veterinary Review Badge */}
            <div className="p-6 rounded-3xl bg-amber-50/60 dark:bg-stone-900 border border-amber-900/10 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#D95D39]">
                <ShieldCheck className="w-4 h-4" />
                <span>Petzora Integrity Guarantee</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                This article was drafted and reviewed to provide safe, fact-based companion animal advice. Always consult your primary veterinarian for medical emergencies.
              </p>
            </div>
          </aside>
        </div>

        {/* Dynamic Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800">
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
                MORE IN {article.category.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-stone-900 dark:text-white mt-1">
                Related Veterinary Guides
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
                >
                  <Link to={`/${rel.category}/${rel.slug}`} className="block relative aspect-video overflow-hidden">
                    <SafeImage
                      src={rel.featuredImage}
                      alt={rel.imageAlt || rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      fallbackSrc="/images/pet-fallback.webp"
                    />
                  </Link>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#D95D39] font-bold">
                        {rel.category}
                      </span>
                      <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors mt-1 leading-snug">
                        <Link to={`/${rel.category}/${rel.slug}`}>{rel.title}</Link>
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">{rel.excerpt}</p>
                    </div>
                    <Link
                      to={`/${rel.category}/${rel.slug}`}
                      className="text-xs font-semibold text-[#D95D39] hover:underline flex items-center gap-1"
                    >
                      <span>Read guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
