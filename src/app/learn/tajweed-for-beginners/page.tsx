import type { Metadata } from 'next';
import Link from 'next/link';
import { getAbsoluteUrl, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title:
    'Tajweed for Beginners — Learn to Read the Quran with Proper Pronunciation | Free Guide',
  description:
    'Learn Tajweed from scratch. This beginner-friendly guide explains what Tajweed is, why it matters, and how colour-coded transliteration helps you recite the Quran correctly. No Arabic knowledge required.',
  alternates: {
    canonical: '/learn/tajweed-for-beginners',
  },
  openGraph: {
    type: 'article',
    url: getAbsoluteUrl('/learn/tajweed-for-beginners'),
    title: 'Tajweed for Beginners — Learn Quran Recitation',
    description:
      'Free beginner guide to Tajweed. Learn to read the Quran with proper pronunciation using colour-coded transliteration.',
    siteName: 'Quran Tajweed Transliteration',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tajweed for Beginners | Free Guide',
    description:
      'Learn Tajweed from scratch. Free guide with colour-coded transliteration.',
    images: ['/og-image.png'],
  },
};

/**
 * Cornerstone content page: Tajweed for Beginners.
 * Targets "tajweed for beginners", "learn tajweed", "how to read quran" keywords.
 */
export default function TajweedForBeginnersPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Tajweed for Beginners — Learn to Read the Quran with Proper Pronunciation',
      description:
        'A comprehensive beginner guide to Tajweed rules and Quran recitation using colour-coded transliteration.',
      url: getAbsoluteUrl('/learn/tajweed-for-beginners'),
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Quran Tajweed Transliteration',
        url: SITE_URL,
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
          item: getAbsoluteUrl('/learn/tajweed-for-beginners'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Tajweed for Beginners',
          item: getAbsoluteUrl('/learn/tajweed-for-beginners'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can I learn Tajweed without knowing Arabic?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Colour-coded transliteration allows you to learn proper Quran pronunciation without reading Arabic script. The colours indicate Tajweed rules visually, so you can focus on pronunciation while reading familiar Latin letters.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to learn basic Tajweed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most beginners can grasp the fundamental Tajweed rules in 2-4 weeks of regular practice. Full mastery takes longer, but the colour-coded system accelerates learning significantly by providing visual cues during recitation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Tajweed mandatory for reading the Quran?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Islamic scholars generally agree that basic Tajweed is obligatory (fard) for every Muslim who recites the Quran, as incorrect pronunciation can change the meaning of sacred text. The level of obligation varies among scholars, but all agree that striving for correct recitation is important.',
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
              <li aria-current="page" className="text-accent">Tajweed for Beginners</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Tajweed for Beginners
            </h1>
            <p className="text-secondary mt-2 leading-relaxed">
              A complete introduction to the rules of Tajweed for those who are new to Quran
              recitation. No prior Arabic knowledge is needed — our colour-coded transliteration
              system makes it easy to learn proper pronunciation step by step.
            </p>
          </header>

          {/* What is Tajweed */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">What is Tajweed?</h2>
            <p className="text-secondary leading-relaxed">
              Tajweed (تجويد) is the science of reciting the Quran correctly. The word comes from
              the Arabic root j-w-d (جود), which means &ldquo;to improve&rdquo; or &ldquo;to make
              excellent.&rdquo; In practice, Tajweed is a set of rules that tells you exactly how to
              pronounce each letter, when to pause, how long to hold a vowel, and when to apply
              special sounds like nasalisation or echoing.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              These rules were established to preserve the exact way the Quran was recited by the
              Prophet Muhammad (peace be upon him) and his companions. Following Tajweed is not
              about adding decoration to your recitation — it is about accuracy and respect for the
              sacred text.
            </p>
          </section>

          {/* Why Tajweed Matters */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Why Does Tajweed Matter?</h2>
            <p className="text-secondary leading-relaxed">
              Arabic is a language where small changes in pronunciation can completely change the
              meaning of a word. For example, the difference between a short &ldquo;a&rdquo; sound and a long
              &ldquo;aa&rdquo; sound, or between a regular &ldquo;s&rdquo; and an emphatic &ldquo;S&rdquo; (ص), can turn one word
              into a completely different one. Without Tajweed, you risk mispronouncing the Quran
              in ways that alter its meaning.
            </p>
          </section>

          {/* How Colour Coding Helps */}
          <section className="mb-8 rounded-xl bg-surface p-6">
            <h2 className="text-lg font-semibold mb-3">
              How Colour-Coded Tajweed Works
            </h2>
            <p className="text-secondary leading-relaxed">
              Our transliteration system uses colours as visual indicators for Tajweed rules.
              Instead of memorising complex Arabic terminology, you can simply follow the colours
              as you read. Here is what each main colour category means:
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: '#FF0000' }} />
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Red tones</span> — Prolongation
                  (Madd): hold the vowel sound for the indicated duration
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: '#00AA00' }} />
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Green</span> — Nasalisation
                  (Ghunnah): produce a nasal humming sound for 2 counts
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: '#0066CC' }} />
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Blue</span> — Emphatic pronunciation
                  (Tafkheem): pronounce with a heavy, full sound
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: '#4B0082' }} />
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Purple</span> — Echoing sound
                  (Qalqalah): a slight bounce when pronouncing certain letters
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: '#808080' }} />
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Grey</span> — Silent letters:
                  written but not pronounced during recitation
                </p>
              </div>
            </div>
            <p className="text-sm text-muted mt-4">
              For a complete breakdown of every rule and colour, see the{' '}
              <Link href="/learn/tajweed-rules" className="text-accent hover:underline">
                full Tajweed Rules Guide
              </Link>.
            </p>
          </section>

          {/* Getting Started */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Getting Started: Your First Steps</h2>

            <div className="space-y-4">
              <div className="rounded-xl bg-surface p-5">
                <h3 className="font-semibold text-accent">Step 1: Read the Tajweed Colour Guide</h3>
                <p className="text-sm text-secondary mt-2 leading-relaxed">
                  Pages 1 through 4 of our reader contain a visual guide explaining every colour
                  and its corresponding Tajweed rule. Start here to familiarise yourself with the system.
                </p>
                <Link
                  href="/page/1"
                  className="mt-2 inline-block text-sm text-accent hover:underline"
                >
                  Open the Tajweed Colour Guide →
                </Link>
              </div>

              <div className="rounded-xl bg-surface p-5">
                <h3 className="font-semibold text-accent">Step 2: Begin with Surah Al-Fatiha</h3>
                <p className="text-sm text-secondary mt-2 leading-relaxed">
                  Surah Al-Fatiha is the opening chapter of the Quran and the most recited surah in
                  daily prayers. It has only 7 verses and is the perfect starting point for beginners.
                  Read it slowly, paying attention to each colour as you go.
                </p>
                <Link
                  href="/surah/al-fatiha"
                  className="mt-2 inline-block text-sm text-accent hover:underline"
                >
                  Open Surah Al-Fatiha →
                </Link>
              </div>

              <div className="rounded-xl bg-surface p-5">
                <h3 className="font-semibold text-accent">Step 3: Practice the Short Surahs</h3>
                <p className="text-sm text-secondary mt-2 leading-relaxed">
                  The last section of the Quran (Juz 30) contains many short surahs that are
                  commonly memorised. Try reading Surah Al-Ikhlas, Surah Al-Falaq, and Surah An-Nas.
                  These are short enough to practise repeatedly.
                </p>
                <Link
                  href="/juz/30"
                  className="mt-2 inline-block text-sm text-accent hover:underline"
                >
                  Open Juz 30 →
                </Link>
              </div>

              <div className="rounded-xl bg-surface p-5">
                <h3 className="font-semibold text-accent">Step 4: Listen Along</h3>
                <p className="text-sm text-secondary mt-2 leading-relaxed">
                  Use the audio feature (the &ldquo;Listen&rdquo; button in the bottom bar) to hear
                  how a professional reciter pronounces each surah. Follow along with the
                  transliteration text and match your pronunciation to theirs.
                </p>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Common Beginner Mistakes to Avoid</h2>
            <div className="space-y-3 text-secondary leading-relaxed">
              <p>
                <span className="font-medium text-primary">Rushing through prolongations:</span>{' '}
                When you see red-coloured text, slow down. These sounds need to be held for the
                specified number of counts. Cutting them short changes the recitation.
              </p>
              <p>
                <span className="font-medium text-primary">Ignoring nasalisation:</span>{' '}
                The green-coloured Ghunnah sound should come from your nose, not your throat.
                Practice by holding your nose — you should feel vibration during these sounds.
              </p>
              <p>
                <span className="font-medium text-primary">Mixing up emphatic and light letters:</span>{' '}
                Arabic has pairs of similar-sounding letters where one is emphatic (heavy) and one is
                light. The blue colour coding helps you identify when to use the emphatic pronunciation.
              </p>
              <p>
                <span className="font-medium text-primary">Pronouncing silent letters:</span>{' '}
                Grey text indicates letters that are written but not spoken. Skip these during recitation.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Can I learn Tajweed without knowing Arabic?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Yes. Colour-coded transliteration allows you to learn proper Quran pronunciation
                  without reading Arabic script. The colours indicate Tajweed rules visually, so
                  you can focus on pronunciation while reading familiar Latin letters. Over time,
                  many learners find it helpful to also learn the Arabic alphabet, but it is not
                  a prerequisite for getting started.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  How long does it take to learn basic Tajweed?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Most beginners can grasp the fundamental Tajweed rules in 2 to 4 weeks of regular
                  practice. Full mastery takes longer — some students study for years — but the
                  colour-coded system accelerates learning significantly by providing visual cues
                  during recitation. Even partial Tajweed is better than none.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Is Tajweed mandatory for reading the Quran?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Islamic scholars generally agree that basic Tajweed is obligatory (fard) for every
                  Muslim who recites the Quran, as incorrect pronunciation can change the meaning of
                  the sacred text. The level of obligation varies among scholars, but all agree that
                  striving for correct recitation is important and rewarding.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-8 text-center">
            <Link
              href="/page/5"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 text-lg font-semibold text-bg transition-transform hover:scale-105"
            >
              Start Reading the Quran Now
            </Link>
            <p className="mt-2 text-sm text-muted">
              Free, no account required, works on any device
            </p>
          </section>

          {/* Related */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Continue Learning</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/learn/tajweed-rules"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Complete Tajweed Rules Guide</p>
                <p className="text-sm text-muted mt-1">
                  Detailed explanation of every Tajweed rule with colour chart.
                </p>
              </Link>
              <Link
                href="/surah/al-fatiha"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Al-Fatiha</p>
                <p className="text-sm text-muted mt-1">
                  The best surah to start with — only 7 verses.
                </p>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
