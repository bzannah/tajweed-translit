import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support — Quran Tajweed Transliteration',
  description:
    "Help us keep Quran Tajweed Transliteration free and build new features including ayah-by-ayah audio and a children's learning platform. Every donation is Sadaqah Jariyah.",
};

const features = [
  {
    icon: '🎧',
    title: 'Ayah-by-Ayah Audio',
    description:
      'Listen to each verse individually with a choice of renowned Qaris, synchronised with the text as you read.',
  },
  {
    icon: '👶',
    title: "Children's Learning Platform",
    description:
      'An interactive, age-appropriate Quran learning experience designed specifically for young Muslims.',
  },
  {
    icon: '🌍',
    title: 'Free Forever, For Everyone',
    description:
      'No ads. No subscriptions. No barriers. Just the Quran, accessible to all.',
  },
];

/**
 * Donation page with Stripe Payment Link.
 * No backend code needed — Stripe hosts the payment page externally.
 */
export default function DonatePage() {
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="mx-auto max-w-[700px] px-5 pb-10 pt-10">
        {/* Back to reading */}
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          ← Back to Reading
        </Link>

        {/* Hero */}
        <div className="mt-8 text-center">
          <h1 className="font-brand text-[28px] leading-tight text-accent">
            Help Us Bring the Quran to Every Home
          </h1>
          <p className="mt-3 text-base text-secondary">
            Quran Tajweed Transliteration is free, ad-free, and community-funded.
          </p>
        </div>

        {/* Vision */}
        <div className="mt-10">
          <p className="text-[15px] leading-relaxed text-secondary">
            We&apos;re on a mission to make Quran recitation accessible to every
            Muslim, regardless of whether they can read Arabic. This
            transliteration reader with Tajweed colour coding is just the
            beginning. Here&apos;s what we&apos;re building next:
          </p>

          {/* Feature cards */}
          <div className="mt-6 space-y-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-lg border border-border bg-surface p-4"
                style={{ borderLeft: '3px solid rgba(212,168,83,0.5)' }}
              >
                <span className="flex-shrink-0 text-2xl" aria-hidden="true">
                  {f.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-primary">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-secondary">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sadaqah Jariyah */}
        <div
          className="mt-10 rounded-lg p-4 px-5"
          style={{
            background: 'rgba(212,168,83,0.08)',
            borderLeft: '3px solid #d4a853',
          }}
        >
          <p className="font-brand text-[15px] italic leading-relaxed text-secondary">
            Every donation is Sadaqah Jariyah — ongoing charity. When someone
            learns to recite the Quran through this tool, you share in the
            reward, inshaAllah.
          </p>
        </div>

        {/* Donate button */}
        <div className="mt-10 flex flex-col items-center">
          <a
            href="https://buy.stripe.com/bJe00j9VPd8ObkEcxX4c800"
            target="_blank"
            rel="noopener noreferrer"
            className="font-brand inline-block w-full max-w-[400px] rounded-[10px] bg-accent px-8 py-4 text-center text-base font-semibold text-[#1a1614] transition-all duration-150 hover:brightness-110"
            style={{ boxShadow: '0 4px 15px rgba(212,168,83,0.3)' }}
          >
            Donate Now
          </a>
          <p className="mt-3 text-center text-xs text-muted">
            Secure payment via Stripe — Visa, Mastercard, Apple Pay, Google Pay
            accepted
          </p>
          <p className="mt-1 text-center text-[11px] text-muted">
            Any amount, however small, makes a difference.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted">
            JazakAllahu Khairan — May Allah reward you with goodness.
          </p>
          <Link
            href="/"
            className="mt-3 inline-block text-sm text-muted transition-colors hover:text-accent"
          >
            ← Return to Reading
          </Link>
        </div>
      </div>
    </div>
  );
}
