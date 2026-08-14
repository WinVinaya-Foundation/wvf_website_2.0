import { Stack, Typography } from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { formatDate } from '../../../utils/date';

export interface BlogMetaProps {
  publishedAt: string;
  readingMinutes: number;
  authorName: string;
  color?: string;
  size?: 'small' | 'medium';
}

/** Date · read time · author row, shared between blog cards, the featured post, and the article header. */
export default function BlogMeta({ publishedAt, readingMinutes, authorName, color, size = 'small' }: BlogMetaProps) {
  const fontSize = size === 'small' ? '0.8rem' : '0.9rem';
  const iconSize = size === 'small' ? 15 : 17;
  const textColor = color ?? 'text.secondary';

  return (
    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', rowGap: 0.5 }}>
      <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
        <PersonRoundedIcon sx={{ fontSize: iconSize, color: textColor }} />
        <Typography sx={{ fontSize, fontWeight: 600, color: textColor }}>{authorName}</Typography>
      </Stack>
      <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
        <CalendarMonthRoundedIcon sx={{ fontSize: iconSize, color: textColor }} />
        <Typography sx={{ fontSize, fontWeight: 600, color: textColor }}>{formatDate(publishedAt)}</Typography>
      </Stack>
      <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
        <ScheduleRoundedIcon sx={{ fontSize: iconSize, color: textColor }} />
        <Typography sx={{ fontSize, fontWeight: 600, color: textColor }}>{readingMinutes} min read</Typography>
      </Stack>
    </Stack>
  );
}
