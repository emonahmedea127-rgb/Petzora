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

const SITE_URL = 'https://www.petzora.shop';

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

  const canonicalUrl = `${SITE_URL}/${article.category}/${article.slug}`;
  const currentUrl = canonicalUrl;

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
        tags={article.tags}
        breadcrumbs={breadcrumbs}
        faqs={article.faqList}
        canonicalUrl={article.canonicalUrl || canonicalUrl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
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

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SafeImage src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="text-left">
                <Link to={`/author/${article.author.slug || ''}`} className="font-semibold hover:text-[#D95D39] transition-colors">
                  {article.author.name}
                </Link>
                <div className="text-xs text-stone-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.publishedAt || article.createdAt}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveArticle(article.slug)}
                className="p-2 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-white dark:hover:bg-stone-900"
                aria-label={isSaved ? 'Remove saved article' : 'Save article'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-white dark:hover:bg-stone-900"
                aria-label="Copy article link"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[240px_minmax(0,1fr)] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={resolvedBodyContent} />
            </div>
          </aside>

          <article className="min-w-0">
            <SafeImage
              src={article.featuredImage}
              alt={article.featuredImageAlt || article.title}
              className="w-full rounded-3xl aspect-[16/9] object-cover shadow-sm mb-10"
            />

            <div
              className="prose prose-stone dark:prose-invert max-w-none prose-headings:font-serif prose-headings:scroll-mt-28 prose-a:text-[#D95D39] prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: resolvedBodyContent }}
            />

            {article.faqList?.length ? (
              <section className="mt-14 pt-10 border-t border-stone-200 dark:border-stone-800">
                <h2 className="text-3xl font-serif font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {article.faqList.map((faq, index) => {
                    const open = openFaqIndex === index;
                    return (
                      <div key={faq.question} className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(open ? null : index)}
                          className="w-full flex items-center justify-between gap-4 text-left p-5 font-semibold"
                        >
                          <span>{faq.question}</span>
                          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        {open && <div className="px-5 pb-5 text-stone-600 dark:text-stone-300">{faq.answer}</div>}
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3">
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 dark:border-stone-800">
                <Share2 className="w-4 h-4" /> Facebook
              </a>
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 dark:border-stone-800">
                <Share2 className="w-4 h-4" /> WhatsApp
              </a>
              <a href={shareLinks.pinterest} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 dark:border-stone-800">
                <Share2 className="w-4 h-4" /> Pinterest
              </a>
            </div>

            <div className="mt-12">
              <AuthorCard author={article.author} />
            </div>

            {relatedArticles.length > 0 && (
              <section className="mt-14 pt-10 border-t border-stone-200 dark:border-stone-800">
                <h2 className="text-3xl font-serif font-bold mb-6">Related guides</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((related) => (
                    <Link key={related.slug} to={`/${related.category}/${related.slug}`} className="group block">
                      <SafeImage src={related.featuredImage} alt={related.featuredImageAlt || related.title} className="w-full aspect-[4/3] object-cover rounded-2xl mb-3" />
                      <h3 className="font-serif text-xl font-bold group-hover:text-[#D95D39] transition-colors">{related.title}</h3>
                      <p className="text-sm text-stone-500 mt-1 line-clamp-2">{related.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};
