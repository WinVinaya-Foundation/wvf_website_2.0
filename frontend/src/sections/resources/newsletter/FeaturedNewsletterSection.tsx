import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Button, Chip, SectionContainer } from '../../../components';
import { useFileExists } from '../../../hooks/useFileExists';
import { documentFileUrl } from '../../../utils/document';
import { formatDate } from '../../../utils/date';
import { newsletterIssues } from '../../../pages/resources/newsletterContent';
import NewsletterCoverArt from './NewsletterCoverArt';

/** Spotlights the most recently published newsletter issue — cover art on one side, title,
 * description, and a "Read Newsletter" action on the other. */
export default function FeaturedNewsletterSection() {
  const [latestIssue] = newsletterIssues;
  const fileUrl = latestIssue ? documentFileUrl(latestIssue.title, latestIssue.issueLabel) : '';
  const available = useFileExists(fileUrl);

  if (!latestIssue) return null;

  return (
    <SectionContainer labelledBy="featured-newsletter-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.1fr' },
          borderRadius: 5,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.grey[900], 0.08),
          boxShadow: (theme) => `0 20px 48px -16px ${alpha(theme.palette.grey[900], 0.16)}`,
        }}
      >
        <NewsletterCoverArt accent="secondary" issueLabel={latestIssue.issueLabel} height={{ xs: 220, md: '100%' }} iconSize={72} />

        <Box sx={{ p: { xs: 3.5, sm: 5, md: 6 }, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Stack spacing={2.5}>
            <Chip
              icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '16px !important' }} />}
              label="Latest Issue"
              size="small"
              color="secondary"
              sx={{ alignSelf: 'flex-start', fontWeight: 800 }}
            />

            <Typography
              id="featured-newsletter-heading"
              variant="h2"
              sx={{ fontWeight: 900, fontSize: { xs: '1.7rem', sm: '2.1rem', md: '2.35rem' }, lineHeight: 1.25, color: 'text.primary' }}
            >
              {latestIssue.title} — {latestIssue.issueLabel}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'text.secondary' }}>
              {latestIssue.description}
            </Typography>

            <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
              <CalendarMonthRoundedIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: 'text.secondary' }}>
                Published {formatDate(latestIssue.publishedAt)}
              </Typography>
            </Stack>

            <Box sx={{ pt: 1 }}>
              {available ? (
                <Button
                  component="a"
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<OpenInNewRoundedIcon />}
                  sx={{ fontWeight: 800, py: 1.5, px: 3.5, borderRadius: 3 }}
                >
                  Read Newsletter
                </Button>
              ) : (
                <Chip label="PDF coming soon" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary', fontWeight: 700 }} />
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </SectionContainer>
  );
}
