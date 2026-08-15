import sanitizeHtml from 'sanitize-html';

/** Strips all unsafe HTML tags, scripts, event handlers, and malicious execution vectors from input strings. */
export function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') {
    return '';
  }

  return sanitizeHtml(input.trim(), {
    allowedTags: [], // Strip all HTML tags
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
  });
}

/** Recursively cleans string properties within a request object (e.g. req.body) to prevent XSS. */
export function sanitizeObject<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    return sanitizeInput(data) as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeObject(item)) as unknown as T;
  }

  if (typeof data === 'object' && !(data instanceof Date) && !(data instanceof Buffer)) {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      cleaned[key] = sanitizeObject(value);
    }
    return cleaned as T;
  }

  return data;
}
