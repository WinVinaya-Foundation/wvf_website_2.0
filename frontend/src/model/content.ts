export interface CtaLink {
  label: string;
  to: string;
}

export type TimelineIconKey = 'flag' | 'school' | 'academy' | 'handshake' | 'award' | 'premium' | 'trending';

export interface TimelineItem {
  year: string;
  label: string;
  icon: TimelineIconKey;
  /** True when the date/detail is still to be confirmed — renders a muted marker plus a note, instead of stating it as fact. */
  isPlaceholder?: boolean;
}

export interface PersonEntry {
  name: string;
  role?: string;
  photo?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface AwardEntry {
  title: string;
  body: string;
  icon: TimelineIconKey;
}

export interface DocumentEntry {
  title: string;
  year?: string;
  description?: string;
}
