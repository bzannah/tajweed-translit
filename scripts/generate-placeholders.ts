#!/usr/bin/env tsx
/**
 * Generates placeholder page images for development.
 * Use this when you don't have the real PDFs yet.
 * Run with: tsx scripts/generate-placeholders.ts
 *
 * Creates simple SVG-based placeholder images showing the page number.
 * These are NOT production quality — replace with real converted PDFs.
 */

import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../public/pages');
const TOTAL_PAGES = 1275;
const WIDTH = 600;
const HEIGHT = 900;

function generateSvg(pageNumber: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="100%" height="100%" fill="#f5f0e8"/>
  <rect x="20" y="20" width="${WIDTH - 40}" height="${HEIGHT - 40}" fill="none" stroke="#1a6b5a" stroke-width="3" rx="8"/>
  <rect x="30" y="30" width="${WIDTH - 60}" height="${HEIGHT - 60}" fill="none" stroke="#1a6b5a" stroke-width="1" rx="4"/>
  <text x="${WIDTH / 2}" y="120" font-family="Georgia, serif" font-size="24" fill="#1a6b5a" text-anchor="middle" font-weight="bold">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</text>
  <text x="${WIDTH / 2}" y="${HEIGHT / 2}" font-family="Georgia, serif" font-size="72" fill="#2c3e50" text-anchor="middle" dominant-baseline="central">${pageNumber}</text>
  <text x="${WIDTH / 2}" y="${HEIGHT / 2 + 60}" font-family="system-ui, sans-serif" font-size="16" fill="#808080" text-anchor="middle">Quran Tajweed Transliteration — Page ${pageNumber}</text>
  <text x="${WIDTH / 2}" y="${HEIGHT / 2 + 90}" font-family="system-ui, sans-serif" font-size="12" fill="#aaa" text-anchor="middle">(placeholder — replace with converted PDF)</text>
  <text x="${WIDTH / 2}" y="${HEIGHT - 50}" font-family="system-ui, sans-serif" font-size="14" fill="#808080" text-anchor="middle">${pageNumber}</text>
</svg>`;
}

async function main(): Promise<void> {
  console.log(`\n🖼️  Generating ${TOTAL_PAGES} placeholder images...\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let created = 0;
  let skipped = 0;

  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const svgPath = path.join(OUTPUT_DIR, `${i}.svg`);
    const webpPath = path.join(OUTPUT_DIR, `${i}.webp`);

    // Skip if real webp already exists
    if (fs.existsSync(webpPath)) {
      skipped++;
      continue;
    }

    // Write SVG placeholder (browsers can render these directly)
    fs.writeFileSync(svgPath, generateSvg(i), 'utf-8');
    created++;

    if (created % 200 === 0) {
      console.log(`  Progress: ${created} created, ${skipped} skipped`);
    }
  }

  console.log(`\n✅ Done! Created ${created} placeholders, skipped ${skipped} existing.`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log(`\n⚠️  Note: These are SVG placeholders for development.`);
  console.log(`   For production, convert real PDFs with: pnpm convert:pdfs\n`);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
