import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AbcRoundedIcon from '@mui/icons-material/AbcRounded';
import WavingHandRoundedIcon from '@mui/icons-material/WavingHandRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import { SectionContainer, SectionHeading, StatusChip } from '../../../components';
import { videoLessons } from '../../../pages/involve/signLanguageContent';

const categoryIcons = [AbcRoundedIcon, WavingHandRoundedIcon, ForumRoundedIcon, RecordVoiceOverRoundedIcon];

/** Video Lessons Section — the planned video library, organized by topic. Modules are still being
 * recorded, so each tile is presented honestly as upcoming rather than pretending videos already exist. */
export default function VideoLessonsSection() {
  return (
    <SectionContainer labelledBy="video-lessons-heading">
      <SectionHeading
        eyebrow="Learn At Your Own Pace"
        title={videoLessons.headline}
        description={videoLessons.description}
        align="center"
        titleId="video-lessons-heading"
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
        {videoLessons.categories.map((category, index) => {
          const Icon = categoryIcons[index % categoryIcons.length];

          return (
            <Box
              key={category.title}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px dashed',
                borderColor: (theme) => alpha(theme.palette.info.main, 0.35),
              }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: 3,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.12),
                    color: 'info.dark',
                  }}
                >
                  <Icon sx={{ fontSize: 24 }} />
                </Box>
                <OndemandVideoRoundedIcon sx={{ fontSize: 20, color: (theme) => alpha(theme.palette.text.secondary, 0.4) }} />
              </Stack>

              <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1, fontSize: '1.05rem' }}>
                {category.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.9rem', flexGrow: 1, mb: 2 }}>
                {category.description}
              </Typography>

              <Box>
                <StatusChip status="default" label="Coming Soon" />
              </Box>
            </Box>
          );
        })}
      </Box>

      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', textAlign: 'center', mt: 4, fontStyle: 'italic', maxWidth: 640, mx: 'auto' }}
      >
        {videoLessons.comingSoonNote}
      </Typography>
    </SectionContainer>
  );
}
