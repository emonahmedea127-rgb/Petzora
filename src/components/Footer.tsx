import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Heart, Award, Mail } from 'lucide-react';

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
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div id="newsletter-section" className="mb-14 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700/80 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#D95D39]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D95D39]/20 text-[#E07A5F] text-xs font-mono font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>JOIN THE PETZORA PACK</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white tracking-tight">
                Everything Your Pet Deserves, Delivered Weekly.
              </h3>
              <p className="text-sm text-stone-300 max-w-xl leading-relaxed">
                Get useful pet care tips, adorable stories and new guides delivered directly to your inbox. Zero marketing spam, ever.
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
                      className="flex-1 px-4 py-3.5 rounded-xl bg-stone-950/90 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#D95D39] focus:ring-1 focus:ring-[#D95D39]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-xl bg-[#D95D39] hover:bg-[#C24D2B] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 shrink-0"
                    >
                      <span>Join Pack</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    By subscribing, you agree to our{' '}
                    <Link to="/privacy-policy" className="underline hover:text-white">Privacy Policy</Link>. Free unsubscription anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-serif font-black tracking-tight text-white uppercase block">
                PETZORA
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#D95D39] uppercase font-bold -mt-1 block">
                CARE BETTER. UNDERSTAND MORE. LOVE DEEPER.
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Petzora (petzora.shop) is a premium pet media publication and care knowledge hub. We provide expert-inspired guides, real pet stories, training tips, nutrition advice, and trusted recommendations for happier dogs, cats, and pet parents.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400 pt-2">
              <span className="flex items-center gap-1.5 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Vet Reviewed
              </span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <Award className="w-4 h-4 text-[#D95D39]" />
                Positive Training
              </span>
            </div>
          </div>

          {/* Column 1: Pet Topics */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Explore Topics
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/dogs" className="hover:text-[#D95D39] transition-colors">
                  Dogs &amp; Puppies
                </Link>
              </li>
              <li>
                <Link to="/cats" className="hover:text-[#D95D39] transition-colors">
                  Cats &amp; Kittens
                </Link>
              </li>
              <li>
                <Link to="/pet-care" className="hover:text-[#D95D39] transition-colors">
                  Care &amp; Grooming
                </Link>
              </li>
              <li>
                <Link to="/health" className="hover:text-[#D95D39] transition-colors">
                  Health &amp; Wellness
                </Link>
              </li>
              <li>
                <Link to="/nutrition" className="hover:text-[#D95D39] transition-colors">
                  Nutrition &amp; Diets
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-[#D95D39] transition-colors">
                  Training &amp; Manners
                </Link>
              </li>
              <li>
                <Link to="/behavior" className="hover:text-[#D95D39] transition-colors font-medium text-stone-300">
                  Pet Behavior Hub &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Reviews & Stories */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Picks &amp; Community
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/reviews" className="hover:text-[#D95D39] transition-colors">
                  Petzora Picks (Reviews)
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-[#D95D39] transition-colors">
                  Pet Stories You’ll Love
                </Link>
              </li>
              <li>
                <Link to="/author/dr-clara-vance" className="hover:text-[#D95D39] transition-colors">
                  Veterinary Advisory Team
                </Link>
              </li>
              <li>
                <Link to="/author/marcus-hayes" className="hover:text-[#D95D39] transition-colors">
                  Canine Behavior Specialists
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-[#D95D39] transition-colors">
                  Sitemap &amp; Crawler Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/about" className="hover:text-[#D95D39] transition-colors">
                  About Petzora
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D95D39] transition-colors">
                  Contact Editorial
                </Link>
              </li>
              <li>
                <Link to="/editorial-policy" className="hover:text-[#D95D39] transition-colors">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link to="/affiliate-disclosure" className="hover:text-[#D95D39] transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#D95D39] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-[#D95D39] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-[#D95D39] transition-colors">
                  Veterinary &amp; Ad Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-[#D95D39] transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Veterinary Medical Disclaimer Banner */}
        <div className="py-6 border-b border-stone-800 text-xs text-stone-400 leading-relaxed">
          <p>
            <strong className="text-stone-300">Veterinary Educational Disclaimer:</strong> Petzora (petzora.shop) provides general educational information and pet care guides for informational purposes only. Petzora does not operate as a veterinary clinic or telemedicine provider. Never ignore or delay professional veterinary medical evaluation, diagnostic testing, or treatment because of something you have read on this site.
          </p>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} Petzora (petzora.shop). All rights reserved. Built with love for pets and their humans.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/editorial-policy" className="hover:text-white transition-colors">Editorial</Link>
            <Link to="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
