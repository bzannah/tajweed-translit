'use client';

import type { ReactNode } from 'react';
import { useResponsiveMode } from '@/hooks/use-responsive-mode';
import { useKeyboardNav } from '@/hooks/use-keyboard-nav';
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
 * Includes top bar, sidebar, bottom bar, zoom controls, and feature panels.
 * Integrates keyboard navigation.
 */
export function AppShell({ children }: AppShellProps) {
  const isDualMode = useResponsiveMode();
  useKeyboardNav(isDualMode);

  return (
    <div className="relative flex h-dvh flex-col bg-bg" data-testid="app-shell">
      <TopBar />
      <Sidebar />

      {/* Main content */}
      <main className="reading-surface flex flex-1 items-center justify-center overflow-hidden p-0" id="main-content">
        {children}
      </main>

      {/* Feature panels */}
      <ExplanationPanel />
      <TranslationPanel />
      <AudioPlayer />
      <SettingsPanel />
      <NotesEditor />

      <ResumeToast />
      <ZoomControls />
      <BottomBar />
    </div>
  );
}
