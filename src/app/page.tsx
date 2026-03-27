import { surahs } from '@/data/surahs';
import { juz } from '@/data/juz';
import { getHomeStructuredData, SITE_URL } from '@/lib/seo';
import { getSurahSlug } from '@/lib/surah-utils';
import { JsonLd } from '@/components/seo/json-ld';
import { HomeRedirect } from '@/components/home-redirect';

/**
 * Home page with server-rendered SEO content and client-side redirect.
 * Google sees rich content with links to all surahs, juz, and learning pages.
 * Users with JavaScript see a brief loading state then redirect to their last read page.
 */
export default function HomePage() {
  const structuredData = getHomeStructuredData();

  return (
    <>
      <JsonLd data={structuredData} />
      <HomeRedirect />

      {/* Server-rendered SEO content — visible to crawlers, visually hidden for JS users */}
      <noscript>
        <div className="min-h-screen bg-bg text-primary">
          <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold sm:text-3xl mb-4">
              Quran Tajweed Transliteration — Free Online Quran Reader
            </h1>
            <p className="text-secondary mb-8 leading-relaxed">
              Read the complete Quran in English transliteration with colour-coded Tajweed rules.
              1,275 pages, 114 surahs, 30 juz. Free, beautiful, and easy to use on any device.
            </p>

            <h2 className="text-lg font-semibold mb-3">Browse All 114 Surahs</h2>
            <ul className="grid gap-1 sm:grid-cols-2 md:grid-cols-3 mb-8">
              {surahs.map((s) => (
                <li key={s.number}>
                  <a
                    href={`${SITE_URL}/surah/${getSurahSlug(s)}`}
                    className="text-sm text-accent hover:underline"
                  >
                    {s.number}. {s.name_english} ({s.name_arabic})
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="text-lg font-semibold mb-3">Browse by Juz</h2>
            <ul className="grid gap-1 sm:grid-cols-3 md:grid-cols-5 mb-8">
              {juz.map((j) => (
                <li key={j.number}>
                  <a
                    href={`${SITE_URL}/juz/${j.number}`}
                    className="text-sm text-accent hover:underline"
                  >
                    Juz {j.number} ({j.name_arabic})
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="text-lg font-semibold mb-3">
              <a href={`${SITE_URL}/learn`} className="text-accent hover:underline">Learn Tajweed</a>
            </h2>
            <ul className="space-y-2 mb-8">
              <li>
                <a href={`${SITE_URL}/learn/tajweed-rules`} className="text-accent hover:underline">
                  Complete Guide to Tajweed Rules
                </a>
              </li>
              <li>
                <a href={`${SITE_URL}/learn/tajweed-for-beginners`} className="text-accent hover:underline">
                  Tajweed for Beginners
                </a>
              </li>
              <li>
                <a href={`${SITE_URL}/learn/how-to-read-quran-in-english`} className="text-accent hover:underline">
                  How to Read the Quran in English
                </a>
              </li>
              <li>
                <a href={`${SITE_URL}/learn/surah-al-fatiha-transliteration`} className="text-accent hover:underline">
                  Surah Al-Fatiha Transliteration
                </a>
              </li>
              <li>
                <a href={`${SITE_URL}/learn/quran-transliteration-vs-translation`} className="text-accent hover:underline">
                  Quran Transliteration vs Translation
                </a>
              </li>
              <li>
                <a href={`${SITE_URL}/learn/how-to-pronounce-arabic-letters`} className="text-accent hover:underline">
                  How to Pronounce Arabic Letters
                </a>
              </li>
            </ul>
          </main>
        </div>
      </noscript>

      {/* Hidden links for crawlers — always in the DOM for Googlebot to discover */}
      <div className="sr-only" aria-hidden="false">
        <h1>Quran Tajweed Transliteration — Free Online Quran Reader with Colour-Coded Tajweed</h1>
        <p>
          Read the complete Quran in English transliteration with colour-coded Tajweed rules.
          Our mission is to help the global community recite the Quran with confidence and precision,
          bridging language barriers through expert transliteration that honors the rules of Tajweed.
          1,275 pages covering all 114 surahs and 30 juz. Free, no account required.
        </p>

        <nav aria-label="Surah navigation">
          <h2>All 114 Surahs</h2>
          <ul>
            {surahs.map((s) => (
              <li key={s.number}>
                <a href={`/surah/${getSurahSlug(s)}`}>
                  Surah {s.name_english} ({s.name_arabic}) — {s.name_meaning} — {s.total_verses} verses
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Juz navigation">
          <h2>All 30 Juz</h2>
          <ul>
            {juz.map((j) => (
              <li key={j.number}>
                <a href={`/juz/${j.number}`}>
                  Juz {j.number} ({j.name_arabic}) — Starting page {j.starting_page}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Learning resources">
          <h2><a href="/learn">Learn Tajweed Online Free</a></h2>
          <ul>
            <li><a href="/learn/tajweed-rules">Complete Guide to Tajweed Rules</a></li>
            <li><a href="/learn/tajweed-for-beginners">Tajweed for Beginners</a></li>
            <li><a href="/learn/how-to-read-quran-in-english">How to Read the Quran in English — Transliteration Guide</a></li>
            <li><a href="/learn/surah-al-fatiha-transliteration">Surah Al-Fatiha Transliteration with Tajweed</a></li>
            <li><a href="/learn/quran-transliteration-vs-translation">Quran Transliteration vs Translation — What is the Difference?</a></li>
            <li><a href="/learn/how-to-pronounce-arabic-letters">How to Pronounce Arabic Letters for Quran Reading</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
}
