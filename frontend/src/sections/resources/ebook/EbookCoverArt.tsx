import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import type { ResponsiveStyleValue } from '@mui/system';

export type EbookAccent = 'primary' | 'secondary' | 'info';

export interface EbookCoverArtProps {
  accent: EbookAccent;
  year: string;
  height?: ResponsiveStyleValue<number | string>;
  iconSize?: number;
}

/** Abstract cover art for an eBook. Real cover artwork isn't available yet, so this stands in as
 * an honest, on-brand placeholder rather than a fabricated image. */
export default function EbookCoverArt({ accent, year, height = '100%', iconSize = 56 }: EbookCoverArtProps) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height,
        background: (theme) => `linear-gradient(135deg, ${theme.palette[accent].dark} 0%, ${theme.palette[accent].main} 100%)`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: (theme) => `radial-gradient(${alpha(theme.palette.common.white, 0.18)} 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '-30%',
          right: '-15%',
          width: '65%',
          height: '160%',
          borderRadius: '50%',
          bgcolor: (theme) => alpha(theme.palette.common.white, 0.12),
          filter: 'blur(36px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -iconSize * 0.35,
          right: -iconSize * 0.25,
          color: (theme) => alpha(theme.palette.common.white, 0.25),
          transform: 'rotate(-6deg)',
        }}
      >
        <AutoStoriesRoundedIcon sx={{ fontSize: iconSize * 2.2 }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.common.white, 0.18),
          backdropFilter: 'blur(6px)',
        }}
      >
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: 1, color: 'common.white', textTransform: 'uppercase' }}>
          {year}
        </Typography>
      </Box>
    </Box>
  );
}
