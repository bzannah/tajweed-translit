'use client';

import { useAppStore } from '@/store/useAppStore';
import { ZOOM_STEP, MIN_ZOOM, MAX_ZOOM } from '@/lib/constants';

/**
 * Compact zoom controls positioned at the right edge, vertically centered in the reading area.
 * Hidden on mobile (< 768px). Semi-transparent by default, fully opaque on hover.
 */
export function ZoomControls() {
  const zoomLevel = useAppStore((s) => s.zoomLevel);
  const setZoomLevel = useAppStore((s) => s.setZoomLevel);

  return (
    <div
      className="zoom-controls fixed z-overlay hidden flex-col rounded-lg md:flex"
      style={{
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(26,22,20,0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        opacity: 0.3,
        transition: 'opacity 200ms',
        padding: '4px',
        gap: '2px',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.3'; }}
      data-testid="zoom-controls"
    >
      <ZoomButton
        label="Zoom in"
        onClick={() => setZoomLevel(zoomLevel + ZOOM_STEP)}
        disabled={zoomLevel >= MAX_ZOOM}
      >
        <path d="M12 5v14M5 12h14" />
      </ZoomButton>
      <ZoomButton
        label="Zoom out"
        onClick={() => setZoomLevel(zoomLevel - ZOOM_STEP)}
        disabled={zoomLevel <= MIN_ZOOM}
      >
        <path d="M5 12h14" />
      </ZoomButton>
      <ZoomButton
        label="Fit width"
        onClick={() => setZoomLevel(100)}
      >
        <path d="M21 12H3M16 7l5 5-5 5M8 7L3 12l5 5" />
      </ZoomButton>
      <ZoomButton
        label="Fit page"
        onClick={() => setZoomLevel(90)}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </ZoomButton>
    </div>
  );
}

interface ZoomButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

/** A single compact zoom button — 28px square with 14px icon. */
function ZoomButton({ label, onClick, disabled = false, children }: ZoomButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-md text-secondary transition-colors duration-150 hover:text-primary hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{ width: '28px', height: '28px' }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {children}
      </svg>
    </button>
  );
}
