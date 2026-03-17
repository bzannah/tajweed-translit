'use client';

import { useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useResponsiveMode } from '@/hooks/use-responsive-mode';
import { useSwipeNav } from '@/hooks/use-swipe-nav';
import { usePageContext } from '@/hooks/use-page-context';
import { PageImage } from './page-image';
import { DualPageSpread } from './dual-page-spread';

/**
 * Orchestrates the page display — single or dual mode based on settings and viewport.
 * Applies zoom transform from the store. Supports swipe navigation.
 */
export function PageViewer() {
  const currentPage = useAppStore((s) => s.currentPage);
  const zoomLevel = useAppStore((s) => s.zoomLevel);
  const isDualMode = useResponsiveMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const { primarySurah } = usePageContext(currentPage);

  useSwipeNav(isDualMode, containerRef);

  return (
    <div
      ref={containerRef}
      className="flex w-full items-center justify-center overflow-hidden p-2"
      style={{ height: 'calc(100vh - 48px - 56px)', marginTop: '48px', marginBottom: '56px' }}
      data-testid="page-viewer"
    >
      <div className="book-container">
        <div
          style={{
            transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
            transformOrigin: 'center center',
          }}
        >
          {isDualMode ? (
            <DualPageSpread page={currentPage} />
          ) : (
            <div className="single-page">
              <PageImage page={currentPage} />
            </div>
          )}
        </div>
      </div>

      {/* Page indicator */}
      <div className="absolute bottom-[60px] left-0 right-0 text-center pointer-events-none">
        <span className="rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur-sm" style={{ fontFamily: 'Georgia, serif' }}>
          Page {currentPage} — {primarySurah.surah_name}
        </span>
      </div>
    </div>
  );
}
