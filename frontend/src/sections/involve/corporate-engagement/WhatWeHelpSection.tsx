import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import { Chip, SectionContainer } from '../../../components';
import { whatWeHelp } from '../../../pages/involve/corporateEngagementContent';

/** What We Help You Do Section — tailored partnership pitch plus placement company roll-call */
export default function WhatWeHelpSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="what-we-help-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.08)} 0%, ${alpha(theme.palette.info.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.22),
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
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.14),
                color: 'secondary.dark',
              }}
            >
              <Diversity3RoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.875rem' }}>
              {whatWeHelp.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="what-we-help-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {whatWeHelp.headline}
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
            {whatWeHelp.body}
          </Typography>

          {/* Placement Company Roll-Call */}
          <Box
            sx={{
              mt: 1,
              p: 3,
              borderRadius: 4,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.3),
              boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'secondary.dark', mb: 1.5, letterSpacing: 0.3 }}>
              {whatWeHelp.placementIntro}
            </Typography>
            <Stack direction="row" spacing={1.25} sx={{ flexWrap: 'wrap', rowGap: 1.25 }}>
              {whatWeHelp.companies.map((company) => (
                <Chip
                  key={company}
                  label={company}
                  sx={{
                    fontWeight: 700,
                    bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                    color: 'secondary.dark',
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
