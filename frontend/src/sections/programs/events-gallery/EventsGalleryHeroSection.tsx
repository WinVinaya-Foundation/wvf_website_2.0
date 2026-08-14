import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import { Button, SectionContainer } from '../../../components';
import { eventsGalleryHeroContent } from '../../../pages/programs/eventsGalleryContent';

export default function EventsGalleryHeroSection() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'background.paper', py: { xs: 4, md: 6 } }}>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -130,
          left: '12%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.16)} 0%, transparent 70%)`,
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -60,
          right: '8%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.info.main, 0.14)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -150,
          left: '35%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.13)} 0%, transparent 70%)`,
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
              gap: 1,
              px: 2.25,
              py: 0.75,
              borderRadius: 50,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
            }}
          >
            <CelebrationRoundedIcon sx={{ fontSize: 18, color: 'primary.dark' }} />
            <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1.5, fontWeight: 700 }}>
              {eventsGalleryHeroContent.eyebrow}
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
            {eventsGalleryHeroContent.headline}
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
            {eventsGalleryHeroContent.subheadline}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Button
              component="a"
              href="#upcoming-events"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<EventRoundedIcon />}
              sx={{ py: 1.5, px: 3.5, borderRadius: 3, fontWeight: 800 }}
            >
              See Upcoming Events
            </Button>
            <Button
              component="a"
              href="#gallery"
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<PhotoLibraryRoundedIcon />}
              sx={{ py: 1.5, px: 3.5, borderRadius: 3, fontWeight: 700 }}
            >
              Browse the Gallery
            </Button>
          </Stack>
        </Stack>
      </SectionContainer>
    </Box>
  );
}
