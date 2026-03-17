'use client';

import { useAppStore } from '@/store/useAppStore';
import { juz as juzData } from '@/data/juz';
import { getJuzForPage } from '@/lib/page-utils';
import { JuzItem } from './juz-item';

/**
 * Scrollable list of all 30 juz.
 * Highlights the currently active juz based on the current page.
 */
export function JuzList() {
  const currentPage = useAppStore((s) => s.currentPage);
  const setCurrentPage = useAppStore((s) => s.setCurrentPage);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);

  const activeJuz = getJuzForPage(currentPage, juzData);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scroll-fade" data-testid="juz-list">
      {juzData.map((j) => (
        <JuzItem
          key={j.number}
          juz={j}
          isActive={j.number === activeJuz}
          onClick={() => handleClick(j.starting_page)}
        />
      ))}
    </div>
  );
}
