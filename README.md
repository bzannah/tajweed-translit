# Quran Tajweed Transliteration

A comprehensive English transliteration of the Quran with Tajweed colour-coded markings, presented in a beautiful, immersive web reading experience.

## About

Quran Tajweed Transliteration renders 1,275 pages of Quran transliteration with full Tajweed colour coding. It mirrors the experience of reading a physical Tajweed Mushaf — but optimised for screens with surah navigation, bookmarks, audio playback, and offline support.

## Mission
Our mission is to help the global community recite the Quran with confidence and precision, bridging language barriers through expert transliteration that honors the rules of Tajweed.

## Features

- **Full Quran** — All 1,275 pages of Tajweed-colour-coded transliteration
- **Surah Navigation** — Browse all 114 surahs with Meccan/Medinan indicators
- **Juz Navigation** — Quick access to all 30 parts
- **Bookmarks** — Save and manage your reading positions
- **Notes** — Add personal notes to any page
- **Audio Playback** — Listen to recitation via Al Quran Cloud API
- **Tajweed Explanation** — Colour-coded rule reference panel
- **Dark/Light Theme** — Immersive dark mode by default
- **Dual-Page Spread** — Book-like reading on desktop
- **Keyboard & Swipe** — Arrow keys, Page Up/Down, touch swipe
- **Resume Reading** — Automatically returns to your last page
- **Responsive** — Full functionality from 320px to ultrawide

## Tech Stack

- **Next.js 15** (App Router, static export)
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **Zustand** (state management with localStorage persistence)
- **Vitest** + **Playwright** (testing)
- **pnpm** (package manager)
- **Vercel** (deployment)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm test` | Run unit + integration tests |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Run Prettier |
| `pnpm validate:data` | Validate JSON data integrity |
| `pnpm convert:pdfs` | Convert source PDFs to WebP images |

## Project Structure

```
tajweed-translit/
├── CLAUDE.md              # Claude Code instructions
├── AGENTS.md              # Cross-tool agent instructions
├── content/data/          # Static JSON data (surahs, juz, tajweed rules)
├── content/pdfs/          # Source PDFs (not in git)
├── docs/                  # Planning and design documents
├── public/pages/          # Pre-converted WebP page images
├── scripts/               # Build scripts (PDF conversion, validation)
├── src/
│   ├── app/               # Next.js pages and layouts
│   ├── components/        # React components
│   ├── data/              # Typed data importers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities, types, constants
│   └── store/             # Zustand store and slices
└── tests/                 # Unit, integration, and E2E tests
```

## Content Setup

Place the 1,275 source PDFs in `content/pdfs/` (named `1.pdf` through `1275.pdf`), then run:

```bash
pnpm convert:pdfs
```

This generates optimised WebP images in `public/pages/`.

## License

All rights reserved. Quranic content is sacred text and must be treated with respect.
