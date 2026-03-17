'use client';

import { useAppStore } from '@/store/useAppStore';
import { BookmarkItem } from './bookmark-item';

/**
 * Scrollable list of user bookmarks, sorted newest first.
 * Shows empty state when no bookmarks exist.
 */
export function BookmarkList() {
  const bookmarks = useAppStore((s) => s.bookmarks);
  const removeBookmark = useAppStore((s) => s.removeBookmark);
  const setCurrentPage = useAppStore((s) => s.setCurrentPage);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);

  const handleNavigate = (page: number) => {
    setCurrentPage(page);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-center" data-testid="bookmark-list-empty">
        <p className="text-sm text-muted">
          No bookmarks yet. Tap the bookmark icon to save your place.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin" data-testid="bookmark-list">
      {bookmarks.map((bm) => (
        <BookmarkItem
          key={bm.id}
          bookmark={bm}
          onClick={() => handleNavigate(bm.page)}
          onDelete={() => removeBookmark(bm.id)}
        />
      ))}
    </div>
  );
}
