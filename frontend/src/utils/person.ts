import { slugify } from './slug';

/** Expected photo path for a team member — drop a matching file into `public/team/` (e.g.
 * "Seethalakshmi Kupuraj" -> `public/team/seethalakshmi-kupuraj.jpg`) and it's picked up
 * automatically; until then the avatar falls back to initials. */
export function personPhotoUrl(name: string): string {
  return `/team/${slugify(name)}.jpg`;
}

/** First letter of the first and last name (or first two letters for a single-word name),
 * used as the avatar fallback while a real photo hasn't been added yet. */
export function personInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
