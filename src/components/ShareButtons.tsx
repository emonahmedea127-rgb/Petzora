import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface ShareButtonsProps {
  url?: string;
  title: string;
  description?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, description }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://petzora.com');

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${currentUrl}`)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-300 mr-2">
        <Share2 className="w-3.5 h-3.5" />
        <span>Share</span>
      </div>

      {/* X / Twitter */}
      <a
        href={shareLinks.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center transition-colors text-xs font-semibold"
      >
        <span className="font-mono text-xs">𝕏</span>
      </a>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center transition-colors text-xs font-semibold"
      >
        <span>WA</span>
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-400 flex items-center justify-center transition-colors text-xs font-semibold"
      >
        <span>FB</span>
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-lg bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-400 flex items-center justify-center transition-colors text-xs font-semibold"
      >
        <span>IN</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        aria-label="Copy link to clipboard"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors text-xs font-medium"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-stone-500" />
            <span className="font-mono text-[11px]">Copy</span>
          </>
        )}
      </button>
    </div>
  );
};
