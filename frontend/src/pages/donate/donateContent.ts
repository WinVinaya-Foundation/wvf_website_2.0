import type { CtaLink } from '../../model/content';
import type { DonationScheme } from '../../store/api/donationsApi';

export const donateHero = {
  eyebrow: 'Donate',
  headline: 'Your Support Builds Careers, Not Just Charity.',
  subheadline: 'Every rupee funds real training, real skills, and real jobs for persons with disabilities across India.',
  cta: { label: 'Donate Now', to: '#donate-form' } satisfies CtaLink,
};

export interface DonationTier {
  scheme: DonationScheme;
  amountLabel: string;
  amountRupees: number | null;
  headline: string;
  eyebrow?: string;
  description: string;
}

export const donationTiers: DonationTier[] = [
  {
    scheme: 'STUDENT_ENGLISH',
    amountLabel: '₹5,000',
    amountRupees: 5000,
    headline: 'Support-A-Student: English Training',
    description:
      "Sponsor one PWD candidate's training in functional English skills. 70% of PWD students come from rural areas, where limited English is often the biggest barrier to employment. This training is the essential first step toward job-readiness.",
  },
  {
    scheme: 'STUDENT_ENGLISH_SOFTSKILLS',
    amountLabel: '₹10,000',
    amountRupees: 10000,
    headline: 'Support-A-Student: English + Soft Skills',
    description:
      "Sponsor one candidate's full Employability Skills training — English, active listening, confident communication, mock interviews, and role plays. Built for candidates who need more than language alone to compete for a job.",
  },
  {
    scheme: 'STUDENT_ENGLISH_SOFTSKILLS_IT_BFSI',
    amountLabel: '₹25,000',
    amountRupees: 25000,
    headline: 'Support-A-Student: English, Soft Skills + IT or BFSI',
    description:
      'Sponsor complete job-ready training for one candidate — English, aptitude, soft skills, plus technical training in either IT or BFSI, matched to their educational background. This is what gets candidates to true industry-readiness.',
  },
  {
    scheme: 'RURAL_ENTREPRENEURS',
    amountLabel: '₹25,000',
    amountRupees: 25000,
    eyebrow: 'Break Barriers. Build Futures — Together.',
    headline: 'Empower Rural Entrepreneurs',
    description:
      'Fund digital entrepreneurship training for 5 rural women and persons with disabilities through smartphone-friendly, regional-language learning hubs. Part of our ₹50 lakh goal to train 1,000 rural entrepreneurs and ensure no one is left behind in India’s digital revolution.',
  },
  {
    scheme: 'GENERAL',
    amountLabel: 'Any Amount',
    amountRupees: null,
    headline: 'Helping Hands — General Donation',
    description:
      'Give flexibly. Supports candidate training, Indian Sign Language learning materials for HSI candidates, employability events, and wherever the need is greatest.',
  },
];

export const whyItMatters = {
  headline: "The gap isn't ability. It's access to the right training.",
  body: 'India has over 20 million persons with disabilities, yet private-sector employment stands at just 0.36%. Your donation funds the specific, industry-grade training that turns potential into an actual job offer.',
};

export const proofYourMoneyWorks = {
  eyebrow: 'Proof Your Money Works',
  headline: 'Real training. Real placements. Real reach.',
  stats: [
    { value: 1440, suffix: '+', label: 'Candidates trained' },
    { value: 560, suffix: '+', label: 'Candidates placed in MNCs and MSMEs' },
    { value: 24, suffix: '', label: 'States of India + Nepal' },
  ],
  link: { label: 'View Full Performance Reports', to: '/impact/performance-reports' } satisfies CtaLink,
};

export const otherWaysToGive = {
  eyebrow: 'Other Ways to Give',
  headline: 'Prefer bank transfer or a cheque?',
  bankTransfer: {
    title: 'Bank Transfer',
    details: [
      { label: 'Account Name', value: 'WinVinaya Foundation' },
      { label: 'Bank', value: 'ICICI Bank, Savings Account' },
      { label: 'Account Number', value: '473201000121' },
      { label: 'IFSC', value: 'ICIC0004732' },
      { label: 'Branch', value: 'Bangalore – V V Puram' },
    ],
  },
  cheque: {
    title: 'Cheque',
    payableTo: 'WinVinaya Foundation',
    mailedTo: '25/3 "Brindavan," 3rd Cross, Saraswathi Puram, IIM Post, Bangalore 560076',
  },
  receiptNote:
    'For bank transfer or cheque, email donation@WinVinayaFoundation.org with your Full Name, Email, Phone, Full Postal Address, PAN Number, and chosen donation category so we can issue your receipt.',
  receiptEmail: 'donation@WinVinayaFoundation.org',
};

export const taxBenefits = {
  eyebrow: 'Tax Benefits & Registration',
  headline: 'Every donation is tax-deductible.',
  body: 'All Indian donors receive 50% tax exemption under Section 80G of the Income Tax Act.',
  registrations: [
    'Indian Trust Act — BNG(U)JNR 1287/2015-2016/BKIV',
    '80G Income Tax Act, 1961',
    'NITI Aayog — KA/2017/0180303',
    'GuideStar India Transparency Key — GSN12510',
  ],
};

export const donateClosingCta = {
  headline: 'Pick your impact. Make it happen.',
  body: "Whether it's ₹5,000 or a general gift of any size, every contribution has a name and a story behind it.",
  ctas: [
    { label: 'Donate Now', to: '#donate-form' },
    { label: 'Contact Us for Custom Giving', to: '/contact' },
  ] satisfies CtaLink[],
};

export const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
] as const;
