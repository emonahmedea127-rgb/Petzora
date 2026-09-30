import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-16 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Privacy Policy | Petzora (petzora.shop)"
        description="Petzora privacy policy detailing data practices, Google AdSense cookies, analytics, and user privacy protections."
        canonicalUrl="https://www.petzora.shop/privacy-policy"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy-policy' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-white">Privacy Policy</h1>
          <p className="text-xs font-mono text-stone-500">Last Updated: March 2026 &bull; Domain: petzora.shop &bull; Effective Immediately</p>
        </header>
        <article className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>At <strong>Petzora</strong> (accessible from <a href="https://www.petzora.shop" className="text-orange-600 font-medium">https://www.petzora.shop</a>), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and recorded by Petzora and how we utilize it in compliance with global standards, including the EU General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and Google AdSense guidelines.</p>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">1. Information We Collect</h2>
          <p>When you visit Petzora, read our dog and cat guides, subscribe to our pet care newsletter, or send an inquiry through our contact form, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1"><li><strong>Personal Information:</strong> Name and email address when voluntarily provided via newsletter subscription or contact forms.</li><li><strong>Log Data:</strong> Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click paths to analyze readership interest and maintain site performance.</li></ul>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">2. Google AdSense &amp; DoubleClick DART Cookies</h2>
          <p>Google is a third-party advertising vendor on our site. It uses cookies, including DoubleClick DART cookies, to serve relevant advertisements to our site visitors based upon their visit to Petzora and other websites across the internet.</p>
          <p>Visitors may choose to decline or manage personalized advertising cookies by visiting the Google Ad Settings and Privacy Policy at:{' '}<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">https://policies.google.com/technologies/ads</a>.</p>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">3. Cookies and Web Beacons</h2>
          <p>Like any modern website, Petzora uses &lsquo;cookies&rsquo; to store information including visitors&rsquo; preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&rsquo; experience by customizing our web page content based on visitors&rsquo; browser type and other information.</p>
          <p>You can review or adjust your preferences at any time in our{' '}<Link to="/cookie-policy" className="text-orange-600 underline">Cookie Policy</Link>.</p>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">4. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>Under the CCPA, California consumers have the right to request disclosure of categories and specific pieces of personal data collected, request deletion of collected personal data, and opt out of the sale or sharing of their personal data. Petzora does NOT sell personal data to third parties.</p>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">5. GDPR Data Protection Rights</h2>
          <p>We ensure you are fully aware of all your data protection rights. Every user residing in the European Economic Area is entitled to the right to access, rectification, erasure, restrict processing, and data portability.</p>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">6. Children&apos;s Information</h2>
          <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe and guide their online activity. Petzora does not knowingly collect any Personal Identifiable Information from children under the age of 13.</p>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white pt-4">7. Contacting Us About Privacy</h2>
          <p>If you have additional questions or require more information about our Privacy Policy, please contact our Data Protection Officer at:{' '}<a href="mailto:privacy@petzora.shop" className="text-orange-600 font-semibold underline">privacy@petzora.shop</a>.</p>
        </article>
      </div>
    </div>
  );
};
