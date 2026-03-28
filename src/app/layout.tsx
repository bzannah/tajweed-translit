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
  metadataBase: new URL('https://www.tajweedtranslit.com'),
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
    'learn tajweed online free',
    'tajweed rules',
    'tajweed colour chart',
    'quran pronunciation guide',
    'arabic pronunciation quran',
    'surah fatiha transliteration',
    'how to read quran in english',
    'quran transliteration vs translation',
    'quran for non arabic speakers',
    'colour coded quran',
    'quran with tajweed online',
  ],
  authors: [{ name: 'Quran Tajweed Transliteration' }],
  creator: 'Quran Tajweed Transliteration',
  publisher: 'Quran Tajweed Transliteration',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tajweedtranslit.com',
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
    canonical: 'https://www.tajweedtranslit.com',
  },
  category: 'education',
  verification: {
    google: 'y3qMYlqCEaJFZIFrGliTDFWatMf2Z_BBcEv3mtAi_bU',
    other: {
      'msvalidate.01': 'D1D3FE61770FB7632511AB2FA2A64FC2',
    },
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
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://api.alquran.cloud" />
        <link rel="dns-prefetch" href="https://api.alquran.cloud" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
      </head>
      <body>
        {/* Skip-to-content link for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
