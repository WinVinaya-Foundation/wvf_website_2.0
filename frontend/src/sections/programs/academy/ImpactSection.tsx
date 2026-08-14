import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { impactSoFarContent } from '../../../pages/programs/academyContent';

const STAT_ICONS = [
  SchoolRoundedIcon,
  PublicRoundedIcon,
  CategoryRoundedIcon,
  BusinessRoundedIcon,
];

const COLOR_KEYS = ['primary', 'secondary', 'warning', 'info'] as const;

export default function ImpactSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="academy-impact-heading">
      <Box
        sx={{
          borderRadius: { xs: 4, md: 5 },
          p: { xs: 3.5, sm: 5, md: 6 },
          bgcolor: (theme) => alpha(theme.palette.info.main, 0.04),
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.info.main, 0.16),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.06)}`,
        }}
      >
        <SectionHeading
          eyebrow={impactSoFarContent.eyebrow}
          title={impactSoFarContent.headline}
          titleId="academy-impact-heading"
        />

        <Stack spacing={4}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 2.5,
            }}
          >
            {impactSoFarContent.stats.map((stat, idx) => {
              const Icon = STAT_ICONS[idx % STAT_ICONS.length];
              const colorKey = COLOR_KEYS[idx % COLOR_KEYS.length];

              return (
                <Box
                  key={stat.label}
                  sx={{
                    p: 3,
                    borderRadius: 3.5,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette[colorKey].main, 0.2),
                    boxShadow: (theme) => `0 8px 24px -6px ${alpha(theme.palette.grey[900], 0.05)}`,
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
                      width: 46,
                      height: 46,
                      borderRadius: 2.5,
                      bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.12),
                      color: (theme) => theme.palette[colorKey].dark || theme.palette[colorKey].main,
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 24 }} />
                  </Box>

                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.1, mb: 0.75 }}>
                    {stat.value}
                  </Typography>

                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', lineHeight: 1.35 }}>
                    {stat.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ pt: 1 }}>
            <Typography variant="overline" sx={{ color: 'info.dark', fontWeight: 700, display: 'block', mb: 1.5, letterSpacing: 1 }}>
              Top Employers Hiring Academy Graduates
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {impactSoFarContent.placements.map((company) => (
                <Box
                  key={company}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2.25,
                    py: 1,
                    borderRadius: 50,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette.info.main, 0.25),
                  }}
                >
                  <BusinessRoundedIcon sx={{ fontSize: 18, color: 'info.main' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {company}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
