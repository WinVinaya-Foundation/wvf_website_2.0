import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Chip } from '../../../components';
import { useFileExists } from '../../../hooks/useFileExists';
import { documentFileUrl } from '../../../utils/document';
import type { JobItem } from '../../../store/api/careersApi';

export interface JobCardProps {
  job: JobItem;
}

/** A single job opening row — title, status, and key details, opening the job description PDF in
 * a new tab once it exists. Closed roles stay visible (for transparency) but read-only
 * unless a PDF genuinely exists for them too. */
export default function JobCard({ job }: JobCardProps) {
  const isActive = job.isActive;
  const fallbackUrl = documentFileUrl(job.title);
  const isFallbackAvailable = useFileExists(fallbackUrl);

  const fileUrl = job.fileUrl || (isFallbackAvailable ? fallbackUrl : undefined);
  const available = Boolean(fileUrl);
  const clickable = available;

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: { xs: 2, sm: 3 },
        p: { xs: 3, sm: 3.5 },
        borderRadius: 4,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette.grey[900], 0.08),
        boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
        opacity: isActive ? 1 : 0.8,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        ...(clickable && {
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: (theme) => `0 16px 32px -12px ${alpha(theme.palette.primary.main, 0.25)}`,
          },
        }),
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 0.75, mb: 1.25 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.1rem' }}>
            {job.title}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <FiberManualRecordRoundedIcon sx={{ fontSize: 10, color: isActive ? 'success.main' : 'text.disabled' }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: 0.4, color: isActive ? 'success.dark' : 'text.disabled', textTransform: 'uppercase' }}>
              {isActive ? 'Active' : 'Closed'}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2.5} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
          <Chip
            label={job.employmentType}
            size="small"
            sx={{ fontWeight: 700, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1), color: 'primary.dark' }}
          />
          <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
            <WorkspacePremiumRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.secondary' }}>{job.experience}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
            <PlaceRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.secondary' }}>{job.location}</Typography>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ flexShrink: 0, alignSelf: { xs: 'flex-start', sm: 'center' } }}>
        {available ? (
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'primary.dark' }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, whiteSpace: 'nowrap' }}>View Job Description</Typography>
            <OpenInNewRoundedIcon sx={{ fontSize: 15 }} />
          </Stack>
        ) : (
          <Chip label="Coming soon" size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary' }} />
        )}
      </Box>
    </Box>
  );

  if (!clickable) {
    return (
      <Box aria-label={`${job.title} — job description coming soon`} sx={{ cursor: 'default' }}>
        {content}
      </Box>
    );
  }

  return (
    <Box
      component="a"
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${job.title} job description PDF in a new tab`}
      sx={{ textDecoration: 'none', display: 'block' }}
    >
      {content}
    </Box>
  );
}
