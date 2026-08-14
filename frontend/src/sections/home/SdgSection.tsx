import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { SectionContainer } from '../../components';
import { sdgContent } from '../../pages/home/homeContent';

/* Exact UN SDG Vector Icons matching the reference image */
const IndustrySdgIcon = (props: any) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 15L75 29V57L50 43V15Z" fill="white" opacity="0.95" />
    <path d="M50 15L25 29V57L50 43V15Z" fill="white" opacity="0.8" />
    <path d="M50 15L75 29L50 43L25 29L50 15Z" fill="white" />
    <path d="M25 43L50 57V85L25 71V43Z" fill="white" opacity="0.95" />
    <path d="M25 43L0 57V85L25 71V43Z" fill="white" opacity="0.8" />
    <path d="M25 43L50 57L25 71L0 57L25 43Z" fill="white" />
    <path d="M75 43L100 57V85L75 71V43Z" fill="white" opacity="0.95" />
    <path d="M75 43L50 57V85L75 71V43Z" fill="white" opacity="0.8" />
    <path d="M75 43L100 57L75 71L50 57L75 43Z" fill="white" />
  </svg>
);

const InequalitiesSdgIcon = (props: any) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 8L64 24H36L50 8Z" />
    <path d="M50 92L64 76H36L50 92Z" />
    <path d="M8 50L24 36V64L8 50Z" />
    <path d="M92 50L76 36V64L92 50Z" />
    <rect x="32" y="39" width="36" height="8" rx="2" />
    <rect x="32" y="53" width="36" height="8" rx="2" />
  </svg>
);

const PartnershipsSdgIcon = (props: any) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="6" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="36" r="20" />
    <circle cx="64" cy="48" r="20" />
    <circle cx="58" cy="66" r="20" />
    <circle cx="42" cy="66" r="20" />
    <circle cx="36" cy="48" r="20" />
  </svg>
);

const EducationSdgIcon = (props: any) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 32C24 28 38 28 47 34V76C38 70 24 70 10 73V32Z" />
    <path d="M84 32C70 28 56 28 47 34V76C56 70 70 70 84 73V32Z" />
    <path d="M90 30L94 30V68L92 74L90 68V30Z" />
  </svg>
);

const PovertySdgIcon = (props: any) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="28" cy="36" r="8" />
    <path d="M18 55C18 47 38 47 38 55V75H18V55Z" />
    <circle cx="48" cy="45" r="6" />
    <path d="M40 60C40 54 56 54 56 60V75H40V60Z" />
    <circle cx="68" cy="30" r="10" />
    <path d="M56 50C56 40 80 40 80 50V75H56V50Z" />
  </svg>
);

const GenderSdgIcon = (props: any) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="6.5" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="44" cy="54" r="22" />
    <path d="M60 38L82 16" strokeLinecap="round" />
    <path d="M64 16H82V34" strokeLinecap="round" />
    <path d="M44 76V94" strokeLinecap="round" />
    <path d="M34 86H54" strokeLinecap="round" />
    <line x1="34" y1="49" x2="54" y2="49" strokeWidth="5.5" />
    <line x1="34" y1="59" x2="54" y2="59" strokeWidth="5.5" />
  </svg>
);

const WorkSdgIcon = (props: any) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="25" y="55" width="16" height="35" rx="2" />
    <rect x="47" y="40" width="16" height="50" rx="2" />
    <rect x="69" y="25" width="16" height="65" rx="2" />
    <path d="M12 55L34 32L54 44L84 14" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <polygon points="68,14 86,12 84,30" fill="white" />
  </svg>
);

const SDG_ICONS = {
  industry: IndustrySdgIcon,
  equality: InequalitiesSdgIcon,
  partnerships: PartnershipsSdgIcon,
  education: EducationSdgIcon,
  poverty: PovertySdgIcon,
  gender: GenderSdgIcon,
  work: WorkSdgIcon,
};

