#!/usr/bin/env tsx
/**
 * Converts source PDF pages to optimised WebP images.
 * Run with: pnpm convert:pdfs
 *
 * Prerequisites:
 *   pnpm add -D pdf2pic sharp
 *
 * Input:  content/pdfs/1.pdf → content/pdfs/1275.pdf
 * Output: public/pages/1.webp → public/pages/1275.webp
 */

import * as fs from 'fs';
import * as path from 'path';

const INPUT_DIR = path.resolve(__dirname, '../content/pdfs');
const OUTPUT_DIR = path.resolve(__dirname, '../public/pages');
const TOTAL_PAGES = 1275;
const QUALITY = 85;
const WIDTH = 1200; // pixels

async function main(): Promise<void> {
  console.log('\n📄 PDF to WebP Conversion\n');

  // Check input directory exists
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Input directory not found: ${INPUT_DIR}`);
    console.error('   Place PDF files (1.pdf through 1275.pdf) in content/pdfs/');
    process.exit(1);
  }

  // Create output directory
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Check which PDFs exist
  const existing: number[] = [];
  const missing: number[] = [];

  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const pdfPath = path.join(INPUT_DIR, `${i}.pdf`);
    if (fs.existsSync(pdfPath)) {
      existing.push(i);
    } else {
      missing.push(i);
    }
  }

  console.log(`  Found: ${existing.length}/${TOTAL_PAGES} PDFs`);
  if (missing.length > 0 && missing.length <= 10) {
    console.log(`  Missing: ${missing.join(', ')}`);
  } else if (missing.length > 10) {
    console.log(`  Missing: ${missing.length} files (first 5: ${missing.slice(0, 5).join(', ')}...)`);
  }

  if (existing.length === 0) {
    console.error('\n❌ No PDF files found. Nothing to convert.');
    process.exit(1);
  }

  // Dynamic import of conversion libraries
  let fromPath: any;
  let sharp: any;

  try {
    const pdf2pic = await import('pdf2pic');
    fromPath = pdf2pic.fromPath;
  } catch {
    console.error('❌ pdf2pic not installed. Run: pnpm add -D pdf2pic');
    process.exit(1);
  }

  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('❌ sharp not installed. Run: pnpm add -D sharp');
    process.exit(1);
  }

  console.log(`\n🔄 Converting ${existing.length} PDFs to WebP...\n`);

  let converted = 0;
  let failed = 0;

  for (const pageNum of existing) {
    const pdfPath = path.join(INPUT_DIR, `${pageNum}.pdf`);
    const webpPath = path.join(OUTPUT_DIR, `${pageNum}.webp`);

    // Skip if already converted
    if (fs.existsSync(webpPath)) {
      converted++;
      continue;
    }

    try {
      // Convert PDF to PNG buffer
      const converter = fromPath(pdfPath, {
        density: 150,
        saveFilename: `temp_${pageNum}`,
        savePath: OUTPUT_DIR,
        format: 'png',
        width: WIDTH,
      });

      const result = await converter(1); // Convert first page

      if (result?.path) {
        // Convert PNG to WebP using sharp
        await sharp(result.path)
          .webp({ quality: QUALITY })
          .toFile(webpPath);

        // Clean up temp PNG
        fs.unlinkSync(result.path);
      }

      converted++;

      // Progress logging every 50 pages
      if (converted % 50 === 0) {
        console.log(`  Progress: ${converted}/${existing.length}`);
      }
    } catch (error) {
      failed++;
      console.error(`  ✗ Failed to convert page ${pageNum}: ${error}`);
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`\n✅ Conversion complete!`);
  console.log(`   Converted: ${converted}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Output: ${OUTPUT_DIR}\n`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
