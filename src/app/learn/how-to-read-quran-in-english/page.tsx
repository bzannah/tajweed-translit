import type { Metadata } from 'next';
import Link from 'next/link';
import { getAbsoluteUrl, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title:
    'How to Read the Quran in English — Transliteration Guide for Non-Arabic Speakers | Free',
  description:
    'Learn how to read the Quran in English using transliteration. This free guide explains how non-Arabic speakers can recite the Quran with correct pronunciation using colour-coded Tajweed transliteration. No Arabic knowledge required.',
  alternates: {
    canonical: '/learn/how-to-read-quran-in-english',
  },
  openGraph: {
    type: 'article',
    url: getAbsoluteUrl('/learn/how-to-read-quran-in-english'),
    title: 'How to Read the Quran in English — Transliteration Guide',
    description:
      'Free guide for non-Arabic speakers to read the Quran using English transliteration with colour-coded Tajweed rules.',
    siteName: 'Quran Tajweed Transliteration',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Read the Quran in English | Free Transliteration Guide',
    description:
      'Learn to read the Quran without knowing Arabic. Free colour-coded transliteration guide.',
    images: ['/og-image.png'],
  },
};

/**
 * Cornerstone content page: How to Read the Quran in English.
 * Targets high-volume keywords: "how to read quran in english",
 * "quran transliteration", "read quran online english", "quran in english letters",
 * "quran for non-arabic speakers".
 */
export default function HowToReadQuranInEnglishPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'How to Read the Quran in English — A Complete Transliteration Guide for Non-Arabic Speakers',
      description:
        'A comprehensive guide explaining how non-Arabic speakers can read the Quran in English using transliteration with colour-coded Tajweed rules.',
      url: getAbsoluteUrl('/learn/how-to-read-quran-in-english'),
      inLanguage: 'en',
      datePublished: '2026-03-27',
      dateModified: '2026-03-28',
      author: {
        '@type': 'Organization',
        name: 'Quran Tajweed Transliteration',
        url: 'https://www.tajweedtranslit.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Quran Tajweed Transliteration',
        url: 'https://www.tajweedtranslit.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.tajweedtranslit.com/og-image.png',
        },
      },
      timeRequired: 'PT13M',
      wordCount: 2600,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Quran Tajweed Transliteration',
        url: SITE_URL,
      },
      about: [
        { '@type': 'Thing', name: 'Quran Transliteration' },
        { '@type': 'Thing', name: 'Quran Recitation' },
        { '@type': 'Thing', name: 'Tajweed' },
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
          name: 'How to Read the Quran in English',
          item: getAbsoluteUrl('/learn/how-to-read-quran-in-english'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Read the Quran in English Using Transliteration',
      description:
        'Step-by-step guide for non-Arabic speakers to read the Quran using English transliteration with Tajweed colour coding.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand what transliteration means',
          text: 'Transliteration converts Arabic letters into English letters phonetically, so you can read the sounds of the Quran without knowing the Arabic alphabet.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Learn the Tajweed colour system',
          text: 'Each colour in the transliteration represents a pronunciation rule. Red means to elongate the sound, green means nasalisation, blue means emphatic pronunciation, and grey means the letter is silent.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Start with Surah Al-Fatiha',
          text: 'Begin with the first and shortest chapter of the Quran. Al-Fatiha has only 7 verses and is recited in every unit of prayer.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Listen to a reciter and follow along',
          text: 'Use audio recitation from a professional Qari while following the transliteration text. This trains your ear and helps you match pronunciation to the written sounds.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Practice short surahs from Juz 30',
          text: 'The last section of the Quran contains many short chapters commonly memorised by Muslims. Practice Al-Ikhlas, Al-Falaq, and An-Nas.',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can I read the Quran in English?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can read the Quran in English through two methods: translation (understanding the meaning in English) and transliteration (reading the Arabic sounds written in English letters). Transliteration allows you to actually recite the Quran as it was revealed, using familiar English letters to represent Arabic pronunciation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is Quran transliteration?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Quran transliteration is the process of writing the sounds of the Arabic Quran text using English (Latin) letters. For example, the Arabic "بسم الله الرحمن الرحيم" becomes "Bismillaahir-Rahmaanir-Raheem" in transliteration. This allows people who cannot read Arabic script to recite the Quran phonetically.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is reading the Quran in transliteration valid?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Transliteration is widely accepted as a learning aid for those who cannot yet read Arabic. While the ultimate goal is to learn Arabic script, transliteration is a valuable stepping stone that allows new Muslims, converts, and non-Arabic speakers to begin reciting the Quran immediately while working toward Arabic literacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between Quran translation and transliteration?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Translation converts the meaning of the Quran into English (e.g., "In the name of God, the Most Gracious, the Most Merciful"). Transliteration converts the sounds of the Arabic text into English letters (e.g., "Bismillaahir-Rahmaanir-Raheem"). Translation helps you understand the meaning; transliteration helps you recite the actual Arabic words.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to learn to read the Quran using transliteration?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most people can begin reading the Quran in transliteration immediately, since the text uses familiar English letters. Learning the Tajweed colour-coding system takes about 15-30 minutes. Becoming comfortable with the pronunciation patterns typically takes 2-4 weeks of regular practice.',
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
                How to Read the Quran in English
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              How to Read the Quran in English
            </h1>
            <p className="text-secondary mt-2 leading-relaxed">
              You do not need to know Arabic to start reading the Quran. Transliteration converts
              the sounds of the Arabic text into English letters, allowing you to recite the Quran
              phonetically. Combined with colour-coded Tajweed, you can learn correct pronunciation
              from the very first page.
            </p>
          </header>

          {/* What is Transliteration */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              What is Quran Transliteration?
            </h2>
            <p className="text-secondary leading-relaxed">
              Transliteration is the process of writing the sounds of one language using the
              alphabet of another. When applied to the Quran, it means writing the Arabic text
              using English (Latin) letters so that anyone can sound out the words without knowing
              the Arabic script. For example, the Bismillah — the phrase that begins almost every
              chapter of the Quran — looks like this:
            </p>
            <div className="my-4 rounded-xl bg-surface p-5 text-center">
              <p className="text-lg font-brand text-muted mb-2" dir="rtl">
                بسم الله الرحمن الرحيم
              </p>
              <p className="text-lg text-accent font-medium">
                Bismillaahir-Rahmaanir-Raheem
              </p>
              <p className="text-sm text-muted mt-2">
                &ldquo;In the Name of God, the Most Gracious, the Most Merciful&rdquo;
              </p>
            </div>
            <p className="text-secondary leading-relaxed">
              The Arabic script is shown above, and the transliteration below it. A reader who
              does not know Arabic can use the transliteration line to pronounce the words exactly
              as they sound.
            </p>
          </section>

          {/* Translation vs Transliteration */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Translation vs Transliteration — What is the Difference?
            </h2>
            <p className="text-secondary leading-relaxed">
              These two terms are often confused, but they serve different purposes. Translation
              converts the meaning of the Quran into English. You can understand what each verse
              means, but you are reading English words, not the original Arabic sounds.
              Transliteration, on the other hand, converts the sounds of the Arabic into English
              letters. You are reading the actual Arabic words — just spelled out in a way that
              English speakers can pronounce.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-surface p-5 border border-border">
                <h3 className="font-semibold text-accent mb-2">Translation (Meaning)</h3>
                <p className="text-sm text-secondary italic">
                  &ldquo;In the Name of God, the Most Gracious, the Most Merciful&rdquo;
                </p>
                <p className="text-xs text-muted mt-2">
                  Gives you the English meaning. You cannot recite the Quran using this.
                </p>
              </div>
              <div className="rounded-xl bg-surface p-5 border border-border">
                <h3 className="font-semibold text-accent mb-2">Transliteration (Sounds)</h3>
                <p className="text-sm text-secondary italic">
                  &ldquo;Bismillaahir-Rahmaanir-Raheem&rdquo;
                </p>
                <p className="text-xs text-muted mt-2">
                  Gives you the Arabic pronunciation in English letters. You can recite using this.
                </p>
              </div>
            </div>
            <p className="text-secondary leading-relaxed mt-4">
              Ideally, you use both together: the transliteration to recite correctly, and the
              translation to understand the meaning of what you are reading.
            </p>
          </section>

          {/* Why Use Colour-Coded Tajweed */}
          <section className="mb-8 rounded-xl bg-surface p-6">
            <h2 className="text-lg font-semibold mb-3">
              Why Colour-Coded Tajweed Makes a Difference
            </h2>
            <p className="text-secondary leading-relaxed">
              Standard transliteration only shows you which sounds to make. Colour-coded Tajweed
              transliteration goes further — it tells you <em>how</em> to make each sound. The
              colours act as built-in pronunciation instructions:
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: '#FF0000' }}
                />
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Red</span> — Hold this sound longer
                  (Madd / prolongation). The specific shade tells you how many counts to hold.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: '#00AA00' }}
                />
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Green</span> — Produce a nasal
                  humming sound (Ghunnah) for 2 counts. The sound comes from the nose.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: '#0066CC' }}
                />
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Blue</span> — Pronounce this letter
                  with emphasis (Tafkheem). Make it sound heavy and full.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: '#4B0082' }}
                />
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Purple</span> — Add a slight
                  bouncing echo (Qalqalah) when this letter stops.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: '#808080' }}
                />
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Grey</span> — This letter is
                  written but not pronounced. Skip it when reciting.
                </p>
              </div>
            </div>
            <p className="text-sm text-muted mt-4">
              See all rules in detail on the{' '}
              <Link
                href="/learn/tajweed-rules"
                className="text-accent hover:underline"
              >
                Complete Tajweed Rules Guide
              </Link>
              .
            </p>
          </section>

          {/* Step by Step Guide */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              How to Start Reading — Step by Step
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl bg-surface p-5">
                <h3 className="font-semibold text-accent">
                  Step 1: Open the Tajweed Colour Guide
                </h3>
                <p className="text-sm text-secondary mt-2 leading-relaxed">
                  The first few pages of our reader explain the colour-coding system. Spend 10 to
                  15 minutes reviewing these pages to understand what each colour means. You do
                  not need to memorise everything — the colours will become familiar as you read.
                </p>
                <Link
                  href="/page/1"
                  className="mt-2 inline-block text-sm text-accent hover:underline"
                >
                  Open the Tajweed Colour Guide →
                </Link>
              </div>

              <div className="rounded-xl bg-surface p-5">
                <h3 className="font-semibold text-accent">
                  Step 2: Read Surah Al-Fatiha (The Opening)
                </h3>
                <p className="text-sm text-secondary mt-2 leading-relaxed">
                  Al-Fatiha is the first chapter of the Quran and the most important surah for
                  every Muslim. It has only 7 verses and is recited in every unit of prayer. Read
                  it slowly, sounding out each syllable. Pay attention to the colours as you go —
                  red letters should be held longer, green letters nasalised, and grey letters
                  skipped entirely.
                </p>
                <Link
                  href="/surah/al-fatiha"
                  className="mt-2 inline-block text-sm text-accent hover:underline"
                >
                  Read Surah Al-Fatiha →
                </Link>
              </div>

              <div className="rounded-xl bg-surface p-5">
                <h3 className="font-semibold text-accent">
                  Step 3: Listen to a Professional Reciter
                </h3>
                <p className="text-sm text-secondary mt-2 leading-relaxed">
                  Tap the &ldquo;Listen&rdquo; button at the bottom of the reader to hear the
                  current surah recited by a professional Qari. Follow along with the
                  transliteration and try to match the sounds you hear. This is one of the most
                  effective ways to improve pronunciation quickly.
                </p>
              </div>

              <div className="rounded-xl bg-surface p-5">
                <h3 className="font-semibold text-accent">
                  Step 4: Practice the Short Surahs (Juz 30)
                </h3>
                <p className="text-sm text-secondary mt-2 leading-relaxed">
                  Juz 30, the last section of the Quran, contains many short surahs that are
                  commonly memorised. Start with the three &ldquo;Quls&rdquo; — Surah Al-Ikhlas
                  (4 verses), Surah Al-Falaq (5 verses), and Surah An-Nas (6 verses). These are
                  short enough to read through multiple times in a single sitting.
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Link
                    href="/surah/al-ikhlas"
                    className="text-sm text-accent hover:underline"
                  >
                    Al-Ikhlas →
                  </Link>
                  <Link
                    href="/surah/al-falaq"
                    className="text-sm text-accent hover:underline"
                  >
                    Al-Falaq →
                  </Link>
                  <Link
                    href="/surah/an-nas"
                    className="text-sm text-accent hover:underline"
                  >
                    An-Nas →
                  </Link>
                  <Link
                    href="/juz/30"
                    className="text-sm text-accent hover:underline"
                  >
                    All of Juz 30 →
                  </Link>
                </div>
              </div>

              <div className="rounded-xl bg-surface p-5">
                <h3 className="font-semibold text-accent">
                  Step 5: Work Through Longer Surahs
                </h3>
                <p className="text-sm text-secondary mt-2 leading-relaxed">
                  Once you are comfortable with the short surahs, try reading longer chapters.
                  Surah Ya-Sin, Surah Ar-Rahman, and Surah Al-Mulk are popular choices. Use
                  bookmarks to save your place and return to where you left off.
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Link
                    href="/surah/ya-sin"
                    className="text-sm text-accent hover:underline"
                  >
                    Ya-Sin →
                  </Link>
                  <Link
                    href="/surah/ar-rahman"
                    className="text-sm text-accent hover:underline"
                  >
                    Ar-Rahman →
                  </Link>
                  <Link
                    href="/surah/al-mulk"
                    className="text-sm text-accent hover:underline"
                  >
                    Al-Mulk →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Who is This For */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Who Can Benefit from Quran Transliteration?
            </h2>
            <p className="text-secondary leading-relaxed">
              Transliteration is valuable for many different groups of people. New Muslims and
              converts who want to start praying and reciting the Quran right away can use it as
              an immediate bridge while learning the Arabic alphabet. Non-Arabic speaking Muslims
              who grew up hearing the Quran but never learned to read Arabic script can finally
              follow along with confidence. Students of all ages who are beginning their journey
              with the Quran benefit from having a pronunciation guide they can actually read.
              Even experienced reciters sometimes use transliteration to verify their pronunciation
              of less familiar passages.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              The colour-coded Tajweed system is especially helpful because it embeds pronunciation
              rules directly into the text. Instead of needing a teacher present to correct every
              word, the colours guide you automatically, pointing out where to elongate, nasalise,
              or emphasise sounds.
            </p>
          </section>

          {/* Popular Surahs to Start With */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Popular Surahs for Beginners
            </h2>
            <p className="text-secondary leading-relaxed mb-4">
              These are the most commonly read and memorised surahs. They are a great starting
              point for anyone new to the Quran:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/surah/al-fatiha"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Al-Fatiha</p>
                <p className="text-sm text-muted mt-1">
                  7 verses — The Opening. Recited in every prayer.
                </p>
              </Link>
              <Link
                href="/surah/al-baqarah"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Al-Baqarah</p>
                <p className="text-sm text-muted mt-1">
                  286 verses — The longest surah. Ayatul Kursi (2:255) is here.
                </p>
              </Link>
              <Link
                href="/surah/ya-sin"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Ya-Sin</p>
                <p className="text-sm text-muted mt-1">
                  83 verses — Called the &ldquo;Heart of the Quran.&rdquo;
                </p>
              </Link>
              <Link
                href="/surah/ar-rahman"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Ar-Rahman</p>
                <p className="text-sm text-muted mt-1">
                  78 verses — &ldquo;The Most Merciful.&rdquo; Beautiful repetitive rhythm.
                </p>
              </Link>
              <Link
                href="/surah/al-mulk"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Al-Mulk</p>
                <p className="text-sm text-muted mt-1">
                  30 verses — Recommended to read every night before sleep.
                </p>
              </Link>
              <Link
                href="/surah/al-kahf"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Al-Kahf</p>
                <p className="text-sm text-muted mt-1">
                  110 verses — Recommended to read every Friday.
                </p>
              </Link>
              <Link
                href="/surah/al-ikhlas"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Al-Ikhlas</p>
                <p className="text-sm text-muted mt-1">
                  4 verses — Pure monotheism. Equal to one-third of the Quran in reward.
                </p>
              </Link>
              <Link
                href="/surah/al-waqiah"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Al-Waqiah</p>
                <p className="text-sm text-muted mt-1">
                  96 verses — The surah of wealth and provision.
                </p>
              </Link>
            </div>
          </section>

          {/* Tips for Effective Practice */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Tips for Effective Practice
            </h2>
            <div className="space-y-3 text-secondary leading-relaxed">
              <p>
                <span className="font-medium text-primary">Read daily, even if briefly.</span>{' '}
                Consistency matters more than duration. Reading one page every day is more
                effective than reading ten pages once a week.
              </p>
              <p>
                <span className="font-medium text-primary">Read aloud.</span>{' '}
                The Quran is meant to be recited, not read silently. Hearing yourself speak the
                words helps you catch pronunciation errors and builds muscle memory.
              </p>
              <p>
                <span className="font-medium text-primary">Use the bookmark feature.</span>{' '}
                Our reader saves your place automatically, and you can add bookmarks to pages you
                want to return to. This makes it easy to pick up exactly where you left off.
              </p>
              <p>
                <span className="font-medium text-primary">
                  Record yourself and compare.
                </span>{' '}
                Record your recitation on your phone, then play back a professional reciter for
                the same passage. Compare the two to identify areas for improvement.
              </p>
              <p>
                <span className="font-medium text-primary">
                  Do not rush past the Tajweed colours.
                </span>{' '}
                The colours are there to guide your pronunciation. If you see a red letter, pause
                and hold the sound. If you see green, let the nasalisation ring. Slow, correct
                reading is always better than fast, incorrect reading.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Can I read the Quran in English?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  You can read the Quran in English in two ways. A translation gives you the
                  meaning of the Quran in English words. A transliteration gives you the Arabic
                  pronunciation written in English letters. Transliteration allows you to
                  actually recite the Quran as it was revealed, which is important for prayer
                  and spiritual practice. Our reader provides colour-coded transliteration so you
                  can recite with correct Tajweed pronunciation.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  What is Quran transliteration?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Quran transliteration is the process of writing the sounds of the Arabic Quran
                  text using English (Latin) letters. It converts Arabic pronunciation into a
                  format that non-Arabic speakers can read and speak aloud. Our transliteration
                  adds colour-coded Tajweed markings to guide correct pronunciation for every
                  letter and sound.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Is reading the Quran in transliteration valid?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Transliteration is widely accepted as a learning aid for those who cannot yet
                  read Arabic. While scholars encourage learning Arabic script as the ultimate
                  goal, transliteration serves as a valuable stepping stone. It allows new
                  Muslims, converts, and non-Arabic speakers to begin reciting the Quran
                  immediately while they work toward Arabic literacy.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  What is the difference between translation and transliteration?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Translation converts the meaning into English — you understand what is being
                  said but cannot recite the original Arabic. Transliteration converts the sounds
                  into English letters — you can pronounce the Arabic words even without knowing
                  the Arabic alphabet. The ideal approach uses both: transliteration for recitation
                  and translation for understanding.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  How long does it take to learn to read the Quran using transliteration?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  You can begin reading immediately — the text uses English letters you already
                  know. Learning the colour-coding system takes about 15 to 30 minutes. Getting
                  comfortable with the pronunciation patterns typically takes 2 to 4 weeks of
                  regular practice. Becoming fluent at reading transliteration with proper
                  Tajweed may take a few months of consistent daily reading.
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
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/learn/tajweed-for-beginners"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Tajweed for Beginners</p>
                <p className="text-sm text-muted mt-1">
                  Step-by-step introduction to Tajweed rules.
                </p>
              </Link>
              <Link
                href="/learn/tajweed-rules"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Tajweed Rules Guide</p>
                <p className="text-sm text-muted mt-1">
                  Complete colour chart with every Tajweed rule explained.
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
