import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://www.petzora.shop';
const supabaseUrl = (process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const distDir = path.resolve('dist');

const htmlEscape = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const attrEscape = htmlEscape;

const absoluteUrl = (value = '', fallback = `${SITE_URL}/images/hero-dog-cat.webp`) => {
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value.replace('https://petzora.shop', SITE_URL);
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
};

const sanitizeArticleHtml = (html = '') => String(html)
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
  .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/javascript:/gi, '');

async function supabaseGet(table, query) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${query}`, {
    headers: { apikey: supabaseKey, Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`${table} query failed: ${response.status}`);
  return response.json();
}

function upsertHead(html, article) {
  const canonical = `${SITE_URL}/${article.category_slug}/${article.slug}`;
  const title = article.seo_title || article.title;
  const fullTitle = title.includes('Petzora') ? title : `${title} | Petzora`;
  const description = article.seo_description || article.excerpt || '';
  const image = absoluteUrl(article.og_image || article.featured_image);
  const published = article.published_at || article.created_at || undefined;
  const modified = article.updated_at || published;
  const authorName = article.authors?.name || 'Petzora Editorial Team';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description,
    image: [image],
    author: { '@type': 'Organization', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: 'Petzora',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    articleSection: article.category_slug,
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
  };

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${htmlEscape(fullTitle)}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${attrEscape(description)}" />`)
    .replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${attrEscape(canonical)}" />`)
    .replace(/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${attrEscape(fullTitle)}" />`)
    .replace(/<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${attrEscape(description)}" />`)
    .replace(/<meta\s+property="og:type"[^>]*>/i, '<meta property="og:type" content="article" />')
    .replace(/<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${attrEscape(canonical)}" />`)
    .replace(/<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${attrEscape(image)}" />`)
    .replace(/<meta\s+property="og:image:alt"[^>]*>/i, `<meta property="og:image:alt" content="${attrEscape(article.image_alt || article.title)}" />`)
    .replace(/<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${attrEscape(fullTitle)}" />`)
    .replace(/<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${attrEscape(description)}" />`)
    .replace(/<meta\s+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${attrEscape(image)}" />`);

  const extraHead = `${published ? `<meta property="article:published_time" content="${attrEscape(published)}" />` : ''}\n${modified ? `<meta property="article:modified_time" content="${attrEscape(modified)}" />` : ''}\n<meta property="article:section" content="${attrEscape(article.category_slug)}" />\n<script type="application/ld+json" id="petzora-prerender-jsonld">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
  output = output.replace('</head>', `${extraHead}\n</head>`);
  return output;
}

function injectStaticArticle(html, article) {
  const canonical = `${SITE_URL}/${article.category_slug}/${article.slug}`;
  const body = sanitizeArticleHtml(article.content || '');
  const published = article.published_at || article.created_at;
  const authorName = article.authors?.name || 'Petzora Editorial Team';
  const fallback = `
    <main data-petzora-prerendered="true" style="max-width:900px;margin:48px auto;padding:0 20px;font-family:system-ui,sans-serif;line-height:1.7">
      <article>
        <nav aria-label="Breadcrumb"><a href="${SITE_URL}/">Home</a> &rsaquo; <a href="${SITE_URL}/${attrEscape(article.category_slug)}">${htmlEscape(article.category_slug)}</a></nav>
        <h1>${htmlEscape(article.title)}</h1>
        <p>${htmlEscape(article.excerpt || '')}</p>
        <p><span>By ${htmlEscape(authorName)}</span>${published ? ` · <time datetime="${attrEscape(published)}">${htmlEscape(new Date(published).toISOString().slice(0, 10))}</time>` : ''}</p>
        ${body}
        <p><a href="${attrEscape(canonical)}">Canonical article URL</a></p>
      </article>
    </main>`;

  return html.replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
}

async function main() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('[prerender] Supabase env vars unavailable; skipping article prerender.');
    return;
  }

  try {
    const shell = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
    const articles = await supabaseGet(
      'articles',
      'select=title,slug,excerpt,content,featured_image,image_alt,category_slug,seo_title,seo_description,canonical_url,og_image,published_at,created_at,updated_at,author_id,authors(name)&status=eq.published&order=published_at.desc.nullslast',
    );

    for (const article of articles) {
      if (!article.slug || !article.category_slug) continue;
      const targetDir = path.join(distDir, article.category_slug, article.slug);
      const targetPath = path.join(targetDir, 'index.html');
      await fs.mkdir(targetDir, { recursive: true });
      const withSeo = upsertHead(shell, article);
      const rendered = injectStaticArticle(withSeo, article);
      await fs.writeFile(targetPath, rendered, 'utf8');
    }

    console.log(`[prerender] Generated static HTML for ${articles.length} published article(s).`);
  } catch (error) {
    console.warn('[prerender] Failed; SPA build remains available.', error instanceof Error ? error.message : error);
  }
}

await main();
