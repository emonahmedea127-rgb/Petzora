import React, { useEffect } from 'react';

const SITE_URL = 'https://www.petzora.shop';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  category?: string;
  tags?: string[];
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = `${SITE_URL}/images/hero-dog-cat.webp`,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authorName = 'Petzora Editorial Team',
  category,
  tags,
  breadcrumbs,
  faqs,
}) => {
  useEffect(() => {
    const cleanDescription = description.trim().replace(/\s+/g, ' ');
    const fullTitle = title.includes('Petzora') ? title : `${title} | Petzora`;
    document.title = fullTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const browserUrl = typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : SITE_URL;
    const url = canonicalUrl || browserUrl;
    const normalizedUrl = url.replace('https://petzora.shop', SITE_URL);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', normalizedUrl);

    updateMeta('description', cleanDescription);
    updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    if (tags?.length) updateMeta('keywords', tags.join(', '));

    const fullOgImage = ogImage.startsWith('http')
      ? ogImage.replace('https://petzora.shop', SITE_URL)
      : `${SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', cleanDescription, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:url', normalizedUrl, true);
    updateMeta('og:image', fullOgImage, true);
    updateMeta('og:image:alt', title, true);
    updateMeta('og:site_name', 'Petzora', true);
    if (publishedTime) updateMeta('article:published_time', publishedTime, true);
    if (modifiedTime) updateMeta('article:modified_time', modifiedTime, true);
    if (category) updateMeta('article:section', category, true);

    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', cleanDescription);
    updateMeta('twitter:image', fullOgImage);

    const jsonLdScripts: Record<string, unknown>[] = [];

    jsonLdScripts.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Petzora',
      alternateName: 'Petzora Pet Care & Guides',
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });

    jsonLdScripts.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Petzora',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      description: 'Pet education website with practical guides for dog and cat owners.',
    });

    if (ogType === 'article') {
      const articleSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: cleanDescription,
        image: [fullOgImage],
        author: {
          '@type': 'Person',
          name: authorName,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Petzora',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/favicon.svg`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': normalizedUrl,
        },
        articleSection: category || 'Pet Care',
      };

      if (publishedTime) articleSchema.datePublished = publishedTime;
      if (modifiedTime || publishedTime) articleSchema.dateModified = modifiedTime || publishedTime;
      if (tags?.length) articleSchema.keywords = tags.join(', ');
      jsonLdScripts.push(articleSchema);
    }

    if (breadcrumbs?.length) {
      jsonLdScripts.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http')
            ? crumb.url.replace('https://petzora.shop', SITE_URL)
            : `${SITE_URL}${crumb.url}`,
        })),
      });
    }

    if (faqs?.length) {
      jsonLdScripts.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    let scriptTag = document.getElementById('petzora-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'petzora-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLdScripts);
  }, [
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    publishedTime,
    modifiedTime,
    authorName,
    category,
    tags,
    breadcrumbs,
    faqs,
  ]);

  return null;
};
