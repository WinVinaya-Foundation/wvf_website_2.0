import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Link } from '@tanstack/react-router';
import { SectionContainer } from '../../components';
import { whatWeDo, type WhatWeDoCard } from '../../pages/home/homeContent';

const ICON_MAP: Record<WhatWeDoCard['icon'], typeof SchoolRoundedIcon> = {
  school: SchoolRoundedIcon,
  work: WorkRoundedIcon,
  handshake: HandshakeRoundedIcon,
  academy: AutoStoriesRoundedIcon,
};

export default function WhatWeDoSection() {
  return (
    <SectionContainer bgcolor="#F8FAFC" labelledBy="what-we-do-heading">
      <Box sx={{ position: 'relative' }}>
        {/* Background Ambient Flare */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: -60,
            left: '5%',
            width: { xs: 240, sm: 320, md: 400 },
            height: { xs: 240, sm: 320, md: 400 },
            borderRadius: '50%',
            background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.07)} 0%, transparent 70%)`,
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        {/* Section Header */}
        <Stack spacing={1.5} sx={{ textAlign: 'center', maxWidth: 740, mx: 'auto', mb: { xs: 3.5, sm: 5, md: 7 }, position: 'relative' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.75,
              px: { xs: 1.75, sm: 2.25 },
              py: 0.5,
              mx: 'auto',
              borderRadius: 50,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: { xs: 16, sm: 18 }, color: 'primary.main' }} />
            <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1.5, fontWeight: 700, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
              OUR CORE PILLARS
            </Typography>
          </Box>

          <Typography
            id="what-we-do-heading"
            variant="h2"
            component="h2"
            sx={{
              color: 'text.primary',
              fontWeight: 800,
              fontSize: { xs: '1.65rem', sm: '2.3rem', md: '3rem' },
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            What We Do
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.18rem' },
              lineHeight: 1.55,
              px: { xs: 1, sm: 0 },
            }}
          >
            Empowering persons with disabilities through inclusive skilling, corporate careers, and workplace inclusion.
          </Typography>
        </Stack>

        {/* 4 Pictorial Hero Cards Grid with Responsive Sizing */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
            gap: { xs: 2, sm: 2.5, md: 3.5 },
            position: 'relative',
          }}
        >
          {whatWeDo.map((card) => {
            const Icon = ICON_MAP[card.icon];

            return (
              <Box
                key={card.title}
                component={Link}
                to={card.to}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: { xs: '16px', sm: '20px', md: '24px' },
                  bgcolor: card.color,
                  p: { xs: 2.5, sm: 3, md: 4 },
                  minHeight: { xs: 230, sm: 270, md: 320 },
                  textDecoration: 'none',
                  boxShadow: `0 10px 28px -6px ${alpha(card.color, 0.45)}`,
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 20px 40px -6px ${alpha(card.color, 0.6)}`,
                    '& .pillar-icon': {
                      transform: 'scale(1.08) rotate(-4deg)',
                    },
                    '& .pillar-arrow': {
                      transform: 'translateX(6px)',
                    },
                  },
                }}
              >
                <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                  {/* Top Left Icon */}
                  <Box sx={{ pt: 0.5 }}>
                    <Icon
                      className="pillar-icon"
                      sx={{
                        fontSize: { xs: 46, sm: 60, md: 72 },
                        color: '#ffffff',
                        transition: 'transform 0.35s ease',
                      }}
                    />
                  </Box>

                  {/* Content: Title & Descriptor */}
                  <Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        color: '#ffffff',
                        fontWeight: 800,
                        mb: { xs: 0.75, sm: 1.25 },
                        lineHeight: 1.25,
                        fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.35rem' },
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha('#ffffff', 0.9),
                        lineHeight: 1.55,
                        fontSize: { xs: '0.875rem', sm: '0.925rem', md: '0.96rem' },
                      }}
                    >
                      {card.description}
                    </Typography>
                  </Box>
                </Stack>

                {/* Bottom Action CTA */}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center',
                    pt: { xs: 2, sm: 2.5, md: 3 },
                    mt: 2,
                    borderTop: '1px solid',
                    borderColor: alpha('#ffffff', 0.25),
                    color: '#ffffff',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.5, fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
                    Learn More
                  </Typography>
                  <ArrowForwardRoundedIcon className="pillar-arrow" sx={{ fontSize: { xs: 16, sm: 18 }, transition: 'transform 0.25s ease' }} />
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Box>
    </SectionContainer>
  );
}
