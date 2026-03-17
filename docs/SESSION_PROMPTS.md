# Session Prompts for Claude Code

Copy-paste these prompts into Claude Code to execute each phase. Start a new session for each phase to keep context clean.

---

## Session 1 — Scaffold & Config

```
Read @docs/EXECUTION_PLAN.md and complete Phase 0 (Scaffold & Config). The package.json, tsconfig, tailwind config, vitest config, playwright config, and globals.css already exist — review and update them as needed rather than recreating. Install all dependencies with pnpm. Create any missing files. Run pnpm test after creating the page-utils tests to verify everything works. Check off completed items in the execution plan.
```

## Session 2 — Zustand Store

```
Read @docs/EXECUTION_PLAN.md and complete Phase 1 (Zustand Store). The store slices and main store already exist in src/store/ — review them, fix any issues, and ensure they work correctly. The unit tests exist in tests/unit/store/slices.test.ts. Run pnpm test and make all tests pass. Check off completed items.
```

## Session 3 — Layout Shell

```
Read @docs/EXECUTION_PLAN.md and complete Phase 2 (Layout Shell). Read @docs/COMPONENT_SPECS.md and @docs/STYLE_GUIDE.md for exact specifications. Create the root layout, ThemeProvider, TopBar, Sidebar, BottomBar, and ZoomControls. Use the semantic colour system from globals.css. Make it look great in dark mode. Run pnpm test after each major component.
```

## Session 4 — Sidebar Navigation

```
Read @docs/EXECUTION_PLAN.md and complete Phase 3 (Sidebar Navigation). Read @docs/COMPONENT_SPECS.md for component specs. Create TabSwitcher, SurahList, SurahItem, JuzList, JuzItem, BookmarkList, BookmarkItem. Wire everything to the Zustand store. The surah data is in content/data/surahs.json with typed imports in src/data/surahs.ts. Highlight the active surah based on currentPage. Write integration tests. Run pnpm test.
```

## Session 5 — Page Viewer

```
Read @docs/EXECUTION_PLAN.md and complete Phase 4 (Page Viewer). Read @docs/COMPONENT_SPECS.md for specs. Create the page/[number] route, PageViewer, PageImage, DualPageSpread. Note: page images don't exist yet in public/pages/ — create a placeholder component that shows the page number. Use next/image when real images are present. Create the responsive mode hook. Handle invalid URL params. Run pnpm test.
```

## Session 6 — Navigation Logic

```
Read @docs/EXECUTION_PLAN.md and complete Phase 5 (Navigation Logic). Wire Next/Previous buttons, keyboard navigation (arrow keys, page up/down), swipe navigation (touch gestures), and URL updates. The hooks already exist in src/hooks/ — review and integrate them. Disable navigation buttons at boundaries. Run pnpm test.
```

## Session 7 — User Features

```
Read @docs/EXECUTION_PLAN.md and complete Phase 6 (User Features). Wire bookmark toggle in top bar, create NotesEditor modal, create SettingsPanel modal. Implement "continue from last page" on app load. Read @docs/COMPONENT_SPECS.md for exact specs. Run pnpm test.
```

## Session 8 — Rich Features

```
Read @docs/EXECUTION_PLAN.md and complete Phase 7 (Rich Features). Create ExplanationPanel (loads tajweed rules from data), TranslationPanel (v1 placeholder), AudioPlayer with the Al Quran Cloud API client, page transitions, and zoom controls. Handle audio errors gracefully. Run pnpm test.
```

## Session 9 — Polish & E2E

```
Read @docs/EXECUTION_PLAN.md and complete Phase 8 (Polish) and Phase 9 (E2E Tests). Test responsive layouts at all breakpoints. Add accessibility attributes. Add meta tags and SEO. The E2E tests exist in tests/e2e/ — review them, fix any issues, and add any missing tests. Run pnpm test and pnpm build to verify everything works.
```

---

## Tips for Best Results

- Start each session by telling Claude Code to `read @docs/EXECUTION_PLAN.md`
- Use `ultrathink` before complex implementation decisions
- If a session gets long (>50 messages), start a new one for the next phase
- After each session, run `/memory` to check what Claude learned
- If Claude makes a mistake, say "Remember: [correction]" so it saves to auto-memory
