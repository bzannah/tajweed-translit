import { useState, useRef, useCallback, useEffect } from 'react';

interface AudioPlayerState {
  /** Whether audio is currently playing */
  isPlaying: boolean;
  /** Whether audio is loading/buffering */
  isLoading: boolean;
  /** Error message if playback failed */
  error: string | null;
  /** Start playing audio from a URL */
  play: (url: string) => void;
  /** Pause playback */
  pause: () => void;
  /** Stop and reset playback */
  stop: () => void;
  /** Retry the last failed playback */
  retry: () => void;
}

/**
 * Manages HTML5 Audio element for Quran recitation playback.
 * Handles play, pause, stop, loading, and error states.
 *
 * @returns AudioPlayerState with controls and status
 */
export function useAudioPlayer(): AudioPlayerState {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastUrlRef = useRef<string | null>(null);

  // Clean up audio element on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  const play = useCallback((url: string) => {
    setError(null);
    setIsLoading(true);
    lastUrlRef.current = url;

    // Create or reuse audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = url;

    audio.oncanplaythrough = () => {
      setIsLoading(false);
      setIsPlaying(true);
      audio.play().catch((err) => {
        setIsPlaying(false);
        setError('Playback failed. Please try again.');
        console.error('Audio playback error:', err);
      });
    };

    audio.onended = () => {
      setIsPlaying(false);
    };

    audio.onerror = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setError('Audio is currently unavailable. Please try again later.');
    };

    audio.load();
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
    }
    setIsPlaying(false);
    setIsLoading(false);
    setError(null);
  }, []);

  const retry = useCallback(() => {
    if (lastUrlRef.current) {
      play(lastUrlRef.current);
    }
  }, [play]);

  return { isPlaying, isLoading, error, play, pause, stop, retry };
}
