import type { Metadata } from 'next';
import Link from 'next/link';
import { getAbsoluteUrl, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title:
    'How to Pronounce Arabic Letters for Quran Reading — Complete Guide | Free',
  description:
    'Learn how to pronounce every Arabic letter correctly for Quran recitation. This free guide covers articulation points (Makharij), letter characteristics, common mistakes, and how colour-coded Tajweed helps with pronunciation.',
  alternates: {
    canonical: '/learn/how-to-pronounce-arabic-letters',
  },
  openGraph: {
    type: 'article',
    url: getAbsoluteUrl('/learn/how-to-pronounce-arabic-letters'),
    title: 'How to Pronounce Arabic Letters for Quran Reading',
    description:
      'Complete guide to Arabic letter pronunciation for Quran recitation with articulation points and common mistakes.',
    siteName: 'Quran Tajweed Transliteration',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arabic Letter Pronunciation Guide | Quran Reading',
    description:
      'Learn to pronounce every Arabic letter for correct Quran recitation.',
    images: ['/og-image.png'],
  },
};

/** Arabic letter groups organized by articulation point */
const LETTER_GROUPS = [
  {
    region: 'Throat (Al-Halq)',
    description:
      'These sounds originate from the throat at three depths. They have no English equivalent and require practice.',
    letters: [
      {
        arabic: 'ء / أ',
        name: 'Hamzah / Alif',
        transliteration: "' / a",
        sound: 'A glottal stop — the catch in your throat when you say "uh-oh". Alif is the vowel carrier.',
        english_close: 'The pause between "uh" and "oh"',
      },
      {
        arabic: 'هـ',
        name: 'Haa',
        transliteration: 'h',
        sound: 'A breathy H from deep in the throat, like fogging up a mirror. Softer and deeper than English H.',
        english_close: 'Like a heavy exhale: "haaah"',
      },
      {
        arabic: 'ع',
        name: 'Ayn',
        transliteration: "'a",
        sound: 'A deep, strangled vowel sound from the middle of the throat. No English equivalent. Squeeze the throat muscles.',
        english_close: 'No equivalent — unique to Arabic',
      },
      {
        arabic: 'ح',
        name: 'Haa (emphatic)',
        transliteration: 'H',
        sound: 'A strong, breathy H from the middle of the throat. More forceful than Haa (هـ) but without vibration.',
        english_close: 'A forceful whispered "ha" — stronger than English H',
      },
      {
        arabic: 'غ',
        name: 'Ghayn',
        transliteration: 'gh',
        sound: 'A gargling sound from the upper throat, like the French "R" in "Paris". The back of the tongue rises toward the uvula.',
        english_close: 'Similar to the French "R" or gargling',
      },
      {
        arabic: 'خ',
        name: 'Khaa',
        transliteration: 'kh',
        sound: 'A raspy sound from the upper throat, like clearing phlegm gently. Similar to the Scottish "loch" or German "Bach".',
        english_close: '"ch" in Scottish "loch"',
      },
    ],
  },
  {
    region: 'Tongue — Back (Al-Lisaan)',
    description:
      'These sounds are made by the back of the tongue touching or approaching the upper palate.',
    letters: [
      {
        arabic: 'ق',
        name: 'Qaf',
        transliteration: 'q',
        sound: 'A deep K sound produced far back in the throat where the tongue meets the uvula. Much deeper than English K.',
        english_close: 'A very deep "K" — like choking slightly on "cough"',
      },
      {
        arabic: 'ك',
        name: 'Kaf',
        transliteration: 'k',
        sound: 'Similar to English K but crisper. The back of the tongue touches the soft palate.',
        english_close: '"K" in "kite"',
      },
    ],
  },
  {
    region: 'Tongue — Middle',
    description:
      'The middle of the tongue rises to the hard palate to produce these sounds.',
    letters: [
      {
        arabic: 'ج',
        name: 'Jiim',
        transliteration: 'j',
        sound: 'Like English J in "jam". The middle of the tongue presses against the hard palate.',
        english_close: '"J" in "jam"',
      },
      {
        arabic: 'ش',
        name: 'Shiin',
        transliteration: 'sh',
        sound: 'Like English "sh" in "ship". Air flows over the middle of the tongue.',
        english_close: '"sh" in "ship"',
      },
      {
        arabic: 'ي',
        name: 'Yaa',
        transliteration: 'y',
        sound: 'Like English Y in "yes". Also serves as the long vowel "ee" when carrying a sukoon.',
        english_close: '"Y" in "yes"',
      },
    ],
  },
  {
    region: 'Tongue — Tip and Edges',
    description:
      'The tip and edges of the tongue create these sounds by touching different parts of the mouth. This group contains some of the most challenging sounds for non-Arabic speakers.',
    letters: [
      {
        arabic: 'ض',
        name: 'Daad',
        transliteration: 'D',
        sound: 'The most unique Arabic letter. Press the edge of the tongue against the upper molars with emphasis. Arabic is sometimes called "the language of Daad" because this sound exists in no other language.',
        english_close: 'No equivalent — unique to Arabic',
      },
      {
        arabic: 'ل',
        name: 'Laam',
        transliteration: 'l',
        sound: 'Like English L. The tip of the tongue touches the gum ridge behind the upper front teeth.',
        english_close: '"L" in "light"',
      },
      {
        arabic: 'ن',
        name: 'Noon',
        transliteration: 'n',
        sound: 'Like English N. The tip of the tongue touches the gum ridge. When carrying a shaddah or in Ghunnah rules, the nasal resonance is held for 2 counts.',
        english_close: '"N" in "noon"',
      },
      {
        arabic: 'ر',
        name: 'Raa',
        transliteration: 'r',
        sound: 'A rolled or tapped R — the tip of the tongue taps the gum ridge once. Not the English R. More like the Spanish single-tap R in "pero".',
        english_close: 'Spanish single-tap "R" in "pero"',
      },
      {
        arabic: 'ط',
        name: 'Taa (emphatic)',
        transliteration: 'T',
        sound: 'An emphatic T. The tongue touches the gum ridge while the body of the tongue rises, creating a deeper, heavier sound.',
        english_close: 'A very heavy "T"',
      },
      {
        arabic: 'د',
        name: 'Daal',
        transliteration: 'd',
        sound: 'Like English D. The tip of the tongue touches the gum ridge behind the upper teeth.',
        english_close: '"D" in "door"',
      },
      {
        arabic: 'ت',
        name: 'Taa',
        transliteration: 't',
        sound: 'Like English T. The tip of the tongue touches the gum ridge. Lighter than the emphatic Taa (ط).',
        english_close: '"T" in "time"',
      },
      {
        arabic: 'ص',
        name: 'Saad',
        transliteration: 'S',
        sound: 'An emphatic S. The tongue is in the S position but the body of the tongue rises, producing a deep, heavy S sound.',
        english_close: 'A very heavy "S" — like "S" with a full mouth',
      },
      {
        arabic: 'ز',
        name: 'Zaay',
        transliteration: 'z',
        sound: 'Like English Z in "zoo". The tip of the tongue is near the upper teeth.',
        english_close: '"Z" in "zoo"',
      },
      {
        arabic: 'س',
        name: 'Siin',
        transliteration: 's',
        sound: 'Like English S in "sun". Light and sharp. Distinctly different from the emphatic Saad (ص).',
        english_close: '"S" in "sun"',
      },
      {
        arabic: 'ظ',
        name: 'Dhaa (emphatic)',
        transliteration: 'DH',
        sound: 'An emphatic TH sound. The tongue protrudes slightly between the teeth with emphasis. Like English "th" in "the" but heavier.',
        english_close: 'Heavy "TH" as in "the"',
      },
      {
        arabic: 'ذ',
        name: 'Dhaal',
        transliteration: 'dh',
        sound: 'Like the "th" in English "the" or "this". The tongue tip protrudes slightly between the teeth.',
        english_close: '"TH" in "the"',
      },
      {
        arabic: 'ث',
        name: 'Thaa',
        transliteration: 'th',
        sound: 'Like the "th" in English "think" or "three". The tongue tip protrudes slightly between the teeth.',
        english_close: '"TH" in "think"',
      },
    ],
  },
  {
    region: 'Lips (Ash-Shafataan)',
    description:
      'These sounds are produced using the lips, either together or with the lower lip against the upper teeth.',
    letters: [
      {
        arabic: 'ف',
        name: 'Faa',
        transliteration: 'f',
        sound: 'Like English F. The lower lip touches the edge of the upper front teeth.',
        english_close: '"F" in "fish"',
      },
      {
        arabic: 'و',
        name: 'Waaw',
        transliteration: 'w',
        sound: 'Like English W in "water". The lips round together. Also serves as the long vowel "oo" when carrying a sukoon.',
        english_close: '"W" in "water"',
      },
      {
        arabic: 'ب',
        name: 'Baa',
        transliteration: 'b',
        sound: 'Like English B in "boy". Both lips press together and release.',
        english_close: '"B" in "boy"',
      },
      {
        arabic: 'م',
        name: 'Miim',
        transliteration: 'm',
        sound: 'Like English M in "moon". Both lips close. When carrying a shaddah or in Ghunnah rules, the nasal resonance is held for 2 counts.',
        english_close: '"M" in "moon"',
      },
    ],
  },
  {
    region: 'Nasal Cavity (Al-Khayshoom)',
    description:
      'The nasal passage produces the Ghunnah — a resonant humming sound that accompanies certain Noon and Meem rules.',
    letters: [
      {
        arabic: 'غنة',
        name: 'Ghunnah',
        transliteration: '(nasal)',
        sound: 'Not a letter but a quality. A nasal hum that accompanies Noon with shaddah, Meem with shaddah, Idgham with Ghunnah, and Ikhfaa. Held for 2 counts.',
        english_close: 'The humming "ng" sound at the end of "sing"',
      },
    ],
  },
];

