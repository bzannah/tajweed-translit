'use client';

import { useState } from 'react';
import { getPageImagePath } from '@/lib/page-utils';
import { usePageContext } from '@/hooks/use-page-context';
import { cn } from '@/lib/cn';

/** Props for the PageImage component. */
export interface PageImageProps {
  /** Page number to display */
  page: number;
}

/**
 * Renders a single Quran transliteration page image.
 * Shows a pulsing skeleton while loading. Falls back to a styled placeholder on error.
 */
export function PageImage({ page }: PageImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { primarySurah } = usePageContext(page);

  if (hasError) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center rounded-xl bg-surface',
          'h-full aspect-[3/4] border border-border'
        )}
        data-testid={`page-placeholder-${page}`}
      >
        <span className="text-6xl font-light text-muted">{page}</span>
        <span className="mt-2 text-sm text-secondary">{primarySurah.surah_name}</span>
        <span className="mt-4 text-xs text-muted">Tajweed Translit</span>
        <button
          type="button"
          onClick={() => {
            setHasError(false);
            setIsLoaded(false);
          }}
          className="mt-4 rounded-lg bg-surface-hover px-4 py-2 text-sm text-accent hover:bg-surface-active transition-colors"
          aria-label="Retry loading page"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="page-surface relative flex items-center justify-center" data-testid={`page-image-${page}`}>
      {/* Loading skeleton — shown until image fires onLoad */}
      {!isLoaded && (
        <div className="page-skeleton aspect-[3/4] w-full rounded-sm" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getPageImagePath(page)}
        alt={`Quran transliteration page ${page}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={isLoaded ? undefined : 'absolute inset-0 opacity-0'}
      />
    </div>
  );
}
