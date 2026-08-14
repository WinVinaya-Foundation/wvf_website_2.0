import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../../components';
import { pitchIdea } from '../../../pages/involve/volunteerContent';

/** Pitch Idea Section encouraging custom skill proposals and open collaboration */
export default function PitchIdeaSection() {
  return (
    <SectionContainer labelledBy="pitch-idea-heading">
      <Box
        sx={{
          p: { xs: 4, sm: 5, md: 6 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
          boxShadow: (theme) => `0 12px 36px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 4,
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: 760 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
                color: 'primary.dark',
                flexShrink: 0,
              }}
            >
              <LightbulbRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800, letterSpacing: 1.2 }}>
              Open Proposals &amp; Ideas
            </Typography>
          </Stack>

          <Typography
            id="pitch-idea-heading"
            variant="h3"
            component="h2"
            sx={{ fontWeight: 900, fontSize: { xs: '1.8rem', md: '2.3rem' }, color: 'text.primary' }}
          >
            {pitchIdea.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            {pitchIdea.body}
          </Typography>
        </Stack>

        <Button
          component={Link}
          to={pitchIdea.link.to}
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{ flexShrink: 0, fontWeight: 800, px: 3.5, py: 1.5 }}
        >
          {pitchIdea.link.label}
        </Button>
      </Box>
    </SectionContainer>
  );
}
