/** Resolves a backend-relative `/uploads/...` path (as stored on Report/GalleryPhoto records)
 * into an absolute URL pointing at the API origin. Absolute URLs pass through untouched. */
export function resolveUploadUrl(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
  const backendBase = apiBase.replace(/\/api\/?$/, '');
  return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
}
