/**
 * Generates favicon and PWA icon PNGs from the SVG source.
 *
 * Usage: pnpm tsx scripts/generate-favicon.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SVG_PATH = path.join(ROOT, 'public', 'favicon.svg');
const ICONS_DIR = path.join(ROOT, 'public', 'icons');

const SIZES = [
  { size: 32, output: path.join(ROOT, 'public', 'favicon.ico') },
  { size: 180, output: path.join(ROOT, 'public', 'apple-touch-icon.png') },
  { size: 192, output: path.join(ICONS_DIR, 'icon-192.png') },
  { size: 512, output: path.join(ICONS_DIR, 'icon-512.png') },
] as const;

async function main() {
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  const svg = fs.readFileSync(SVG_PATH);

  for (const { size, output } of SIZES) {
    await sharp(svg).resize(size, size).png().toFile(output);
    console.log(`Generated ${path.relative(ROOT, output)} (${size}x${size})`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
