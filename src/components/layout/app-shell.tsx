'use client';

import type { ReactNode } from 'react';
import { useResponsiveMode } from '@/hooks/use-responsive-mode';
import { useKeyboardNav } from '@/hooks/use-keyboard-nav';
import { useAppStore } from '@/store/useAppStore';
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

  return (
    <div className="flex h-dvh bg-bg" data-testid="app-shell">
      {/* Sidebar — in-flow on desktop, overlay on mobile */}
      <Sidebar />

      {/* Right column — everything except the sidebar */}
      <div className="app-right-col flex min-w-0 flex-1 flex-col" data-sidebar-open={sidebarOpen || undefined}>
        <TopBar />

        {/* Main content */}
        <main className="reading-surface flex flex-1 items-center justify-center overflow-hidden p-0" id="main-content">
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
