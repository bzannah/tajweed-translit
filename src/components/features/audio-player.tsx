'use client';

import { useAppStore } from '@/store/useAppStore';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { usePageContext } from '@/hooks/use-page-context';
import { getSurahAudioUrl } from '@/lib/audio-api';
import { IconButton } from '@/components/ui/icon-button';

/**
 * Inline audio player bar that appears above the bottom bar.
 * Plays surah recitation via Al Quran Cloud API.
 */
export function AudioPlayer() {
  const activePanel = useAppStore((s) => s.activePanel);
  const setActivePanel = useAppStore((s) => s.setActivePanel);
  const currentPage = useAppStore((s) => s.currentPage);
  const audioReciter = useAppStore((s) => s.audioReciter);
  const { primarySurah } = usePageContext(currentPage);
  const { isPlaying, isLoading, error, play, pause, stop, retry } = useAudioPlayer();

  if (activePanel !== 'audio') return null;

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      const url = getSurahAudioUrl(primarySurah.surah, audioReciter);
      play(url);
    }
  };

  const handleClose = () => {
    stop();
    setActivePanel(null);
  };

  return (
    <div
      className="fixed right-0 bottom-bottombar left-0 z-panel flex items-center gap-3 border-t border-border bg-surface px-4 py-2"
      data-testid="audio-player"
    >
      {/* Play/Pause */}
      <IconButton
        icon={
          isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )
        }
        label={isPlaying ? 'Pause' : 'Play'}
        onClick={handlePlayPause}
      />

      {/* Status text */}
      <div className="flex flex-1 items-center gap-2">
        {error ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-danger">{error}</span>
            <button
              type="button"
              onClick={retry}
              className="text-sm text-accent hover:underline"
              aria-label="Retry audio playback"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <span className="text-sm text-primary">
              {isPlaying ? 'Playing' : 'Ready'} — {primarySurah.surah_name}
            </span>
            {isLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-accent" />
            )}
          </>
        )}
      </div>

      {/* Close */}
      <IconButton
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        }
        label="Close audio player"
        onClick={handleClose}
      />
    </div>
  );
}
