---
paths:
  - "src/store/**/*.ts"
---
# Zustand Store Rules

- Each slice handles one domain: navigation, bookmarks, notes, settings, ui
- Export slice as a function that takes `set` and `get` and returns the slice shape
- Never mutate state directly — always return new objects via `set()`
- Persist user data (bookmarks, notes, settings, lastReadPage) via Zustand `persist` middleware
- Do NOT persist UI state (sidebarOpen, activeTab, activePanel)
- Generate UUIDs for bookmark and note IDs using `crypto.randomUUID()`
- Include timestamps as ISO 8601 strings via `new Date().toISOString()`

## Slice Pattern

```typescript
import { StateCreator } from 'zustand';

export interface BookmarkSlice {
  bookmarks: Bookmark[];
  addBookmark: (page: number, surahName: string, surahNumber: number) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (page: number) => boolean;
}

export const createBookmarkSlice: StateCreator<AppState, [], [], BookmarkSlice> = (set, get) => ({
  bookmarks: [],
  addBookmark: (page, surahName, surahNumber) => {
    const existing = get().bookmarks.find(b => b.page === page);
    if (existing) return;
    set(state => ({
      bookmarks: [...state.bookmarks, {
        id: crypto.randomUUID(),
        page,
        surah_name: surahName,
        surah_number: surahNumber,
        created_at: new Date().toISOString(),
      }],
    }));
  },
  removeBookmark: (id) => set(state => ({
    bookmarks: state.bookmarks.filter(b => b.id !== id),
  })),
  isBookmarked: (page) => get().bookmarks.some(b => b.page === page),
});
```
