import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import type { FeaturedStory } from '../../../pages/impact/successStoriesContent';
import type { StoryAccent } from './storyAccents';
import { getYouTubeThumbnail } from './youtube';

export interface StoryCardProps {
  story: FeaturedStory;
  accent: StoryAccent;
  onOpen: () => void;
}

/** Thumbnail + play affordance for one story — clicking opens the full video in a dialog rather
 * than expanding inline, so the grid stays a fixed card size no matter how many stories exist. */
export default function StoryCard({ story, accent, onOpen }: StoryCardProps) {
  const thumbnail = getYouTubeThumbnail(story.videoUrl);

  return (
    <ButtonBase
      onClick={onOpen}
      aria-label={`Watch ${story.name}'s success story`}
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
          '& .story-thumb': { transform: 'scale(1.05)' },
          '& .story-play-icon': { transform: 'translate(-50%, -50%) scale(1.1)' },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '16 / 9',
          borderRadius: 3.5,
          overflow: 'hidden',
          mb: 2,
          boxShadow: (theme) => theme.shadows[3],
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
            sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
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
            <PersonRoundedIcon sx={{ fontSize: 48, color: `${accent}.main` }} />
          </Box>
        )}

        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />

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
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: (theme) => theme.palette[accent].main,
            color: (theme) => theme.palette[accent].contrastText,
            boxShadow: (theme) => `0 10px 28px ${alpha(theme.palette[accent].main, 0.5)}`,
            transition: (theme) => theme.transitions.create('transform'),
          }}
        >
          <PlayArrowRoundedIcon sx={{ fontSize: 30 }} />
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={0.75}
        sx={{
          alignItems: 'center',
          mb: 1,
          px: 1.25,
          py: 0.35,
          width: 'fit-content',
          borderRadius: 50,
          bgcolor: (theme) => alpha(theme.palette[accent].main, 0.12),
          color: `${accent}.dark`,
        }}
      >
        <OndemandVideoRoundedIcon sx={{ fontSize: 14 }} />
        <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 0.4 }}>
          VIDEO STORY
        </Typography>
      </Stack>

      <Typography variant="subtitle1" component="p" sx={{ fontWeight: 700, color: 'text.primary' }}>
        {story.name}
      </Typography>
      <Typography variant="body2" sx={{ color: `${accent}.dark`, fontWeight: 600, mb: 0.5 }}>
        {story.role}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {story.description}
      </Typography>
    </ButtonBase>
  );
}
