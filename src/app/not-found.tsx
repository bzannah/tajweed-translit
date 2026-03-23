import Link from 'next/link';

/**
 * Custom 404 page shown for invalid routes.
 */
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="font-brand text-2xl text-accent">Page Not Found</h1>
      <p className="text-sm text-secondary">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/page/5"
        className="text-accent hover:underline text-sm"
      >
        Go to Al-Fatiha &rarr;
      </Link>
    </div>
  );
}
