#!/usr/bin/env tsx
/**
 * AI-Assisted Surah Mapping
 *
 * Scans all page images using Claude's vision to identify where each surah starts.
 * Looks for the distinctive green-bordered surah title frames.
 *
 * Usage: ANTHROPIC_API_KEY=sk-... tsx scripts/map-surahs-ai.ts
 *
 * Strategy:
 * 1. Estimate each surah's page using standard Mushaf numbers + offset
 * 2. Scan a window of pages around each estimate
 * 3. Ask Claude to identify if a surah title frame is present
 * 4. Record findings and output final mapping
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

const PAGES_DIR = path.resolve(__dirname, '../public/pages');
const OUTPUT_FILE = path.resolve(
  __dirname,
  '../content/data/surah-mapping-ai.json',
);
const TOTAL_PAGES = 1275;

// Known surah names in order (1-114)
const SURAH_NAMES = [
  'Al-Fatiha',
  'Al-Baqara',
  'Al-Imran',
  "An-Nisa",
  "Al-Ma'ida",
  "Al-An'am",
  "Al-A'raf",
  'Al-Anfal',
  'At-Tawba',
  'Yunus',
  'Hud',
  'Yusuf',
  "Ar-Ra'd",
  'Ibrahim',
  'Al-Hijr',
  'An-Nahl',
  'Al-Isra',
  'Al-Kahf',
  'Maryam',
  'Taha',
  'Al-Anbiya',
  'Al-Hajj',
  "Al-Mu'minun",
  'An-Nur',
  'Al-Furqan',
  "Ash-Shu'ara",
  'An-Naml',
  'Al-Qasas',
  'Al-Ankabut',
  'Ar-Rum',
  'Luqman',
  'As-Sajda',
  'Al-Ahzab',
  'Saba',
  'Fatir',
  'Ya-Sin',
  'As-Saffat',
  'Sad',
  'Az-Zumar',
  'Ghafir',
  'Fussilat',
  'Ash-Shura',
  'Az-Zukhruf',
  'Ad-Dukhan',
  'Al-Jathiya',
  'Al-Ahqaf',
  'Muhammad',
  'Al-Fath',
  'Al-Hujurat',
  'Qaf',
  'Adh-Dhariyat',
  'At-Tur',
  'An-Najm',
  'Al-Qamar',
  'Ar-Rahman',
  "Al-Waqi'a",
  'Al-Hadid',
  'Al-Mujadila',
  'Al-Hashr',
  'Al-Mumtahina',
  'As-Saff',
  "Al-Jumu'a",
  'Al-Munafiqun',
  'At-Taghabun',
  'At-Talaq',
  'At-Tahrim',
  'Al-Mulk',
  'Al-Qalam',
  'Al-Haqqa',
  "Al-Ma'arij",
  'Nuh',
  'Al-Jinn',
  'Al-Muzzammil',
  'Al-Muddaththir',
  'Al-Qiyama',
  'Al-Insan',
  'Al-Mursalat',
  "An-Naba",
  "An-Nazi'at",
  'Abasa',
  'At-Takwir',
  'Al-Infitar',
  'Al-Mutaffifin',
  'Al-Inshiqaq',
  'Al-Buruj',
  'At-Tariq',
  "Al-A'la",
  'Al-Ghashiya',
  'Al-Fajr',
  'Al-Balad',
  'Ash-Shams',
  'Al-Layl',
  'Ad-Duha',
  'Ash-Sharh',
  'At-Tin',
  'Al-Alaq',
  'Al-Qadr',
  'Al-Bayyina',
  'Az-Zalzala',
  'Al-Adiyat',
  "Al-Qari'a",
  'At-Takathur',
  'Al-Asr',
  'Al-Humaza',
  'Al-Fil',
  'Quraysh',
  "Al-Ma'un",
  'Al-Kawthar',
  'Al-Kafirun',
  'An-Nasr',
  'Al-Masad',
  'Al-Ikhlas',
  'Al-Falaq',
  'An-Nas',
];

// Standard Mushaf page numbers (approximate) — used as starting estimates
const STANDARD_PAGES = [
  1, 2, 50, 77, 106, 128, 151, 177, 187, 208, 221, 235, 249, 255, 262, 267,
  282, 293, 305, 312, 322, 332, 342, 350, 359, 367, 377, 385, 396, 404, 411,
  415, 418, 428, 434, 440, 446, 453, 458, 467, 477, 483, 489, 496, 499, 502,
  507, 511, 515, 518, 520, 523, 526, 528, 531, 534, 537, 542, 545, 549, 551,
  553, 554, 556, 558, 560, 562, 564, 566, 568, 570, 572, 574, 575, 577, 578,
  580, 582, 583, 585, 586, 587, 587, 589, 590, 591, 591, 592, 593, 594, 595,
  595, 596, 596, 597, 597, 598, 598, 599, 599, 600, 600, 601, 601, 601, 602,
  602, 602, 603, 603, 603, 604, 604, 604,
];

// Confirmed anchors
const KNOWN_ANCHORS: Record<number, number> = {
  1: 5, // Al-Fatiha confirmed at page 5
  2: 7, // Al-Baqara confirmed at page 7
};

const client = new Anthropic();

interface SurahMapping {
  number: number;
  name: string;
  starting_page: number;
  confidence: 'confirmed' | 'high' | 'medium' | 'low';
}

/** Read a page image and return its base64 data URI, or null if not found. */
async function readPageImage(pageNum: number): Promise<string | null> {
  for (const ext of ['webp', 'svg', 'png']) {
    const filePath = path.join(PAGES_DIR, `${pageNum}.${ext}`);
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      const base64 = buffer.toString('base64');
      const mediaType =
        ext === 'webp'
          ? 'image/webp'
          : ext === 'svg'
            ? 'image/svg+xml'
            : 'image/png';
      return `data:${mediaType};base64,${base64}`;
    }
  }
  return null;
}

