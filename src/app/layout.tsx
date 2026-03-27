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
    default:
      'Quran Tajweed Transliteration — Free Online Quran Reader with Colour-Coded Tajweed',
    template: '%s | Quran Tajweed Transliteration',
  },
  description:
    'Read the complete Quran in English transliteration with colour-coded Tajweed rules. Free online Quran reader with 1,275 pages, surah navigation, bookmarks, audio recitation, and mobile-friendly reading.',
  keywords: [
    'quran transliteration',
    'tajweed',
    'tajweed transliteration',
    'quran transliteration with tajweed',
    'quran in english',
    'quran reading',
    'tajweed quran',
    'learn quran',
    'quran for beginners',
    'quran recitation',
    'tajweed colour coding',
    'read quran online free',
    'quran transliteration online',
    'surah transliteration',
    'juz transliteration',
    'learn tajweed',
    'tajweed rules',
    'quran pronunciation guide',
  ],
  authors: [{ name: 'Quran Tajweed Transliteration' }],
  creator: 'Quran Tajweed Transliteration',
  publisher: 'Quran Tajweed Transliteration',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tajweedtranslit.com',
    siteName: 'Quran Tajweed Transliteration',
    title:
      'Quran Tajweed Transliteration — Free Online Quran Reader with Colour-Coded Tajweed',
    description:
      'Read the complete Quran in English transliteration with colour-coded Tajweed rules. 1,275 pages, 114 surahs. Free, beautiful, and easy to use.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Quran Tajweed Transliteration — Read the Quran with colour-coded Tajweed rules',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quran Tajweed Transliteration — Free Online Quran Reader',
    description:
      'Read the complete Quran in English transliteration with colour-coded Tajweed rules. 1,275 pages. Free.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://tajweedtranslit.com',
  },
  category: 'education',
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
