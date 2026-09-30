import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { SEO } from '../components/SEO';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-16 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Terms &amp; Conditions | Petzora (petzora.shop)"
        description="Petzora terms and conditions regarding intellectual property, pet care content, user conduct, and website usage."
        canonicalUrl="https://www.petzora.shop/terms-conditions"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Terms & Conditions', url: '/terms-conditions' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-semibold">
            <Scale className="w-4 h-4" />
            <span>TERMS OF SERVICE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs font-mono text-stone-500">
            Last Updated: March 2026 &bull; Domain: petzora.shop &bull; Effective Immediately
          </p>
        </header>

        <article className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            Welcome to <strong>Petzora</strong>. By accessing this website (https://www.petzora.shop), you agree to comply with and be bound by the following terms and conditions of use.
          </p>

          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            1. Intellectual Property &amp; Copyright
          </h2>
          <p>
            Unless otherwise stated, Petzora and its editorial team own the intellectual property rights for all material published on Petzora, including pet guides, canine/feline training routines, nutritional breakdowns, and original photography. All intellectual property rights are reserved. You may view or print pages from Petzora for your own personal, non-commercial pet care reference.
          </p>

          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            2. Veterinary &amp; Informational Scope
          </h2>
          <p>
            The content on Petzora is provided solely for educational and informational purposes. It does not replace individualized diagnosis or treatment from a licensed veterinarian. For full details, please consult our{' '}
            <Link to="/disclaimer" className="text-orange-600 underline">Veterinary &amp; Advertising Disclaimer</Link>.
          </p>

          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            3. Advertising &amp; Third-Party Links
          </h2>
          <p>
            Petzora contains links to third-party pet websites and displays advertisements served by Google AdSense and accredited partners. Petzora is not responsible for the privacy practices, content, or quality of products sold by third-party external services.
          </p>

          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            4. Limitation of Liability
          </h2>
          <p>
            Petzora shall not be held responsible or liable for any adverse health event, physical injury, training dispute, or damages occurring to your animal as a result of implementing advice without veterinary supervision.
          </p>

          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">
            5. Contact Information
          </h2>
          <p>
            For questions regarding these Terms &amp; Conditions, please reach out via email to{' '}
            <a href="mailto:legal@petzora.shop" className="text-orange-600 underline font-medium">
              legal@petzora.shop
            </a>.
          </p>
        </article>
      </div>
    </div>
  );
};
