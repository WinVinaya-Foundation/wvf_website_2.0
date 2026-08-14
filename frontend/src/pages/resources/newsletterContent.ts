export const newsletterHero = {
  eyebrow: 'Resources',
  headline: 'Newsletter Archive',
  subheadline: 'Monthly updates on our training cohorts, hiring partnerships, and the everyday work of building a more inclusive India.',
};

export interface NewsletterIssue {
  /** Publication name — stays constant across issues; paired with `issueLabel` to build the PDF filename. */
  title: string;
  /** e.g. "August 2026" — shown as a badge and used to look up the issue's PDF. */
  issueLabel: string;
  /** ISO date (YYYY-MM-DD) */
  publishedAt: string;
  description: string;
}

/** Ordered newest to oldest — the first entry is the featured issue at the top of the page. */
export const newsletterIssues: NewsletterIssue[] = [
  {
    title: 'WinVinaya Newsletter',
    issueLabel: 'August 2026',
    publishedAt: '2026-08-01',
    description:
      "This month: a look inside our newest corporate sensitization sessions, an update on India's 0.36% PWD employment gap, and three placement stories from the Academy's latest cohort.",
  },
  {
    title: 'WinVinaya Newsletter',
    issueLabel: 'July 2026',
    publishedAt: '2026-07-01',
    description:
      'Featuring our Indian Sign Language basics series, a recap of the sensitization workshop at Athma Sakthi Vidyalaya in Bengaluru, and new hiring partners joining this quarter.',
  },
  {
    title: 'WinVinaya Newsletter',
    issueLabel: 'June 2026',
    publishedAt: '2026-06-01',
    description:
      'A closer look at the Samarth MSME initiative, screen-reader accessibility tips for developers, and where this cycle of interns are headed next.',
  },
  {
    title: 'WinVinaya Newsletter',
    issueLabel: 'May 2026',
    publishedAt: '2026-05-01',
    description:
      'Marking Global Accessibility Awareness Day, an update on our CSR-1 corporate partnerships, and a spotlight on the Training & Curriculum team.',
  },
  {
    title: 'WinVinaya Newsletter',
    issueLabel: 'April 2026',
    publishedAt: '2026-04-01',
    description:
      'Spring cohort graduations, a candid Q&A with a WinVinaya Academy alum now working at a hiring partner, and upcoming events across Bengaluru.',
  },
  {
    title: 'WinVinaya Newsletter',
    issueLabel: 'March 2026',
    publishedAt: '2026-03-01',
    description:
      'A spotlight on our founding team, fresh numbers from the performance dashboard, and how corporate volunteering shaped this quarter.',
  },
];
