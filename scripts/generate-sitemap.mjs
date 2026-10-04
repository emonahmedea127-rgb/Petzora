import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://www.petzora.shop';
const DEFAULT_SUPABASE_URL = 'https://wrsiehvxrryqsihqirgm.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_koPbRs1lun2YdNT5ei-OZg_3viY5Mkn';
const outDir = path.resolve('public');
const mainSitemapPath = path.join(outDir, 'sitemap.xml');
const articleSitemapPath = path.join(outDir, 'sitemap-articles.xml');
const pagesSitemapPath = path.join(outDir, 'sitemap-pages.xml');

const supabaseUrl = (process.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(/\/$/, '');
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

const staticPaths = [
  '/', '/dogs', '/cats', '/care', '/pet-care', '/health', '/nutrition', '/training',
  '/behavior', '/reviews', '/product-guides', '/stories', '/guides', '/about',
  '/contact', '/editorial-policy', '/privacy-policy', '/terms', '/disclaimer',
  '/cookie-policy', '/affiliate-disclosure',
];

const xmlEscape = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const dateOnly = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
};

const urlEntry = (loc, lastmod, priority = '0.8', changefreq = 'weekly') => `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n${dateOnly(lastmod) ? `    <lastmod>${dateOnly(lastmod)}</lastmod>` : ''}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

const wrapUrlset = (entries) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

async function supabaseGet(table, query) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: supabaseKey,
      Accept: 'application/json',
    },
  });
  if (!response.ok) throw new Error(`${table} query failed: ${response.status}`);
  return response.json();
}

async function main() {
  try {
    const [articles, authors] = await Promise.all([
      supabaseGet('articles', 'select=slug,category_slug,updated_at,published_at&status=eq.published&order=published_at.desc.nullslast'),
      supabaseGet('authors', 'select=slug,updated_at&order=slug.asc'),
    ]);

    const articleEntries = articles.map((article) =>
      urlEntry(
        `${SITE_URL}/${article.category_slug}/${article.slug}`,
        article.updated_at || article.published_at,
        '0.9',
        'monthly',
      ),
    );

    const authorEntries = authors.map((author) =>
      urlEntry(`${SITE_URL}/author/${author.slug}`, author.updated_at, '0.6', 'monthly'),
    );

    const pageEntries = staticPaths.map((route, index) =>
      urlEntry(
        `${SITE_URL}${route}`,
        null,
        route === '/' ? '1.0' : index < 14 ? '0.8' : '0.5',
        route === '/' || route === '/guides' || route === '/blog' ? 'daily' : 'weekly',
      ),
    );

    const unique = new Map();
    [...pageEntries, ...articleEntries, ...authorEntries].forEach((entry) => {
      const loc = entry.match(/<loc>(.*?)<\/loc>/)?.[1];
      if (loc) unique.set(loc, entry);
    });

    await fs.mkdir(outDir, { recursive: true });
    await Promise.all([
      fs.writeFile(mainSitemapPath, wrapUrlset([...unique.values()]), 'utf8'),
      fs.writeFile(articleSitemapPath, wrapUrlset(articleEntries), 'utf8'),
      fs.writeFile(pagesSitemapPath, wrapUrlset([...pageEntries, ...authorEntries]), 'utf8'),
    ]);

    console.log(`[sitemap] Generated ${articles.length} article URLs, ${authors.length} author URLs, and ${staticPaths.length} static URLs.`);
  } catch (error) {
    throw new Error('Sitemap generation failed; refusing to publish a stale URL list.', { cause: error });
  }
}

await main();
