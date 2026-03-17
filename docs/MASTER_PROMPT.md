# Master Prompt for Claude Code

Copy everything below the line into Claude Code. This is Session 1 — it will scaffold the project, install deps, wire everything up, verify tests pass, and set the foundation for all subsequent work.

---

## COPY FROM HERE ↓

ultrathink

You are starting a greenfield project called Tajweed Translit — a Quran transliteration reader with Tajweed colour coding. The project skeleton has already been scaffolded with all planning docs, data files, source code foundations, store slices, hooks, tests, and configs. Your job is to make it all work.

**STEP 1 — Orient yourself (do NOT skip this)**

Read these files in order to understand the full picture:
- Read @CLAUDE.md for project rules and conventions
- Read @docs/FILE_MAP.md for a map of every file in the project
- Read @docs/EXECUTION_PLAN.md for the phased build plan with checkboxes
- Read @docs/STYLE_GUIDE.md for the visual design system
- Read @docs/COMPONENT_SPECS.md for detailed specs of every component

**STEP 2 — Bootstrap the project**

The package.json, tsconfig, configs, and many source files already exist. Do the following:

1. Run `pnpm install` to install all dependencies. If any packages have version conflicts, fix them — prefer latest stable versions. If `pnpm` isn't available, install it first.
2. Verify the tsconfig path aliases work by checking that `@/lib/types` resolves.
3. Run `pnpm validate:data` to verify the JSON data files (surahs, juz, tajweed rules) are valid. Fix any issues.
4. Run `pnpm test` to run the unit tests. There are 3 test files:
   - `tests/unit/lib/page-utils.test.ts` — page utility functions
   - `tests/unit/store/slices.test.ts` — all 5 Zustand store slices
   - `tests/unit/data/integrity.test.ts` — data file validation
   Make ALL tests pass. Fix any import issues, type errors, or config problems.
5. Run `pnpm lint` and fix any linting errors.

**STEP 3 — Build the layout shell**

Read @docs/COMPONENT_SPECS.md and @docs/STYLE_GUIDE.md carefully, then build the core layout:

1. Create `src/app/layout.tsx` — root layout with:
   - Import globals.css
   - ThemeProvider that reads theme from Zustand and applies 'dark' or 'light' class to `<html>`
   - Full-height flex layout: TopBar (fixed top) → main content area → BottomBar (fixed bottom)
   - Sidebar component (toggleable)
   
2. Create `src/components/ui/theme-provider.tsx` — client component that syncs Zustand theme to `<html>` class

3. Create `src/components/layout/top-bar.tsx` — fixed top bar with:
   - Left: hamburger menu button (toggles sidebar)
   - Center: "Tajweed Translit" in accent gold
   - Right: notes button + bookmark toggle button
   - Height: 48px, bg-sidebar background
   
4. Create `src/components/layout/sidebar.tsx` — collapsible left panel with:
   - Header: page indicator badge ("PAGE {n}")
   - TabSwitcher with 3 tabs: Suras | Juz | Bookmarks
   - Scrollable list area below tabs
   - Width 280px on desktop, full overlay on mobile
   - Animated slide-in from left
   - Close button (X)
   
5. Create `src/components/layout/bottom-bar.tsx` — fixed bottom bar with:
   - Left: "‹ Next" button (yes, Next is on the LEFT — Mushaf RTL convention)
   - Center: 4 action buttons (Explanation, Translation, Listen, Settings)
   - Right: "Previous ›" button
   - Each action button: icon + label below
   - Disable Next on page 1275, Previous on page 1

6. Create `src/components/layout/zoom-controls.tsx` — fixed bottom-right controls:
   - 4 stacked buttons: zoom in, zoom out, fit width, fit page
   - Hidden on mobile (< 768px)

**STEP 4 — Build the sidebar navigation**

1. Create `src/components/sidebar/tab-switcher.tsx` — 3 tabs with active gold underline
2. Create `src/components/sidebar/surah-list.tsx` + `src/components/sidebar/surah-item.tsx` — renders all 114 surahs from the data. Each row: number, revelation icon (green for Meccan, amber for Medinan), English name, starting page. Click navigates.
3. Create `src/components/sidebar/juz-list.tsx` + `src/components/sidebar/juz-item.tsx` — renders all 30 juz. Click navigates.
4. Create `src/components/sidebar/bookmark-list.tsx` + `src/components/sidebar/bookmark-item.tsx` — renders user bookmarks. Empty state message when no bookmarks.
5. Highlight the currently active surah/juz based on currentPage from the store.
6. Add bookmark count badge to the Bookmarks tab.

**STEP 5 — Build the page viewer**

1. Create `src/app/page.tsx` — home route that redirects to `/page/{lastReadPage}` or `/page/1`
2. Create `src/app/page/[number]/page.tsx` — dynamic route that:
   - Validates the `number` param (redirect invalid to clamped value)
   - Sets currentPage in the store
   - Renders PageViewer
   - Generates metadata with surah name
3. Create `src/components/viewer/page-image.tsx` — renders a single page image. For now, since real WebP images may not exist yet, render a styled placeholder showing the page number with Arabic bismillah styling (dark card with page number, surah name, and "Tajweed Translit" text). When a real image exists at `/pages/{n}.webp`, render it with next/image.
4. Create `src/components/viewer/page-viewer.tsx` — orchestrates single vs dual mode using the useResponsiveMode hook.
5. Create `src/components/viewer/dual-page-spread.tsx` — two pages side by side. Right page first (odd number), left page second (even number).
6. Wire zoom level from store to CSS transform on the page container.
7. Create `src/app/not-found.tsx` — styled 404 page.

**STEP 6 — Wire all navigation**

1. Wire Next/Previous buttons in BottomBar to setCurrentPage
2. Integrate useKeyboardNav hook in the layout
3. Integrate useSwipeNav hook in the page viewer
4. Update URL via router.push on every page change
5. Save lastReadPage on every navigation (auto-persisted via Zustand)

**STEP 7 — Build feature panels**

1. Create `src/components/ui/modal.tsx` — reusable modal with overlay, focus trap, Escape to close
2. Create `src/components/features/explanation-panel.tsx` — slide-up panel listing all tajweed rules with colour swatches
3. Create `src/components/features/settings-panel.tsx` — modal with theme toggle, display mode, clear data buttons
4. Create `src/components/features/notes-editor.tsx` — modal with textarea for page notes
5. Create `src/components/features/audio-player.tsx` — inline bar above BottomBar with play/pause
6. Create `src/components/features/translation-panel.tsx` — v1 placeholder message
7. Wire all buttons in BottomBar and TopBar to their respective panels

**STEP 8 — Verify everything**

1. Run `pnpm test` — all unit tests must pass
2. Run `pnpm lint` — no errors
3. Run `pnpm build` — must build successfully
4. Check off all completed items in @docs/EXECUTION_PLAN.md
5. Tell me what's done and what's left

**IMPORTANT RULES**
- Use the semantic colour system from globals.css (bg-surface, text-primary, text-accent, etc.) — NOT hardcoded colours
- Dark theme is the default. The `:root` CSS vars define dark. `.light` class overrides.
- Every component needs a JSDoc comment
- Every interactive element needs an aria-label
- Use `data-testid` attributes on key containers for E2E tests
- Use the `cn()` utility from `@/lib/cn` for conditional classes
- Access store via `useAppStore(s => s.fieldName)` — never pass store state as deep props
- Add `'use client'` directive to any component that uses hooks, state, or event handlers

Go.
