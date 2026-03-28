import Link from 'next/link';

/** All learn pages for the sidebar navigation. */
const LEARN_NAV = [
  { href: '/learn', label: 'All Guides', exact: true },
  { href: '/learn/how-to-read-quran-in-english', label: 'Read Quran in English' },
  { href: '/learn/tajweed-for-beginners', label: 'Tajweed for Beginners' },
  { href: '/learn/surah-al-fatiha-transliteration', label: 'Surah Al-Fatiha' },
  { href: '/learn/quran-transliteration-vs-translation', label: 'Transliteration vs Translation' },
  { href: '/learn/tajweed-rules', label: 'Tajweed Rules Guide' },
  { href: '/learn/how-to-pronounce-arabic-letters', label: 'Arabic Pronunciation' },
];

/**
 * Shared layout for all /learn/* pages.
 * Adds a sticky sidebar on desktop and a horizontal nav on mobile
 * linking to all learn content pages.
 */
export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile: horizontal scrollable nav */}
      <nav
        aria-label="Learn guides navigation"
        className="sticky top-12 z-20 border-b border-border bg-bg/95 backdrop-blur-sm lg:hidden"
      >
        <div className="flex gap-1 overflow-x-auto px-4 py-2 scrollbar-none">
          {LEARN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-shrink-0 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-secondary hover:bg-surface-hover hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main content — no desktop sidebar since AppShell already provides the surah sidebar */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
