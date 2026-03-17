import { QURAN_API_BASE, DEFAULT_RECITER } from './constants';

/**
 * Fetches the audio URL for an entire surah from Al Quran Cloud API.
 * @param surahNumber - Surah number (1-114)
 * @param reciter - Reciter identifier (default: 'ar.alafasy')
 * @returns Audio file URL string
 */
export function getSurahAudioUrl(
  surahNumber: number,
  reciter: string = DEFAULT_RECITER
): string {
  return `${QURAN_API_BASE}/surah/${surahNumber}/${reciter}`;
}

/**
 * Fetches audio data for a specific verse range.
 * @param surahNumber - Surah number (1-114)
 * @param startVerse - Starting verse number
 * @param endVerse - Ending verse number
 * @param reciter - Reciter identifier
 * @returns Promise resolving to an array of audio URLs
 */
export async function getVerseAudioUrls(
  surahNumber: number,
  startVerse: number,
  endVerse: number,
  reciter: string = DEFAULT_RECITER
): Promise<string[]> {
  const urls: string[] = [];

  for (let verse = startVerse; verse <= endVerse; verse++) {
    try {
      const response = await fetch(
        `${QURAN_API_BASE}/ayah/${surahNumber}:${verse}/${reciter}`
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      if (data?.data?.audio) {
        urls.push(data.data.audio as string);
      }
    } catch (error) {
      console.error(
        `Failed to fetch audio for ${surahNumber}:${verse}`,
        error
      );
    }
  }

  return urls;
}

/**
 * Fetches the audio URL for a single verse.
 * @param surahNumber - Surah number (1-114)
 * @param verseNumber - Verse number
 * @param reciter - Reciter identifier
 * @returns Promise resolving to the audio URL string, or null on failure
 */
export async function getSingleVerseAudioUrl(
  surahNumber: number,
  verseNumber: number,
  reciter: string = DEFAULT_RECITER
): Promise<string | null> {
  try {
    const response = await fetch(
      `${QURAN_API_BASE}/ayah/${surahNumber}:${verseNumber}/${reciter}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    return (data?.data?.audio as string) ?? null;
  } catch {
    return null;
  }
}
