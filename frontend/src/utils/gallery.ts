import { slugify } from './slug';

/** Expected image path for a gallery photo — drop a matching file into `public/gallery/`
 * (e.g. "Academy Graduation Day" -> `public/gallery/academy-graduation-day.jpg`) and it
 * replaces the themed placeholder panel automatically; no code changes needed. */
export function galleryImageUrl(caption: string): string {
  return `/gallery/${slugify(caption)}.jpg`;
}
