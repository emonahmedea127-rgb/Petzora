import React, { useEffect } from 'react';

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
  ogImage = 'https://petzora.shop/images/hero-dog-cat.webp',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authorName = 'Dr. Clara Vance, DVM',
  category,
  breadcrumbs,
  faqs,
}) => {
  useEffect(() => {
    // 1. Set document title
    const fullTitle = title.includes('Petzora') ? title : `${title} | Petzora`;
    document.title = fullTitle;

    // Helper function to update or create meta tags
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

    // Helper for canonical
    const url = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://petzora.shop');
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', url);

    // Standard meta
    updateMeta('google-site-verification', 's__gOlLJI-9ys2nxrRV4yLNd0aPeeuYI_svfS0VpJiE');
    updateMeta('description', description);
    updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // OpenGraph image absolute URL
    const fullOgImage = ogImage.startsWith('http')
      ? ogImage
      : `https://petzora.shop${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

    // OpenGraph
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:url', url, true);
    updateMeta('og:image', fullOgImage, true);
    updateMeta('og:site_name', 'Petzora', true);
    if (publishedTime) updateMeta('article:published_time', publishedTime, true);
    if (modifiedTime) updateMeta('article:modified_time', modifiedTime, true);
    if (category) updateMeta('article:section', category, true);

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', fullOgImage);
    updateMeta('twitter:site', '@petzorashop');

    // Structured Data (JSON-LD)
    const jsonLdScripts: Record<string, any>[] = [];

    // WebSite & Organization
    jsonLdScripts.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Petzora',
      alternateName: 'Petzora Pet Care & Guides',
      url: 'https://petzora.shop',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://petzora.shop/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    });

    jsonLdScripts.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Petzora',
      url: 'https://petzora.shop',
      logo: 'https://petzora.shop/favicon.ico',
      description: 'Educational pet publishing platform offering dog and cat care advice, nutrition guides, and certified training tips.',
    });

    // Article structured data
    if (ogType === 'article') {
      jsonLdScripts.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: [ogImage],
        datePublished: publishedTime || new Date().toISOString(),
        dateModified: modifiedTime || publishedTime || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: authorName,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Petzora',
          url: 'https://petzora.shop',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        articleSection: category || 'Pet Care',
      });
    }

    // Breadcrumbs structured data
    if (breadcrumbs && breadcrumbs.length > 0) {
      jsonLdScripts.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `https://petzora.shop${crumb.url}`,
        })),
      });
    }

    // FAQ structured data
    if (faqs && faqs.length > 0) {
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

    // Inject JSON-LD
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
    breadcrumbs,
    faqs,
  ]);

  return null;
};