/**
 * Cornerstone content page: How to Pronounce Arabic Letters.
 * Targets: "arabic pronunciation guide", "how to pronounce arabic letters",
 * "arabic letters for quran", "quran pronunciation guide", "makharij al huruf".
 */
export default function HowToPronounceArabicLettersPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'How to Pronounce Arabic Letters for Quran Reading — Complete Guide',
      description:
        'Learn the correct pronunciation of every Arabic letter with articulation points, English comparisons, and Tajweed tips.',
      url: getAbsoluteUrl('/learn/how-to-pronounce-arabic-letters'),
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
      timeRequired: 'PT14M',
      wordCount: 2800,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Quran Tajweed Transliteration',
        url: SITE_URL,
      },
      about: [
        { '@type': 'Thing', name: 'Arabic Pronunciation' },
        { '@type': 'Thing', name: 'Quran Recitation' },
        { '@type': 'Thing', name: 'Makharij' },
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
          name: 'How to Pronounce Arabic Letters',
          item: getAbsoluteUrl('/learn/how-to-pronounce-arabic-letters'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many letters are in the Arabic alphabet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Arabic alphabet has 28 letters (29 if you count Hamzah separately). Each letter has up to four forms depending on its position in a word: initial, medial, final, and isolated. For Quran reading, you also need to know the three short vowels (Fathah, Kasrah, Dammah) and the Sukoon (absence of vowel).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the hardest Arabic letter to pronounce?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The most challenging letters for non-Arabic speakers are typically Ayn (ع), Daad (ض), Haa (ح), Ghayn (غ), and Qaf (ق). Daad is considered the most unique, as it exists in no other language — Arabic is sometimes called 'the language of Daad'. These letters require using parts of the throat and tongue that English speakers rarely engage.",
          },
        },
        {
          '@type': 'Question',
          name: 'What are Makharij in Tajweed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Makharij (مخارج) means "articulation points" — the specific locations in the mouth, throat, and nasal passages where each Arabic letter is produced. Knowing the correct Makhraj (singular) for each letter is essential for proper Quran recitation. There are 17 main articulation points grouped into five regions: the throat, tongue, lips, nasal cavity, and the oral cavity (for vowels).',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to learn Arabic pronunciation for Quran?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Learning basic Arabic letter pronunciation typically takes 2-4 weeks of daily practice. Achieving fluent, natural pronunciation with proper Tajweed can take 3-6 months. Using colour-coded Tajweed transliteration accelerates the process because it shows pronunciation rules visually as you read. Consistent daily practice is more effective than infrequent long sessions.',
          },
        },
      ],
    },,
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Pronounce Arabic Letters for Quran Recitation',
      description: 'Learn to pronounce all Arabic letters correctly by understanding their articulation points (Makharij) and using English approximations.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand Articulation Points (Makharij)',
          text: 'Arabic letters are grouped by where in the mouth or throat they are produced. Learning these 5 areas — throat, tongue, lips, nasal cavity, and empty mouth — gives you a framework for every letter.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Learn the Throat Letters',
          text: 'Master the 6 throat letters (Haa, Hamza, Ain, Haa, Ghain, Khaa) which have no direct English equivalents. Practice producing sounds from deep, middle, and upper throat positions.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Master Tongue Letters',
          text: 'Practice the tongue letters by paying attention to which part of the tongue touches which part of the mouth. Letters like Qaaf, Kaaf, Taa, and Daad each use different tongue positions.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Practice Lip Letters',
          text: 'The lip letters (Baa, Meem, Waw, Faa) are the most familiar to English speakers. Focus on the subtle differences in how firmly the lips meet.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Apply Colour-Coded Tajweed While Reading',
          text: 'Use the colour-coded transliteration at tajweedtranslit.com to practise pronunciation in context. Each colour represents a Tajweed rule that affects how letters are pronounced.',
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
                Arabic Letter Pronunciation
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              How to Pronounce Arabic Letters for Quran Reading
            </h1>
            <p className="text-secondary mt-2 leading-relaxed">
              Correct pronunciation is the foundation of Quran recitation. Arabic has several sounds
              that do not exist in English, particularly from the throat and emphatic tongue
              positions. This guide walks through every letter grouped by where in the mouth it is
              produced — what Tajweed scholars call the Makharij (articulation points).
            </p>
          </header>

          {/* What are Makharij */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              What are Makharij (Articulation Points)?
            </h2>
            <p className="text-secondary leading-relaxed">
              Every Arabic letter has a specific origin point in the mouth, throat, or nasal
              passage. Tajweed calls these points Makharij (مخارج). Getting the Makhraj right is
              essential — producing a letter from the wrong point can change one word into
              another. There are five main regions: the throat, the tongue (back, middle, tip, and
              edges), the lips, the nasal cavity, and the oral cavity (for vowel sounds).
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              The guide below groups all Arabic letters by their articulation region so you can
              practice sounds that come from the same area together. For each letter, you will
              see the Arabic character, its transliteration, how to produce the sound, and the
              closest English approximation.
            </p>
          </section>

          {/* Letter Groups */}
          {LETTER_GROUPS.map((group) => (
            <section key={group.region} className="mb-8">
              <h2 className="text-lg font-semibold mb-2">{group.region}</h2>
              <p className="text-sm text-secondary mb-4">{group.description}</p>

              <div className="space-y-3">
                {group.letters.map((letter) => (
                  <div
                    key={letter.name}
                    className="rounded-xl bg-surface p-4 border border-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-bg text-2xl font-brand" dir="rtl">
                        {letter.arabic}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h3 className="font-semibold text-primary">
                            {letter.name}
                          </h3>
                          <span className="text-sm text-accent">
                            [{letter.transliteration}]
                          </span>
                        </div>
                        <p className="text-sm text-secondary mt-1 leading-relaxed">
                          {letter.sound}
                        </p>
                        <p className="text-xs text-muted mt-1">
                          Closest English sound: <span className="italic">{letter.english_close}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Letters That Trip Up English Speakers */}
          <section className="mb-8 rounded-xl bg-surface p-6">
            <h2 className="text-lg font-semibold mb-3">
              The 5 Hardest Letters for English Speakers
            </h2>
            <p className="text-secondary text-sm mb-4">
              These letters require sounds that do not exist in English. They need the most
              practice, but getting them right will transform your recitation.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-brand flex-shrink-0 w-8 text-center" dir="rtl">ع</span>
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Ayn</span> — Squeeze the
                  middle of your throat to produce a strangled vowel. Practice by saying
                  &ldquo;aah&rdquo; while tightening your throat muscles.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl font-brand flex-shrink-0 w-8 text-center" dir="rtl">ض</span>
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Daad</span> — The most unique
                  Arabic sound. Press the sides of your tongue against your upper molars while
                  making a heavy D sound. No other language has this letter.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl font-brand flex-shrink-0 w-8 text-center" dir="rtl">ح</span>
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Haa (emphatic)</span> — A
                  forceful, breathy H from the middle of the throat. Practice by whispering
                  &ldquo;ha&rdquo; as forcefully as you can without using your vocal cords.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl font-brand flex-shrink-0 w-8 text-center" dir="rtl">غ</span>
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Ghayn</span> — A gargling
                  sound from the back of the throat. If you can say the French R in
                  &ldquo;Paris,&rdquo; you can say Ghayn.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl font-brand flex-shrink-0 w-8 text-center" dir="rtl">ق</span>
                <p className="text-sm text-secondary">
                  <span className="font-medium text-primary">Qaf</span> — A very deep K
                  from the back of the throat, almost at the uvula. Much deeper and heavier
                  than English K. Practice by saying &ldquo;cough&rdquo; and noticing where the
                  K sound comes from — Qaf is even deeper.
                </p>
              </div>
            </div>
          </section>

          {/* Emphatic vs Light Pairs */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Emphatic vs Light Letter Pairs
            </h2>
            <p className="text-secondary leading-relaxed mb-4">
              Arabic has pairs of letters that sound similar but differ in emphasis (Tafkheem
              vs Tarqeeq). The emphatic version is heavier and deeper — the body of the tongue
              rises toward the palate. Getting these pairs right is critical because mixing them
              up can change the meaning of words. In our colour-coded reader, emphatic letters
              are marked in blue.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-left text-muted font-medium">Light Letter</th>
                    <th className="py-3 px-4 text-left text-muted font-medium">Emphatic Letter</th>
                    <th className="py-3 px-4 text-left text-muted font-medium">Difference</th>
                  </tr>
                </thead>
                <tbody className="text-secondary">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4"><span dir="rtl" className="font-brand">س</span> Siin (s)</td>
                    <td className="py-3 px-4"><span dir="rtl" className="font-brand text-blue-400">ص</span> Saad (S)</td>
                    <td className="py-3 px-4">Saad is deeper, heavier — tongue body rises</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4"><span dir="rtl" className="font-brand">د</span> Daal (d)</td>
                    <td className="py-3 px-4"><span dir="rtl" className="font-brand text-blue-400">ض</span> Daad (D)</td>
                    <td className="py-3 px-4">Daad uses tongue edges against upper molars</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4"><span dir="rtl" className="font-brand">ت</span> Taa (t)</td>
                    <td className="py-3 px-4"><span dir="rtl" className="font-brand text-blue-400">ط</span> Taa emphatic (T)</td>
                    <td className="py-3 px-4">Emphatic Taa is heavier — tongue body rises</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><span dir="rtl" className="font-brand">ذ</span> Dhaal (dh)</td>
                    <td className="py-3 px-4"><span dir="rtl" className="font-brand text-blue-400">ظ</span> Dhaa emphatic (DH)</td>
                    <td className="py-3 px-4">Emphatic Dhaa is heavier — same as TH but with Tafkheem</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How Tajweed Colours Help */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              How Tajweed Colour Coding Helps with Pronunciation
            </h2>
            <p className="text-secondary leading-relaxed">
              Knowing the articulation points is the foundation, but when you are reading the
              Quran, you also need to know when to apply special pronunciation rules. This is
              where colour-coded Tajweed transliteration becomes invaluable. Instead of memorising
              which rule applies to every combination of letters, the colours tell you instantly
              what to do.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              Emphatic letters appear in blue — reminding you to produce a heavier sound. Letters
              that need prolongation appear in red — telling you to hold the vowel. Nasal sounds
              appear in green — indicating you need to hum through your nose. Silent letters
              appear in grey — so you know to skip them. This visual system makes it possible to
              apply Tajweed rules correctly even as a beginner.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  How many letters are in the Arabic alphabet?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  The Arabic alphabet has 28 letters (29 if you count Hamzah as a separate letter).
                  Each letter has up to four written forms depending on its position in a word. For
                  Quran reading, you also need to know the short vowels (Fathah, Kasrah, Dammah)
                  and the Sukoon.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  What is the hardest Arabic letter to pronounce?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  For non-Arabic speakers, the hardest letters are typically Ayn (ع), Daad (ض),
                  Haa (ح), Ghayn (غ), and Qaf (ق). Daad is considered the most unique letter in
                  any language — Arabic is sometimes called &ldquo;the language of Daad&rdquo;
                  because no other language has this exact sound.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  What are Makharij in Tajweed?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Makharij means &ldquo;articulation points&rdquo; — the specific locations in the
                  mouth, throat, and nasal passages where each Arabic letter is produced. There are
                  17 main articulation points grouped into five regions. Knowing the correct Makhraj
                  for each letter is fundamental to proper Quran recitation.
                </p>
              </details>

              <details className="rounded-xl bg-surface p-4 group">
                <summary className="cursor-pointer font-medium text-secondary group-open:text-accent">
                  How long does it take to learn Arabic pronunciation for Quran?
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Basic letter pronunciation takes 2 to 4 weeks of daily practice. Achieving
                  fluent pronunciation with proper Tajweed typically takes 3 to 6 months.
                  Colour-coded transliteration accelerates the process by showing pronunciation
                  rules visually as you read.
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
              Practice Pronunciation in the Reader
            </Link>
            <p className="mt-2 text-sm text-muted">
              See colour-coded Tajweed applied to every page
            </p>
          </section>

          {/* Related */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Continue Learning</h2>
            <div className="grid gap-3 sm:grid-cols-3">
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
                href="/learn/surah-al-fatiha-transliteration"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">Surah Al-Fatiha Transliteration</p>
                <p className="text-sm text-muted mt-1">
                  Practice pronunciation with a verse-by-verse guide.
                </p>
              </Link>
              <Link
                href="/learn/how-to-read-quran-in-english"
                className="rounded-xl bg-surface p-4 hover:bg-surface-hover transition-colors"
              >
                <p className="font-medium">How to Read the Quran in English</p>
                <p className="text-sm text-muted mt-1">
                  Complete transliteration guide for non-Arabic speakers.
                </p>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
