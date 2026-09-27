import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, Check, SlidersHorizontal } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    advertising: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem('petzora_cookie_consent');
    if (!consent) {
      // Delay banner slightly so page loads gracefully without immediate popup shock
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'petzora_cookie_consent',
      JSON.stringify({ necessary: true, analytics: true, advertising: true, timestamp: Date.now() })
    );
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem(
      'petzora_cookie_consent',
      JSON.stringify({ necessary: true, analytics: false, advertising: false, timestamp: Date.now() })
    );
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'petzora_cookie_consent',
      JSON.stringify({ ...preferences, timestamp: Date.now() })
    );
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5 shadow-2xl text-stone-800 dark:text-stone-100">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
              Cookie & Privacy Choices
            </h3>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close banner"
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!showPreferences ? (
          <>
            <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300 mb-4">
              Petzora uses cookies to ensure security, understand audience travel interests, and deliver non-intrusive relevant stories. You can manage preferences anytime.{' '}
              <Link
                to="/cookie-policy"
                className="underline hover:text-orange-600 dark:hover:text-orange-400 font-medium"
              >
                Cookie Policy
              </Link>{' '}
              &amp;{' '}
              <Link
                to="/privacy-policy"
                className="underline hover:text-orange-600 dark:hover:text-orange-400 font-medium"
              >
                Privacy Policy
              </Link>.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={handleAcceptAll}
                className="flex-1 min-w-[100px] px-3 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Accept All
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="px-2.5 py-2 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors flex items-center gap-1"
                title="Customize cookie categories"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preferences</span>
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-stone-900 dark:text-white">Strictly Necessary</p>
                <p className="text-[11px] text-stone-500">Core navigation, security, and theme settings</p>
              </div>
              <span className="text-[10px] font-mono font-medium text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">Always On</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-stone-900 dark:text-white">Analytics Cookies</p>
                <p className="text-[11px] text-stone-500">Anonymous traffic measurement &amp; page performance</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="h-4 w-4 rounded accent-orange-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-stone-900 dark:text-white">AdSense / Personalization</p>
                <p className="text-[11px] text-stone-500">Relevant partner content &amp; non-spam advertising</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.advertising}
                onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                className="h-4 w-4 rounded accent-orange-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-3 py-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900"
              >
                Back
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg"
              >
                Save My Choices
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
