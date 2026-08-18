import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Button, Chip, SectionContainer } from '../../../components';
import { useFileExists } from '../../../hooks/useFileExists';
import { documentFileUrl } from '../../../utils/document';
import { resolveUploadUrl } from '../../../utils/uploads';
import type { EbookItem } from '../../../store/api/ebookApi';
import EbookCoverArt from './EbookCoverArt';
import EbookMeta from './EbookMeta';

export interface FeaturedEbookSectionProps {
  latestEbook?: EbookItem;
}

/** Spotlights the most recently published eBook — cover art on one side, title, description,
 * author/date, and a "Read eBook" action on the other. */
export default function FeaturedEbookSection({ latestEbook }: FeaturedEbookSectionProps) {
  const year = latestEbook ? latestEbook.publishedAt.slice(0, 4) : '';
  const fallbackUrl = latestEbook ? documentFileUrl(latestEbook.title, year) : '';
  const isFallbackAvailable = useFileExists(fallbackUrl);

  if (!latestEbook) return null;

  const fileUrl = latestEbook.fileUrl ? resolveUploadUrl(latestEbook.fileUrl) : (isFallbackAvailable ? fallbackUrl : undefined);
  const available = Boolean(fileUrl);

  return (
    <SectionContainer labelledBy="featured-ebook-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.1fr' },
          borderRadius: 5,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.grey[900], 0.08),
          boxShadow: (theme) => `0 20px 48px -16px ${alpha(theme.palette.grey[900], 0.16)}`,
        }}
      >
        {latestEbook.coverImageUrl ? (
          <Box
            component="img"
            src={resolveUploadUrl(latestEbook.coverImageUrl)}
            alt={latestEbook.title}
            sx={{ width: '100%', height: { xs: 220, md: '100%' }, objectFit: 'cover', minHeight: 280 }}
          />
        ) : (
          <EbookCoverArt accent="secondary" year={year} height={{ xs: 220, md: '100%' }} iconSize={72} />
        )}

        <Box sx={{ p: { xs: 3.5, sm: 5, md: 6 }, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Stack spacing={2.5}>
            <Chip
              icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '16px !important' }} />}
              label="Latest eBook"
              size="small"
              color="secondary"
              sx={{ alignSelf: 'flex-start', fontWeight: 800 }}
            />

            <Typography
              id="featured-ebook-heading"
              variant="h2"
              sx={{ fontWeight: 900, fontSize: { xs: '1.7rem', sm: '2.1rem', md: '2.35rem' }, lineHeight: 1.25, color: 'text.primary' }}
            >
              {latestEbook.title}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'text.secondary' }}>
              {latestEbook.description}
            </Typography>

            <EbookMeta publishedAt={latestEbook.publishedAt} author={latestEbook.author} size="medium" />

            <Box sx={{ pt: 1 }}>
              {available ? (
                <Button
                  component="a"
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<OpenInNewRoundedIcon />}
                  sx={{ fontWeight: 800, py: 1.5, px: 3.5, borderRadius: 3 }}
                >
                  Read eBook
                </Button>
              ) : (
                <Chip label="PDF coming soon" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary', fontWeight: 700 }} />
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </SectionContainer>
  );
}
