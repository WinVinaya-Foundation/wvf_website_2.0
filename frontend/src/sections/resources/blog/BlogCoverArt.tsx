import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { ResponsiveStyleValue } from '@mui/system';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import SignLanguageRoundedIcon from '@mui/icons-material/SignLanguageRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';

export interface BlogCoverArtProps {
  category?: string;
  color?: 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error';
  coverImageUrl?: string | null;
  height?: ResponsiveStyleValue<number | string>;
  iconSize?: number;
  borderRadius?: number | string;
}

const CATEGORY_ICONS: Record<string, typeof ArticleRoundedIcon> = {
  workplace: BusinessCenterRoundedIcon,
  signLanguage: SignLanguageRoundedIcon,
  community: GroupsRoundedIcon,
  accessibility: AccessibilityNewRoundedIcon,
  'Workplace Inclusion': BusinessCenterRoundedIcon,
  'Sign Language': SignLanguageRoundedIcon,
  'Community & Training': GroupsRoundedIcon,
  Accessibility: AccessibilityNewRoundedIcon,
};

import { resolveUploadUrl } from '../../../utils/uploads';

export default function BlogCoverArt({
  category = 'general',
  color = 'primary',
  coverImageUrl,
  height = '100%',
  iconSize = 64,
  borderRadius = 0,
}: BlogCoverArtProps) {
  if (coverImageUrl) {
    return (
      <Box
        component="img"
        src={resolveUploadUrl(coverImageUrl)}
        alt=""
        sx={{
          width: '100%',
          height,
          objectFit: 'cover',
          borderRadius,
        }}
      />
    );
  }

  const Icon = CATEGORY_ICONS[category] || ArticleRoundedIcon;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height,
        borderRadius,
        background: (theme) => `linear-gradient(135deg, ${theme.palette[color].dark} 0%, ${theme.palette[color].main} 100%)`,
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

