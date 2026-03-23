'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useResponsiveMode } from '@/hooks/use-responsive-mode';
import { useSwipeNav } from '@/hooks/use-swipe-nav';
import { usePageContext } from '@/hooks/use-page-context';
import { getNextPage, getPreviousPage } from '@/lib/page-utils';
import { PageImage } from './page-image';
import { DualPageSpread } from './dual-page-spread';

/**
 * Orchestrates the page display — single or dual mode based on settings and viewport.
 * Applies zoom transform from the store. Supports swipe navigation.
 * Uses a two-layer system for flicker-free page turn animation:
 * the new page is always visible underneath, and the old page animates away on top.
 * Floating Next/Previous buttons flank the book on left/right edges.
 */
export function PageViewer() {
  const currentPage = useAppStore((s) => s.currentPage);
  const setCurrentPage = useAppStore((s) => s.setCurrentPage);
  const zoomLevel = useAppStore((s) => s.zoomLevel);
  const isDualMode = useResponsiveMode();
  const containerRef = useRef<HTMLDivElement>(null);

  // Two-layer animation state
  const [exitingPage, setExitingPage] = useState<number | null>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const prevPageRef = useRef(currentPage);
  const animatingRef = useRef(false);

  // Dimension locking to prevent flicker during page transitions
  const bookRef = useRef<HTMLDivElement>(null);
  const lockedDimensions = useRef<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (currentPage !== prevPageRef.current && !animatingRef.current) {
      // Lock container dimensions before transition starts
      if (bookRef.current) {
        const rect = bookRef.current.getBoundingClientRect();
        lockedDimensions.current = { width: rect.width, height: rect.height };
        bookRef.current.style.width = `${rect.width}px`;
        bookRef.current.style.height = `${rect.height}px`;
      }
      setDirection(currentPage > prevPageRef.current ? 'forward' : 'backward');
      setExitingPage(prevPageRef.current);
      animatingRef.current = true;
      prevPageRef.current = currentPage;
    } else if (currentPage !== prevPageRef.current && animatingRef.current) {
      prevPageRef.current = currentPage;
    }
  }, [currentPage]);

  const handleAnimationEnd = useCallback(() => {
    setExitingPage(null);
    animatingRef.current = false;
    // Unlock dimensions after transition completes
    if (bookRef.current) {
      bookRef.current.style.width = '';
      bookRef.current.style.height = '';
      lockedDimensions.current = null;
    }
  }, []);

  const { primarySurah } = usePageContext(currentPage);
  const nextPage = getNextPage(currentPage, isDualMode);
  const prevPage = getPreviousPage(currentPage, isDualMode);

  // Dynamically set --available-h based on actual container height,
  // so images respond to layout changes (e.g. donation banner) responsively.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const contentH = entry.contentRect.height;
      el.style.setProperty('--available-h', `${contentH - 28}px`);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useSwipeNav(isDualMode, containerRef);

  /** Renders the page content (single or dual) for a given page number. */
  const renderPageContent = (page: number) =>
    isDualMode ? (
      <DualPageSpread page={page} />
    ) : (
      <div className="single-page">
        <PageImage key={page} page={page} />
      </div>
    );

  return (
    <div
      ref={containerRef}
      className="main-content w-full"
      style={{ gap: '10px' }}
      data-testid="page-viewer"
    >
      {/* Nav: Next (LEFT — Mushaf convention) */}
      <button
        type="button"
        className="nav-float"
        aria-label="Next page"
        disabled={nextPage === null}
        onClick={() => nextPage !== null && setCurrentPage(nextPage)}
        data-testid="next-page-btn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Book + surah label */}
      <div className="flex flex-1 flex-col items-center min-w-0 overflow-hidden">
        <div ref={bookRef} className="book-container book-entrance" style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
              transformOrigin: 'center center',
            }}
          >
            {/* LAYER 1 (BACK): Current page — always visible, no animation */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              width: lockedDimensions.current?.width ?? undefined,
              height: lockedDimensions.current?.height ?? undefined,
              minHeight: lockedDimensions.current?.height ?? undefined,
            }}>
              {renderPageContent(currentPage)}
            </div>

            {/* LAYER 2 (FRONT): Previous page — animates away, then removed */}
            {exitingPage !== null && (
              <div
                className={direction === 'forward' ? 'page-exit-forward' : 'page-exit-backward'}
                onAnimationEnd={handleAnimationEnd}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: lockedDimensions.current?.width ?? '100%',
                  height: lockedDimensions.current?.height ?? '100%',
                  zIndex: 2,
                }}
              >
                {renderPageContent(exitingPage)}
              </div>
            )}
          </div>
        </div>

        {/* Surah label below the book */}
        <div
          key={currentPage}
          className="page-number-fade flex flex-shrink-0 items-center gap-3"
          style={{ height: '28px' }}
        >
          <div className="surah-label-line" />
          <div className="flex items-center gap-2">
            {primarySurah.surah_name_arabic && (
              <span className="font-brand text-accent" style={{ fontSize: '15px' }}>
                {primarySurah.surah_name_arabic}
              </span>
            )}
            <span
              className="text-accent"
              style={{ fontSize: '10px', opacity: 0.4 }}
              aria-hidden="true"
            >
              ◆
            </span>
            <span
              className="text-secondary"
              style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {primarySurah.surah_name}
            </span>
          </div>
          <div className="surah-label-line" />
        </div>
      </div>

      {/* Nav: Previous (RIGHT — Mushaf convention) */}
      <button
        type="button"
        className="nav-float"
        aria-label="Previous page"
        disabled={prevPage === null}
        onClick={() => prevPage !== null && setCurrentPage(prevPage)}
        data-testid="prev-page-btn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
