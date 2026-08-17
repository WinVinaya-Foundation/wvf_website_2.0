import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Chip } from '../../../components';
import { useFileExists } from '../../../hooks/useFileExists';
import { documentFileUrl } from '../../../utils/document';
import { formatDate } from '../../../utils/date';
import type { NewsletterItem } from '../../../store/api/newsletterApi';
import NewsletterCoverArt, { type NewsletterAccent } from './NewsletterCoverArt';

const ACCENTS: NewsletterAccent[] = ['secondary', 'primary', 'info'];

export interface NewsletterCardProps {
  issue: NewsletterItem;
  index: number;
}

/** Newsletter card — cover art, title, description, and published date. Opens the issue PDF in a
 * new tab once it exists; otherwise shows a "Coming soon" state. */
export default function NewsletterCard({ issue, index }: NewsletterCardProps) {
  const accent = ACCENTS[index % ACCENTS.length];
  const fallbackUrl = documentFileUrl(issue.title, issue.issueLabel);
  const isFallbackAvailable = useFileExists(fallbackUrl);

  const fileUrl = issue.fileUrl || (isFallbackAvailable ? fallbackUrl : null);
  const available = Boolean(fileUrl);

  const card = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette.grey[900], 0.08),
        boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
        opacity: available ? 1 : 0.75,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(available && {
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: (theme) => `0 20px 40px -12px ${alpha(theme.palette[accent].main, 0.28)}`,
          },
        }),
      }}
    >
      <Box sx={{ aspectRatio: '16 / 9', overflow: 'hidden', position: 'relative' }}>
        {issue.coverImageUrl ? (
          <Box
            component="img"
            src={issue.coverImageUrl}
            alt={`${issue.title} ${issue.issueLabel}`}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <NewsletterCoverArt accent={accent} issueLabel={issue.issueLabel} height="100%" iconSize={40} />
        )}
      </Box>

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.05rem', lineHeight: 1.35, mb: 1 }}>
          {issue.title} — {issue.issueLabel}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            fontSize: '0.9rem',
            mb: 2.5,
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {issue.description}
        </Typography>

        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 2, borderTop: '1px solid', borderColor: (theme) => alpha(theme.palette.divider, 0.8) }}
        >
          <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
            <CalendarMonthRoundedIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary' }}>{formatDate(issue.publishedAt)}</Typography>
          </Stack>

          {available ? (
            <Stack direction="row" spacing={0.4} sx={{ alignItems: 'center', color: `${accent}.dark` }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 800 }}>View PDF</Typography>
              <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
            </Stack>
          ) : (
            <Chip label="Coming soon" size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary' }} />
          )}
        </Stack>
      </Box>
    </Box>
  );

  if (!available || !fileUrl) {
    return (
      <Box aria-label={`${issue.title} ${issue.issueLabel} — PDF coming soon`} sx={{ cursor: 'default', height: '100%' }}>
        {card}
      </Box>
    );
  }

  return (
    <Box
      component="a"
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${issue.title} ${issue.issueLabel} PDF in a new tab`}
      sx={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      {card}
    </Box>
  );
}
