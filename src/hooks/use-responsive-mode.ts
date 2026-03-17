import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { DUAL_BREAKPOINT } from '@/lib/constants';

/**
 * Determines whether the page viewer should use single or dual page mode.
 * Accounts for both the user's display mode setting and the viewport width.
 *
 * - 'single': always single page
 * - 'dual': always dual page (even on mobile — user override)
 * - 'auto': dual on desktop (≥1024px), single on mobile
 *
 * @returns Whether dual-page mode should be active
 */
export function useResponsiveMode(): boolean {
  const displayMode = useAppStore((s) => s.displayMode);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const checkWidth = (): void => {
      setIsWide(window.innerWidth >= DUAL_BREAKPOINT);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  switch (displayMode) {
    case 'single':
      return false;
    case 'dual':
      return true;
    case 'auto':
    default:
      return isWide;
  }
}
