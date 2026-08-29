import { Box, ButtonBase, Chip, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import type { StoryAccent } from './storyAccents';
import { getYouTubeThumbnail } from './youtube';

export interface StoryCardProps {
  story: {
    name: string;
    role: string;
    description: string;
    videoUrl: string;
  };
  accent: StoryAccent;
  onOpen: () => void;
}

/** Thumbnail + play affordance for one story — clicking opens the full video in a dialog.
 * Features a structured card layout, responsive thumbnail aspect ratio, smooth hover lift, and touch-friendly targets. */
export default function StoryCard({ story, accent, onOpen }: StoryCardProps) {
  const thumbnail = getYouTubeThumbnail(story.videoUrl);

  return (
    <ButtonBase
      onClick={onOpen}
      aria-label={`Watch ${story.name}'s success story video`}
      sx={{
        display: 'block',
        width: '100%',
        height: '100%',
        textAlign: 'left',
        borderRadius: 4,
        outline: 'none',
        '&:focus-visible': {
          outline: (theme) => `2px solid ${theme.palette[accent].main}`,
          outlineOffset: 4,
        },
      }}
    >
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
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            borderColor: (theme) => alpha(theme.palette[accent].main, 0.4),
            boxShadow: (theme) => `0 20px 40px -12px ${alpha(theme.palette[accent].main, 0.25)}`,
            '& .story-thumb': {
              transform: 'scale(1.06)',
            },
            '& .story-play-icon': {
              transform: 'translate(-50%, -50%) scale(1.12)',
              boxShadow: (theme) => `0 12px 32px ${alpha(theme.palette[accent].main, 0.65)}`,
            },
          },
        }}
      >
        {/* Video Thumbnail Box */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            maxHeight: 200,
            overflow: 'hidden',
            bgcolor: 'common.black',
          }}
        >
          {thumbnail ? (
            <Box
              component="img"
              className="story-thumb"
              src={thumbnail}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.currentTarget;
                if (target.src.includes('maxresdefault')) {
                  target.src = target.src.replace('maxresdefault', 'hqdefault');
                }
              }}
              alt={`${story.name} video thumbnail`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: (theme) => alpha(theme.palette[accent].main, 0.16),
              }}
            >
              <PersonRoundedIcon sx={{ fontSize: 44, color: `${accent}.main` }} />
            </Box>
          )}

          {/* Vignette Overlay */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)',
            }}
          />

          {/* Video Story Badge */}
          <Chip
            icon={<OndemandVideoRoundedIcon sx={{ fontSize: '13px !important', color: 'inherit' }} />}
            label="VIDEO STORY"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              fontWeight: 800,
              fontSize: '0.65rem',
              letterSpacing: 0.5,
              height: 22,
              color: 'common.white',
              bgcolor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              '& .MuiChip-icon': {
                color: (theme) => theme.palette[accent].light,
              },
            }}
          />

          {/* Centered Play Button Affordance */}
          <Box
            className="story-play-icon"
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: '50%',
              bgcolor: (theme) => theme.palette[accent].main,
              color: (theme) => theme.palette[accent].contrastText,
              boxShadow: (theme) => `0 6px 20px ${alpha(theme.palette[accent].main, 0.45)}`,
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
          >
            <PlayArrowRoundedIcon sx={{ fontSize: 26 }} />
          </Box>
        </Box>

        {/* Card Content */}
        <Box
          sx={{
            p: 2.25,
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
              fontSize: '1.025rem',
              lineHeight: 1.3,
              mb: 0.25,
            }}
          >
            {story.name}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: `${accent}.dark`,
              fontWeight: 700,
              fontSize: '0.8rem',
              mb: 1.25,
              textTransform: 'uppercase',
              letterSpacing: 0.3,
            }}
          >
            {story.role}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.55,
              fontSize: '0.85rem',
              mb: 2,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {story.description}
          </Typography>

          {/* Action Footer */}
          <Box
            sx={{
              pt: 1.5,
              borderTop: '1px solid',
              borderColor: (theme) => alpha(theme.palette.divider, 0.8),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: `${accent}.dark` }}>
              <PlayArrowRoundedIcon sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: '0.775rem', fontWeight: 800, letterSpacing: 0.3 }}>
                Watch Story
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </ButtonBase>
  );
}

