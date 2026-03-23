'use client';

import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { usePageContext } from '@/hooks/use-page-context';
import { TabSwitcher } from '@/components/sidebar/tab-switcher';
import { SurahList } from '@/components/sidebar/surah-list';
import { JuzList } from '@/components/sidebar/juz-list';
import { BookmarkList } from '@/components/sidebar/bookmark-list';

/**
 * Collapsible sidebar with navigation tabs.
 * Desktop (≥1024px): in document flow, pushes content over via width transition.
 * Mobile/Tablet (<1024px): fixed overlay with dark backdrop.
 */
export function Sidebar() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);
  const activeTab = useAppStore((s) => s.activeTab);
  const currentPage = useAppStore((s) => s.currentPage);

  const { primarySurah } = usePageContext(currentPage);

  return (
    <>
      {/* Backdrop overlay — mobile/tablet only */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop fixed inset-0 z-overlay bg-black/50 animate-fade-in"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`sidebar-panel ${sidebarOpen ? 'open' : ''}`}
        data-testid="sidebar"
        aria-label="Navigation sidebar"
      >
        {/* Inner container — always 280px wide, clipped by the outer shell */}
        <div className="sidebar-inner flex h-full w-[280px] flex-col bg-sidebar">
          {/* Header */}
          <div
            className="relative p-3"
            style={{ background: 'rgba(0,0,0,0.15)' }}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-brand text-primary font-bold" style={{ fontSize: '16px' }}>
                  Quran Tajweed Transliteration
                </h2>
                <span className="text-accent" style={{ fontSize: '12px' }}>
                  Surah {primarySurah.surah_name}
                </span>
              </div>
              {/* Close button */}
              <button
                type="button"
                aria-label="Close sidebar"
                onClick={() => setSidebarOpen(false)}
                className="text-muted hover:text-primary transition-colors duration-150 p-1 rounded-md"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <span
              className="mt-2 inline-block text-accent"
              style={{
                fontSize: '11px',
                fontWeight: 500,
                padding: '2px 8px',
                borderRadius: '10px',
                background: 'rgba(212,168,83,0.15)',
                border: '1px solid rgba(212,168,83,0.3)',
              }}
            >
              PAGE {currentPage}
            </span>
          </div>

          {/* Gold gradient divider */}
          <div className="sidebar-divider" />

          {/* Tabs */}
          <TabSwitcher />

          {/* Content based on active tab */}
          {activeTab === 'suras' && <SurahList />}
          {activeTab === 'juz' && <JuzList />}
          {activeTab === 'bookmarks' && <BookmarkList />}

          {/* Support link */}
          <div className="flex-shrink-0 border-t border-border px-4 py-3">
            <Link
              href="/donate"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2 text-sm text-secondary transition-colors hover:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              Support This Project
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