/** Send a page image to Claude and ask if it contains a new surah start. */
async function checkPageForSurah(pageNum: number): Promise<{
  hasSurahStart: boolean;
  surahName: string | null;
  surahNumber: number | null;
  isIntroPage: boolean;
}> {
  const imageData = await readPageImage(pageNum);
  if (!imageData) {
    return {
      hasSurahStart: false,
      surahName: null,
      surahNumber: null,
      isIntroPage: false,
    };
  }

  const [header, base64] = imageData.split(',');
  const mediaType = header.split(':')[1].split(';')[0];

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType as
                  | 'image/webp'
                  | 'image/png'
                  | 'image/jpeg'
                  | 'image/gif',
                data: base64,
              },
            },
            {
              type: 'text',
              text: `Look at this Quran page image. Answer these questions in EXACTLY this format (no other text):

HAS_NEW_SURAH: YES or NO
SURAH_NAME: [English name if YES, NONE if NO]
SURAH_NUMBER: [number 1-114 if YES, 0 if NO]
IS_INTRO: YES or NO (YES if this is an introduction/tajweed rules page, not actual Quran text)

A new surah starts on this page if you can see a decorated title frame or header with a surah name (often in a green or ornate bordered frame). Look for text like "Surah [name]" or the Arabic surah name in a decorative frame. Multiple surahs can appear on one page — report only the FIRST new surah that STARTS on this page.`,
            },
          ],
        },
      ],
    });

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '';

    const hasSurahStart = text.includes('HAS_NEW_SURAH: YES');
    const isIntroPage = text.includes('IS_INTRO: YES');

    let surahName: string | null = null;
    let surahNumber: number | null = null;

    const nameMatch = text.match(/SURAH_NAME:\s*(.+)/);
    if (nameMatch && nameMatch[1].trim() !== 'NONE') {
      surahName = nameMatch[1].trim();
    }

    const numMatch = text.match(/SURAH_NUMBER:\s*(\d+)/);
    if (numMatch && parseInt(numMatch[1]) > 0) {
      surahNumber = parseInt(numMatch[1]);
    }

    return { hasSurahStart, surahName, surahNumber, isIntroPage };
  } catch (error) {
    console.error(`  API error on page ${pageNum}:`, error);
    return {
      hasSurahStart: false,
      surahName: null,
      surahNumber: null,
      isIntroPage: false,
    };
  }
}

