'use client';

import { useAppStore } from '@/store/useAppStore';
import { TabSwitcher } from '@/components/sidebar/tab-switcher';
import { SurahList } from '@/components/sidebar/surah-list';
import { JuzList } from '@/components/sidebar/juz-list';
import { BookmarkList } from '@/components/sidebar/bookmark-list';
import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/lib/cn';

/**
 * Collapsible sidebar with navigation tabs.
 * Width: 280px on desktop, full overlay on mobile.
 * Animated slide-in from left.
 */
export function Sidebar() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);
  const activeTab = useAppStore((s) => s.activeTab);
  const currentPage = useAppStore((s) => s.currentPage);

  return (
    <>
      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-overlay bg-black/50 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-sidebar flex h-full w-sidebar flex-col bg-sidebar transition-transform duration-300 ease-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        data-testid="sidebar"
        aria-label="Navigation sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-sm font-semibold text-primary">Tajweed Mushaf</h2>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
              PAGE {currentPage}
            </span>
          </div>
          <IconButton
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
            }
            label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* Ornamental divider */}
        <div className="ornamental-divider" />

        {/* Tabs */}
        <TabSwitcher />

        {/* Content based on active tab */}
        {activeTab === 'suras' && <SurahList />}
        {activeTab === 'juz' && <JuzList />}
        {activeTab === 'bookmarks' && <BookmarkList />}
      </aside>
    </>
  );
}
