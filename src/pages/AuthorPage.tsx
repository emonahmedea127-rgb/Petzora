import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Mail, Globe, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { editorialTeam, allArticles } from '../data/mockData';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const AuthorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Look up author by slug or default to first author (Dr. Clara Vance)
  const author = editorialTeam.find((a) => a.slug === slug) || editorialTeam[0];

  const authorArticles = allArticles.filter((a) => a.author.id === author.id);

  return (
    <div className="py-8 sm:py-12 space-y-12 bg-stone-50 dark:bg-stone-950 min-h-screen text-stone-900 dark:text-stone-100 transition-colors">
      <SEO
        title={`${author.name} – ${author.role} | Petzora Editorial`}
        description={author.bio}
        ogImage={author.avatar}
        canonicalUrl={`https://petzora.shop/author/${author.slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Editorial Team', url: '/about' },
          { name: author.name, url: `/author/${author.slug}` },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Author Profile Header Card */}
        <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-6 sm:p-10 lg:p-12 shadow-md">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative shrink-0">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover ring-4 ring-orange-500/30 shadow-xl"
              />
              <div
                className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white dark:ring-stone-900 shadow"
                title="Verified Pet Care Specialist"
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
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
                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-1">
                  {author.role}
                </p>
                {author.credentials && (
                  <p className="text-xs font-mono text-stone-500 mt-0.5">
                    {author.credentials}
                  </p>
                )}
              </div>

              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                {author.bio}
              </p>

              {/* Stats Bar */}
              <div className="flex items-center justify-center md:justify-start gap-6 pt-2 font-mono text-xs border-t border-stone-100 dark:border-stone-800">
                <div>
                  <span className="font-bold text-stone-900 dark:text-white text-base">
                    {authorArticles.length}
                  </span>
                  <span className="text-stone-500 ml-1.5">Published Guides</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-600 text-base">100%</span>
                  <span className="text-stone-500 ml-1.5">Evidence Based</span>
                </div>
                <div>
                  <span className="font-bold text-orange-600 text-base">Fear-Free</span>
                  <span className="text-stone-500 ml-1.5">Gentle Methods</span>
                </div>
              </div>

              {/* Social / Contact */}
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                {author.socialLinks?.email && (
                  <a
                    href={`mailto:${author.socialLinks.email}`}
                    className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-orange-600 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact Editorial</span>
                  </a>
                )}
                {author.socialLinks?.website && (
                  <a
                    href={author.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-orange-600 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Petzora Profile</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AdSense Slot */}
        <AdSenseSlot slotType="horizontal-banner" slotId="petzora-author-banner" />

        {/* Articles by this author */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span>Guides Written &amp; Reviewed by {author.name}</span>
            </h2>
            <span className="text-xs font-mono text-stone-500">
              {authorArticles.length} Articles
            </span>
          </div>

          {authorArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authorArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 hover:shadow-lg transition-all flex flex-col group"
                >
                  <Link
                    to={`/${article.category}/${article.slug}`}
                    className="block relative aspect-video overflow-hidden"
                  >
                    <img
                      src={article.featuredImage}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold uppercase">
                        {article.subCategory || article.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                        <span>{article.readingTime}</span>
                        <span>•</span>
                        <span>{article.createdAt}</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2">
                        <Link to={`/${article.category}/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-orange-600">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-500">No articles available for this author yet.</p>
          )}
        </div>

        {/* Other Editorial Contributors */}
        <div className="pt-10 border-t border-stone-200 dark:border-stone-800 space-y-6">
          <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white">
            Other Pet Care Specialists &amp; Contributors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editorialTeam
              .filter((a) => a.id !== author.id)
              .map((other) => (
                <Link
                  key={other.id}
                  to={`/author/${other.slug}`}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-orange-500/50 hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <img
                    src={other.avatar}
                    alt={other.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-orange-500/20"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors text-base">
                      {other.name}
                    </h4>
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                      {other.role}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                      {other.credentials || other.bio}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
