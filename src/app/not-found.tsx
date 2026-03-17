import Link from 'next/link';

/**
 * Custom 404 page shown for invalid routes.
 */
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-light text-muted">404</h1>
      <p className="text-sm text-secondary">Page not found</p>
      <Link
        href="/page/1"
        className="rounded-lg bg-accent px-6 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity"
      >
        Go to Page 1
      </Link>
    </div>
  );
}
