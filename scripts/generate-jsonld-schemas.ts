#!/usr/bin/env tsx
/**
 * JSON-LD Schema Generator
 * ==========================
 * Generates JSON-LD structured data for each Surah page.
 * Includes: Book, BreadcrumbList, Article, FAQPage schemas.
 *
 * Each Surah page gets a complete JSON-LD block to be injected
 * in <head> via the Next.js Metadata API.
 *
 * Run: pnpm generate:jsonld
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://tajweedtranslit.com';

// ── Shared Surah Data (same as sitemap script) ────────────────────────────────

const SURAH_DATA: Array<{
  number: number; name: string; name_arabic: string; meaning: string;
  revelation_type: string; verses: number; starting_page: number;
}> = [
  { number: 1,   name: 'Al-Fatiha',          name_arabic: 'الفاتحة',        meaning: 'The Opening',            revelation_type: 'Meccan',    verses: 7,    starting_page: 1 },
  { number: 2,   name: 'Al-Baqara',           name_arabic: 'البقرة',          meaning: 'The Cow',                revelation_type: 'Medinan',  verses: 286,  starting_page: 7 },
  { number: 3,   name: 'Al-Imran',            name_arabic: 'آل عمران',        meaning: 'The Family of Imran',    revelation_type: 'Medinan',  verses: 200,  starting_page: 103 },
  { number: 4,   name: 'An-Nisa',             name_arabic: 'النساء',          meaning: 'The Women',              revelation_type: 'Medinan',  verses: 176,  starting_page: 157 },
  { number: 5,   name: 'Al-Ma\'ida',          name_arabic: 'المائدة',        meaning: 'The Table Spread',        revelation_type: 'Medinan',  verses: 120,  starting_page: 215 },
  { number: 6,   name: 'Al-An\'am',           name_arabic: 'الأنعام',         meaning: 'The Cattle',             revelation_type: 'Meccan',   verses: 165,  starting_page: 259 },
  { number: 7,   name: 'Al-A\'raf',           name_arabic: 'الأعراف',         meaning: 'The Heights',            revelation_type: 'Meccan',   verses: 206,  starting_page: 305 },
  { number: 8,   name: 'Al-Anfal',            name_arabic: 'الأنفال',          meaning: 'The Spoils of War',      revelation_type: 'Medinan',  verses: 75,   starting_page: 357 },
  { number: 9,   name: 'At-Tawba',            name_arabic: 'التوبة',          meaning: 'The Repentance',         revelation_type: 'Medinan',  verses: 129,  starting_page: 377 },
  { number: 10,  name: 'Yunus',               name_arabic: 'يونس',            meaning: 'Jonah',                  revelation_type: 'Meccan',   verses: 109,  starting_page: 419 },
  { number: 11,  name: 'Hud',                 name_arabic: 'هود',             meaning: 'Hud',                    revelation_type: 'Meccan',   verses: 123,  starting_page: 445 },
  { number: 12,  name: 'Yusuf',               name_arabic: 'يوسف',            meaning: 'Joseph',                 revelation_type: 'Meccan',   verses: 111,  starting_page: 473 },
  { number: 13,  name: 'Ar-Ra\'d',             name_arabic: 'الرعد',            meaning: 'The Thunder',            revelation_type: 'Medinan',  verses: 43,   starting_page: 501 },
  { number: 14,  name: 'Ibrahim',             name_arabic: 'إبراهيم',          meaning: 'Abraham',                revelation_type: 'Meccan',   verses: 52,   starting_page: 513 },
  { number: 15,  name: 'Al-Hijr',             name_arabic: 'الحجر',            meaning: 'The Rocky Tract',        revelation_type: 'Meccan',   verses: 99,   starting_page: 527 },
  { number: 16,  name: 'An-Nahl',             name_arabic: 'النحل',            meaning: 'The Bee',                revelation_type: 'Meccan',   verses: 128,  starting_page: 537 },
  { number: 17,  name: 'Al-Isra',             name_arabic: 'الإسراء',          meaning: 'The Night Journey',      revelation_type: 'Meccan',   verses: 111,  starting_page: 567 },
  { number: 18,  name: 'Al-Kahf',             name_arabic: 'الكهف',            meaning: 'The Cave',               revelation_type: 'Meccan',   verses: 110,  starting_page: 589 },
  { number: 19,  name: 'Maryam',              name_arabic: 'مريم',             meaning: 'Mary',                   revelation_type: 'Meccan',   verses: 98,   starting_page: 613 },
  { number: 20,  name: 'Taha',                name_arabic: 'طه',               meaning: 'Ta-Ha',                  revelation_type: 'Meccan',   verses: 135,  starting_page: 627 },
  { number: 21,  name: 'Al-Anbiya',           name_arabic: 'الأنبياء',          meaning: 'The Prophets',           revelation_type: 'Meccan',   verses: 112,  starting_page: 647 },
  { number: 22,  name: 'Al-Hajj',              name_arabic: 'الحج',             meaning: 'The Pilgrimage',         revelation_type: 'Medinan',  verses: 78,   starting_page: 667 },
  { number: 23,  name: 'Al-Mu\'minun',        name_arabic: 'المؤمنون',         meaning: 'The Believers',          revelation_type: 'Meccan',   verses: 118,  starting_page: 687 },
  { number: 24,  name: 'An-Nur',              name_arabic: 'النور',             meaning: 'The Light',              revelation_type: 'Medinan',  verses: 64,   starting_page: 703 },
  { number: 25,  name: 'Al-Furqan',           name_arabic: 'الفرقان',           meaning: 'The Criterion',          revelation_type: 'Meccan',   verses: 77,   starting_page: 721 },
  { number: 26,  name: 'Ash-Shu\'ara',        name_arabic: 'الشعراء',           meaning: 'The Poets',              revelation_type: 'Meccan',   verses: 227,  starting_page: 737 },
  { number: 27,  name: 'An-Naml',             name_arabic: 'النمل',             meaning: 'The Ant',                revelation_type: 'Meccan',   verses: 93,   starting_page: 757 },
  { number: 28,  name: 'Al-Qasas',            name_arabic: 'القصص',            meaning: 'The Stories',            revelation_type: 'Meccan',   verses: 88,   starting_page: 773 },
  { number: 29,  name: 'Al-Ankabut',          name_arabic: 'العنكبوت',          meaning: 'The Spider',             revelation_type: 'Meccan',   verses: 69,   starting_page: 795 },
  { number: 30,  name: 'Ar-Rum',              name_arabic: 'الروم',             meaning: 'The Romans',             revelation_type: 'Meccan',   verses: 60,   starting_page: 811 },
  { number: 31,  name: 'Luqman',              name_arabic: 'لقمان',             meaning: 'Luqman',                 revelation_type: 'Meccan',   verses: 34,   starting_page: 825 },
  { number: 32,  name: 'As-Sajda',            name_arabic: 'السجدة',            meaning: 'The Prostration',        revelation_type: 'Meccan',   verses: 30,   starting_page: 833 },
  { number: 33,  name: 'Al-Ahzab',            name_arabic: 'الأحزاب',           meaning: 'The Confederates',       revelation_type: 'Medinan',  verses: 73,   starting_page: 839 },
  { number: 34,  name: 'Saba',                name_arabic: 'سبأ',               meaning: 'Sheba',                  revelation_type: 'Meccan',   verses: 54,   starting_page: 859 },
  { number: 35,  name: 'Fatir',               name_arabic: 'فاطر',              meaning: 'The Originator',         revelation_type: 'Meccan',   verses: 45,   starting_page: 871 },
  { number: 36,  name: 'Ya-Sin',              name_arabic: 'يس',                meaning: 'Ya-Sin',                 revelation_type: 'Meccan',   verses: 83,   starting_page: 883 },
  { number: 37,  name: 'As-Saffat',           name_arabic: 'الصافات',           meaning: 'Those Ranged in Ranks',  revelation_type: 'Meccan',   verses: 182,  starting_page: 895 },
  { number: 38,  name: 'Sad',                 name_arabic: 'ص',                  meaning: 'Sad',                    revelation_type: 'Meccan',   verses: 88,   starting_page: 909 },
  { number: 39,  name: 'Az-Zumar',            name_arabic: 'الزمر',             meaning: 'The Groups',             revelation_type: 'Meccan',   verses: 75,   starting_page: 919 },
  { number: 40,  name: 'Ghafir',              name_arabic: 'غافر',              meaning: 'The Forgiver',           revelation_type: 'Meccan',   verses: 85,   starting_page: 937 },
  { number: 41,  name: 'Fussilat',            name_arabic: 'فصلت',              meaning: 'Explained in Detail',    revelation_type: 'Meccan',   verses: 54,   starting_page: 957 },
  { number: 42,  name: 'Ash-Shura',           name_arabic: 'الشورى',             meaning: 'The Consultation',       revelation_type: 'Meccan',   verses: 53,   starting_page: 969 },
  { number: 43,  name: 'Az-Zukhruf',           name_arabic: 'الزخرف',            meaning: 'The Gold Adornments',    revelation_type: 'Meccan',   verses: 89,   starting_page: 981 },
  { number: 44,  name: 'Ad-Dukhan',           name_arabic: 'الدخان',             meaning: 'The Smoke',              revelation_type: 'Meccan',   verses: 59,   starting_page: 995 },
  { number: 45,  name: 'Al-Jathiya',          name_arabic: 'الجاثية',            meaning: 'The Kneeling',           revelation_type: 'Meccan',   verses: 37,   starting_page: 1001 },
  { number: 46,  name: 'Al-Ahqaf',            name_arabic: 'الأحقاف',             meaning: 'The Sand Dunes',         revelation_type: 'Meccan',   verses: 35,   starting_page: 1007 },
  { number: 47,  name: 'Muhammad',            name_arabic: 'محمد',               meaning: 'Muhammad',               revelation_type: 'Medinan',  verses: 38,   starting_page: 1017 },
  { number: 48,  name: 'Al-Fath',             name_arabic: 'الفتح',              meaning: 'The Victory',            revelation_type: 'Medinan',  verses: 29,   starting_page: 1025 },
  { number: 49,  name: 'Al-Hujurat',          name_arabic: 'الحجرات',            meaning: 'The Rooms',              revelation_type: 'Medinan',  verses: 18,   starting_page: 1033 },
  { number: 50,  name: 'Qaf',                name_arabic: 'ق',                   meaning: 'Qaf',                    revelation_type: 'Meccan',   verses: 45,   starting_page: 1039 },
  { number: 51,  name: 'Adh-Dhariyat',        name_arabic: 'الذاريات',           meaning: 'The Scattering Winds',   revelation_type: 'Meccan',   verses: 60,   starting_page: 1043 },
  { number: 52,  name: 'At-Tur',              name_arabic: 'الطور',              meaning: 'The Mount',              revelation_type: 'Meccan',   verses: 49,   starting_page: 1049 },
  { number: 53,  name: 'An-Najm',              name_arabic: 'النجم',              meaning: 'The Star',               revelation_type: 'Meccan',   verses: 62,   starting_page: 1055 },
  { number: 54,  name: 'Al-Qamar',             name_arabic: 'القمر',              meaning: 'The Moon',               revelation_type: 'Meccan',   verses: 55,   starting_page: 1059 },
  { number: 55,  name: 'Ar-Rahman',            name_arabic: 'الرحمن',             meaning: 'The Most Merciful',      revelation_type: 'Medinan',  verses: 78,   starting_page: 1065 },
  { number: 56,  name: 'Al-Waqi\'a',          name_arabic: 'الواقعة',             meaning: 'The Inevitable',         revelation_type: 'Meccan',   verses: 96,   starting_page: 1071 },
  { number: 57,  name: 'Al-Hadid',             name_arabic: 'الحديد',              meaning: 'The Iron',               revelation_type: 'Medinan',  verses: 29,   starting_page: 1077 },
  { number: 58,  name: 'Al-Mujadila',          name_arabic: 'المجادلة',           meaning: 'The Pleading Woman',     revelation_type: 'Medinan',  verses: 22,   starting_page: 1087 },
  { number: 59,  name: 'Al-Hashr',             name_arabic: 'الحشر',               meaning: 'The Gathering',          revelation_type: 'Medinan',  verses: 24,   starting_page: 1093 },
  { number: 60,  name: 'Al-Mumtahina',         name_arabic: 'الممتحنة',            meaning: 'The Examined Woman',    revelation_type: 'Medinan',  verses: 13,   starting_page: 1101 },
  { number: 61,  name: 'As-Saff',              name_arabic: 'الصف',                meaning: 'The Ranks',              revelation_type: 'Medinan',  verses: 14,   starting_page: 1105 },
  { number: 62,  name: 'Al-Jumu\'a',           name_arabic: 'الجمعة',              meaning: 'Friday',                revelation_type: 'Medinan',  verses: 11,   starting_page: 1109 },
  { number: 63,  name: 'Al-Munafiqun',         name_arabic: 'المنافقون',           meaning: 'The Hypocrites',         revelation_type: 'Medinan',  verses: 11,   starting_page: 1111 },
  { number: 64,  name: 'At-Taghabun',          name_arabic: 'التغابن',             meaning: 'The Mutual Disillusion',revelation_type: 'Medinan',  verses: 18,   starting_page: 1115 },
  { number: 65,  name: 'At-Talaq',             name_arabic: 'الطلاق',              meaning: 'Divorce',               revelation_type: 'Medinan',  verses: 12,   starting_page: 1119 },
  { number: 66,  name: 'At-Tahrim',            name_arabic: 'التحريم',            meaning: 'The Prohibition',        revelation_type: 'Medinan',  verses: 12,   starting_page: 1123 },
  { number: 67,  name: 'Al-Mulk',              name_arabic: 'الملك',               meaning: 'The Sovereignty',        revelation_type: 'Meccan',   verses: 30,   starting_page: 1127 },
  { number: 68,  name: 'Al-Qalam',             name_arabic: 'القلم',               meaning: 'The Pen',                revelation_type: 'Meccan',   verses: 52,   starting_page: 1131 },
  { number: 69,  name: 'Al-Haqqa',             name_arabic: 'الحاقة',             meaning: 'The Reality',            revelation_type: 'Meccan',   verses: 52,   starting_page: 1135 },
  { number: 70,  name: 'Al-Ma\'arij',          name_arabic: 'المعارج',             meaning: 'The Ascending Stairways',revelation_type: 'Meccan',  verses: 44,   starting_page: 1139 },
  { number: 71,  name: 'Nuh',                 name_arabic: 'نوح',                 meaning: 'Noah',                   revelation_type: 'Meccan',   verses: 52,   starting_page: 1143 },
  { number: 72,  name: 'Al-Jinn',             name_arabic: 'الجن',                 meaning: 'The Jinn',               revelation_type: 'Meccan',   verses: 28,   starting_page: 1147 },
  { number: 73,  name: 'Al-Muzzammil',         name_arabic: 'المزمل',              meaning: 'The Enshrouded One',     revelation_type: 'Meccan',   verses: 20,   starting_page: 1151 },
  { number: 74,  name: 'Al-Muddaththir',       name_arabic: 'المدثر',              meaning: 'The Cloaked One',         revelation_type: 'Meccan',   verses: 56,   starting_page: 1153 },
  { number: 75,  name: 'Al-Qiyama',            name_arabic: 'القيامة',             meaning: 'The Resurrection',       revelation_type: 'Meccan',   verses: 40,   starting_page: 1157 },
  { number: 76,  name: 'Al-Insan',            name_arabic: 'الإنسان',            meaning: 'The Human',              revelation_type: 'Medinan',  verses: 31,   starting_page: 1159 },
  { number: 77,  name: 'Al-Mursalat',          name_arabic: 'المرسلات',            meaning: 'The Emissaries',          revelation_type: 'Meccan',   verses: 50,   starting_page: 1163 },
  { number: 78,  name: 'An-Naba',              name_arabic: 'النبأ',              meaning: 'The Tidings',            revelation_type: 'Meccan',   verses: 40,   starting_page: 1167 },
  { number: 79,  name: 'An-Nazi\'at',          name_arabic: 'النازعات',            meaning: 'Those Who Drag Forth',   revelation_type: 'Meccan',   verses: 46,   starting_page: 1169 },
  { number: 80,  name: 'Abasa',               name_arabic: 'عبس',                 meaning: 'He Frowned',            revelation_type: 'Meccan',   verses: 42,   starting_page: 1173 },
  { number: 81,  name: 'At-Takwir',           name_arabic: 'التكوير',             meaning: 'The Overthrowing',       revelation_type: 'Meccan',   verses: 29,   starting_page: 1175 },
  { number: 82,  name: 'Al-Infitar',          name_arabic: 'الانفطار',            meaning: 'The Cleaving',           revelation_type: 'Meccan',   verses: 19,   starting_page: 1177 },
  { number: 83,  name: 'Al-Mutaffifin',        name_arabic: 'المطففين',           meaning: 'The Defrauding',         revelation_type: 'Meccan',   verses: 36,   starting_page: 1177 },
  { number: 84,  name: 'Al-Inshiqaq',          name_arabic: 'الانشقاق',            meaning: 'The Sundering',          revelation_type: 'Meccan',   verses: 25,   starting_page: 1181 },
  { number: 85,  name: 'Al-Buruj',            name_arabic: 'البروج',              meaning: 'The Mansions of Stars',  revelation_type: 'Meccan',   verses: 22,   starting_page: 1183 },
  { number: 86,  name: 'At-Tariq',            name_arabic: 'الطارق',              meaning: 'The Morning Star',       revelation_type: 'Meccan',   verses: 17,   starting_page: 1185 },
  { number: 87,  name: 'Al-A\'la',            name_arabic: 'الأعلى',              meaning: 'The Most High',          revelation_type: 'Meccan',   verses: 19,   starting_page: 1185 },
  { number: 88,  name: 'Al-Ghashiya',         name_arabic: 'الغاشية',             meaning: 'The Overwhelming',      revelation_type: 'Meccan',   verses: 26,   starting_page: 1187 },
  { number: 89,  name: 'Al-Fajr',              name_arabic: 'الفجر',               meaning: 'The Dawn',              revelation_type: 'Meccan',   verses: 30,   starting_page: 1189 },
  { number: 90,  name: 'Al-Balad',            name_arabic: 'البلد',                meaning: 'The City',              revelation_type: 'Meccan',   verses: 20,   starting_page: 1191 },
  { number: 91,  name: 'Ash-Shams',           name_arabic: 'الشمس',               meaning: 'The Sun',                revelation_type: 'Meccan',   verses: 15,   starting_page: 1193 },
  { number: 92,  name: 'Al-Layl',             name_arabic: 'الليل',                meaning: 'The Night',             revelation_type: 'Meccan',   verses: 21,   starting_page: 1193 },
  { number: 93,  name: 'Ad-Duha',             name_arabic: 'الضحى',               meaning: 'The Morning Hours',      revelation_type: 'Meccan',   verses: 11,   starting_page: 1195 },
  { number: 94,  name: 'Ash-Sharh',           name_arabic: 'الشرح',               meaning: 'The Relief',             revelation_type: 'Meccan',   verses: 8,    starting_page: 1195 },
  { number: 95,  name: 'At-Tin',              name_arabic: 'التين',               meaning: 'The Fig',                revelation_type: 'Meccan',   verses: 8,    starting_page: 1197 },
  { number: 96,  name: 'Al-Alaq',             name_arabic: 'العلق',               meaning: 'The Clot',              revelation_type: 'Meccan',   verses: 19,   starting_page: 1197 },
  { number: 97,  name: 'Al-Qadr',             name_arabic: 'القدر',               meaning: 'The Power',             revelation_type: 'Meccan',   verses: 5,    starting_page: 1199 },
  { number: 98,  name: 'Al-Bayyina',          name_arabic: 'البينة',              meaning: 'The Clear Proof',        revelation_type: 'Medinan',  verses: 8,    starting_page: 1199 },
  { number: 99,  name: 'Az-Zalzala',          name_arabic: 'الزلزلة',             meaning: 'The Earthquake',         revelation_type: 'Medinan',  verses: 8,    starting_page: 1201 },
  { number: 100, name: 'Al-Adiyat',           name_arabic: 'العاديات',             meaning: 'The Chargers',           revelation_type: 'Meccan',   verses: 11,   starting_page: 1203 },
  { number: 101, name: 'Al-Qari\'a',          name_arabic: 'القارعة',             meaning: 'The Calamity',           revelation_type: 'Meccan',   verses: 11,   starting_page: 1205 },
  { number: 102, name: 'At-Takathur',         name_arabic: 'التكاثر',             meaning: 'The Rivalry',            revelation_type: 'Meccan',   verses: 8,    starting_page: 1207 },
  { number: 103, name: 'Al-Asr',              name_arabic: 'العصر',                meaning: 'The Declining Day',      revelation_type: 'Meccan',   verses: 3,    starting_page: 1209 },
  { number: 104, name: 'Al-Humaza',           name_arabic: 'الهمزة',              meaning: 'The Traducer',           revelation_type: 'Meccan',   verses: 9,    starting_page: 1211 },
  { number: 105, name: 'Al-Fil',              name_arabic: 'الفيل',               meaning: 'The Elephant',           revelation_type: 'Meccan',   verses: 5,    starting_page: 1213 },
  { number: 106, name: 'Quraysh',             name_arabic: 'قريش',                meaning: 'Quraysh',                revelation_type: 'Meccan',   verses: 4,    starting_page: 1215 },
  { number: 107, name: 'Al-Ma\'un',           name_arabic: 'الماعون',             meaning: 'The Small Kindnesses',   revelation_type: 'Meccan',   verses: 7,    starting_page: 1217 },
  { number: 108, name: 'Al-Kawthar',          name_arabic: 'الكوثر',              meaning: 'The Abundance',          revelation_type: 'Meccan',   verses: 3,    starting_page: 1219 },
  { number: 109, name: 'Al-Kafirun',          name_arabic: 'الكافرون',            meaning: 'The Disbelievers',       revelation_type: 'Meccan',   verses: 6,    starting_page: 1221 },
  { number: 110, name: 'An-Nasr',              name_arabic: 'النصر',               meaning: 'The Divine Support',    revelation_type: 'Medinan',  verses: 3,    starting_page: 1223 },
  { number: 111, name: 'Al-Masad',            name_arabic: 'المسدد',              meaning: 'The Palm Fibre',         revelation_type: 'Meccan',   verses: 5,    starting_page: 1225 },
  { number: 112, name: 'Al-Ikhlas',           name_arabic: 'الإخلاص',             meaning: 'The Sincerity',          revelation_type: 'Meccan',   verses: 4,    starting_page: 1227 },
  { number: 113, name: 'Al-Falaq',            name_arabic: 'الفلق',               meaning: 'The Daybreak',           revelation_type: 'Meccan',   verses: 5,    starting_page: 1229 },
  { number: 114, name: 'An-Nas',             name_arabic: 'الناس',               meaning: 'Mankind',               revelation_type: 'Meccan',   verses: 6,    starting_page: 1231 },
];

// ── Schema Generators ─────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
}

/** Generates all JSON-LD schemas for a given Surah. */
function generateSchemas(surah: typeof SURAH_DATA[0]): Record<string, object> {
  const { number, name, name_arabic, meaning, revelation_type, verses, starting_page } = surah;
  const surahSlug = slugify(name);
  const surahUrl  = `${BASE_URL}/surah/${number}/${surahSlug}`;
  const readingUrl = `${BASE_URL}/page/${starting_page}`;

  // ── 1. BreadcrumbList ─────────────────────────────────────────────────────
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Surah ${name}`,
        item: surahUrl,
      },
    ],
  };

  // ── 2. Book (primary identity for the whole site) ──────────────────────────
  const book = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: `Surah ${name} — Quran Transliteration with Tajweed`,
    alternateName: name_arabic,
    description: `Read Surah ${name} (${meaning}) — ${verses} verses, ${revelation_type} revelation — in English transliteration with Tajweed colour coding. Free online reader at TajweedTranslit.com.`,
    author: {
      '@type': 'Organization',
      name: 'TajweedTranslit.com',
      url: BASE_URL,
    },
    isbn: '979-12-200-9872-7',
    numberOfPages: verses,
    bookEdition: `${revelation_type} Revelation`,
    bookFormat: 'https://schema.org/EBook',
    inLanguage: 'en',
    url: surahUrl,
  };

  // ── 3. Article (Surah landing page) ────────────────────────────────────────
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Surah ${name} (${name_arabic}): Meaning, Transliteration & Tajweed Guide`,
    description: `Complete guide to Surah ${name} (${meaning}). ${verses} verses revealed ${revelation_type.toLowerCase()}. Read in English transliteration with expert Tajweed colour coding. Free online at TajweedTranslit.com.`,
    author: {
      '@type': 'Organization',
      name: 'TajweedTranslit.com',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TajweedTranslit.com',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.svg` },
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': surahUrl,
    },
    url: surahUrl,
    inLanguage: 'en',
    isAccessibleForFree: true,
    about: {
      '@type': 'Book',
      name: `The Holy Quran — Surah ${name}`,
    },
  };

  // ── 4. FAQPage (common questions about this Surah) ─────────────────────────
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How many verses are in Surah ${name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Surah ${name} contains ${verses} verses (ayat).`,
        },
      },
      {
        '@type': 'Question',
        name: `Is Surah ${name} Meccan or Medinan?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Surah ${name} was revealed ${revelation_type === 'Meccan' ? 'in Mecca (Meccan)' : 'in Medina (Medinan)'} during the Prophet Muhammad's ${revelation_type === 'Meccan' ? 'early mission in Mecca' : 'time in Medina after the Hijrah'} period.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the meaning of Surah ${name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The name "${name}" means "${meaning}" in English. It is the ${number}${['st','nd','rd'][((number+90)%100-10)%10-1]||'th'} Surah of the Holy Quran, beginning on page ${starting_page}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do I read Surah ${name} with Tajweed transliteration online?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can read Surah ${name} in English transliteration with Tajweed colour coding at ${readingUrl}. Each colour represents a different Tajweed pronunciation rule.`,
        },
      },
    ],
  };

  return { breadcrumb, book, article, faq };
}

