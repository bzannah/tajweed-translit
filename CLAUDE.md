# Quran Tajweed Transliteration

Quran transliteration reader with Tajweed colour coding. Renders 1,275 pre-converted PDF page images in an immersive reading experience.

## Tech Stack
- Next.js 15 (App Router, static export)
- TypeScript strict, no `any`
- Tailwind CSS 4 (dark theme default)
- Zustand 5 with localStorage persistence
- Vitest + React Testing Library (unit/integration)
- Playwright (E2E)
- pnpm 9

## Commands
- `pnpm install` — install dependencies
- `pnpm dev` — dev server at localhost:3000
- `pnpm build` — production build
- `pnpm test` — run Vitest unit + integration tests
- `pnpm test:e2e` — run Playwright E2E tests
- `pnpm lint` — ESLint check
- `pnpm format` — Prettier format
- `pnpm validate:data` — validate JSON data integrity
- `pnpm convert:pdfs` — convert source PDFs to WebP

## Code Rules
- Use functional React components exclusively
- Named exports for everything except Next.js pages (which need default exports)
- File names: kebab-case (`page-viewer.tsx`, `use-keyboard-nav.ts`)
- Component names: PascalCase (`PageViewer`, `SurahList`)
- Hooks: camelCase with `use` prefix (`useSwipeNav`)
- Props interface: `{ComponentName}Props`, defined above the component
- JSDoc comment on every exported function, component, and hook
- Destructure props in function signature
- Event handlers: `handle` prefix (`handlePageChange`)
- Use `const` by default, `let` only when reassigning. Never `var`
- Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `test:`)

## Architecture Rules
- All state lives in Zustand store slices under `src/store/slices/`
- Persist user data (bookmarks, notes, settings, last page) to localStorage
- Do NOT persist UI state (sidebar open, active panel)
- Page images are static WebP files in `public/pages/1.webp` through `1275.webp`
- Content data lives in `content/data/*.json`, imported via typed wrappers in `src/data/`
- Page numbering is 1-indexed, total 1275 pages. Always clamp to [1, 1275]
- Dual-page spread: right page first (odd), then left page (even) — Mushaf convention

## Testing Rules
- Run `pnpm test` after modifying any source file
- Every Zustand slice action needs a unit test
- Every custom hook needs a unit test
- Every utility function needs a unit test
- Use `describe`/`it` blocks with behaviour-focused names
- No snapshot tests

## Content Respect
- Never alter, truncate, or reorder Quranic content
- Ensure page numbering matches source material exactly
- Use respectful language when referring to the content — this is sacred text

## Key Documentation
- See @docs/EXECUTION_PLAN.md for the phased build sequence with checkboxes
- See @docs/COMPONENT_SPECS.md for detailed component specifications
- See @docs/STYLE_GUIDE.md for visual design extracted from reference screenshots
- See @docs/DATA_MODEL.md for all TypeScript interfaces and JSON schemas
- See @docs/ARCHITECTURE.md for ADRs and tech stack rationale
