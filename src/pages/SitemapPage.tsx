import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Network, Code, FileText, CheckCircle2, Copy } from 'lucide-react';
import { petCategories, editorialTeam } from '../data/mockData';
import { SEO } from '../components/SEO';
import { getPublishedArticles, getCategories } from '../lib/supabase';
import { Article, CategoryInfo } from '../types';

export const SitemapPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visual' | 'xml' | 'robots'>('visual');
  const [copied, setCopied] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>(petCategories);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const [artList, catList] = await Promise.all([
        getPublishedArticles(),
        getCategories(),
      ]);
      if (mounted) {
        setArticles(artList);
        if (catList.length > 0) setCategories(catList);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
  <url>
    <loc>https://petzora.shop/</loc>
    <lastmod>2026-03-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://petzora.shop/about</loc>
    <lastmod>2026-03-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://petzora.shop/contact</loc>
    <lastmod>2026-03-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://petzora.shop/disclaimer</loc>
    <lastmod>2026-03-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://petzora.shop/privacy-policy</loc>
    <lastmod>2026-03-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://petzora.shop/terms-conditions</loc>
    <lastmod>2026-03-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- Pet Categories -->
${categories
  .map(
    (c) => `  <url>
    <loc>https://petzora.shop/${c.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
  )
  .join('\n')}

  <!-- Editorial Profiles -->
${editorialTeam
  .map(
    (a) => `  <url>
    <loc>https://petzora.shop/author/${a.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}

  <!-- Pet Articles (${articles.length}) -->
${articles
  .map(
    (a) => `  <url>
    <loc>https://petzora.shop/${a.category}/${a.slug}</loc>
    <lastmod>${a.updatedAt || a.createdAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsContent = `# Robots.txt for Petzora (https://petzora.shop)
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin

Sitemap: https://petzora.shop/sitemap.xml
`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-12 space-y-12 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="HTML &amp; XML Sitemap Index | Petzora Site Architecture"
        description="Comprehensive site hierarchy, category pathways, author dossiers, and machine-readable indexation maps for Petzora."
        canonicalUrl="https://petzora.shop/sitemap"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Network className="w-3.5 h-3.5" />
            <span>NAVIGATION BLUEPRINT &amp; CRAWL MAPS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Petzora Sitemap
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            Machine-readable and human-navigable directory of all published veterinary guides, pet categories, and editorial profiles.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 w-max mx-auto shadow-sm">
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'visual'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Visual Directory
          </button>
          <button
            onClick={() => setActiveTab('xml')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'xml'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>XML Sitemap ({articles.length} posts)</span>
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'robots'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Robots.txt
          </button>
        </div>

        {/* Tab 1: Visual Directory */}
        {activeTab === 'visual' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <h2 className="font-serif font-black text-xl text-stone-900 dark:text-white">
                Pet Category Hubs
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/${c.slug}`}
                    className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-850 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-stone-800 dark:text-stone-200 text-xs font-serif font-bold transition flex items-center justify-between"
                  >
                    <span>{c.name}</span>
                    <span className="text-orange-600 font-mono text-[10px]">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <h2 className="font-serif font-black text-xl text-stone-900 dark:text-white">
                Published Editorial Guides ({articles.length})
              </h2>
              {articles.length === 0 ? (
                <p className="text-xs text-stone-500 italic">
                  Articles published via the CMS will be automatically mapped here.
                </p>
              ) : (
                <div className="divide-y divide-stone-100 dark:divide-stone-800">
                  {articles.map((art) => (
                    <div key={art.id} className="py-2.5 flex items-center justify-between text-xs">
                      <Link
                        to={`/${art.category}/${art.slug}`}
                        className="font-medium hover:text-orange-600 transition truncate pr-4"
                      >
                        {art.title}
                      </Link>
                      <span className="text-stone-400 font-mono text-[10px] shrink-0">
                        /{art.category}/{art.slug}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: XML */}
        {activeTab === 'xml' && (
          <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-stone-100 border border-stone-800 p-6 font-mono text-xs shadow-xl">
            <button
              onClick={() => handleCopy(xmlContent)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs transition flex items-center gap-1.5"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied XML' : 'Copy XML'}</span>
            </button>
            <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
              {xmlContent}
            </pre>
          </div>
        )}

        {/* Tab 3: Robots */}
        {activeTab === 'robots' && (
          <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-stone-100 border border-stone-800 p-6 font-mono text-xs shadow-xl">
            <button
              onClick={() => handleCopy(robotsContent)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs transition flex items-center gap-1.5"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Robots.txt'}</span>
            </button>
            <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {robotsContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
