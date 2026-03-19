# Product Requirements — Quran Tajweed Transliteration

## Problem
Millions of Muslims cannot read Arabic but want to recite the Quran with correct Tajweed pronunciation. Existing transliteration resources are scattered, ugly, ad-heavy, and incomplete.

## Solution
A purpose-built, immersive web reader serving the complete Quran (1,275 pages) in English transliteration with Tajweed colour coding — modelled after physical Tajweed Mushafs.

## Target Users
- New Muslims / reverts learning to recite
- Non-Arab Muslims who cannot read Arabic script
- Tajweed students who need a colour-coded reference
- Anyone wanting transliteration access on the go

## Features (extracted from reference screenshots)

### Navigation Sidebar (left panel)
- App logo + "Quran Tajweed Transliteration" branding
- Page indicator badge ("PAGE 42")
- 3 tabs: **Suras** | **Juz** | **Bookmarks**
- Suras tab: 114 surahs — number, name, Meccan/Medinan icon, starting page. Click navigates.
- Juz tab: 30 juz — number, name, starting page. Click navigates.
- Bookmarks tab: user bookmarks with badge count. Click navigates. Delete supported.
- Sidebar collapsible (X button). Hamburger menu to reopen.
- Overlay on mobile, persistent on desktop (≥1024px)

### Page Viewer (main content)
- Renders high-quality WebP page images (converted from PDFs)
- Dual-page spread on desktop (≥1024px), single page on mobile
- Right page first in dual mode (Mushaf convention)
- Page number displayed below content

### Page Navigation
- Next/Previous buttons in bottom bar
- Keyboard: Arrow keys, Page Up/Down
- Touch: swipe left/right on mobile
- URL-based: `/page/42` for deep linking
- Last-read memory: auto-saves and restores position

### Bottom Action Bar
- **Explanation** — slide-up panel showing Tajweed colour rules
- **Translation** — panel for English meaning (v1: directs to page content)
- **Listen** — audio playback via Al Quran Cloud API
- **Settings** — modal with theme, display mode, clear data, about

### Zoom Controls (bottom-right)
- Zoom in (+), zoom out (-), fit width, fit page
- Zoom level persisted

### Top Bar
- Hamburger menu toggle
- "Quran Tajweed Transliteration" title
- Bookmark current page button
- Notes button (open notes editor for current page)

### Settings
- Dark/light theme toggle (dark is default)
- Single/dual/auto display mode
- Clear all bookmarks (with confirmation)
- Clear all notes (with confirmation)
- About section

## Non-Functional Requirements
- Initial load: < 3 seconds on 4G
- Page navigation: < 500ms perceived
- Lighthouse: ≥ 90 all categories
- Browsers: Chrome, Safari, Firefox, Edge (latest 2)
- Mobile responsive: ≥ 320px
- All data stored client-side (no auth, no backend)

## Out of Scope (v1)
- User accounts / authentication
- Server-side sync
- Verse-by-verse audio sync
- Multi-language translations
- Arabic-only Mushaf mode
- In-app Tajweed course
