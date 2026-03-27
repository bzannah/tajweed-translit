import type { Metadata } from 'next';
import Link from 'next/link';
import { getAbsoluteUrl, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title:
    'Surah Al-Fatiha Transliteration with Tajweed — Read in English | Free',
  description:
    'Read Surah Al-Fatiha (The Opening) in English transliteration with colour-coded Tajweed. Verse-by-verse guide with pronunciation tips, meaning, and audio. Perfect for beginners and new Muslims.',
  alternates: {
    canonical: '/learn/surah-al-fatiha-transliteration',
  },
  openGraph: {
    type: 'article',
    url: getAbsoluteUrl('/learn/surah-al-fatiha-transliteration'),
    title: 'Surah Al-Fatiha Transliteration — Verse by Verse with Tajweed',
    description:
      'Complete Surah Al-Fatiha in English transliteration with Tajweed colour coding. Free verse-by-verse pronunciation guide.',
    siteName: 'Quran Tajweed Transliteration',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surah Al-Fatiha Transliteration | Free Tajweed Guide',
    description:
      'Read Surah Al-Fatiha in English with colour-coded Tajweed pronunciation guide.',
    images: ['/og-image.png'],
  },
};

/** Data for Al-Fatiha verses */
const VERSES = [
  {
    number: 1,
    arabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
    transliteration: 'Bismillaahir-Rahmaanir-Raheem',
    translation: 'In the Name of Allah, the Most Gracious, the Most Merciful',
    notes:
      'This verse is known as the Bismillah. It appears at the beginning of every surah except Surah At-Tawbah. When reciting, hold the "aa" sounds (Madd) for 2 counts and nasalise the "n" in "Rahmaan" with a Ghunnah.',
  },
  {
    number: 2,
    arabic: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
    transliteration: 'Alhamdu lillaahi Rabbil-\'aalameen',
    translation: 'All praise is due to Allah, Lord of all the worlds',
    notes:
      'The "Ha" in "Alhamdu" is a soft H sound from the throat. The double "l" in "lillaahi" should be pronounced with emphasis (Tafkheem) because it follows a fathah vowel. Elongate the "aa" in "\'aalameen" for 2 counts.',
  },
  {
    number: 3,
    arabic: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
    transliteration: 'Ar-Rahmaanir-Raheem',
    translation: 'The Most Gracious, the Most Merciful',
    notes:
      'This verse repeats two of Allah\'s names. "Rahmaan" conveys immense, all-encompassing mercy. "Raheem" conveys specific, focused mercy. Both contain Madd — elongate the "aa" in "Rahmaan" and the "ee" in "Raheem" for 2 counts each.',
  },
  {
    number: 4,
    arabic: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
    transliteration: 'Maaliki yawmid-deen',
    translation: 'Master of the Day of Judgement',
    notes:
      'Elongate the "aa" in "Maaliki" for 2 counts (natural Madd). The "d" in "deen" has a shaddah (doubling), so pronounce it firmly. The "ee" in "deen" is held for 2 counts.',
  },
  {
    number: 5,
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    transliteration: 'Iyyaaka na\'budu wa iyyaaka nasta\'een',
    translation: 'You alone we worship, and You alone we ask for help',
    notes:
      'The "yy" in "Iyyaaka" is doubled (shaddah) — press the tongue firmly. The hamzah (glottal stop) in "na\'budu" and "nasta\'een" is a brief catch in the throat. Elongate "ee" in "nasta\'een" for 2 counts.',
  },
  {
    number: 6,
    arabic: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
    transliteration: 'Ihdinas-siraatal-mustaqeem',
    translation: 'Guide us to the straight path',
    notes:
      'The "s" in "siraatal" is a Saad (ص) — an emphatic S pronounced with the tongue pressed to the roof of the mouth (Tafkheem). The "q" in "mustaqeem" is a Qaf (ق), pronounced deeper in the throat than a regular K. Elongate the "aa" in "siraatal" and the "ee" in "mustaqeem".',
  },
  {
    number: 7,
    arabic: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
    transliteration:
      'Siraatal-ladhina an\'amta \'alayhim, ghayril-maghdoobi \'alayhim wa lad-daaallleen',
    translation:
      'The path of those You have blessed — not of those who have earned Your anger, nor of those who have gone astray',
    notes:
      'This is the longest verse and contains several important Tajweed rules. The "gh" in "ghayril" is a Ghain (غ) — a gargling sound from deep in the throat. The "dh" in "maghdoobi" is a Daad (ض) — the most unique Arabic letter, pronounced with emphatic emphasis. The final word "daaallleen" ends with a 6-count prolongation (Madd Laazim) — this is the longest held sound in Al-Fatiha.',
  },
];

