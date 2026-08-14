import { useState, type ReactNode } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';

export interface PhotoFrameProps {
  src: string;
  alt: string;
  fallbackIcon: ReactNode;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain';
  fallbackBgcolor?: string | ((theme: Theme) => string);
  fallbackColor?: string;
  sx?: SxProps<Theme>;
}

/** Real photo when one exists at `src`, otherwise a themed icon panel — the same
 * "real content or honest placeholder" pattern used for team photos, generalized to any
 * rectangular image (award ceremony photos, badges/logos, etc). */
export default function PhotoFrame({
  src,
  alt,
  fallbackIcon,
  aspectRatio = '4 / 3',
  objectFit = 'cover',
  fallbackBgcolor = (theme) => theme.palette.primary.light,
  fallbackColor = 'primary.dark',
  sx,
}: PhotoFrameProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <Box
        role="img"
        aria-label={alt}
        sx={[
          {
            aspectRatio,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            bgcolor: fallbackBgcolor,
            color: fallbackColor,
            '& svg': { fontSize: 48 },
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        {fallbackIcon}
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      sx={[
        { aspectRatio, width: '100%', height: 'auto', display: 'block', objectFit, borderRadius: 3 },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    />
  );
}
