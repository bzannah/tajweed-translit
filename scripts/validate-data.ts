#!/usr/bin/env tsx
/**
 * Validates the integrity of all static JSON data files.
 * Run with: pnpm validate:data
 *
 * Checks:
 * - surahs.json: 114 entries, sequential numbers, ascending pages, valid types
 * - juz.json: 30 entries, sequential numbers, ascending pages
 * - tajweed-rules.json: all required fields present
 * - Cross-references between files are consistent
 */

import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.resolve(__dirname, '../content/data');

interface ValidationError {
  file: string;
  message: string;
}

const errors: ValidationError[] = [];

function addError(file: string, message: string): void {
  errors.push({ file, message });
  console.error(`  ✗ [${file}] ${message}`);
}

function addPass(message: string): void {
  console.log(`  ✓ ${message}`);
}

// ─── Load Files ─────────────────────────────────────────────

console.log('\n🔍 Validating data files...\n');

let surahs: any[];
let juzData: any[];
let tajweedRules: any[];

try {
  surahs = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, 'surahs.json'), 'utf-8')
  );
  addPass('surahs.json loaded');
} catch {
  addError('surahs.json', 'Failed to parse file');
  process.exit(1);
}

try {
  juzData = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, 'juz.json'), 'utf-8')
  );
  addPass('juz.json loaded');
} catch {
  addError('juz.json', 'Failed to parse file');
  process.exit(1);
}

try {
  tajweedRules = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, 'tajweed-rules.json'), 'utf-8')
  );
  addPass('tajweed-rules.json loaded');
} catch {
  addError('tajweed-rules.json', 'Failed to parse file');
  process.exit(1);
}

// ─── Validate Surahs ───────────────────────────────────────

console.log('\n📖 Validating surahs.json...\n');

if (surahs.length !== 114) {
  addError('surahs.json', `Expected 114 surahs, found ${surahs.length}`);
} else {
  addPass('114 surahs present');
}

for (let i = 0; i < surahs.length; i++) {
  const s = surahs[i];
  const expected = i + 1;

  if (s.number !== expected) {
    addError('surahs.json', `Surah ${i}: expected number ${expected}, got ${s.number}`);
  }

  if (!s.name_english || typeof s.name_english !== 'string') {
    addError('surahs.json', `Surah ${s.number}: missing or invalid name_english`);
  }

  if (!s.name_arabic || typeof s.name_arabic !== 'string') {
    addError('surahs.json', `Surah ${s.number}: missing or invalid name_arabic`);
  }

  if (!['meccan', 'medinan'].includes(s.revelation_type)) {
    addError('surahs.json', `Surah ${s.number}: invalid revelation_type "${s.revelation_type}"`);
  }

  if (!Number.isInteger(s.starting_page) || s.starting_page < 1 || s.starting_page > 1275) {
    addError('surahs.json', `Surah ${s.number}: invalid starting_page ${s.starting_page}`);
  }

  if (!Number.isInteger(s.total_verses) || s.total_verses < 1) {
    addError('surahs.json', `Surah ${s.number}: invalid total_verses ${s.total_verses}`);
  }

  // Check ascending page order
  if (i > 0 && s.starting_page < surahs[i - 1].starting_page) {
    addError(
      'surahs.json',
      `Surah ${s.number} starting_page (${s.starting_page}) is before surah ${surahs[i - 1].number} (${surahs[i - 1].starting_page})`
    );
  }
}

if (!errors.some((e) => e.file === 'surahs.json')) {
  addPass('All surahs valid');
}

// ─── Validate Juz ──────────────────────────────────────────

console.log('\n📗 Validating juz.json...\n');

if (juzData.length !== 30) {
  addError('juz.json', `Expected 30 juz, found ${juzData.length}`);
} else {
  addPass('30 juz present');
}

for (let i = 0; i < juzData.length; i++) {
  const j = juzData[i];
  const expected = i + 1;

  if (j.number !== expected) {
    addError('juz.json', `Juz ${i}: expected number ${expected}, got ${j.number}`);
  }

  if (!j.name_english || typeof j.name_english !== 'string') {
    addError('juz.json', `Juz ${j.number}: missing or invalid name_english`);
  }

  if (!Number.isInteger(j.starting_page) || j.starting_page < 1 || j.starting_page > 1275) {
    addError('juz.json', `Juz ${j.number}: invalid starting_page ${j.starting_page}`);
  }

  if (!Number.isInteger(j.starting_surah) || j.starting_surah < 1 || j.starting_surah > 114) {
    addError('juz.json', `Juz ${j.number}: invalid starting_surah ${j.starting_surah}`);
  }

  // Check ascending page order
  if (i > 0 && j.starting_page <= juzData[i - 1].starting_page) {
    addError(
      'juz.json',
      `Juz ${j.number} starting_page (${j.starting_page}) not after juz ${juzData[i - 1].number} (${juzData[i - 1].starting_page})`
    );
  }
}

if (!errors.some((e) => e.file === 'juz.json')) {
  addPass('All juz valid');
}

// ─── Validate Tajweed Rules ────────────────────────────────

console.log('\n🎨 Validating tajweed-rules.json...\n');

if (tajweedRules.length < 5) {
  addError('tajweed-rules.json', `Expected at least 5 rules, found ${tajweedRules.length}`);
} else {
  addPass(`${tajweedRules.length} tajweed rules present`);
}

const ruleIds = new Set<string>();
for (const rule of tajweedRules) {
  if (!rule.id) {
    addError('tajweed-rules.json', 'Rule missing id');
    continue;
  }
  if (ruleIds.has(rule.id)) {
    addError('tajweed-rules.json', `Duplicate rule id: ${rule.id}`);
  }
  ruleIds.add(rule.id);

  if (!rule.name) addError('tajweed-rules.json', `Rule ${rule.id}: missing name`);
  if (!rule.colour) addError('tajweed-rules.json', `Rule ${rule.id}: missing colour`);
  if (!rule.description) addError('tajweed-rules.json', `Rule ${rule.id}: missing description`);
  if (!rule.explanation) addError('tajweed-rules.json', `Rule ${rule.id}: missing explanation`);
}

if (!errors.some((e) => e.file === 'tajweed-rules.json')) {
  addPass('All tajweed rules valid');
}

// ─── Cross-Validation ──────────────────────────────────────

console.log('\n🔗 Cross-validating references...\n');

// Check that juz starting_surah references exist in surahs
const surahNumbers = new Set(surahs.map((s: any) => s.number));
for (const j of juzData) {
  if (!surahNumbers.has(j.starting_surah)) {
    addError('juz.json', `Juz ${j.number} references non-existent surah ${j.starting_surah}`);
  }
}
addPass('All juz surah references valid');

// ─── Summary ───────────────────────────────────────────────

console.log('\n' + '─'.repeat(50));
if (errors.length === 0) {
  console.log('\n✅ All data files valid!\n');
  process.exit(0);
} else {
  console.error(`\n❌ ${errors.length} validation error(s) found.\n`);
  process.exit(1);
}
