export type StoryAccent = 'primary' | 'secondary' | 'info';

const STORY_ACCENTS: StoryAccent[] = ['primary', 'secondary', 'info'];

/** Cycles through theme palette keys by index so every story gets a themed accent color
 * without content authors having to assign one — scales to any number of stories. */
export function accentForIndex(index: number): StoryAccent {
  return STORY_ACCENTS[index % STORY_ACCENTS.length];
}
