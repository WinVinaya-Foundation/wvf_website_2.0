import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { SectionContainer } from '../../../components';
import { whyThisMatters } from '../../../pages/impact/certificationsContent';

/** Why This Matters Section highlighting donor & corporate partner benefits of verified compliance */
export default function WhyThisMattersSection() {
  return (
    <SectionContainer labelledBy="why-matters-heading">
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
        }}
      >
        <Stack spacing={4} sx={{ maxWidth: 860, mb: 5 }}>
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
              <SecurityRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.875rem' }}>
              {whyThisMatters.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="why-matters-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {whyThisMatters.headline}
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
            {whyThisMatters.body}
          </Typography>
        </Stack>

        {/* Dual Pillar Cards: Donors vs Corporate Partners */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 2.5,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
                  color: 'primary.main',
                }}
              >
                <FavoriteRoundedIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
                For Donors
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
              <CheckCircleRoundedIcon sx={{ color: 'success.main', fontSize: 22, mt: 0.2, flexShrink: 0 }} />
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, fontWeight: 500 }}>
                {whyThisMatters.donorPoint}
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
              boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 2.5,
                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.14),
                  color: 'secondary.main',
                }}
              >
                <BusinessRoundedIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
                For Corporate Partners
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
              <CheckCircleRoundedIcon sx={{ color: 'success.main', fontSize: 22, mt: 0.2, flexShrink: 0 }} />
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, fontWeight: 500 }}>
                {whyThisMatters.corporatePoint}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </SectionContainer>
  );
}

