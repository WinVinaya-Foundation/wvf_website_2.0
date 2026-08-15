import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import { PhotoFrame } from '../../../components';
import type { GalleryAlbumItem } from '../../../store/api/galleryApi';
import { resolveUploadUrl } from '../../../utils/uploads';
import { getCategoryMeta } from './categoryVisuals';

export interface GalleryAlbumCardProps {
  album: GalleryAlbumItem;
  onOpen: () => void;
}

export default function GalleryAlbumCard({ album, onOpen }: GalleryAlbumCardProps) {
  const meta = getCategoryMeta(album.category);
  const Icon = meta.Icon;
  const cover = album.photos[0];
  const photoCount = album.photos.length;

  return (
    <ButtonBase
      onClick={onOpen}
      aria-label={`Open ${album.title} album — ${photoCount} photo${photoCount === 1 ? '' : 's'}`}
      sx={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        borderRadius: 4,
        '&:focus-visible': {
          outline: (theme) => `2px solid ${theme.palette.primary.dark}`,
          outlineOffset: 4,
        },
        '&:hover, &:focus-visible': {
          '& .stack-back': { transform: 'rotate(-9deg) translate(-9px, 10px)' },
          '& .stack-mid': { transform: 'rotate(5deg) translate(7px, -8px)' },
          '& .album-overlay': { bgcolor: (theme) => alpha(theme.palette.common.black, 0.22) },
          '& .album-zoom-icon': { opacity: 1 },
        },
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '4 / 3', mb: 2 }}>
        <Box
          aria-hidden="true"
          className="stack-back"
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 3,
            bgcolor: `${meta.color}.main`,
            opacity: 0.28,
            transform: 'rotate(-6deg) translate(-4px, 5px)',
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <Box
          aria-hidden="true"
          className="stack-mid"
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 3,
            bgcolor: `${meta.color}.light`,
            boxShadow: (theme) => theme.shadows[1],
            transform: 'rotate(3deg) translate(3px, -4px)',
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: (theme) => theme.shadows[4],
          }}
        >
          <PhotoFrame
            src={cover ? resolveUploadUrl(cover.imageUrl) : ''}
            alt={cover?.altText || cover?.caption || album.title}
            fallbackIcon={<Icon sx={{ fontSize: 34 }} />}
            fallbackBgcolor={`${meta.color}.light`}
            fallbackColor={`${meta.color}.dark`}
            aspectRatio="4 / 3"
            sx={{ borderRadius: 0, width: '100%', height: '100%' }}
          />

          {photoCount > 1 && (
            <Stack
              direction="row"
              spacing={0.5}
              aria-hidden="true"
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                alignItems: 'center',
                px: 1,
                py: 0.4,
                borderRadius: 50,
                bgcolor: (theme) => alpha(theme.palette.common.black, 0.55),
                color: 'common.white',
                backdropFilter: 'blur(2px)',
              }}
            >
              <PhotoLibraryRoundedIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, lineHeight: 1 }}>
                {photoCount}
              </Typography>
            </Stack>
          )}

          <Box
            className="album-overlay"
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'transparent',
              transition: 'background-color 0.25s ease',
            }}
          >
            <ZoomInRoundedIcon
              className="album-zoom-icon"
              sx={{ color: 'common.white', fontSize: 32, opacity: 0, transition: 'opacity 0.25s ease' }}
            />
          </Box>
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={0.75}
        sx={{
          alignItems: 'center',
          mb: 0.75,
          px: 1.25,
          py: 0.35,
          width: 'fit-content',
          borderRadius: 50,
          bgcolor: `${meta.color}.light`,
          color: `${meta.color}.dark`,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 0.4 }}>
          {meta.label.toUpperCase()}
        </Typography>
      </Stack>

      <Typography variant="subtitle1" component="p" sx={{ fontWeight: 700, color: 'text.primary' }}>
        {album.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {album.dateLabel}
      </Typography>
    </ButtonBase>
  );
}
