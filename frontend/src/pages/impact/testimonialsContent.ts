import type { CtaLink } from '../../model/content';

export const voicesHero = {
  headline: 'Voices of Change.',
  subheadline: 'Real words from candidates, employers, and partners whose lives and workplaces WinVinaya has touched.',
};

export type VoiceCategory = 'candidate' | 'corporate' | 'institutional';

export interface VoiceFilterOption {
  key: VoiceCategory | 'all';
  label: string;
}

export const voiceFilters: VoiceFilterOption[] = [
  { key: 'all', label: 'All' },
  { key: 'candidate', label: 'Candidates' },
  { key: 'corporate', label: 'Corporate Partners' },
  { key: 'institutional', label: 'Institutional Partners' },
];

export interface CandidateVoice {
  quote: string;
  name: string;
  role: string;
  disability?: string;
}

// Add new candidate quotes here — the masonry grid scales to any number of cards.
export const candidateVoices: CandidateVoice[] = [
  {
    quote:
      'They trained me in Java, SQL and Soft Skills. I later got placed in Caterpillar as an Associate Engineer. They are working for a great cause in society.',
    name: 'Harikumar',
    role: 'QA-Automation Engineer, Caterpillar-Randstad',
    disability: 'Visual Impairment',
  },
  {
    quote:
      'My English was also not good, but they helped me improve my speaking skills and prepare for interviews. After some effort, I was placed in an internship with Allstate.',
    name: 'Priyanka Kumari',
    role: 'Associate, Mindtree Limited',
    disability: 'Cerebral Palsy',
  },
  {
    quote:
      'Today was my induction into ICICI Prudential, and no words would suffice to explain how much I am indebted to all of you. Thank you Shiva Sir and Akila Madam — you are the pillars of this organization.',
    name: 'Kartik Vurukonda',
    role: 'Inductee, ICICI Prudential',
  },
];

export interface PartnerVoice {
  quote: string;
  name: string;
  title?: string;
}

// Add new corporate quotes here — the list scales to any number of entries.
export const corporatePartnerVoices: PartnerVoice[] = [
  {
    quote:
      'I want to thank you and your whole team for your tireless effort and patience helping us onboard two talented candidates. The support from interview through onboarding was fantastic and spot on.',
    name: 'Corporate Hiring Partner',
  },
  {
    quote:
      "They don't just do social work — they develop some of the best talent and build real careers for differently-abled people. People from Shiva's organization continue working for us and deliver equal to or more than an abled person.",
    name: 'Corporate Partner',
  },
];

// Add new institutional/training partner quotes here — the list scales to any number of entries.
export const institutionalPartnerVoices: PartnerVoice[] = [
  {
    quote:
      'Chippersage has been associated with WinVinaya helping differently-abled candidates develop fluency in communicative English. Our team members rejoice whenever their mentees receive job offers.',
    name: 'Chippersage',
    title: 'English Training Partner',
  },
];

export const videoTeaser = {
  headline: 'Hear it directly from them.',
  body: 'Some stories are best heard, not read.',
  link: { label: 'Watch Success Stories', to: '/impact/success-stories' } satisfies CtaLink,
};

export const voicesClosingCta = {
  headline: 'Your support writes the next testimonial.',
  body: 'Every quote on this page started with someone believing a career was possible.',
  ctas: [
    { label: 'Donate Now', to: '/donate' },
    { label: 'Volunteer With Us', to: '/involve/volunteer' },
  ] satisfies CtaLink[],
};