/** Sleep for the specified number of milliseconds. */
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  console.log('\n🕌 AI-Assisted Surah Mapping\n');
  console.log('This will scan page images to find where each surah starts.\n');

  // Check API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Set ANTHROPIC_API_KEY environment variable');
    process.exit(1);
  }

  // Check pages directory
  if (!fs.existsSync(PAGES_DIR)) {
    console.error(`❌ Pages directory not found: ${PAGES_DIR}`);
    process.exit(1);
  }

  const mappings: SurahMapping[] = [];

  // Pre-fill known anchors
  for (const [num, page] of Object.entries(KNOWN_ANCHORS)) {
    mappings.push({
      number: parseInt(num),
      name: SURAH_NAMES[parseInt(num) - 1],
      starting_page: page,
      confidence: 'confirmed',
    });
    console.log(
      `  ✓ Surah ${num} (${SURAH_NAMES[parseInt(num) - 1]}) → Page ${page} [confirmed]`,
    );
  }

  // Calculate offset from known anchors
  // Standard Al-Fatiha = page 1, actual = page 5 → offset ≈ +4
  // But Al-Baqara standard = 2, actual = 7 → offset ≈ +5
  // Use average offset as starting estimate
  const estimatedOffset = 5;

  // For each unmapped surah, scan a window around the estimated page
  for (let surahIdx = 0; surahIdx < 114; surahIdx++) {
    const surahNum = surahIdx + 1;

    // Skip already mapped
    if (mappings.find((m) => m.number === surahNum)) continue;

    const estimatedPage = STANDARD_PAGES[surahIdx] + estimatedOffset;

    // Use previous surah's actual page as a better lower bound
    const prevMapping = mappings.find((m) => m.number === surahNum - 1);
    const searchStart = prevMapping
      ? prevMapping.starting_page + 1
      : Math.max(5, estimatedPage - 8);
    const searchEnd = Math.min(TOTAL_PAGES, estimatedPage + 12);

    console.log(
      `\n🔍 Searching for Surah ${surahNum} (${SURAH_NAMES[surahIdx]})`,
    );
    console.log(
      `   Estimated page: ${estimatedPage}, searching ${searchStart}-${searchEnd}`,
    );

    let found = false;

    for (let page = searchStart; page <= searchEnd; page++) {
      const result = await checkPageForSurah(page);

      if (result.hasSurahStart) {
        // Verify it's the surah we expect (or close to it)
        const confidence =
          result.surahNumber === surahNum ? 'high' : 'medium';

        mappings.push({
          number: surahNum,
          name: SURAH_NAMES[surahIdx],
          starting_page: page,
          confidence,
        });

        console.log(
          `  ✓ Found on page ${page} (AI said: ${result.surahName}, #${result.surahNumber}) [${confidence}]`,
        );
        found = true;
        break;
      }

      // Rate limiting — ~1 request per second
      await sleep(1200);
    }

    if (!found) {
      // Expand search window
      console.log(`  ⚠️ Not found in window. Expanding search...`);

      const expandStart = Math.max(5, searchStart - 10);
      const expandEnd = Math.min(TOTAL_PAGES, searchEnd + 15);

      for (let page = expandStart; page <= expandEnd; page++) {
        // Skip already checked pages
        if (page >= searchStart && page <= searchEnd) continue;

        const result = await checkPageForSurah(page);

        if (result.hasSurahStart) {
          mappings.push({
            number: surahNum,
            name: SURAH_NAMES[surahIdx],
            starting_page: page,
            confidence: 'low',
          });
          console.log(
            `  ✓ Found on page ${page} (expanded search) [low confidence]`,
          );
          found = true;
          break;
        }

        await sleep(1200);
      }
    }

    if (!found) {
      console.error(
        `  ❌ Could not find Surah ${surahNum} (${SURAH_NAMES[surahIdx]})`,
      );
      // Use estimated page as fallback
      mappings.push({
        number: surahNum,
        name: SURAH_NAMES[surahIdx],
        starting_page: estimatedPage,
        confidence: 'low',
      });
    }
  }

  // Sort by surah number
  mappings.sort((a, b) => a.number - b.number);

  // Validation
  console.log('\n\n📋 Validation:\n');

  let issues = 0;
  for (let i = 1; i < mappings.length; i++) {
    if (mappings[i].starting_page < mappings[i - 1].starting_page) {
      console.error(
        `  ❌ Order violation: Surah ${mappings[i].number} (page ${mappings[i].starting_page}) before Surah ${mappings[i - 1].number} (page ${mappings[i - 1].starting_page})`,
      );
      issues++;
    }
  }

  const highConfidence = mappings.filter(
    (m) => m.confidence === 'high' || m.confidence === 'confirmed',
  ).length;
  const medConfidence = mappings.filter(
    (m) => m.confidence === 'medium',
  ).length;
  const lowConfidence = mappings.filter(
    (m) => m.confidence === 'low',
  ).length;

  console.log(`  Total surahs mapped: ${mappings.length}/114`);
  console.log(`  Confirmed/High confidence: ${highConfidence}`);
  console.log(`  Medium confidence: ${medConfidence}`);
  console.log(`  Low confidence (needs review): ${lowConfidence}`);
  console.log(`  Order violations: ${issues}`);

  // Output
  const output = {
    generated_at: new Date().toISOString(),
    method: 'ai-assisted',
    intro_pages: { start: 1, end: 4 },
    surahs: mappings.map((m) => ({
      number: m.number,
      name_english: m.name,
      starting_page: m.starting_page,
      confidence: m.confidence,
    })),
    low_confidence_pages: mappings
      .filter((m) => m.confidence === 'low')
      .map((m) => `Surah ${m.number} (${m.name}) → Page ${m.starting_page}`),
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`\n✅ Mapping saved to: ${OUTPUT_FILE}`);

  if (lowConfidence > 0) {
    console.log(
      `\n⚠️  ${lowConfidence} surahs have low confidence. Review these pages manually:`,
    );
    mappings
      .filter((m) => m.confidence === 'low')
      .forEach((m) => {
        console.log(`   Surah ${m.number} (${m.name}) → Page ${m.starting_page}`);
      });
  }

  console.log('\nDone!\n');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
