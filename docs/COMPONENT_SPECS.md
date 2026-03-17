# Component Specifications

## Layout Components

### TopBar (`src/components/layout/top-bar.tsx`)
- Fixed at top, full width, height 48px
- Dark surface background (`bg-sidebar`)
- Left: hamburger menu icon (☰) — toggles sidebar via `useAppStore`
- Center: "Tajweed Translit" text in accent gold colour
- Right: notes icon (pencil), bookmark icon (flag/bookmark)
- Bookmark icon: filled when current page is bookmarked, outline when not
- Notes icon: small dot indicator when current page has a note
- All icons are 20px, clickable with hover state

### Sidebar (`src/components/layout/sidebar.tsx`)
- Width: 280px on desktop, full-screen overlay on mobile
- Background: `bg-sidebar` (slightly darker than main bg)
- Header section:
  - App logo (small mushaf image) + "Tajweed Mushaf" title
  - "Other Books" link (optional, can be placeholder)
  - Page indicator badge: "📄 PAGE {n}" in a rounded pill
- Below header: TabSwitcher
- Below tabs: scrollable list area (takes remaining height)
- Close button (X circle) in top-right corner
- On mobile: slides in from left with dark overlay behind
- On desktop (≥1024px): persistent, no overlay, toggleable

### BottomBar (`src/components/layout/bottom-bar.tsx`)
- Fixed at bottom, full width, height 56px
- Background: `bg-surface` with top border
- Layout: Previous (left) | center actions | Next (right)
- Center actions: 4 icon buttons evenly spaced:
  1. Explanation (📖 book icon) — label "Explanation"
  2. Translation (🌐 globe icon) — label "Translation"
  3. Listen (▶️ play icon) — label "Listen"
  4. Settings (⚙️ gear icon) — label "Settings"
- Each button: icon + small label text below
- Previous/Next: text buttons with chevron arrows "‹ Next" and "Previous ›"
- Disable Previous when page=1, Next when page=1275

### ZoomControls (`src/components/layout/zoom-controls.tsx`)
- Positioned: fixed bottom-right, above BottomBar, with 16px margin
- Vertical stack of 4 small icon buttons:
  1. Zoom In (+) — increment zoom by 10%
  2. Zoom Out (-) — decrement zoom by 10%
  3. Fit Width (↔) — calculate zoom to fill viewport width
  4. Fit Page (⊡) — calculate zoom to fit entire page in viewport
- Background: semi-transparent dark surface with rounded corners
- Hidden on mobile (< 768px) — use pinch-to-zoom instead

## Sidebar Components

### TabSwitcher (`src/components/sidebar/tab-switcher.tsx`)
- 3 equal-width tabs: "Suras" | "Juz" | "Bookmarks"
- Active tab: accent gold text + bottom border
- Inactive: muted text, hover brightens
- Bookmarks tab shows count badge (e.g., "Bookmarks ¹")

### SurahList (`src/components/sidebar/surah-list.tsx`)
- Scrollable container with all 114 surahs
- Auto-scroll to active surah when page changes
- Each item rendered by SurahItem

### SurahItem (`src/components/sidebar/surah-item.tsx`)
- Layout: `[number] [icon] [name] [page]` in a single row
- Number: right-aligned in 32px width, muted colour
- Icon: green shield (🛡) for Meccan, amber/red icon for Medinan
- Name: English name, primary colour, medium weight
- Page: right-aligned, muted, small text
- Active state: accent background highlight
- Click: navigates to surah's starting page

### JuzList / JuzItem
- Same pattern as SurahList/SurahItem
- 30 items, each showing: "Juz {n}" + starting page
- Active state highlights current juz

### BookmarkList / BookmarkItem
- Renders user's bookmarks sorted by creation date (newest first)
- Each item: page number, surah name, relative time ("2 hours ago")
- Delete button (trash icon) on right side with confirmation
- Click: navigates to bookmarked page
- Empty state: "No bookmarks yet. Tap the bookmark icon to save your place."

