import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FlagRounded from '@mui/icons-material/FlagRounded';
import SchoolRounded from '@mui/icons-material/SchoolRounded';
import AutoStoriesRounded from '@mui/icons-material/AutoStoriesRounded';
import HandshakeRounded from '@mui/icons-material/HandshakeRounded';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import WorkspacePremiumRounded from '@mui/icons-material/WorkspacePremiumRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import type { TimelineIconKey, TimelineItem } from '../../model/content';
import { Card, CardContent } from '../Card';
import { Chip } from '../Chip';

export interface TimelineProps {
  items: TimelineItem[];
}

const ICONS: Record<TimelineIconKey, typeof FlagRounded> = {
  flag: FlagRounded,
  school: SchoolRounded,
  academy: AutoStoriesRounded,
  handshake: HandshakeRounded,
  award: EmojiEventsRounded,
  premium: WorkspacePremiumRounded,
  trending: TrendingUpRounded,
};

/** Chronological timeline. Zig-zags left/right around a center line from `md` up; a single
 * left-aligned column below it. Every item renders once — only its grid placement changes
 * per breakpoint — so DOM/reading order always matches the numbered list a screen reader
 * announces, regardless of which side it's drawn on. */
export default function Timeline({ items }: TimelineProps) {
  return (
    <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isEven = index % 2 === 0;
        const Icon = ICONS[item.icon];

        return (
          <Box
            component="li"
            key={`${item.year}-${item.label}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '56px 1fr', md: '1fr 72px 1fr' },
              columnGap: { xs: 2, sm: 3, md: 4 },
              mb: isLast ? 0 : { xs: 3, sm: 4, md: 5 },
            }}
          >
            <Stack
              aria-hidden="true"
              sx={{
                alignItems: 'center',
                alignSelf: 'stretch',
                gridColumn: { xs: '1', md: '2' },
                gridRow: '1',
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: item.isPlaceholder ? 'grey.200' : 'primary.light',
                  color: item.isPlaceholder ? 'grey.500' : 'primary.dark',
                  boxShadow: (theme) =>
                    `0 0 0 6px ${alpha(item.isPlaceholder ? theme.palette.grey[300] : theme.palette.primary.main, 0.12)}`,
                }}
              >
                <Icon fontSize="medium" />
              </Box>
              {!isLast && <Box sx={{ width: 2, flexGrow: 1, mt: 1, bgcolor: 'divider' }} />}
            </Stack>

            <Box
              sx={{
                gridColumn: { xs: '2', md: isEven ? '1' : '3' },
                gridRow: '1',
                textAlign: { xs: 'left', md: isEven ? 'right' : 'left' },
                pb: { xs: 1, md: 0 },
              }}
            >
              <Card sx={{ display: { xs: 'block', md: 'inline-block' }, textAlign: 'left', maxWidth: 420 }}>
                <Box sx={{ height: 4, bgcolor: item.isPlaceholder ? 'grey.300' : 'primary.main' }} />
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Chip
                    label={item.year}
                    size="small"
                    sx={
                      item.isPlaceholder
                        ? { bgcolor: 'grey.200', color: 'text.primary', fontWeight: 500, mb: 1 }
                        : { bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 500, mb: 1 }
                    }
                  />
                  <Typography variant="subtitle1" component="p" sx={{ fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                  {item.isPlaceholder && (
                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary', fontStyle: 'italic' }}>
                      Exact date to be confirmed.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
