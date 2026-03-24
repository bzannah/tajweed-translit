import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';

const AUTO_HIDE_MS = 4000;
const MOBILE_BP = 768;

/**
 * Manages mobile toolbar auto-hide behaviour.
 * Toolbars show on page change and tap, then auto-hide after 4 seconds.
 * Pauses auto-hide while a feature panel is open.
 * Only active on viewports narrower than 768px.
 * @returns Whether mobile toolbars are currently visible
 */
export function useMobileToolbar(): boolean {
  const visible = useAppStore((s) => s.mobileToolbarsVisible);
  const setVisible = useAppStore((s) => s.setMobileToolbarsVisible);
  const currentPage = useAppStore((s) => s.currentPage);
  const activePanel = useAppStore((s) => s.activePanel);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobileRef = useRef(false);

  // Detect mobile on mount
  useEffect(() => {
    isMobileRef.current = typeof window !== 'undefined' && window.innerWidth < MOBILE_BP;
  }, []);

  // Auto-hide timer: resets on visibility change, page change, or panel close
  useEffect(() => {
    if (!isMobileRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (visible && !activePanel) {
      timerRef.current = setTimeout(() => setVisible(false), AUTO_HIDE_MS);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [visible, currentPage, activePanel, setVisible]);

  // Show toolbars on page change
  useEffect(() => {
    if (!isMobileRef.current) return;
    setVisible(true);
  }, [currentPage, setVisible]);

  return visible;
}
