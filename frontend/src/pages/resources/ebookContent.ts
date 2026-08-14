export const ebookHero = {
  eyebrow: 'Resources',
  headline: 'eBook Library',
  subheadline: 'Practical guides on inclusive hiring, accessibility, and sign language — written from what actually works in the field, free to read.',
};

export interface Ebook {
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD) */
  publishedAt: string;
  author: string;
}

/** Ordered newest to oldest — the first entry is the featured eBook at the top of the page. */
export const ebooks: Ebook[] = [
  {
    title: 'The Inclusive Hiring Playbook',
    description:
      'A practical guide for HR teams and hiring managers building a genuinely inclusive recruitment pipeline — from sourcing candidates to structuring interviews to onboarding that actually sticks.',
    publishedAt: '2026-07-01',
    author: 'Corporate Engagement Team',
  },
  {
    title: 'Getting Started with Indian Sign Language',
    description:
      'An introductory guide to ISL basics, everyday etiquette, and why every workplace — not just ones with Deaf employees — benefits from a few colleagues who can sign.',
    publishedAt: '2026-05-01',
    author: 'Sign Language & Accessibility Team',
  },
  {
    title: 'Web Accessibility for Developers: A Field Guide',
    description:
      'Practical, code-level guidance on screen readers, keyboard navigation, and semantic markup — for teams who want to build interfaces that work for everyone on the first pass.',
    publishedAt: '2026-03-01',
    author: 'Accessibility Design Team',
  },
  {
    title: "Disability Sensitization: A Facilitator's Handbook",
    description:
      'The exercises, prompts, and facilitation notes behind our in-person sensitization workshops, adapted so any organization can run a first session internally.',
    publishedAt: '2026-01-01',
    author: 'Training & Sensitization Team',
  },
  {
    title: 'Building CSR Programs That Actually Move the Needle',
    description:
      'How to design a disability-inclusion CSR program that satisfies compliance and creates measurable impact — not just a line item in an annual report.',
    publishedAt: '2025-11-01',
    author: 'Corporate Engagement Team',
  },
  {
    title: 'From Classroom to Career: The WinVinaya Academy Story',
    description:
      'A candid look at what makes our training-to-placement model work, told through the outcomes of real cohorts — what changed, what failed first, and what we kept.',
    publishedAt: '2025-09-01',
    author: 'Talent & Placements Team',
  },
];
