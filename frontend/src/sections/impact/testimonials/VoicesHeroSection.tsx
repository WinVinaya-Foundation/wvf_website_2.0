import { Box, Chip, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { SectionContainer } from '../../../components';
import { voicesHero } from '../../../pages/impact/testimonialsContent';
import heroImg1 from '../../../assets/hero/margadarshan.png';
import heroImg2 from '../../../assets/hero/nammajobathon.png';
import heroImg3 from '../../../assets/hero/nish_jobmela_akila_speech.png';
import heroImg4 from '../../../assets/hero/margadarshan_discussion.png';
import heroImg5 from '../../../assets/hero/nammajobathon_interview.png';

const collageImages = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];

/** Modernized Hero section with vibrant pill badge, ambient lighting, and rich photography scrim */
export default function VoicesHeroSection() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'background.default', py: { xs: 6, md: 9 } }}>
      {/* Background collage with soft blur */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)' },
          opacity: { xs: 0.22, md: 0.35 },
          filter: 'blur(8px) saturate(0.9)',
        }}
      >
        {collageImages.map((src) => (
          <Box
            key={src}
            component="img"
            src={src}
            alt=""
            sx={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: { xs: 160, md: 240 } }}
          />
        ))}
      </Box>

      {/* Scrim and ambient glowing accent orbs */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          background: (theme) =>
            `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.65)} 0%, ${theme.palette.background.default} 90%)`,
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          borderRadius: '50%',
          background: (theme) =>
            `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`,
          pointerEvents: 'none',
        }}
      />

      <SectionContainer>
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 800, mx: 'auto', position: 'relative', zIndex: 1 }}>
          <Chip
            icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '18px !important', color: 'primary.dark' }} />}
            label="Real Stories & Impact"
            sx={{
              fontWeight: 700,
              fontSize: '0.875rem',
              py: 0.75,
              px: 1,
              borderRadius: 5,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
              color: 'primary.dark',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
              boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.15)}`,
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'text.primary',
            }}
          >
            {voicesHero.headline}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: 400,
              color: 'text.secondary',
              fontSize: { xs: '1.05rem', md: '1.25rem' },
              lineHeight: 1.6,
              maxWidth: 680,
            }}
          >
            {voicesHero.subheadline}
          </Typography>
        </Stack>
      </SectionContainer>
    </Box>
  );
}