const goalsList = [...sdgContent.goals, ...sdgContent.goals];

export default function SdgSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const step = scrollContainerRef.current.clientWidth < 600 ? 220 : 280;
          scrollContainerRef.current.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth < 600 ? 220 : 280;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <SectionContainer bgcolor="#EAEAEA" labelledBy="sdg-heading">
      {/* Top Row: Left Title & Right Description */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '6fr 6fr' },
          gap: { xs: 3, lg: 6 },
          alignItems: 'start',
          mb: { xs: 3, sm: 4, md: 5 },
        }}
      >
        {/* Left Column: Headline & Subheadline */}
        <Stack spacing={1}>
          <Typography
            id="sdg-heading"
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              color: '#4A1515',
              fontSize: { xs: '1.65rem', sm: '2.2rem', md: '2.75rem' },
              lineHeight: 1.2,
            }}
          >
            {sdgContent.headline}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              color: '#2B2B2B',
              fontWeight: 700,
              fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.18rem' },
              pt: 0.5,
            }}
          >
            {sdgContent.subheadline}
          </Typography>
        </Stack>

        {/* Right Column: Description */}
        <Box sx={{ pt: { xs: 0, lg: 0.5 } }}>
          <Typography
            variant="body1"
            sx={{
              color: '#333333',
              fontSize: { xs: '0.925rem', sm: '1rem', md: '1.05rem' },
              lineHeight: 1.65,
            }}
          >
            {sdgContent.rightDescription}
          </Typography>
        </Box>
      </Box>

      {/* Responsive Scrollable Track Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          pb: 2,
          pt: 1,
        }}
      >
        <Box
          ref={scrollContainerRef}
          onScroll={checkScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          sx={{
            display: 'flex',
            gap: { xs: 2, sm: 2.5, md: 3 },
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            py: 1,
            px: 0.5,
            /* Hide scrollbars cleanly */
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {goalsList.map((goal, index) => {
            const Icon = SDG_ICONS[goal.iconKey];

            return (
              <Box
                key={`${goal.title}-${index}`}
                sx={{
                  width: { xs: 210, sm: 245, md: 265 },
                  height: { xs: 230, sm: 255, md: 270 },
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderRadius: '16px',
                  bgcolor: goal.color,
                  p: { xs: 2.25, sm: 2.75, md: 3 },
                  boxShadow: `0 8px 20px -6px ${alpha(goal.color, 0.4)}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 16px 32px -6px ${alpha(goal.color, 0.55)}`,
                    '& .sdg-hero-icon': {
                      transform: 'scale(1.06)',
                    },
                  },
                }}
              >
                {/* Top Left Icon */}
                <Box
                  sx={{
                    width: { xs: 70, sm: 85, md: 95 },
                    height: { xs: 70, sm: 85, md: 95 },
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    pt: 0.5,
                  }}
                >
                  <Icon className="sdg-hero-icon" style={{ transition: 'transform 0.3s ease' }} />
                </Box>

                {/* Bottom Left Title */}
                <Typography
                  variant="subtitle2"
                  component="h3"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.1rem' },
                    lineHeight: 1.25,
                    letterSpacing: 0.3,
                    textAlign: 'left',
                    textTransform: 'uppercase',
                  }}
                >
                  {goal.title}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Bottom Circular Navigation Controls */}
      <Stack direction="row" spacing={2} sx={{ pt: 2, justifyContent: 'center' }}>
        <IconButton
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll SDGs left"
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1.5px solid #888888',
            color: '#333333',
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: '#333333',
              color: '#ffffff',
              borderColor: '#333333',
            },
            '&.Mui-disabled': { opacity: 0.3 },
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>

        <IconButton
          onClick={() => handleScroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll SDGs right"
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1.5px solid #888888',
            color: '#333333',
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: '#333333',
              color: '#ffffff',
              borderColor: '#333333',
            },
            '&.Mui-disabled': { opacity: 0.3 },
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>
    </SectionContainer>
  );
}
