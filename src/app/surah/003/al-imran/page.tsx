import type { Metadata } from 'next';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ number: string; slug: string };
}

// ── Static Params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return [{ number: "003", slug: "al-imran" }];
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata {
  const { number: _numIgnored } = await params;
  return {
    title: "Surah Al-Imran (آل عمران) — The Family of Imran | TajweedTranslit",
    description: "Read Surah Al-Imran (The Family of Imran) — 200 verses, Medinan revelation. English transliteration with expert Tajweed colour coding. Free online reader.",
    keywords: [
      "Surah Al-Imran transliteration",
      "Surah 3 tajweed",
      "Al-Imran meaning",
      "Quran al-imran transliteration",
      "learn quran al-imran",
      "quran recitation al-imran",
      "tajweed al-imran",
    ],
    alternates: { canonical: `/surah/3/al-imran` },
    openGraph: {
      title: "Surah Al-Imran (آل عمران) — The Family of Imran",
      description: "Read Surah Al-Imran in English transliteration with Tajweed colour coding. 200 verses, Medinan.",
      url: `/surah/3/al-imran`,
      type: "article",
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function SurahPage({ params }: Props) {
  const { number: num } = await params;

  return (
    <div className="min-h-screen bg-background text-foreground"

      {/* Breadcrumb */}
      <nav className="border-b border-border px-4 py-3 text-sm" aria-label="Breadcrumb"
        <ol className="flex items-center gap-2 text-muted"
          <li<Link href="/" className="hover:text-accent transition-colors"Home</Link</li
          <li/</li
          <li<Link href="/surahs" className="hover:text-accent transition-colors"Surahs</Link</li
          <li/</li
          <li className="text-foreground" aria-current="page"Surah Al-Imran</li
        </ol
      </nav

      {/* Hero */}
      <header className="px-4 py-12 text-center"
        <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3"
          Surah 3rd of 114
        </p
        <h1 className="font-brand text-4xl text-accent mb-2"آل عمران</h1
        <h2 className="font-brand text-2xl text-foreground mb-1"Surah Al-Imran</h2
        <p className="text-lg text-secondary italic mb-4"The Family of Imran</p
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted"
          <span🏙️ Medinan Revelation</span
          <span•</span
          <span200 verses</span
          <span•</span
          <spanPage 103</span
        </div

        <div className="mt-8"
          <Link
            href="/page/103"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 font-semibold text-[#1a1614] transition-all hover:brightness-110"
          
            Read Surah Al-Imran with Tajweed →
          </Link
          <p className="mt-2 text-xs text-muted"
            Colour-coded transliteration · Page 103
          </p
        </div
      </header

      <div className="mx-auto max-w-4xl px-4 pb-16 space-y-12"

        {/* About */}
        <section
          <h3 className="font-brand text-xl text-accent mb-4"About Surah Al-Imran</h3
          <p className="text-secondary leading-relaxed"Named after the family of Imran, this Surah emphasizes faith, monotheism, and the stories of Maryam and Isa (Jesus).</p
        </section

        {/* Significance */}
        <section className="rounded-xl border border-border bg-surface p-6"
          <h3 className="font-brand text-lg text-accent mb-3"Why Surah Al-Imran is Special</h3
          <p className="text-secondary leading-relaxed"Contains the verse of mubasharat — the three groups promised a special rank in Paradise.</p
        </section

        {/* Quick Facts */}
        <section
          <h3 className="font-brand text-xl text-accent mb-4"Quick Facts</h3
          <dl className="grid grid-cols-2 gap-4 text-sm"
            <div className="rounded-lg border border-border bg-surface p-4"
              <dt className="text-muted text-xs uppercase tracking-wide"Surah Number</dt
              <dd className="mt-1 text-lg font-semibold text-foreground"3</dd
            </div
            <div className="rounded-lg border border-border bg-surface p-4"
              <dt className="text-muted text-xs uppercase tracking-wide"Verses</dt
              <dd className="mt-1 text-lg font-semibold text-foreground"200</dd
            </div
            <div className="rounded-lg border border-border bg-surface p-4"
              <dt className="text-muted text-xs uppercase tracking-wide"Revelation</dt
              <dd className="mt-1 text-lg font-semibold text-foreground"Medinan</dd
            </div
            <div className="rounded-lg border border-border bg-surface p-4"
              <dt className="text-muted text-xs uppercase tracking-wide"Meaning</dt
              <dd className="mt-1 text-lg font-semibold text-foreground italic"The Family of Imran</dd
            </div
            <div className="rounded-lg border border-border bg-surface p-4 col-span-2"
              <dt className="text-muted text-xs uppercase tracking-wide"Reading Page</dt
              <dd className="mt-1 text-lg font-semibold text-foreground"
                <Link href="/page/103" className="text-accent hover:underline"
                  Page 103 →
                </Link
              </dd
            </div
          </dl
        </section

        {/* Tajweed Legend */}
        <section
          <h3 className="font-brand text-xl text-accent mb-4"Tajweed Colour Coding</h3
          <p className="text-sm text-secondary mb-4"
            When reading Surah Al-Imran at TajweedTranslit.com, these Tajweed rules are colour-coded:
          </p
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        <li class="flex items-center gap-2"
          <span class="inline-block h-3 w-3 rounded-full" style="background:#FF0000"</span
          <span class="text-sm"Necessary Prolongation</span
          <span class="text-xs text-muted"(المد اللازم)</span
        </li
        <li class="flex items-center gap-2"
          <span class="inline-block h-3 w-3 rounded-full" style="background:#8B0000"</span
          <span class="text-sm"Obligatory Prolongation</span
          <span class="text-xs text-muted"(المد الواجب المتصل)</span
        </li
        <li class="flex items-center gap-2"
          <span class="inline-block h-3 w-3 rounded-full" style="background:#FF8C00"</span
          <span class="text-sm"Permissible Prolongation</span
          <span class="text-xs text-muted"(المد الجائز المنفصل)</span
        </li
        <li class="flex items-center gap-2"
          <span class="inline-block h-3 w-3 rounded-full" style="background:#00AA00"</span
          <span class="text-sm"Nasalisation (Ghunnah)</span
          <span class="text-xs text-muted"(الغنة)</span
        </li
        <li class="flex items-center gap-2"
          <span class="inline-block h-3 w-3 rounded-full" style="background:#0066CC"</span
          <span class="text-sm"Emphatic Pronunciation</span
          <span class="text-xs text-muted"(التفخيم)</span
        </li
        <li class="flex items-center gap-2"
          <span class="inline-block h-3 w-3 rounded-full" style="background:#808080"</span
          <span class="text-sm"Silent Letters</span
          <span class="text-xs text-muted"(الحروف غير الملفوظة)</span
        </li
        <li class="flex items-center gap-2"
          <span class="inline-block h-3 w-3 rounded-full" style="background:#4B0082"</span
          <span class="text-sm"Echoing Sound (Qalqalah)</span
          <span class="text-xs text-muted"(القلقلة)</span
        </li
        <li class="flex items-center gap-2"
          <span class="inline-block h-3 w-3 rounded-full" style="background:#000000"</span
          <span class="text-sm"Normal Prolongation</span
          <span class="text-xs text-muted"(المد الطبيعي)</span
        </li
          </ul
          <p className="mt-4 text-xs text-muted"
            Tap any highlighted word in the reader to see a detailed explanation of the rule.
          </p
        </section

        {/* Navigation */}
        <section className="grid grid-cols-2 gap-4"
          <Link href="/surah/2/al-baqara" className="rounded-lg border border-border bg-surface p-4 text-center hover:border-accent transition-colors"
            <span className="text-xs text-muted"← Previous</span
            <p className="mt-1 font-semibold text-foreground"Surah Al-Baqara</p
          </Link
          <Link href="/surah/4/an-nisa" className="rounded-lg border border-border bg-surface p-4 text-center hover:border-accent transition-colors"
            <span className="text-xs text-muted"Next →</span
            <p className="mt-1 font-semibold text-foreground"Surah An-Nisa</p
          </Link
        </section

      </div
    </div
  );
}
