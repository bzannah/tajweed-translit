import type { Metadata } from 'next';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ number: string; slug: string }>;
}

// ── Static Params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return [{ number: '071', slug: 'nuh' }];
}

// ── Metadata ───────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number: num } = await params;
  return {
    title: 'Surah Nuh (نوح) — Noah | TajweedTranslit',
    description: 'Read Surah Nuh (Noah) — 52 verses, Meccan revelation. English transliteration with expert Tajweed colour coding. Free online reader.',
    keywords: [
      'Surah Nuh transliteration',
      'Surah 71 tajweed',
      'Nuh meaning',
      'Quran nuh transliteration',
      'learn quran nuh',
      'quran recitation nuh',
      'tajweed nuh',
    ],
    alternates: { canonical: '/surah/71/nuh' },
    openGraph: {
      title: 'Surah Nuh (نوح) — Noah',
      description: 'Read Surah Nuh in English transliteration with Tajweed colour coding. 52 verses, Meccan.',
      url: '/surah/71/nuh',
      type: 'article',
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function SurahPage({ params }: Props) {
  const { number: num } = await params;
  const surahNum = parseInt(num, 10);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Breadcrumb */}
      <nav className="border-b border-border px-4 py-3 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-muted">
          <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href="/surahs" className="hover:text-accent transition-colors">Surahs</Link></li>
          <li>/</li>
          <li className="text-foreground" aria-current="page">Surah Nuh</li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="px-4 py-12 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
          Surah 71th of 114
        </p>
        <h1 className="font-brand text-4xl text-accent mb-2">نوح</h1>
        <h2 className="font-brand text-2xl text-foreground mb-1">Surah Nuh</h2>
        <p className="text-lg text-secondary italic mb-4">Noah</p>
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted">
          <span>🏔️ Meccan Revelation</span>
          <span>•</span>
          <span>52 verses</span>
          <span>•</span>
          <span>Page 1143</span>
        </div>

        <div className="mt-8">
          <Link
            href="/page/1143"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 font-semibold text-[#1a1614] transition-all hover:brightness-110"
          >
            Read Surah Nuh with Tajweed →
          </Link>
          <p className="mt-2 text-xs text-muted">
            Colour-coded transliteration · Page 1143
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-16 space-y-12">

        {/* About */}
        <section>
          <h3 className="font-brand text-xl text-accent mb-4">About Surah Nuh</h3>
          <p className="text-secondary leading-relaxed">Recounts the prophet Nuh's 950 years of calling his people to worship Allah alone.</p>
        </section>

        {/* Significance */}
        <section className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-brand text-lg text-accent mb-3">Why Surah Nuh is Special</h3>
          <p className="text-secondary leading-relaxed">Contains the dua of Nuh: "My Lord, forgive me and my parents."</p>
        </section>

        {/* Quick Facts */}
        <section>
          <h3 className="font-brand text-xl text-accent mb-4">Quick Facts</h3>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-muted text-xs uppercase tracking-wide">Surah Number</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">71</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-muted text-xs uppercase tracking-wide">Verses</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">52</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-muted text-xs uppercase tracking-wide">Revelation</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">Meccan</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <dt className="text-muted text-xs uppercase tracking-wide">Meaning</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground italic">Noah</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4 col-span-2">
              <dt className="text-muted text-xs uppercase tracking-wide">Reading Page</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">
                <Link href="/page/1143" className="text-accent hover:underline">
                  Page 1143 →
                </Link>
              </dd>
            </div>
          </dl>
        </section>

        {/* Tajweed Legend */}
        <section>
          <h3 className="font-brand text-xl text-accent mb-4">Tajweed Colour Coding</h3>
          <p className="text-sm text-secondary mb-4">
            When reading Surah Nuh at TajweedTranslit.com, these Tajweed rules are colour-coded:
          </p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <li class="flex items-center gap-2">
        <span class="inline-block h-3 w-3 rounded-full" style="background:#FF0000"></span>
        <span class="text-sm">Necessary Prolongation</span>
        <span class="text-xs text-muted">(المد اللازم)</span>
      </li>
      <li class="flex items-center gap-2">
        <span class="inline-block h-3 w-3 rounded-full" style="background:#8B0000"></span>
        <span class="text-sm">Obligatory Prolongation</span>
        <span class="text-xs text-muted">(المد الواجب المتصل)</span>
      </li>
      <li class="flex items-center gap-2">
        <span class="inline-block h-3 w-3 rounded-full" style="background:#FF8C00"></span>
        <span class="text-sm">Permissible Prolongation</span>
        <span class="text-xs text-muted">(المد الجائز المنفصل)</span>
      </li>
      <li class="flex items-center gap-2">
        <span class="inline-block h-3 w-3 rounded-full" style="background:#00AA00"></span>
        <span class="text-sm">Nasalisation (Ghunnah)</span>
        <span class="text-xs text-muted">(الغنة)</span>
      </li>
      <li class="flex items-center gap-2">
        <span class="inline-block h-3 w-3 rounded-full" style="background:#0066CC"></span>
        <span class="text-sm">Emphatic Pronunciation</span>
        <span class="text-xs text-muted">(التفخيم)</span>
      </li>
      <li class="flex items-center gap-2">
        <span class="inline-block h-3 w-3 rounded-full" style="background:#808080"></span>
        <span class="text-sm">Silent Letters</span>
        <span class="text-xs text-muted">(الحروف غير الملفوظة)</span>
      </li>
      <li class="flex items-center gap-2">
        <span class="inline-block h-3 w-3 rounded-full" style="background:#4B0082"></span>
        <span class="text-sm">Echoing Sound (Qalqalah)</span>
        <span class="text-xs text-muted">(القلقلة)</span>
      </li>
      <li class="flex items-center gap-2">
        <span class="inline-block h-3 w-3 rounded-full" style="background:#000000"></span>
        <span class="text-sm">Normal Prolongation</span>
        <span class="text-xs text-muted">(المد الطبيعي)</span>
      </li>
          </ul>
          <p className="mt-4 text-xs text-muted">
            Tap any highlighted word in the reader to see a detailed explanation of the rule.
          </p>
        </section>

        {/* Navigation */}
        <section className="grid grid-cols-2 gap-4">
          <Link href={"/surah/70/" + "al-maarij"} className="rounded-lg border border-border bg-surface p-4 text-center hover:border-accent transition-colors">
            <span className="text-xs text-muted">← Previous</span>
            <p className="mt-1 font-semibold text-foreground">Surah Al-Ma'arij</p>
          </Link>
          <Link href={"/surah/72/" + "al-jinn"} className="rounded-lg border border-border bg-surface p-4 text-center hover:border-accent transition-colors">
            <span className="text-xs text-muted">Next →</span>
            <p className="mt-1 font-semibold text-foreground">Surah Al-Jinn</p>
          </Link>
        </section>

      </div>
    </div>
  );
}
