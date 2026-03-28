import type { Metadata } from 'next';
import Link from 'next/link';
import { getAbsoluteUrl, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title:
    'Learn Tajweed Online Free — Quran Recitation Guides & Resources',
  description:
    'Free Tajweed learning resources for beginners and non-Arabic speakers. Guides on Quran transliteration, Arabic pronunciation, Tajweed rules, and how to read the Quran in English with colour-coded pronunciation.',
  alternates: {
    canonical: '/learn',
  },
  openGraph: {
    type: 'website',
    url: getAbsoluteUrl('/learn'),
    title: 'Learn Tajweed Online Free — Guides & Resources',
    description:
      'Free guides on Quran transliteration, Arabic pronunciation, and Tajweed rules for beginners.',
    siteName: 'Quran Tajweed Transliteration',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn Tajweed Online Free | Quran Tajweed Transliteration',
    description:
      'Free Tajweed guides, Arabic pronunciation help, and Quran transliteration resources.',
    images: ['/og-image.png'],
  },
};

/** All learn pages with metadata for the hub. */
const LEARN_PAGES = [
  {
    href: '/learn/how-to-read-quran-in-english',
    title: 'How to Read the Quran in English',
    description:
      'A complete guide for non-Arabic speakers to start reading the Quran using English transliteration with Tajweed colour coding. Step-by-step instructions from first page to fluency.',
    tag: 'Beginner',
    readTime: '13 min read',
  },
  {
    href: '/learn/tajweed-for-beginners',
    title: 'Tajweed for Beginners',
    description:
      'An introduction to Tajweed — the rules of Quran recitation. Learn what Tajweed is, why it matters, how colour coding helps, and how to get started with your first recitation.',
    tag: 'Beginner',
    readTime: '7 min read',
  },
  {
    href: '/learn/surah-al-fatiha-transliteration',
    title: 'Surah Al-Fatiha Transliteration with Tajweed',
    description:
      'The most important surah to learn — verse by verse with Arabic text, transliteration, translation, and detailed pronunciation notes for every line.',
    tag: 'Practice',
    readTime: '9 min read',
  },
  {
    href: '/learn/quran-transliteration-vs-translation',
    title: 'Quran Transliteration vs Translation',
    description:
      'Understand the difference between transliteration (sounds) and translation (meaning), when to use each, and why combining both gives you the best Quran reading experience.',
    tag: 'Concepts',
    readTime: '8 min read',
  },
  {
    href: '/learn/tajweed-rules',
    title: 'Complete Guide to Tajweed Rules',
    description:
      'Every Tajweed rule explained with colour-coded visual chart. Covers Madd (prolongation), Ghunnah (nasalisation), Qalqalah (echoing), Tafkheem (emphasis), and more.',
    tag: 'Reference',
    readTime: '5 min read',
  },
  {
    href: '/learn/how-to-pronounce-arabic-letters',
    title: 'How to Pronounce Arabic Letters',
    description:
      'Every Arabic letter grouped by articulation point (Makharij) with English approximations. Covers the 5 hardest letters, emphatic vs light pairs, and practical tips.',
    tag: 'Pronunciation',
    readTime: '14 min read',
  },
] as const;

/**
 * Hub page for all learning content. Acts as a topical authority centre
 * linking to all cornerstone content pages.
 * Targets: "learn tajweed online free", "tajweed learning resources",
 * "quran recitation guide", "learn quran online".
 */
