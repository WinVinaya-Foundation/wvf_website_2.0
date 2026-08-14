export function getYouTubeThumbnail(url: string, quality: 'maxres' | 'hq' = 'maxres'): string | null {
  const match = url.match(/embed\/([^?]+)/);
  if (!match) return null;
  const id = match[1];
  return `https://img.youtube.com/vi/${id}/${quality === 'maxres' ? 'maxresdefault' : 'hqdefault'}.jpg`;
}
