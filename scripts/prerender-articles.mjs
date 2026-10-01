import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://www.petzora.shop';
const DEFAULT_SUPABASE_URL = 'https://wrsiehvxrryqsihqirgm.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_koPbRs1lun2YdNT5ei-OZg_3viY5Mkn';
const supabaseUrl = (process.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(/\/$/, '');
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
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

const DEDICATED_ARTICLE_IMAGES = {
  'kitten-quiet-corner-recovery-confidence-story': '/images/kitten-quiet-corner.jpg',
  'why-does-my-cat-meow-at-night': '/images/cat-meow-night.jpg',
  'cat-sneezing-causes-warning-signs': '/images/cat-sneezing-health.jpg',
  'can-cats-eat-tuna-safe-amounts': '/images/cat-eating-tuna.jpg',
  'why-does-my-cat-sleep-so-much': '/images/cat-sleeping-hours.jpg',
  'cat-drinking-more-water-than-usual': '/images/cat-drinking-fountain.jpg',
  'shy-rescue-cat-learning-to-trust': '/images/shy-cat-trust.jpg',
  'why-do-cats-knead': '/images/cat-kneading.jpg',
  'cat-dehydration-silent-symptoms-prevention': '/images/cat-hydration.jpg',
  'can-cats-eat-eggs': '/images/cat-cooked-egg.jpg',
  'why-is-my-cat-not-eating': '/images/cat-not-eating.jpg',
  'why-does-my-cat-follow-me-everywhere': '/images/cat-following-owner.jpg',
  'puppy-potty-training-7-day-routine': '/images/puppy-potty-training.jpg',
  'why-do-dogs-tilt-their-heads': '/images/dog-body-language.jpg',
  'why-does-my-dog-follow-me-everywhere': '/images/dog-following-owner.jpg',
  'why-does-my-dog-lick-me-so-much': '/images/dog-licking-owner.jpg',
  'dog-vomiting-causes-red-flags-what-to-do': '/images/canine-emergency-first-aid.jpg',
  'canine-first-aid-emergency-triage-handbook': '/images/canine-emergency-vet-triage.jpg',
  'senior-dog-health-checklist-warning-signs': '/images/senior-dog-health.jpg',
  'can-dogs-eat-eggs-safe-serving': '/images/dog-eating-eggs.jpg',
  'dog-dental-care-tartar-prevention-home': '/images/dog-dental-care.jpg',
  'best-orthopedic-dog-beds-veterinary-review': '/images/orthopedic-dog-beds.jpg',
  'best-dog-harness-features-buying-guide': '/images/dog-harness-guide.jpg',
  'from-shelter-to-service-dog-max-journey': '/images/rescue-dog-service-journey.jpg',
  'dog-waited-by-gate-rescue-story-trust': '/images/dog-waited-gate-rescue.jpg',
  'how-to-teach-a-dog-to-stay': '/images/dog-training-park.jpg',
  'preventing-dog-separation-anxiety-guide': '/images/dog-separation-anxiety.jpg',
  'how-to-stop-dog-jumping-on-people': '/images/dog-jumping-training.jpg',
  'how-often-should-you-bathe-a-dog': '/images/dog-bath-care.jpg',
  'how-to-trim-dog-nails-safely': '/images/dog-nail-trim-care.jpg',
  'why-is-my-dog-shaking-trembling': '/images/dog-shaking-trembling.jpg',
  'can-dogs-eat-bananas': '/images/dog-banana-treat.jpg',
  'why-is-my-dog-panting-so-much': '/images/dog-panting-warning-signs.jpg',
  'senior-dog-cat-share-second-chance-story': '/images/hero-dog-cat.webp',
  'first-week-new-pet-home-checklist': '/images/first-week-new-pet.jpg',
  'essential-daily-pet-care-routine-checklist': '/images/daily-pet-care-routine.jpg',
  'toxic-foods-dogs-cats-complete-list': '/images/toxic-foods-nutrition.jpg',
  'pet-food-allergies-elimination-diet-guide': '/images/hypoallergenic-diet.jpg',
  'cat-dog-body-language-subtle-calming-signals': '/images/cat-dog-calming-signals.jpg',
};

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
  const dedicatedImg = DEDICATED_ARTICLE_IMAGES[article.slug];
  const image = absoluteUrl(dedicatedImg || article.og_image || article.featured_image);
  const published = article.published_at || article.created_at || undefined;
  const modified = article.updated_at || published;
  const authorName = article.authors?.name || 'Petzora Editorial Team';
  const authorSlug = article.authors?.slug;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description,
    image: [image],
    author: {
      '@type': 'Organization',
      name: authorName,
      ...(authorSlug ? { url: `${SITE_URL}/author/${authorSlug}` } : {}),
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
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

function injectStaticArticle(html, article, relatedArticles = []) {
  const canonical = `${SITE_URL}/${article.category_slug}/${article.slug}`;
  const dedicatedImg = DEDICATED_ARTICLE_IMAGES[article.slug];
  const image = absoluteUrl(dedicatedImg || article.featured_image || article.og_image);
  const imageAlt = article.image_alt || article.title;
  const body = sanitizeArticleHtml(article.content || '');
  const published = article.published_at || article.created_at;
  const authorName = article.authors?.name || 'Petzora Editorial Team';
  const authorSlug = article.authors?.slug;
  const authorMarkup = authorSlug
    ? `<a href="${SITE_URL}/author/${attrEscape(authorSlug)}">${htmlEscape(authorName)}</a>`
    : htmlEscape(authorName);
  const related = relatedArticles.length
    ? `<aside aria-label="Related guides"><h2>Related guides</h2><ul>${relatedArticles.map((item) => `<li><a href="${SITE_URL}/${attrEscape(item.category_slug)}/${attrEscape(item.slug)}">${htmlEscape(item.title)}</a></li>`).join('')}</ul></aside>`
    : '';
  const fallback = `
    <main data-petzora-prerendered="true" style="max-width:900px;margin:48px auto;padding:0 20px;font-family:system-ui,sans-serif;line-height:1.7">
      <article>
        <nav aria-label="Breadcrumb"><a href="${SITE_URL}/">Home</a> &rsaquo; <a href="${SITE_URL}/${attrEscape(article.category_slug)}">${htmlEscape(article.category_slug)}</a></nav>
        <h1>${htmlEscape(article.title)}</h1>
        <figure><img src="${attrEscape(image)}" alt="${attrEscape(imageAlt)}" width="1400" height="788" loading="eager" decoding="async" style="max-width:100%;height:auto" /></figure>
        <p>${htmlEscape(article.excerpt || '')}</p>
        <p><span>By ${authorMarkup}</span>${published ? ` · <time datetime="${attrEscape(published)}">${htmlEscape(new Date(published).toISOString().slice(0, 10))}</time>` : ''}</p>
        ${body}
        ${related}
        <p><a href="${attrEscape(canonical)}">Canonical article URL</a></p>
      </article>
    </main>`;

  return html.replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
}

async function main() {
  try {
    const shell = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
    const articles = await supabaseGet(
      'articles',
      'select=title,slug,excerpt,content,featured_image,image_alt,category_slug,seo_title,seo_description,canonical_url,og_image,published_at,created_at,updated_at,author_id,authors(name,slug)&status=eq.published&order=published_at.desc.nullslast',
    );

    for (const article of articles) {
      if (!article.slug || !article.category_slug) continue;
      const targetDir = path.join(distDir, article.category_slug, article.slug);
      const targetPath = path.join(targetDir, 'index.html');
      const relatedArticles = articles
        .filter((candidate) => candidate.slug !== article.slug && candidate.category_slug === article.category_slug)
        .slice(0, 4);
      await fs.mkdir(targetDir, { recursive: true });
      const withSeo = upsertHead(shell, article);
      const rendered = injectStaticArticle(withSeo, article, relatedArticles);
      await fs.writeFile(targetPath, rendered, 'utf8');
    }

    console.log(`[prerender] Generated static HTML for ${articles.length} published article(s).`);
  } catch (error) {
    console.warn('[prerender] Failed; SPA build remains available.', error instanceof Error ? error.message : error);
  }
}

await main();
