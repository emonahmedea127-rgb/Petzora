import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, Heart, FileText } from 'lucide-react';
import { SEO } from '../components/SEO';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-16 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Veterinary Medical &amp; Advertising Disclaimer | Petzora"
        description="Official veterinary medical disclaimer, advertising disclosure, and terms of informational use for Petzora (petzora.shop)."
        canonicalUrl="https://petzora.shop/disclaimer"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Disclaimer', url: '/disclaimer' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-stone-200 dark:border-stone-800 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/60 px-3.5 py-1.5 rounded-full border border-orange-200 dark:border-orange-800 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LEGAL &amp; HEALTH TRANSPARENCY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Veterinary &amp; Advertising Disclaimer
          </h1>
          <p className="text-xs font-mono text-stone-500">
            Last Updated: March 2026 &bull; Domain: petzora.shop
          </p>
        </div>

        {/* 1. Veterinary Medical Disclaimer */}
        <section className="space-y-4">
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
              <strong className="font-serif font-bold text-base block">
                Educational Information Only &ndash; Not Medical Advice
              </strong>
              <p>
                The articles, guides, infographics, feeding calculators, and advice published on <strong>Petzora</strong> (petzora.shop) are intended for educational and informational purposes only. They are not intended as a substitute for professional veterinary diagnosis, consultation, examination, or medical treatment.
              </p>
            </div>
          </div>

          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Always seek the advice of your licensed veterinarian, veterinary emergency hospital, or certified veterinary specialist with any questions regarding your pet&apos;s specific medical condition, medication dosage, dietary transition, or physical injury. Never delay seeking professional veterinary care because of something you have read on Petzora.
          </p>
        </section>

        {/* 2. Emergency Health Situations */}
        <section className="space-y-4 border-t border-stone-200 dark:border-stone-800 pt-8">
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white">
            Emergency Health Situations
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            If your dog, cat, puppy, or kitten experiences acute distress—such as breathing difficulties, seizures, suspected toxin ingestion (e.g. chocolate, xylitol, rodenticide, lilies, grapes), bloating with non-productive retching, severe trauma, or sudden inability to urinate—please contact your nearest emergency animal clinic or call the <strong>ASPCA Animal Poison Control Center</strong> (888-426-4435) or <strong>Pet Poison Helpline</strong> (855-764-7661) immediately.
          </p>
        </section>

        {/* 3. Advertising & Google AdSense Disclosure */}
        <section className="space-y-4 border-t border-stone-200 dark:border-stone-800 pt-8">
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white">
            Advertising &amp; Google AdSense Disclosure
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            To support our ongoing original pet care research, editorial team, and hosting costs, Petzora displays third-party contextual advertisements, including advertisements served through Google AdSense and certified digital advertising partners.
          </p>
          <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-300 list-disc list-inside">
            <li>
              All advertising units are clearly demarcated with the label &ldquo;Advertisement&rdquo; or &ldquo;Sponsored&rdquo;.
            </li>
            <li>
              Advertisers have zero control or influence over our veterinary health assessments, product reviews, or nutritional advice.
            </li>
            <li>
              Third-party ad networks may use cookies and web beacons to serve ads based on prior visits to our website or other sites on the internet.
            </li>
          </ul>
        </section>

        {/* 4. Product Testing & Recommendations */}
        <section className="space-y-4 border-t border-stone-200 dark:border-stone-800 pt-8">
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white">
            Product Recommendations &amp; Affiliate Disclosure
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            From time to time, Petzora may participate in legitimate pet retailer affiliate programs. When you click on product links in our buyer&apos;s guides and complete a purchase, we may receive a small commission at no additional cost to you. We only recommend harnesses, toys, beds, and grooming tools that meet our strict safety and durability criteria.
          </p>
        </section>

        {/* 5. Limitation of Liability */}
        <section className="space-y-4 border-t border-stone-200 dark:border-stone-800 pt-8 text-xs text-stone-500 leading-relaxed">
          <h3 className="font-serif font-bold text-stone-800 dark:text-stone-200 text-sm">
            Limitation of Liability
          </h3>
          <p>
            Under no circumstances shall Petzora, its founders, veterinarians, trainers, writers, or contributors be held liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or reliance upon information presented on petzora.shop. Pet owners assume full responsibility for the care, health, training, and supervision of their animals.
          </p>
        </section>
      </div>
    </div>
  );
};
