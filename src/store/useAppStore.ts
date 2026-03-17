import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_KEY } from '@/lib/constants';
import {
  createNavigationSlice,
  type NavigationSlice,
} from './slices/navigation-slice';
import {
  createBookmarkSlice,
  type BookmarkSlice,
} from './slices/bookmark-slice';
import { createNotesSlice, type NotesSlice } from './slices/notes-slice';
import {
  createSettingsSlice,
  type SettingsSlice,
} from './slices/settings-slice';
import { createUiSlice, type UiSlice } from './slices/ui-slice';

/** Combined app state from all slices. */
export type AppState = NavigationSlice &
  BookmarkSlice &
  NotesSlice &
  SettingsSlice &
  UiSlice;

/**
 * Main application store.
 * Combines all domain slices and persists user data to localStorage.
 * UI state (sidebar, active panel) is NOT persisted.
 */
export const useAppStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createNavigationSlice(...args),
      ...createBookmarkSlice(...args),
      ...createNotesSlice(...args),
      ...createSettingsSlice(...args),
      ...createUiSlice(...args),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Only persist user data, not UI state
      partialize: (state) => ({
        currentPage: state.currentPage,
        lastReadPage: state.lastReadPage,
        bookmarks: state.bookmarks,
        notes: state.notes,
        theme: state.theme,
        displayMode: state.displayMode,
        zoomLevel: state.zoomLevel,
        audioReciter: state.audioReciter,
      }),
    }
  )
);
