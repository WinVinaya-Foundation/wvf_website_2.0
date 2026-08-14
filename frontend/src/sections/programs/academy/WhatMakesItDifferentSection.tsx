import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SignLanguageRoundedIcon from '@mui/icons-material/SignLanguageRounded';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { whatMakesItDifferentContent } from '../../../pages/programs/academyContent';

const PILLAR_ICONS = [SignLanguageRoundedIcon, TouchAppRoundedIcon, CloudQueueRoundedIcon];
const COLOR_KEYS = ['primary', 'secondary', 'info'] as const;

export default function WhatMakesItDifferentSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="different-heading">
      <SectionHeading
        eyebrow={whatMakesItDifferentContent.eyebrow}
        title={whatMakesItDifferentContent.headline}
        titleId="different-heading"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3.5,
        }}
      >
        {whatMakesItDifferentContent.pillars.map((pillar, idx) => {
          const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
          const colorKey = COLOR_KEYS[idx % COLOR_KEYS.length];

          return (
            <Box
              key={pillar.title}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 3.5, sm: 4 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[colorKey].main, 0.2),
                boxShadow: (theme) => `0 10px 30px -8px ${alpha(theme.palette.grey[900], 0.06)}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  borderColor: (theme) => theme.palette[colorKey].main,
                  boxShadow: (theme) => `0 18px 36px -8px ${alpha(theme.palette[colorKey].main, 0.22)}`,
                  '& .pillar-badge-icon': {
                    transform: 'scale(1.1)',
                    bgcolor: (theme) => theme.palette[colorKey].main,
                    color: (theme) => theme.palette[colorKey].contrastText,
                  },
                },
              }}
            >
              <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
                <Box
                  className="pillar-badge-icon"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: 3.5,
                    bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.12),
                    color: (theme) => theme.palette[colorKey].dark || theme.palette[colorKey].main,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Icon sx={{ fontSize: 30 }} />
                </Box>

                <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.25 }}>
                  {pillar.title}
                </Typography>

                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {pillar.description}
                </Typography>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
