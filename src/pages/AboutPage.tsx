import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Award, CheckCircle2, Apple, Bone, ArrowRight } from 'lucide-react';
import { editorialTeam } from '../data/mockData';
import { SEO } from '../components/SEO';
import { SafeImage } from '../components/SafeImage';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-16 space-y-16 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="About Petzora – Better Care. Happier Pets. | Editorial Standards & Mission"
        description="Learn about Petzora (petzora.shop), our veterinary advisory team, positive-reinforcement philosophy, and strict factual editorial standards."
        canonicalUrl="https://petzora.shop/about"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About Petzora', url: '/about' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/60 px-3.5 py-1.5 rounded-full border border-orange-200 dark:border-orange-800 font-semibold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>OUR MISSION &amp; COMMITMENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-stone-900 dark:text-white leading-tight">
            Better Care. Happier Pets.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-sans max-w-2xl mx-auto">
            Petzora (<strong>petzora.shop</strong>) is an independent pet publishing platform dedicated to giving dogs, cats, puppies, and kittens the joyful, healthy, and enriched lives they deserve.
          </p>
        </div>

        {/* Visual Break */}
        <div className="rounded-3xl overflow-hidden shadow-xl aspect-[16/9] border border-stone-200 dark:border-stone-800">
          <SafeImage
            src="/images/hero-dog-cat.webp"
            alt="Golden retriever and tabby cat resting cozily at home"
            className="w-full h-full object-cover"
            priority={true}
            fallbackSrc="/images/pet-fallback.webp"
          />
        </div>

        {/* Why Petzora Exists */}
        <section className="space-y-6 text-stone-800 dark:text-stone-200 leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white">
            Why We Founded Petzora
          </h2>
          <p>
            When you welcome a dog or cat into your home, you take on a sacred responsibility. Yet when searching online for answers to basic pet questions—such as whether a houseplant is toxic, how often to feed an 8-week puppy, or why an adult cat stopped using the litter box—pet owners are often met with conflicting rumors, aggressive training myths, or affiliate link mills.
          </p>
          <p>
            We built <strong>Petzora</strong> to be a calm, factual sanctuary for pet parents. We believe in evidence-backed veterinary medicine, compassionate positive reinforcement, transparent ingredient labeling, and deep respect for the animal-human bond.
          </p>
        </section>

        {/* 4 Core Editorial Pillars */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">
            Our 4 Core Editorial Pillars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 dark:text-white text-lg">
                1. Veterinary-Reviewed Health Content
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Health articles, toxic foods lists, and symptom breakdowns are fact-checked against current veterinary consensus before publication.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/70 text-orange-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 dark:text-white text-lg">
                2. Fear-Free Positive Training
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                We never promote shock collars, intimidation, or dominance theories. Our canine and feline behaviorists teach gentle, science-proven communication.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 flex items-center justify-center">
                <Apple className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 dark:text-white text-lg">
                3. Honest Pet Nutrition
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Clear guidance on macronutrients, toxic ingredients to strictly avoid, portion sizing, and age-appropriate feeding schedules.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/70 text-sky-600 flex items-center justify-center">
                <Bone className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 dark:text-white text-lg">
                4. Unbiased Product Guidance
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Our gear and toy recommendations prioritize durability, animal safety, and ergonomic comfort over marketing hype.
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="space-y-6 pt-6 border-t border-stone-200 dark:border-stone-800">
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">
            Meet the Petzora Editorial Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {editorialTeam.map((author) => (
              <div
                key={author.id}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 flex flex-col items-center text-center space-y-3"
              >
                <SafeImage
                  src={author.avatar}
                  alt={author.name}
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-orange-500/30"
                  loading="lazy"
                  fallbackSrc="/images/author-clara.webp"
                />
                <div>
                  <h3 className="font-serif font-bold text-stone-900 dark:text-white text-base">
                    {author.name}
                  </h3>
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                    {author.role}
                  </p>
                  {author.credentials && (
                    <p className="text-[10px] font-mono text-stone-500 mt-0.5">
                      {author.credentials}
                    </p>
                  )}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                  {author.bio}
                </p>
                <Link
                  to={`/author/${author.slug}`}
                  className="text-xs font-semibold text-orange-600 hover:underline pt-2"
                >
                  View Author Profile &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Veterinary Advisory Disclaimer */}
        <section className="p-6 rounded-2xl bg-amber-50 dark:bg-stone-900 border border-amber-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 space-y-2">
          <h4 className="font-serif font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Important Medical &amp; Care Notice</span>
          </h4>
          <p className="leading-relaxed">
            Petzora produces informational and educational content only. We are not a telemedicine clinic or emergency triage service. Always consult your personal veterinarian for diagnoses, prescription medications, or sudden clinical symptoms in your pet.
          </p>
        </section>

        {/* CTA */}
        <div className="pt-6 text-center space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white">
            Have Questions or Pet Care Stories to Share?
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-300">
            We welcome inquiries from fellow animal lovers, certified trainers, and veterinary professionals.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm shadow transition-all flex items-center gap-2"
            >
              <span>Contact Petzora Editorial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
