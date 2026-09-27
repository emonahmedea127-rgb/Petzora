import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, Heart, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general-question',
    petType: 'dog',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Please provide a valid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Please specify a subject';
    if (!formData.message.trim() || formData.message.trim().length < 20) {
      newErrors.message = 'Please provide a message with at least 20 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-8 sm:py-16 space-y-12 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors">
      <SEO
        title="Contact Petzora – Editorial Inquiries, Pet Stories &amp; Advertising"
        description="Get in touch with Petzora (petzora.shop). Share heartwarming pet stories, request veterinary review, or inquire about ethical advertising."
        canonicalUrl="https://petzora.shop/contact"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/60 px-3.5 py-1.5 rounded-full border border-orange-200 dark:border-orange-800 font-semibold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>LET&rsquo;S CONNECT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-stone-900 dark:text-white">
            Get in Touch With Petzora
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            Have a question about dog or cat care? A heartwarming pet adoption story to pitch? Or an advertising inquiry? Our editorial team would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
              <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white">
                Editorial &amp; Business Inquiries
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 dark:text-white font-medium">
                      General &amp; Reader Support
                    </strong>
                    <a href="mailto:support@petzora.shop" className="text-stone-600 dark:text-stone-300 hover:text-orange-600 text-xs">
                      support@petzora.shop
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 dark:text-white font-medium">
                      Veterinary Advisory &amp; Corrections
                    </strong>
                    <a href="mailto:editorial@petzora.shop" className="text-stone-600 dark:text-stone-300 hover:text-orange-600 text-xs">
                      editorial@petzora.shop
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 dark:text-white font-medium">
                      Response Window
                    </strong>
                    <p className="text-xs text-stone-500">
                      Monday &ndash; Friday (within 24 to 48 hours)
                    </p>
                  </div>
                </div>
              </div>

              {/* Note on emergency medical advice */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong>Emergency Notice:</strong> If your pet has ingested a toxic substance, chocolate, lilies, grapes, or is in severe physical pain, please do NOT wait for an email reply. Immediately contact your local 24/7 emergency veterinary hospital or the ASPCA Animal Poison Control Center.
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                    We have received your message regarding &ldquo;{formData.subject}&rdquo;. A member of our Petzora team will respond shortly at <strong>{formData.email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        category: 'general-question',
                        petType: 'dog',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        Your Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        Topic Category
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="general-question">General Pet Question</option>
                        <option value="story-pitch">Pet Story / Adoption Submission</option>
                        <option value="vet-review">Veterinary Fact-Check / Feedback</option>
                        <option value="product-inquiry">Product Guide Suggestion</option>
                        <option value="advertising">Advertising &amp; Sponsorship</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="petType" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        Pet Type
                      </label>
                      <select
                        id="petType"
                        value={formData.petType}
                        onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="dog">Dog / Puppy</option>
                        <option value="cat">Cat / Kitten</option>
                        <option value="both">Both Dogs &amp; Cats</option>
                        <option value="other">Other Pet Companion</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Subject Line *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Question on 10-week Golden Retriever crate routine"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                    {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your thoughts, story details, or question with our editorial team..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Petzora</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
