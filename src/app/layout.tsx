import type { Metadata } from 'next';
import { Amiri } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AppShell } from '@/components/layout/app-shell';
import './globals.css';

const amiri = Amiri({
  subsets: ['latin', 'arabic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  title: 'Quran Tajweed Transliteration — Quran Transliteration Reader',
  description:
    'Read the Quran with Tajweed colour coding and transliteration. 1,275 pages of beautifully rendered content.',
};

/**
 * Root layout for the application.
 * Provides theme context and the main app shell structure.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={amiri.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
