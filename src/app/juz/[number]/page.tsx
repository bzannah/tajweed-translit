import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { surahs } from '@/data/surahs';
import { juz } from '@/data/juz';
import { getJuzByNumber } from '@/data/juz';
import { TOTAL_JUZ } from '@/lib/constants';
import { getSurahSlug } from '@/lib/surah-utils';
import { getJuzStructuredData, getAbsoluteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

/**
 * Generates static params for all 30 juz landing pages.
 */
export function generateStaticParams() {
  return Array.from({ length: TOTAL_JUZ }, (_, i) => ({
    number: String(i + 1),
  }));
}

/**
 * Generates dynamic metadata for each juz landing page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const juzNum = parseInt(number, 10);
  const juzData = getJuzByNumber(juzNum);
  if (!juzData) return { title: 'Juz Not Found' };

  const startSurah = surahs.find((s) => s.number === juzData.starting_surah);
  const title = `Juz ${juzNum} (${juzData.name_arabic}) Transliteration with Tajweed | Free Quran Reader`;
  const description = `Read Juz ${juzNum} (${juzData.name_arabic}) of the Quran in English transliteration with colour-coded Tajweed. Starting from ${startSurah?.name_english ?? 'the Quran'}, page ${juzData.starting_page}. Free online.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/juz/${juzNum}`,
    },
    openGraph: {
      type: 'article',
      url: getAbsoluteUrl(`/juz/${juzNum}`),
      title,
      description,
      siteName: 'Quran Tajweed Transliteration',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Juz ${juzNum} Transliteration | Free Quran Reader`,
      description,
      images: ['/og-image.png'],
    },
  };
}

/**
 * Juz landing page — content hub for each of the 30 parts of the Quran.
 */
export default async function JuzPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const juzNum = parseInt(number, 10);
  const juzData = getJuzByNumber(juzNum);
  if (!juzData || juzNum < 1 || juzNum > TOTAL_JUZ) notFound();

  const structuredData = getJuzStructuredData(juzData);

  // Determine page range for this juz
  const nextJuz = juz.find((j) => j.number === juzNum + 1);
  const endPage = nextJuz ? nextJuz.starting_page - 1 : 1275;
  const pageCount = endPage - juzData.starting_page + 1;

  // Find all surahs that appear in this juz
  const surahsInJuz = surahs.filter((s) => {
    const surahEnd =
      surahs.find((next) => next.number === s.number + 1)?.starting_page ??
      1276;
    return (
      s.starting_page < endPage + 1 && surahEnd > juzData.starting_page
    );
  });

  // Previous and next juz
  const prevJuz = juzNum > 1 ? juzNum - 1 : null;
  const nextJuzNum = juzNum < TOTAL_JUZ ? juzNum + 1 : null;

  // Page numbers grid
  const pageNumbers = Array.from(
    { length: pageCount },
    (_, i) => juzData.starting_page + i
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
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li><span className="text-secondary">Juz</span></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-accent">Juz {juzNum}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Juz {juzNum}{' '}
              <span className="font-brand text-accent">({juzData.name_arabic})</span>
            </h1>
            <p className="text-secondary text-sm mt-1">
              Part {juzNum} of 30 — {pageCount} pages — Starting from Surah{' '}
              {surahs.find((s) => s.number === juzData.starting_surah)?.name_english ?? ''},
              verse {juzData.starting_verse}
            </p>
          </header>

          {/* Quick Facts */}
          <section className="mb-8 rounded-xl bg-surface p-6" aria-label="Juz details">
            <h2 className="text-lg font-semibold mb-4">Juz Details</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Pages</p>
                <p className="text-lg font-semibold text-accent">
                  {juzData.starting_page}–{endPage}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Total Pages</p>
                <p className="text-lg font-semibold text-accent">{pageCount}</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Surahs</p>
                <p className="text-lg font-semibold text-accent">{surahsInJuz.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Starts At</p>
                <p className="text-lg font-semibold text-accent">
                  {surahs.find((s) => s.number === juzData.starting_surah)?.name_english ?? ''}:{juzData.starting_verse}
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-8 text-center">
            <Link
              href={`/page/${juzData.starting_page}`}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 text-lg font-semibold text-bg transition-transform hover:scale-105"
            >
              Start Reading Juz {juzNum}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </section>

          {/* Surahs in this Juz */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Surahs in Juz {juzNum}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {surahsInJuz.map((s) => (
                <Link
                  key={s.number}
                  href={`/surah/${getSurahSlug(s)}`}
                  className="flex items-center gap-3 rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-hover text-sm text-muted">
                    {s.number}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{s.name_english}</p>
                    <p className="text-xs text-muted">{s.name_meaning}</p>
                  </div>
                  <span
                    className={`text-xs ${s.revelation_type === 'meccan' ? 'text-accent-green' : 'text-accent-amber'}`}
                  >
                    {s.revelation_type === 'meccan' ? 'Meccan' : 'Medinan'}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Page Navigation Grid */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Pages in Juz {juzNum}</h2>
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-10 md:grid-cols-12">
              {pageNumbers.map((p) => (
                <Link
                  key={p}
                  href={`/page/${p}`}
                  className="flex h-10 items-center justify-center rounded-lg bg-surface text-xs text-secondary hover:bg-surface-hover hover:text-accent transition-colors"
                >
                  {p}
                </Link>
              ))}
            </div>
          </section>

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

          {/* Juz Navigation (Prev/Next) */}
          <nav className="flex items-center justify-between border-t border-border pt-6" aria-label="Juz navigation">
            {prevJuz ? (
              <Link
                href={`/juz/${prevJuz}`}
                className="text-sm text-secondary hover:text-accent transition-colors"
              >
                ← Juz {prevJuz}
              </Link>
            ) : (
              <span />
            )}
            {nextJuzNum ? (
              <Link
                href={`/juz/${nextJuzNum}`}
                className="text-sm text-secondary hover:text-accent transition-colors"
              >
                Juz {nextJuzNum} →
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
