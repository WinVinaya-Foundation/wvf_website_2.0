import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { SectionContainer, Timeline } from '../../../components';
import { milestones } from '../../../pages/about/ourStoryContent';

export default function MilestonesSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="milestones-heading">
      <Stack spacing={2} sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: { xs: 5, md: 7 } }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            px: 2.25,
            py: 0.75,
            mx: 'auto',
            borderRadius: 50,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 18, color: 'primary.dark' }} />
          <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1.5, fontWeight: 700 }}>
            Key Milestones
          </Typography>
        </Box>

        <Typography
          id="milestones-heading"
          variant="h2"
          component="h2"
          sx={{
            color: 'text.primary',
            fontWeight: 800,
            fontSize: { xs: '1.85rem', sm: '2.5rem', md: '2.85rem' },
            lineHeight: 1.2,
          }}
        >
          Our Journey Through Time
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.15rem' },
            lineHeight: 1.6,
          }}
        >
          From our founding in 2016 to empowering thousands of scholars today.
        </Typography>
      </Stack>

      <Timeline items={milestones} />
    </SectionContainer>
  );
}

