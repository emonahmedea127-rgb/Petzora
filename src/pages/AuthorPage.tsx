import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Mail, Globe, ArrowRight, Award, Loader2 } from 'lucide-react';
import { editorialTeam } from '../data/mockData';
import { SEO } from '../components/SEO';
import { SafeImage } from '../components/SafeImage';
import { getPublishedArticles, getAuthors } from '../lib/supabase';
import { Article, Author } from '../types';

export const AuthorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [authors, setAuthors] = useState<Author[]>(editorialTeam);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const [authList, artList] = await Promise.all([
        getAuthors(),
        getPublishedArticles(),
      ]);
      if (mounted) {
        if (authList.length > 0) setAuthors(authList);
        setArticles(artList);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const author = authors.find((a) => a.slug === slug) || authors[0] || editorialTeam[0];
  const authorArticles = articles.filter(
    (a) =>
      a.author.id === author.id ||
      a.author.slug === author.slug ||
      a.author.name.toLowerCase() === author.name.toLowerCase()
  );

  return (
    <div className="py-8 sm:py-12 space-y-12 bg-stone-50 dark:bg-stone-950 min-h-screen text-stone-900 dark:text-stone-100 transition-colors">
      <SEO
        title={`${author.name} – ${author.role || 'Contributor'} | Petzora Editorial`}
        description={author.bio || 'Read articles and guides published by this Petzora contributor.'}
        ogImage={author.avatar || '/images/author-clara.webp'}
        canonicalUrl={`https://www.petzora.shop/author/${author.slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Editorial Team', url: '/about' },
          { name: author.name, url: `/author/${author.slug}` },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-6 sm:p-10 lg:p-12 shadow-md">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative shrink-0">
              <SafeImage
                src={author.avatar || '/images/author-clara.webp'}
                alt={author.name}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover ring-4 ring-orange-500/30 shadow-xl"
                priority={true}
                fallbackSrc="/images/author-clara.webp"
              />
            </div>

            <div className="space-y-4 text-center md:text-left flex-1">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-700 dark:text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Petzora Editorial Contributor</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 dark:text-white">
                  {author.name}
                </h1>
                {author.role && (
                  <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-1">
                    {author.role}
                  </p>
                )}
                {author.credentials && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-1">
                    {author.credentials}
                  </p>
                )}
              </div>

              {author.bio && (
                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                  {author.bio}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono hover:bg-orange-100 dark:hover:bg-orange-950/60 hover:text-orange-700 transition"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </a>
                )}
                {author.website && (
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono hover:bg-orange-100 dark:hover:bg-orange-950/60 hover:text-orange-700 transition"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
            <h2 className="font-serif font-black text-2xl text-stone-900 dark:text-white">
              Guides Published by {author.name} ({authorArticles.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center flex items-center justify-center gap-2 text-xs text-stone-500 font-mono">
              <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
              <span>Loading author guides...</span>
            </div>
          ) : authorArticles.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                No guides published under this author profile yet.
              </p>
              <p className="text-xs text-stone-500">
                New articles assigned to {author.name} in the CMS will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
                >
                  <Link
                    to={`/${article.category}/${article.slug}`}
                    className="block relative aspect-video overflow-hidden"
                  >
                    <SafeImage
                      src={article.featuredImage}
                      alt={article.imageAlt || article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      fallbackSrc="/images/pet-fallback.webp"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold uppercase">
                        {article.category}
                      </span>
                    </div>
                  </Link>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                        <Link to={`/${article.category}/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                      <span>{article.readingTime}</span>
                      <Link
                        to={`/${article.category}/${article.slug}`}
                        className="font-semibold text-orange-600 hover:underline flex items-center gap-1"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6 pt-6">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
              Other Editorial Contributors
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {authors
              .filter((a) => a.id !== author.id && a.slug !== author.slug)
              .map((other) => (
                <Link
                  key={other.id || other.slug}
                  to={`/author/${other.slug}`}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-orange-500/50 hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <SafeImage
                    src={other.avatar || '/images/author-clara.webp'}
                    alt={other.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-orange-500/20"
                    loading="lazy"
                    fallbackSrc="/images/author-clara.webp"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors text-base">
                      {other.name}
                    </h4>
                    {other.role && (
                      <p className="text-xs text-orange-600 dark:text-orange-400 mt-0.5 truncate">
                        {other.role}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 transition shrink-0" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};