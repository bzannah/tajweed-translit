'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { surahs } from '@/data/surahs';
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
