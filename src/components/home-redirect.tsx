'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

/**
 * Client component that redirects to the user's last read page.
 * Defaults to page 5 (Al-Fatiha) for first-time users.
 * Shows a brief loading state while the redirect happens.
 */
export function HomeRedirect() {
  const router = useRouter();
  const lastReadPage = useAppStore((s) => s.lastReadPage);

  useEffect(() => {
    router.replace(`/page/${lastReadPage || 5}`);
  }, [router, lastReadPage]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <span className="text-sm text-muted">Loading...</span>
    </div>
  );
}
