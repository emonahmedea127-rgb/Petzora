import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, ArrowRight } from 'lucide-react';
import { allArticles } from '../data/mockData';
import { SEO } from '../components/SEO';
import { SafeImage } from '../components/SafeImage';

export const NotFoundPage: React.FC = () => {
  const recommendedArticles = allArticles.slice(0, 3);

  return (
    <div className="py-12 sm:py-20 space-y-16 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="404 – Page Not Found | Petzora"
        description="The pet guide or article you were looking for cannot be found. Browse trending dog and cat care guides on Petzora."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto shadow-sm">
          <Heart className="w-10 h-10" />
        </div>

        <p className="text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-semibold">
          404 &bull; PAGE NOT FOUND
        </p>

        <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
          Looks Like This Pet Guide Got Lost
        </h1>

        <p className="text-base text-stone-600 dark:text-stone-300 max-w-lg mx-auto leading-relaxed">
          The page or article link you followed may have moved or been updated. Don&rsquo;t worry—our pack has plenty of other helpful pet guides for you.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Back to Petzora Home</span>
          </Link>
        </div>

        {/* Recommended Guides */}
        <div className="pt-16 border-t border-stone-200 dark:border-stone-800 text-left space-y-6">
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white text-center sm:text-left">
            Popular Pet Guides You Might Find Useful
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedArticles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 hover:border-orange-500/30 transition-all hover:shadow-md"
              >
                <Link to={`/${article.category}/${article.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                  <SafeImage
                    src={article.featuredImage}
                    alt={article.imageAlt || article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    fallbackSrc="/images/pet-fallback.webp"
                  />
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 font-semibold">
                      {article.subCategory || article.category}
                    </span>
                    <h3 className="font-serif font-bold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2 mt-0.5 text-sm">
                      <Link to={`/${article.category}/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="pt-2 text-xs text-stone-500 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                    <span>{article.readingTime}</span>
                    <span className="text-orange-600 font-semibold">Read &rarr;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
