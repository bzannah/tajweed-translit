import { useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { getNextPage, getPreviousPage } from '@/lib/page-utils';

const SWIPE_THRESHOLD = 50; // Minimum swipe distance in pixels
const SWIPE_MAX_Y = 100; // Maximum vertical deviation

/**
 * Handles touch swipe gestures for page navigation on mobile.
 * Swipe left = next page, swipe right = previous page.
 *
 * @param isDualMode - Whether dual-page display is active
 * @param containerRef - Ref to the swipeable container element
 */
export function useSwipeNav(
  isDualMode: boolean,
  containerRef: React.RefObject<HTMLElement | null>
): void {
  const currentPage = useAppStore((s) => s.currentPage);
  const setCurrentPage = useAppStore((s) => s.setCurrentPage);
  const activePanel = useAppStore((s) => s.activePanel);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStart.current || activePanel) return;

      const touch = e.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = Math.abs(touch.clientY - touchStart.current.y);

      touchStart.current = null;

      // Ignore if vertical movement is too large (user is scrolling)
      if (deltaY > SWIPE_MAX_Y) return;

      // Ignore if horizontal movement is too small
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

      if (deltaX < 0) {
        // Swipe left → next page
        const next = getNextPage(currentPage, isDualMode);
        if (next !== null) setCurrentPage(next);
      } else {
        // Swipe right → previous page
        const prev = getPreviousPage(currentPage, isDualMode);
        if (prev !== null) setCurrentPage(prev);
      }
    },
    [currentPage, isDualMode, setCurrentPage, activePanel]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef, handleTouchStart, handleTouchEnd]);
}
