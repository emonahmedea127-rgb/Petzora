import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  priority?: boolean;
  aspectRatioClass?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/pet-fallback.webp',
  priority = false,
  className = '',
  containerClassName = '',
  loading,
  onError,
  onLoad,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // If the src prop changes externally, reset error and update source
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc !== fallbackSrc && fallbackSrc) {
      // Try fallback image once
      setCurrentSrc(fallbackSrc);
    } else {
      // Both original and fallback failed
      setHasError(true);
    }
    if (onError) {
      onError(e);
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 overflow-hidden select-none p-4 ${containerClassName || className}`}
        role="img"
        aria-label={alt || 'Petzora editorial photo'}
      >
        <PawPrint className="w-8 h-8 mb-1.5 opacity-40 text-orange-500 animate-pulse" />
        <span className="text-[11px] font-medium tracking-wider uppercase text-stone-500 dark:text-stone-400 line-clamp-1 text-center">
          Petzora Journal
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt || 'Petzora pet care photo'}
      loading={priority ? 'eager' : (loading || 'lazy')}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={handleError}
      onLoad={handleLoad}
      className={`${className} ${!isLoaded ? 'bg-stone-100 dark:bg-stone-800' : ''}`}
      {...props}
    />
  );
};
