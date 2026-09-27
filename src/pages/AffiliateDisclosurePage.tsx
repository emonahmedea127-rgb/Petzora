import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { SEO } from '../components/SEO';

export const AffiliateDisclosurePage: React.FC = () => {
  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F2] dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Affiliate Disclosure &amp; Product Recommendations | Petzora"
        description="Full transparency regarding Petzora's participation in pet retailer affiliate programs and our ethical product recommendation standards."
        canonicalUrl="https://petzora.shop/affiliate-disclosure"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Affiliate Disclosure', url: '/affiliate-disclosure' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
            <ShoppingBag className="w-4 h-4" />
            <span>TRANSPARENCY &amp; FTC DISCLOSURE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Petzora Affiliate Disclosure
          </h1>
          <p className="text-xs font-mono text-stone-500">
            Last Updated: March 2026 &bull; Domain: petzora.shop &bull; Committed to Ethical Review Standards
          </p>
        </header>

        <article className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            In compliance with Federal Trade Commission (FTC) guidelines, this page outlines Petzora&apos;s participation in affiliate marketing programs and our commitment to truthful, unbiased pet product recommendations.
          </p>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            1. How Affiliate Links Work on Petzora
          </h2>
          <p>
            Some links on <strong>Petzora</strong> (in our &ldquo;Petzora Picks&rdquo;, reviews, and buyer&apos;s guides) are affiliate links. This means that if you click through an external link and make a purchase from a certified pet retailer, Petzora may earn a small referral commission at <strong>absolutely no additional cost to you</strong>.
          </p>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            2. Our Ethical Product Selection Standards
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>No Pay-for-Play:</strong> Brands cannot pay us for guaranteed inclusion or positive ratings in our &ldquo;Petzora Picks&rdquo; roundups.
            </li>
            <li>
              <strong>Safety First:</strong> We evaluate pet gear (harnesses, beds, water fountains, and puzzle feeders) against animal safety, non-toxic materials, and anatomical comfort.
            </li>
            <li>
              <strong>Clear Pros &amp; Cons:</strong> Every recommendation highlights both strengths and realistic drawbacks so owners can make informed purchases.
            </li>
            <li>
              <strong>Zero Fake Ratings:</strong> We do not fabricate star ratings or claim tests that were not performed.
            </li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            3. Contact Us with Product Feedback
          </h2>
          <p>
            If you purchased a pet item through one of our guides and had a different experience, or if a product quality changed, please let our editorial team know at{' '}
            <a href="mailto:reviews@petzora.shop" className="text-[#D95D39] font-medium underline">
              reviews@petzora.shop
            </a>.
          </p>
        </article>
      </div>
    </div>
  );
};
