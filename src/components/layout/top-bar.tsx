'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { usePageContext } from '@/hooks/use-page-context';
import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/lib/cn';

/** Particle positions for the bookmark burst effect. */
const BURST_PARTICLES = [
  { '--bx': '-12px', '--by': '-18px' },
  { '--bx': '14px', '--by': '-15px' },
  { '--bx': '-8px', '--by': '12px' },
  { '--bx': '16px', '--by': '8px' },
  { '--bx': '0px', '--by': '-22px' },
] as const;

/**
 * Fixed top bar with hamburger menu, app title, and action buttons.
 * Height: 48px. Background: sidebar colour.
 */
export function TopBar() {
  const currentPage = useAppStore((s) => s.currentPage);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const togglePanel = useAppStore((s) => s.togglePanel);
  const addBookmark = useAppStore((s) => s.addBookmark);
  const removeBookmark = useAppStore((s) => s.removeBookmark);
  const isBookmarked = useAppStore((s) => s.isBookmarked);
  const bookmarks = useAppStore((s) => s.bookmarks);
  const getNoteForPage = useAppStore((s) => s.getNoteForPage);

  const { primarySurah } = usePageContext(currentPage);
  const bookmarked = isBookmarked(currentPage);
  const hasNote = !!getNoteForPage(currentPage);
  const [showBurst, setShowBurst] = useState(false);

  // Clear burst after animation completes
  useEffect(() => {
    if (!showBurst) return;
    const t = setTimeout(() => setShowBurst(false), 450);
    return () => clearTimeout(t);
  }, [showBurst]);

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      const bm = bookmarks.find((b) => b.page === currentPage);
      if (bm) removeBookmark(bm.id);
    } else {
      addBookmark(currentPage, primarySurah.surah_name, primarySurah.surah);
      setShowBurst(true);
    }
  };

  return (
    <header
      className="fixed top-0 right-0 left-0 z-sidebar flex h-topbar items-center justify-between bg-sidebar px-3"
      data-testid="top-bar"
    >
      {/* Left: hamburger */}
      <IconButton
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        }
        label="Toggle sidebar"
        onClick={toggleSidebar}
      />

      {/* Center: title */}
      <h1 className="text-lg font-semibold text-accent">Tajweed Translit</h1>

      {/* Right: notes + bookmark */}
      <div className="flex items-center gap-1">
        <div className="relative">
          <IconButton
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            }
            label="Notes"
            onClick={() => togglePanel('notes')}
          />
          {hasNote && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
          )}
        </div>

        <div className="relative">
          <IconButton
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={bookmarked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                className={cn(bookmarked && 'text-accent')}
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
            }
            label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            onClick={handleBookmarkToggle}
            data-testid="bookmark-toggle"
          />
          {/* Particle burst on bookmark */}
          {showBurst &&
            BURST_PARTICLES.map((style, i) => (
              <span
                key={i}
                className="burst-particle"
                style={{
                  top: '50%',
                  left: '50%',
                  animationDelay: `${i * 30}ms`,
                  ...style,
                } as React.CSSProperties}
              />
            ))}
        </div>
      </div>
    </header>
  );
}
