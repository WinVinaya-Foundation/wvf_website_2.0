import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { ResponsiveStyleValue } from '@mui/system';
import type { BlogCategoryKey } from '../../../pages/resources/blogContent';
import { getCategoryMeta } from '../../../pages/resources/blogContent';
import { BLOG_CATEGORY_ICONS } from './blogCategoryVisuals';

export interface BlogCoverArtProps {
  category: BlogCategoryKey;
  height?: ResponsiveStyleValue<number | string>;
  iconSize?: number;
  borderRadius?: number | string;
}

/** Abstract, category-colored cover art used for blog cards and the article banner. Real cover
 * photography isn't available yet, so this stands in as an honest, on-brand placeholder rather
 * than a fabricated photo. */
export default function BlogCoverArt({ category, height = '100%', iconSize = 64, borderRadius = 0 }: BlogCoverArtProps) {
  const meta = getCategoryMeta(category);
  const Icon = BLOG_CATEGORY_ICONS[category];

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height,
        borderRadius,
        background: (theme) => `linear-gradient(135deg, ${theme.palette[meta.color].dark} 0%, ${theme.palette[meta.color].main} 100%)`,
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
          color: (theme) => alpha(theme.palette.common.white, 0.28),
          transform: 'rotate(-8deg)',
        }}
      >
        <Icon sx={{ fontSize: iconSize * 2.2 }} />
      </Box>
    </Box>
  );
}
