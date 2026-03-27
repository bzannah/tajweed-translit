import type { Metadata } from 'next';
import Link from 'next/link';
import { tajweedRules } from '@/data/tajweed-rules';
import { getAbsoluteUrl, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title:
    'Complete Guide to Tajweed Rules — Colour-Coded Quran Recitation Rules | Free',
  description:
    'Learn all Tajweed rules with colour-coded visual guides. Understand Madd (prolongation), Ghunnah (nasalisation), Qalqalah, Idgham, Ikhfa, and more. Free interactive Tajweed chart.',
  alternates: {
    canonical: '/learn/tajweed-rules',
  },
  openGraph: {
    type: 'article',
    url: getAbsoluteUrl('/learn/tajweed-rules'),
    title: 'Complete Guide to Tajweed Rules — Colour-Coded Recitation Guide',
    description:
      'Learn all Tajweed rules with colour-coded visual guides. Free interactive chart with audio examples.',
    siteName: 'Quran Tajweed Transliteration',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tajweed Rules Guide | Quran Tajweed Transliteration',
    description:
      'Complete colour-coded Tajweed rules chart. Free interactive guide.',
    images: ['/og-image.png'],
  },
};

/**
 * Cornerstone content page: Complete Guide to Tajweed Rules.
 * This page targets "tajweed rules", "tajweed colour coding", "tajweed chart" keywords.
 */
export default function TajweedRulesPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Complete Guide to Tajweed Rules — Colour-Coded Recitation Guide',
      description:
        'Learn all Tajweed rules for proper Quran recitation with colour-coded visual guides.',
      url: getAbsoluteUrl('/learn/tajweed-rules'),
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Quran Tajweed Transliteration',
        url: SITE_URL,
      },
      about: {
        '@type': 'Thing',
        name: 'Tajweed',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Learn',
          item: getAbsoluteUrl('/learn/tajweed-rules'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Tajweed Rules',
          item: getAbsoluteUrl('/learn/tajweed-rules'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Tajweed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tajweed is the set of rules governing the correct pronunciation and recitation of the Quran. The word comes from the Arabic root meaning "to make better" or "to improve." Tajweed ensures every letter is pronounced from its correct articulation point with proper characteristics.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many Tajweed rules are there?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'There are several categories of Tajweed rules including Madd (prolongation), Noon Sakinah and Tanween rules (Idgham, Ikhfa, Iqlab, Izhar), Qalqalah (echoing), Ghunnah (nasalisation), and letter characteristics (Tafkheem/emphatic and Tarqeeq/light pronunciation).',
          },
        },
        {
          '@type': 'Question',
          name: 'What do the Tajweed colours mean?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In colour-coded Tajweed, each colour represents a specific recitation rule. For example, red typically indicates prolongation (Madd), green indicates nasalisation (Ghunnah), blue indicates emphatic pronunciation (Tafkheem), purple indicates echoing sound (Qalqalah), and grey indicates silent letters.',
          },
        },
      ],
    },
  ];

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
              <li><span className="text-secondary">Learn</span></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-accent">Tajweed Rules</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Complete Guide to Tajweed Rules
            </h1>
            <p className="text-secondary mt-2 leading-relaxed">
              Tajweed is the art of reciting the Quran correctly. The word &ldquo;Tajweed&rdquo; comes
              from the Arabic root meaning &ldquo;to make better.&rdquo; These rules ensure every letter of
              the Quran is pronounced from its correct articulation point with proper characteristics.
              Below you will find every Tajweed rule used in our colour-coded transliteration system.
            </p>
          </header>

          {/* What is Tajweed */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">What is Tajweed?</h2>
            <p className="text-secondary leading-relaxed">
              Tajweed (تجويد) literally means &ldquo;proficiency&rdquo; or &ldquo;doing something well.&rdquo;
              When applied to Quran recitation, it refers to the set of linguistic and phonetic rules
              used to recite the Quran in the way it was revealed to the Prophet Muhammad (peace be
              upon him). Learning Tajweed is considered obligatory for every Muslim who recites the Quran.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              The primary goal of Tajweed is to protect the reader from making mistakes in recitation
              that could change the meaning of the sacred text. There are two types of errors: clear
              errors (Lahn Jali) that change the meaning, and hidden errors (Lahn Khafi) that
              are more subtle.
            </p>
          </section>

          {/* Colour-Coded Tajweed Chart */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Tajweed Colour Chart
            </h2>
            <p className="text-secondary mb-4">
              Our transliteration uses a colour-coded system to visually indicate which Tajweed
              rule applies to each part of the text. Here is the complete chart:
            </p>

            <div className="space-y-4">
              {tajweedRules.map((rule) => (
                <div
                  key={rule.id}
                  className="rounded-xl bg-surface p-5 border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="mt-1 h-10 w-10 flex-shrink-0 rounded-full border-2 border-border"
                      style={{ backgroundColor: rule.colour }}
                      aria-label={`Colour: ${rule.colour}`}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">
                        {rule.name}{' '}
                        <span className="font-brand text-muted text-sm">
                          ({rule.name_arabic})
                        </span>
                      </h3>
                      {rule.duration && (
                        <p className="text-xs text-accent mt-0.5">
                          Duration: {rule.duration}
                        </p>
                      )}
                      <p className="text-sm text-secondary mt-2 leading-relaxed">
                        {rule.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Tajweed Matters */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Why Tajweed Matters for Every Muslim
            </h2>
            <p className="text-secondary leading-relaxed">
              The Quran was revealed in Arabic with specific pronunciation rules that carry meaning.
              Without proper Tajweed, the meaning of words can change entirely. For example,
              the difference between a short and long vowel, or between an emphatic and non-emphatic
              consonant, can change one word into a completely different one.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              Colour-coded Tajweed transliteration makes it possible for non-Arabic speakers to
              follow these rules visually. Each colour acts as a guide, telling the reader when to
              elongate a vowel, nasalise a sound, or apply other pronunciation rules. This is
              especially helpful for beginners who are learning to recite the Quran for the first time.
            </p>
          </section>

          {/* CTA */}
          <section className="mb-8 rounded-xl bg-surface p-6 text-center">
            <h2 className="text-lg font-semibold mb-2">
              Ready to Practice?
            </h2>
            <p className="text-secondary mb-4">
              Start reading the Quran with colour-coded Tajweed transliteration. See these rules
              in action on every page.
            </p>
            <Link
              href="/page/5"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 font-semibold text-bg transition-transform hover:scale-105"
            >
              Start Reading the Quran
            </Link>
          </section>

          {/* Related Pages */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Continue Learning</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/learn/tajweed-for-beginners"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Tajweed for Beginners</p>
                <p className="text-sm text-muted mt-1">
                  A step-by-step introduction to Tajweed for new learners.
                </p>
              </Link>
              <Link
                href="/learn/how-to-read-quran-in-english"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">How to Read the Quran in English</p>
                <p className="text-sm text-muted mt-1">
                  Complete guide to Quran transliteration for non-Arabic speakers.
                </p>
              </Link>
              <Link
                href="/page/1"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Tajweed Colour Guide Pages</p>
                <p className="text-sm text-muted mt-1">
                  Pages 1–4 contain the visual Tajweed colour reference guide.
                </p>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
