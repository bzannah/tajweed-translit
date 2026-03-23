'use client';

import { useEffect, useState } from 'react';
/**
 * Gentle donation banner shown only on the user's second visit.
 * Links directly to Stripe for frictionless giving.
 * Dismissible — once closed, never shown again.
 */
export function DonationBanner() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    try {
      const visitCount = parseInt(
        localStorage.getItem('tajweed_visit_count') || '0',
        10
      );
      const dismissed =
        localStorage.getItem('tajweed_banner_dismissed') === 'true';

      if (visitCount === 0) {
        localStorage.setItem('tajweed_visit_count', '1');
      } else if (!dismissed) {
        localStorage.setItem(
          'tajweed_visit_count',
          String(visitCount + 1)
        );
        setVisible(true);
      }
    } catch {
      // localStorage unavailable — silently skip
    }
  }, []);

  const handleDismiss = () => {
    setExiting(true);
    try {
      localStorage.setItem('tajweed_banner_dismissed', 'true');
    } catch {
      // localStorage unavailable
    }
    setTimeout(() => setVisible(false), 250);
  };

  if (!visible) return null;

  return (
    <div
      className={`flex items-center justify-center gap-3 border-b px-4 py-2 ${exiting ? 'banner-exit' : 'banner-enter'}`}
      style={{
        background: 'rgba(212,168,83,0.1)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottomColor: 'rgba(212,168,83,0.15)',
      }}
    >
      <p className="min-w-0 text-center text-[13px] text-secondary">
        This project is free and community-funded.{' '}
        <a
          href="https://buy.stripe.com/bJe00j9VPd8ObkEcxX4c800"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          Support our mission →
        </a>
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss banner"
        className="flex-shrink-0 text-muted transition-colors hover:text-primary"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
