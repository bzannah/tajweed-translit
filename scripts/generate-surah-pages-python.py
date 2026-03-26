#!/usr/bin/env python3
"""
Surah Intro Pages Generator
Generates 114 SEO-optimized Surah pages at src/app/surah/[nnn]/[slug]/page.tsx
"""
import os, json
from pathlib import Path

OUT_DIR = Path("src/app/surah")

TAJWEED_RULES = [
    {"id": "madd-necessary",   "name": "Necessary Prolongation",  "arabic": "المد اللازم",         "colour": "#FF0000"},
    {"id": "madd-obligatory",  "name": "Obligatory Prolongation", "arabic": "المد الواجب المتصل",   "colour": "#8B0000"},
    {"id": "madd-permissible", "name": "Permissible Prolongation","arabic": "المد الجائز المنفصل", "colour": "#FF8C00"},
    {"id": "ghunnah",          "name": "Nasalisation (Ghunnah)",  "arabic": "الغنة",                "colour": "#00AA00"},
    {"id": "tafkheem",         "name": "Emphatic Pronunciation", "arabic": "التفخيم",              "colour": "#0066CC"},
    {"id": "silent",            "name": "Silent Letters",           "arabic": "الحروف غير الملفوظة",  "colour": "#808080"},
    {"id": "qalqalah",         "name": "Echoing Sound (Qalqalah)","arabic": "القلقلة",              "colour": "#4B0082"},
    {"id": "madd-normal",       "name": "Normal Prolongation",     "arabic": "المد الطبيعي",         "colour": "#000000"},
]

