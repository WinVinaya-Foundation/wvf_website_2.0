interface ReadableBlock {
  text?: string;
  items?: string[];
  attribution?: string;
}

const WORDS_PER_MINUTE = 200;

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

/** Estimates minutes-to-read from rich content blocks at ~200 words/minute — kept in sync with
 * body content automatically instead of relying on a hand-typed number that can drift. */
export function estimateReadingTime(blocks: ReadableBlock[]): number {
  const wordCount = blocks.reduce((total, block) => {
    const text = block.text ? countWords(block.text) : 0;
    const items = block.items ? block.items.reduce((sum, item) => sum + countWords(item), 0) : 0;
    const attribution = block.attribution ? countWords(block.attribution) : 0;
    return total + text + items + attribution;
  }, 0);

  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
