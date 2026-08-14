import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Button, SectionContainer } from '../../components';
import { donateHero } from '../../pages/donate/donateContent';

/** Donate Hero Section — custom (not PageHero, which has no CTA slot), with an in-page anchor
 * CTA down to the donation form, following EventsGalleryHeroSection's `href="#..."` precedent. */
export default function DonateHeroSection() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'background.paper', py: { xs: 4, md: 6 } }}>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -120,
          left: '18%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.14)} 0%, transparent 70%)`,
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -140,
          right: '12%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.12)} 0%, transparent 70%)`,
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <SectionContainer labelledBy="donate-hero-heading">
        <Stack spacing={3.5} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 860, mx: 'auto' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.25,
              py: 0.75,
              borderRadius: 50,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
            }}
          >
            <VolunteerActivismRoundedIcon sx={{ fontSize: 18, color: 'primary.dark' }} />
            <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1.5, fontWeight: 700 }}>
              {donateHero.eyebrow}
            </Typography>
          </Box>

          <Typography
            id="donate-hero-heading"
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1.15,
              color: 'text.primary',
            }}
          >
            {donateHero.headline}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: 400,
              color: 'text.secondary',
              fontSize: { xs: '1.05rem', sm: '1.2rem' },
              lineHeight: 1.65,
              maxWidth: 780,
            }}
          >
            {donateHero.subheadline}
          </Typography>

          <Stack sx={{ pt: 1 }}>
            <Button
              component="a"
              href={donateHero.cta.to}
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ py: 1.5, px: 4, borderRadius: 3, fontWeight: 800 }}
            >
              {donateHero.cta.label}
            </Button>
          </Stack>
        </Stack>
      </SectionContainer>
    </Box>
  );
}
