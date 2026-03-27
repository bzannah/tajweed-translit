/**
 * IndexNow ping script — notifies Bing, Yandex, and Naver of new/updated URLs.
 *
 * Usage:
 *   pnpm tsx scripts/indexnow-ping.ts                    # ping all high-priority URLs
 *   pnpm tsx scripts/indexnow-ping.ts /page/1 /page/2    # ping specific paths
 *
 * IndexNow is a free, open protocol for instant indexing.
 * One ping reaches all participating search engines.
 */

const SITE_URL = 'https://www.tajweedtranslit.com';
const INDEXNOW_KEY = '42b2e000a29c4806afcf107c68562b27';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

/** High-priority URLs to ping when no specific paths are given. */
function getHighPriorityUrls(): string[] {
  const urls: string[] = [
    `${SITE_URL}`,
    `${SITE_URL}/learn`,
    `${SITE_URL}/learn/tajweed-rules`,
    `${SITE_URL}/learn/tajweed-for-beginners`,
    `${SITE_URL}/learn/how-to-read-quran-in-english`,
    `${SITE_URL}/learn/surah-al-fatiha-transliteration`,
    `${SITE_URL}/learn/quran-transliteration-vs-translation`,
    `${SITE_URL}/learn/how-to-pronounce-arabic-letters`,
    `${SITE_URL}/donate`,
  ];

  // All 114 surah landing pages
  // We import the slug list inline to keep the script self-contained
  const majorSurahs = [
    'al-fatiha',
    'al-baqarah',
    'aal-imran',
    'an-nisa',
    'al-maidah',
    'al-anam',
    'al-araf',
    'al-anfal',
    'at-tawbah',
    'yunus',
    'hud',
    'yusuf',
    'ar-rad',
    'ibrahim',
    'al-hijr',
    'an-nahl',
    'al-isra',
    'al-kahf',
    'maryam',
    'ta-ha',
    'ya-sin',
    'as-saffat',
    'sad',
    'az-zumar',
    'ghafir',
    'fussilat',
    'ash-shura',
    'az-zukhruf',
    'ad-dukhan',
    'al-jathiyah',
    'al-ahqaf',
    'muhammad',
    'al-fath',
    'al-hujurat',
    'qaf',
    'ar-rahman',
    'al-waqiah',
    'al-mulk',
    'al-qalam',
    'al-haqqah',
    'nuh',
    'al-jinn',
    'al-muzzammil',
    'al-muddathir',
    'al-qiyamah',
    'al-insan',
    'an-naba',
    'an-naziat',
    'abasa',
    'at-takwir',
    'al-infitar',
    'al-mutaffifin',
    'al-inshiqaq',
    'al-buruj',
    'at-tariq',
    'al-ala',
    'al-ghashiyah',
    'al-fajr',
    'al-balad',
    'ash-shams',
    'al-lail',
    'ad-duha',
    'ash-sharh',
    'at-tin',
    'al-alaq',
    'al-qadr',
    'al-bayyinah',
    'az-zalzalah',
    'al-adiyat',
    'al-qariah',
    'at-takathur',
    'al-asr',
    'al-humazah',
    'al-fil',
    'quraish',
    'al-maun',
    'al-kawthar',
    'al-kafirun',
    'an-nasr',
    'al-masad',
    'al-ikhlas',
    'al-falaq',
    'an-nas',
  ];

  for (const slug of majorSurahs) {
    urls.push(`${SITE_URL}/surah/${slug}`);
  }

  // All 30 juz pages
  for (let j = 1; j <= 30; j++) {
    urls.push(`${SITE_URL}/juz/${j}`);
  }

  return urls;
}

async function pingIndexNow(urls: string[]) {
  console.log(`Pinging IndexNow with ${urls.length} URLs...`);

  const body = {
    host: 'www.tajweedtranslit.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (response.ok || response.status === 202) {
      console.log(`✅ IndexNow accepted ${urls.length} URLs (status ${response.status})`);
    } else {
      const text = await response.text();
      console.error(`❌ IndexNow returned ${response.status}: ${text}`);
    }
  } catch (error) {
    console.error('❌ IndexNow ping failed:', error);
  }
}

// Main
const args = process.argv.slice(2);
const urls =
  args.length > 0
    ? args.map((path) => (path.startsWith('http') ? path : `${SITE_URL}${path}`))
    : getHighPriorityUrls();

pingIndexNow(urls);
