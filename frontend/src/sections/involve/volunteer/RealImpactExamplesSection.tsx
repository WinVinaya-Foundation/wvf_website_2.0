import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { Chip, SectionContainer } from '../../../components';
import { realImpactExamples } from '../../../pages/involve/volunteerContent';

/** Real Impact Examples Section showcasing concrete proof of volunteer contributions */
export default function RealImpactExamplesSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="impact-examples-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.06)} 0%, ${alpha(theme.palette.primary.main, 0.06)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.22),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
        }}
      >
        <Stack spacing={3.5} sx={{ maxWidth: 880 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.14),
                color: 'secondary.dark',
              }}
            >
              <StarRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 800, letterSpacing: 1.2 }}>
              {realImpactExamples.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="impact-examples-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {realImpactExamples.headline}
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
            {realImpactExamples.body}
          </Typography>

          {/* Employer Placements Highlight Pills */}
          <Box
            sx={{
              pt: 2,
              borderTop: '1px solid',
              borderColor: (theme) => alpha(theme.palette.divider, 0.8),
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary', mr: 1 }}>
              Placement Success Highlights:
            </Typography>
            {['Caterpillar', 'ICICI Prudential', 'Mindtree', 'Allstate'].map((company) => (
              <Chip
                key={company}
                icon={<BusinessRoundedIcon sx={{ fontSize: '16px !important' }} />}
                label={company}
                size="small"
                sx={{
                  fontWeight: 700,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                  color: 'primary.dark',
                }}
              />
            ))}
          </Box>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
