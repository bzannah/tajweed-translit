import type { Metadata, Viewport } from 'next';
import { Amiri } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
  metadataBase: new URL('https://tajweedtranslit.com'),
  title: {
    default: 'Quran Tajweed Transliteration — Read the Quran with Tajweed',
    template: '%s | Quran Tajweed Transliteration',
  },
  description:
    'Read the complete Quran in English transliteration with colour-coded Tajweed rules. Free online Quran reader with surah navigation, bookmarks, and audio recitation.',
  keywords: [
    'quran transliteration',
    'tajweed',
    'quran in english',
    'quran reading',
    'tajweed quran',
    'quran transliteration with tajweed',
    'learn quran',
    'quran for beginners',
    'quran recitation',
    'islamic',
    'muslim',
    'surah',
    'juz',
  ],
  authors: [{ name: 'Quran Tajweed Transliteration' }],
  creator: 'Quran Tajweed Transliteration',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tajweedtranslit.com',
    siteName: 'Quran Tajweed Transliteration',
    title: 'Quran Tajweed Transliteration — Read the Quran with Tajweed',
    description:
      'Read the complete Quran in English transliteration with colour-coded Tajweed rules. Free, beautiful, and easy to use.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quran Tajweed Transliteration',
    description:
      'Read the complete Quran in English transliteration with colour-coded Tajweed rules.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://tajweedtranslit.com',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1a1614' },
    { media: '(prefers-color-scheme: light)', color: '#f5f0e8' },
  ],
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
