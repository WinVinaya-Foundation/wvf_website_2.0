import type { CtaLink } from '../../model/content';

export const signLanguageHero = {
  eyebrow: 'Get Sensitized & Learn Sign Language',
  headline: 'Awareness Is the First Step Toward Inclusion.',
  subheadline:
    "Sensitization isn't about sympathy — it's about understanding. And every sign you learn is one less barrier between you and someone else.",
  ctas: [
    { label: 'Get Sensitized', to: '#get-sensitized' },
    { label: 'Learn Sign Language', to: '#learn-sign-language' },
  ] satisfies CtaLink[],
};

export interface PathCard {
  eyebrow: string;
  headline: string;
  body: string;
  buttonText: string;
  link: string;
  ctaColor: 'secondary' | 'info';
}

export const pathSelector = {
  paths: [
    {
      eyebrow: 'Part One',
      headline: 'Get Sensitized',
      body: 'Build genuine disability awareness for your team, classroom, or community — through honest conversation, not a lecture.',
      buttonText: 'Explore Sensitization',
      link: '#get-sensitized',
      ctaColor: 'secondary',
    },
    {
      eyebrow: 'Part Two',
      headline: 'Learn Sign Language',
      body: 'Start with your first Indian Sign Language signs today — free, self-paced, and taught simply.',
      buttonText: 'Start Learning Signs',
      link: '#learn-sign-language',
      ctaColor: 'info',
    },
  ] satisfies PathCard[],
};

// ---------- Part One: Get Sensitized ----------

export const whySensitization = {
  eyebrow: 'Part One — Get Sensitized',
  headline: "Most exclusion isn't malicious. It's uninformed.",
  body: "The biggest barriers persons with disabilities face at work aren't usually hostility — they're assumptions. The belief that a visually impaired person can't code. That a Deaf colleague can't lead a meeting. Sensitization exists to replace assumption with understanding, one honest conversation at a time.",
  whoThisIsFor: {
    intro: 'Who this is for:',
    body: "Corporates preparing to hire inclusively, schools and colleges shaping the next generation's attitudes, community groups, and anyone who wants to genuinely understand disability rather than guess at it.",
    audiences: ['Corporates', 'Schools & Colleges', 'Community Groups', 'Individuals'],
  },
};

export interface SensitizationOffering {
  title: string;
  description: string;
}

export const sensitizationOfferings = {
  headline: 'What Sensitization Looks Like With Us',
  description: 'Three formats, one goal — building real understanding, not just checking a compliance box.',
  items: [
    {
      title: 'Disability Awareness Orientation',
      description: 'Foundational sessions on disability types, etiquette, and common misconceptions.',
    },
    {
      title: 'Disability Sensitization Workshops',
      description: 'Activity-based sessions designed to build empathy through experience, not just information.',
    },
    {
      title: 'Corporate & Institutional Sessions',
      description: 'Delivered for corporates, NGOs, educational institutions, and community groups.',
    },
  ] satisfies SensitizationOffering[],
};

export const sensitizationImpact = {
  eyebrow: 'Real Impact',
  headline: 'Sessions like this are shared experiences, not lectures.',
  body: 'At Athma Sakthi Vidyalaya in Bengaluru, our team ran a sensitization session using movement, breathing exercises, and simple sign language — helping participants and trainers alike relax, connect, and understand each other differently.',
  location: 'Athma Sakthi Vidyalaya, Bengaluru',
};

// ---------- Part Two: Learn Sign Language ----------

export const learnSignLanguageIntro = {
  eyebrow: 'Part Two — Learn Sign Language',
  headline: 'Learn to Say "Good Morning" — In a Language That Opens Doors.',
  subheadline: 'Basic Indian Sign Language, taught simply, so communication is never the barrier between you and someone else.',
  body: "India has over 400 educational institutions for the Deaf, yet nearly 95% lack qualified sign language instructors. That gap doesn't just affect classrooms — it affects everyday communication, workplaces, and belonging. Every person who learns even basic signs helps close that gap, one conversation at a time.",
  stat: {
    value: '95%',
    label: 'of 400+ Deaf education institutions in India lack a qualified sign language instructor',
  },
  sourceLink: { label: "Read Anoop's Story", to: '/impact/success-stories' } satisfies CtaLink,
};

export const startWithBasics = {
  eyebrow: 'Start Today',
  headline: 'You can learn your first signs right now.',
  body: 'Begin with the alphabet, everyday greetings — Good Morning, Good Evening, Good Night — and common phrases like "How are you?" and "Where are you from?" Each comes with a short video demonstration you can follow along with immediately.',
  example: {
    label: 'Try it: "Good Morning"',
    steps: ['Thumbs up means good.', 'Then open your hand and imitate a flower blooming — representing morning.'],
  },
};

export interface VideoLessonCategory {
  title: string;
  description: string;
}

export const videoLessons = {
  headline: 'Video Lessons',
  description: "We're building a short, self-paced video library, organized by topic. Here's what's coming:",
  categories: [
    { title: 'Alphabet', description: 'The Indian Sign Language alphabet, one letter at a time.' },
    { title: 'Greetings', description: 'Good Morning, Good Evening, Good Night, and more.' },
    { title: 'Common Phrases', description: '"How are you?", "Where are you from?", and everyday essentials.' },
    { title: 'Everyday Conversation', description: 'Stringing signs together for real, flowing conversation.' },
  ] satisfies VideoLessonCategory[],
  comingSoonNote: "New video modules are recorded and added here regularly — check back soon, or contact us to be notified when they're live.",
};

export const learningJourney = {
  eyebrow: "One Person's Learning Journey",
  quote:
    'I encourage you to see the video and give it a try... What a wonderful expression! I hope you can try learning it now, just like I learned by myself.',
  author: 'A WinVinaya Trainer',
  role: 'Learned sign language through this very page before joining the team',
};

export const beyondBasics = {
  headline: 'Beyond the Basics',
  body: 'Basic signs are a starting point, not the finish line. For deeper fluency, our Fundamentals of Indian Sign Language Orientation goes further — ideal for corporate teams, educators, or anyone working closely with the Deaf community.',
  link: { label: 'Request Full Sign Language Training', to: '/involve/corporate-engagement' } satisfies CtaLink,
};

export const signLanguageClosingCta = {
  headline: 'Understanding starts with showing up.',
  body: 'Bring your team, your classroom, or your community in for a session — or start learning your first signs today. No cost, no sign-up required.',
  ctas: [
    { label: 'Request a Sensitization Session', to: '/contact' },
    { label: 'Start Learning Now', to: '#learn-sign-language' },
    { label: 'Contact Us', to: '/contact' },
  ] satisfies CtaLink[],
};
