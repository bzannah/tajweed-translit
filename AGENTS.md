# AGENTS.md — Quran Tajweed Transliteration

Quran transliteration reader with Tajweed colour coding. Next.js 15, TypeScript strict, Tailwind 4, Zustand, pnpm.

## Commands
- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm test` — Vitest unit + integration
- `pnpm test:e2e` — Playwright E2E
- `pnpm lint` — ESLint
- `pnpm format` — Prettier

## Rules
- TypeScript strict, no `any`
- Functional React components only, named exports (except Next.js pages)
- Tailwind utility classes only, dark theme default
- Zustand for state, localStorage for persistence
- Run `pnpm test` after any source change
- Conventional Commits: `feat:`, `fix:`, `chore:`, `test:`

## Architecture
- 1,275 pre-converted WebP page images in `public/pages/`
- Static JSON data in `content/data/`
- All user data client-side (no backend)
- See `docs/` for full specs
