import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { whatYouWillGain } from '../../../pages/involve/internshipsContent';

const gainIcons = [
  VisibilityRoundedIcon,
  PeopleAltRoundedIcon,
  RecordVoiceOverRoundedIcon,
  AutoAwesomeRoundedIcon,
];

const gainAccents = ['primary', 'secondary', 'info', 'primary'] as const;

/** What You'll Gain Section featuring 4 foundational pillars of interning at WinVinaya */
export default function WhatYouWillGainSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="gain-heading">
      <SectionHeading
        eyebrow="Core Benefits"
        title={whatYouWillGain.headline}
        description={whatYouWillGain.description}
        align="center"
        titleId="gain-heading"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 3.5,
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        {whatYouWillGain.pillars.map((pillar, index) => {
          const Icon = gainIcons[index % gainIcons.length];
          const accent = gainAccents[index % gainAccents.length];

          return (
            <Box
              key={pillar.title}
              sx={{
                p: { xs: 3.5, sm: 4 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[accent].main, 0.22),
                boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => `0 16px 36px -12px ${alpha(theme.palette[accent].main, 0.22)}`,
                },
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 46,
                    height: 46,
                    borderRadius: 3,
                    bgcolor: (theme) => alpha(theme.palette[accent].main, 0.14),
                    color: `${accent}.dark`,
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ fontSize: 26 }} />
                </Box>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.2rem' }}>
                  {pillar.title}
                </Typography>
              </Stack>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '1rem' }}>
                {pillar.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
