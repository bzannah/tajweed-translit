import type { StateCreator } from 'zustand';
import type { Bookmark } from '@/lib/types';

export interface BookmarkSlice {
  /** All user bookmarks, sorted by creation date (newest first) */
  bookmarks: Bookmark[];
  /** Add a bookmark for a page. No-op if already bookmarked. */
  addBookmark: (page: number, surahName: string, surahNumber: number) => void;
  /** Remove a bookmark by its ID. */
  removeBookmark: (id: string) => void;
  /** Check if a specific page is bookmarked. */
  isBookmarked: (page: number) => boolean;
  /** Remove all bookmarks. */
  clearBookmarks: () => void;
}

export const createBookmarkSlice: StateCreator<
  BookmarkSlice,
  [],
  [],
  BookmarkSlice
> = (set, get) => ({
  bookmarks: [],

  addBookmark: (page, surahName, surahNumber) => {
    const existing = get().bookmarks.find((b) => b.page === page);
    if (existing) return;

    const bookmark: Bookmark = {
      id: crypto.randomUUID(),
      page,
      surah_name: surahName,
      surah_number: surahNumber,
      created_at: new Date().toISOString(),
    };

    set((state) => ({
      bookmarks: [bookmark, ...state.bookmarks],
    }));
  },

  removeBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    }));
  },

  isBookmarked: (page) => {
    return get().bookmarks.some((b) => b.page === page);
  },

  clearBookmarks: () => {
    set({ bookmarks: [] });
  },
});
