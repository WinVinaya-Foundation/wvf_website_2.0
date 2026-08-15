import { Box } from '@mui/material';
import { SectionContainer, SectionHeading } from '../../../components';
import type { NewsletterItem } from '../../../store/api/newsletterApi';
import NewsletterCard from './NewsletterCard';

export interface NewsletterListSectionProps {
  issues?: NewsletterItem[];
}

/** Grid of all issues other than the featured one at the top of the page */
export default function NewsletterListSection({ issues = [] }: NewsletterListSectionProps) {
  if (issues.length === 0) return null;

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="newsletter-list-heading">
      <SectionHeading eyebrow="Browse the Archive" title="Past Issues" align="left" titleId="newsletter-list-heading" />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3.5 }}>
        {issues.map((issue, index) => (
          // index + 1 keeps the accent cycle continuing from the featured issue instead of resetting
          <NewsletterCard key={issue.id || `${issue.title}-${issue.issueLabel}`} issue={issue} index={index + 1} />
        ))}
      </Box>
    </SectionContainer>
  );
}
