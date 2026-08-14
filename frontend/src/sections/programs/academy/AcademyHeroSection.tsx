import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../../components';
import { academyHeroContent } from '../../../pages/programs/academyContent';

export default function AcademyHeroSection() {
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

      <SectionContainer>
        <Stack spacing={3.5} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 840, mx: 'auto' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2.5,
              py: 0.85,
              borderRadius: 50,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
              boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.12)}`,
            }}
          >
            <EmojiEventsRoundedIcon sx={{ fontSize: 20, color: 'primary.dark' }} />
            <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1, fontWeight: 700 }}>
              {academyHeroContent.awardBadge}
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1.15,
              color: 'text.primary',
            }}
          >
            {academyHeroContent.headline}
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
            {academyHeroContent.subheadline}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SchoolRoundedIcon />}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ py: 1.5, px: 3.5, borderRadius: 3, fontWeight: 800 }}
            >
              Enroll in WinVinaya Academy
            </Button>
            <Button
              component={Link}
              to="/donate"
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ py: 1.5, px: 3.5, borderRadius: 3, fontWeight: 700 }}
            >
              Support Our Mission
            </Button>
          </Stack>
        </Stack>
      </SectionContainer>
    </Box>
  );
}
