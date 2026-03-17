'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useAppStore } from '@/store/useAppStore';

/** Props for the ThemeProvider component. */
export interface ThemeProviderProps {
  /** Child components to render */
  children: ReactNode;
}

/**
 * Syncs the Zustand theme setting to the <html> element's class.
 * Applies 'light' class for light theme; dark is the default (no class needed).
 * Adds a temporary transition class during theme switches for smooth colour changes.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useAppStore((s) => s.theme);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const html = document.documentElement;

    if (theme === 'light') {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }

    // Skip transition on initial render — only animate user-initiated switches
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    html.classList.add('theme-transitioning');
    const t = setTimeout(() => html.classList.remove('theme-transitioning'), 500);
    return () => {
      clearTimeout(t);
      html.classList.remove('theme-transitioning');
    };
  }, [theme]);

  return <>{children}</>;
}
