import { Box, CircularProgress } from '@mui/material';
import { PageHero } from '../../components';
import { newsletterHero } from './newsletterContent';
import { FeaturedNewsletterSection, NewsletterListSection } from '../../sections/resources/newsletter';
import { useGetPublicNewslettersQuery } from '../../store/api/newsletterApi';

export default function NewsletterPage() {
  const { data: newsletters = [], isLoading } = useGetPublicNewslettersQuery();

  const latestIssue = newsletters[0];
  const otherIssues = newsletters.slice(1);

  return (
    <>
      <PageHero eyebrow={newsletterHero.eyebrow} title={newsletterHero.headline} subtitle={newsletterHero.subheadline} />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <FeaturedNewsletterSection latestIssue={latestIssue} />
          <NewsletterListSection issues={otherIssues} />
        </>
      )}
    </>
  );
}
