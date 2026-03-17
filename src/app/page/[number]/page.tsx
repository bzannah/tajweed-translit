import { TOTAL_PAGES } from '@/lib/constants';
import { PageRoute } from './page-route';

/**
 * Generates static params for all 1275 pages.
 * Required for Next.js static export with dynamic routes.
 */
export function generateStaticParams() {
  return Array.from({ length: TOTAL_PAGES }, (_, i) => ({
    number: String(i + 1),
  }));
}

/**
 * Dynamic page route that displays a specific Quran page.
 */
export default function Page({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  return <PageRoute params={params} />;
}