/**
 * Cornerstone content page: Surah Al-Fatiha Transliteration with Tajweed.
 * Targets: "surah fatiha transliteration", "al fatiha in english",
 * "surah fatiha english transliteration", "how to read surah fatiha".
 */
export default function SurahAlFatihaTransliterationPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Surah Al-Fatiha Transliteration with Tajweed — Complete Verse-by-Verse Guide',
      description:
        'Read Surah Al-Fatiha in English transliteration with colour-coded Tajweed and pronunciation notes for every verse.',
      url: getAbsoluteUrl('/learn/surah-al-fatiha-transliteration'),
      inLanguage: 'en',
      datePublished: '2026-03-27',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Quran Tajweed Transliteration',
        url: SITE_URL,
      },
      about: [
        { '@type': 'Thing', name: 'Surah Al-Fatiha' },
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
          item: getAbsoluteUrl('/learn/tajweed-for-beginners'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Surah Al-Fatiha Transliteration',
          item: getAbsoluteUrl('/learn/surah-al-fatiha-transliteration'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many verses are in Surah Al-Fatiha?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Surah Al-Fatiha contains 7 verses (ayat). It is the first and shortest surah recited in full during every unit of Islamic prayer (salah).',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you read Surah Al-Fatiha in English?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can read Surah Al-Fatiha in English using transliteration, which writes the Arabic sounds in English letters. It begins with "Bismillaahir-Rahmaanir-Raheem" (In the Name of Allah, the Most Gracious, the Most Merciful). Colour-coded Tajweed transliteration adds pronunciation guides to help you recite correctly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is Surah Al-Fatiha so important?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Surah Al-Fatiha is the most recited chapter of the Quran. Muslims recite it in every unit (rakah) of every prayer, which means it is read at least 17 times a day in the five daily prayers. The Prophet Muhammad (peace be upon him) described it as the greatest surah in the Quran.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does Surah Al-Fatiha mean?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Al-Fatiha means "The Opening." It is named this because it is the opening chapter of the Quran and opens every unit of prayer. The surah is a prayer to Allah — it praises Him, acknowledges His sovereignty, and asks for guidance to the straight path.',
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
                Surah Al-Fatiha Transliteration
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Surah Al-Fatiha Transliteration with Tajweed
            </h1>
            <p className="text-secondary mt-2 leading-relaxed">
              Al-Fatiha (&ldquo;The Opening&rdquo;) is the first chapter of the Quran and the most
              recited surah in Islam. Every Muslim recites it in every unit of prayer, making it the
              single most important passage to learn. This guide provides the complete transliteration
              with verse-by-verse pronunciation notes and Tajweed tips.
            </p>
          </header>

          {/* Quick Facts */}
          <section className="mb-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-surface p-4 text-center">
                <p className="text-2xl font-semibold text-accent">7</p>
                <p className="text-xs text-muted mt-1">Verses</p>
              </div>
              <div className="rounded-xl bg-surface p-4 text-center">
                <p className="text-2xl font-semibold text-accent">1</p>
                <p className="text-xs text-muted mt-1">Surah Number</p>
              </div>
              <div className="rounded-xl bg-surface p-4 text-center">
                <p className="text-sm font-semibold text-accent-green">Meccan</p>
                <p className="text-xs text-muted mt-1">Revelation</p>
              </div>
              <div className="rounded-xl bg-surface p-4 text-center">
                <p className="text-sm font-semibold text-accent">Page 5</p>
                <p className="text-xs text-muted mt-1">In the Mushaf</p>
              </div>
            </div>
          </section>

          {/* Why Al-Fatiha */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Why is Surah Al-Fatiha So Important?
            </h2>
            <p className="text-secondary leading-relaxed">
              Al-Fatiha holds a unique position in Islam. It is recited in every rakah (unit) of
              every salah (prayer), which means a Muslim who prays the five daily prayers recites
              Al-Fatiha at least 17 times each day. No other passage of the Quran is recited this
              frequently. The surah is sometimes called Umm Al-Kitab (&ldquo;Mother of the
              Book&rdquo;) because it encapsulates the core themes of the entire Quran: praise of
              Allah, acknowledgement of the Day of Judgement, and a plea for divine guidance.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              For anyone beginning to learn the Quran — whether a new Muslim, a convert, or someone
              returning to their faith — Al-Fatiha is the natural starting point. It is short
              enough to learn in a single sitting, yet profound enough to study for a lifetime.
            </p>
          </section>

          {/* Verse-by-Verse Guide */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Verse-by-Verse Transliteration and Pronunciation Guide
            </h2>
            <p className="text-secondary mb-4 text-sm">
              Read each verse slowly. The transliteration shows you the sounds in English letters.
              The pronunciation notes explain which Tajweed rules to apply.
            </p>

            <div className="space-y-4">
              {VERSES.map((verse) => (
                <div
                  key={verse.number}
                  className="rounded-xl bg-surface p-5 border border-border"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-bg text-sm font-semibold">
                      {verse.number}
                    </span>
                    <span className="text-xs text-muted">
                      Verse {verse.number} of 7
                    </span>
                  </div>

                  {/* Arabic */}
                  <p
                    className="text-xl leading-loose text-center mb-3 font-brand"
                    dir="rtl"
                    lang="ar"
                  >
                    {verse.arabic}
                  </p>

                  {/* Transliteration */}
                  <p className="text-lg text-accent font-medium text-center mb-2">
                    {verse.transliteration}
                  </p>

                  {/* Translation */}
                  <p className="text-sm text-muted text-center italic mb-4">
                    {verse.translation}
                  </p>

                  {/* Pronunciation Notes */}
                  <div className="rounded-lg bg-bg p-3">
                    <p className="text-xs font-semibold text-secondary mb-1">
                      Pronunciation Notes:
                    </p>
                    <p className="text-xs text-muted leading-relaxed">
                      {verse.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Practice */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              How to Practice Surah Al-Fatiha
            </h2>
            <div className="space-y-3 text-secondary leading-relaxed">
              <p>
                <span className="font-medium text-primary">Start with the Bismillah.</span>{' '}
                The first verse is said before almost every action in a Muslim&apos;s daily life. Practice
                it until you can say it smoothly and naturally, with the correct elongation on
                &ldquo;Rahmaan&rdquo; and &ldquo;Raheem.&rdquo;
              </p>
              <p>
                <span className="font-medium text-primary">Learn one verse at a time.</span>{' '}
                Do not try to memorise all seven verses at once. Master each verse before moving
                to the next. Repeat each verse 10 to 20 times until it flows without hesitation.
              </p>
              <p>
                <span className="font-medium text-primary">Listen and repeat.</span>{' '}
                Use our audio feature to hear a professional reciter pronounce each verse, then
                pause and repeat it yourself. Match the timing and melody as closely as you can.
              </p>
              <p>
                <span className="font-medium text-primary">Pay attention to the colours.</span>{' '}
                When you read Al-Fatiha in our{' '}
                <Link href="/page/5" className="text-accent hover:underline">
                  colour-coded reader
                </Link>
                , each colour tells you something about pronunciation. Red means hold the sound
                longer. Green means nasalise. Grey means skip (silent letter). These visual cues
                are your built-in teacher.
              </p>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Common Pronunciation Mistakes to Avoid
            </h2>
            <div className="space-y-3 text-secondary leading-relaxed">
              <p>
                <span className="font-medium text-primary">
                  Rushing through the prolongations.
                </span>{' '}
                When you see a long vowel (aa, ee, oo), hold it for the full 2 counts. Many
                beginners skip the elongation, which changes the rhythm and can affect the
                meaning.
              </p>
              <p>
                <span className="font-medium text-primary">
                  Pronouncing the Saad (ص) as a regular S.
                </span>{' '}
                In &ldquo;Siraatal&rdquo; (verse 6), the S is a Saad — an emphatic letter that
                requires the tongue to press upward. It sounds deeper and heavier than a normal
                English S.
              </p>
              <p>
                <span className="font-medium text-primary">
                  Missing the 6-count Madd in the last verse.
                </span>{' '}
                The word &ldquo;daaallleen&rdquo; at the end of verse 7 contains a Madd Laazim —
                a necessary prolongation of 6 counts. This is the longest held sound in the
                entire surah and is often shortened by beginners.
              </p>
              <p>
                <span className="font-medium text-primary">
                  Not distinguishing between similar sounds.
                </span>{' '}
                Arabic has pairs of letters that sound similar to English ears but are very
                different: Ha (ح) vs Haa (هـ), Saad (ص) vs Sin (س), Daad (ض) vs Daal (د).
                The Tajweed colours help you identify when emphasis is needed.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  How many verses are in Surah Al-Fatiha?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Surah Al-Fatiha contains 7 verses. It is the first and shortest surah that is
                  recited in full during every unit of Islamic prayer.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  How do you read Surah Al-Fatiha in English?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  You can read Surah Al-Fatiha in English using transliteration — the Arabic sounds
                  written in English letters. It begins with &ldquo;Bismillaahir-Rahmaanir-Raheem.&rdquo;
                  Our colour-coded transliteration adds visual pronunciation guides for correct Tajweed.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  Why is Surah Al-Fatiha so important?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Al-Fatiha is recited in every unit of every prayer, making it the most frequently
                  read passage in the Quran. Muslims who pray five times daily recite it at least
                  17 times each day. It encapsulates the core themes of the entire Quran.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  What does Surah Al-Fatiha mean?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Al-Fatiha means &ldquo;The Opening.&rdquo; It opens the Quran and opens every unit
                  of prayer. The surah praises Allah, acknowledges His sovereignty over the Day of
                  Judgement, and asks for guidance to the straight path.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-8 rounded-xl bg-surface p-6 text-center">
            <h2 className="text-lg font-semibold mb-2">
              Read Al-Fatiha with Full Tajweed Colour Coding
            </h2>
            <p className="text-secondary mb-4 text-sm">
              See every Tajweed rule applied visually in our interactive reader.
            </p>
            <Link
              href="/page/5"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 font-semibold text-bg transition-transform hover:scale-105"
            >
              Open Surah Al-Fatiha in the Reader
            </Link>
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
                  Complete transliteration guide for non-Arabic speakers.
                </p>
              </Link>
              <Link
                href="/learn/tajweed-rules"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Tajweed Rules Guide</p>
                <p className="text-sm text-muted mt-1">
                  All Tajweed rules explained with colour chart.
                </p>
              </Link>
              <Link
                href="/surah/al-ikhlas"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Al-Ikhlas</p>
                <p className="text-sm text-muted mt-1">
                  Another short surah to learn next — only 4 verses.
                </p>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