## Viewer Components

### PageViewer (`src/components/viewer/page-viewer.tsx`)
- Determines single vs dual mode from settings + viewport
- In single mode: renders one PageImage
- In dual mode: renders DualPageSpread
- Centers content in the available space (between sidebar and edges)
- Applies zoom transform from store
- Has top/bottom padding to avoid overlap with TopBar/BottomBar

### PageImage (`src/components/viewer/page-image.tsx`)
- Renders `<Image>` from next/image pointing to `/pages/{n}.webp`
- Props: page number, priority (boolean for current page)
- Width: 100% of container, max-width 600px in single mode
- Blur placeholder using low-quality image data
- Error state: "Page {n} could not be loaded" with retry link
- Alt text: "Quran transliteration page {n}"

### DualPageSpread (`src/components/viewer/dual-page-spread.tsx`)
- Flexbox row: right page (odd) on right side, left page (even) on left side
- Note: Arabic/Mushaf convention — right page comes first
- Gap: 4px between pages (simulates book gutter)
- Max width: 1200px combined
- If last page is odd (1275), show single page without partner

## Feature Components

### ExplanationPanel (`src/components/features/explanation-panel.tsx`)
- Slide-up panel from bottom, max height 60vh
- Header: "Tajweed Rules" + close (X) button
- Body: list of all tajweed rules from tajweed-rules.json
- Each rule row: colour circle (40px) + name + duration + description
- Group by: Prolongation rules, then other rules
- Background overlay behind panel (click to dismiss)

### TranslationPanel (`src/components/features/translation-panel.tsx`)
- Slide-up panel from bottom, max height 60vh
- Header: "Translation — Surah {name} {startVerse}-{endVerse}" + close button
- Body: for v1, display message: "Translation is displayed alongside the Arabic text on each page. A dedicated text-only translation view is coming in a future update."
- Style matches ExplanationPanel

### AudioPlayer (`src/components/features/audio-player.tsx`)
- Inline bar that appears above BottomBar when active
- Left: play/pause toggle button
- Center: "Playing Surah {name}" text + loading spinner when buffering
- Right: close (X) button to stop and dismiss
- Error state: "Audio unavailable" + retry button
- Uses HTML5 Audio element under the hood

### SettingsPanel (`src/components/features/settings-panel.tsx`)
- Modal dialog, centered, max-width 400px
- Sections:
  1. Theme: toggle switch "Dark" / "Light"
  2. Page Display: radio buttons "Single" / "Dual" / "Auto"
  3. Actions: "Clear All Bookmarks" button (danger), "Clear All Notes" button (danger)
  4. About: "Tajweed Translit v1.0" + credits text
- Danger buttons require confirmation: "Are you sure? This cannot be undone."

### NotesEditor (`src/components/features/notes-editor.tsx`)
- Modal dialog, max-width 500px
- Header: "Notes — Page {n}"
- Body: textarea (4 rows) pre-filled with existing note for this page
- Footer: "Save" button (primary) + "Cancel" button (ghost)
- If no existing note: empty textarea with placeholder "Add your notes for this page..."
- Saving an empty textarea removes the note

## UI Primitives

### IconButton (`src/components/ui/icon-button.tsx`)
- Wraps a button with consistent sizing, padding, hover states
- Props: icon (ReactNode), label (string for aria-label), onClick, disabled, variant ('ghost'|'filled')

### Badge (`src/components/ui/badge.tsx`)
- Small rounded pill with count number
- Props: count (number) — hides when count is 0
- Accent background with dark text

### Modal (`src/components/ui/modal.tsx`)
- Reusable modal with overlay background
- Props: isOpen, onClose, title, children
- Traps focus, closes on Escape key, closes on overlay click
- Animated: fades in/out with 200ms transition

### Tooltip (`src/components/ui/tooltip.tsx`)
- Shows on hover/focus after 500ms delay
- Positioned above or below trigger element
- Max-width 200px, dark surface background, small text
