import type { AwardEntry, CtaLink } from '../../model/content';

export const awardsHero = {
  headline: 'Awards & Recognition',
  subheadline: 'Recognition from the disability, tech, and workplace communities for our work in inclusive employment.',
};

export const featuredAward = {
  eyebrow: 'Featured Award',
  title: 'ATF Award — Best Assistive Technology Initiative among NGOs',
  body: "Awarded at the Bengaluru Tech Summit by the AssisTech Foundation. WinVinaya Academy — India's first digital learning academy for persons with disabilities — played the central role in earning this recognition, offering courses in Indian Sign Language and simple English across subjects like financial accounting, core banking, MS Power BI, and full-stack software development.",
  date: 'December 1, 2023',
  event: 'Bengaluru Tech Summit',
  organization: 'AssisTech Foundation',
  photoUrl: '/awards/atf-award-ceremony.jpg',
  badgeUrl: '/awards/atf-badge.png',
};

export const awardGrid: AwardEntry[] = [
  {
    title: 'Great Place to Work Certified',
    body: 'WinVinaya Foundation is certified as a Great Place to Work, reflecting the culture and employee experience built within the organization.',
    icon: 'premium',
  },
  {
    title: 'AssisTech Award',
    body: 'Recognized by the AssisTech Foundation for our work in inclusive employment.',
    icon: 'award',
  },
];

export const govRecognition = {
  eyebrow: 'Government Recognition',
  title: 'Approved and recognized by government bodies.',
  body: 'WinVinaya Foundation holds an approval letter from RDPR (Rural Development and Panchayat Raj), Government of Karnataka.',
  link: { label: 'View Approval Details', to: '/about/awards/rdpr-approval' } satisfies CtaLink,
};

export const recognitionMeaning = {
  eyebrow: 'Why It Matters',
  title: 'Why these awards matter.',
  body: "Recognition from organizations like AssisTech Foundation and Great Place to Work isn't just credibility for WinVinaya — it signals to donors, corporate partners, and government bodies that our training and placement model actually works, and that our team operates with integrity and care.",
};

export const awardsClosingCta = {
  headline: 'Help us earn the next one.',
  body: 'Your support helps us keep building programs worth recognizing.',
  ctas: [
    { label: 'Donate Now', to: '/donate' },
    { label: 'Partner With Us', to: '/involve/corporate-engagement' },
  ] satisfies CtaLink[],
};
