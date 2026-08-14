import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../../components';
import { signLanguageHero } from '../../../pages/involve/signLanguageContent';

/** Combined Hero for the Get Sensitized / Learn Sign Language page — offers both paths up front */
export default function SignLanguageHeroSection() {
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
          background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.14)} 0%, transparent 70%)`,
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
          background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.info.main, 0.14)} 0%, transparent 70%)`,
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <SectionContainer labelledBy="sign-language-hero-heading">
        <Stack spacing={3.5} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 860, mx: 'auto' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.25,
              py: 0.75,
              borderRadius: 50,
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
            }}
          >
            <AccessibilityNewRoundedIcon sx={{ fontSize: 18, color: 'secondary.dark' }} />
            <Typography variant="overline" sx={{ color: 'secondary.dark', letterSpacing: 1.5, fontWeight: 700 }}>
              {signLanguageHero.eyebrow}
            </Typography>
          </Box>

          <Typography
            id="sign-language-hero-heading"
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1.15,
              color: 'text.primary',
            }}
          >
            {signLanguageHero.headline}
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
            {signLanguageHero.subheadline}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Button
              component={Link}
              to={signLanguageHero.ctas[0].to}
              variant="contained"
              color="secondary"
              size="large"
              sx={{ py: 1.5, px: 3.5, borderRadius: 3, fontWeight: 800 }}
            >
              {signLanguageHero.ctas[0].label}
            </Button>
            <Button
              component={Link}
              to={signLanguageHero.ctas[1].to}
              variant="contained"
              color="info"
              size="large"
              sx={{ py: 1.5, px: 3.5, borderRadius: 3, fontWeight: 800 }}
            >
              {signLanguageHero.ctas[1].label}
            </Button>
          </Stack>
        </Stack>
      </SectionContainer>
    </Box>
  );
}
