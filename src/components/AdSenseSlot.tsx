import React from 'react';

interface AdSenseSlotProps {
  slotType: 'horizontal-banner' | 'in-article' | 'sidebar-rect' | 'in-feed';
  className?: string;
  slotId?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotType,
  className = '',
  slotId = 'petzora-ad-default',
}) => {
  const adClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  // If real AdSense is configured, this component can render real responsive <ins class="adsbygoogle">
  // Otherwise, render a clean, tasteful, non-intrusive AdSense-compliant placeholder with transparent regulatory labeling.
  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 mx-auto w-full transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between px-2 pb-1.5 border-b border-stone-200/60 dark:border-stone-800/60">
        <span className="text-[10px] uppercase font-mono tracking-widest text-stone-600 dark:text-stone-300">
          Advertisement
        </span>
        <span className="text-[10px] text-stone-500 dark:text-stone-300 font-sans">
          AdSense Ready
        </span>
      </div>

      <div
        className={`mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-center transition-colors ${
          slotType === 'horizontal-banner'
            ? 'min-h-[90px] sm:min-h-[120px] max-w-4xl py-4'
            : slotType === 'sidebar-rect'
            ? 'min-h-[250px] w-full p-4'
            : slotType === 'in-article'
            ? 'min-h-[120px] max-w-2xl py-6 px-4'
            : 'min-h-[100px] w-full py-4'
        }`}
      >
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-stone-200/80 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 text-xs font-mono">
            Ad
          </div>
          <p className="text-xs font-medium text-stone-600 dark:text-stone-300">
            Sponsored Content Placement Area
          </p>
          <p className="text-[11px] text-stone-600 dark:text-stone-300 max-w-md">
            Monetization placeholder (ID: {slotId}). Cleanly separated from interactive controls to ensure zero accidental clicks.
          </p>
        </div>
      </div>
    </aside>
  );
};
