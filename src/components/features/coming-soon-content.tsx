const STRIPE_URL = 'https://buy.stripe.com/bJe00j9VPd8ObkEcxX4c800';

/**
 * Shared "Coming Soon" placeholder for feature panels awaiting Ayah-level data.
 * Displays a warm, dignified message with a link to support the project.
 */
export function ComingSoonContent() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ padding: '24px' }}
    >
      <span className="text-4xl" aria-hidden="true">
        🕌
      </span>

      <h3
        className="font-brand text-accent mt-4"
        style={{ fontSize: '18px' }}
      >
        Coming Soon, InshaAllah
      </h3>

      <p
        className="mt-3 text-secondary"
        style={{ fontSize: '14px', maxWidth: '320px', lineHeight: '1.6' }}
      >
        We&apos;re carefully mapping every Ayah across all 1,275 pages to bring
        you accurate Ayah-by-Ayah audio, translation, and Tajweed explanation.
        This takes time — and your support makes it possible.
      </p>

      <a
        href={STRIPE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 font-medium text-accent transition-colors hover:underline"
        style={{ fontSize: '14px' }}
      >
        Support This Project →
      </a>

      <p className="mt-3 text-muted" style={{ fontSize: '11px' }}>
        JazakAllahu Khairan
      </p>
    </div>
  );
}
