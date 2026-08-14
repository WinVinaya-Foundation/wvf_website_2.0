import { useRef, type ReactNode } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export interface CarouselProps {
  children: ReactNode[];
  ariaLabel: string;
}

export default function Carousel({ children, ariaLabel }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>('[data-carousel-item]');
    const amount = card ? card.offsetWidth + 24 : node.clientWidth * 0.8;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollBy({ left: amount * direction, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <Box sx={{ position: 'relative' }} role="region" aria-label={ariaLabel}>
      <Box
        ref={trackRef}
        tabIndex={0}
        aria-label={`${ariaLabel}, scrollable`}
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          pb: 1,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          '&:focus-visible': {
            outline: (theme) => `2px solid ${theme.palette.primary.dark}`,
            outlineOffset: 2,
          },
        }}
      >
        {children.map((child, index) => (
          <Box key={index} data-carousel-item sx={{ scrollSnapAlign: 'start', flex: '0 0 auto' }}>
            {child}
          </Box>
        ))}
      </Box>
      {/* Always rendered — not just on hover/pointer devices — so keyboard users and anyone
          zoomed/magnified into a narrow effective viewport (common for low-vision users) keep
          working controls instead of relying on touch-only swipe. */}
      <IconButton
        onClick={() => scrollByCard(-1)}
        aria-label="Previous"
        sx={{
          position: 'absolute',
          top: '50%',
          left: -8,
          transform: 'translateY(-50%)',
          zIndex: 1,
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.shadows[3],
          '&:hover': { bgcolor: 'background.paper' },
        }}
      >
        <ChevronLeftRoundedIcon />
      </IconButton>
      <IconButton
        onClick={() => scrollByCard(1)}
        aria-label="Next"
        sx={{
          position: 'absolute',
          top: '50%',
          right: -8,
          transform: 'translateY(-50%)',
          zIndex: 1,
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.shadows[3],
          '&:hover': { bgcolor: 'background.paper' },
        }}
      >
        <ChevronRightRoundedIcon />
      </IconButton>
    </Box>
  );
}
