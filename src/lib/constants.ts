/** Total number of pages in the Quran transliteration. */
export const TOTAL_PAGES = 1275;

/** Total number of surahs in the Quran. */
export const TOTAL_SURAHS = 114;

/** Total number of juz (parts) in the Quran. */
export const TOTAL_JUZ = 30;

/** Minimum zoom level as a percentage. */
export const MIN_ZOOM = 50;

/** Maximum zoom level as a percentage. */
export const MAX_ZOOM = 200;

/** Zoom increment/decrement step as a percentage. */
export const ZOOM_STEP = 10;

/** Default zoom level as a percentage. */
export const DEFAULT_ZOOM = 100;

/** Number of pages to prefetch ahead of the current page. */
export const PREFETCH_COUNT = 2;

/** localStorage key used by Zustand persist middleware. */
export const STORAGE_KEY = 'tajweed-translit-storage';

/** Sidebar width in pixels (desktop). */
export const SIDEBAR_WIDTH = 280;

/** Top bar height in pixels. */
export const TOPBAR_HEIGHT = 54;

/** Bottom bar height in pixels. */
export const BOTTOMBAR_HEIGHT = 64;

/** Viewport width breakpoint for dual-page mode in pixels. */
export const DUAL_BREAKPOINT = 1024;

/** Default starting page (Al-Fatiha) for first-time users and invalid URL fallback. */
export const DEFAULT_PAGE = 5;

/** Default audio reciter identifier for Al Quran Cloud API. */
export const DEFAULT_RECITER = 'ar.alafasy';

/** Base URL for Al Quran Cloud API. */
export const QURAN_API_BASE = 'https://api.alquran.cloud/v1';
