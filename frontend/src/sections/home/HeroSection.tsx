import { useState, useEffect, useCallback } from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../components';
import { heroContent, impactCounters } from '../../pages/home/homeContent';
import StatTile from './StatTile';
import heroBg1 from '../../assets/hero/margadarshan.png';
import heroBg2 from '../../assets/hero/nammajobathon.png';
import heroBg3 from '../../assets/hero/nish_jobmela_akila_speech.png';
import heroBg4 from '../../assets/hero/margadarshan_discussion.png';
import heroBg5 from '../../assets/hero/nammajobathon_interview.png';

const heroImages = [
  { src: heroBg1, label: 'Hero Slide 1' },
  { src: heroBg2, label: 'Hero Slide 2' },
  { src: heroBg3, label: 'Hero Slide 3' },
  { src: heroBg4, label: 'Hero Slide 4' },
  { src: heroBg5, label: 'Hero Slide 5' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 560, sm: 620, md: 680 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background Image Carousel */}
      {heroImages.map((image, index) => (
        <Box
          key={image.src}
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${image.src})`,
            backgroundSize: 'cover',
            backgroundPosition: '40% 30%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: 0,
          }}
        />
      ))}

      {/* Gradient Overlay for Readability */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: (theme) =>
            `linear-gradient(100deg, ${alpha(theme.palette.grey[900], 0.94)} 0%, ${alpha(theme.palette.grey[900], 0.78)} 30%, ${alpha(theme.palette.grey[900], 0.2)} 48%)`,
        }}
      />

      <SectionContainer bgcolor="transparent">
        <Stack
          spacing={3}
          sx={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 640,
            py: { xs: 2, md: 4 },
            pl: { xs: 0, sm: 2, md: 4, lg: 7 },
            pr: { xs: 0, sm: 2, md: 4, lg: 7 },
          }}
        >
          <Typography variant="h1" sx={{ color: 'common.white' }}>
            {heroContent.headline}
          </Typography>
          <Typography variant="h6" component="p" sx={{ fontWeight: 400, color: alpha('#FFFFFF', 0.85) }}>
            {heroContent.subheadline}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flexWrap: 'wrap' }}>
            <Button component={Link} to={heroContent.ctas[0].to} variant="contained" color="secondary" size="large">
              {heroContent.ctas[0].label}
            </Button>
            <Button
              component={Link}
              to={heroContent.ctas[1].to}
              variant="outlined"
              size="large"
              sx={{
                color: 'common.white',
                borderColor: alpha('#FFFFFF', 0.6),
                '&:hover': { borderColor: 'common.white', bgcolor: alpha('#FFFFFF', 0.08) },
              }}
            >
              {heroContent.ctas[1].label}
            </Button>
            <Button
              component={Link}
              to={heroContent.ctas[2].to}
              variant="text"
              size="large"
              sx={{ color: 'common.white', '&:hover': { bgcolor: alpha('#FFFFFF', 0.08) } }}
            >
              {heroContent.ctas[2].label}
            </Button>
          </Stack>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: { xs: 3, sm: 5 }, pt: 2, maxWidth: 480 }}>
            {impactCounters.map((counter) => (
              <StatTile key={counter.label} value={counter.value} suffix={counter.suffix} label={counter.label} color="common.white" />
            ))}
          </Box>

          {/* Candidate Registration Button */}
          <Box sx={{ pt: 1 }}>
            <Button
              component="a"
              href="https://crm.winvinaya.com/candidate-registration"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              endIcon={<OpenInNewRoundedIcon />}
              sx={{
                bgcolor: '#7A1C14',
                color: '#ffffff',
                fontWeight: 800,
                py: 1.4,
                px: 5.5,
                minWidth: { xs: '100%', sm: 300 },
                borderRadius: 1,
                boxShadow: '0 8px 24px -4px rgba(122, 28, 20, 0.55)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  bgcolor: '#96231A',
                  boxShadow: '0 12px 32px -4px rgba(122, 28, 20, 0.75)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Register as Candidate
            </Button>
          </Box>
        </Stack>
      </SectionContainer>

      {/* Carousel Navigation Controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 24,
          right: { xs: 16, sm: 32, md: 48 },
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: alpha('#000000', 0.4),
          backdropFilter: 'blur(4px)',
          borderRadius: 4,
          px: 1.5,
          py: 0.5,
        }}
      >
        <IconButton
          onClick={handlePrev}
          size="small"
          aria-label="Previous slide"
          sx={{ color: 'common.white', '&:hover': { bgcolor: alpha('#FFFFFF', 0.16) } }}
        >
          <ChevronLeftRoundedIcon fontSize="small" />
        </IconButton>

        {heroImages.map((img, idx) => (
          <Box
            key={img.src}
            onClick={() => setCurrentIndex(idx)}
            role="button"
            tabIndex={0}
            aria-label={`Go to slide ${idx + 1}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setCurrentIndex(idx);
              }
            }}
            sx={{
              width: idx === currentIndex ? 20 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: idx === currentIndex ? 'primary.main' : alpha('#FFFFFF', 0.5),
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': { bgcolor: idx === currentIndex ? 'primary.main' : 'common.white' },
            }}
          />
        ))}

        <IconButton
          onClick={handleNext}
          size="small"
          aria-label="Next slide"
          sx={{ color: 'common.white', '&:hover': { bgcolor: alpha('#FFFFFF', 0.16) } }}
        >
          <ChevronRightRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

