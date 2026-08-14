import type { CtaLink } from '../../model/content';

export const certificationsHero = {
  eyebrow: 'Verified & Compliant',
  headline: 'Approvals & Certifications',
  subheadline: 'Our legal standing, government approvals, and compliance — verified and available for review.',
};

export const trustRegistration = {
  headline: 'A Registered Charitable Trust.',
  body: 'WinVinaya Foundation is registered as a Trust under Registration Number BNG(U)JNR 1287/2015-2016/BKIV, operating in full legal compliance since its founding.',
  regNumber: 'BNG(U)JNR 1287/2015-2016/BKIV',
};

export const governmentApproval = {
  headline: 'Approved by the Rural Development and Panchayat Raj Department.',
  body: 'WinVinaya Foundation holds a formal Letter of Approval from RDPR, Government of Karnataka, recognizing our training and livelihood programs for persons with disabilities.',
  documentTitle: 'Approval Letter from RDPR, Govt. of Karnataka',
  documentDate: 'December 2023',
  link: { label: 'View/Download Approval Letter', to: '/about/awards/rdpr-approval' } satisfies CtaLink,
};

export const taxCertifications = {
  headline: 'Certified for Donor Tax Benefits.',
  body: 'These certifications mean your donations to WinVinaya Foundation are eligible for tax exemption under Indian law — verified, current, and available for download.',
  items: [
    {
      title: '80G Certificate',
      description: 'Enables donors to claim tax deduction on contributions under Section 80G of the Income Tax Act.',
      linkText: 'Download 80G Certificate',
      to: '/about/reports',
    },
    {
      title: '12A Certificate',
      description: "Confirms WinVinaya Foundation's income tax exemption status as a registered charitable trust.",
      linkText: 'Download 12A Certificate',
      to: '/about/reports',
    },
  ],
};

export const csrEligibility = {
  headline: 'Approved for Corporate CSR Funding.',
  body: 'WinVinaya Foundation holds CSR-1 registration with the Ministry of Corporate Affairs (MCA), making us an eligible implementing partner for corporate CSR budgets under the Companies Act.',
  documentTitle: 'CSR-1 MCA Approval Letter',
  linkText: 'Download CSR-1 Approval Letter',
  to: '/about/reports',
};

export const whyThisMatters = {
  eyebrow: 'Trust & Governance',
  headline: 'Verified, not just claimed.',
  body: 'For donors, this means your contribution is tax-deductible and goes to a legally registered, government-recognized organization. For corporate partners, this means WinVinaya Foundation is a fully eligible CSR partner — no compliance concerns, no extra due diligence required.',
  donorPoint: 'Tax-deductible contributions going directly to a legally registered, government-recognized trust.',
  corporatePoint: 'Fully eligible CSR partner under MCA guidelines — zero compliance friction or due diligence hurdles.',
};

export const certificationsClosingCta = {
  headline: 'Give with confidence.',
  body: 'Every certification here exists so you can trust exactly where your support goes.',
  ctas: [
    { label: 'Donate Now', to: '/donate' },
    { label: 'Explore CSR Partnership', to: '/involve/corporate-engagement' },
  ] satisfies CtaLink[],
};
