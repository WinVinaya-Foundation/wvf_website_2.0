import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { whatParticipantsGainContent } from '../../../pages/programs/samarthContent';

const GAIN_ICONS = {
  smartphone: SmartphoneRoundedIcon,
  trending: TrendingUpRoundedIcon,
  payments: PaymentsRoundedIcon,
  verified: VerifiedRoundedIcon,
};

export default function WhatParticipantsGainSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="what-participants-gain-heading">
      <SectionHeading
        eyebrow={whatParticipantsGainContent.eyebrow}
        title={whatParticipantsGainContent.headline}
        titleId="what-participants-gain-heading"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3.5,
        }}
      >
        {whatParticipantsGainContent.gains.map((gain) => {
          const Icon = GAIN_ICONS[gain.icon as keyof typeof GAIN_ICONS] || VerifiedRoundedIcon;
          const badgeColor = gain.badgeColor;

          return (
            <Box
              key={gain.title}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 3.5, sm: 4 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[badgeColor].main, 0.22),
                boxShadow: (theme) => `0 10px 30px -8px ${alpha(theme.palette.grey[900], 0.06)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  borderColor: (theme) => theme.palette[badgeColor].main,
                  boxShadow: (theme) => `0 18px 36px -8px ${alpha(theme.palette[badgeColor].main, 0.22)}`,
                },
              }}
            >
              <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 54,
                    height: 54,
                    borderRadius: 3.5,
                    bgcolor: (theme) => alpha(theme.palette[badgeColor].main, 0.12),
                    color: (theme) => theme.palette[badgeColor].dark || theme.palette[badgeColor].main,
                  }}
                >
                  <Icon sx={{ fontSize: 28 }} />
                </Box>

                <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.25rem' }}>
                  {gain.title}
                </Typography>

                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {gain.description}
                </Typography>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
