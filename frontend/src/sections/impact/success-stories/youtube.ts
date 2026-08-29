export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/|shorts\/)([^#&?]+)/);
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(url: string, quality: 'maxres' | 'hq' = 'maxres'): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/${quality === 'maxres' ? 'maxresdefault' : 'hqdefault'}.jpg`;
}

export function getYouTubeEmbedUrl(url: string): string {
  const id = extractYouTubeId(url);
  if (!id) return url;
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}

