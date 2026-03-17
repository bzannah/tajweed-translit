'use client';

import { useRef, useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useResponsiveMode } from '@/hooks/use-responsive-mode';
import { useSwipeNav } from '@/hooks/use-swipe-nav';
import { PageImage } from './page-image';
import { DualPageSpread } from './dual-page-spread';

/**
 * Orchestrates the page display — single or dual mode based on settings and viewport.
 * Applies zoom transform from the store. Supports swipe navigation.
 * Page turn animation is CSS-only, triggered by React key change.
 */
export function PageViewer() {
  const currentPage = useAppStore((s) => s.currentPage);
  const zoomLevel = useAppStore((s) => s.zoomLevel);
  const isDualMode = useResponsiveMode();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track navigation direction for animation class — purely visual
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const prevPageRef = useRef(currentPage);

  useEffect(() => {
    if (currentPage !== prevPageRef.current) {
      setDirection(currentPage > prevPageRef.current ? 'forward' : 'backward');
      prevPageRef.current = currentPage;
    }
  }, [currentPage]);

  useSwipeNav(isDualMode, containerRef);

  return (
    <div
      ref={containerRef}
      className="main-content w-full"
      data-testid="page-viewer"
    >
      <div className="book-container book-entrance">
        <div
          style={{
            transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
            transformOrigin: 'center center',
          }}
        >
          <div
            key={currentPage}
            className={direction === 'forward' ? 'page-turn-forward' : 'page-turn-backward'}
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
      </div>

      {/* Page indicator with crossfade */}
      <div className="absolute bottom-[60px] left-0 right-0 text-center pointer-events-none">
        <span
          key={currentPage}
          className="page-number-fade inline-block rounded-full bg-bg/80 px-3 py-1 text-muted backdrop-blur-sm"
          style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '0.1em' }}
        >
          &mdash; {currentPage} &mdash;
        </span>
      </div>
    </div>
  );
}
