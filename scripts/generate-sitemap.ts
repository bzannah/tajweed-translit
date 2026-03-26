#!/usr/bin/env tsx
/**
 * SEO Sitemap Generator
 * Generates a comprehensive sitemap.xml covering:
 *   - Static pages (home, donate)
 *   - Tajweed guide pages (1-4)
 *   - Quran reading pages (5-1275)
 *   - Surah intro pages (/surah/[n]/[slug]) — NEW high-SEO pages
 *   - Juz intro pages (/juz/[n])             — NEW high-SEO pages
 *   - Tajweed rule pages (/tajweed/[rule])   — NEW high-SEO pages
 *
 * Run: pnpm generate:sitemap
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://tajweedtranslit.com';
const TOTAL_PAGES = 1275;

// ── Data ───────────────────────────────────────────────────────────────────

const SURAH_DATA: Array<{ number: number; name: string; starting_page: number }> = [
  { number: 1,   name: 'Al-Fatiha',          starting_page: 1 },
  { number: 2,   name: 'Al-Baqara',           starting_page: 7 },
  { number: 3,   name: 'Al-Imran',            starting_page: 103 },
  { number: 4,   name: 'An-Nisa',             starting_page: 157 },
  { number: 5,   name: 'Al-Ma\'ida',          starting_page: 215 },
  { number: 6,   name: 'Al-An\'am',           starting_page: 259 },
  { number: 7,   name: 'Al-A\'raf',           starting_page: 305 },
  { number: 8,   name: 'Al-Anfal',            starting_page: 357 },
  { number: 9,   name: 'At-Tawba',            starting_page: 377 },
  { number: 10,  name: 'Yunus',               starting_page: 419 },
  { number: 11,  name: 'Hud',                  starting_page: 445 },
  { number: 12,  name: 'Yusuf',               starting_page: 473 },
  { number: 13,  name: 'Ar-Ra\'d',             starting_page: 501 },
  { number: 14,  name: 'Ibrahim',             starting_page: 513 },
  { number: 15,  name: 'Al-Hijr',             starting_page: 527 },
  { number: 16,  name: 'An-Nahl',             starting_page: 537 },
  { number: 17,  name: 'Al-Isra',             starting_page: 567 },
  { number: 18,  name: 'Al-Kahf',             starting_page: 589 },
  { number: 19,  name: 'Maryam',              starting_page: 613 },
  { number: 20,  name: 'Taha',                starting_page: 627 },
  { number: 21,  name: 'Al-Anbiya',           starting_page: 647 },
  { number: 22,  name: 'Al-Hajj',              starting_page: 667 },
  { number: 23,  name: 'Al-Mu\'minun',        starting_page: 687 },
  { number: 24,  name: 'An-Nur',              starting_page: 703 },
  { number: 25,  name: 'Al-Furqan',           starting_page: 721 },
  { number: 26,  name: 'Ash-Shu\'ara',        starting_page: 737 },
  { number: 27,  name: 'An-Naml',             starting_page: 757 },
  { number: 28,  name: 'Al-Qasas',            starting_page: 773 },
  { number: 29,  name: 'Al-Ankabut',          starting_page: 795 },
  { number: 30,  name: 'Ar-Rum',              starting_page: 811 },
  { number: 31,  name: 'Luqman',              starting_page: 825 },
  { number: 32,  name: 'As-Sajda',            starting_page: 833 },
  { number: 33,  name: 'Al-Ahzab',            starting_page: 839 },
  { number: 34,  name: 'Saba',                starting_page: 859 },
  { number: 35,  name: 'Fatir',               starting_page: 871 },
  { number: 36,  name: 'Ya-Sin',              starting_page: 883 },
  { number: 37,  name: 'As-Saffat',           starting_page: 895 },
  { number: 38,  name: 'Sad',                 starting_page: 909 },
  { number: 39,  name: 'Az-Zumar',            starting_page: 919 },
  { number: 40,  name: 'Ghafir',              starting_page: 937 },
  { number: 41,  name: 'Fussilat',            starting_page: 957 },
  { number: 42,  name: 'Ash-Shura',           starting_page: 969 },
  { number: 43,  name: 'Az-Zukhruf',           starting_page: 981 },
  { number: 44,  name: 'Ad-Dukhan',           starting_page: 995 },
  { number: 45,  name: 'Al-Jathiya',          starting_page: 1001 },
  { number: 46,  name: 'Al-Ahqaf',            starting_page: 1007 },
  { number: 47,  name: 'Muhammad',            starting_page: 1017 },
  { number: 48,  name: 'Al-Fath',             starting_page: 1025 },
  { number: 49,  name: 'Al-Hujurat',          starting_page: 1033 },
  { number: 50,  name: 'Qaf',                 starting_page: 1039 },
  { number: 51,  name: 'Adh-Dhariyat',        starting_page: 1043 },
  { number: 52,  name: 'At-Tur',              starting_page: 1049 },
  { number: 53,  name: 'An-Najm',              starting_page: 1055 },
  { number: 54,  name: 'Al-Qamar',             starting_page: 1059 },
  { number: 55,  name: 'Ar-Rahman',            starting_page: 1065 },
  { number: 56,  name: 'Al-Waqi\'a',           starting_page: 1071 },
  { number: 57,  name: 'Al-Hadid',             starting_page: 1077 },
  { number: 58,  name: 'Al-Mujadila',          starting_page: 1087 },
  { number: 59,  name: 'Al-Hashr',             starting_page: 1093 },
  { number: 60,  name: 'Al-Mumtahina',         starting_page: 1101 },
  { number: 61,  name: 'As-Saff',              starting_page: 1105 },
  { number: 62,  name: 'Al-Jumu\'a',          starting_page: 1109 },
  { number: 63,  name: 'Al-Munafiqun',        starting_page: 1111 },
  { number: 64,  name: 'At-Taghabun',         starting_page: 1115 },
  { number: 65,  name: 'At-Talaq',            starting_page: 1119 },
  { number: 66,  name: 'At-Tahrim',           starting_page: 1123 },
  { number: 67,  name: 'Al-Mulk',             starting_page: 1127 },
  { number: 68,  name: 'Al-Qalam',            starting_page: 1131 },
  { number: 69,  name: 'Al-Haqqa',            starting_page: 1135 },
  { number: 70,  name: 'Al-Ma\'arij',         starting_page: 1139 },
  { number: 71,  name: 'Nuh',                 starting_page: 1143 },
  { number: 72,  name: 'Al-Jinn',             starting_page: 1147 },
  { number: 73,  name: 'Al-Muzzammil',        starting_page: 1151 },
  { number: 74,  name: 'Al-Muddaththir',      starting_page: 1153 },
  { number: 75,  name: 'Al-Qiyama',           starting_page: 1157 },
  { number: 76,  name: 'Al-Insan',            starting_page: 1159 },
  { number: 77,  name: 'Al-Mursalat',         starting_page: 1163 },
  { number: 78,  name: 'An-Naba',              starting_page: 1167 },
  { number: 79,  name: 'An-Nazi\'at',         starting_page: 1169 },
  { number: 80,  name: 'Abasa',               starting_page: 1173 },
  { number: 81,  name: 'At-Takwir',           starting_page: 1175 },
  { number: 82,  name: 'Al-Infitar',          starting_page: 1177 },
  { number: 83,  name: 'Al-Mutaffifin',       starting_page: 1177 },
  { number: 84,  name: 'Al-Inshiqaq',         starting_page: 1181 },
  { number: 85,  name: 'Al-Buruj',            starting_page: 1183 },
  { number: 86,  name: 'At-Tariq',            starting_page: 1185 },
  { number: 87,  name: 'Al-A\'la',            starting_page: 1185 },
  { number: 88,  name: 'Al-Ghashiya',         starting_page: 1187 },
  { number: 89,  name: 'Al-Fajr',              starting_page: 1189 },
  { number: 90,  name: 'Al-Balad',            starting_page: 1191 },
  { number: 91,  name: 'Ash-Shams',           starting_page: 1193 },
  { number: 92,  name: 'Al-Layl',             starting_page: 1193 },
  { number: 93,  name: 'Ad-Duha',             starting_page: 1195 },
  { number: 94,  name: 'Ash-Sharh',           starting_page: 1195 },
  { number: 95,  name: 'At-Tin',              starting_page: 1197 },
  { number: 96,  name: 'Al-Alaq',             starting_page: 1197 },
  { number: 97,  name: 'Al-Qadr',             starting_page: 1199 },
  { number: 98,  name: 'Al-Bayyina',          starting_page: 1199 },
  { number: 99,  name: 'Az-Zalzala',          starting_page: 1201 },
  { number: 100, name: 'Al-Adiyat',           starting_page: 1203 },
  { number: 101, name: 'Al-Qari\'a',          starting_page: 1205 },
  { number: 102, name: 'At-Takathur',         starting_page: 1207 },
  { number: 103, name: 'Al-Asr',              starting_page: 1209 },
  { number: 104, name: 'Al-Humaza',          starting_page: 1211 },
  { number: 105, name: 'Al-Fil',              starting_page: 1213 },
  { number: 106, name: 'Quraysh',             starting_page: 1215 },
  { number: 107, name: 'Al-Ma\'un',           starting_page: 1217 },
  { number: 108, name: 'Al-Kawthar',          starting_page: 1219 },
  { number: 109, name: 'Al-Kafirun',          starting_page: 1221 },
  { number: 110, name: 'An-Nasr',             starting_page: 1223 },
  { number: 111, name: 'Al-Masad',            starting_page: 1225 },
  { number: 112, name: 'Al-Ikhlas',           starting_page: 1227 },
  { number: 113, name: 'Al-Falaq',            starting_page: 1229 },
  { number: 114, name: 'An-Nas',             starting_page: 1231 },
];

const TAJWEED_RULES = [
  { id: 'madd-necessary',   name: 'Necessary Prolongation (Madd Al-Lazim)' },
  { id: 'madd-obligatory', name: 'Obligatory Prolongation (Madd Al-Waajib Al-Muttasil)' },
  { id: 'madd-permissible',name: 'Permissible Prolongation (Madd Al-Jaai\' Al-Munfasil)' },
  { id: 'ghunnah',         name: 'Nasalisation (Ghunnah)' },
  { id: 'tafkheem',        name: 'Emphatic Pronunciation (Tafkheem)' },
  { id: 'tarqeeq',         name: 'Thin Pronunciation (Tarqeeq)' },
  { id: 'silent',          name: 'Silent Letters (Huroof Khaliyyah)' },
  { id: 'qalqalah',        name: 'Echoing Sound (Qalqalah)' },
  { id: 'madd-normal',     name: 'Normal Prolongation (Madd Al-Natural)' },
  { id: 'idgham',          name: 'Idgham — Merging' },
  { id: 'ikhfa',           name: 'Ikhfa — Concealment' },
  { id: 'iqlab',          name: 'Iqlab — Switching' },
  { id: 'hamzat-ul-wasl',  name: 'Hamzat al-Wasl' },
  { id: 'hamzat-ul-qat',   name: 'Hamzat al-Qat\' (Cutting Hamza)' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function getPageAttrs(path: string): { changefreq: string; priority: number } {
  if (path === '/')                          return { changefreq: 'monthly', priority: 1.0 };
  if (path === '/donate')                    return { changefreq: 'monthly', priority: 0.8 };
  if (/^\/page\/([1-4])$/.test(path))        return { changefreq: 'monthly', priority: 0.7 };
  if (path === '/page/5')                    return { changefreq: 'weekly',  priority: 0.9 };
  if (/^\/surah\//.test(path))               return { changefreq: 'weekly',  priority: 0.8 };
  if (/^\/juz\//.test(path))                return { changefreq: 'weekly',  priority: 0.8 };
  if (/^\/tajweed\//.test(path))            return { changefreq: 'monthly', priority: 0.7 };
  return                                     { changefreq: 'monthly', priority: 0.6 };
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
}

// ── Generator ─────────────────────────────────────────────────────────────────

interface UrlEntry { loc: string; changefreq: string; priority: number; lastmod: string }

function generateSitemap(): void {
  const today = new Date().toISOString().split('T')[0];
  const urls: UrlEntry[] = [];

  // Static pages
  urls.push({ loc: `${BASE_URL}/`,         ...getPageAttrs('/'),        lastmod: today });
  urls.push({ loc: `${BASE_URL}/donate`,   ...getPageAttrs('/donate'),  lastmod: today });

  // Tajweed guide pages
  for (let p = 1; p <= 4; p++) {
    urls.push({ loc: `${BASE_URL}/page/${p}`, ...getPageAttrs(`/page/${p}`), lastmod: today });
  }

  // Surah intro pages
  for (const s of SURAH_DATA) {
    const path = `/surah/${s.number}/${slugify(s.name)}`;
    urls.push({ loc: `${BASE_URL}${path}`, ...getPageAttrs(path), lastmod: today });
  }

  // Juz intro pages
  for (let j = 1; j <= 30; j++) {
    const path = `/juz/${j}`;
    urls.push({ loc: `${BASE_URL}${path}`, ...getPageAttrs(path), lastmod: today });
  }

  // Tajweed rule pages
  for (const r of TAJWEED_RULES) {
    const path = `/tajweed/${r.id}`;
    urls.push({ loc: `${BASE_URL}${path}`, ...getPageAttrs(path), lastmod: today });
  }

  // Quran reading pages
  for (let p = 5; p <= TOTAL_PAGES; p++) {
    urls.push({ loc: `${BASE_URL}/page/${p}`, ...getPageAttrs('/page/100'), lastmod: today });
  }

  const entries = urls.map(({ loc, changefreq, priority, lastmod }) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Generator : tajweed-translit/scripts/generate-sitemap.ts
  Created   : ${new Date().toISOString()}
  URLs      : ${urls.length}
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), xml, 'utf-8');

  const counts = {
    static: 2,
    tajweed_guide: 4,
    surah_intro: SURAH_DATA.length,
    juz_intro: 30,
    tajweed_rules: TAJWEED_RULES.length,
    quran_pages: TOTAL_PAGES - 4,
  };
  console.log('\n✅ Sitemap generated: public/sitemap.xml');
  console.log(`   Total URLs : ${urls.length}`);
  Object.entries(counts).forEach(([k, v]) => console.log(`   - ${k}: ${v}`));
}

generateSitemap();
