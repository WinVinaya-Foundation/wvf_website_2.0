import type { CtaLink } from '../../model/content';

export const corporateHero = {
  eyebrow: 'Corporate Engagement & D&I Services',
  headline: "Inclusion Isn't Just Good Ethics. It's Good Business.",
  subheadline:
    'Partner with WinVinaya Foundation to build genuinely inclusive hiring pipelines, meet CSR goals, and access skilled, job-ready talent your competitors are overlooking.',
  heroCta: { label: 'Start a Partnership', to: '/contact' } satisfies CtaLink,
};

export const businessCase = {
  eyebrow: 'The Business Case for Inclusion',
  headline: "You're not just doing good. You're missing out if you don't.",
  body: "India has over 20 million persons with disabilities, yet private-sector employment of PWDs sits at just 0.36%. That's not a talent shortage — it's an overlooked talent pool. Companies that build real inclusive pipelines gain skilled employees with strong retention, fresh problem-solving perspectives, and a workforce that reflects the customers they serve.",
  stats: [
    { value: '0.36%', label: 'Private-sector PWD employment in India today' },
    { value: '20M+', label: 'Skilled, job-ready candidates going overlooked' },
  ],
};

export const whatWeHelp = {
  eyebrow: 'Tailored Partnerships',
  headline: 'A partnership built around your goals, not a one-size template.',
  body: 'We connect with companies, help you understand persons with disabilities and their skillsets, and directly assist in recruiting PWD candidates.',
  placementIntro: 'Our candidates have been placed at:',
  companies: ['JPMorgan Chase', 'Societe Generale Global Solution Center', 'Wipro', 'HP', 'Dell', 'NetApp'],
};

export interface CorporateService {
  title: string;
  description: string;
}

export const services = {
  headline: 'Our Services',
  description: 'From leadership orientation to candidate placement — everything you need to build a genuinely inclusive workplace.',
  items: [
    {
      title: 'Disability Awareness Orientation',
      description: 'Foundational understanding for teams and leadership.',
    },
    {
      title: 'Disability Sensitization Workshops',
      description: 'Deeper, activity-based sessions to shift mindsets, not just share facts.',
    },
    {
      title: 'Indian Sign Language Orientation',
      description: 'Fundamentals training for teams working alongside Deaf colleagues.',
    },
    {
      title: 'Sign Language Interpretation Support',
      description: 'On-demand interpretation for meetings, training, and events.',
    },
    {
      title: 'Corporate Volunteering Programs',
      description: 'Activity-specific orientation and sensitization for employees who want to contribute hands-on.',
    },
    {
      title: 'Candidate Sourcing & Skill Assessment',
      description: 'Free skill assessment and placement assistance matched to your actual open roles.',
    },
  ] satisfies CorporateService[],
};

export const csrCompliance = {
  eyebrow: 'CSR & Compliance Alignment',
  headline: 'A CSR partner you can put on paper.',
  body: 'WinVinaya Foundation holds CSR-1 registration with the Ministry of Corporate Affairs, making us a fully eligible implementing partner under the Companies Act. Partnering with us satisfies CSR obligations while creating real, measurable social impact — not just a line item.',
  documentTitle: 'MCA CSR-1 Registered',
  linkText: 'View Our Approvals & Certifications',
  to: '/impact/certifications',
};

export const provenResults = {
  eyebrow: 'Proven Results',
  headline: 'Careers, not just placements.',
  statHighlight: '5x',
  statDescription:
    'Some of our candidates now earn up to 5x the industry-average salary for persons with disabilities, working in Fortune 500 companies through initiatives like SAMEIP.',
  quote: {
    text: "They don't just do social work — they develop some of the best talent and build real careers for differently-abled people. People from Shiva's organization continue working for us and deliver equal to or more than an abled person.",
    author: 'Corporate Hiring Partner',
  },
  linkText: 'See Our Performance Reports',
  to: '/impact/performance-reports',
};

export const howPartnershipWorks = {
  headline: 'How Partnership Works',
  description: 'A simple, four-step path from first conversation to a fully integrated hire.',
  steps: [
    {
      stepNumber: '01',
      title: 'Initial Consultation',
      description: 'Understand your hiring needs and current D&I maturity.',
    },
    {
      stepNumber: '02',
      title: 'Sensitization & Orientation',
      description: 'Prepare your teams for inclusive onboarding.',
    },
    {
      stepNumber: '03',
      title: 'Candidate Matching',
      description: 'We assess and recommend job-ready candidates for your roles.',
    },
    {
      stepNumber: '04',
      title: 'Ongoing Support',
      description: 'Regular check-ins to ensure successful integration.',
    },
  ],
};

export const alignedMovement = {
  eyebrow: 'Our Mission & Vision',
  headline: 'Building an inclusive society, one workplace at a time.',
  body: "WinVinaya Foundation's goal is to create an inclusive society by working with every key stakeholder — students, educational institutions, corporates, and the general public. Every corporate partnership is a direct step toward closing India's PWD employment gap, not a side initiative — it's central to how that gap actually closes.",
};

export const corporateClosingCta = {
  headline: 'Your next great hire might be one conversation away.',
  body: "Whether you're starting your D&I journey or scaling an existing one, we'll meet you where you are.",
  ctas: [
    { label: 'Schedule a Consultation', to: '/contact' },
    { label: 'Contact Us', to: '/contact' },
  ] satisfies CtaLink[],
};
