import React, { useState } from 'react';
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
} from 'lucide-react';
import { allArticles } from '../data/mockData';
import { SEO } from '../components/SEO';
import { TableOfContents } from '../components/TableOfContents';
import { ShareButtons } from '../components/ShareButtons';
import { AuthorCard } from '../components/AuthorCard';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const ArticleDetailPage: React.FC = () => {
  const { slug, category } = useParams<{ slug: string; category?: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    {
      name: article.category.charAt(0).toUpperCase() + article.category.slice(1).replace('-', ' '),
      url: `/${article.category}`,
    },
    { name: article.title, url: `/${article.category}/${article.slug}` },
  ];

  return (
    <div className="py-8 sm:py-12 bg-white dark:bg-stone-950 min-h-screen text-stone-900 dark:text-stone-100 transition-colors">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Article Header Container */}
        <header className="max-w-4xl mx-auto space-y-4 text-center sm:text-left mb-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <Link
              to={`/${article.category}`}
              className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-xs font-mono uppercase tracking-wider font-semibold"
            >
              {article.subCategory || article.category}
            </Link>
            <span className="text-xs text-stone-400">•</span>
            <span className="flex items-center gap-1 text-xs text-stone-500 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="flex items-center gap-1 text-xs text-stone-500 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              Updated {article.updatedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-stone-900 dark:text-white leading-[1.18]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            {article.excerpt}
          </p>

          {/* Author & Vet Review Attribution Row */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to={`/author/${article.author.slug}`}>
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500/30"
                />
              </Link>
              <div>
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/author/${article.author.slug}`}
                    className="text-sm font-bold text-stone-900 dark:text-white hover:text-orange-600 transition-colors"
                  >
                    {article.author.name}
                  </Link>
                  <span title="Verified Medical/Care Author">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </span>
                </div>
                <p className="text-xs text-stone-500">{article.author.role}</p>
              </div>
            </div>

            <ShareButtons title={article.title} />
          </div>
        </header>

        {/* Featured Hero Image */}
        <figure className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl mb-12 border border-stone-200/80 dark:border-stone-800">
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            className="w-full h-[320px] sm:h-[480px] lg:h-[540px] object-cover"
          />
          {article.imageCaption && (
            <figcaption className="p-3 sm:px-6 bg-stone-50 dark:bg-stone-900 text-xs text-stone-500 dark:text-stone-400 text-center italic border-t border-stone-200 dark:border-stone-800">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Top In-Article Ad Placement */}
        <div className="max-w-4xl mx-auto my-6">
          <AdSenseSlot slotType="in-article" slotId="petzora-article-top" />
        </div>

        {/* Main Content Layout with Sticky Table of Contents on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
          {/* Left Table of Contents Column */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {article.tableOfContents && article.tableOfContents.length > 0 && (
                <TableOfContents items={article.tableOfContents} />
              )}
              <AdSenseSlot slotType="sidebar-rect" slotId="petzora-article-sidebar" />
            </div>
          </aside>

          {/* Right Main Article Body Column */}
          <main className="lg:col-span-8 order-1 lg:order-2 space-y-6 text-stone-800 dark:text-stone-200 leading-relaxed font-sans text-base sm:text-lg">
            {article.sections.map((section, idx) => {
              if (section.type === 'heading') {
                const headingId = section.headingText
                  ? section.headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                  : `heading-${idx}`;
                return (
                  <h2
                    key={idx}
                    id={headingId}
                    className="pt-6 text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white tracking-tight scroll-mt-24 border-t border-stone-100 dark:border-stone-800/80"
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
                    className="my-6 p-5 sm:p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-100 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
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
                    className="my-6 pl-5 border-l-4 border-orange-500 italic text-stone-700 dark:text-stone-300 font-serif text-lg sm:text-xl"
                  >
                    <p>&ldquo;{section.content}&rdquo;</p>
                    {section.quoteAuthor && (
                      <cite className="block text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 mt-2 not-italic font-semibold">
                        — {section.quoteAuthor}
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
                  <figure key={idx} className="my-8 rounded-2xl overflow-hidden shadow">
                    <img
                      src={section.imageUrl}
                      alt={section.imageCaption || 'Pet guide illustration'}
                      className="w-full h-auto object-cover max-h-[420px]"
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

            {/* Mid-Article Content Ad Placement */}
            <AdSenseSlot slotType="in-article" slotId="petzora-article-mid-body" />

            {/* FAQ Accordion Section */}
            {article.faqList && article.faqList.length > 0 && (
              <section className="pt-10 border-t border-stone-200 dark:border-stone-800 space-y-4">
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {article.faqList.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-stone-50 dark:bg-stone-900/60"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                        className="w-full p-4 sm:p-5 text-left font-serif font-bold text-base sm:text-lg flex items-center justify-between text-stone-900 dark:text-white hover:text-orange-600 transition-colors"
                      >
                        <span>{faq.question}</span>
                        {openFaqIndex === fIdx ? (
                          <ChevronUp className="w-5 h-5 text-orange-600 shrink-0" />
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

            {/* Author Box */}
            <div className="pt-10">
              <AuthorCard author={article.author} />
            </div>

            {/* Veterinary Medical Disclaimer on every article */}
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-500 leading-relaxed">
              <p>
                <strong>Veterinary Advisory Note:</strong> This guide provides general educational information curated by our pet care editorial team. Every dog and cat has unique medical, physiological, and dietary needs. If your pet is showing acute signs of pain, lethargy, vomiting, or breathing distress, contact your emergency veterinarian immediately.
              </p>
            </div>

            {/* Navigation: Previous / Next Article */}
            <nav className="pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <Link
                  to={`/${prevArticle.category}/${prevArticle.slug}`}
                  className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-orange-500/50 hover:bg-stone-50 dark:hover:bg-stone-900 transition-all group"
                >
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1 group-hover:text-orange-600">
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
                  className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-orange-500/50 hover:bg-stone-50 dark:hover:bg-stone-900 transition-all text-right group"
                >
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 flex items-center justify-end gap-1 group-hover:text-orange-600">
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
            <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white mb-8">
              Related Pet Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
                >
                  <Link to={`/${rel.category}/${rel.slug}`} className="block relative aspect-video overflow-hidden">
                    <img
                      src={rel.featuredImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
                        {rel.subCategory || rel.category}
                      </span>
                      <h4 className="text-base font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2 mt-1">
                        <Link to={`/${rel.category}/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h4>
                    </div>
                    <div className="text-xs text-stone-500 flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                      <span>{rel.readingTime}</span>
                      <span className="text-orange-600 font-semibold">Read &rarr;</span>
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