export default function LearnHubPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Learn Tajweed Online Free — Quran Recitation Guides',
      description:
        'Free learning resources for Quran recitation with Tajweed colour-coded transliteration.',
      url: getAbsoluteUrl('/learn'),
      isPartOf: {
        '@type': 'WebSite',
        name: 'Quran Tajweed Transliteration',
        url: SITE_URL,
      },
      about: [
        { '@type': 'Thing', name: 'Tajweed' },
        { '@type': 'Thing', name: 'Quran Recitation' },
        { '@type': 'Thing', name: 'Quran Transliteration' },
      ],
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
          item: getAbsoluteUrl('/learn'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Tajweed Learning Resources',
      itemListElement: LEARN_PAGES.map((page, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: page.title,
        url: getAbsoluteUrl(page.href),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can I learn Tajweed online for free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our free guides cover everything from basic Arabic letter pronunciation to complete Tajweed rules. Combined with our colour-coded Quran reader, you can learn and practice Tajweed at your own pace without any cost.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where should I start learning Tajweed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Start with our "How to Read the Quran in English" guide if you are a complete beginner. Then move to "Tajweed for Beginners" for an overview of the rules, and practice with our "Surah Al-Fatiha Transliteration" guide. Use the colour-coded reader to apply what you learn.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to know Arabic to learn Tajweed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Our transliteration system writes Arabic sounds using English letters, so you can learn Tajweed pronunciation without knowing the Arabic alphabet. The colour coding tells you which pronunciation rules to apply. Over time, we recommend learning Arabic script as well, but it is not required to get started.',
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
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-accent">
                Learn
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Learn Tajweed Online — Free Guides &amp; Resources
            </h1>
            <p className="text-secondary mt-2 leading-relaxed">
              Everything you need to start reading the Quran with correct pronunciation. These
              guides are designed for beginners, non-Arabic speakers, new Muslims, and anyone
              who wants to improve their recitation. All resources are free and always will be.
            </p>
          </header>

          {/* Suggested Learning Path */}
          <section className="mb-8 rounded-xl bg-surface p-6 border border-border">
            <h2 className="text-lg font-semibold mb-3">
              Suggested Learning Path
            </h2>
            <p className="text-sm text-secondary mb-4">
              If you are new to Quran recitation, follow these guides in order:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg text-sm font-semibold">
                  1
                </span>
                <div>
                  <Link
                    href="/learn/how-to-read-quran-in-english"
                    className="font-medium text-accent hover:underline"
                  >
                    How to Read the Quran in English
                  </Link>
                  <p className="text-xs text-muted mt-0.5">
                    Understand transliteration and how the colour system works.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg text-sm font-semibold">
                  2
                </span>
                <div>
                  <Link
                    href="/learn/tajweed-for-beginners"
                    className="font-medium text-accent hover:underline"
                  >
                    Tajweed for Beginners
                  </Link>
                  <p className="text-xs text-muted mt-0.5">
                    Learn the basic Tajweed rules you will see in the reader.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg text-sm font-semibold">
                  3
                </span>
                <div>
                  <Link
                    href="/learn/surah-al-fatiha-transliteration"
                    className="font-medium text-accent hover:underline"
                  >
                    Surah Al-Fatiha — Verse by Verse
                  </Link>
                  <p className="text-xs text-muted mt-0.5">
                    Practice with the most important surah in the Quran.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg text-sm font-semibold">
                  4
                </span>
                <div>
                  <Link
                    href="/page/5"
                    className="font-medium text-accent hover:underline"
                  >
                    Start Reading in the Full Reader
                  </Link>
                  <p className="text-xs text-muted mt-0.5">
                    Open the colour-coded reader and begin from page 1.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* All Guides */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">All Guides</h2>
            <div className="space-y-4">
              {LEARN_PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="block rounded-xl bg-surface p-5 border border-border hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-primary">
                        {page.title}
                      </h3>
                      <p className="text-sm text-secondary mt-1 leading-relaxed">
                        {page.description}
                      </p>
                      <p className="text-xs text-muted mt-2">
                        {page.readTime}
                      </p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-bg px-2.5 py-0.5 text-xs font-medium text-accent">
                      {page.tag}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Can I learn Tajweed online for free?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Yes. All of our guides are completely free. They cover everything from basic
                  Arabic letter pronunciation to complete Tajweed rules. Combined with our
                  colour-coded Quran reader, you can learn and practice Tajweed at your own pace.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Where should I start learning Tajweed?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Start with{' '}
                  <Link href="/learn/how-to-read-quran-in-english" className="text-accent hover:underline">
                    How to Read the Quran in English
                  </Link>{' '}
                  if you are a complete beginner. Then move to{' '}
                  <Link href="/learn/tajweed-for-beginners" className="text-accent hover:underline">
                    Tajweed for Beginners
                  </Link>{' '}
                  for an overview of the rules, and practice with our{' '}
                  <Link href="/learn/surah-al-fatiha-transliteration" className="text-accent hover:underline">
                    Surah Al-Fatiha guide
                  </Link>.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Do I need to know Arabic to learn Tajweed?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  No. Our transliteration system writes Arabic sounds using English letters, so
                  you can start immediately. The colour coding guides your pronunciation. Over
                  time, learning Arabic script is recommended, but it is not required to begin.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Link
              href="/page/5"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 text-lg font-semibold text-bg transition-transform hover:scale-105"
            >
              Open the Quran Reader
            </Link>
            <p className="mt-2 text-sm text-muted">
              Free, no account required, works on any device
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
