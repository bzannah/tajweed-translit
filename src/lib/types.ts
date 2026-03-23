// ─── Content Data (from JSON files) ─────────────────────────

/** Represents one of the 114 surahs (chapters) of the Quran. */
export interface Surah {
  /** Surah number (1-114) */
  number: number;
  /** English transliterated name (e.g., "Al-Fatiha") */
  name_english: string;
  /** Arabic name (e.g., "الفاتحة") */
  name_arabic: string;
  /** English meaning of the name (e.g., "The Opening") */
  name_meaning: string;
  /** Where the surah was revealed */
  revelation_type: 'meccan' | 'medinan';
  /** Page number where this surah starts (1-indexed) */
  starting_page: number;
  /** Total number of verses in this surah */
  total_verses: number;
}

/** Represents one of the 30 juz (parts) of the Quran. */
export interface Juz {
  /** Juz number (1-30) */
  number: number;
  /** Arabic name of the juz */
  name_arabic: string;
  /** English transliterated name of the juz */
  name_english: string;
  /** Page number where this juz starts */
  starting_page: number;
  /** Surah number where this juz starts */
  starting_surah: number;
  /** Verse number within the starting surah */
  starting_verse: number;
}

/** Maps a single page to its surah(s) and verse range(s). */
export interface PageMapping {
  /** Page number (1-1275) */
  page: number;
  /** Juz number this page belongs to */
  juz: number;
  /** Surah content on this page (may span multiple surahs) */
  content: PageContent[];
}

/** A surah's verse range on a single page. */
export interface PageContent {
  /** Surah number */
  surah: number;
  /** Surah name (English) */
  surah_name: string;
  /** Surah name (Arabic) */
  surah_name_arabic?: string;
  /** First verse number on this page for this surah */
  start_verse: number;
  /** Last verse number on this page for this surah */
  end_verse: number;
}

/** A Tajweed recitation rule with colour coding information. */
export interface TajweedRule {
  /** Unique identifier (e.g., "madd-necessary") */
  id: string;
  /** Display name in English */
  name: string;
  /** Arabic name */
  name_arabic: string;
  /** CSS hex colour value */
  colour: string;
  /** Tailwind CSS class for this colour */
  tailwind_class: string;
  /** Short description */
  description: string;
  /** Detailed explanation for the explanation panel */
  explanation: string;
  /** Duration in harakah counts, if applicable */
  duration?: string;
}

// ─── User Data (persisted to localStorage) ──────────────────

/** A user-saved bookmark for a specific page. */
export interface Bookmark {
  /** Unique identifier (UUID v4) */
  id: string;
  /** Bookmarked page number */
  page: number;
  /** Surah number for display context */
  surah_number: number;
  /** Surah name for display context */
  surah_name: string;
  /** Optional user-provided label */
  label?: string;
  /** ISO 8601 timestamp when created */
  created_at: string;
}

/** A user's note attached to a specific page. */
export interface Note {
  /** Unique identifier (UUID v4) */
  id: string;
  /** Page number the note is attached to */
  page: number;
  /** Note content (plain text) */
  content: string;
  /** ISO 8601 timestamp when created */
  created_at: string;
  /** ISO 8601 timestamp when last updated */
  updated_at: string;
}

// ─── UI / Derived Types ─────────────────────────────────────

/** Contextual information about what's on the current page. */
export interface PageContext {
  /** The primary surah content on this page */
  primarySurah: PageContent;
  /** Juz number this page belongs to */
  juz: number;
  /** Page number */
  page: number;
}

/** Sidebar tab options. */
export type SidebarTab = 'suras' | 'juz' | 'bookmarks';

/** Feature panel that can be open (or null for none). */
export type FeaturePanel =
  | 'explanation'
  | 'translation'
  | 'audio'
  | 'settings'
  | 'notes'
  | null;

/** Display mode for the page viewer. */
export type DisplayMode = 'single' | 'dual' | 'auto';

/** Theme option. */
export type Theme = 'dark' | 'light';
