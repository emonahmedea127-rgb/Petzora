import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 dark:bg-black text-stone-300 pt-16 pb-12 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Community Banner */}
        <div id="newsletter-section" className="mb-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700/80 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Join 45,000+ Dog &amp; Cat Parents</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Get Practical Pet Care Advice Delivered Every Week.
              </h3>
              <p className="text-sm text-stone-300 max-w-xl leading-relaxed">
                Veterinary-reviewed health guides, gentle training routines, puppy &amp; kitten milestones, and safe nutrition tips. Zero spam, ever.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-xs leading-relaxed">
                    <strong>Welcome to the Petzora pack!</strong> Check your inbox for our <em>Essential First-Week Dog &amp; Cat Checklist</em>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="flex-1 px-4 py-3 rounded-xl bg-stone-950/90 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30"
                    >
                      <span>Join Pack</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    By subscribing, you agree to our{' '}
                    <Link to="/privacy-policy" className="underline hover:text-stone-300">Privacy Policy</Link>. Free unsubscription anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Col 1 & 2: Brand & About Petzora */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <ellipse cx="6" cy="7.5" rx="2" ry="2.8" />
                  <ellipse cx="18" cy="7.5" rx="2" ry="2.8" />
                  <ellipse cx="10" cy="5" rx="2.1" ry="3" />
                  <ellipse cx="14" cy="5" rx="2.1" ry="3" />
                  <path d="M12 10.5c-3.2 0-5.8 2.2-5.8 5.2 0 1.9 1.2 3.8 3.2 4.6 1.6.6 3.6.6 5.2 0 2-.8 3.2-2.7 3.2-4.6 0-3-2.6-5.2-5.8-5.2z" />
                </svg>
              </div>
              <span>Petzora</span>
            </Link>
            <p className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
              Better Care. Happier Pets.
            </p>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Petzora (petzora.shop) is a trustworthy, science-grounded digital publishing platform helping dog and cat owners raise healthier, happier, and well-behaved companions.
            </p>

            <div className="flex items-center gap-4 text-xs text-stone-400 pt-2">
              <span className="flex items-center gap-1.5 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Vet Reviewed
              </span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <Award className="w-4 h-4 text-orange-400" />
                Certified Trainers
              </span>
            </div>
          </div>

          {/* Col 3: Pet Categories */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Pet Topics
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/dogs" className="hover:text-orange-400 transition-colors">
                  Dog Care &amp; Puppies
                </Link>
              </li>
              <li>
                <Link to="/cats" className="hover:text-orange-400 transition-colors">
                  Cat Care &amp; Kittens
                </Link>
              </li>
              <li>
                <Link to="/pet-care" className="hover:text-orange-400 transition-colors">
                  Hygiene &amp; Grooming
                </Link>
              </li>
              <li>
                <Link to="/nutrition" className="hover:text-orange-400 transition-colors">
                  Food &amp; Nutrition Guides
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-orange-400 transition-colors">
                  Positive Training
                </Link>
              </li>
              <li>
                <Link to="/health" className="hover:text-orange-400 transition-colors">
                  Health &amp; Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Guides */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/product-guides" className="hover:text-orange-400 transition-colors">
                  Tested Product Guides
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-orange-400 transition-colors">
                  Heartwarming Pet Stories
                </Link>
              </li>
              <li>
                <Link to="/author/dr-clara-vance" className="hover:text-orange-400 transition-colors">
                  Veterinary Advisory Team
                </Link>
              </li>
              <li>
                <Link to="/author/marcus-hayes" className="hover:text-orange-400 transition-colors">
                  Canine Behavior Specialists
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-orange-400 transition-colors">
                  Sitemap &amp; Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Trust */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors">
                  About Petzora
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-orange-400 transition-colors">
                  Privacy Policy (GDPR/CCPA)
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-orange-400 transition-colors">
                  Veterinary &amp; Ad Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-orange-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Veterinary Medical Disclaimer Banner */}
        <div className="py-6 border-b border-stone-800 text-[11px] text-stone-400 leading-relaxed">
          <p>
            <strong className="text-stone-300">Veterinary Medical Disclaimer:</strong> The educational content published on Petzora (petzora.shop) is for general informational purposes only. It is not intended as a substitute for professional veterinary diagnosis, treatment, or medical advice. Always consult your licensed veterinarian with any questions regarding your pet&apos;s medical conditions, acute symptoms, or dietary changes.
          </p>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} Petzora (petzora.shop). All rights reserved. Built with love for pets and their humans.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-stone-300 transition-colors">Privacy</Link>
            <Link to="/terms-conditions" className="hover:text-stone-300 transition-colors">Terms</Link>
            <Link to="/disclaimer" className="hover:text-stone-300 transition-colors">Disclaimers</Link>
            <Link to="/sitemap" className="hover:text-stone-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
