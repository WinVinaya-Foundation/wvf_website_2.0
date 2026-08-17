import type { ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import DescriptionRounded from '@mui/icons-material/DescriptionRounded';
import { useFileExists } from '../../hooks/useFileExists';
import { documentFileUrl } from '../../utils/document';
import { Button } from '../Button';
import { Card, CardContent } from '../Card';
import { Chip } from '../Chip';

export interface DocumentCardProps {
  title: string;
  year?: string;
  description?: string;
  icon?: ReactNode;
  fileUrl?: string;
}

export function formatReportFileUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
  const backendBase = apiBase.replace(/\/api\/?$/, '');
  return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
}

/** A downloadable document — shows a real "View Document" link when provided or when the file exists. */
export default function DocumentCard({ title, year, description, icon = <DescriptionRounded />, fileUrl }: DocumentCardProps) {
  const fallbackUrl = documentFileUrl(title, year);
  const targetFileUrl = fileUrl ? formatReportFileUrl(fileUrl) : fallbackUrl;
  const staticFileExists = useFileExists(fallbackUrl);
  const available = fileUrl ? true : staticFileExists;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          <Box
            aria-hidden="true"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: 'primary.light',
              color: 'primary.dark',
            }}
          >
            {icon}
          </Box>
          {year && (
            <Chip label={year} size="small" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 500 }} />
          )}
        </Stack>

        <Typography variant="subtitle1" component="p" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {description}
          </Typography>
        )}

        <Box sx={{ mt: 'auto', pt: 2.5 }}>
          {available ? (
            <Button
              component="a"
              href={targetFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              color="primary"
              size="small"
            >
              View PDF
            </Button>
          ) : (
            <Chip label="Coming soon" size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary' }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
