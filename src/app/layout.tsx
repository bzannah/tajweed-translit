import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AppShell } from '@/components/layout/app-shell';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tajweed Translit — Quran Transliteration Reader',
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
