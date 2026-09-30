import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, CheckCircle2, Heart, Scale } from 'lucide-react';
import { SEO } from '../components/SEO';

export const EditorialPolicyPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F2] dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Editorial Policy &amp; Fact-Checking Standards | Petzora"
        description="Learn how Petzora researches, writes, fact-checks, and medically reviews dog and cat care guides to ensure accuracy, safety, and Fear-Free welfare."
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
          <p className="text-xs font-mono text-stone-500">Last Updated: March 2026 &bull; Domain: petzora.shop &bull; Committed to Evidence-Based Welfare</p>
        </header>

        <article className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>At <strong>Petzora</strong> (petzora.shop), our primary mission is to empower pet parents with accurate, compassionate, and science-grounded information. We recognize that pet care decisions directly impact the physical safety, mental wellness, and lifespan of animal family members.</p>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">1. The Veterinary Medical Review Process</h2>
          <p>All content touching upon animal health, toxic foods, emergency symptoms, medication cautions, and nutritional physiology is evaluated for clinical accuracy.</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Our health articles are authored or reviewed by licensed veterinary professionals (DVMs or equivalent).</li>
            <li>We do not promote unverified home remedies, non-scientific viral trends, or dangerous nutritional deprivation.</li>
            <li>We cross-reference peer-reviewed veterinary literature (e.g., AVMA, AAHA, ACVIM guidelines).</li>
          </ul>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">2. Fear-Free Positive Reinforcement Philosophy</h2>
          <p>Petzora strictly champions modern behavioral science. We do not publish, endorse, or promote training methods founded on intimidation, shock collars, prong collars, physical dominance, or "alpha dog" debunked theories. Our trainers (certified under CPDT-KA or KPA-CTP guidelines) advocate positive reinforcement and gentle desensitization that strengthen mutual trust.</p>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">3. Editorial Independence &amp; Commercial Separation</h2>
          <p>Our writers, editors, and veterinary reviewers operate with strict editorial independence:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>No advertiser, pet food manufacturer, or gear company can purchase a positive review or alter our findings.</li>
            <li>If an article includes affiliate links or contextual ads, those relationships are clearly disclosed in accordance with FTC regulations.</li>
            <li>Sponsored content, when present, is unmistakably labeled as &ldquo;Sponsored&rdquo; or &ldquo;Advertisement&rdquo;.</li>
          </ul>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white pt-4">4. Corrections &amp; Feedback Policy</h2>
          <p>Science and veterinary best practices evolve. When new research emerges or if a reader spots a typographical or factual inaccuracy, our editorial team promptly audits and updates the article. You can send correction suggestions to{' '}<a href="mailto:editorial@petzora.shop" className="text-[#D95D39] font-medium underline">editorial@petzora.shop</a>.</p>
        </article>
      </div>
    </div>
  );
};
