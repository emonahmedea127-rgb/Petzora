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
} from 'lucide-react';
import { allArticles } from '../data/mockData';
import { SEO } from '../components/SEO';
import { TableOfContents } from '../components/TableOfContents';
import { AuthorCard } from '../components/AuthorCard';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { SafeImage } from '../components/SafeImage';
import { useSavedArticles } from '../context/SavedArticlesContext';

export const ArticleDetailPage: React.FC = () => {
  const { slug, category } = useParams<{ slug: string; category?: string }>();
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

  // Match by slug (or category + slug)
  const articleIndex = allArticles.findIndex(
    (a) => a.slug === slug || (category && a.slug === slug && a.category === category)
  );

  if (articleIndex === -1) {
    return <Navigate to="/404" replace />;
  }

  const article = allArticles[articleIndex];
  const prevArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : null;
  const nextArticle = articleIndex < allArticles.length - 1 ? allArticles[articleIndex + 1] : null;

  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.id !== article.id &&
        (a.category === article.category || article.relatedSlugs?.includes(a.slug))
    )
    .slice(0, 3);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://petzora.shop/${article.category}/${article.slug}`;

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
        publishedTime={article.createdAt}
        modifiedTime={article.updatedAt}
        authorName={article.author.name}
        category={article.category}
        breadcrumbs={breadcrumbs}
        faqs={article.faqList}
        canonicalUrl={`https://petzora.shop/${article.category}/${article.slug}`}
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
        <header className="max-w-4xl mx-auto space-y-5 text-center sm:text-left mb-10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <Link
              to={`/${article.category}`}
              className="px-3.5 py-1 rounded-full bg-orange-100/80 dark:bg-orange-950/70 text-[#D95D39] dark:text-[#E07A5F] text-xs font-mono uppercase tracking-wider font-bold"
            >
              {article.subCategory || article.category}
            </Link>
            <span className="text-xs text-stone-400">&bull;</span>
            <span className="flex items-center gap-1 text-xs text-stone-500 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
            <span className="text-xs text-stone-400">&bull;</span>
            <span className="flex items-center gap-1 text-xs text-stone-500 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              Updated {article.updatedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-stone-900 dark:text-white leading-[1.12]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            {article.excerpt}
          </p>

          {/* Author Attribution & Top Controls */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to={`/author/${article.author.slug}`}>
                <SafeImage
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#D95D39]/30"
                  priority={true}
                  fallbackSrc="/images/author-clara.webp"
                />
              </Link>
              <div>
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/author/${article.author.slug}`}
                    className="text-sm font-bold text-stone-900 dark:text-white hover:text-[#D95D39] transition-colors"
                  >
                    {article.author.name}
                  </Link>
                  <span title="Verified Veterinary / Trainer Contributor">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </span>
                </div>
                <p className="text-xs text-stone-500">{article.author.role}</p>
              </div>
            </div>

            {/* Save Article CTA */}
            <button
              onClick={() => toggleSaveArticle(article)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                isSaved
                  ? 'bg-orange-50 dark:bg-orange-950/40 border-[#D95D39] text-[#D95D39]'
                  : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-[#D95D39]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved to List' : 'Save Guide'}</span>
            </button>
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

        {/* Top In-Article Ad Slot */}
        <div className="max-w-4xl mx-auto my-6">
          <AdSenseSlot slotType="in-article" slotId="petzora-article-top" />
        </div>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
          
          {/* Left Column: Sticky Share Controls & Table of Contents */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Sticky Share & Engagement Bar */}
              <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D95D39] font-bold block">
                  SHARE &amp; ENGAGE
                </span>
                
                <div className="flex items-center gap-2">
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-blue-600 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    title="Share on Facebook"
                  >
                    <span>Facebook</span>
                  </a>
                  <a
                    href={shareLinks.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-red-600 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    title="Pin on Pinterest"
                  >
                    <span>Pinterest</span>
                  </a>
                  <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-600 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    title="Share on WhatsApp"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="w-full py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:border-[#D95D39] transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Article Link'}</span>
                  </button>
                </div>
              </div>

              {/* Table of Contents */}
              {article.tableOfContents && article.tableOfContents.length > 0 && (
                <TableOfContents items={article.tableOfContents} />
              )}

              {/* Sidebar Ad Placement */}
              <AdSenseSlot slotType="sidebar-rect" slotId="petzora-article-sidebar" />
            </div>
          </aside>

          {/* Right Column: Main Reading Body */}
          <main className="lg:col-span-8 order-1 lg:order-2 space-y-6 text-stone-800 dark:text-stone-200 leading-relaxed font-sans text-base sm:text-lg max-w-prose">
            {article.sections.map((section, idx) => {
              if (section.type === 'heading') {
                const headingId = section.headingText
                  ? section.headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                  : `heading-${idx}`;
                return (
                  <h2
                    key={idx}
                    id={headingId}
                    className="pt-6 text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white tracking-tight scroll-mt-24 border-t border-stone-200 dark:border-stone-800"
                  >
                    {section.headingText}
                  </h2>
                );
              }

              if (section.type === 'subheading') {
                return (
                  <h3
                    key={idx}
                    className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white tracking-tight pt-2"
                  >
                    {section.headingText}
                  </h3>
                );
              }

              if (section.type === 'paragraph') {
                return (
                  <p key={idx} className="leading-relaxed">
                    {section.content}
                  </p>
                );
              }

              if (section.type === 'tipBox') {
                return (
                  <div
                    key={idx}
                    className="my-6 p-5 sm:p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-100 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                      <span>{section.tipTitle || 'Pet Care Pro Tip'}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                      {section.tipText}
                    </p>
                  </div>
                );
              }

              if (section.type === 'warningBox') {
                return (
                  <div
                    key={idx}
                    className="my-6 p-5 sm:p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-950 dark:text-red-100 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span>{section.warningTitle || 'Veterinary Health Alert'}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-red-900 dark:text-red-200">
                      {section.warningText}
                    </p>
                  </div>
                );
              }

              if (section.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    className="my-6 pl-5 border-l-4 border-[#D95D39] italic text-stone-700 dark:text-stone-300 font-serif text-lg sm:text-xl"
                  >
                    <p>&ldquo;{section.content}&rdquo;</p>
                    {section.quoteAuthor && (
                      <cite className="block text-xs font-mono uppercase tracking-wider text-[#D95D39] mt-2 not-italic font-bold">
                        &mdash; {section.quoteAuthor}
                      </cite>
                    )}
                  </blockquote>
                );
              }

              if (section.type === 'list' && section.listItems) {
                return (
                  <ul key={idx} className="my-4 space-y-2.5">
                    {section.listItems.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-base">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (section.type === 'image' && section.imageUrl) {
                return (
                  <figure key={idx} className="my-8 rounded-2xl overflow-hidden shadow-md">
                    <SafeImage
                      src={section.imageUrl}
                      alt={section.imageCaption || 'Pet guide illustration'}
                      className="w-full h-auto object-cover max-h-[420px]"
                      loading="lazy"
                      fallbackSrc="/images/pet-fallback.webp"
                    />
                    {section.imageCaption && (
                      <figcaption className="p-3 bg-stone-100 dark:bg-stone-900 text-xs text-stone-500 text-center italic">
                        {section.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              return null;
            })}

            {/* Mid-Article Content Ad Slot */}
            <AdSenseSlot slotType="in-article" slotId="petzora-article-mid-body" />

            {/* Sources & Scientific References */}
            {article.sources && article.sources.length > 0 && (
              <section className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-2 text-xs text-stone-500">
                <span className="font-mono uppercase tracking-wider font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#D95D39]" />
                  <span>Sources &amp; Veterinary References</span>
                </span>
                <ul className="list-disc pl-4 space-y-1">
                  {article.sources.map((src, sIdx) => (
                    <li key={sIdx}>{src}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQ Accordion Section */}
            {article.faqList && article.faqList.length > 0 && (
              <section className="pt-10 border-t border-stone-200 dark:border-stone-800 space-y-4">
                <h3 className="text-2xl font-serif font-black text-stone-900 dark:text-white">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {article.faqList.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-white dark:bg-stone-900/60"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                        className="w-full p-4 sm:p-5 text-left font-serif font-bold text-base sm:text-lg flex items-center justify-between text-stone-900 dark:text-white hover:text-[#D95D39] transition-colors"
                      >
                        <span>{faq.question}</span>
                        {openFaqIndex === fIdx ? (
                          <ChevronUp className="w-5 h-5 text-[#D95D39] shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                        )}
                      </button>
                      {openFaqIndex === fIdx && (
                        <div className="px-4 pb-5 sm:px-5 text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Author Profile Box */}
            <div className="pt-10">
              <AuthorCard author={article.author} />
            </div>

            {/* Veterinary Medical Disclaimer Banner on every article */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 leading-relaxed space-y-1">
              <strong className="text-stone-900 dark:text-stone-200 block font-serif">
                Veterinary Advisory Notice:
              </strong>
              <p>
                This guide provides general educational information curated by our pet care editorial team. Every dog and cat has unique clinical, physiological, and dietary requirements. If your pet exhibits acute symptoms of distress, vomiting, lethargy, or pain, contact your nearest emergency veterinarian immediately.
              </p>
            </div>

            {/* Previous / Next Article Navigation */}
            <nav className="pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <Link
                  to={`/${prevArticle.category}/${prevArticle.slug}`}
                  className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-[#D95D39]/50 hover:bg-white dark:hover:bg-stone-900 transition-all group"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1 group-hover:text-[#D95D39]">
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous Guide
                  </span>
                  <p className="text-sm font-bold font-serif text-stone-900 dark:text-white mt-1 line-clamp-1">
                    {prevArticle.title}
                  </p>
                </Link>
              ) : <div />}

              {nextArticle ? (
                <Link
                  to={`/${nextArticle.category}/${nextArticle.slug}`}
                  className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-[#D95D39]/50 hover:bg-white dark:hover:bg-stone-900 transition-all text-right group"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 flex items-center justify-end gap-1 group-hover:text-[#D95D39]">
                    Next Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-sm font-bold font-serif text-stone-900 dark:text-white mt-1 line-clamp-1">
                    {nextArticle.title}
                  </p>
                </Link>
              ) : <div />}
            </nav>
          </main>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="pt-16 mt-16 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white">
                Related Pet Guides
              </h3>
              <Link to={`/${article.category}`} className="text-xs font-mono uppercase text-[#D95D39] font-bold hover:underline">
                More in {article.category} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <article
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
                        {rel.subCategory || rel.category}
                      </span>
                      <h4 className="text-base font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D95D39] transition-colors line-clamp-2 mt-1">
                        <Link to={`/${rel.category}/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h4>
                    </div>
                    <div className="text-xs text-stone-500 flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                      <span>{rel.readingTime}</span>
                      <span className="text-[#D95D39] font-semibold">Read &rarr;</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
