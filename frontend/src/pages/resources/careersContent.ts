import type { CtaLink } from '../../model/content';

export const careersHero = {
  eyebrow: 'Resources',
  headline: 'Careers',
  subheadline: 'Build a career that closes India’s employment gap, not just fills a seat on a team.',
};

export const whyWorkWithUs = {
  eyebrow: 'Why WinVinaya',
  headline: 'Work that closes a gap, not just fills a role.',
  body: "Every role here sits close to the actual outcome — a candidate placed, a workplace made more accessible, a session that shifts how a team thinks about disability. You won't find layers of process standing between your work and the people it reaches.",
  checklist: {
    intro: 'What that looks like day to day:',
    points: [
      'Small team, real ownership — no six-layer approval chain before your work ships.',
      'Direct exposure to candidates, corporate partners, and the outcomes of your work.',
      'Mentorship from a founding team with 9+ years of hands-on inclusion work.',
    ],
  },
};

export interface CareerBenefit {
  title: string;
  description: string;
}

export const careerBenefits = {
  headline: 'What You Can Expect',
  description: 'The practical parts of working here — not just the mission statement.',
  items: [
    {
      title: 'Mission-first work',
      description: 'See your work reach real candidates and partners within weeks, not buried in a roadmap.',
    },
    {
      title: 'Flexible & hybrid roles',
      description: 'Many roles are remote-friendly or hybrid — we care about the work, not the seat time.',
    },
    {
      title: 'Cross-disability collaboration',
      description: 'Work directly alongside colleagues and candidates with diverse disabilities, every day.',
    },
    {
      title: 'Growth & ownership',
      description: 'A small team means real ownership early, and mentorship from people who built this from scratch.',
    },
  ] satisfies CareerBenefit[],
};

export interface HiringStep {
  stepNumber: string;
  title: string;
  description: string;
}

export const hiringProcess = {
  headline: 'How We Hire',
  description: 'A short, honest process — not a five-round marathon.',
  steps: [
    { stepNumber: '01', title: 'Apply', description: 'Send your resume against an open role, or reach out even without one.' },
    { stepNumber: '02', title: 'Conversation', description: 'A short call to understand your background, skills, and what you are looking for.' },
    { stepNumber: '03', title: 'Working Session', description: 'A practical task or working session relevant to the actual role — not a trick question.' },
    { stepNumber: '04', title: 'Offer & Onboarding', description: 'A clear decision either way, with fast turnaround and honest feedback.' },
  ] satisfies HiringStep[],
};

export const careersClosingCta = {
  headline: "Don't see the right role yet?",
  body: "We're a growing team. Send your resume anyway, and we'll reach out when something fits.",
  ctas: [
    { label: 'Send Your Resume', to: '/contact' },
    { label: 'Contact Us', to: '/contact' },
  ] satisfies CtaLink[],
};

export type EmploymentType = 'Full-time' | 'Part-time' | 'Consultant';
export type JobStatus = 'active' | 'closed';

export interface JobOpening {
  title: string;
  employmentType: EmploymentType;
  experience: string;
  location: string;
  status: JobStatus;
}

export const jobOpenings: JobOpening[] = [
  {
    title: 'Accessibility Engineer',
    employmentType: 'Full-time',
    experience: '2–4 years',
    location: 'Bengaluru, India (Hybrid)',
    status: 'active',
  },
  {
    title: 'Corporate Engagement Associate',
    employmentType: 'Full-time',
    experience: '1–3 years',
    location: 'Bengaluru, India',
    status: 'active',
  },
  {
    title: 'Indian Sign Language Trainer',
    employmentType: 'Part-time',
    experience: '3+ years',
    location: 'Bengaluru, India',
    status: 'active',
  },
  {
    title: 'Training & Curriculum Consultant',
    employmentType: 'Consultant',
    experience: '5+ years',
    location: 'Remote',
    status: 'active',
  },
  {
    title: 'Communications & Outreach Associate',
    employmentType: 'Full-time',
    experience: '0–2 years',
    location: 'Bengaluru, India',
    status: 'closed',
  },
  {
    title: 'Talent & Placements Coordinator',
    employmentType: 'Full-time',
    experience: '2–5 years',
    location: 'Bengaluru, India',
    status: 'closed',
  },
];
