import type { StateCreator } from 'zustand';
import { clampPage } from '@/lib/page-utils';

export interface NavigationSlice {
  /** Current page being viewed */
  currentPage: number;
  /** Last page the user was reading (for resume on next visit) */
  lastReadPage: number;
  /** Navigate to a specific page. Clamps to valid range. */
  setCurrentPage: (page: number) => void;
}

export const createNavigationSlice: StateCreator<
  NavigationSlice,
  [],
  [],
  NavigationSlice
> = (set) => ({
  currentPage: 1,
  lastReadPage: 1,
  setCurrentPage: (page) => {
    const clamped = clampPage(page);
    set({ currentPage: clamped, lastReadPage: clamped });
  },
});
