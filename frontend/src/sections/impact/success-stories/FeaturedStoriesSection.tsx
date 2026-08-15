import { useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { AppDialog, Chip, SectionContainer, SectionHeading } from '../../../components';
import { useGetPublicStoriesQuery } from '../../../store/api/storiesApi';
import { accentForIndex } from './storyAccents';
import StoryCard from './StoryCard';

/** Grid-of-cards + play-in-dialog layout: fetches dynamic success stories from backend API */
export default function FeaturedStoriesSection() {
  const { data: stories = [], isFetching } = useGetPublicStoriesQuery();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const activeStory = openIndex !== null ? stories[openIndex] : undefined;
  const activeAccent = openIndex !== null ? accentForIndex(openIndex) : 'primary';

  return (
    <SectionContainer labelledBy="featured-stories-heading">
      <SectionHeading
        eyebrow="Watch Their Journey"
        title="Featured Stories"
        description="Every journey looks different. Watch how skill, determination, and the right opportunity came together."
        align="center"
        titleId="featured-stories-heading"
      />

      {isFetching ? (
        <Stack sx={{ alignItems: 'center', py: 6 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : stories.length === 0 ? (
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <AutoAwesomeRoundedIcon sx={{ fontSize: 36, opacity: 0.5 }} />
          <Typography variant="body1">No featured success stories to show yet.</Typography>
        </Stack>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: { xs: 4, md: 5 },
          }}
        >
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} accent={accentForIndex(index)} onOpen={() => setOpenIndex(index)} />
          ))}
        </Box>
      )}

      {activeStory && (
        <AppDialog
          open={openIndex !== null}
          onClose={() => setOpenIndex(null)}
          title={
            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 0.5 }}>
              <span>{activeStory.name}</span>
              <Chip label={activeStory.role} size="small" color={activeAccent} />
            </Stack>
          }
          maxWidth="md"
          fullWidth
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              pt: '56.25%',
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'common.black',
            }}
          >
            <iframe
              src={activeStory.videoUrl}
              title={`${activeStory.name}'s success story`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            />
          </Box>

          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.75, mt: 2.5 }}>
            {activeStory.description}
          </Typography>
        </AppDialog>
      )}
    </SectionContainer>
  );
}
