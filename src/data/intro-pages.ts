import introData from '../../content/data/intro-pages.json';

interface IntroPages {
  pages: number[];
  title: string;
  description: string;
}

/** Intro/Tajweed guide page data (pages 1-4). */
export const introPages: IntroPages = introData as IntroPages;

/**
 * Checks whether a page is an intro/Tajweed guide page.
 * @param page - The page number to check
 * @returns True if the page is an intro page (1-4)
 */
export function isIntroPage(page: number): boolean {
  return introPages.pages.includes(page);
}
