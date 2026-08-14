import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { howItWorksContent } from '../../../pages/programs/samarthContent';

const FEATURE_ICONS = [
  TranslateRoundedIcon,
  SmartphoneRoundedIcon,
  SignalCellularAltRoundedIcon,
  SentimentSatisfiedAltRoundedIcon,
];

const COLOR_KEYS = ['primary', 'secondary', 'info', 'warning'] as const;

export default function HowItWorksSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="how-it-works-heading">
      <SectionHeading
        eyebrow={howItWorksContent.eyebrow}
        title={howItWorksContent.headline}
        description={howItWorksContent.body}
        titleId="how-it-works-heading"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3,
          pt: 1,
        }}
      >
        {howItWorksContent.features.map((feature, idx) => {
          const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
          const colorKey = COLOR_KEYS[idx % COLOR_KEYS.length];

          return (
            <Box
              key={feature.title}
              sx={{
                p: { xs: 3, sm: 3.5 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[colorKey].main, 0.2),
                boxShadow: (theme) => `0 10px 28px -8px ${alpha(theme.palette.grey[900], 0.06)}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: (theme) => theme.palette[colorKey].main,
                  boxShadow: (theme) => `0 16px 36px -8px ${alpha(theme.palette[colorKey].main, 0.2)}`,
                },
              }}
            >
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 3,
                    bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.12),
                    color: (theme) => theme.palette[colorKey].dark || theme.palette[colorKey].main,
                  }}
                >
                  <Icon sx={{ fontSize: 26 }} />
                </Box>

                <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.15rem' }}>
                  {feature.title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
