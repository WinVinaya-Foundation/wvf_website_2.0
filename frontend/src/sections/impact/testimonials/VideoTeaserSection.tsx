import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../../components';
import { videoTeaser } from '../../../pages/impact/testimonialsContent';

/** Modernized video teaser section with vibrant gradient background and animated CTA button */
export default function VideoTeaserSection() {
  return (
    <SectionContainer labelledBy="video-teaser-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 3,
          p: { xs: 4, md: 5 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0.92)} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'common.white',
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.secondary.dark, 0.4)}`,
        }}
      >
        {/* Background decorative glow */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: (theme) => alpha(theme.palette.common.white, 0.08),
            pointerEvents: 'none',
          }}
        />

        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <Box
            aria-hidden="true"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              flexShrink: 0,
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.18),
              backdropFilter: 'blur(8px)',
              color: 'common.white',
              boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.common.black, 0.2)}`,
              transition: 'transform 0.3s ease',
              '& svg': { fontSize: 40 },
              '&:hover': { transform: 'scale(1.08)' },
            }}
          >
            <PlayCircleFilledRoundedIcon />
          </Box>
          <Box>
            <Typography id="video-teaser-heading" variant="h4" component="h2" sx={{ fontWeight: 800, color: 'common.white' }}>
              {videoTeaser.headline}
            </Typography>
            <Typography variant="body1" sx={{ color: (theme) => alpha(theme.palette.common.white, 0.85), mt: 0.5, fontSize: '1.05rem' }}>
              {videoTeaser.body}
            </Typography>
          </Box>
        </Stack>

        <Button
          component={Link}
          to={videoTeaser.link.to}
          variant="contained"
          size="large"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            flexShrink: 0,
            fontWeight: 800,
            px: 3.5,
            py: 1.5,
            borderRadius: 3,
            bgcolor: 'common.white',
            color: 'secondary.dark',
            position: 'relative',
            zIndex: 1,
            boxShadow: (theme) => `0 8px 20px ${alpha(theme.palette.common.black, 0.2)}`,
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.92),
              transform: 'translateY(-2px)',
            },
          }}
        >
          {videoTeaser.link.label}
        </Button>
      </Box>
    </SectionContainer>
  );
}

