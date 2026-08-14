/** Formats an ISO date (YYYY-MM-DD) as a locale-aware "13 Aug 2026" style string. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
}
