import { useEffect, useState } from 'react';

/**
 * Checks whether a static file actually exists (via a HEAD request) so a "View PDF" button
 * can honestly reflect reality instead of linking to something that might 404. Starts `false`
 * rather than `true` so a card never briefly looks clickable and then isn't — it can only
 * upgrade to available, never surprise-downgrade out from under a pointer.
 *
 * A plain `res.ok` isn't enough: both the Vite dev server and most static hosts serve
 * `index.html` (200 OK) for any unmatched path, to support client-side routing on refresh.
 * A missing file and a missing *route* look identical by status code alone — so this also
 * checks the response isn't HTML, since a real static asset always gets its own content-type.
 */
export function useFileExists(url: string): boolean {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') ?? '';
        if (!cancelled) setExists(res.ok && !contentType.includes('text/html'));
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return exists;
}
