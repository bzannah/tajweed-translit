import type { StateCreator } from 'zustand';
import type { Theme, DisplayMode } from '@/lib/types';
import { DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM, DEFAULT_RECITER } from '@/lib/constants';

export interface SettingsSlice {
  /** Colour theme */
  theme: Theme;
  /** Page display mode */
  displayMode: DisplayMode;
  /** Zoom level as percentage (50-200) */
  zoomLevel: number;
  /** Selected audio reciter identifier */
  audioReciter: string;
  /** Set the colour theme */
  setTheme: (theme: Theme) => void;
  /** Set the page display mode */
  setDisplayMode: (mode: DisplayMode) => void;
  /** Set the zoom level, clamped to valid range */
  setZoomLevel: (level: number) => void;
  /** Set the audio reciter */
  setAudioReciter: (reciter: string) => void;
}

export const createSettingsSlice: StateCreator<
  SettingsSlice,
  [],
  [],
  SettingsSlice
> = (set) => ({
  theme: 'dark',
  displayMode: 'auto',
  zoomLevel: DEFAULT_ZOOM,
  audioReciter: DEFAULT_RECITER,

  setTheme: (theme) => set({ theme }),

  setDisplayMode: (mode) => set({ displayMode: mode }),

  setZoomLevel: (level) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, level));
    set({ zoomLevel: clamped });
  },

  setAudioReciter: (reciter) => set({ audioReciter: reciter }),
});
