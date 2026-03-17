'use client';

import { use, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { parsePageParam, isValidPage } from '@/lib/page-utils';
import { PageViewer } from '@/components/viewer/page-viewer';

/** Props for the PageRoute component. */
export interface PageRouteProps {
  /** Route params promise (Next.js 15 convention) */
  params: Promise<{ number: string }>;
}

/**
 * Client component that handles page route logic.
 * Validates URL params, syncs with store, and renders the viewer.
 * Uses a ref flag to prevent circular sync between URL and store.
 */
export function PageRoute({ params }: PageRouteProps) {
  const { number: rawParam } = use(params);
  const router = useRouter();
  const setCurrentPage = useAppStore((s) => s.setCurrentPage);
  const currentPage = useAppStore((s) => s.currentPage);
  const syncingFromUrl = useRef(false);

  const pageNumber = parsePageParam(rawParam);

  // Sync URL param → store (when user navigates via URL directly)
  useEffect(() => {
    if (!isValidPage(Number(rawParam))) {
      router.replace(`/page/${pageNumber}`);
      return;
    }
    if (pageNumber !== currentPage) {
      syncingFromUrl.current = true;
      setCurrentPage(pageNumber);
    }
  }, [pageNumber, rawParam]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync store → URL (when user navigates via keyboard/swipe/buttons/sidebar)
  useEffect(() => {
    if (syncingFromUrl.current) {
      syncingFromUrl.current = false;
      return;
    }
    if (currentPage !== pageNumber) {
      router.push(`/page/${currentPage}`, { scroll: false });
    }
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  return <PageViewer />;
}
