import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import { SectionContainer } from '../../../components';
import { businessCase } from '../../../pages/involve/corporateEngagementContent';

/** Business Case Section framing India's PWD employment gap as an overlooked talent pool */
export default function BusinessCaseSection() {
  return (
    <SectionContainer labelledBy="business-case-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.22),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.3fr 1fr' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'center',
        }}
      >
        <Stack spacing={3}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                color: 'primary.dark',
              }}
            >
              <InsightsRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.875rem' }}>
              {businessCase.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="business-case-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {businessCase.headline}
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
            {businessCase.body}
          </Typography>
        </Stack>

        {/* Dual Stat Spotlight Card */}
        <Stack spacing={2.5}>
          {businessCase.stats.map((stat, index) => (
            <Box
              key={stat.value}
              sx={{
                p: { xs: 3, sm: 3.5 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[index === 0 ? 'primary' : 'secondary'].main, 0.28),
                boxShadow: (theme) => `0 12px 32px -12px ${alpha(theme.palette.grey[900], 0.12)}`,
              }}
            >
              <Typography
                variant="h2"
                component="div"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.4rem', sm: '2.75rem' },
                  lineHeight: 1,
                  color: index === 0 ? 'primary.dark' : 'secondary.dark',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, fontWeight: 600, lineHeight: 1.5 }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </SectionContainer>
  );
}
