import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { SectionContainer } from '../../../components';
import { whyWorkWithUs } from '../../../pages/resources/careersContent';

/** Why Work With Us Section — the mission-driven case for joining, plus a day-to-day checklist */
export default function WhyWorkWithUsSection() {
  return (
    <SectionContainer labelledBy="why-work-with-us-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.22),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
        }}
      >
        <Stack spacing={3.5} sx={{ maxWidth: 860 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                color: 'primary.dark',
              }}
            >
              <TrackChangesRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.875rem' }}>
              {whyWorkWithUs.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="why-work-with-us-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {whyWorkWithUs.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.05rem', sm: '1.2rem' },
              lineHeight: 1.8,
              color: 'text.secondary',
              fontWeight: 450,
            }}
          >
            {whyWorkWithUs.body}
          </Typography>

          {/* Day-to-Day Checklist Callout */}
          <Box
            sx={{
              mt: 1,
              p: 3,
              borderRadius: 4,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
              boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.dark', mb: 2 }}>
              {whyWorkWithUs.checklist.intro}
            </Typography>
            <Stack spacing={1.5}>
              {whyWorkWithUs.checklist.points.map((point) => (
                <Stack key={point} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                  <CheckCircleRoundedIcon sx={{ fontSize: 20, color: 'primary.main', flexShrink: 0, mt: '0.15em' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65 }}>
                    {point}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
