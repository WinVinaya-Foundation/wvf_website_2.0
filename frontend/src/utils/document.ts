import { slugify } from './slug';

/** Expected file path for a downloadable document — drop a matching PDF into
 * `public/documents/` (e.g. "Annual Report" + "2024–2025" -> `public/documents/annual-report-2024-2025.pdf`)
 * and the "View PDF" button picks it up automatically; until then the card shows "Coming soon". */
export function documentFileUrl(title: string, year?: string): string {
  const slug = slugify(year ? `${title} ${year}` : title);
  return `/documents/${slug}.pdf`;
}
