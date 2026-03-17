# Execution Plan — Tajweed Translit

Follow this plan sequentially. Check off each item as you complete it. Do NOT skip ahead. Each phase builds on the previous one.

---

## Phase 0: Scaffold & Config (do this first)

- [x] Run `pnpm init` and set name to `tajweed-translit`, version `1.0.0`
- [x] Run `pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` (accept defaults, use pnpm)
- [x] Install core deps: `pnpm add zustand clsx tailwind-merge`
- [x] Install dev deps: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react playwright @playwright/test`
- [x] Create `src/lib/cn.ts` — export a `cn()` function using `clsx` + `twMerge`
- [x] Configure `vitest.config.ts` with jsdom environment, path aliases matching tsconfig
- [x] Configure `playwright.config.ts` with chromium, webServer pointing to `pnpm dev`
- [x] Add scripts to `package.json`: `test`, `test:watch`, `test:e2e`, `format`, `validate:data`, `convert:pdfs`
- [x] Create `.gitignore` with: `.next`, `node_modules`, `content/pdfs/`, `public/pages/`, `.env`
- [x] Update `tailwind.config.ts` with the semantic colour system from @docs/STYLE_GUIDE.md
- [x] Create `src/app/globals.css` with CSS custom properties from @docs/STYLE_GUIDE.md
- [x] Create `content/data/surahs.json` — copy from @content/data/surahs.json (already provided)
- [x] Create `content/data/juz.json` — copy from @content/data/juz.json (already provided)
- [x] Create `content/data/tajweed-rules.json` — copy from @content/data/tajweed-rules.json (already provided)
- [x] Create `src/lib/types.ts` with all TypeScript interfaces from @docs/DATA_MODEL.md
- [x] Create `src/lib/constants.ts` with TOTAL_PAGES=1275, TOTAL_SURAHS=114, TOTAL_JUZ=30, MIN_ZOOM=50, MAX_ZOOM=200, ZOOM_STEP=10, STORAGE_KEY
- [x] Create typed data importers: `src/data/surahs.ts`, `src/data/juz.ts`, `src/data/tajweed-rules.ts`
- [x] Create `src/lib/page-utils.ts` with: `clampPage()`, `isValidPage()`, `getDualPages()`, `getPageSurah()`
- [x] Write unit tests for `page-utils.ts` — test clamping, dual-page calc, edge cases
- [x] Run `pnpm test` — verify passing

## Phase 1: Zustand Store

- [x] Create `src/store/slices/navigation-slice.ts` — currentPage, lastReadPage, setCurrentPage
- [x] Create `src/store/slices/bookmark-slice.ts` — bookmarks[], addBookmark, removeBookmark, isBookmarked
- [x] Create `src/store/slices/notes-slice.ts` — notes[], addNote, updateNote, removeNote, getNoteForPage
- [x] Create `src/store/slices/settings-slice.ts` — theme, displayMode, zoomLevel, audioReciter, setters
- [x] Create `src/store/slices/ui-slice.ts` — sidebarOpen, activeTab, activePanel, setters
- [x] Create `src/store/useAppStore.ts` — combine all slices, add persist middleware (exclude ui slice)
- [x] Write unit tests for every slice action — especially edge cases (duplicate bookmarks, invalid pages)
- [x] Run `pnpm test` — verify passing

## Phase 2: Layout Shell

- [x] Create `src/app/layout.tsx` — root layout with: ThemeProvider, sidebar slot, main content, bottom bar
- [x] Create `src/components/ui/theme-provider.tsx` — reads theme from store, applies `dark` class to `<html>`
- [x] Create `src/components/layout/top-bar.tsx` — hamburger toggle, app title "Tajweed Translit", bookmark button, notes button
- [x] Create `src/components/layout/sidebar.tsx` — left panel, collapsible, overlay on mobile, persistent on desktop (lg breakpoint)
- [x] Create `src/components/layout/bottom-bar.tsx` — Previous | Explanation | Translation | Listen | Settings | Next
- [x] Create `src/components/layout/zoom-controls.tsx` — zoom in, zoom out, fit width, fit page (positioned bottom-right)
- [x] Style everything using the dark theme from @docs/STYLE_GUIDE.md
- [ ] Verify layout at 320px, 768px, 1024px, 1440px widths
- [x] Run `pnpm test` — verify passing

## Phase 3: Sidebar Navigation

- [x] Create `src/components/sidebar/tab-switcher.tsx` — Suras | Juz | Bookmarks tabs with active state
- [x] Create `src/components/sidebar/surah-list.tsx` — scrollable list of 114 surahs from surahs.json
- [x] Create `src/components/sidebar/surah-item.tsx` — number, name, revelation icon (green=Meccan, red/amber=Medinan), page number
- [x] Create `src/components/sidebar/juz-list.tsx` — scrollable list of 30 juz from juz.json
- [x] Create `src/components/sidebar/juz-item.tsx` — number, name, starting page
- [x] Create `src/components/sidebar/bookmark-list.tsx` — user bookmarks, click to navigate, delete button
- [x] Create `src/components/sidebar/bookmark-item.tsx` — page number, surah name, timestamp, delete
- [x] Wire tab switching to UI store (activeTab)
- [x] Wire surah/juz clicks to navigate (setCurrentPage + router.push)
- [x] Highlight currently active surah based on currentPage using page-surah-map
- [x] Add bookmark count badge to Bookmarks tab
- [x] Add page indicator badge ("PAGE 42") in sidebar header
- [ ] Write integration tests for Sidebar (renders 114 surahs, tab switching, click navigation)
- [x] Run `pnpm test` — verify passing

## Phase 4: Page Viewer

- [x] Create `src/app/page.tsx` — redirects to `/page/{lastReadPage}` or `/page/1`
- [x] Create `src/app/page/[number]/page.tsx` — validates param, renders PageViewer
- [x] Create `src/components/viewer/page-image.tsx` — renders a single WebP page image using next/image
- [x] Create `src/components/viewer/page-viewer.tsx` — orchestrates single vs dual mode based on settings + viewport
- [x] Create `src/components/viewer/dual-page-spread.tsx` — two pages side by side (right=odd, left=even)
- [x] Create `src/hooks/use-responsive-mode.ts` — returns 'single' or 'dual' based on viewport width (1024px breakpoint)
- [x] Implement image lazy loading: current page(s) with priority, prefetch next 2 pages
- [x] Apply zoom level from store via CSS transform on the page container
- [x] Show page number indicator below the content area
- [x] Handle missing images gracefully (placeholder with message)
- [x] Create `src/app/not-found.tsx` — 404 page
- [ ] Write integration tests for PageViewer
- [x] Run `pnpm test` — verify passing

## Phase 5: Navigation Logic

- [x] Wire Next/Previous buttons in bottom-bar to advance/retreat pages (1 in single, 2 in dual)
- [x] Create `src/hooks/use-keyboard-nav.ts` — ArrowLeft, ArrowRight, PageUp, PageDown
- [x] Create `src/hooks/use-swipe-nav.ts` — touch swipe left/right on mobile
- [x] Update URL on page change: `router.push(\`/page/${page}\`, { scroll: false })`
- [x] Save currentPage to store on every navigation (auto-persisted to localStorage)
- [x] Disable Previous on page 1, Next on page 1275
- [x] Handle edge case: dual mode on page 1275 (single page, no partner)
- [ ] Write unit tests for keyboard and swipe hooks
- [x] Run `pnpm test` — verify passing

## Phase 6: User Features

- [x] Wire bookmark button in top-bar: toggle bookmark for current page
- [x] Show filled/unfilled bookmark icon based on isBookmarked(currentPage)
- [x] Create `src/components/features/notes-editor.tsx` — modal with textarea, save/cancel
- [x] Wire notes button in top-bar: open NotesEditor, pre-fill if note exists for page
- [x] Show dot indicator on notes button when current page has a note
- [x] Create `src/components/features/settings-panel.tsx` — modal with:
  - Theme toggle (dark/light)
  - Display mode selector (single/dual/auto)
  - Clear all bookmarks (with confirmation)
  - Clear all notes (with confirmation)
  - About section (version, credits)
- [x] Wire Settings button in bottom-bar to open SettingsPanel
- [x] Implement "Continue from where you left off" — on app load, redirect to lastReadPage
- [x] Run `pnpm test` — verify passing

## Phase 7: Rich Features

- [x] Create `src/components/features/explanation-panel.tsx` — slide-up panel showing Tajweed colour rules from tajweed-rules.json
  - Show colour swatch (circle) + rule name + duration + description for each rule
  - Dismissible: click outside, swipe down, or X button
- [x] Create `src/components/features/translation-panel.tsx` — slide-up panel showing English translation for current page
  - Note: translation text is embedded in the PDF pages already. This panel provides a clean text-only view
  - For v1, show a message directing users to the page content. Full text extraction is Phase 2
- [x] Create `src/lib/audio-api.ts` — client for Al Quran Cloud API (https://api.alquran.cloud/v1/)
  - `getAudioUrl(surah: number, reciter: string): string`
  - `getVerseAudio(surah: number, verse: number, reciter: string): string`
- [x] Create `src/hooks/use-audio-player.ts` — play, pause, stop, isPlaying, isLoading, error state
- [x] Create `src/components/features/audio-player.tsx` — play/pause button, loading spinner, error message with retry
- [x] Wire Listen button in bottom-bar to play audio for current page's surah
- [x] Handle audio API errors gracefully: "Audio unavailable — tap to retry"
- [ ] Create `src/components/viewer/page-transition.tsx` — subtle fade transition between pages (300ms max)
- [x] Wire zoom controls: zoom in (+10%), zoom out (-10%), fit width, fit page
- [x] Persist zoom level to settings store
- [x] Run `pnpm test` — verify passing

## Phase 8: Polish & Responsive

- [ ] Test and fix layout at 320px (iPhone SE)
- [ ] Test and fix layout at 390px (iPhone 14)
- [ ] Test and fix layout at 768px (iPad)
- [ ] Test and fix layout at 1024px (laptop)
- [ ] Test and fix layout at 1440px (desktop)
- [ ] Verify sidebar overlay on mobile, persistent on desktop
- [ ] Verify swipe navigation on mobile
- [ ] Verify keyboard navigation on desktop
- [ ] Add focus management: after page nav, focus moves to main content
- [ ] Add skip-to-content link
- [x] Verify all buttons have aria-labels
- [ ] Verify colour contrast meets WCAG AA in both themes
- [x] Add meta tags: title, description, og:image
- [ ] Create dynamic metadata for `/page/[number]` routes
- [ ] Add `robots.txt` and basic `sitemap.xml`
- [ ] Run Lighthouse audit — target ≥90 in all categories
- [x] Run `pnpm test` — verify passing

## Phase 9: E2E Tests

- [ ] Write Playwright test: full page navigation (next, previous, keyboard, URL)
- [ ] Write Playwright test: surah navigation via sidebar
- [ ] Write Playwright test: bookmark lifecycle (add, verify in list, navigate, delete)
- [ ] Write Playwright test: settings persistence (change theme, reload, verify)
- [ ] Write Playwright test: responsive layout (resize, verify single vs dual)
- [ ] Run `pnpm test:e2e` — verify passing

## Phase 10: Build & Deploy Readiness

- [x] Run `pnpm build` — verify static export succeeds
- [x] Verify all 1275 page routes generate correctly
- [x] Final `pnpm test` — all passing
- [x] Final `pnpm lint` — no errors
- [ ] Update README.md with: project description, screenshots, setup instructions, commands
- [ ] Commit everything with message: `feat: complete Tajweed Translit v1.0`
