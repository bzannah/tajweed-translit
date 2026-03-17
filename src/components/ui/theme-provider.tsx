'use client';

import { useEffect, type ReactNode } from 'react';
import { useAppStore } from '@/store/useAppStore';

/** Props for the ThemeProvider component. */
export interface ThemeProviderProps {
  /** Child components to render */
  children: ReactNode;
}

/**
 * Syncs the Zustand theme setting to the <html> element's class.
 * Applies 'light' class for light theme; dark is the default (no class needed).
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
  }, [theme]);

  return <>{children}</>;
}
