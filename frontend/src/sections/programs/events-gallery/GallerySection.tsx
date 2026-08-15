import { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { AppDialog, Chip, PhotoFrame, SectionContainer, SectionHeading } from '../../../components';
import { galleryContent } from '../../../pages/programs/eventsGalleryContent';
import { useGetPublicAlbumsQuery } from '../../../store/api/galleryApi';
import { useGetCategoriesQuery } from '../../../store/api/categoriesApi';
import { resolveUploadUrl } from '../../../utils/uploads';
import { getCategoryColor, getCategoryMeta } from './categoryVisuals';
import GalleryAlbumCard from './GalleryAlbumCard';

type FilterKey = string | 'all';

export default function GallerySection() {
  const { data: albums = [], isFetching: isFetchingAlbums } = useGetPublicAlbumsQuery();
  const { data: categories = [], isFetching: isFetchingCategories } = useGetCategoriesQuery();

  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const filteredAlbums = useMemo(
    () =>
      activeFilter === 'all'
        ? albums
        : albums.filter((album) => album.category?.id === activeFilter),
    [albums, activeFilter],
  );

  const activeAlbum = openAlbumId ? albums.find((album) => album.id === openAlbumId) : undefined;
  const activePhoto = activeAlbum?.photos[photoIndex];
  const photoCount = activeAlbum?.photos.length ?? 0;
  const activeMeta = activeAlbum ? getCategoryMeta(activeAlbum.category) : null;

  const openAlbum = (albumId: string) => {
    setOpenAlbumId(albumId);
    setPhotoIndex(0);
  };

  const goToOffset = (offset: 1 | -1) => {
    setPhotoIndex((current) => (photoCount === 0 ? current : (current + offset + photoCount) % photoCount));
  };

  useEffect(() => {
    if (!activeAlbum) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') goToOffset(1);
      if (event.key === 'ArrowLeft') goToOffset(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAlbum, photoCount]);

  const isLoading = isFetchingAlbums || isFetchingCategories;

  return (
    <SectionContainer id="gallery" bgcolor="background.paper" labelledBy="gallery-heading">
      <SectionHeading
        eyebrow={galleryContent.eyebrow}
        title={galleryContent.title}
        description={galleryContent.description}
        titleId="gallery-heading"
      />

      <Stack direction="row" spacing={1} role="group" aria-label="Filter gallery by category" sx={{ flexWrap: 'wrap', rowGap: 1, mb: 4 }}>
        <Chip
          label="All Moments"
          onClick={() => setActiveFilter('all')}
          color="primary"
          variant={activeFilter === 'all' ? 'filled' : 'outlined'}
          aria-pressed={activeFilter === 'all'}
          sx={{ fontWeight: 700 }}
        />
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            label={cat.label}
            onClick={() => setActiveFilter(cat.id)}
            color={getCategoryColor(cat.color)}
            variant={activeFilter === cat.id ? 'filled' : 'outlined'}
            aria-pressed={activeFilter === cat.id}
            sx={{ fontWeight: 700 }}
          />
        ))}
      </Stack>

      {isLoading ? (
        <Stack sx={{ alignItems: 'center', py: 6 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : filteredAlbums.length === 0 ? (
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <PhotoLibraryRoundedIcon sx={{ fontSize: 36, opacity: 0.5 }} />
          <Typography variant="body1">No albums in this category yet.</Typography>
        </Stack>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: { xs: 3, sm: 3.5 } }}>
          {filteredAlbums.map((album) => (
            <GalleryAlbumCard key={album.id} album={album} onOpen={() => openAlbum(album.id)} />
          ))}
        </Box>
      )}

      {activeAlbum && activePhoto && activeMeta && (
        <AppDialog
          open={Boolean(openAlbumId)}
          onClose={() => setOpenAlbumId(null)}
          title={
            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
              <span>{activeAlbum.title}</span>
              <Chip
                label={activeMeta.label}
                size="small"
                color={activeMeta.color}
              />
            </Stack>
          }
          maxWidth="md"
          fullWidth
        >
          <Box sx={{ position: 'relative' }}>
            <PhotoFrame
              src={resolveUploadUrl(activePhoto.imageUrl)}
              alt={activePhoto.altText || activePhoto.caption || activeAlbum.title}
              fallbackIcon={<activeMeta.Icon sx={{ fontSize: 48 }} />}
              fallbackBgcolor={`${activeMeta.color}.light`}
              fallbackColor={`${activeMeta.color}.dark`}
              aspectRatio="16 / 10"
            />

            {photoCount > 1 && (
              <>
                <IconButton
                  onClick={() => goToOffset(-1)}
                  aria-label="Previous photo"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 8,
                    transform: 'translateY(-50%)',
                    bgcolor: (theme) => alpha(theme.palette.common.black, 0.45),
                    color: 'common.white',
                    '&:hover': { bgcolor: (theme) => alpha(theme.palette.common.black, 0.65) },
                  }}
                >
                  <ChevronLeftRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={() => goToOffset(1)}
                  aria-label="Next photo"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 8,
                    transform: 'translateY(-50%)',
                    bgcolor: (theme) => alpha(theme.palette.common.black, 0.45),
                    color: 'common.white',
                    '&:hover': { bgcolor: (theme) => alpha(theme.palette.common.black, 0.65) },
                  }}
                >
                  <ChevronRightRoundedIcon />
                </IconButton>
              </>
            )}
          </Box>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 2, mb: photoCount > 1 ? 1.5 : 0 }}>
            {activePhoto.caption && (
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {activePhoto.caption}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              · {photoIndex + 1} of {photoCount}
            </Typography>
          </Stack>

          {photoCount > 1 && (
            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 0.5 }}>
              {activeAlbum.photos.map((photo, index) => (
                <Box
                  key={photo.id}
                  component="button"
                  type="button"
                  onClick={() => setPhotoIndex(index)}
                  aria-label={`View photo ${index + 1}${photo.caption ? `: ${photo.caption}` : ''}`}
                  aria-current={index === photoIndex}
                  sx={{
                    p: 0,
                    flexShrink: 0,
                    width: 64,
                    height: 48,
                    borderRadius: 1.5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: index === photoIndex ? `${activeMeta.color}.main` : 'transparent',
                    opacity: index === photoIndex ? 1 : 0.6,
                    transition: 'opacity 0.2s ease, border-color 0.2s ease',
                    '&:hover': { opacity: 1 },
                    '&:focus-visible': {
                      outline: (theme) => `2px solid ${theme.palette.primary.dark}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  <PhotoFrame
                    src={resolveUploadUrl(photo.imageUrl)}
                    alt=""
                    fallbackIcon={<activeMeta.Icon sx={{ fontSize: 16 }} />}
                    fallbackBgcolor={`${activeMeta.color}.light`}
                    fallbackColor={`${activeMeta.color}.dark`}
                    aspectRatio="4 / 3"
                    sx={{ borderRadius: 0, width: '100%', height: '100%' }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </AppDialog>
      )}
    </SectionContainer>
  );
}
