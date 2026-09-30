import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

export const EditorialPolicyPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F2] dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Editorial Policy &amp; Fact-Checking Standards | Petzora"
        description="Learn how Petzora researches, writes, fact-checks, updates, and clearly scopes dog and cat care guides for accuracy, usefulness, and animal welfare."
        canonicalUrl="https://www.petzora.shop/editorial-policy"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Editorial Policy', url: '/editorial-policy' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D95D39] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>EDITORIAL INTEGRITY &amp; STANDARDS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-stone-900 dark:text-white">Petzora Editorial Policy</h1>
          <p className="text-xs font-mono text-stone-500">Last Updated: September 2026 &bull; Domain: petzora.shop &bull; Committed to Clear, Responsible Pet Education</p>
        </header>

        <article className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>At <strong>Petzora</strong>, our goal is to publish practical, easy-to-understand pet information that helps readers ask better questions and make safer everyday care decisions. Our content is educational and does not replace individualized advice from a veterinarian or other appropriately qualified professional.</p>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">1. Research and Fact-Checking</h2>
          <p>For health, nutrition, toxic-food, emergency-symptom, and behavior topics, our editorial process prioritizes reputable veterinary and animal-welfare references. We aim to distinguish established guidance from general educational context and avoid presenting uncertain claims as fact.</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>We prefer established veterinary organizations, professional guidance, and peer-reviewed or institutionally reviewed sources when available.</li>
            <li>We avoid unsupported home remedies, miracle claims, and advice that could encourage readers to delay urgent veterinary care.</li>
            <li>Health content includes clear reminders to contact a veterinarian when symptoms, poisoning, injury, medication, or diagnosis are involved.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">2. Humane Training and Behavior Guidance</h2>
          <p>Our training and behavior content favors reward-based, low-stress approaches. We do not present intimidation, physical punishment, or dominance-based methods as a default solution. Serious aggression, severe anxiety, or safety risks should be addressed with an appropriately qualified local professional.</p>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">3. Transparency and Commercial Independence</h2>
          <p>Advertising and affiliate relationships do not determine our editorial conclusions.</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Brands cannot purchase a guaranteed positive editorial conclusion.</li>
            <li>Affiliate relationships are disclosed where applicable.</li>
            <li>Sponsored content, if published, is labeled clearly.</li>
            <li>We do not claim professional credentials, product testing, or medical review that did not actually occur.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">4. Corrections and Updates</h2>
          <p>Pet-care guidance changes over time. We may update articles when better information becomes available, when a recommendation changes, or when a reader identifies a factual error. Correction suggestions can be sent to <a href="mailto:editorial@petzora.shop" className="text-[#D95D39] font-medium underline">editorial@petzora.shop</a>.</p>
        </article>
      </div>
    </div>
  );
};
