import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Chip, SectionContainer, SectionHeading } from '../../../components';
import { whatYouCanLearnContent } from '../../../pages/programs/academyContent';

const COURSE_ICONS = [
  CodeRoundedIcon,
  AccountBalanceRoundedIcon,
  BarChartRoundedIcon,
  RecordVoiceOverRoundedIcon,
];

const COLOR_KEYS = ['primary', 'secondary', 'info', 'warning'] as const;

export default function WhatYouCanLearnSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="what-you-can-learn-heading">
      <SectionHeading
        eyebrow={whatYouCanLearnContent.eyebrow}
        title={whatYouCanLearnContent.headline}
        description={whatYouCanLearnContent.body}
        titleId="what-you-can-learn-heading"
      />

      <Stack spacing={4}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3.5,
          }}
        >
          {whatYouCanLearnContent.courses.map((course, idx) => {
            const Icon = COURSE_ICONS[idx % COURSE_ICONS.length];
            const colorKey = COLOR_KEYS[idx % COLOR_KEYS.length];

            return (
              <Box
                key={course.title}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: (theme) => alpha(theme.palette[colorKey].main, 0.2),
                  boxShadow: (theme) => `0 10px 30px -8px ${alpha(theme.palette.grey[900], 0.06)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: (theme) => theme.palette[colorKey].main,
                    boxShadow: (theme) => `0 16px 36px -8px ${alpha(theme.palette[colorKey].main, 0.2)}`,
                  },
                }}
              >
                <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
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
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 26 }} />
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.25rem' }}>
                      {course.title}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {course.description}
                  </Typography>

                  <Box sx={{ pt: 1 }}>
                    <Typography variant="overline" sx={{ color: `${colorKey}.dark`, fontWeight: 700, display: 'block', mb: 1.25, letterSpacing: 1 }}>
                      Topics & Modules
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {course.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          color={colorKey}
                          variant="filled"
                        />
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            p: 2.5,
            borderRadius: 50,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 20, color: 'primary.dark' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.dark' }}>
            {whatYouCanLearnContent.footnote}
          </Typography>
        </Box>
      </Stack>
    </SectionContainer>
  );
}
