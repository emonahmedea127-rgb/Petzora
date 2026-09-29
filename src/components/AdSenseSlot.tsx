import React, { useEffect, useRef } from 'react';

interface AdSenseSlotProps {
  slotType: 'horizontal-banner' | 'in-article' | 'sidebar-rect' | 'in-feed';
  className?: string;
  slotId?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotType,
  className = '',
  slotId,
}) => {
  const adClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-8415263713133542';
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle && adRef.current && !pushedRef.current) {
        if (adRef.current.children.length === 0) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      }
    } catch {
      // Safe fallback when ad blocker is active or slot already pushed
    }
  }, []);

  const isNumericSlot = slotId && /^\d+$/.test(slotId);

  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 mx-auto w-full transition-all duration-200 overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between px-2 pb-1.5 border-b border-stone-200/60 dark:border-stone-800/60 mb-2">
        <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 dark:text-stone-500">
          Advertisement
        </span>
        <span className="text-[10px] text-stone-400 dark:text-stone-500 font-sans">
          Google AdSense
        </span>
      </div>

      <div
        className={`flex items-center justify-center text-center transition-colors overflow-hidden ${
          slotType === 'horizontal-banner'
            ? 'min-h-[90px] sm:min-h-[100px] max-w-4xl mx-auto'
            : slotType === 'sidebar-rect'
            ? 'min-h-[250px] w-full'
            : slotType === 'in-article'
            ? 'min-h-[120px] max-w-2xl mx-auto'
            : 'min-h-[100px] w-full'
        }`}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client={adClientId}
          {...(isNumericSlot ? { 'data-ad-slot': slotId } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
};