SURAH_DATA = [
    {"number": 1,   "name": "Al-Fatiha",    "name_arabic": "الفاتحة",   "meaning": "The Opening",            "revelation_type": "Meccan",  "verses": 7,    "starting_page": 1,  "description": "Al-Fatiha is the opening chapter of the Quran, recited in every unit of Muslim prayer (Salah). It is known as the 'Umm al-Kitab' — the Mother of the Book.", "significance": "Essential for daily prayer; contains the seven oft-repeated verses (Al-Mathani)."},
    {"number": 2,   "name": "Al-Baqara",    "name_arabic": "البقرة",     "meaning": "The Cow",                "revelation_type": "Medinan", "verses": 286,  "starting_page": 7,  "description": "The longest Surah of the Quran, Al-Baqara covers foundational rulings, stories of previous prophets, and the qualities of the righteous.", "significance": "Contains Ayat al-Kursi (the Throne Verse) — the greatest verse in the Quran."},
    {"number": 3,   "name": "Al-Imran",     "name_arabic": "آل عمران",   "meaning": "The Family of Imran",    "revelation_type": "Medinan", "verses": 200,  "starting_page": 103,"description": "Named after the family of Imran, this Surah emphasizes faith, monotheism, and the stories of Maryam and Isa (Jesus).", "significance": "Contains the verse of mubasharat — the three groups promised a special rank in Paradise."},
    {"number": 4,   "name": "An-Nisa",      "name_arabic": "النساء",     "meaning": "The Women",              "revelation_type": "Medinan", "verses": 176,  "starting_page": 157,"description": "The Surah of Women addresses family law, inheritance, marriage, and the rights of women in Islam.", "significance": "Covers 23% of Islamic jurisprudence including inheritance rules."},
    {"number": 5,   "name": "Al-Ma'ida",    "name_arabic": "المائدة",    "meaning": "The Table Spread",       "revelation_type": "Medinan", "verses": 120,  "starting_page": 215,"description": "Al-Ma'ida addresses lawful and unlawful food, the story of the table spread from heaven, and the covenant with the People of the Book.", "significance": "Establishes the rules of halal food and the obligation to uphold previous scriptures."},
    {"number": 6,   "name": "Al-An'am",     "name_arabic": "الأنعام",    "meaning": "The Cattle",             "revelation_type": "Meccan",  "verses": 165,  "starting_page": 259,"description": "One of the earliest Meccan surahs, Al-An'am deepens the proof of monotheism and addresses pagan practices.", "significance": "One of the first surahs revealed; strongly reinforces the oneness of Allah."},
    {"number": 7,   "name": "Al-A'raf",    "name_arabic": "الأعراف",    "meaning": "The Heights",            "revelation_type": "Meccan",  "verses": 206,  "starting_page": 305,"description": "Al-A'raf bridges the stories of previous prophets and the final warnings to Mecca.", "significance": "Contains the detailed account of the conversation between the people of Paradise and Hell."},
    {"number": 8,   "name": "Al-Anfal",     "name_arabic": "الأنفال",    "meaning": "The Spoils of War",      "revelation_type": "Medinan", "verses": 75,   "starting_page": 357,"description": "Revealed after the Battle of Badr (624 CE), Al-Anfal addresses the distribution of war spoils.", "significance": "First surah revealed concerning a specific military engagement — the Battle of Badr."},
    {"number": 9,   "name": "At-Tawba",    "name_arabic": "التوبة",    "meaning": "The Repentance",          "revelation_type": "Medinan", "verses": 129,  "starting_page": 377,"description": "At-Tawba is the declaration of immunity from polytheism. Also called Al-Bar'a.", "significance": "Announces the liberation of Mecca and the end of polytheism."},
    {"number": 10,  "name": "Yunus",        "name_arabic": "يونس",       "meaning": "Jonah",                  "revelation_type": "Meccan",  "verses": 109,  "starting_page": 419,"description": "Contains the story of the prophet Yunus — swallowed by a great fish, and his people later repenting.", "significance": "Contains: 'Indeed, Allah does not forgive associating partners with Him.'"},
    {"number": 11,  "name": "Hud",          "name_arabic": "هود",         "meaning": "Hud",                    "revelation_type": "Meccan",  "verses": 123,  "starting_page": 445,"description": "Hud addresses the prophet Hud and his people of 'Ad, presenting parables and proofs of Allah's power.", "significance": "One of the surahs of warning sent to the people of 'Ad."},
    {"number": 12,  "name": "Yusuf",        "name_arabic": "يوسف",       "meaning": "Joseph",                 "revelation_type": "Meccan",  "verses": 111,  "starting_page": 473,"description": "The complete narrative of the prophet Yusuf from childhood to becoming Egypt's minister. The most beautiful story in the Quran.", "significance": "Contains the most complete narrative of any prophet in the Quran."},
    {"number": 13,  "name": "Ar-Ra'd",      "name_arabic": "الرعد",       "meaning": "The Thunder",            "revelation_type": "Medinan", "verses": 43,   "starting_page": 501,"description": "Contains profound arguments for faith through the signs in nature and the concept of life after death.", "significance": "Contains the verse establishing that Faith increases and decreases."},
    {"number": 14,  "name": "Ibrahim",      "name_arabic": "إبراهيم",    "meaning": "Abraham",                "revelation_type": "Meccan",  "verses": 52,   "starting_page": 513,"description": "Named after the prophet Ibrahim, this Surah recounts his mission and the building of the Ka'bah.", "significance": "Contains Ibrahim's prayer for Mecca — still relevant today."},
    {"number": 15,  "name": "Al-Hijr",      "name_arabic": "الحجر",       "meaning": "The Rocky Tract",       "revelation_type": "Meccan",  "verses": 99,   "starting_page": 527,"description": "Named after the stone valley of the Thamud people who rejected their prophet Salih.", "significance": "Contains the verse about the Quran being a confirmation of previous scriptures."},
    {"number": 16,  "name": "An-Nahl",      "name_arabic": "النحل",       "meaning": "The Bee",               "revelation_type": "Meccan",  "verses": 128,  "starting_page": 537,"description": "Contains the evidences of Allah's creation including the bee, the seasons, and the water cycle.", "significance": "Contains: 'Allah does not forbid you from being good to those who have not fought you.'"},
    {"number": 17,  "name": "Al-Isra",      "name_arabic": "الإسراء",    "meaning": "The Night Journey",     "revelation_type": "Meccan",  "verses": 111,  "starting_page": 567,"description": "Records the Night Journey (Isra) from Mecca to Jerusalem and the Ascension (Miraj).", "significance": "Contains: 'No soul shall die except by Allah's permission.'"},
    {"number": 18,  "name": "Al-Kahf",     "name_arabic": "الكهف",       "meaning": "The Cave",             "revelation_type": "Meccan",  "verses": 110,  "starting_page": 589,"description": "The Surah of the Cave — containing the stories of the People of the Cave, the man with two gardens, and Musa and Khidr.", "significance": "Reciting this Surah on Friday brings light for the next eight days."},
    {"number": 19,  "name": "Maryam",       "name_arabic": "مريم",        "meaning": "Mary",                 "revelation_type": "Meccan",  "verses": 98,   "starting_page": 613,"description": "Named after Maryam, this Surah contains her story and the birth of Isa (Jesus).", "significance": "One of the few surahs named after a woman; contains Isa speaking in the cradle."},
    {"number": 20,  "name": "Taha",        "name_arabic": "طه",          "meaning": "Ta-Ha",                "revelation_type": "Meccan",  "verses": 135,  "starting_page": 627,"description": "Contains the story of Musa (Moses) from his birth to his mission with Pharaoh.", "significance": "Contains: 'Every soul tastes death.'"},
    {"number": 21,  "name": "Al-Anbiya",   "name_arabic": "الأنبياء",   "meaning": "The Prophets",           "revelation_type": "Meccan",  "verses": 112,  "starting_page": 647,"description": "Presents stories of numerous prophets united in one message: worship Allah alone.", "significance": "Reciting this Surah is mustahab for those seeking children."},
    {"number": 22,  "name": "Al-Hajj",     "name_arabic": "الحج",         "meaning": "The Pilgrimage",        "revelation_type": "Medinan", "verses": 78,   "starting_page": 667,"description": "Addresses the pilgrimage to Mecca, the rituals of Hajj and Umrah, and the Prophet's Farewell Pilgrimage address.", "significance": "Contains the verse of the Farewell Pilgrimage establishing the Prophet's authority ends with the Quran."},
    {"number": 23,  "name": "Al-Mu'minun", "name_arabic": "المؤمنون",   "meaning": "The Believers",          "revelation_type": "Meccan",  "verses": 118,  "starting_page": 687,"description": "Describes the qualities of the true believers and the signs of Allah.", "significance": "Opens with the description of the believers read in daily Salah."},
    {"number": 24,  "name": "An-Nur",      "name_arabic": "النور",        "meaning": "The Light",            "revelation_type": "Medinan", "verses": 64,   "starting_page": 703,"description": "Covers the incident of slander, laws of modesty, the command of hijab, and rules of evidence.", "significance": "Contains the command of hijab (24:31)."},
    {"number": 25,  "name": "Al-Furqan",  "name_arabic": "الفرقان",     "meaning": "The Criterion",         "revelation_type": "Meccan",  "verses": 77,   "starting_page": 721,"description": "Al-Furqan distinguishes truth from falsehood. It gives the Quran its name 'Al-Furqan.'", "significance": "Gives the Quran its name — the criterion between truth and falsehood."},
    {"number": 26,  "name": "Ash-Shu'ara", "name_arabic": "الشعراء",    "meaning": "The Poets",             "revelation_type": "Meccan",  "verses": 227,  "starting_page": 737,"description": "Contains the stories of Musa, Ibrahim, Nuh, Hud, Salih, Lut, and Shu'ayb.", "significance": "Contains: 'And your Lord is the Most Blessed and Exalted.'"},
    {"number": 27,  "name": "An-Naml",    "name_arabic": "النمل",        "meaning": "The Ant",               "revelation_type": "Meccan",  "verses": 93,   "starting_page": 757,"description": "Recounts the stories of Sulayman (Solomon) and the Queen of Sheba.", "significance": "Contains the dua of Musa: 'My Lord, expand for me my breast.'"},
    {"number": 28,  "name": "Al-Qasas",    "name_arabic": "القصص",        "meaning": "The Stories",           "revelation_type": "Meccan",  "verses": 88,   "starting_page": 773,"description": "Contains the detailed story of Musa (Moses) from birth to his mission.", "significance": "Contains: 'Indeed, he who comes to Allah with a sound heart comes with a good deed.'"},
    {"number": 29,  "name": "Al-Ankabut", "name_arabic": "العنكبوت",    "meaning": "The Spider",            "revelation_type": "Meccan",  "verses": 69,   "starting_page": 795,"description": "Contains the parable of the spider's house — the weakest of homes.", "significance": "The surah in which Allah declares He will help His servants."},
    {"number": 30,  "name": "Ar-Rum",     "name_arabic": "الروم",        "meaning": "The Romans",            "revelation_type": "Meccan",  "verses": 60,   "starting_page": 811,"description": "Predicted the Roman victory over Persia within 3-9 years — a prophecy fulfilled exactly.", "significance": "Contains: 'Do they not see how Allah brings the dead to life?'"},
    {"number": 31,  "name": "Luqman",     "name_arabic": "لقمان",        "meaning": "Luqman",                "revelation_type": "Meccan",  "verses": 34,   "starting_page": 825,"description": "Named after the wise Luqman, containing his advice to his son.", "significance": "Contains Luqman's advice: 'O my son, do not associate partners with Allah.'"},
    {"number": 32,  "name": "As-Sajda",   "name_arabic": "السجدة",      "meaning": "The Prostration",        "revelation_type": "Meccan",  "verses": 30,   "starting_page": 833,"description": "One of five surahs before which sajdah (prostration) is recited.", "significance": "One of the five surahs of sajdah; recommended to recite on Laylat al-Qadr."},
    {"number": 33,  "name": "Al-Ahzab",   "name_arabic": "الأحزاب",     "meaning": "The Confederates",       "revelation_type": "Medinan", "verses": 73,   "starting_page": 839,"description": "Addresses the Battle of the Trench, the incident of the slander, and the family of the Prophet.", "significance": "Contains the verse of adoption and its nullification."},
    {"number": 34,  "name": "Saba",        "name_arabic": "سبأ",         "meaning": "Sheba",                "revelation_type": "Meccan",  "verses": 54,   "starting_page": 859,"description": "Named after the people of Sheba, recounting the story of Bilqis and Sulayman.", "significance": "Contains: 'This is indeed a noble Quran in a preserved Register.'"},
    {"number": 35,  "name": "Fatir",      "name_arabic": "فاطر",        "meaning": "The Originator",         "revelation_type": "Meccan",  "verses": 45,   "starting_page": 871,"description": "Emphasizes the signs of Allah in creation, calling humanity to reflect and believe.", "significance": "Contains: 'Whoever does righteousness — it is for his soul.'"},
    {"number": 36,  "name": "Ya-Sin",     "name_arabic": "يس",           "meaning": "Ya-Sin",                "revelation_type": "Meccan",  "verses": 83,   "starting_page": 883,"description": "Known as the 'Heart of the Quran.' Addresses resurrection and the proof of the Quran.", "significance": "Reciting Ya-Sin on Friday night is mustahab. The Surah of the dead city."},
    {"number": 37,  "name": "As-Saffat",  "name_arabic": "الصافات",      "meaning": "Those Ranged in Ranks",  "revelation_type": "Meccan",  "verses": 182,  "starting_page": 895,"description": "Depicts the angels ranged in rows and the stories of Ibrahim and his son Ismail.", "significance": "Contains the story of Ibrahim's sacrifice — one of the most important narratives."},
    {"number": 38,  "name": "Sad",         "name_arabic": "ص",            "meaning": "Sad",                   "revelation_type": "Meccan",  "verses": 88,   "starting_page": 909,"description": "Addresses the stories of Dawud and Sulayman and the proofs of prophethood.", "significance": "Contains the story of the hoopoe bird and Sulayman's kingdom."},
    {"number": 39,  "name": "Az-Zumar",    "name_arabic": "الزمر",       "meaning": "The Groups",            "revelation_type": "Meccan",  "verses": 75,   "starting_page": 919,"description": "Addresses resurrection, accountability, and the parable of those who take guardians besides Allah.", "significance": "Contains: 'Is not the time come for those who have believed?'"},
    {"number": 40,  "name": "Ghafir",     "name_arabic": "غافر",         "meaning": "The Forgiver",           "revelation_type": "Meccan",  "verses": 85,   "starting_page": 937,"description": "Named after one of the names of Allah. Addresses the proof of resurrection and the stories of Musa and Fir'awn.", "significance": "Contains the famous dua: 'Lord, forgive me.'"},
    {"number": 41,  "name": "Fussilat",   "name_arabic": "فصلت",         "meaning": "Explained in Detail",   "revelation_type": "Meccan",  "verses": 54,   "starting_page": 957,"description": "Explains the signs of Allah in creation and the Quran's clarity.", "significance": "Contains: 'This is a mercy from your Lord.'"},
    {"number": 42,  "name": "Ash-Shura",  "name_arabic": "الشورى",       "meaning": "The Consultation",        "revelation_type": "Meccan",  "verses": 53,   "starting_page": 969,"description": "Emphasizes the principle of shura (mutual consultation) in governance.", "significance": "Establishes the principle of mutual consultation as a foundation of Islamic governance."},
    {"number": 43,  "name": "Az-Zukhruf", "name_arabic": "الزخرف",       "meaning": "The Gold Adornments",   "revelation_type": "Meccan",  "verses": 89,   "starting_page": 981,"description": "Warns against the decorative false beliefs of the disbelievers.", "significance": "Contains: 'He [Musa] said: Do you see what you call upon besides Allah?'"},
    {"number": 44,  "name": "Ad-Dukhan",  "name_arabic": "الدخان",        "meaning": "The Smoke",             "revelation_type": "Meccan",  "verses": 59,   "starting_page": 995,"description": "Describes a smoke that will cover the disbelievers as punishment.", "significance": "Reciting this Surah in Fajr on Friday brings the reward of a whole year of worship."},
    {"number": 45,  "name": "Al-Jathiya", "name_arabic": "الجاثية",      "meaning": "The Kneeling",           "revelation_type": "Meccan",  "verses": 37,   "starting_page": 1001,"description": "Presents evidence of Allah's power in creation and the Day of Judgment.", "significance": "Contains: 'Do they not travel through the earth and see what was the end of those before them?'"},
    {"number": 46,  "name": "Al-Ahqaf",  "name_arabic": "الأحقاف",       "meaning": "The Sand Dunes",         "revelation_type": "Meccan",  "verses": 35,   "starting_page": 1007,"description": "Addresses the Thamud people and their prophet Salih.", "significance": "Contains the verse about those whose ears and hearts are sealed."},
    {"number": 47,  "name": "Muhammad",   "name_arabic": "محمد",          "meaning": "Muhammad",               "revelation_type": "Medinan", "verses": 38,   "starting_page": 1017,"description": "Addresses the believers about fighting the disbelievers and the consequences of hypocrisy.", "significance": "Contains: 'Allah has promised those who believe and do righteous deeds.'"},
    {"number": 48,  "name": "Al-Fath",    "name_arabic": "الفتح",         "meaning": "The Victory",            "revelation_type": "Medinan", "verses": 29,   "starting_page": 1025,"description": "Celebrates the Treaty of Hudaybiyyah — a pivotal moment for the Muslim community.", "significance": "Contains: 'Muhammad is the Messenger of Allah; and those with him are firm.'"},
    {"number": 49,  "name": "Al-Hujurat", "name_arabic": "الحجرات",      "meaning": "The Rooms",              "revelation_type": "Medinan", "verses": 18,   "starting_page": 1033,"description": "Addresses the etiquette of the believers — avoiding suspicion, backbiting, and the equality of all humans.", "significance": "Contains: 'Indeed, We have created you from male and female and made you peoples and tribes.'"},
    {"number": 50,  "name": "Qaf",        "name_arabic": "ق",             "meaning": "Qaf",                    "revelation_type": "Meccan",  "verses": 45,   "starting_page": 1039,"description": "Addresses the reality of resurrection and the recording of deeds by angels.", "significance": "The opening letters of this surah are among the Ha Mim letters."},
    {"number": 51,  "name": "Adh-Dhariyat","name_arabic": "الذاريات",   "meaning": "The Scattering Winds",    "revelation_type": "Meccan",  "verses": 60,   "starting_page": 1043,"description": "Swears by the winds that scatter, clouds that carry rain, and ships that sail.", "significance": "Contains: 'And upon Allah is the direction of the affair.'"},
    {"number": 52,  "name": "At-Tur",    "name_arabic": "الطور",         "meaning": "The Mount",              "revelation_type": "Meccan",  "verses": 49,   "starting_page": 1049,"description": "Describes the Mountain of Sinai where Musa spoke to Allah.", "significance": "Named after the mountain where Musa spoke to Allah — a symbol of divine revelation."},
    {"number": 53,  "name": "An-Najm",   "name_arabic": "النجم",          "meaning": "The Star",               "revelation_type": "Meccan",  "verses": 62,   "starting_page": 1055,"description": "Contains the account of the Prophet's journey of Isra and Mi'raj.", "significance": "Contains the verse in which Prophet Muhammad saw his Lord with his heart during the Mi'raj."},
    {"number": 54,  "name": "Al-Qamar",  "name_arabic": "القمر",         "meaning": "The Moon",               "revelation_type": "Meccan",  "verses": 55,   "starting_page": 1059,"description": "Addresses the splitting of the moon — a miracle of Prophet Muhammad.", "significance": "Contains: 'The Hour has come closer, and the moon has been split.'"},
    {"number": 55,  "name": "Ar-Rahman", "name_arabic": "الرحمن",        "meaning": "The Most Merciful",      "revelation_type": "Medinan", "verses": 78,   "starting_page": 1065,"description": "Enumerates the blessings of Allah and repeatedly asks 'Which of your Lord's blessings would you deny?'", "significance": "The most frequently recited surah in the Muslim world."},
    {"number": 56,  "name": "Al-Waqi'a", "name_arabic": "الواقعة",       "meaning": "The Inevitable",         "revelation_type": "Meccan",  "verses": 96,   "starting_page": 1071,"description": "Describes the Day of Resurrection, dividing humanity into three groups.", "significance": "Reciting this Surah regularly protects from poverty."},
    {"number": 57,  "name": "Al-Hadid",  "name_arabic": "الحديد",         "meaning": "The Iron",               "revelation_type": "Medinan", "verses": 29,   "starting_page": 1077,"description": "Describes iron as benefit to humanity and calls believers to struggle in the way of Allah.", "significance": "Contains: 'And strive for Allah with the striving due to Him.'"},
    {"number": 58,  "name": "Al-Mujadila","name_arabic": "المجادلة",    "meaning": "The Pleading Woman",      "revelation_type": "Medinan", "verses": 22,   "starting_page": 1087,"description": "Addresses the case of Khawla bint Thalaba and the ruling on zhihar.", "significance": "Contains the verse of purification: 'Allah only intends to keep impurity away from you.'"},
    {"number": 59,  "name": "Al-Hashr",  "name_arabic": "الحشر",          "meaning": "The Gathering",           "revelation_type": "Medinan", "verses": 24,   "starting_page": 1093,"description": "Addresses the exile of the Banu Nadir tribe and the attributes of Allah.", "significance": "Contains: 'Whatever thing you spend [for charity] — He will replace it.'"},
    {"number": 60,  "name": "Al-Mumtahina","name_arabic": "الممتحنة",   "meaning": "The Examined Woman",     "revelation_type": "Medinan", "verses": 13,   "starting_page": 1101,"description": "Addresses the rules regarding women who seek refuge with the believers.", "significance": "Establishes that loyalty to Allah takes precedence over all other loyalties."},
    {"number": 61,  "name": "As-Saff",   "name_arabic": "الصف",           "meaning": "The Ranks",             "revelation_type": "Medinan", "verses": 14,   "starting_page": 1105,"description": "Calls believers to be like a built structure — firm and united.", "significance": "Contains: 'Indeed, Allah has purchased from the believers their lives and their properties.'"},
    {"number": 62,  "name": "Al-Jumu'a", "name_arabic": "الجمعة",         "meaning": "Friday",                "revelation_type": "Medinan", "verses": 11,   "starting_page": 1109,"description": "Establishes Friday as the day of gathering and rest for Muslims.", "significance": "Establishes Friday as the weekly day of worship for Muslims."},
    {"number": 63,  "name": "Al-Munafiqun","name_arabic": "المنافقون",    "meaning": "The Hypocrites",         "revelation_type": "Medinan", "verses": 11,   "starting_page": 1111,"description": "Exposes the characteristics of hypocrites.", "significance": "Contains the hadith qudsi: 'When I love My servant, I am his hearing, his sight.'"},
    {"number": 64,  "name": "At-Taghabun","name_arabic": "التغابن",       "meaning": "The Mutual Disillusion",  "revelation_type": "Medinan", "verses": 18,   "starting_page": 1115,"description": "Addresses the Day when all deeds will be exposed.", "significance": "Contains: 'He created the heavens and the earth in truth and formed you in the best of forms.'"},
    {"number": 65,  "name": "At-Talaq",  "name_arabic": "الطلاق",        "meaning": "Divorce",               "revelation_type": "Medinan", "verses": 12,   "starting_page": 1119,"description": "Provides comprehensive rulings on divorce and the waiting period.", "significance": "Contains the verse about how Allah intends ease for you, not hardship."},
    {"number": 66,  "name": "At-Tahrim", "name_arabic": "التحريم",       "meaning": "The Prohibition",        "revelation_type": "Medinan", "verses": 12,   "starting_page": 1123,"description": "Addresses the story of the Prophet's wives and the prohibition of making lawful what Allah has made unlawful.", "significance": "Contains the verse of the Prophet's concern for his wives."},
    {"number": 67,  "name": "Al-Mulk",   "name_arabic": "الملك",          "meaning": "The Sovereignty",        "revelation_type": "Meccan",  "verses": 30,   "starting_page": 1127,"description": "One of the most beloved surahs. Describes Allah's sovereignty over all creation.", "significance": "Reciting this Surah protects from the punishment of the grave."},
    {"number": 68,  "name": "Al-Qalam",  "name_arabic": "القلم",         "meaning": "The Pen",                 "revelation_type": "Meccan",  "verses": 52,   "starting_page": 1131,"description": "Swears by the pen — the first thing created. Addresses the slandering of the Prophet.", "significance": "Contains: 'The soul and He who proportioned it — then inspired it with its wickedness and its righteousness.'"},
    {"number": 69,  "name": "Al-Haqqa",  "name_arabic": "الحاقة",         "meaning": "The Reality",            "revelation_type": "Meccan",  "verses": 52,   "starting_page": 1135,"description": "Describes the Day of Judgment in vivid detail.", "significance": "Contains: 'Indeed, this is the truth from your Lord.'"},
    {"number": 70,  "name": "Al-Ma'arij","name_arabic": "المعارج",       "meaning": "The Ascending Stairways", "revelation_type": "Meccan",  "verses": 44,   "starting_page": 1139,"description": "Addresses the Day of Judgment and the patience of the believers.", "significance": "Contains the famous dua from the Quran: 'My Lord, cover me with Your mercy.'"},
    {"number": 71,  "name": "Nuh",       "name_arabic": "نوح",            "meaning": "Noah",                  "revelation_type": "Meccan",  "verses": 52,   "starting_page": 1143,"description": "Recounts the prophet Nuh's 950 years of calling his people to worship Allah alone.", "significance": "Contains the dua of Nuh: 'My Lord, forgive me and my parents.'"},
    {"number": 72,  "name": "Al-Jinn",   "name_arabic": "الجن",           "meaning": "The Jinn",              "revelation_type": "Meccan",  "verses": 28,   "starting_page": 1147,"description": "Reveals that jinn exist and that some accepted Islam when they heard the Quran.", "significance": "The only surah in which the jinn are described as coming to the Prophet and declaring their faith."},
    {"number": 73,  "name": "Al-Muzzammil","name_arabic": "المزمل",       "meaning": "The Enshrouded One",      "revelation_type": "Meccan",  "verses": 20,   "starting_page": 1151,"description": "Commands the Prophet to rise in the night for prayer (Tahajjud).", "significance": "Contains: 'From the night, pray an extra portion — perhaps your Lord will raise you to a praised position.'"},
    {"number": 74,  "name": "Al-Muddaththir","name_arabic": "المدثر",     "meaning": "The Cloaked One",         "revelation_type": "Meccan",  "verses": 56,   "starting_page": 1153,"description": "Commands the Prophet to rise and warn — beginning his mission as the final messenger.", "significance": "This was the first verse revealed to Prophet Muhammad beginning his prophethood."},
    {"number": 75,  "name": "Al-Qiyama", "name_arabic": "القيامة",        "meaning": "The Resurrection",        "revelation_type": "Meccan",  "verses": 40,   "starting_page": 1157,"description": "Addresses the doubters of the resurrection.", "significance": "Contains: 'Does man not remember that We created him before when he was nothing?'"},
    {"number": 76,  "name": "Al-Insan",  "name_arabic": "الإنسان",       "meaning": "The Human",              "revelation_type": "Medinan", "verses": 31,   "starting_page": 1159,"description": "Describes the believers in Paradise and the People of the Ditch.", "significance": "Contains the verse about the people of the ditch who burned others in fire."},
    {"number": 77,  "name": "Al-Mursalat","name_arabic": "المرسلات",     "meaning": "The Emissaries",          "revelation_type": "Meccan",  "verses": 50,   "starting_page": 1163,"description": "Describes the angels sent with divine commands and the Day of Judgment.", "significance": "Contains: 'By the winds sent forth in gusts.'"},
    {"number": 78,  "name": "An-Naba",   "name_arabic": "النبأ",         "meaning": "The Tidings",            "revelation_type": "Meccan",  "verses": 40,   "starting_page": 1167,"description": "Introduces the Day of Judgment as the great news that humanity disputes about.", "significance": "The first of the 'Mufassalat' surahs."},
    {"number": 79,  "name": "An-Nazi'at","name_arabic": "النازعات",       "meaning": "Those Who Drag Forth",    "revelation_type": "Meccan",  "verses": 46,   "starting_page": 1169,"description": "Describes the angels who drag souls out at death and the Day of Judgment.", "significance": "Contains: 'And the mountains are moved and become like tufts of wool.'"},
    {"number": 80,  "name": "Abasa",    "name_arabic": "عبس",           "meaning": "He Frowned",             "revelation_type": "Meccan",  "verses": 42,   "starting_page": 1173,"description": "Teaches that the Prophet was sent to give warning, not to force belief, and guidance is from Allah alone.", "significance": "The blind man Abdullah ibn Umm Maktum was dearer to Allah than the chieftains of Mecca."},
    {"number": 81,  "name": "At-Takwir","name_arabic": "التكوير",         "meaning": "The Overthrowing",        "revelation_type": "Meccan",  "verses": 29,   "starting_page": 1175,"description": "Describes the cosmic events of the Day of Judgment.", "significance": "The surah that describes the complete upheaval of the universe at resurrection."},
    {"number": 82,  "name": "Al-Infitar","name_arabic": "الانفطار",       "meaning": "The Cleaving",            "revelation_type": "Meccan",  "verses": 19,   "starting_page": 1177,"description": "Describes the Day when the sky is split open and every soul is brought to account.", "significance": "Contains: 'When the sun is wrapped up, when the stars darken.'"},
    {"number": 83,  "name": "Al-Mutaffifin","name_arabic": "المطففين",  "meaning": "The Defrauding",          "revelation_type": "Meccan",  "verses": 36,   "starting_page": 1177,"description": "Warns against those who give short measure in business.", "significance": "Contains: 'Woe to those who give short measure.'"},
    {"number": 84,  "name": "Al-Inshiqaq","name_arabic": "الانشقاق",     "meaning": "The Sundering",            "revelation_type": "Meccan",  "verses": 25,   "starting_page": 1181,"description": "Describes the Day when the earth is stretched out and casts out what is within it.", "significance": "Contains: 'When the earth is stretched out and casts out what is within it.'"},
    {"number": 85,  "name": "Al-Buruj", "name_arabic": "البروج",         "meaning": "The Mansions of Stars",   "revelation_type": "Meccan",  "verses": 22,   "starting_page": 1183,"description": "Mentions the People of the Ditch — believers thrown into fire.", "significance": "Contains the famous story of the People of the Ditch and their supreme test of faith."},
    {"number": 86,  "name": "At-Tariq", "name_arabic": "الطارق",         "meaning": "The Morning Star",        "revelation_type": "Meccan",  "verses": 17,   "starting_page": 1185,"description": "Emphasizes that humans were created from a clinging substance.", "significance": "Contains: 'Indeed, We created man from a sperm-drop mixture, to test him.'"},
    {"number": 87,  "name": "Al-A'la",  "name_arabic": "الأعلى",          "meaning": "The Most High",          "revelation_type": "Meccan",  "verses": 19,   "starting_page": 1185,"description": "Glorifies Allah and encourages the Prophet and believers to glorify their Lord.", "significance": "Recited in taraweeh prayer during Ramadan. Contains the command to glorify Allah."},
    {"number": 88,  "name": "Al-Ghashiya","name_arabic": "الغاشية",       "meaning": "The Overwhelming",        "revelation_type": "Meccan",  "verses": 26,   "starting_page": 1187,"description": "Asks: 'Has there come upon you the description of the overwhelming event?'", "significance": "Contains: 'Is one who is obedient to the believers and the harmful as equal?'"},
    {"number": 89,  "name": "Al-Fajr",  "name_arabic": "الفجر",           "meaning": "The Dawn",                "revelation_type": "Meccan",  "verses": 30,   "starting_page": 1189,"description": "Swears by the dawn and the ten nights — among the most sacred times in Islam.", "significance": "Contains: 'By the dawn and ten nights.'"},
    {"number": 90,  "name": "Al-Balad", "name_arabic": "البلد",          "meaning": "The City",                "revelation_type": "Meccan",  "verses": 20,   "starting_page": 1191,"description": "Addresses the difficulty of the path and emphasizes that guiding to the right path is also difficult.", "significance": "Contains: 'Indeed, We have shown him the way, whether he be grateful or ungrateful.'"},
    {"number": 91,  "name": "Ash-Shams","name_arabic": "الشمس",            "meaning": "The Sun",                 "revelation_type": "Meccan",  "verses": 15,   "starting_page": 1193,"description": "Swears by the sun and its radiance and addresses the parable of Thamud and their she-camel.", "significance": "Contains: 'Blessed is He who, if He willed, could make for you something better.'"},
    {"number": 92,  "name": "Al-Layl",  "name_arabic": "الليل",           "meaning": "The Night",               "revelation_type": "Meccan",  "verses": 21,   "starting_page": 1193,"description": "Contrasts the path of the one who gives in charity versus the one who denies and is ungrateful.", "significance": "Contains: 'As for him who gives and fears Allah and believes in the best reward.'"},
    {"number": 93,  "name": "Ad-Duha", "name_arabic": "الضحى",           "meaning": "The Morning Hours",        "revelation_type": "Meccan",  "verses": 11,   "starting_page": 1195,"description": "Revealed when the Prophet was grieved by discontinuation of revelation. It reassures him.", "significance": "A surah of comfort and reassurance."},
    {"number": 94,  "name": "Ash-Sharh","name_arabic": "الشرح",           "meaning": "The Relief",              "revelation_type": "Meccan",  "verses": 8,    "starting_page": 1195,"description": "Brings comfort and expands the chest of the Prophet, raising his status.", "significance": "Contains: 'Indeed, with hardship comes ease.'"},
    {"number": 95,  "name": "At-Tin",  "name_arabic": "التين",             "meaning": "The Fig",                 "revelation_type": "Meccan",  "verses": 8,    "starting_page": 1197,"description": "States that humans were created in the best of forms.", "significance": "Contains: 'Indeed, the most righteous will be in gardens of eternity.'"},
    {"number": 96,  "name": "Al-Alaq", "name_arabic": "العلق",             "meaning": "The Clot",               "revelation_type": "Meccan",  "verses": 19,   "starting_page": 1197,"description": "Contains the first verses revealed to Prophet Muhammad — 'Read in the name of your Lord.'", "significance": "The first surah revealed to Prophet Muhammad — the command to read in the name of Allah."},
    {"number": 97,  "name": "Al-Qadr", "name_arabic": "القدر",             "meaning": "The Power",               "revelation_type": "Meccan",  "verses": 5,    "starting_page": 1199,"description": "Reveals the virtue of Laylat al-Qadr — better than a thousand months of worship.", "significance": "Reciting this Surah on Laylat al-Qadr equals fasting the entire year."},
    {"number": 98,  "name": "Al-Bayyina","name_arabic": "البينة",          "meaning": "The Clear Proof",         "revelation_type": "Medinan", "verses": 8,    "starting_page": 1199,"description": "Declares that the Quran is the clear proof from Allah sent after previous scriptures.", "significance": "Contains: 'Not equal are the companions of the Fire and the companions of Paradise.'"},
    {"number": 99,  "name": "Az-Zalzala","name_arabic": "الزلزلة",        "meaning": "The Earthquake",          "revelation_type": "Medinan", "verses": 8,    "starting_page": 1201,"description": "Describes the earthquake of the Day of Judgment when the earth reveals its burdens.", "significance": "Reciting this Surah in Salah causes the mountains to testify for the reciter on the Day of Judgment."},
    {"number": 100, "name": "Al-Adiyat","name_arabic": "العاديات",         "meaning": "The Chargers",            "revelation_type": "Meccan",  "verses": 11,   "starting_page": 1203,"description": "Swears by the swift horses that charge into battle.", "significance": "Contains: 'Indeed, mankind is ungrateful to his Lord.'"},
    {"number": 101, "name": "Al-Qari'a","name_arabic": "القارعة",         "meaning": "The Calamity",            "revelation_type": "Meccan",  "verses": 11,   "starting_page": 1205,"description": "Describes the Day of Judgment as 'the striking Calamity.'", "significance": "The name gives the Day of Judgment its most terrifying description."},
    {"number": 102, "name": "At-Takathur","name_arabic": "التكاثر",       "meaning": "The Rivalry",             "revelation_type": "Meccan",  "verses": 8,    "starting_page": 1207,"description": "Warns against competition for worldly wealth that distracts from the remembrance of Allah.", "significance": "Contains: 'You will most certainly come to know.'"},
    {"number": 103, "name": "Al-Asr",   "name_arabic": "العصر",             "meaning": "The Declining Day",       "revelation_type": "Meccan",  "verses": 3,    "starting_page": 1209,"description": "States that all of humanity is in loss — except those who believe, do righteous deeds, and enjoin the truth.", "significance": "Ibn Taymiyyah said this is the most comprehensive surah — containing the entire religion."},
    {"number": 104, "name": "Al-Humaza","name_arabic": "الهمزة",           "meaning": "The Traducer",            "revelation_type": "Meccan",  "verses": 9,    "starting_page": 1211,"description": "Warns against those who find fault with others and accumulate wealth greedily.", "significance": "Contains: 'Woe to every slanderer and backbiter.'"},
    {"number": 105, "name": "Al-Fil",   "name_arabic": "الفيل",            "meaning": "The Elephant",            "revelation_type": "Meccan",  "verses": 5,    "starting_page": 1213,"description": "Describes the year of the Elephant when Abraha marched to destroy the Ka'bah.", "significance": "The year of the Elephant (570 CE) marks the birth year of Prophet Muhammad."},
    {"number": 106, "name": "Quraysh",  "name_arabic": "قريش",            "meaning": "Quraysh",                "revelation_type": "Meccan",  "verses": 4,    "starting_page": 1215,"description": "Establishes the obligation of the Quraysh to worship the Lord of the Ka'bah.", "significance": "Establishes the special status of the Quraysh as the keepers of the Ka'bah."},
    {"number": 107, "name": "Al-Ma'un", "name_arabic": "الماعون",          "meaning": "The Small Kindnesses",     "revelation_type": "Meccan",  "verses": 7,    "starting_page": 1217,"description": "Exposes the prayers of those who are not sincere.", "significance": "Contains the hadith about the three people whom Allah will not speak to on the Day of Judgment."},
    {"number": 108, "name": "Al-Kawthar","name_arabic": "الكوثر",         "meaning": "The Abundance",           "revelation_type": "Meccan",  "verses": 3,    "starting_page": 1219,"description": "Assures the Prophet of abundance — a great river in Paradise — and that his enemies will be cut off.", "significance": "Recited in daily Salah by billions of Muslims."},
    {"number": 109, "name": "Al-Kafirun","name_arabic": "الكافرون",       "meaning": "The Disbelievers",         "revelation_type": "Meccan",  "verses": 6,    "starting_page": 1221,"description": "Declares: 'To you your religion, and to me my religion.'", "significance": "Recited in the last rakah of Witr prayer."},
    {"number": 110, "name": "An-Nasr",  "name_arabic": "النصر",           "meaning": "The Divine Support",       "revelation_type": "Medinan", "verses": 3,    "starting_page": 1223,"description": "Announces the victory (fath) that Allah will grant to Islam — a prediction of the conquest of Mecca.", "significance": "When this surah was revealed, the Prophet understood his work was nearing completion."},
    {"number": 111, "name": "Al-Masad", "name_arabic": "المسدد",          "meaning": "The Palm Fibre",          "revelation_type": "Meccan",  "verses": 5,    "starting_page": 1225,"description": "Curses Abu Lahab and his wife — the fiercest opponents of the Prophet.", "significance": "The only surah that explicitly names and curses a specific individual."},
    {"number": 112, "name": "Al-Ikhlas","name_arabic": "الإخلاص",         "meaning": "The Sincerity",           "revelation_type": "Meccan",  "verses": 4,    "starting_page": 1227,"description": "Declares the absolute oneness of Allah in its purest form. Reciting it equals one-third of the Quran.", "significance": "Reciting Al-Ikhlas in Salah equals reciting one-third of the Quran."},
    {"number": 113, "name": "Al-Falaq", "name_arabic": "الفلق",           "meaning": "The Daybreak",            "revelation_type": "Meccan",  "verses": 5,    "starting_page": 1229,"description": "Seeks Allah's protection from the evil of what He created, from darkness, and from witchcraft.", "significance": "Recited with Al-Falaq and Al-Ikhlas for seeking protection from evil."},
    {"number": 114, "name": "An-Nas",  "name_arabic": "الناس",           "meaning": "Mankind",                "revelation_type": "Meccan",  "verses": 6,    "starting_page": 1231,"description": "Seeks protection from the whisperer (waswas) who suggests evil in the hearts of humans.", "significance": "The last verse of the Quran was revealed: 'From the evil of the whisperer who withdraws.'"},
]

