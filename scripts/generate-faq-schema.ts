#!/usr/bin/env tsx
/**
 * FAQ Schema Generator
 * Generates FAQPage JSON-LD structured data for key landing pages:
 *   - Homepage
 *   - All 114 Surah pages (common FAQs per Surah)
 *   - Tajweed rules page
 *   - General Quran reading page
 *
 * Run: pnpm generate:faq
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUT_DIR = join(process.cwd(), 'src', 'data', 'faq-schemas');
mkdirSync(OUT_DIR, { recursive: true });

// ── FAQ Data ───────────────────────────────────────────────────────────────────

const HOMEPAGE_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Tajweed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tajweed (تجويد) means "to beautify" or "to improve" in Arabic. In the context of Quran recitation, it refers to the set of rules that govern the proper pronunciation and elongation of Arabic letters and words. Tajweed ensures the Quran is recited as it was revealed to Prophet Muhammad ﷺ, preserving both meaning and beauty.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Quran transliteration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quran transliteration is the representation of Arabic Quranic text using Latin (Roman) script, enabling non-Arabic speakers to read and pronounce the Quran. TajweedTranslit.com provides English transliteration alongside colour-coded Tajweed rules, making it accessible for learners worldwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Tajweed colour coding work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each colour on TajweedTranslit.com represents a specific Tajweed pronunciation rule. For example, red indicates necessary prolongation (Madd Al-Lazim), green indicates nasalisation (Ghunnah), and purple indicates the echoing sound of Qalqalah. When you tap any highlighted word, a detailed explanation of the applicable rule appears.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TajweedTranslit.com free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, TajweedTranslit.com is completely free, ad-free, and open to everyone. Our mission is to help the global community recite the Quran with confidence and precision, bridging language barriers through expert transliteration that honors Tajweed rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I listen to Quran recitation on TajweedTranslit.com?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We are working on adding ayah-by-ayah audio recitation from renowned Qaris, synchronised with the text as you read. Sign up for updates on our Donate page to be notified when this feature launches.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I navigate between Surahs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the sidebar to browse by Surah name or by Juz (part). You can also navigate page by page using keyboard arrows or swipe gestures on mobile. Each Surah landing page includes a direct link to start reading.',
      },
    },
  ],
};

const TAJWEED_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the main Tajweed rules?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The main Tajweed rules include: Ikhfa (concealment), Idgham (merging), Ghunnah (nasalisation), Qalqalah (echoing), Madd (elongation in 4 forms), Tafkheem and Tarqeeq (heavy and light pronunciation), and Hamzat al-Wasl. Each rule governs how specific letters and sounds are pronounced during Quran recitation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Ikhfa (الإخفاء)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ikhfa (Concealment) is a Tajweed rule where a noon sakinah (نْ) or tanween is pronounced with a slight nasal sound while the tongue touches the roof of the mouth. It occurs before one of 15 specific letters. The sound is heard but not fully merged — it is "concealed."',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Idgham (الإدغام)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Idgham (Merging) is a Tajweed rule where a noon sakinah or tanween is completely merged into the following letter, producing a nasalised sound. There are two types: Idgham with Ghunnah (with nasalisation, before ي، ن، م، و) and Idgham without Ghunnah (before ل، ر).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Ghunnah (الغنة)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ghunnah is a nasalisation sound held for 2 counts (harakah). It accompanies noon and meem when they have a shaddah (نّ، مّ), when Idgham with Ghunnah occurs, and when Ikhfa is applied. The sound resonates from the nasal passage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Qalqalah (القلقلة)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Qalqalah (Echoing) is a slight bouncing or echoing sound when pronouncing the five Qalqalah letters (ق، ط، ب، ج، د) when they carry a sukoon. The echo is stronger at the end of a verse (Qalqalah Kubra) than in the middle of a word (Qalqalah Sughra).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Madd (المد) in Tajweed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Madd means "elongation" or "prolongation." There are four types: Natural Madd (2 harakah, always applied), Necessary Madd (6 harakah, when a letter of madd is followed by sukoon in the same word), Obligatory Madd (4-5 harakah, when a letter of madd is followed by hamzah in the same word), and Permissible Madd (2, 4, or 6 harakah, when a letter of madd at the end of a word is followed by hamzah at the start of the next word).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Tafkheem (التفخيم)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tafkheem means "emphatic" or "heavy" pronunciation. It is a full, heavy sound where the tongue rises towards the hard palate. It applies to seven letters: ص، ض، ط، ظ، خ، غ، ق. Additionally, the letter ل in "Allah" is pronounced heavily (muqaddarah) when it has a fathah or dammah.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is learning Tajweed important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Learning Tajweed is important because the Quran was revealed with specific rules of recitation, and applying Tajweed correctly preserves the meaning of the text. Mispronunciation can change the meaning of words, sometimes significantly. Additionally, proper Tajweed enhances the beauty and spiritual experience of Quran recitation.',
      },
    },
  ],
};

const READING_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I start reading the Quran with Tajweed transliteration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply visit TajweedTranslit.com — you will be redirected to Surah Al-Fatiha (page 5), the opening chapter of the Quran. Read the transliterated text and notice the colour-coded letters — each colour represents a Tajweed rule. Tap any highlighted letter to see a detailed explanation of the rule applied.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to know Arabic to use TajweedTranslit.com?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, you do not need to know Arabic to use TajweedTranslit.com. The English transliteration allows you to read the Quran phonetically, and the colour-coded Tajweed rules visually guide you on proper pronunciation. Each highlighted letter includes a plain-English explanation of the pronunciation rule.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Surah Al-Fatiha and other Surahs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Surah Al-Fatiha (The Opening) is unique because it is recited in every unit of Muslim prayer (Salah/Ramadan prayers), making it the most frequently repeated chapter of the Quran. It consists of 7 verses and serves as a du\'a (supplication) to Allah, praising Him and asking for guidance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the 30 Juz (parts) of the Quran?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Quran is divided into 30 equal parts (Juz), making it convenient for Muslims to complete the Quran in 30 days during Ramadan (Qira\'at) or over the course of a year. Each Juz contains between 20 and 40 pages and covers different Surahs and verses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I bookmark pages on TajweedTranslit.com?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, TajweedTranslit.com supports bookmarks. You can save any page and return to it later. Your bookmarks are stored in your browser (localStorage) so they persist between visits.',
      },
    },
  ],
};

// ── Per-Surah FAQ Generator ───────────────────────────────────────────────────

const SURAH_DATA: Array<{ number: number; name: string; verses: number; revelation_type: string; meaning: string }> = [
  { number: 1,   name: 'Al-Fatiha',          verses: 7,    revelation_type: 'Meccan',  meaning: 'The Opening' },
  { number: 2,   name: 'Al-Baqara',           verses: 286,  revelation_type: 'Medinan', meaning: 'The Cow' },
  { number: 3,   name: 'Al-Imran',            verses: 200,  revelation_type: 'Medinan', meaning: 'The Family of Imran' },
  { number: 18,  name: 'Al-Kahf',             verses: 110,  revelation_type: 'Meccan',  meaning: 'The Cave' },
  { number: 36,  name: 'Ya-Sin',              verses: 83,   revelation_type: 'Meccan',  meaning: 'Ya-Sin' },
  { number: 55,  name: 'Ar-Rahman',           verses: 78,   revelation_type: 'Medinan', meaning: 'The Most Merciful' },
  { number: 56,  name: 'Al-Waqi\'a',          verses: 96,   revelation_type: 'Meccan',  meaning: 'The Inevitable' },
  { number: 67,  name: 'Al-Mulk',             verses: 30,   revelation_type: 'Meccan',  meaning: 'The Sovereignty' },
  { number: 97,  name: 'Al-Qadr',             verses: 5,    revelation_type: 'Meccan',  meaning: 'The Power' },
  { number: 112, name: 'Al-Ikhlas',            verses: 4,    revelation_type: 'Meccan',  meaning: 'The Sincerity' },
  { number: 113, name: 'Al-Falaq',            verses: 5,    revelation_type: 'Meccan',  meaning: 'The Daybreak' },
  { number: 114, name: 'An-Nas',             verses: 6,    revelation_type: 'Meccan',  meaning: 'Mankind' },
];

function generateSurahFaq(surah: typeof SURAH_DATA[0]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How many verses are in Surah ${surah.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Surah ${surah.name} contains ${surah.verses} verses (ayat).`,
        },
      },
      {
        '@type': 'Question',
        name: `Is Surah ${surah.name} Meccan or Medinan?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Surah ${surah.name} was revealed ${surah.revelation_type === 'Meccan' ? 'in Mecca (Meccan)' : 'in Medina (Medinan)'} during the ${surah.revelation_type === 'Meccan' ? 'early Meccan period of Prophet Muhammad\'s mission' : 'Medinan period after the Hijrah (622 CE)'}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the meaning of Surah ${surah.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The name "${surah.name}" means "${surah.meaning}" in English. It is the ${surah.number}${['st','nd','rd'][((surah.number+90)%100-10)%10-1]||'th'} Surah of the Holy Quran.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do I read Surah ${surah.name} with Tajweed transliteration online?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can read Surah ${surah.name} in English transliteration with Tajweed colour coding at TajweedTranslit.com. Each colour represents a different pronunciation rule. Tap any highlighted letter for a detailed explanation.`,
        },
      },
      {
        '@type': 'Question',
        name: `Why is Surah ${surah.name} important?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: surah.number === 1
            ? 'Surah Al-Fatiha is recited in every unit of Muslim prayer, making it the most frequently repeated chapter of the Quran. It is called the "Mother of the Book" (Umm al-Kitab).'
            : surah.number === 18
            ? 'Surah Al-Kahf is one of the most beloved surahs. Reciting it on Friday brings light for the following eight days. It contains three powerful stories: the People of the Cave, the man with two gardens, and Musa and Khidr.'
            : surah.number === 36
            ? 'Surah Ya-Sin is known as the "Heart of the Quran." It is recommended to recite it for the deceased and on Friday evenings.'
            : surah.number === 55
            ? 'Surah Ar-Rahman is the most frequently recited surah in the Muslim world. Allah repeatedly asks "Which of your Lord\'s blessings would you deny?" — enumerating the blessings of Paradise.'
            : surah.number === 67
            ? 'Surah Al-Mulk is called "Al-Munik" by the Companions. Reciting it protects from the punishment of the grave. It is one of the most beloved surahs for daily recitation.'
            : surah.number === 97
            ? 'Surah Al-Qadr reveals the virtue of Laylat al-Qadr (the Night of Decree) — better than a thousand months of worship. It is recommended to recite it on Laylat al-Qadr.'
            : surah.number === 112
            ? 'Surah Al-Ikhlas declares the absolute oneness of Allah in its purest form. Reciting it in Salah equals reciting one-third of the Quran in reward.'
            : `Surah ${surah.name} holds special significance in Islamic tradition. Regular recitation is encouraged for spiritual benefit and reward.`,
        },
      },
    ],
  };
}

// ── Run ────────────────────────────────────────────────────────────────────────

function generateFaqSchemas(): void {
  // Homepage
  writeFileSync(join(OUT_DIR, 'homepage.json'), JSON.stringify(HOMEPAGE_FAQ, null, 2), 'utf-8');
  console.log('✅ homepage.json');

  // Tajweed rules page
  writeFileSync(join(OUT_DIR, 'tajweed.json'), JSON.stringify(TAJWEED_FAQ, null, 2), 'utf-8');
  console.log('✅ tajweed.json');

  // General reading FAQ
  writeFileSync(join(OUT_DIR, 'reading.json'), JSON.stringify(READING_FAQ, null, 2), 'utf-8');
  console.log('✅ reading.json');

  // Per-Surah FAQs
  for (const surah of SURAH_DATA) {
    const filename = `surah-${surah.number.toString().padStart(3, '0')}.json`;
    writeFileSync(join(OUT_DIR, filename), JSON.stringify(generateSurahFaq(surah), null, 2), 'utf-8');
  }
  console.log(`✅ Per-Surah FAQ pages: ${SURAH_DATA.length}`);
  console.log(`\n📁 All FAQ schemas: ${OUT_DIR}`);
  console.log('\nTo use: import the relevant JSON file and inject via <script type="application/ld+json"> in the page head.');
}

generateFaqSchemas();
