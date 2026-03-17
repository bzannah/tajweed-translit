import { useEffect, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { getNextPage, getPreviousPage } from '@/lib/page-utils';

/**
 * Handles keyboard navigation for page turning.
 * Listens for ArrowLeft, ArrowRight, PageUp, PageDown keys.
 * Respects dual-page mode by advancing/retreating 2 pages when active.
 *
 * @param isDualMode - Whether dual-page display is active
 */
export function useKeyboardNav(isDualMode: boolean): void {
  const currentPage = useAppStore((s) => s.currentPage);
  const setCurrentPage = useAppStore((s) => s.setCurrentPage);
  const activePanel = useAppStore((s) => s.activePanel);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't navigate if a panel/modal is open or user is typing in an input
      if (activePanel) return;
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      switch (event.key) {
        case 'ArrowRight':
        case 'PageDown': {
          event.preventDefault();
          const next = getNextPage(currentPage, isDualMode);
          if (next !== null) setCurrentPage(next);
          break;
        }
        case 'ArrowLeft':
        case 'PageUp': {
          event.preventDefault();
          const prev = getPreviousPage(currentPage, isDualMode);
          if (prev !== null) setCurrentPage(prev);
          break;
        }
        case 'Home': {
          event.preventDefault();
          setCurrentPage(1);
          break;
        }
        case 'End': {
          event.preventDefault();
          setCurrentPage(1275);
          break;
        }
      }
    },
    [currentPage, isDualMode, setCurrentPage, activePanel]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
