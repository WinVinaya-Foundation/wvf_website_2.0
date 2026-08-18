import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Chip } from '../../../components';
import { useFileExists } from '../../../hooks/useFileExists';
import { documentFileUrl } from '../../../utils/document';
import { resolveUploadUrl } from '../../../utils/uploads';
import type { EbookItem } from '../../../store/api/ebookApi';
import EbookCoverArt, { type EbookAccent } from './EbookCoverArt';
import EbookMeta from './EbookMeta';

const ACCENTS: EbookAccent[] = ['secondary', 'primary', 'info'];

export interface EbookCardProps {
  ebook: EbookItem;
  index: number;
}

/** eBook card — cover art, title, description, and the author/date row. Opens the eBook PDF in a
 * new tab once it exists; otherwise shows a "Coming soon" state. */
export default function EbookCard({ ebook, index }: EbookCardProps) {
  const accent = ACCENTS[index % ACCENTS.length];
  const year = ebook.publishedAt.slice(0, 4);
  const fallbackUrl = documentFileUrl(ebook.title, year);
  const isFallbackAvailable = useFileExists(fallbackUrl);

  const fileUrl = ebook.fileUrl ? resolveUploadUrl(ebook.fileUrl) : (isFallbackAvailable ? fallbackUrl : undefined);
  const available = Boolean(fileUrl);

  const card = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette.grey[900], 0.08),
        boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
        opacity: available ? 1 : 0.75,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(available && {
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: (theme) => `0 20px 40px -12px ${alpha(theme.palette[accent].main, 0.28)}`,
          },
        }),
      }}
    >
      <Box sx={{ aspectRatio: '16 / 9', overflow: 'hidden', position: 'relative' }}>
        {ebook.coverImageUrl ? (
          <Box
            component="img"
            src={resolveUploadUrl(ebook.coverImageUrl)}
            alt={ebook.title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <EbookCoverArt accent={accent} year={year} height="100%" iconSize={40} />
        )}
      </Box>

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.05rem', lineHeight: 1.35, mb: 1 }}>
          {ebook.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            fontSize: '0.9rem',
            mb: 2.5,
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {ebook.description}
        </Typography>

        <Stack spacing={1.25} sx={{ pt: 2, borderTop: '1px solid', borderColor: (theme) => alpha(theme.palette.divider, 0.8) }}>
          <EbookMeta publishedAt={ebook.publishedAt} author={ebook.author} />

          {available ? (
            <Stack direction="row" spacing={0.4} sx={{ alignItems: 'center', color: `${accent}.dark` }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 800 }}>View PDF</Typography>
              <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
            </Stack>
          ) : (
            <Chip label="Coming soon" size="small" variant="outlined" sx={{ alignSelf: 'flex-start', borderColor: 'divider', color: 'text.secondary' }} />
          )}
        </Stack>
      </Box>
    </Box>
  );

  if (!available) {
    return (
      <Box aria-label={`${ebook.title} — PDF coming soon`} sx={{ cursor: 'default', height: '100%' }}>
        {card}
      </Box>
    );
  }

  return (
    <Box
      component="a"
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${ebook.title} PDF in a new tab`}
      sx={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      {card}
    </Box>
  );
}
