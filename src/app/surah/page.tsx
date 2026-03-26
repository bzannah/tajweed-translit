import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All 114 Surahs — Quran Tajweed Transliteration',
  description: 'Browse all 114 Surahs of the Holy Quran. Each Surah page includes meaning, revelation type, verse count, and a link to read with Tajweed colour-coded transliteration.',
  keywords: ['quran surahs', 'list of quran surahs', 'all surahs', 'surah index', 'quran 114 surahs'],
};

const SURAHS = [
  {
    "number": 1,
    "name": "Al-Fatiha",
    "name_arabic": "\u0627\u0644\u0641\u0627\u062a\u062d\u0629",
    "meaning": "The Opening",
    "revelation_type": "Meccan",
    "verses": 7,
    "starting_page": 1
  },
  {
    "number": 2,
    "name": "Al-Baqara",
    "name_arabic": "\u0627\u0644\u0628\u0642\u0631\u0629",
    "meaning": "The Cow",
    "revelation_type": "Medinan",
    "verses": 286,
    "starting_page": 7
  },
  {
    "number": 3,
    "name": "Al-Imran",
    "name_arabic": "\u0622\u0644 \u0639\u0645\u0631\u0627\u0646",
    "meaning": "The Family of Imran",
    "revelation_type": "Medinan",
    "verses": 200,
    "starting_page": 103
  },
  {
    "number": 4,
    "name": "An-Nisa",
    "name_arabic": "\u0627\u0644\u0646\u0633\u0627\u0621",
    "meaning": "The Women",
    "revelation_type": "Medinan",
    "verses": 176,
    "starting_page": 157
  },
  {
    "number": 5,
    "name": "Al-Ma'ida",
    "name_arabic": "\u0627\u0644\u0645\u0627\u0626\u062f\u0629",
    "meaning": "The Table Spread",
    "revelation_type": "Medinan",
    "verses": 120,
    "starting_page": 215
  },
  {
    "number": 6,
    "name": "Al-An'am",
    "name_arabic": "\u0627\u0644\u0623\u0646\u0639\u0627\u0645",
    "meaning": "The Cattle",
    "revelation_type": "Meccan",
    "verses": 165,
    "starting_page": 259
  },
  {
    "number": 7,
    "name": "Al-A'raf",
    "name_arabic": "\u0627\u0644\u0623\u0639\u0631\u0627\u0641",
    "meaning": "The Heights",
    "revelation_type": "Meccan",
    "verses": 206,
    "starting_page": 305
  },
  {
    "number": 8,
    "name": "Al-Anfal",
    "name_arabic": "\u0627\u0644\u0623\u0646\u0641\u0627\u0644",
    "meaning": "The Spoils of War",
    "revelation_type": "Medinan",
    "verses": 75,
    "starting_page": 357
  },
  {
    "number": 9,
    "name": "At-Tawba",
    "name_arabic": "\u0627\u0644\u062a\u0648\u0628\u0629",
    "meaning": "The Repentance",
    "revelation_type": "Medinan",
    "verses": 129,
    "starting_page": 377
  },
  {
    "number": 10,
    "name": "Yunus",
    "name_arabic": "\u064a\u0648\u0646\u0633",
    "meaning": "Jonah",
    "revelation_type": "Meccan",
    "verses": 109,
    "starting_page": 419
  },
  {
    "number": 11,
    "name": "Hud",
    "name_arabic": "\u0647\u0648\u062f",
    "meaning": "Hud",
    "revelation_type": "Meccan",
    "verses": 123,
    "starting_page": 445
  },
  {
    "number": 12,
    "name": "Yusuf",
    "name_arabic": "\u064a\u0648\u0633\u0641",
    "meaning": "Joseph",
    "revelation_type": "Meccan",
    "verses": 111,
    "starting_page": 473
  },
  {
    "number": 13,
    "name": "Ar-Ra'd",
    "name_arabic": "\u0627\u0644\u0631\u0639\u062f",
    "meaning": "The Thunder",
    "revelation_type": "Medinan",
    "verses": 43,
    "starting_page": 501
  },
  {
    "number": 14,
    "name": "Ibrahim",
    "name_arabic": "\u0625\u0628\u0631\u0627\u0647\u064a\u0645",
    "meaning": "Abraham",
    "revelation_type": "Meccan",
    "verses": 52,
    "starting_page": 513
  },
  {
    "number": 15,
    "name": "Al-Hijr",
    "name_arabic": "\u0627\u0644\u062d\u062c\u0631",
    "meaning": "The Rocky Tract",
    "revelation_type": "Meccan",
    "verses": 99,
    "starting_page": 527
  },
  {
    "number": 16,
    "name": "An-Nahl",
    "name_arabic": "\u0627\u0644\u0646\u062d\u0644",
    "meaning": "The Bee",
    "revelation_type": "Meccan",
    "verses": 128,
    "starting_page": 537
  },
  {
    "number": 17,
    "name": "Al-Isra",
    "name_arabic": "\u0627\u0644\u0625\u0633\u0631\u0627\u0621",
    "meaning": "The Night Journey",
    "revelation_type": "Meccan",
    "verses": 111,
    "starting_page": 567
  },
  {
    "number": 18,
    "name": "Al-Kahf",
    "name_arabic": "\u0627\u0644\u0643\u0647\u0641",
    "meaning": "The Cave",
    "revelation_type": "Meccan",
    "verses": 110,
    "starting_page": 589
  },
  {
    "number": 19,
    "name": "Maryam",
    "name_arabic": "\u0645\u0631\u064a\u0645",
    "meaning": "Mary",
    "revelation_type": "Meccan",
    "verses": 98,
    "starting_page": 613
  },
  {
    "number": 20,
    "name": "Taha",
    "name_arabic": "\u0637\u0647",
    "meaning": "Ta-Ha",
    "revelation_type": "Meccan",
    "verses": 135,
    "starting_page": 627
  },
  {
    "number": 21,
    "name": "Al-Anbiya",
    "name_arabic": "\u0627\u0644\u0623\u0646\u0628\u064a\u0627\u0621",
    "meaning": "The Prophets",
    "revelation_type": "Meccan",
    "verses": 112,
    "starting_page": 647
  },
  {
    "number": 22,
    "name": "Al-Hajj",
    "name_arabic": "\u0627\u0644\u062d\u062c",
    "meaning": "The Pilgrimage",
    "revelation_type": "Medinan",
    "verses": 78,
    "starting_page": 667
  },
  {
    "number": 23,
    "name": "Al-Mu'minun",
    "name_arabic": "\u0627\u0644\u0645\u0624\u0645\u0646\u0648\u0646",
    "meaning": "The Believers",
    "revelation_type": "Meccan",
    "verses": 118,
    "starting_page": 687
  },
  {
    "number": 24,
    "name": "An-Nur",
    "name_arabic": "\u0627\u0644\u0646\u0648\u0631",
    "meaning": "The Light",
    "revelation_type": "Medinan",
    "verses": 64,
    "starting_page": 703
  },
  {
    "number": 25,
    "name": "Al-Furqan",
    "name_arabic": "\u0627\u0644\u0641\u0631\u0642\u0627\u0646",
    "meaning": "The Criterion",
    "revelation_type": "Meccan",
    "verses": 77,
    "starting_page": 721
  },
  {
    "number": 26,
    "name": "Ash-Shu'ara",
    "name_arabic": "\u0627\u0644\u0634\u0639\u0631\u0627\u0621",
    "meaning": "The Poets",
    "revelation_type": "Meccan",
    "verses": 227,
    "starting_page": 737
  },
  {
    "number": 27,
    "name": "An-Naml",
    "name_arabic": "\u0627\u0644\u0646\u0645\u0644",
    "meaning": "The Ant",
    "revelation_type": "Meccan",
    "verses": 93,
    "starting_page": 757
  },
  {
    "number": 28,
    "name": "Al-Qasas",
    "name_arabic": "\u0627\u0644\u0642\u0635\u0635",
    "meaning": "The Stories",
    "revelation_type": "Meccan",
    "verses": 88,
    "starting_page": 773
  },
  {
    "number": 29,
    "name": "Al-Ankabut",
    "name_arabic": "\u0627\u0644\u0639\u0646\u0643\u0628\u0648\u062a",
    "meaning": "The Spider",
    "revelation_type": "Meccan",
    "verses": 69,
    "starting_page": 795
  },
  {
    "number": 30,
    "name": "Ar-Rum",
    "name_arabic": "\u0627\u0644\u0631\u0648\u0645",
    "meaning": "The Romans",
    "revelation_type": "Meccan",
    "verses": 60,
    "starting_page": 811
  },
  {
    "number": 31,
    "name": "Luqman",
    "name_arabic": "\u0644\u0642\u0645\u0627\u0646",
    "meaning": "Luqman",
    "revelation_type": "Meccan",
    "verses": 34,
    "starting_page": 825
  },
  {
    "number": 32,
    "name": "As-Sajda",
    "name_arabic": "\u0627\u0644\u0633\u062c\u062f\u0629",
    "meaning": "The Prostration",
    "revelation_type": "Meccan",
    "verses": 30,
    "starting_page": 833
  },
  {
    "number": 33,
    "name": "Al-Ahzab",
    "name_arabic": "\u0627\u0644\u0623\u062d\u0632\u0627\u0628",
    "meaning": "The Confederates",
    "revelation_type": "Medinan",
    "verses": 73,
    "starting_page": 839
  },
  {
    "number": 34,
    "name": "Saba",
    "name_arabic": "\u0633\u0628\u0623",
    "meaning": "Sheba",
    "revelation_type": "Meccan",
    "verses": 54,
    "starting_page": 859
  },
  {
    "number": 35,
    "name": "Fatir",
    "name_arabic": "\u0641\u0627\u0637\u0631",
    "meaning": "The Originator",
    "revelation_type": "Meccan",
    "verses": 45,
    "starting_page": 871
  },
  {
    "number": 36,
    "name": "Ya-Sin",
    "name_arabic": "\u064a\u0633",
    "meaning": "Ya-Sin",
    "revelation_type": "Meccan",
    "verses": 83,
    "starting_page": 883
  },
  {
    "number": 37,
    "name": "As-Saffat",
    "name_arabic": "\u0627\u0644\u0635\u0627\u0641\u0627\u062a",
    "meaning": "Those Ranged in Ranks",
    "revelation_type": "Meccan",
    "verses": 182,
    "starting_page": 895
  },
  {
    "number": 38,
    "name": "Sad",
    "name_arabic": "\u0635",
    "meaning": "Sad",
    "revelation_type": "Meccan",
    "verses": 88,
    "starting_page": 909
  },
  {
    "number": 39,
    "name": "Az-Zumar",
    "name_arabic": "\u0627\u0644\u0632\u0645\u0631",
    "meaning": "The Groups",
    "revelation_type": "Meccan",
    "verses": 75,
    "starting_page": 919
  },
  {
    "number": 40,
    "name": "Ghafir",
    "name_arabic": "\u063a\u0627\u0641\u0631",
    "meaning": "The Forgiver",
    "revelation_type": "Meccan",
    "verses": 85,
    "starting_page": 937
  },
  {
    "number": 41,
    "name": "Fussilat",
    "name_arabic": "\u0641\u0635\u0644\u062a",
    "meaning": "Explained in Detail",
    "revelation_type": "Meccan",
    "verses": 54,
    "starting_page": 957
  },
  {
    "number": 42,
    "name": "Ash-Shura",
    "name_arabic": "\u0627\u0644\u0634\u0648\u0631\u0649",
    "meaning": "The Consultation",
    "revelation_type": "Meccan",
    "verses": 53,
    "starting_page": 969
  },
  {
    "number": 43,
    "name": "Az-Zukhruf",
    "name_arabic": "\u0627\u0644\u0632\u062e\u0631\u0641",
    "meaning": "The Gold Adornments",
    "revelation_type": "Meccan",
    "verses": 89,
    "starting_page": 981
  },
  {
    "number": 44,
    "name": "Ad-Dukhan",
    "name_arabic": "\u0627\u0644\u062f\u062e\u0627\u0646",
    "meaning": "The Smoke",
    "revelation_type": "Meccan",
    "verses": 59,
    "starting_page": 995
  },
  {
    "number": 45,
    "name": "Al-Jathiya",
    "name_arabic": "\u0627\u0644\u062c\u0627\u062b\u064a\u0629",
    "meaning": "The Kneeling",
    "revelation_type": "Meccan",
    "verses": 37,
    "starting_page": 1001
  },
  {
    "number": 46,
    "name": "Al-Ahqaf",
    "name_arabic": "\u0627\u0644\u0623\u062d\u0642\u0627\u0641",
    "meaning": "The Sand Dunes",
    "revelation_type": "Meccan",
    "verses": 35,
    "starting_page": 1007
  },
  {
    "number": 47,
    "name": "Muhammad",
    "name_arabic": "\u0645\u062d\u0645\u062f",
    "meaning": "Muhammad",
    "revelation_type": "Medinan",
    "verses": 38,
    "starting_page": 1017
  },
  {
    "number": 48,
    "name": "Al-Fath",
    "name_arabic": "\u0627\u0644\u0641\u062a\u062d",
    "meaning": "The Victory",
    "revelation_type": "Medinan",
    "verses": 29,
    "starting_page": 1025
  },
  {
    "number": 49,
    "name": "Al-Hujurat",
    "name_arabic": "\u0627\u0644\u062d\u062c\u0631\u0627\u062a",
    "meaning": "The Rooms",
    "revelation_type": "Medinan",
    "verses": 18,
    "starting_page": 1033
  },
  {
    "number": 50,
    "name": "Qaf",
    "name_arabic": "\u0642",
    "meaning": "Qaf",
    "revelation_type": "Meccan",
    "verses": 45,
    "starting_page": 1039
  },
  {
    "number": 51,
    "name": "Adh-Dhariyat",
    "name_arabic": "\u0627\u0644\u0630\u0627\u0631\u064a\u0627\u062a",
    "meaning": "The Scattering Winds",
    "revelation_type": "Meccan",
    "verses": 60,
    "starting_page": 1043
  },
  {
    "number": 52,
    "name": "At-Tur",
    "name_arabic": "\u0627\u0644\u0637\u0648\u0631",
    "meaning": "The Mount",
    "revelation_type": "Meccan",
    "verses": 49,
    "starting_page": 1049
  },
  {
    "number": 53,
    "name": "An-Najm",
    "name_arabic": "\u0627\u0644\u0646\u062c\u0645",
    "meaning": "The Star",
    "revelation_type": "Meccan",
    "verses": 62,
    "starting_page": 1055
  },
  {
    "number": 54,
    "name": "Al-Qamar",
    "name_arabic": "\u0627\u0644\u0642\u0645\u0631",
    "meaning": "The Moon",
    "revelation_type": "Meccan",
    "verses": 55,
    "starting_page": 1059
  },
  {
    "number": 55,
    "name": "Ar-Rahman",
    "name_arabic": "\u0627\u0644\u0631\u062d\u0645\u0646",
    "meaning": "The Most Merciful",
    "revelation_type": "Medinan",
    "verses": 78,
    "starting_page": 1065
  },
  {
    "number": 56,
    "name": "Al-Waqi'a",
    "name_arabic": "\u0627\u0644\u0648\u0627\u0642\u0639\u0629",
    "meaning": "The Inevitable",
    "revelation_type": "Meccan",
    "verses": 96,
    "starting_page": 1071
  },
  {
    "number": 57,
    "name": "Al-Hadid",
    "name_arabic": "\u0627\u0644\u062d\u062f\u064a\u062f",
    "meaning": "The Iron",
    "revelation_type": "Medinan",
    "verses": 29,
    "starting_page": 1077
  },
  {
    "number": 58,
    "name": "Al-Mujadila",
    "name_arabic": "\u0627\u0644\u0645\u062c\u0627\u062f\u0644\u0629",
    "meaning": "The Pleading Woman",
    "revelation_type": "Medinan",
    "verses": 22,
    "starting_page": 1087
  },
  {
    "number": 59,
    "name": "Al-Hashr",
    "name_arabic": "\u0627\u0644\u062d\u0634\u0631",
    "meaning": "The Gathering",
    "revelation_type": "Medinan",
    "verses": 24,
    "starting_page": 1093
  },
  {
    "number": 60,
    "name": "Al-Mumtahina",
    "name_arabic": "\u0627\u0644\u0645\u0645\u062a\u062d\u0646\u0629",
    "meaning": "The Examined Woman",
    "revelation_type": "Medinan",
    "verses": 13,
    "starting_page": 1101
  },
  {
    "number": 61,
    "name": "As-Saff",
    "name_arabic": "\u0627\u0644\u0635\u0641",
    "meaning": "The Ranks",
    "revelation_type": "Medinan",
    "verses": 14,
    "starting_page": 1105
  },
  {
    "number": 62,
    "name": "Al-Jumu'a",
    "name_arabic": "\u0627\u0644\u062c\u0645\u0639\u0629",
    "meaning": "Friday",
    "revelation_type": "Medinan",
    "verses": 11,
    "starting_page": 1109
  },
  {
    "number": 63,
    "name": "Al-Munafiqun",
    "name_arabic": "\u0627\u0644\u0645\u0646\u0627\u0641\u0642\u0648\u0646",
    "meaning": "The Hypocrites",
    "revelation_type": "Medinan",
    "verses": 11,
    "starting_page": 1111
  },
  {
    "number": 64,
    "name": "At-Taghabun",
    "name_arabic": "\u0627\u0644\u062a\u063a\u0627\u0628\u0646",
    "meaning": "The Mutual Disillusion",
    "revelation_type": "Medinan",
    "verses": 18,
    "starting_page": 1115
  },
  {
    "number": 65,
    "name": "At-Talaq",
    "name_arabic": "\u0627\u0644\u0637\u0644\u0627\u0642",
    "meaning": "Divorce",
    "revelation_type": "Medinan",
    "verses": 12,
    "starting_page": 1119
  },
  {
    "number": 66,
    "name": "At-Tahrim",
    "name_arabic": "\u0627\u0644\u062a\u062d\u0631\u064a\u0645",
    "meaning": "The Prohibition",
    "revelation_type": "Medinan",
    "verses": 12,
    "starting_page": 1123
  },
  {
    "number": 67,
    "name": "Al-Mulk",
    "name_arabic": "\u0627\u0644\u0645\u0644\u0643",
    "meaning": "The Sovereignty",
    "revelation_type": "Meccan",
    "verses": 30,
    "starting_page": 1127
  },
  {
    "number": 68,
    "name": "Al-Qalam",
    "name_arabic": "\u0627\u0644\u0642\u0644\u0645",
    "meaning": "The Pen",
    "revelation_type": "Meccan",
    "verses": 52,
    "starting_page": 1131
  },
  {
    "number": 69,
    "name": "Al-Haqqa",
    "name_arabic": "\u0627\u0644\u062d\u0627\u0642\u0629",
    "meaning": "The Reality",
    "revelation_type": "Meccan",
    "verses": 52,
    "starting_page": 1135
  },
  {
    "number": 70,
    "name": "Al-Ma'arij",
    "name_arabic": "\u0627\u0644\u0645\u0639\u0627\u0631\u062c",
    "meaning": "The Ascending Stairways",
    "revelation_type": "Meccan",
    "verses": 44,
    "starting_page": 1139
  },
  {
    "number": 71,
    "name": "Nuh",
    "name_arabic": "\u0646\u0648\u062d",
    "meaning": "Noah",
    "revelation_type": "Meccan",
    "verses": 52,
    "starting_page": 1143
  },
  {
    "number": 72,
    "name": "Al-Jinn",
    "name_arabic": "\u0627\u0644\u062c\u0646",
    "meaning": "The Jinn",
    "revelation_type": "Meccan",
    "verses": 28,
    "starting_page": 1147
  },
  {
    "number": 73,
    "name": "Al-Muzzammil",
    "name_arabic": "\u0627\u0644\u0645\u0632\u0645\u0644",
    "meaning": "The Enshrouded One",
    "revelation_type": "Meccan",
    "verses": 20,
    "starting_page": 1151
  },
  {
    "number": 74,
    "name": "Al-Muddaththir",
    "name_arabic": "\u0627\u0644\u0645\u062f\u062b\u0631",
    "meaning": "The Cloaked One",
    "revelation_type": "Meccan",
    "verses": 56,
    "starting_page": 1153
  },
  {
    "number": 75,
    "name": "Al-Qiyama",
    "name_arabic": "\u0627\u0644\u0642\u064a\u0627\u0645\u0629",
    "meaning": "The Resurrection",
    "revelation_type": "Meccan",
    "verses": 40,
    "starting_page": 1157
  },
  {
    "number": 76,
    "name": "Al-Insan",
    "name_arabic": "\u0627\u0644\u0625\u0646\u0633\u0627\u0646",
    "meaning": "The Human",
    "revelation_type": "Medinan",
    "verses": 31,
    "starting_page": 1159
  },
  {
    "number": 77,
    "name": "Al-Mursalat",
    "name_arabic": "\u0627\u0644\u0645\u0631\u0633\u0644\u0627\u062a",
    "meaning": "The Emissaries",
    "revelation_type": "Meccan",
    "verses": 50,
    "starting_page": 1163
  },
  {
    "number": 78,
    "name": "An-Naba",
    "name_arabic": "\u0627\u0644\u0646\u0628\u0623",
    "meaning": "The Tidings",
    "revelation_type": "Meccan",
    "verses": 40,
    "starting_page": 1167
  },
  {
    "number": 79,
    "name": "An-Nazi'at",
    "name_arabic": "\u0627\u0644\u0646\u0627\u0632\u0639\u0627\u062a",
    "meaning": "Those Who Drag Forth",
    "revelation_type": "Meccan",
    "verses": 46,
    "starting_page": 1169
  },
  {
    "number": 80,
    "name": "Abasa",
    "name_arabic": "\u0639\u0628\u0633",
    "meaning": "He Frowned",
    "revelation_type": "Meccan",
    "verses": 42,
    "starting_page": 1173
  },
  {
    "number": 81,
    "name": "At-Takwir",
    "name_arabic": "\u0627\u0644\u062a\u0643\u0648\u064a\u0631",
    "meaning": "The Overthrowing",
    "revelation_type": "Meccan",
    "verses": 29,
    "starting_page": 1175
  },
  {
    "number": 82,
    "name": "Al-Infitar",
    "name_arabic": "\u0627\u0644\u0627\u0646\u0641\u0637\u0627\u0631",
    "meaning": "The Cleaving",
    "revelation_type": "Meccan",
    "verses": 19,
    "starting_page": 1177
  },
  {
    "number": 83,
    "name": "Al-Mutaffifin",
    "name_arabic": "\u0627\u0644\u0645\u0637\u0641\u0641\u064a\u0646",
    "meaning": "The Defrauding",
    "revelation_type": "Meccan",
    "verses": 36,
    "starting_page": 1177
  },
  {
    "number": 84,
    "name": "Al-Inshiqaq",
    "name_arabic": "\u0627\u0644\u0627\u0646\u0634\u0642\u0627\u0642",
    "meaning": "The Sundering",
    "revelation_type": "Meccan",
    "verses": 25,
    "starting_page": 1181
  },
  {
    "number": 85,
    "name": "Al-Buruj",
    "name_arabic": "\u0627\u0644\u0628\u0631\u0648\u062c",
    "meaning": "The Mansions of Stars",
    "revelation_type": "Meccan",
    "verses": 22,
    "starting_page": 1183
  },
  {
    "number": 86,
    "name": "At-Tariq",
    "name_arabic": "\u0627\u0644\u0637\u0627\u0631\u0642",
    "meaning": "The Morning Star",
    "revelation_type": "Meccan",
    "verses": 17,
    "starting_page": 1185
  },
  {
    "number": 87,
    "name": "Al-A'la",
    "name_arabic": "\u0627\u0644\u0623\u0639\u0644\u0649",
    "meaning": "The Most High",
    "revelation_type": "Meccan",
    "verses": 19,
    "starting_page": 1185
  },
  {
    "number": 88,
    "name": "Al-Ghashiya",
    "name_arabic": "\u0627\u0644\u063a\u0627\u0634\u064a\u0629",
    "meaning": "The Overwhelming",
    "revelation_type": "Meccan",
    "verses": 26,
    "starting_page": 1187
  },
  {
    "number": 89,
    "name": "Al-Fajr",
    "name_arabic": "\u0627\u0644\u0641\u062c\u0631",
    "meaning": "The Dawn",
    "revelation_type": "Meccan",
    "verses": 30,
    "starting_page": 1189
  },
  {
    "number": 90,
    "name": "Al-Balad",
    "name_arabic": "\u0627\u0644\u0628\u0644\u062f",
    "meaning": "The City",
    "revelation_type": "Meccan",
    "verses": 20,
    "starting_page": 1191
  },
  {
    "number": 91,
    "name": "Ash-Shams",
    "name_arabic": "\u0627\u0644\u0634\u0645\u0633",
    "meaning": "The Sun",
    "revelation_type": "Meccan",
    "verses": 15,
    "starting_page": 1193
  },
  {
    "number": 92,
    "name": "Al-Layl",
    "name_arabic": "\u0627\u0644\u0644\u064a\u0644",
    "meaning": "The Night",
    "revelation_type": "Meccan",
    "verses": 21,
    "starting_page": 1193
  },
  {
    "number": 93,
    "name": "Ad-Duha",
    "name_arabic": "\u0627\u0644\u0636\u062d\u0649",
    "meaning": "The Morning Hours",
    "revelation_type": "Meccan",
    "verses": 11,
    "starting_page": 1195
  },
  {
    "number": 94,
    "name": "Ash-Sharh",
    "name_arabic": "\u0627\u0644\u0634\u0631\u062d",
    "meaning": "The Relief",
    "revelation_type": "Meccan",
    "verses": 8,
    "starting_page": 1195
  },
  {
    "number": 95,
    "name": "At-Tin",
    "name_arabic": "\u0627\u0644\u062a\u064a\u0646",
    "meaning": "The Fig",
    "revelation_type": "Meccan",
    "verses": 8,
    "starting_page": 1197
  },
  {
    "number": 96,
    "name": "Al-Alaq",
    "name_arabic": "\u0627\u0644\u0639\u0644\u0642",
    "meaning": "The Clot",
    "revelation_type": "Meccan",
    "verses": 19,
    "starting_page": 1197
  },
  {
    "number": 97,
    "name": "Al-Qadr",
    "name_arabic": "\u0627\u0644\u0642\u062f\u0631",
    "meaning": "The Power",
    "revelation_type": "Meccan",
    "verses": 5,
    "starting_page": 1199
  },
  {
    "number": 98,
    "name": "Al-Bayyina",
    "name_arabic": "\u0627\u0644\u0628\u064a\u0646\u0629",
    "meaning": "The Clear Proof",
    "revelation_type": "Medinan",
    "verses": 8,
    "starting_page": 1199
  },
  {
    "number": 99,
    "name": "Az-Zalzala",
    "name_arabic": "\u0627\u0644\u0632\u0644\u0632\u0644\u0629",
    "meaning": "The Earthquake",
    "revelation_type": "Medinan",
    "verses": 8,
    "starting_page": 1201
  },
  {
    "number": 100,
    "name": "Al-Adiyat",
    "name_arabic": "\u0627\u0644\u0639\u0627\u062f\u064a\u0627\u062a",
    "meaning": "The Chargers",
    "revelation_type": "Meccan",
    "verses": 11,
    "starting_page": 1203
  },
  {
    "number": 101,
    "name": "Al-Qari'a",
    "name_arabic": "\u0627\u0644\u0642\u0627\u0631\u0639\u0629",
    "meaning": "The Calamity",
    "revelation_type": "Meccan",
    "verses": 11,
    "starting_page": 1205
  },
  {
    "number": 102,
    "name": "At-Takathur",
    "name_arabic": "\u0627\u0644\u062a\u0643\u0627\u062b\u0631",
    "meaning": "The Rivalry",
    "revelation_type": "Meccan",
    "verses": 8,
    "starting_page": 1207
  },
  {
    "number": 103,
    "name": "Al-Asr",
    "name_arabic": "\u0627\u0644\u0639\u0635\u0631",
    "meaning": "The Declining Day",
    "revelation_type": "Meccan",
    "verses": 3,
    "starting_page": 1209
  },
  {
    "number": 104,
    "name": "Al-Humaza",
    "name_arabic": "\u0627\u0644\u0647\u0645\u0632\u0629",
    "meaning": "The Traducer",
    "revelation_type": "Meccan",
    "verses": 9,
    "starting_page": 1211
  },
  {
    "number": 105,
    "name": "Al-Fil",
    "name_arabic": "\u0627\u0644\u0641\u064a\u0644",
    "meaning": "The Elephant",
    "revelation_type": "Meccan",
    "verses": 5,
    "starting_page": 1213
  },
  {
    "number": 106,
    "name": "Quraysh",
    "name_arabic": "\u0642\u0631\u064a\u0634",
    "meaning": "Quraysh",
    "revelation_type": "Meccan",
    "verses": 4,
    "starting_page": 1215
  },
  {
    "number": 107,
    "name": "Al-Ma'un",
    "name_arabic": "\u0627\u0644\u0645\u0627\u0639\u0648\u0646",
    "meaning": "The Small Kindnesses",
    "revelation_type": "Meccan",
    "verses": 7,
    "starting_page": 1217
  },
  {
    "number": 108,
    "name": "Al-Kawthar",
    "name_arabic": "\u0627\u0644\u0643\u0648\u062b\u0631",
    "meaning": "The Abundance",
    "revelation_type": "Meccan",
    "verses": 3,
    "starting_page": 1219
  },
  {
    "number": 109,
    "name": "Al-Kafirun",
    "name_arabic": "\u0627\u0644\u0643\u0627\u0641\u0631\u0648\u0646",
    "meaning": "The Disbelievers",
    "revelation_type": "Meccan",
    "verses": 6,
    "starting_page": 1221
  },
  {
    "number": 110,
    "name": "An-Nasr",
    "name_arabic": "\u0627\u0644\u0646\u0635\u0631",
    "meaning": "The Divine Support",
    "revelation_type": "Medinan",
    "verses": 3,
    "starting_page": 1223
  },
  {
    "number": 111,
    "name": "Al-Masad",
    "name_arabic": "\u0627\u0644\u0645\u0633\u062f\u062f",
    "meaning": "The Palm Fibre",
    "revelation_type": "Meccan",
    "verses": 5,
    "starting_page": 1225
  },
  {
    "number": 112,
    "name": "Al-Ikhlas",
    "name_arabic": "\u0627\u0644\u0625\u062e\u0644\u0627\u0635",
    "meaning": "The Sincerity",
    "revelation_type": "Meccan",
    "verses": 4,
    "starting_page": 1227
  },
  {
    "number": 113,
    "name": "Al-Falaq",
    "name_arabic": "\u0627\u0644\u0641\u0644\u0642",
    "meaning": "The Daybreak",
    "revelation_type": "Meccan",
    "verses": 5,
    "starting_page": 1229
  },
  {
    "number": 114,
    "name": "An-Nas",
    "name_arabic": "\u0627\u0644\u0646\u0627\u0633",
    "meaning": "Mankind",
    "revelation_type": "Meccan",
    "verses": 6,
    "starting_page": 1231
  }
];

export default function SurahsIndexPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-brand text-3xl text-accent mb-2 text-center">All 114 Surahs</h1>
        <p className="text-center text-secondary mb-8">
          Select a Surah to read in English transliteration with Tajweed colour coding.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {SURAHS.map(s => (
            <Link
              key={s.number}
              href={"/surah/" + s.number + "/" + s.name.toLowerCase().replace(/'/g,'').replace(/\\s+/g,'-')}
              className="rounded-lg border border-border bg-surface p-4 hover:border-accent transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted">Surah {s.number}</p>
                  <p className="font-brand text-accent text-lg">{s.name_arabic}</p>
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted italic">{s.meaning}</p>
                </div>
                <span className="text-accent text-sm opacity-0 group-hover:opacity-100">→</span>
              </div>
              <div className="mt-2 flex gap-2 text-xs text-muted">
                <span>{s.verses} verses</span>
                <span>•</span>
                <span>{s.revelation_type}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
