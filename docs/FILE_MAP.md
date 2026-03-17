# File Map

Quick reference for where everything lives.

## Root Config
| File | Purpose |
|---|---|
| `CLAUDE.md` | Claude Code instructions (loaded every session) |
| `AGENTS.md` | Cross-tool agent instructions |
| `CLAUDE.local.md` | Personal overrides (gitignored) |
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript strict config |
| `tailwind.config.ts` | Semantic colour tokens |
| `vitest.config.ts` | Test runner config |
| `playwright.config.ts` | E2E test config |
| `next.config.ts` | Next.js static export config |
| `eslint.config.mjs` | Linting rules |
| `.prettierrc` | Formatting rules |

## .claude/rules/ (path-scoped instructions)
| File | Activates On |
|---|---|
| `react-components.md` | `src/components/**/*.tsx` |
| `store-slices.md` | `src/store/**/*.ts` |
| `hooks.md` | `src/hooks/**/*.ts` |
| `testing.md` | `**/*.test.*`, `tests/**/*` |
| `styling.md` | `**/*.css`, `tailwind.config.*` |
| `nextjs-app.md` | `src/app/**/*.tsx` |
| `content-respect.md` | `content/**/*`, `src/data/**/*` |
| `performance.md` | `scripts/**/*`, `next.config.*`, `public/**/*` |

## docs/ (detailed specs for @-reference)
| File | Contains |
|---|---|
| `EXECUTION_PLAN.md` | Phased build checklist (the master plan) |
| `COMPONENT_SPECS.md` | Detailed specs for every component |
| `STYLE_GUIDE.md` | Colours, typography, layout dimensions |
| `DATA_MODEL.md` | TypeScript interfaces, store shape |
| `ARCHITECTURE.md` | ADRs and tech decisions |
| `PRD.md` | Product requirements |
| `SESSION_PROMPTS.md` | Copy-paste prompts for each Claude Code session |
| `TROUBLESHOOTING.md` | Common issues and fixes |
| `FILE_MAP.md` | This file |

## content/data/ (static JSON)
| File | Records |
|---|---|
| `surahs.json` | 114 surahs with page numbers |
| `juz.json` | 30 juz with page numbers |
| `tajweed-rules.json` | 10 colour-coding rules |

## src/ (source code)
| Directory | Contents |
|---|---|
| `app/` | Next.js pages and layouts |
| `components/layout/` | TopBar, Sidebar, BottomBar, ZoomControls |
| `components/sidebar/` | TabSwitcher, SurahList, JuzList, BookmarkList |
| `components/viewer/` | PageViewer, PageImage, DualPageSpread |
| `components/features/` | ExplanationPanel, TranslationPanel, AudioPlayer, SettingsPanel, NotesEditor |
| `components/ui/` | IconButton, Badge, Modal, Tooltip, ThemeProvider |
| `store/` | Zustand store + 5 slices |
| `hooks/` | useKeyboardNav, useSwipeNav, useResponsiveMode, usePageContext, useAudioPlayer |
| `lib/` | types, constants, cn, page-utils, audio-api |
| `data/` | Typed importers for JSON data |

## tests/
| Directory | Runner |
|---|---|
| `unit/` | Vitest |
| `integration/` | Vitest + React Testing Library |
| `e2e/` | Playwright |

## scripts/
| File | Command |
|---|---|
| `validate-data.ts` | `pnpm validate:data` |
| `convert-pdfs.ts` | `pnpm convert:pdfs` |
| `generate-placeholders.ts` | `tsx scripts/generate-placeholders.ts` |
