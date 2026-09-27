import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Network, Code, FileText, CheckCircle2, Copy } from 'lucide-react';
import { allArticles, petCategories, editorialTeam } from '../data/mockData';
import { SEO } from '../components/SEO';

export const SitemapPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visual' | 'xml' | 'robots'>('visual');
  const [copied, setCopied] = useState(false);

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
${petCategories
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

  <!-- Pet Articles (${allArticles.length}) -->
${allArticles
  .map(
    (a) => `  <url>
    <loc>https://petzora.shop/${a.category}/${a.slug}</loc>
    <lastmod>${a.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsContent = `# Robots.txt for Petzora (https://petzora.shop)
User-agent: *
Allow: /
Disallow: /api/

# Google AdSense Crawler Optimization
User-agent: Mediapartners-Google
Allow: /

# Canonical XML Sitemap
Sitemap: https://petzora.shop/sitemap.xml`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-16 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Sitemap &amp; Crawler Index | Petzora (petzora.shop)"
        description="Visual directory, XML sitemap preview, and robots.txt configuration for Petzora pet guides and articles."
        canonicalUrl="https://petzora.shop/sitemap"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Sitemap', url: '/sitemap' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-semibold">
              <Network className="w-4 h-4" />
              <span>SEARCH ENGINE DIRECTORY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
              Petzora Sitemap &amp; Crawler Index
            </h1>
            <p className="text-xs font-mono text-stone-500">
              Domain: petzora.shop &bull; Total Indexed URLs: {6 + petCategories.length + editorialTeam.length + allArticles.length}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white dark:bg-stone-900 p-1 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'visual'
                  ? 'bg-orange-600 text-white'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Visual Directory
            </button>
            <button
              onClick={() => setActiveTab('xml')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'xml'
                  ? 'bg-orange-600 text-white'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              sitemap.xml
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'robots'
                  ? 'bg-orange-600 text-white'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              robots.txt
            </button>
          </div>
        </header>

        {activeTab === 'visual' && (
          <div className="space-y-10">
            {/* Core Pages */}
            <section className="space-y-4">
              <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-white border-b border-stone-200 dark:border-stone-800 pb-2">
                Core Editorial Hubs
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Link to="/" className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 text-sm font-semibold">
                  Home (petzora.shop)
                </Link>
                <Link to="/about" className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 text-sm font-semibold">
                  About Petzora
                </Link>
                <Link to="/contact" className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 text-sm font-semibold">
                  Contact Us
                </Link>
                <Link to="/disclaimer" className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 text-sm font-semibold">
                  Veterinary Disclaimer
                </Link>
                <Link to="/privacy-policy" className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 text-sm font-semibold">
                  Privacy Policy
                </Link>
                <Link to="/terms-conditions" className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 text-sm font-semibold">
                  Terms &amp; Conditions
                </Link>
              </div>
            </section>

            {/* Pet Categories */}
            <section className="space-y-4">
              <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-white border-b border-stone-200 dark:border-stone-800 pb-2">
                Pet Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {petCategories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/${c.slug}`}
                    className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 text-sm font-semibold flex items-center justify-between"
                  >
                    <span>{c.name}</span>
                    <span className="text-xs text-orange-600 font-mono">&rarr;</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* All Articles */}
            <section className="space-y-4">
              <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-white border-b border-stone-200 dark:border-stone-800 pb-2">
                Published Pet Guides ({allArticles.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allArticles.map((a) => (
                  <Link
                    key={a.id}
                    to={`/${a.category}/${a.slug}`}
                    className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 text-xs flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-800 dark:text-stone-200 group-hover:text-orange-600 truncate">
                        {a.title}
                      </p>
                      <p className="text-[10px] text-stone-500">
                        {a.category} &bull; {a.readingTime}
                      </p>
                    </div>
                    <span className="text-stone-400 group-hover:text-orange-600 text-xs shrink-0">&rarr;</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'xml' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-stone-500">
                Format: XML Schema 0.9 (Valid for Google Search Console)
              </span>
              <button
                onClick={() => copyToClipboard(xmlContent)}
                className="px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy XML'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-stone-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-stone-800 max-h-[500px]">
              {xmlContent}
            </pre>
          </div>
        )}

        {activeTab === 'robots' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-stone-500">
                Format: Plain Text Robots Exclusion Protocol
              </span>
              <button
                onClick={() => copyToClipboard(robotsContent)}
                className="px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy robots.txt'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-stone-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-stone-800">
              {robotsContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