def slugify(name):
    return name.lower().replace("'", "").replace(" ", "-")

def ordinal(n):
    if n == 1: return "1st"
    if n == 2: return "2nd"
    if n == 3: return "3rd"
    return f"{n}th"

def generate_page(surah):
    n = surah["number"]
    name = surah["name"]
    name_arabic = surah["name_arabic"]
    meaning = surah["meaning"]
    revelation_type = surah["revelation_type"]
    verses = surah["verses"]
    starting_page = surah["starting_page"]
    description = surah["description"]
    significance = surah["significance"]
    
    num_str = str(n).zfill(3)
    slug = slugify(name)
    
    emoji = "🏔️" if revelation_type == "Meccan" else "🏙️"
    
    tajweed_items = "\n".join(
        f'        <li class="flex items-center gap-2">\n          <span class="inline-block h-3 w-3 rounded-full" style="background:{r["colour"]}"></span>\n          <span class="text-sm">{r["name"]}</span>\n          <span class="text-xs text-muted">({r["arabic"]})</span>\n        </li>'
        for r in TAJWEED_RULES
    )
    
    prev_surah = SURAH_DATA[n-2] if n > 1 else None
    next_surah = SURAH_DATA[n] if n < 114 else None
    
    prev_link = f"""          <Link href="/surah/{n-1}/{slugify(prev_surah["name"])}" className="rounded-lg border border-border bg-surface p-4 text-center hover:border-accent transition-colors">
            <span className="text-xs text-muted">← Previous</span>
            <p className="mt-1 font-semibold text-foreground">Surah {prev_surah["name"]}</p>
          </Link>""" if prev_surah else "          <div></div>"
    
    next_link = f"""          <Link href="/surah/{n+1}/{slugify(next_surah["name"])}" className="rounded-lg border border-border bg-surface p-4 text-center hover:border-accent transition-colors">
            <span className="text-xs text-muted">Next →</span>
            <p className="mt-1 font-semibold text-foreground">Surah {next_surah["name"]}</p>
          </Link>""" if next_surah else "          <div></div>"
    
    page = f"""import type {{ Metadata }} from 'next';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {{
  params: Promise<{{ number: string; slug: string }}>;
}}

// ── Static Params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {{
  return [{{ number: "{num_str}", slug: "{slug}" }}];
}}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({{ params }}: Props): Promise<Metadata> {{
  const {{ number: num }} = await params;
  return {{
    title: "Surah {name} ({name_arabic}) — {meaning} | TajweedTranslit",
    description: "Read Surah {name} ({meaning}) — {verses} verses, {revelation_type} revelation. English transliteration with expert Tajweed colour coding. Free online reader.",
    keywords: [
      "Surah {name} transliteration",
      "Surah {n} tajweed",
      "{name} meaning",
      "Quran {slug} transliteration",
      "learn quran {slug}",
      "quran recitation {slug}",
      "tajweed {slug}",
    ],
    alternates: {{ canonical: `/surah/{n}/{slug}` }},
    openGraph: {{
      title: "Surah {name} ({name_arabic}) — {meaning}",
      description: "Read Surah {name} in English transliteration with Tajweed colour coding. {verses} verses, {revelation_type}.",
      url: `/surah/{n}/{slug}`,
      type: "article",
    }},
  }};
}}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function SurahPage({{ params }}: Props) {{
  const {{ number: num }} = await params;
  const surahNum = parseInt(num, 10);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {{/* Breadcrumb */}}
      <nav className="border-b border-border px-4 py-3 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-muted">
          <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href="/surahs" className="hover:text-accent transition-colors">Surahs</Link></li>
          <li>/</li>
          <li className="text-foreground" aria-current="page">Surah {name}</li>
        </ol>
      </nav>

      {{/* Hero */}}
      <header className="px-4 py-12 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
          Surah {ordinal(n)} of 114
        </p>
        <h1 className="font-brand text-4xl text-accent mb-2">{name_arabic}</h1>
        <h2 className="font-brand text-2xl text-foreground mb-1">Surah {name}</h2>
        <p className="text-lg text-secondary italic mb-4">{meaning}</p>
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted">
          <span>{emoji} {revelation_type} Revelation</span>
          <span>•</span>
          <span>{verses} verses</span>
          <span>•</span>
          <span>Page {starting_page}</span>
        </div>

        <div className="mt-8">
          <Link
            href="/page/{starting_page}"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 font-semibold text-[#1a1614] transition-all hover:brightness-110"
          >
            Read Surah {name} with Tajweed →
          </Link>
          <p className="mt-2 text-xs text-muted">
            Colour-coded transliteration · Page {starting_page}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-16 space-y-12">

        {{/* About */}}
        <section>
          <h3 className="font-brand text-xl text-accent mb-4">About Surah {name}</h3>
          <p className="text-secondary leading-relaxed">{description}</p>
        </section>

        {{/* Significance */}}
        <section className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-brand text-lg text-accent mb-3">Why Surah {name} is Special</h3>
          <p className="text-secondary leading-relaxed">{significance}</p>
        </section>

        {{/* Quick Facts */}}
        <section>
          <h3 className="font-brand text-xl text-accent mb-4">Quick Facts</h3>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-muted text-xs uppercase tracking-wide">Surah Number</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">{n}</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-muted text-xs uppercase tracking-wide">Verses</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">{verses}</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-muted text-xs uppercase tracking-wide">Revelation</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">{revelation_type}</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-muted text-xs uppercase tracking-wide">Meaning</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground italic">{meaning}</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4 col-span-2">
              <dt className="text-muted text-xs uppercase tracking-wide">Reading Page</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">
                <Link href="/page/{starting_page}" className="text-accent hover:underline">
                  Page {starting_page} →
                </Link>
              </dd>
            </div>
          </dl>
        </section>

        {{/* Tajweed Legend */}}
        <section>
          <h3 className="font-brand text-xl text-accent mb-4">Tajweed Colour Coding</h3>
          <p className="text-sm text-secondary mb-4">
            When reading Surah {name} at TajweedTranslit.com, these Tajweed rules are colour-coded:
          </p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
{tajweed_items}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Tap any highlighted word in the reader to see a detailed explanation of the rule.
          </p>
        </section>

        {{/* Navigation */}}
        <section className="grid grid-cols-2 gap-4">
{prev_link}
{next_link}
        </section>

      </div>
    </div>
  );
}}
"""
    return page

