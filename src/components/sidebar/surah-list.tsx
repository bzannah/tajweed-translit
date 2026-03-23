'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { surahs } from '@/data/surahs';
import { isIntroPage } from '@/data/intro-pages';
import { getSurahForPage } from '@/lib/page-utils';
import { SurahItem } from './surah-item';

/**
 * Scrollable list of all 114 surahs.
 * Auto-scrolls to the active surah when the page changes or sidebar opens.
 */
export function SurahList() {
  const currentPage = useAppStore((s) => s.currentPage);
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setCurrentPage = useAppStore((s) => s.setCurrentPage);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);
  const listRef = useRef<HTMLDivElement>(null);

  const activeSurah = getSurahForPage(currentPage, surahs);

  // Auto-scroll to active surah on page change or sidebar open
  useEffect(() => {
    const activeEl = document.querySelector('[data-active-surah="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [currentPage, sidebarOpen]);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div ref={listRef} className="flex-1 overflow-y-auto scrollbar-thin scroll-fade" data-testid="surah-list">
      {/* Tajweed Guide entry — navigates to intro pages */}
      <button
        type="button"
        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 ${
          isIntroPage(currentPage)
            ? 'bg-surface-active text-accent'
            : 'text-secondary hover:bg-surface-hover'
        }`}
        onClick={() => handleClick(1)}
        aria-current={isIntroPage(currentPage) ? 'page' : undefined}
      >
        <span className="flex h-5 w-8 items-center justify-center text-muted">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        </span>
        <span className="flex-1 text-sm italic">Tajweed Guide</span>
        <span className="text-xs text-muted">1</span>
      </button>
      <div className="mx-3 border-b border-border" />

      {surahs.map((surah) => {
        const isActive = surah.number === activeSurah.number;
        return (
          <div key={surah.number} data-active-surah={isActive || undefined}>
            <SurahItem
              surah={surah}
              isActive={isActive}
              onClick={() => handleClick(surah.starting_page)}
            />
          </div>
        );
      })}
    </div>
  );
}
