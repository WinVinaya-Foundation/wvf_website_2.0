import type { CtaLink } from '../../model/content';

export const internshipsHero = {
  eyebrow: 'Work With Purpose',
  headline: 'Intern With Purpose. Leave With Impact.',
  subheadline: 'Work on real projects that directly change how persons with disabilities access education, employment, and opportunity — not busywork, actual mission-critical work.',
  heroCta: { label: 'Apply for an Internship', to: '#how-to-apply' } satisfies CtaLink,
};

export const whyIntern = {
  eyebrow: 'Transformative Experience',
  headline: 'This internship will change how you see ability.',
  body: "Our interns don't fetch coffee or shadow meetings — they work on projects with a direct line to someone's career. Past interns have helped make training documents accessible, supported sign language content, and contributed to systems used by hundreds of candidates.",
  quote: {
    text: 'This internship didn\'t just teach me about document remediation — it rewrote my worldview.',
    author: 'Varun Anand',
    role: 'Former Accessibility Intern, WinVinaya Foundation',
  },
};

export interface InternshipTrack {
  title: string;
  description: string;
  badge: string;
}

export const internshipTracks = {
  headline: 'Explore Our Internship Tracks.',
  description: 'Whatever your background, there is a mission-critical project waiting for your skills.',
  tracks: [
    {
      title: 'Tech & Development',
      description: "Contribute to WinVinaya Academy's platform, tools, and accessibility features for diverse learners.",
      badge: 'Engineering',
    },
    {
      title: 'Content & Accessibility',
      description: 'Document remediation, accessible content design, and Indian Sign Language content support.',
      badge: 'Accessibility Design',
    },
    {
      title: 'Training & Curriculum',
      description: 'Help design, refine, and improve course material and learning modules for PWD candidates.',
      badge: 'Education',
    },
    {
      title: 'Communications & Outreach',
      description: 'Blog writing, social media campaigns, newsletter curation, and video storytelling.',
      badge: 'Media & Comms',
    },
    {
      title: 'Corporate Engagement & D&I Research',
      description: 'Support employer outreach, corporate sensitization program design, and market research.',
      badge: 'CSR & Research',
    },
  ] satisfies InternshipTrack[],
};

export const whoShouldApply = {
  eyebrow: 'Inclusive Opportunities',
  headline: 'Students, early professionals, and anyone who wants their work to matter.',
  body: 'We welcome interns from any academic background — technical or non-technical. What matters more than your major is your willingness to think inclusively, work with candidates directly, and contribute to something bigger than a line on your CV.',
  inclusiveCallout: 'Persons with disabilities are especially encouraged to apply — this is your organization too.',
};

export const whatYouWillGain = {
  headline: "What You'll Gain",
  description: 'Four foundational pillars that make interning at WinVinaya a career-defining milestone.',
  pillars: [
    {
      title: 'Real, visible impact',
      description: 'See your work reach actual candidates within weeks, not years.',
    },
    {
      title: 'Cross-disability collaboration',
      description: 'Work directly alongside colleagues and candidates with diverse disabilities.',
    },
    {
      title: 'Mentorship',
      description: 'Guidance from a founding team with 9+ years of hands-on inclusion work.',
    },
    {
      title: 'A story worth telling',
      description: 'Most internships teach a skill; this one shifts your perspective forever.',
    },
  ],
};

export const realInternOutcomes = {
  eyebrow: 'Proven Pathways',
  headline: 'Real Intern Outcomes',
  body: "Internships here have opened real doors. Prachi Pandey completed a coding-focused engagement with WinVinaya and moved into an internship at Allstate Solutions — one step in a career path that started with zero coding background. Varun Anand's internship in accessible document work reshaped how he sees ability and inclusion altogether. These aren't outliers — they're what this internship is built to do.",
};

export const missionGoal = {
  eyebrow: 'Our Mission & Goal',
  headline: 'Every intern moves us closer to our mission.',
  body: "WinVinaya Foundation exists to close India's PWD employment gap — currently just 0.36% in the private sector, despite millions of capable candidates. Every intern's work — whether it's a line of code, a redesigned course module, or an accessible document — is a direct contribution to closing that gap. You're not on the sidelines of this mission. You're part of how it happens.",
  statHighlight: '0.36%',
  statDescription: 'Current PWD representation in India private sector workforce — a gap we are actively closing together.',
};

export const howToApply = {
  headline: 'How to Apply',
  description: 'Our application process is simple, transparent, and responsive.',
  steps: [
    {
      stepNumber: '01',
      title: 'Tell Us Your Interests',
      description: 'Share your background, skills, and preferred project track.',
    },
    {
      stepNumber: '02',
      title: 'Matched to a Project',
      description: 'We align your strengths to an active, high-impact initiative.',
    },
    {
      stepNumber: '03',
      title: 'Start Contributing',
      description: 'Remote or in-person. Most internships run 4 to 12 weeks.',
    },
  ],
};

export const internshipsClosingCta = {
  headline: "Your internship could be someone else's turning point.",
  body: 'Bring your skills. Leave with a perspective shift you didn\'t expect.',
  ctas: [
    { label: 'Apply Now', to: '#how-to-apply' },
    { label: 'Contact Us With Questions', to: '/contact' },
  ] satisfies CtaLink[],
};
