'use client';

import type { Bookmark } from '@/lib/types';
import { IconButton } from '@/components/ui/icon-button';

/** Props for the BookmarkItem component. */
export interface BookmarkItemProps {
  /** Bookmark data */
  bookmark: Bookmark;
  /** Click handler for navigation */
  onClick: () => void;
  /** Delete handler */
  onDelete: () => void;
}

/**
 * A single bookmark row in the sidebar list.
 * Shows page number, surah name, relative time, and delete button.
 */
export function BookmarkItem({ bookmark, onClick, onDelete }: BookmarkItemProps) {
  const timeAgo = getRelativeTime(bookmark.created_at);

  return (
    <div className="flex items-center gap-2 px-4 py-2.5 hover:bg-surface-hover transition-colors">
      <button
        type="button"
        onClick={onClick}
        className="flex flex-1 flex-col gap-0.5 text-left"
        aria-label={`Go to page ${bookmark.page} - ${bookmark.surah_name}`}
      >
        <span className="text-sm font-medium text-primary">
          Page {bookmark.page} — {bookmark.surah_name}
        </span>
        <span className="text-xs text-muted">{timeAgo}</span>
      </button>
      <IconButton
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
          </svg>
        }
        label="Delete bookmark"
        onClick={onDelete}
        className="text-muted hover:text-danger"
      />
    </div>
  );
}

/** Returns a human-readable relative time string. */
function getRelativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return new Date(isoDate).toLocaleDateString();
}
