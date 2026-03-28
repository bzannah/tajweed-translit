'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/** Props for the PageTransition component. */
export interface PageTransitionProps {
  /** Current page number — triggers transition when changed */
  page: number;
  /** Content to render for a given page number */
  children: (page: number) => React.ReactNode;
  /** Maximum duration of the exit animation in ms (default 300) */
  durationMs?: number;
}

/**
 * Wraps page content with a subtle fade/slide transition between pages.
 * Uses a two-layer system: the new page is always visible underneath,
 * and the old page animates away on top. Maximum animation duration is 300ms.
 *
 * Respects prefers-reduced-motion by skipping animation entirely.
 */
export function PageTransition({
  page,
  children,
  durationMs = 300,
}: PageTransitionProps) {
  const [exitingPage, setExitingPage] = useState<number | null>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const prevPageRef = useRef(page);
  const animatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lockedDimensions = useRef<{ width: number; height: number } | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (page === prevPageRef.current) return;

    if (prefersReducedMotion) {
      prevPageRef.current = page;
      return;
    }

    if (!animatingRef.current) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        lockedDimensions.current = { width: rect.width, height: rect.height };
        containerRef.current.style.width = `${rect.width}px`;
        containerRef.current.style.height = `${rect.height}px`;
      }

      setDirection(page > prevPageRef.current ? 'forward' : 'backward');
      setExitingPage(prevPageRef.current);
      animatingRef.current = true;
    }

    prevPageRef.current = page;
  }, [page, prefersReducedMotion]);

  const handleAnimationEnd = useCallback(() => {
    setExitingPage(null);
    animatingRef.current = false;

    if (containerRef.current) {
      containerRef.current.style.width = '';
      containerRef.current.style.height = '';
      lockedDimensions.current = null;
    }
  }, []);

  const clampedDuration = Math.min(durationMs, 300);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', overflow: 'hidden' }}
      data-testid="page-transition"
    >
      {/* LAYER 1 (BACK): Current page — always visible */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: lockedDimensions.current?.width ?? undefined,
          height: lockedDimensions.current?.height ?? undefined,
        }}
      >
        {children(page)}
      </div>

      {/* LAYER 2 (FRONT): Exiting page — animates away then removed */}
      {exitingPage !== null && (
        <div
          className={
            direction === 'forward'
              ? 'page-exit-forward'
              : 'page-exit-backward'
          }
          onAnimationEnd={handleAnimationEnd}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: lockedDimensions.current?.width ?? '100%',
            height: lockedDimensions.current?.height ?? '100%',
            zIndex: 2,
            animationDuration: `${clampedDuration}ms`,
          }}
        >
          {children(exitingPage)}
        </div>
      )}
    </div>
  );
}
