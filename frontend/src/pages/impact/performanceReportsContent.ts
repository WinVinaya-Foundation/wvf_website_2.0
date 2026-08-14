import type { CtaLink } from '../../model/content';

export const performanceReportsHero = {
  eyebrow: 'Real-Time Impact Metrics',
  headline: 'Performance Reports',
  subheadline: 'Live, interactive data on training, placement, and impact — updated directly from our records.',
};

export const liveImpactDashboard = {
  headline: 'Explore Our Numbers.',
  body: 'This interactive dashboard tracks our training and placement activity in real time — candidates trained, disability categories represented, states reached, and employment outcomes. Filter and explore the data directly.',
  powerBiUrl:
    'https://app.powerbi.com/view?r=eyJrIjoiOWM5MmQ0YjYtNTk4OS00Nzg1LTlkMGItYzI1MjdkNzJmNTg5IiwidCI6ImNkMzY0NTJmLWFjMzQtNDRhNS1iZTMzLThiYWE4MDFhM2ZmZCJ9',
};

export const dashboardContext = {
  headline: 'What the Dashboard Shows',
  body: 'The dashboard reflects our core metrics — total candidates trained, placement outcomes by disability category, geographic reach across India and Nepal, and program-wise breakdowns (IT Full Stack vs. BFSI training tracks).',
};

export const whyWePublish = {
  eyebrow: 'Open & Transparent Governance',
  headline: 'Real transparency, not just a claim.',
  body: "Most NGOs summarize impact in a paragraph. We'd rather show you the actual data — because donors and corporate partners deserve to verify results themselves, not just take our word for it.",
};

export const relatedReports = {
  headline: 'Want the full picture?',
  body: 'Pair this live dashboard with our detailed annual and financial reports.',
  links: [
    { label: 'View Annual Reports', to: '/about/reports' },
    { label: 'View Financial Audits', to: '/about/reports' },
  ] satisfies CtaLink[],
};

export const performanceReportsClosingCta = {
  headline: "Numbers like these don't happen without support.",
  body: 'Help us keep training, placing, and reporting back honestly.',
  ctas: [{ label: 'Donate Now', to: '/donate' }] satisfies CtaLink[],
};
