'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { useResponsiveMode } from '@/hooks/use-responsive-mode';
import { useKeyboardNav } from '@/hooks/use-keyboard-nav';
import { useAppStore } from '@/store/useAppStore';
import { DUAL_BREAKPOINT } from '@/lib/constants';
import { TopBar } from './top-bar';
import { Sidebar } from './sidebar';
import { BottomBar } from './bottom-bar';
import { ZoomControls } from './zoom-controls';
import { ExplanationPanel } from '@/components/features/explanation-panel';
import { TranslationPanel } from '@/components/features/translation-panel';
import { AudioPlayer } from '@/components/features/audio-player';
import { SettingsPanel } from '@/components/features/settings-panel';
import { NotesEditor } from '@/components/features/notes-editor';
import { ResumeToast } from '@/components/ui/resume-toast';
import { DonationBanner } from '@/components/ui/donation-banner';

/** Props for the AppShell component. */
export interface AppShellProps {
  /** Page content to render in the main area */
  children: ReactNode;
}

/**
 * Main application shell that composes the layout.
 * Flex row: [sidebar | right-column]. On desktop the sidebar is in-flow and
 * pushes the content over. On mobile it's a fixed overlay.
 */
export function AppShell({ children }: AppShellProps) {
  const isDualMode = useResponsiveMode();
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  useKeyboardNav(isDualMode);

  // Close sidebar on mobile at first mount — it defaults to open (correct for desktop).
  // useLayoutEffect runs before browser paint, preventing any visible flash.
  const didInit = useRef(false);
  useLayoutEffect(() => {
    if (!didInit.current) {
      didInit.current = true;
      if (window.innerWidth < DUAL_BREAKPOINT) {
        useAppStore.getState().setSidebarOpen(false);
      }
    }
  }, []);

  return (
    <div className="flex h-dvh bg-bg" data-testid="app-shell">
      {/* Sidebar — in-flow on desktop, overlay on mobile */}
      <Sidebar />

      {/* Right column — everything except the sidebar */}
      <div className="app-right-col flex min-w-0 flex-1 flex-col" data-sidebar-open={sidebarOpen || undefined}>
        <TopBar />
        <DonationBanner />

        {/* Main content */}
        <main className="reading-surface flex flex-1 flex-col overflow-hidden p-0" id="main-content">
          {children}
        </main>

        <BottomBar />
      </div>

      {/* Feature panels — portalled over everything */}
      <ExplanationPanel />
      <TranslationPanel />
      <AudioPlayer />
      <SettingsPanel />
      <NotesEditor />

      <ResumeToast />
      <ZoomControls />
    </div>
  );
}
