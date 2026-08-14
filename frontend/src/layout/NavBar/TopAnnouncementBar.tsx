import { useEffect, useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { brand } from '../../theme/brand';

const announcementPulse = keyframes`
  0% { opacity: 0.4; transform: scale(0.85); }
  50% { opacity: 1; transform: scale(1.25); }
  100% { opacity: 0.4; transform: scale(0.85); }
`;

const ANNOUNCEMENTS = [
  '🎓 Free Skilling in Full Stack Dev, RPA, Data Viz & Testing with ISL Support',
  '🤝 Samarth MSME Initiative — Enabling Inclusive Workplace Hiring Across India',
  '🏆 4,500+ Scholars Trained & 3,200+ Candidates Placed with 60+ Corporate Partners',
  '📖 WinVinaya Academy — Free Self-Paced E-Learning & 1-on-1 Industry Mentorship',
];

export default function TopAnnouncementBar() {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const scroll = (now: number) => {
      const delta = now - lastTime;
      if (delta >= 16) {
        lastTime = now;
        if (marqueeRef.current && !isMarqueePaused) {
          const el = marqueeRef.current;
          el.scrollLeft += 1.2;
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft = 0;
          }
        }
      }
      animId = requestAnimationFrame(scroll);
    };

    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [isMarqueePaused]);

  return (
    <Box
      sx={{
        background: `linear-gradient(90deg, ${brand.maroon} 0%, ${alpha(brand.maroon, 0.95)} 35%, ${alpha(brand.maroon, 0.98)} 70%, ${brand.maroon} 100%)`,
        color: 'common.white',
        py: { xs: 0.65, sm: 0.75 },
        px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid',
        borderColor: (theme) => alpha(theme.palette.common.white, 0.08),
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: (theme) =>
            `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0)} 0%, ${alpha(theme.palette.primary.main, 0.7)} 25%, ${alpha(theme.palette.secondary.main, 0.75)} 50%, ${alpha(theme.palette.primary.main, 0.7)} 75%, ${alpha(theme.palette.primary.main, 0)} 100%)`,
        },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 0.75, md: 1.5 }}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Side: Smooth Right-to-Left Program News Marquee Track */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            minWidth: 0,
            maxWidth: { md: '60%', lg: '65%' },
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              px: 1,
              py: 0.2,
              borderRadius: 5,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.18),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.35),
              color: 'primary.light',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: 0.8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              textTransform: 'uppercase',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'primary.light',
                animation: `${announcementPulse} 1.8s infinite ease-in-out`,
              }}
            />
            Latest Updates
          </Box>

          <Box
            ref={marqueeRef}
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
            onTouchStart={() => setIsMarqueePaused(true)}
            onTouchEnd={() => setIsMarqueePaused(false)}
            sx={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              width: '100%',
              position: 'relative',
              maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                gap: 5,
                width: 'max-content',
                flexShrink: 0,
                py: 0.25,
              }}
            >
              {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS, ...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((item, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  component="span"
                  sx={{
                    fontWeight: 600,
                    color: 'common.white',
                    fontSize: { xs: '0.78rem', sm: '0.85rem' },
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  {item}
                  <Box component="span" sx={{ color: (theme) => alpha(theme.palette.primary.main, 0.5), ml: 1 }}>
                    •
                  </Box>
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right Side: Candidate Registration with Descriptive Label */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexShrink: 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: (theme) => alpha(theme.palette.common.white, 0.88),
              fontSize: { xs: '0.75rem', sm: '0.82rem' },
              fontWeight: 500,
              display: { xs: 'none', sm: 'inline' },
              whiteSpace: 'nowrap',
            }}
          >
            For Skilling & Placement Support:
          </Typography>

          <Box
            component="a"
            href="https://crm.winvinaya.com/candidate-registration"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              color: 'common.white',
              fontWeight: 750,
              textDecoration: 'none',
              fontSize: { xs: '0.78rem', sm: '0.84rem' },
              px: 1.75,
              py: 0.35,
              borderRadius: 50,
              background: (theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.25)} 0%, ${alpha(theme.palette.primary.main, 0.35)} 100%)`,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.light, 0.45),
              boxShadow: (theme) => `0 2px 10px ${alpha(theme.palette.primary.main, 0.18)}`,
              backdropFilter: 'blur(6px)',
              whiteSpace: 'nowrap',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: (theme) =>
                  `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.4)} 0%, ${alpha(theme.palette.primary.main, 0.55)} 100%)`,
                borderColor: (theme) => alpha(theme.palette.primary.light, 0.75),
                color: 'common.white',
                transform: 'translateY(-1px)',
                boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
                '& .reg-arrow': {
                  transform: 'translateX(2px) translateY(-2px)',
                },
              },
            }}
          >
            Register as Candidate
            <OpenInNewRoundedIcon className="reg-arrow" sx={{ fontSize: 13, transition: 'transform 0.2s ease' }} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
