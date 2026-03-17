'use client';

import { useAppStore } from '@/store/useAppStore';
import { useResponsiveMode } from '@/hooks/use-responsive-mode';
import { getNextPage, getPreviousPage } from '@/lib/page-utils';
import { cn } from '@/lib/cn';
import type { FeaturePanel } from '@/lib/types';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  panel: FeaturePanel;
}

/** A single action button in the bottom bar center section. */
function ActionButton({ icon, label, panel }: ActionButtonProps) {
  const activePanel = useAppStore((s) => s.activePanel);
  const togglePanel = useAppStore((s) => s.togglePanel);
  const isActive = activePanel === panel;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => togglePanel(panel)}
      className={cn(
        'flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors duration-150',
        isActive ? 'text-accent' : 'text-muted hover:text-primary'
      )}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}

/**
 * Fixed bottom bar with navigation and action buttons.
 * Height: 56px. Next is on left, Previous on right (Mushaf RTL convention).
 */
export function BottomBar() {
  const currentPage = useAppStore((s) => s.currentPage);
  const setCurrentPage = useAppStore((s) => s.setCurrentPage);
  const isDualMode = useResponsiveMode();

  const nextPage = getNextPage(currentPage, isDualMode);
  const prevPage = getPreviousPage(currentPage, isDualMode);

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-sidebar flex h-bottombar items-center justify-between border-t border-border bg-surface px-2"
      data-testid="bottom-bar"
    >
      {/* Left: Next (Mushaf convention — next page is to the left) */}
      <button
        type="button"
        aria-label="Next page"
        disabled={nextPage === null}
        onClick={() => nextPage !== null && setCurrentPage(nextPage)}
        className={cn(
          'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          nextPage === null
            ? 'cursor-not-allowed opacity-50 text-muted'
            : 'text-primary hover:bg-surface-hover'
        )}
        data-testid="next-page-btn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Next
      </button>

      {/* Center: action buttons */}
      <div className="flex items-center gap-1">
        <ActionButton
          panel="explanation"
          label="Explanation"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
          }
        />
        <ActionButton
          panel="translation"
          label="Translation"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
          }
        />
        <ActionButton
          panel="audio"
          label="Listen"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          }
        />
        <ActionButton
          panel="settings"
          label="Settings"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          }
        />
      </div>

      {/* Right: Previous (Mushaf convention — previous page is to the right) */}
      <button
        type="button"
        aria-label="Previous page"
        disabled={prevPage === null}
        onClick={() => prevPage !== null && setCurrentPage(prevPage)}
        className={cn(
          'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          prevPage === null
            ? 'cursor-not-allowed opacity-50 text-muted'
            : 'text-primary hover:bg-surface-hover'
        )}
        data-testid="prev-page-btn"
      >
        Previous
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}
