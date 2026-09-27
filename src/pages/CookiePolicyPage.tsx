import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { SEO } from '../components/SEO';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-16 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Cookie Policy | Petzora (petzora.shop)"
        description="Learn how Petzora uses cookies, analytics, and advertising tokens, and how you can manage or opt out of tracking."
        canonicalUrl="https://petzora.shop/cookie-policy"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Cookie Policy', url: '/cookie-policy' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-semibold">
            <Cookie className="w-4 h-4" />
            <span>COOKIE MANAGEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-xs font-mono text-stone-500">
            Last Updated: March 2026 &bull; Domain: petzora.shop
          </p>
        </header>

        <article className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            This Cookie Policy explains what cookies are, how <strong>Petzora</strong> (https://petzora.shop) uses cookies and similar technologies, and what you can do to control them.
          </p>

          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files that are stored on your device when you browse websites. They help websites remember your device and preferences (such as light/dark mode choices, reading progress, and search history) across visits.
          </p>

          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            2. Categories of Cookies We Use
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-sm text-stone-900 dark:text-white">A. Strictly Necessary Cookies</h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
                These cookies are required for basic site navigation, theme preferences (light/dark mode toggle), and cookie consent preferences.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-sm text-stone-900 dark:text-white">B. Analytics &amp; Performance Cookies</h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
                We use anonymous analytics to understand how visitors interact with our pet guides, which topics (such as puppy nutrition or cat behavior) are most useful, and where navigation errors occur. All data is aggregated and anonymized.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-sm text-stone-900 dark:text-white">C. Advertising &amp; Google AdSense Cookies</h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
                Our site uses Google AdSense to serve relevant ads. Google and its certified partners use DoubleClick cookies to serve ads based on visits to Petzora and other sites. You can opt out of personalized advertising by visiting{' '}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">aboutads.info</a> or{' '}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">Google Ads Settings</a>.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            3. How to Manage Cookies
          </h2>
          <p>
            Most browsers allow you to refuse or delete cookies through browser settings. For more information, visit <a href="https://allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">allaboutcookies.org</a>.
          </p>
        </article>
      </div>
    </div>
  );
};
