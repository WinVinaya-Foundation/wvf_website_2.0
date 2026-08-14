import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkOffRoundedIcon from '@mui/icons-material/WorkOffRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { programNeedContent } from '../../../pages/programs/ourProgramsContent';

const STAT_ICONS = [
  GroupsRoundedIcon,
  SchoolRoundedIcon,
  TrendingDownRoundedIcon,
  WorkOffRoundedIcon,
];

export default function NeedSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="program-need-heading">
      <Box
        sx={{
          borderRadius: { xs: 4, md: 5 },
          p: { xs: 3.5, sm: 5, md: 6 },
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.04),
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.16),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.06)}`,
        }}
      >
        <SectionHeading
          eyebrow={programNeedContent.eyebrow}
          title={programNeedContent.headline}
          titleId="program-need-heading"
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
            gap: { xs: 4, lg: 6 },
            alignItems: 'center',
          }}
        >
          <Stack spacing={2.5}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                lineHeight: 1.75,
              }}
            >
              {programNeedContent.body}
            </Typography>

            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
                borderLeft: '4px solid',
                borderColor: 'secondary.main',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.dark', mb: 0.5 }}>
                Closing the Opportunity Gap
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                We empower candidates with market-relevant tech and business automation expertise to secure dignified, high-growth employment in mainstream industries.
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
            }}
          >
            {programNeedContent.stats.map((stat, idx) => {
              const Icon = STAT_ICONS[idx % STAT_ICONS.length];
              const colorKeys = ['primary', 'secondary', 'warning', 'info'] as const;
              const colorKey = colorKeys[idx % colorKeys.length];

              return (
                <Box
                  key={stat.label}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette[colorKey].main, 0.2),
                    boxShadow: (theme) => `0 8px 24px -6px ${alpha(theme.palette.grey[900], 0.06)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      borderColor: (theme) => theme.palette[colorKey].main,
                      boxShadow: (theme) => `0 14px 28px -6px ${alpha(theme.palette[colorKey].main, 0.2)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.12),
                      color: (theme) => theme.palette[colorKey].dark || theme.palette[colorKey].main,
                      mb: 1.5,
                    }}
                  >
                    <Icon sx={{ fontSize: 22 }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.1, mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', lineHeight: 1.3 }}>
                    {stat.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  );
}
