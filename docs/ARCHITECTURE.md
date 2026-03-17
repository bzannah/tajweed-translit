# Architecture Decisions

## ADR-001: Next.js 15 with App Router
- SSG gives instant page loads from CDN with zero server cost
- File-based routing maps to `/page/[number]`
- `next/image` handles WebP conversion and responsive sizing
- SEO: server-rendered HTML for surah landing pages

## ADR-002: Pre-convert PDFs to WebP Images
- Serve images, NOT PDFs. A WebP (100-200KB) loads 5-10x faster than PDF.js (~2MB library)
- No Arabic text rendering inconsistencies across browsers
- CDN-friendly, trivially cacheable
- Build pipeline: `content/pdfs/*.pdf` → `scripts/convert-pdfs.ts` → `public/pages/*.webp`
- Trade-off: no text selection. Acceptable for specialised transliteration content

## ADR-003: Tailwind CSS 4
- Dark-first design with CSS custom properties
- Utility-first approach simplifies responsive sidebar/content layout
- Purged CSS = tiny bundle

## ADR-004: Zustand + localStorage
- ~1KB bundle, no Redux boilerplate
- `persist` middleware auto-syncs to localStorage
- State is flat and simple — no server state in v1

## ADR-005: Vercel Deployment
- Zero config for Next.js, global CDN, free tier sufficient
- Preview deployments on every PR

## ADR-006: Al Quran Cloud API for Audio
- No audio hosting burden (2-5GB+ for full Quran)
- Multiple reciters available
- Per-verse audio for future enhancements
- Graceful fallback if API is unavailable

## ADR-007: Vitest + Playwright
- Vitest: fast, ESM-native, compatible with React Testing Library
- Playwright: cross-browser E2E, screenshot comparison for visual regression

## ADR-008: Static JSON for Content Data
- Data is small (~50KB total) and static
- Type-safe imports in TypeScript
- Version controlled, build-time validation
