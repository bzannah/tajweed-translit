import type { Metadata } from 'next';
import Link from 'next/link';
import { getAbsoluteUrl, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title:
    'Quran Transliteration vs Translation — What is the Difference? | Free Guide',
  description:
    'Understand the difference between Quran transliteration and translation. Learn when to use each, how they work together, and why colour-coded Tajweed transliteration helps non-Arabic speakers recite the Quran correctly.',
  alternates: {
    canonical: '/learn/quran-transliteration-vs-translation',
  },
  openGraph: {
    type: 'article',
    url: getAbsoluteUrl('/learn/quran-transliteration-vs-translation'),
    title: 'Quran Transliteration vs Translation — Complete Guide',
    description:
      'Learn the difference between Quran transliteration and translation and how to use both effectively.',
    siteName: 'Quran Tajweed Transliteration',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quran Transliteration vs Translation | Guide',
    description:
      'Understand when to use transliteration vs translation for Quran reading.',
    images: ['/og-image.png'],
  },
};

/**
 * Cornerstone content page: Quran Transliteration vs Translation.
 * Targets: "quran transliteration vs translation", "difference between transliteration and translation",
 * "quran transliteration meaning", "what is quran transliteration".
 */
export default function TransliterationVsTranslationPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Quran Transliteration vs Translation — What is the Difference?',
      description:
        'A clear explanation of how Quran transliteration differs from translation and when to use each approach.',
      url: getAbsoluteUrl('/learn/quran-transliteration-vs-translation'),
      inLanguage: 'en',
      datePublished: '2026-03-27',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Quran Tajweed Transliteration',
        url: SITE_URL,
      },
      about: [
        { '@type': 'Thing', name: 'Quran Transliteration' },
        { '@type': 'Thing', name: 'Quran Translation' },
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
          item: getAbsoluteUrl('/learn/tajweed-for-beginners'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Transliteration vs Translation',
          item: getAbsoluteUrl('/learn/quran-transliteration-vs-translation'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the difference between Quran transliteration and translation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Transliteration converts the sounds of the Arabic Quran into English letters so you can pronounce the words (e.g., "Bismillaahir-Rahmaanir-Raheem"). Translation converts the meaning into English (e.g., "In the Name of God, the Most Gracious, the Most Merciful"). Transliteration helps you recite; translation helps you understand.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should I use transliteration or translation when reading the Quran?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use both together for the best experience. Use transliteration to pronounce the Arabic words correctly for recitation and prayer, and use translation alongside it to understand the meaning of what you are reading. Many Quran readers display both side by side.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it better to read the Quran in Arabic or transliteration?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Reading in Arabic script is the ideal goal, as it is the original form of the Quran. However, transliteration is an excellent stepping stone for beginners who have not yet learned the Arabic alphabet. Many Muslims use transliteration as a learning aid while gradually developing Arabic reading skills.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does Quran transliteration look like?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Quran transliteration writes Arabic sounds using English letters. For example, the Bismillah looks like: "Bismillaahir-Rahmaanir-Raheem". Colour-coded Tajweed transliteration adds colours to show pronunciation rules — red for prolongation, green for nasalisation, blue for emphatic letters, and grey for silent letters.',
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
              <li>
                <span className="text-secondary">Learn</span>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-accent">
                Transliteration vs Translation
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Quran Transliteration vs Translation
            </h1>
            <p className="text-secondary mt-2 leading-relaxed">
              Two terms that are often confused but serve very different purposes. Understanding
              the difference will help you choose the right approach for your Quran reading and
              make the most of both tools.
            </p>
          </header>

          {/* The Core Difference */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              The Core Difference
            </h2>
            <p className="text-secondary leading-relaxed">
              The simplest way to understand it: translation tells you what the words mean.
              Transliteration tells you how the words sound. Both start with the same Arabic text,
              but they produce very different results and serve very different purposes.
            </p>

            <div className="mt-5 rounded-xl bg-surface p-5 border border-border">
              <p className="text-center text-lg font-brand text-muted mb-4" dir="rtl">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-bg p-4 text-center">
                  <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wide">
                    Transliteration (Sounds)
                  </p>
                  <p className="text-base text-primary font-medium">
                    Bismillaahir-Rahmaanir-Raheem
                  </p>
                  <p className="text-xs text-muted mt-2">
                    You can recite this aloud. It represents the Arabic pronunciation.
                  </p>
                </div>
                <div className="rounded-lg bg-bg p-4 text-center">
                  <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wide">
                    Translation (Meaning)
                  </p>
                  <p className="text-base text-primary font-medium">
                    In the Name of God, the Most Gracious, the Most Merciful
                  </p>
                  <p className="text-xs text-muted mt-2">
                    You understand the meaning, but this is English — not Arabic.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* When to Use Each */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              When to Use Transliteration
            </h2>
            <p className="text-secondary leading-relaxed">
              Transliteration is essential when you need to actually recite the Quran. In Islam,
              the Quran is recited in Arabic during prayer — reading an English translation during
              salah does not fulfil the requirement. If you cannot read Arabic script yet,
              transliteration is the bridge that allows you to recite the original Arabic words
              using familiar English letters.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              Use transliteration when you are learning to pray, memorising surahs for prayer,
              practising your pronunciation, following along with a reciter, or working toward
              reading Arabic script. It is particularly valuable for new Muslims, converts, and
              children who are beginning their Quran journey.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              When to Use Translation
            </h2>
            <p className="text-secondary leading-relaxed">
              Translation is essential when you want to understand the message of the Quran. The
              Quran was revealed as guidance for all of humanity, and understanding its meaning is
              a fundamental part of connecting with the text. Reading a translation allows you to
              reflect on the lessons, stories, and commands contained in each surah.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              Use translation when you are studying the meaning of a passage, preparing for a
              khutbah or lesson, seeking guidance on a specific topic, or deepening your
              understanding of verses you already recite. Many scholars recommend reading the
              translation of a surah before memorising it, so that you understand what you are
              saying.
            </p>
          </section>

          {/* Comparison Table */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Side-by-Side Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-left text-muted font-medium">Aspect</th>
                    <th className="py-3 px-4 text-left text-accent font-medium">Transliteration</th>
                    <th className="py-3 px-4 text-left text-accent font-medium">Translation</th>
                  </tr>
                </thead>
                <tbody className="text-secondary">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-primary">What it gives you</td>
                    <td className="py-3 px-4">Arabic sounds in English letters</td>
                    <td className="py-3 px-4">English meaning of the Arabic text</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-primary">Can you recite with it?</td>
                    <td className="py-3 px-4">Yes — you are reading the Arabic words</td>
                    <td className="py-3 px-4">No — you are reading English words</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-primary">Can you understand it?</td>
                    <td className="py-3 px-4">Only if you know Arabic</td>
                    <td className="py-3 px-4">Yes — the meaning is in English</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-primary">Valid for prayer?</td>
                    <td className="py-3 px-4">Yes — it represents the original Arabic</td>
                    <td className="py-3 px-4">No — prayer requires Arabic recitation</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-primary">Best for</td>
                    <td className="py-3 px-4">Recitation, prayer, memorisation</td>
                    <td className="py-3 px-4">Understanding, study, reflection</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-primary">Example</td>
                    <td className="py-3 px-4 italic">&ldquo;Alhamdu lillaahi Rabbil-&apos;aalameen&rdquo;</td>
                    <td className="py-3 px-4 italic">&ldquo;All praise is due to God, Lord of all the worlds&rdquo;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Why Both Matter */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Why You Should Use Both Together
            </h2>
            <p className="text-secondary leading-relaxed">
              The ideal approach combines transliteration and translation. When you read the Quran
              using transliteration, you are reciting the actual Arabic words — which carries
              spiritual reward. When you read the translation alongside it, you understand what
              those words mean — which deepens your connection to the text and helps you apply its
              guidance in your life.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              Many experienced Quran readers follow a three-layer approach: they read the Arabic
              script to recite, consult the transliteration for any uncertain pronunciations, and
              read the translation to reflect on the meaning. As your Arabic improves, you may
              rely less on transliteration, but translation remains valuable for anyone whose
              first language is not Arabic.
            </p>
          </section>

          {/* What is Tajweed Transliteration */}
          <section className="mb-8 rounded-xl bg-surface p-6">
            <h2 className="text-lg font-semibold mb-3">
              What Makes Tajweed Transliteration Different?
            </h2>
            <p className="text-secondary leading-relaxed">
              Standard transliteration only tells you which sounds to make. Tajweed transliteration
              goes further by adding colour-coded pronunciation rules directly into the text. Each
              colour represents a specific recitation rule — telling you when to elongate a sound,
              when to nasalise, when to add emphasis, and when a letter is silent.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              This is the approach used by our reader. It combines the accessibility of English
              transliteration with the precision of traditional Tajweed teaching, making it possible
              for beginners to recite with correct pronunciation from the very first page.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: '#FF0000' }} />
                <span className="text-xs text-muted">Prolongation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: '#00AA00' }} />
                <span className="text-xs text-muted">Nasalisation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: '#0066CC' }} />
                <span className="text-xs text-muted">Emphasis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: '#4B0082' }} />
                <span className="text-xs text-muted">Echoing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: '#808080' }} />
                <span className="text-xs text-muted">Silent</span>
              </div>
            </div>
            <Link
              href="/learn/tajweed-rules"
              className="mt-3 inline-block text-sm text-accent hover:underline"
            >
              See all Tajweed rules explained →
            </Link>
          </section>

          {/* Common Misconceptions */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Common Misconceptions
            </h2>
            <div className="space-y-3 text-secondary leading-relaxed">
              <p>
                <span className="font-medium text-primary">
                  &ldquo;Transliteration replaces learning Arabic.&rdquo;
                </span>{' '}
                Transliteration is a bridge, not a destination. It allows you to recite while
                you learn Arabic script. The long-term goal for every reader should be to develop
                the ability to read the original Arabic, as no transliteration system can capture
                every nuance of Arabic pronunciation.
              </p>
              <p>
                <span className="font-medium text-primary">
                  &ldquo;Translation is enough for prayer.&rdquo;
                </span>{' '}
                Islamic prayer requires recitation in Arabic. An English translation helps you
                understand what you are saying, but the actual recitation must be in Arabic. This
                is why transliteration is so important for non-Arabic speakers — it lets you
                recite in Arabic without knowing the Arabic alphabet.
              </p>
              <p>
                <span className="font-medium text-primary">
                  &ldquo;All transliterations are the same.&rdquo;
                </span>{' '}
                Transliteration systems vary widely. Some use simplified spelling that loses
                pronunciation detail. Others, like colour-coded Tajweed transliteration, preserve
                pronunciation rules visually. The quality of transliteration directly affects
                how accurately you recite.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  What is the difference between Quran transliteration and translation?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Transliteration converts the Arabic sounds into English letters
                  (&ldquo;Bismillaahir-Rahmaanir-Raheem&rdquo;) so you can pronounce the words.
                  Translation converts the meaning into English (&ldquo;In the Name of God, the
                  Most Gracious, the Most Merciful&rdquo;) so you can understand the words.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Should I use transliteration or translation when reading the Quran?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Use both together. Transliteration for recitation and prayer (you need to speak
                  the Arabic words). Translation for understanding the meaning. The best approach
                  is to read transliteration aloud while referencing the translation for meaning.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Is it better to read the Quran in Arabic or transliteration?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Arabic script is the ultimate goal since it is the original form of the Quran.
                  However, transliteration is a valuable stepping stone for beginners. It lets you
                  start reciting immediately while you learn Arabic. Many people use transliteration
                  for months or years as they gradually build Arabic reading skills.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  What does Quran transliteration look like?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  It looks like English text that represents Arabic sounds. For example,
                  &ldquo;Alhamdu lillaahi Rabbil-&apos;aalameen&rdquo; is the transliteration of the
                  second verse of Surah Al-Fatiha. With Tajweed colour coding, certain letters are
                  coloured to indicate pronunciation rules like prolongation, nasalisation, or
                  emphasis.
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
              Try Tajweed Transliteration Now
            </Link>
            <p className="mt-2 text-sm text-muted">
              Free colour-coded Quran reader — no account required
            </p>
          </section>

          {/* Related */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Continue Learning</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/learn/how-to-read-quran-in-english"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">How to Read the Quran in English</p>
                <p className="text-sm text-muted mt-1">
                  Step-by-step transliteration guide for beginners.
                </p>
              </Link>
              <Link
                href="/learn/surah-al-fatiha-transliteration"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Al-Fatiha Transliteration</p>
                <p className="text-sm text-muted mt-1">
                  Verse-by-verse guide with pronunciation tips.
                </p>
              </Link>
              <Link
                href="/learn/tajweed-for-beginners"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Tajweed for Beginners</p>
                <p className="text-sm text-muted mt-1">
                  Introduction to Tajweed pronunciation rules.
                </p>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