def generate_index():
    surahs_json = json.dumps([
        {"number": s["number"], "name": s["name"], "name_arabic": s["name_arabic"],
         "meaning": s["meaning"], "revelation_type": s["revelation_type"],
         "verses": s["verses"], "starting_page": s["starting_page"]}
        for s in SURAH_DATA
    ], indent=2)
    
    return f"""import type {{ Metadata }} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {{
  title: 'All 114 Surahs — Quran Tajweed Transliteration',
  description: 'Browse all 114 Surahs of the Holy Quran. Each Surah page includes meaning, revelation type, verse count, and a link to read with Tajweed colour-coded transliteration.',
  keywords: ['quran surahs', 'list of quran surahs', 'all surahs', 'surah index', 'quran 114 surahs'],
}};

const SURAHS = {surahs_json};

export default function SurahsIndexPage() {{
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-brand text-3xl text-accent mb-2 text-center">All 114 Surahs</h1>
        <p className="text-center text-secondary mb-8">
          Select a Surah to read in English transliteration with Tajweed colour coding.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {{SURAHS.map(s => (
            <Link
              key={{s.number}}
              href={{"/surah/" + s.number + "/" + s.name.toLowerCase().replace(/'/g,'').replace(/\\\\s+/g,'-')}}
              className="rounded-lg border border-border bg-surface p-4 hover:border-accent transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted">Surah {{s.number}}</p>
                  <p className="font-brand text-accent text-lg">{{s.name_arabic}}</p>
                  <p className="font-semibold text-foreground">{{s.name}}</p>
                  <p className="text-xs text-muted italic">{{s.meaning}}</p>
                </div>
                <span className="text-accent text-sm opacity-0 group-hover:opacity-100">→</span>
              </div>
              <div className="mt-2 flex gap-2 text-xs text-muted">
                <span>{{s.verses}} verses</span>
                <span>•</span>
                <span>{{s.revelation_type}}</span>
              </div>
            </Link>
          ))}}
        </div>
      </div>
    </div>
  );
}}
"""

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    
    for surah in SURAH_DATA:
        n = surah["number"]
        num_str = str(n).zfill(3)
        slug = slugify(surah["name"])
        out_dir = OUT_DIR / num_str / slug
        os.makedirs(out_dir, exist_ok=True)
        page_content = generate_page(surah)
        with open(out_dir / "page.tsx", "w", encoding="utf-8") as f:
            f.write(page_content)
    
    # Index page
    index_content = generate_index()
    with open(OUT_DIR / "page.tsx", "w", encoding="utf-8") as f:
        f.write(index_content)
    
    print(f"Generated {len(SURAH_DATA)} Surah pages + 1 index page")

if __name__ == "__main__":
    main()
