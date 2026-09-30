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

async function supabaseGet(table, query) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${query}`, {
    headers: { apikey: supabaseKey, Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`${table} query failed: ${response.status}`);
  return response.json();
}

function upsertHead(html, { route, title, description, schemaType = 'CollectionPage' }) {
  const canonical = `${SITE_URL}${route === '/' ? '/' : route}`;
  const fullTitle = title.includes('Petzora') ? title : `${title} | Petzora`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: title,
    description,
    url: canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Petzora',
      url: `${SITE_URL}/`,
    },
  };

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${htmlEscape(fullTitle)}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${attrEscape(description)}" />`)
    .replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${attrEscape(canonical)}" />`)
    .replace(/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${attrEscape(fullTitle)}" />`)
    .replace(/<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${attrEscape(description)}" />`)
    .replace(/<meta\s+property="og:type"[^>]*>/i, '<meta property="og:type" content="website" />')
    .replace(/<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${attrEscape(canonical)}" />`)
    .replace(/<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${attrEscape(fullTitle)}" />`)
    .replace(/<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${attrEscape(description)}" />`);

  output = output.replace('</head>', `<script type="application/ld+json" id="petzora-static-jsonld">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>\n</head>`);
  return output;
}

const siteNav = `
  <nav aria-label="Primary">
    <a href="${SITE_URL}/">Home</a> ·
    <a href="${SITE_URL}/dogs">Dogs</a> ·
    <a href="${SITE_URL}/cats">Cats</a> ·
    <a href="${SITE_URL}/health">Health</a> ·
    <a href="${SITE_URL}/nutrition">Nutrition</a> ·
    <a href="${SITE_URL}/training">Training</a> ·
    <a href="${SITE_URL}/care">Care</a> ·
    <a href="${SITE_URL}/stories">Stories</a>
  </nav>`;

function articleList(articles, limit = 24) {
  const items = articles.slice(0, limit).map((article) =>
    `<li><a href="${SITE_URL}/${attrEscape(article.category_slug)}/${attrEscape(article.slug)}">${htmlEscape(article.title)}</a>${article.excerpt ? `<p>${htmlEscape(article.excerpt)}</p>` : ''}</li>`,
  ).join('');
  return items ? `<ul>${items}</ul>` : '<p>New guides are being prepared for this section.</p>';
}

function injectRoot(html, content) {
  const fallback = `<main data-petzora-prerendered="true" style="max-width:1000px;margin:48px auto;padding:0 20px;font-family:system-ui,sans-serif;line-height:1.7">${content}</main>`;
  return html.replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
}

async function writeRoute(shell, route, page) {
  const withHead = upsertHead(shell, { route, ...page });
  const rendered = injectRoot(withHead, page.content);
  const targetPath = route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.replace(/^\//, ''), 'index.html');
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, rendered, 'utf8');
}

async function main() {
  try {
    const shell = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
    const [articles, authors] = await Promise.all([
      supabaseGet('articles', 'select=id,title,slug,excerpt,category_slug,author_id,published_at&status=eq.published&order=published_at.desc.nullslast'),
      supabaseGet('authors', 'select=id,name,slug,role,bio,credentials,updated_at&order=name.asc'),
    ]);

    const categories = [
      { route: '/dogs', title: 'Dog Care Guides', description: 'Practical dog care, behavior, health, training and everyday ownership guides.', slugs: ['dogs'] },
      { route: '/cats', title: 'Cat Care Guides', description: 'Practical cat care, behavior, health, nutrition and everyday ownership guides.', slugs: ['cats'] },
      { route: '/care', title: 'Everyday Pet Care', description: 'Everyday routines, grooming, hygiene and practical care guides for dogs and cats.', slugs: ['care', 'pet-care'] },
      { route: '/pet-care', title: 'Pet Care Checklists and Guides', description: 'Practical pet care checklists and routines for safer, healthier everyday pet ownership.', slugs: ['pet-care', 'care'] },
      { route: '/health', title: 'Pet Health Guides', description: 'Pet health explainers, warning signs and practical guidance for dog and cat owners.', slugs: ['health'] },
      { route: '/nutrition', title: 'Pet Nutrition Guides', description: 'Dog and cat food safety, feeding and nutrition guides written for everyday pet owners.', slugs: ['nutrition'] },
      { route: '/training', title: 'Dog Training Guides', description: 'Step-by-step training and behavior guides for puppies and adult dogs.', slugs: ['training'] },
      { route: '/behavior', title: 'Pet Behavior Guides', description: 'Understand common dog and cat behaviors, body language and everyday habits.', slugs: ['dogs', 'cats', 'care'] },
      { route: '/reviews', title: 'Pet Product Reviews and Buying Guides', description: 'Practical pet product reviews and buying guides focused on useful features and fit.', slugs: ['reviews'] },
      { route: '/product-guides', title: 'Pet Product Guides', description: 'Helpful buying guides for pet products, comfort, walking and everyday care.', slugs: ['reviews'] },
      { route: '/stories', title: 'Pet Stories', description: 'Warm rescue, recovery and companionship stories about dogs and cats.', slugs: ['stories'] },
    ];

    await writeRoute(shell, '/', {
      title: 'Petzora | Practical Pet Care Guides for Dogs & Cats',
      description: 'Practical pet care guides for dog and cat owners, including health, nutrition, training, behavior, and everyday care advice.',
      schemaType: 'WebPage',
      content: `${siteNav}<h1>Practical Pet Care Guides for Dogs &amp; Cats</h1><p>Petzora publishes useful, easy-to-follow guides about pet health, nutrition, training, behavior and everyday care.</p><h2>Latest pet guides</h2>${articleList(articles, 16)}<p><a href="${SITE_URL}/about">About Petzora</a> · <a href="${SITE_URL}/editorial-policy">Editorial Policy</a> · <a href="${SITE_URL}/contact">Contact</a></p>`,
    });

    for (const category of categories) {
      const filtered = articles.filter((article) => category.slugs.includes(article.category_slug));
      await writeRoute(shell, category.route, {
        title: category.title,
        description: category.description,
        content: `${siteNav}<nav aria-label="Breadcrumb"><a href="${SITE_URL}/">Home</a> &rsaquo; ${htmlEscape(category.title)}</nav><h1>${htmlEscape(category.title)}</h1><p>${htmlEscape(category.description)}</p><h2>Latest articles</h2>${articleList(filtered)}`,
      });
    }

    for (const route of ['/guides', '/blog']) {
      const title = route === '/guides' ? 'Pet Care Guides' : 'Petzora Pet Care Blog';
      const description = route === '/guides'
        ? 'Browse Petzora guides covering dog and cat health, nutrition, training, behavior and daily care.'
        : 'Browse the latest Petzora articles about dogs, cats, pet health, nutrition, training and care.';
      await writeRoute(shell, route, {
        title,
        description,
        content: `${siteNav}<h1>${htmlEscape(title)}</h1><p>${htmlEscape(description)}</p><h2>Latest articles</h2>${articleList(articles, 30)}`,
      });
    }

    const trustPages = [
      ['/about', 'About Petzora', 'Learn how Petzora creates practical pet care content for dog and cat owners.', 'Petzora is an independent pet information website focused on clear, practical guides for everyday dog and cat owners.'],
      ['/contact', 'Contact Petzora', 'Contact Petzora with feedback, corrections, editorial questions or general enquiries.', 'Use the Petzora contact page to send feedback, corrections, editorial questions or general enquiries.'],
      ['/editorial-policy', 'Editorial Policy', 'Read Petzora’s editorial standards, sourcing approach and correction process.', 'Our editorial policy explains how Petzora researches, reviews, updates and corrects pet care content without claiming credentials or testing that did not occur.'],
      ['/privacy-policy', 'Privacy Policy', 'Read the Petzora privacy policy and learn how site data and cookies may be handled.', 'This page explains Petzora’s privacy practices, including analytics, advertising and information submitted through the site.'],
      ['/terms', 'Terms of Service', 'Read the terms that apply when using the Petzora website and its informational content.', 'These terms explain the conditions that apply when accessing and using Petzora.'],
      ['/disclaimer', 'Disclaimer', 'Read important limitations and disclaimers for Petzora pet care information.', 'Petzora provides general educational information and does not replace individualized veterinary diagnosis or treatment.'],
      ['/cookie-policy', 'Cookie Policy', 'Learn how Petzora may use cookies and similar technologies.', 'This policy explains the use of cookies and related technologies for site functionality, analytics and advertising.'],
      ['/affiliate-disclosure', 'Affiliate Disclosure', 'Read Petzora’s disclosure about affiliate links and commercial relationships.', 'This page explains how Petzora discloses affiliate relationships and how they relate to editorial content.'],
    ];

    for (const [route, title, description, paragraph] of trustPages) {
      await writeRoute(shell, route, {
        title,
        description,
        schemaType: 'WebPage',
        content: `${siteNav}<h1>${htmlEscape(title)}</h1><p>${htmlEscape(paragraph)}</p><p><a href="${SITE_URL}/">Return to Petzora home</a></p>`,
      });
    }

    for (const author of authors) {
      if (!author.slug) continue;
      const authorArticles = articles.filter((article) => article.author_id === author.id);
      const route = `/author/${author.slug}`;
      const title = author.name || 'Petzora Editorial Team';
      const description = author.bio || `${title} contributes pet care content to Petzora.`;
      await writeRoute(shell, route, {
        title,
        description,
        schemaType: 'ProfilePage',
        content: `${siteNav}<h1>${htmlEscape(title)}</h1>${author.role ? `<p>${htmlEscape(author.role)}</p>` : ''}<p>${htmlEscape(description)}</p><h2>Articles</h2>${articleList(authorArticles, 30)}`,
      });
    }

    console.log(`[prerender-pages] Generated homepage, ${categories.length + 2} content hubs, ${trustPages.length} trust pages and ${authors.length} author pages.`);
  } catch (error) {
    console.warn('[prerender-pages] Failed; SPA build remains available.', error instanceof Error ? error.message : error);
  }
}

await main();
