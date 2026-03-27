'use client';

import { useState } from 'react';
import { getPageImagePath, getSurahForPage } from '@/lib/page-utils';
import { surahs } from '@/data/surahs';
import { isIntroPage } from '@/data/intro-pages';

/** Props for the PageImage component. */
export interface PageImageProps {
  /** Page number to display */
  page: number;
}

/**
 * Renders a single Quran transliteration page image.
 * Shows a pulsing skeleton while loading with a smooth fade-in on load.
 * Falls back to a styled placeholder on error.
 */
export function PageImage({ page }: PageImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="page-surface relative" data-testid={`page-image-${page}`}>
      {/* Loading skeleton — sits behind the image, removed after load */}
      {!isLoaded && !hasError && (
        <div className="page-skeleton aspect-[600/850] w-full rounded-sm" />
      )}

      {/* Error state */}
      {hasError && (
        <div
          className="flex flex-col items-center justify-center aspect-[600/850] w-full rounded-sm bg-surface"
          data-testid={`page-placeholder-${page}`}
        >
          <span className="text-sm text-muted">Page could not be loaded</span>
          <button
            type="button"
            onClick={() => {
              setHasError(false);
              setIsLoaded(false);
            }}
            className="mt-3 rounded-lg bg-surface-hover px-4 py-2 text-sm text-accent hover:bg-surface-active transition-colors"
            aria-label="Retry loading page"
          >
            Retry
          </button>
        </div>
      )}

      {/* Page image — fades in over the skeleton */}
      {!hasError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getPageImagePath(page)}
          alt={
            isIntroPage(page)
              ? `Tajweed colour guide and introduction — page ${page} of ${1275}`
              : `Surah ${getSurahForPage(page, surahs).name_english} English transliteration with Tajweed colour coding — page ${page} of ${1275}`
          }
          width={800}
          height={1133}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={isLoaded ? '' : 'absolute inset-0'}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 300ms ease',
          }}
        />
      )}
    </div>
  );
}
