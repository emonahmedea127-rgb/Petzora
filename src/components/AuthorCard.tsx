import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe, ShieldCheck, Award } from 'lucide-react';
import { Author } from '../types';
import { SafeImage } from './SafeImage';

interface AuthorCardProps {
  author: Author;
  compact?: boolean;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author, compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <Link to={`/author/${author.slug}`} className="shrink-0 group">
          <SafeImage
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500/20 group-hover:ring-orange-500 transition-all"
            loading="lazy"
            fallbackSrc="/images/author-clara.webp"
          />
        </Link>
        <div>
          <Link
            to={`/author/${author.slug}`}
            className="text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors block"
          >
            {author.name}
          </Link>
          <span className="text-[11px] text-stone-600 dark:text-stone-400 block line-clamp-1">
            {author.role}
          </span>
        </div>
      </div>
    );
  }

  return (
    <section aria-labelledby="author-heading" className="p-6 sm:p-8 rounded-2xl bg-amber-50/50 dark:bg-stone-900/60 border border-amber-900/10 dark:border-stone-800 transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <Link to={`/author/${author.slug}`} className="shrink-0 relative group">
          <SafeImage
            src={author.avatar}
            alt={author.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-orange-500/30 group-hover:ring-orange-500 transition-all shadow-md"
            loading="lazy"
            fallbackSrc="/images/author-clara.webp"
          />
        </Link>
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Reviewed &amp; Authored By</span>
              </div>
              <h2 id="author-heading" className="text-lg font-serif font-bold text-stone-900 dark:text-white">
                <Link to={`/author/${author.slug}`} className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  {author.name}
                </Link>
              </h2>
              {author.credentials && (
                <p className="text-xs font-medium text-stone-600 dark:text-stone-300">
                  {author.credentials}
                </p>
              )}
            </div>
            <Link
              to={`/author/${author.slug}`}
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline"
            >
              View Bio &amp; Articles &rarr;
            </Link>
          </div>

          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
            {author.bio}
          </p>

          <div className="flex items-center gap-3 pt-1">
            {author.socialLinks?.email && (
              <a
                href={`mailto:${author.socialLinks.email}`}
                aria-label={`Email ${author.name}`}
                className="text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {author.socialLinks?.website && (
              <a
                href={author.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name}'s website`}
                className="text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
