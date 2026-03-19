'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { usePageContext } from '@/hooks/use-page-context';

/**
 * Shows a warm toast when the app resumes from a previously read page.
 * Displays "Continuing from Page N — Surah Name" for 3 seconds, then fades out.
 * On first visit (page 1), shows "Bismillah — Welcome" instead.
 */
export function ResumeToast() {
  const currentPage = useAppStore((s) => s.currentPage);
  const { primarySurah } = usePageContext(currentPage);
  const [phase, setPhase] = useState<'enter' | 'exit' | 'gone'>('enter');

  useEffect(() => {
    const stayTimer = setTimeout(() => setPhase('exit'), 2500);
    const removeTimer = setTimeout(() => setPhase('gone'), 3000);
    return () => {
      clearTimeout(stayTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === 'gone') return null;

  const isResume = currentPage > 1;
  const message = isResume
    ? 'Continuing'
    : 'Bismillah';
  const subtitle = isResume
    ? `Surah ${primarySurah.surah_name}`
    : 'Welcome';

  return (
    <div
      className={`fixed bottom-[80px] left-1/2 z-panel -translate-x-1/2 ${phase === 'enter' ? 'toast-enter' : 'toast-exit'}`}
    >
      <div
        className="flex items-center gap-2 rounded-lg border-l-[3px] border-l-accent px-4 py-2.5"
        style={{ background: 'rgba(26,22,20,0.92)', backdropFilter: 'blur(8px)' }}
      >
        <span className="text-sm text-primary">{message}</span>
        <span className="text-sm text-accent" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
          &mdash; {subtitle}
        </span>
      </div>
    </div>
  );
}
