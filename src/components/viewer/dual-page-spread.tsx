'use client';

import { getDualPages } from '@/lib/page-utils';
import { PageImage } from './page-image';

/** Props for the DualPageSpread component. */
export interface DualPageSpreadProps {
  /** Current page number */
  page: number;
}

/**
 * Displays two pages side by side in a dual-page spread.
 * Right page (odd) is displayed first per Mushaf convention.
 * Falls back to a single page if the last page is odd (no partner).
 */
export function DualPageSpread({ page }: DualPageSpreadProps) {
  const [rightPage, leftPage] = getDualPages(page);

  return (
    <div
      className="dual-spread"
      data-testid="dual-page-spread"
    >
      {/* Right page (odd) — displayed first in Mushaf convention */}
      <div className="page-gutter-right">
        <PageImage key={rightPage} page={rightPage} />
      </div>

      {/* Binding gutter */}
      {leftPage !== null && <div className="book-gutter self-stretch" />}

      {/* Left page (even) */}
      {leftPage !== null && (
        <div className="page-gutter-left">
          <PageImage key={leftPage} page={leftPage} />
        </div>
      )}
    </div>
  );
}
