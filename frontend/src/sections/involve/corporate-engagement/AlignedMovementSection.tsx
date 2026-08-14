import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { SectionContainer } from '../../../components';
import { alignedMovement } from '../../../pages/involve/corporateEngagementContent';

/** Aligned With a National Movement Section — ties corporate partnership to the foundation's broader mission */
export default function AlignedMovementSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="aligned-movement-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 55%, #1F4A16 100%)`,
          color: 'common.white',
          boxShadow: (theme) => `0 24px 56px -16px ${alpha(theme.palette.secondary.dark, 0.5)}`,
        }}
      >
        {/* Ambient decorative glows */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: -120,
            right: '15%',
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.3)} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            bottom: -150,
            left: '10%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.common.white, 0.12)} 0%, transparent 70%)`,
            filter: 'blur(70px)',
            pointerEvents: 'none',
          }}
        />

        <Stack spacing={3} sx={{ position: 'relative', zIndex: 1, alignItems: 'center', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.25,
              py: 0.75,
              borderRadius: 50,
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.14),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.common.white, 0.3),
              backdropFilter: 'blur(8px)',
            }}
          >
            <PublicRoundedIcon sx={{ fontSize: 18, color: '#FFC670' }} />
            <Typography variant="overline" sx={{ color: 'common.white', fontWeight: 800, letterSpacing: 1.5 }}>
              {alignedMovement.eyebrow}
            </Typography>
          </Box>

          <Typography
            id="aligned-movement-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
              lineHeight: 1.2,
              color: 'common.white',
            }}
          >
            {alignedMovement.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.05rem', sm: '1.15rem' },
              lineHeight: 1.8,
              color: (theme) => alpha(theme.palette.common.white, 0.88),
              fontWeight: 400,
            }}
          >
            {alignedMovement.body}
          </Typography>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
