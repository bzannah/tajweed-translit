# Data Model

## Core Types (`src/lib/types.ts`)

```typescript
// ─── Content Data (from JSON files) ─────────────────────────

export interface Surah {
  number: number;              // 1-114
  name_english: string;        // "Al-Fatiha"
  name_arabic: string;         // "الفاتحة"
  name_meaning: string;        // "The Opening"
  revelation_type: 'meccan' | 'medinan';
  starting_page: number;       // 1-indexed page number
  total_verses: number;
}

export interface Juz {
  number: number;              // 1-30
  name_arabic: string;         // "آلم"
  starting_page: number;
  starting_surah: number;
  starting_verse: number;
}

export interface PageMapping {
  page: number;                // 1-1275
  juz: number;
  content: PageContent[];
}

export interface PageContent {
  surah: number;
  surah_name: string;
  start_verse: number;
  end_verse: number;
}

export interface TajweedRule {
  id: string;
  name: string;
  name_arabic: string;
  colour: string;              // CSS hex colour
  tailwind_class: string;
  description: string;
  explanation: string;
  duration?: string;
}

// ─── User Data (persisted to localStorage) ──────────────────

export interface Bookmark {
  id: string;                  // UUID v4
  page: number;
  surah_number: number;
  surah_name: string;
  label?: string;
  created_at: string;          // ISO 8601
}

export interface Note {
  id: string;                  // UUID v4
  page: number;
  content: string;
  created_at: string;          // ISO 8601
  updated_at: string;          // ISO 8601
}

export interface Settings {
  theme: 'dark' | 'light';
  display_mode: 'single' | 'dual' | 'auto';
  zoom_level: number;          // 50-200
  audio_reciter: string;
}

// ─── Derived / UI Types ─────────────────────────────────────

export interface PageContext {
  primarySurah: PageContent;
  juz: number;
  page: number;
}

export type SidebarTab = 'suras' | 'juz' | 'bookmarks';

export type FeaturePanel = 'explanation' | 'translation' | 'audio' | 'settings' | 'notes' | null;
```

## Constants (`src/lib/constants.ts`)

```typescript
export const TOTAL_PAGES = 1275;
export const TOTAL_SURAHS = 114;
export const TOTAL_JUZ = 30;
export const MIN_ZOOM = 50;
export const MAX_ZOOM = 200;
export const ZOOM_STEP = 10;
export const DEFAULT_ZOOM = 100;
export const PREFETCH_COUNT = 2;
export const STORAGE_KEY = 'tajweed-translit-storage';
export const SIDEBAR_WIDTH = 280;
export const TOPBAR_HEIGHT = 48;
export const BOTTOMBAR_HEIGHT = 56;
export const DUAL_BREAKPOINT = 1024;
```

## Store Shape (`src/store/useAppStore.ts`)

```typescript
export interface AppState {
  // Navigation
  currentPage: number;
  lastReadPage: number;
  setCurrentPage: (page: number) => void;

  // Bookmarks
  bookmarks: Bookmark[];
  addBookmark: (page: number, surahName: string, surahNumber: number) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (page: number) => boolean;

  // Notes
  notes: Note[];
  addNote: (page: number, content: string) => void;
  updateNote: (id: string, content: string) => void;
  removeNote: (id: string) => void;
  getNoteForPage: (page: number) => Note | undefined;

  // Settings
  theme: 'dark' | 'light';
  displayMode: 'single' | 'dual' | 'auto';
  zoomLevel: number;
  audioReciter: string;
  setTheme: (theme: 'dark' | 'light') => void;
  setDisplayMode: (mode: 'single' | 'dual' | 'auto') => void;
  setZoomLevel: (level: number) => void;

  // UI (not persisted)
  sidebarOpen: boolean;
  activeTab: SidebarTab;
  activePanel: FeaturePanel;
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: SidebarTab) => void;
  setActivePanel: (panel: FeaturePanel) => void;
}
```

## Data Relationships

```
Surah (114) ──has many──▶ Pages (via starting_page ranges)
Juz (30) ──has many──▶ Pages (via starting_page ranges)
Page (1275) ──belongs to──▶ 1 Juz
Page (1275) ──contains──▶ 1+ Surahs (via PageMapping.content[])
Page (1275) ──may have──▶ 0+ Bookmarks
Page (1275) ──may have──▶ 0 or 1 Note
```