// ── Write Output ─────────────────────────────────────────────────────────────

interface SurahSchemas { breadcrumb: object; book: object; article: object; faq: object }

function generateAllSchemas(): void {
  const outDir = join(process.cwd(), 'src', 'data', 'seo-schemas');
  mkdirSync(outDir, { recursive: true });

  const allSchemas: Record<string, SurahSchemas> = {};

  for (const surah of SURAH_DATA) {
    const schemas = generateSchemas(surah);
    const filename = `surah-${surah.number.toString().padStart(3, '0')}.json`;
    writeFileSync(
      join(outDir, filename),
      JSON.stringify(schemas, null, 2),
      'utf-8'
    );
    allSchemas[filename] = schemas as SurahSchemas;
  }

  // Generate homepage schema
  const homepageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Quran Tajweed Transliteration',
    alternateName: 'TajweedTranslit.com',
    url: BASE_URL,
    description: 'Read the complete Quran in English transliteration with colour-coded Tajweed rules. Free online reader with Surah navigation, bookmarks, and audio recitation.',
    author: { '@type': 'Organization', name: 'TajweedTranslit.com', url: BASE_URL },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/page/5?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  writeFileSync(
    join(outDir, 'homepage.json'),
    JSON.stringify(homepageSchema, null, 2),
    'utf-8'
  );

  const totalFiles = SURAH_DATA.length + 1; // +1 for homepage
  console.log(`\n✅ JSON-LD Schema files generated: ${outDir}`);
  console.log(`   Surah schemas: ${SURAH_DATA.length}`);
  console.log(`   Homepage schema: 1`);
  console.log(`   Total files: ${totalFiles}`);
  console.log(`\n📁 Import in page component:`);
  console.log(`   import surah001Schemas from '@/data/seo-schemas/surah-001.json';`);
  console.log(`   // Add to <head> via metadata export or <Script id="ld+json">`);
}

generateAllSchemas();
