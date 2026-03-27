/** Props for the JsonLd component. */
export interface JsonLdProps {
  /** Structured data objects to render as JSON-LD script tags. */
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Renders JSON-LD structured data as script tags in the page.
 * Accepts a single schema object or an array of schema objects.
 * Server component — renders at build time for static pages.
 */
export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
