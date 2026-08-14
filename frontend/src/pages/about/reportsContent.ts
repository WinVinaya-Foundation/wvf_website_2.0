import type { CtaLink, DocumentEntry } from '../../model/content';

export const reportsHero = {
  headline: 'Reports & Transparency',
  subheadline: 'Our finances, our impact, and our legal standing — openly available.',
};

export const annualReports: DocumentEntry[] = [
  { title: 'Annual Report', year: '2024–2025' },
  { title: 'Annual Report', year: '2023–2024' },
  { title: 'Annual Report', year: '2022–2023' },
  { title: 'Annual Report', year: '2021–2022' },
  { title: 'Annual Report', year: '2016–2020', description: 'Covers the founding years as a combined report.' },
];

export const annualReportsGapNote = 'No separate annual report was filed for 2020–2021.';

export const financialReports: DocumentEntry[] = [
  { title: 'Financial Audited Report', year: 'FY 2023–24' },
  { title: 'Financial Audited Report', year: 'FY 2022–23' },
  { title: 'Financial Audited Report', year: 'FY 2021–22' },
  { title: 'Financial Audited Report', year: 'FY 2020–21' },
  { title: 'Financial Audited Report', year: 'FY 2019–20' },
];

export const legalDocuments = {
  eyebrow: 'Legal Standing & Certifications',
  title: 'Registered, certified, and ready for corporate CSR funding.',
  body: 'WinVinaya Foundation is a registered Trust, holding the certifications below.',
  registrationNumber: 'BNG(U)JNR 1287/2015-2016/BKIV',
  documents: [
    { title: '80G Certificate', description: 'Tax exemption for donors.' },
    { title: '12A Certificate', description: 'Income tax exemption for the trust.' },
    { title: 'CSR-1 MCA Approval Letter', description: 'Enables corporate CSR funding.' },
  ] satisfies DocumentEntry[],
};

export const researchResources: DocumentEntry[] = [
  { title: 'Disability Hiring Perspective Study — Feedback Insights' },
  { title: 'Recommendations for Training Persons with Disabilities' },
  { title: 'Recommendations for Hiring Persons with Disabilities' },
  { title: 'Best Practices in Recruiting Deaf Candidates' },
  { title: 'How Corporates Recruit & Integrate PwDs' },
  { title: "Shiva's Learning in Recruiting People" },
  { title: 'WinVinaya Flyer' },
];

export const reportsClosingCta = {
  headline: 'Questions about our finances or impact?',
  body: "We're happy to walk any donor or partner through our reports directly.",
  ctas: [
    { label: 'Contact Us', to: '/contact' },
    { label: 'Donate Now', to: '/donate' },
  ] satisfies CtaLink[],
};
