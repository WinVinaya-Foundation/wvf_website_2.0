import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import LocalFloristRoundedIcon from '@mui/icons-material/LocalFloristRounded';
import WavingHandRoundedIcon from '@mui/icons-material/WavingHandRounded';
import { SectionContainer } from '../../../components';
import { startWithBasics } from '../../../pages/involve/signLanguageContent';

const STEP_ICONS = [ThumbUpRoundedIcon, LocalFloristRoundedIcon];

/** Start With the Basics Section — invites visitors to try their first sign right away */
export default function StartWithBasicsSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="start-with-basics-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'center',
        }}
      >
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.14),
                color: 'info.dark',
              }}
            >
              <WavingHandRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'info.dark', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.875rem' }}>
              {startWithBasics.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="start-with-basics-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2rem', sm: '2.6rem', md: '2.9rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {startWithBasics.headline}
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
            {startWithBasics.body}
          </Typography>
        </Stack>

        {/* Illustrated "Good Morning" Example Card */}
        <Box
          sx={{
            p: { xs: 3.5, sm: 4 },
            borderRadius: 4,
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.06),
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.info.main, 0.25),
            boxShadow: (theme) => `0 12px 32px -12px ${alpha(theme.palette.grey[900], 0.1)}`,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'info.dark', mb: 2.5 }}>
            {startWithBasics.example.label}
          </Typography>

          <Stack spacing={2.5}>
            {startWithBasics.example.steps.map((step, index) => {
              const Icon = STEP_ICONS[index % STEP_ICONS.length];

              return (
                <Stack key={step} direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'background.paper',
                      color: 'info.dark',
                      border: '1px solid',
                      borderColor: (theme) => alpha(theme.palette.info.main, 0.3),
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.6, pt: 0.75, fontWeight: 500 }}>
                    {step}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </SectionContainer>
  );
}
