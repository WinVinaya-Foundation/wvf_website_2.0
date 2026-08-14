export type VoiceAccent = 'primary' | 'secondary' | 'info';

const VOICE_ACCENTS: VoiceAccent[] = ['primary', 'secondary', 'info'];

/** Cycles through theme palette keys by index so every card gets a themed accent without
 * content authors assigning one — scales to any number of quotes. */
export function accentForIndex(index: number): VoiceAccent {
  return VOICE_ACCENTS[index % VOICE_ACCENTS.length];
}
