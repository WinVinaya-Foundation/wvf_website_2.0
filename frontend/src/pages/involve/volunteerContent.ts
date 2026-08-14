import type { CtaLink } from '../../model/content';

export const volunteerHero = {
  eyebrow: 'Make a Difference',
  headline: "Your Skills Can Build Someone's Career.",
  subheadline: "WinVinaya Foundation runs on the time, expertise, and energy of volunteers who believe ability shouldn't be limited by disability.",
  heroCta: { label: 'Start Volunteering', to: '#ways-to-volunteer' } satisfies CtaLink,
};

export const whyVolunteer = {
  eyebrow: 'Visible & Direct Impact',
  headline: "This isn't one-off charity. It's real, visible impact.",
  body: "Every volunteer hour at WinVinaya connects directly to something concrete — a candidate who gets interview-ready, a course that finally exists in sign language, a company that hires its first PWD employee. You're not filling a generic volunteer slot; you're closing a specific gap in someone's path to a career.",
};

export interface VolunteerCategory {
  title: string;
  description: string;
  badge: string;
}

export const waysToVolunteer = {
  headline: 'Choose where your skills fit best.',
  categories: [
    {
      title: 'Mentoring & Career Guidance',
      description: 'Mock interviews, resume reviews, and career coaching for candidates nearing placement.',
      badge: 'Mentorship',
    },
    {
      title: 'Subject Expertise & Training',
      description: 'Teach or co-teach modules in coding, Power BI, English, or soft skills.',
      badge: 'Training',
    },
    {
      title: 'Sign Language & Accessibility Support',
      description: 'Interpretation support, sign language content creation, and accessibility audits (e.g., accessible PowerPoint training).',
      badge: 'Accessibility',
    },
    {
      title: 'Corporate Volunteering',
      description: 'Team-based CSR volunteering days, sensitization workshops, and skill-building sessions for candidates.',
      badge: 'Corporate CSR',
    },
    {
      title: 'Content & Communications',
      description: 'Blog writing, newsletter contributions, social media engagement, and video storytelling.',
      badge: 'Media & Copy',
    },
    {
      title: 'Events Support',
      description: 'Helping run job fairs, sensitization workshops, and community events like Margadarshan.',
      badge: 'Events',
    },
  ] satisfies VolunteerCategory[],
};

export const pitchIdea = {
  headline: "Don't See Your Skill Listed? Bring It Anyway.",
  body: "If what you want to do isn't listed above, that's not a dead end — it's an opening. We're open to fresh ideas and new proposals. If it helps persons with disabilities and moves the mission forward, we're ready to collaborate.",
  link: { label: 'Pitch Your Idea', to: '/contact' } satisfies CtaLink,
};

export const realImpactExamples = {
  eyebrow: 'Proven Results',
  headline: 'What Volunteering Looks Like — Real Impact Examples',
  body: 'Volunteers have helped run sensitization workshops for corporate teams, supported Indian Sign Language interpretation at training sessions, and mentored candidates who went on to roles at companies like Caterpillar and ICICI Prudential. Small, specific contributions — like coaching one mock interview — have led directly to real job offers.',
};

export const howItWorks = {
  headline: 'How It Works',
  steps: [
    {
      stepNumber: '01',
      title: 'Tell Us Your Skills',
      description: 'Share your background, expertise, and availability with our team.',
    },
    {
      stepNumber: '02',
      title: 'Matched to Need',
      description: 'We align your strengths to a specific, current candidate or program need.',
    },
    {
      stepNumber: '03',
      title: 'Start Contributing',
      description: 'Make a direct impact — remote or in-person, one-time or ongoing.',
    },
  ],
};

export const corporateVolunteeringSpotlight = {
  headline: 'Bring your whole team.',
  body: 'We work with corporate teams on structured CSR volunteering — sensitization workshops, skill-building sessions, and hands-on training support — giving your employees a meaningful, hands-on way to engage with inclusion, not just a check-the-box CSR activity.',
  link: { label: 'Explore Corporate Engagement', to: '/involve/corporate-engagement' } satisfies CtaLink,
};

export const volunteerClosingCta = {
  headline: "Someone's next opportunity could start with your hour.",
  body: "Whether it's an hour or an ongoing commitment, your skills matter here.",
  ctas: [
    { label: 'Volunteer Now', to: '#ways-to-volunteer' },
    { label: 'Contact Us With Questions', to: '/contact' },
  ] satisfies CtaLink[],
};
