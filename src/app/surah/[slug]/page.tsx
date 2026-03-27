import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { surahs } from '@/data/surahs';
import { juz } from '@/data/juz';
import {
  getAllSurahSlugs,
  getSurahBySlug,
  getSurahSlug,
  getSurahEndPage,
  getSurahPageCount,
} from '@/lib/surah-utils';
import { getJuzForPage } from '@/lib/page-utils';
import {
  getSurahStructuredData,
  getAbsoluteUrl,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

/**
 * Generates static params for all 114 surah landing pages.
 */
export function generateStaticParams() {
  return getAllSurahSlugs();
}

/**
 * Generates dynamic metadata for each surah landing page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const surah = getSurahBySlug(slug);
  if (!surah) return { title: 'Surah Not Found' };

  const pageCount = getSurahPageCount(surah);
  const title = `Surah ${surah.name_english} (${surah.name_arabic}) Transliteration with Tajweed | Free Quran Reader`;
  const description = `Read Surah ${surah.name_english} (${surah.name_arabic}) — "${surah.name_meaning}" — in English transliteration with colour-coded Tajweed. ${surah.revelation_type === 'meccan' ? 'Meccan' : 'Medinan'} surah, ${surah.total_verses} verses, ${pageCount} pages. Free online.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/surah/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: getAbsoluteUrl(`/surah/${slug}`),
      title,
      description,
      siteName: 'Quran Tajweed Transliteration',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Surah ${surah.name_english} Transliteration | Free Quran Reader`,
      description,
      images: ['/og-image.png'],
    },
  };
}

/**
 * Surah landing page — rich content hub for each of the 114 surahs.
 * Provides context, navigation, FAQ, and links to individual pages.
 */
export default async function SurahPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const surah = getSurahBySlug(slug);
  if (!surah) notFound();

  const endPage = getSurahEndPage(surah);
  const pageCount = getSurahPageCount(surah);
  const juzNumber = getJuzForPage(surah.starting_page, juz);
  const structuredData = getSurahStructuredData(surah);

  // Find previous and next surahs for navigation
  const prevSurah = surahs.find((s) => s.number === surah.number - 1);
  const nextSurah = surahs.find((s) => s.number === surah.number + 1);

  // Find related surahs (same revelation type, nearby in order)
  const relatedSurahs = surahs
    .filter(
      (s) =>
        s.number !== surah.number &&
        s.revelation_type === surah.revelation_type &&
        Math.abs(s.number - surah.number) <= 10
    )
    .slice(0, 5);

  // Build page links
  const pageNumbers = Array.from(
    { length: pageCount },
    (_, i) => surah.starting_page + i
  );

  return (
    <>
      <JsonLd data={structuredData} />

      <div className="min-h-screen bg-bg text-primary">
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-secondary">Surahs</span>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-accent">
                {surah.name_english}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-accent text-sm font-semibold">
                {surah.number}
              </span>
              <div>
                <h1 className="text-2xl font-semibold sm:text-3xl">
                  Surah {surah.name_english}{' '}
                  <span className="font-brand text-accent">
                    ({surah.name_arabic})
                  </span>
                </h1>
                <p className="text-secondary text-sm mt-1">
                  &ldquo;{surah.name_meaning}&rdquo;
                </p>
              </div>
            </div>
          </header>

          {/* Quick Facts */}
          <section className="mb-8 rounded-xl bg-surface p-6" aria-label="Surah details">
            <h2 className="text-lg font-semibold mb-4">Surah Details</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Verses</p>
                <p className="text-lg font-semibold text-accent">{surah.total_verses}</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Pages</p>
                <p className="text-lg font-semibold text-accent">
                  {surah.starting_page}–{endPage}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Revelation</p>
                <p className="text-lg font-semibold">
                  <span
                    className={
                      surah.revelation_type === 'meccan'
                        ? 'text-accent-green'
                        : 'text-accent-amber'
                    }
                  >
                    {surah.revelation_type === 'meccan' ? 'Meccan' : 'Medinan'}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Juz</p>
                <p className="text-lg font-semibold text-accent">{juzNumber}</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-8 text-center">
            <Link
              href={`/page/${surah.starting_page}`}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 text-lg font-semibold text-bg transition-transform hover:scale-105"
            >
              Start Reading Surah {surah.name_english}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="mt-2 text-sm text-muted">
              Page {surah.starting_page} of 1,275 — Free online with Tajweed colour coding
            </p>
          </section>

          {/* About This Surah */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              About Surah {surah.name_english}
            </h2>
            <p className="text-secondary leading-relaxed">
              Surah {surah.name_english} ({surah.name_arabic}), meaning &ldquo;{surah.name_meaning}&rdquo;,
              is the {getOrdinal(surah.number)} surah of the Holy Quran. It is
              a {surah.revelation_type === 'meccan' ? 'Meccan' : 'Medinan'} surah,
              revealed in {surah.revelation_type === 'meccan' ? 'Mecca' : 'Medina'},
              consisting of {surah.total_verses} verses (ayat). It spans {pageCount} pages
              in this transliteration edition, from page {surah.starting_page} to page {endPage},
              and falls within Juz {juzNumber} of the Quran.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              Read this surah in English transliteration with colour-coded Tajweed rules
              to improve your recitation. Each colour represents a specific Tajweed rule,
              helping you pronounce every letter and vowel correctly according to traditional
              recitation methods.
            </p>
          </section>

          {/* Page Navigation Grid */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Pages in Surah {surah.name_english}
            </h2>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
              {pageNumbers.map((p) => (
                <Link
                  key={p}
                  href={`/page/${p}`}
                  className="flex h-10 items-center justify-center rounded-lg bg-surface text-sm text-secondary hover:bg-surface-hover hover:text-accent transition-colors"
                >
                  {p}
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  How many verses are in Surah {surah.name_english}?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Surah {surah.name_english} ({surah.name_arabic}) contains {surah.total_verses} verses (ayat).
                </p>
              </details>
              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Is Surah {surah.name_english} Meccan or Medinan?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Surah {surah.name_english} is a {surah.revelation_type === 'meccan' ? 'Meccan' : 'Medinan'} surah,
                  meaning it was revealed in {surah.revelation_type === 'meccan' ? 'Mecca before the migration (Hijra) to Medina' : 'Medina after the migration (Hijra) from Mecca'}.
                </p>
              </details>
              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  What does &ldquo;{surah.name_english}&rdquo; mean?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  The name &ldquo;{surah.name_english}&rdquo; ({surah.name_arabic}) translates to &ldquo;{surah.name_meaning}&rdquo; in English.
                </p>
              </details>
              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  How to read Surah {surah.name_english} with proper Tajweed?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  You can read Surah {surah.name_english} with proper Tajweed using the colour-coded
                  transliteration on this site. Each colour represents a different Tajweed rule —
                  for example, red for necessary prolongation (Madd), green for nasalisation (Ghunnah),
                  and blue for emphatic pronunciation (Tafkheem). Start reading from{' '}
                  <Link href={`/page/${surah.starting_page}`} className="text-accent hover:underline">
                    page {surah.starting_page}
                  </Link>.
                </p>
              </details>
            </div>
          </section>

          {/* Related Surahs */}
          {relatedSurahs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-3">
                Related {surah.revelation_type === 'meccan' ? 'Meccan' : 'Medinan'} Surahs
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {relatedSurahs.map((related) => (
                  <Link
                    key={related.number}
                    href={`/surah/${getSurahSlug(related)}`}
                    className="flex items-center gap-3 rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-hover text-sm text-muted">
                      {related.number}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{related.name_english}</p>
                      <p className="text-xs text-muted">{related.name_meaning}</p>
                    </div>
                    <span className="text-xs text-muted">{related.total_verses} verses</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Learn Tajweed */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Learn to Read with Tajweed
            </h2>
            <div className="grid gap-2 sm:grid-cols-3">
              <Link
                href="/learn/how-to-read-quran-in-english"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="text-sm font-medium">How to Read the Quran in English</p>
                <p className="text-xs text-muted mt-1">Transliteration guide for beginners.</p>
              </Link>
              <Link
                href="/learn/tajweed-rules"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="text-sm font-medium">Tajweed Rules Guide</p>
                <p className="text-xs text-muted mt-1">What each colour means.</p>
              </Link>
              <Link
                href="/learn/how-to-pronounce-arabic-letters"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="text-sm font-medium">Arabic Pronunciation Guide</p>
                <p className="text-xs text-muted mt-1">Every letter explained.</p>
              </Link>
            </div>
          </section>

          {/* Surah Navigation (Prev/Next) */}
          <nav className="flex items-center justify-between border-t border-border pt-6" aria-label="Surah navigation">
            {prevSurah ? (
              <Link
                href={`/surah/${getSurahSlug(prevSurah)}`}
                className="text-sm text-secondary hover:text-accent transition-colors"
              >
                ← Surah {prevSurah.name_english}
              </Link>
            ) : (
              <span />
            )}
            {nextSurah ? (
              <Link
                href={`/surah/${getSurahSlug(nextSurah)}`}
                className="text-sm text-secondary hover:text-accent transition-colors"
              >
                Surah {nextSurah.name_english} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </main>
      </div>
    </>
  );
}

/** Returns the ordinal suffix for a number. */
function getOrdinal(n: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'] as const;
  const v = n % 100;
  const suffix = suffixes[(v - 20) % 10] ?? suffixes[v] ?? 'th';
  return `${n}${suffix}`;
}
