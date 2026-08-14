import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { SectionContainer } from '../../../components';
import { whyVolunteer } from '../../../pages/involve/volunteerContent';

/** Why Volunteer With Us Section highlighting concrete career outcomes over generic charity */
export default function WhyVolunteerSection() {
  return (
    <SectionContainer labelledBy="why-volunteer-heading">
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
        <Stack spacing={3.5} sx={{ maxWidth: 860, position: 'relative', zIndex: 1 }}>
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
              <VolunteerActivismRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.875rem' }}>
              {whyVolunteer.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="why-volunteer-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {whyVolunteer.headline}
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
            {whyVolunteer.body}
          </Typography>

          {/* Quick highlight pillars */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            {[
              'Interview-ready candidates',
              'Indian Sign Language course creation',
              'Inclusive workplace hiring',
            ].map((pillar) => (
              <Stack key={pillar} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <CheckCircleOutlineRoundedIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {pillar}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
