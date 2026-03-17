'use client';

import { useAppStore } from '@/store/useAppStore';
import { ZOOM_STEP, MIN_ZOOM, MAX_ZOOM } from '@/lib/constants';
import { IconButton } from '@/components/ui/icon-button';

/**
 * Fixed zoom controls positioned at bottom-right, above the bottom bar.
 * Hidden on mobile (< 768px). Provides zoom in, zoom out, fit width, and fit page.
 */
export function ZoomControls() {
  const zoomLevel = useAppStore((s) => s.zoomLevel);
  const setZoomLevel = useAppStore((s) => s.setZoomLevel);

  return (
    <div
      className="fixed right-4 bottom-[72px] z-overlay hidden flex-col gap-1 rounded-xl bg-surface/90 p-1.5 shadow-lg backdrop-blur-sm md:flex"
      data-testid="zoom-controls"
    >
      <IconButton
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        }
        label="Zoom in"
        onClick={() => setZoomLevel(zoomLevel + ZOOM_STEP)}
        disabled={zoomLevel >= MAX_ZOOM}
      />
      <IconButton
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
          </svg>
        }
        label="Zoom out"
        onClick={() => setZoomLevel(zoomLevel - ZOOM_STEP)}
        disabled={zoomLevel <= MIN_ZOOM}
      />
      <IconButton
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12H3M16 7l5 5-5 5M8 7L3 12l5 5" />
          </svg>
        }
        label="Fit width"
        onClick={() => setZoomLevel(100)}
      />
      <IconButton
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
          </svg>
        }
        label="Fit page"
        onClick={() => setZoomLevel(90)}
      />
    </div>
  );
}
