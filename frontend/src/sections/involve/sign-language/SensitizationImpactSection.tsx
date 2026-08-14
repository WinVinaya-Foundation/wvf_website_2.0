import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { Chip, SectionContainer } from '../../../components';
import { sensitizationImpact } from '../../../pages/involve/signLanguageContent';

/** Real Impact Section featuring the Athma Sakthi Vidyalaya sensitization session in Bengaluru */
export default function SensitizationImpactSection() {
  return (
    <SectionContainer labelledBy="sensitization-impact-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.06)} 0%, ${alpha(theme.palette.info.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.22),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: 820 }}>
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
              <SelfImprovementRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 800, letterSpacing: 1.2 }}>
              {sensitizationImpact.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="sensitization-impact-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '1.8rem', sm: '2.3rem', md: '2.6rem' },
              lineHeight: 1.25,
              color: 'text.primary',
            }}
          >
            {sensitizationImpact.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.05rem', sm: '1.15rem' },
              lineHeight: 1.8,
              color: 'text.secondary',
              fontWeight: 450,
            }}
          >
            {sensitizationImpact.body}
          </Typography>

          <Box sx={{ pt: 0.5 }}>
            <Chip
              icon={<PlaceRoundedIcon sx={{ fontSize: '18px !important' }} />}
              label={sensitizationImpact.location}
              sx={{
                fontWeight: 700,
                bgcolor: 'background.paper',
                color: 'secondary.dark',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.secondary.main, 0.3),
              }}
            />
          </Box>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
