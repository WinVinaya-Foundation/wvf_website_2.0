import { Stack, Typography } from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { formatDate } from '../../../utils/date';

export interface EbookMetaProps {
  publishedAt: string;
  author: string;
  size?: 'small' | 'medium';
}

/** Author · published date row, shared between the eBook cards and the featured eBook. */
export default function EbookMeta({ publishedAt, author, size = 'small' }: EbookMetaProps) {
  const fontSize = size === 'small' ? '0.8rem' : '0.9rem';
  const iconSize = size === 'small' ? 15 : 17;

  return (
    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', rowGap: 0.5 }}>
      <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
        <PersonRoundedIcon sx={{ fontSize: iconSize, color: 'text.secondary' }} />
        <Typography sx={{ fontSize, fontWeight: 600, color: 'text.secondary' }}>{author}</Typography>
      </Stack>
      <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
        <CalendarMonthRoundedIcon sx={{ fontSize: iconSize, color: 'text.secondary' }} />
        <Typography sx={{ fontSize, fontWeight: 600, color: 'text.secondary' }}>{formatDate(publishedAt)}</Typography>
      </Stack>
    </Stack>
  );
}
