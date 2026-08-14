import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../../components';
import { beyondBasics, learningJourney } from '../../../pages/involve/signLanguageContent';

/** Pairs a real trainer's self-taught learning story with the next step for those who want deeper fluency */
export default function LearningJourneySection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="learning-journey-heading">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3.5 }}>
        {/* Trainer Quote Card */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 3.5, sm: 4.5 },
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.info.main, 0.25),
            boxShadow: (theme) => `0 12px 32px -8px ${alpha(theme.palette.grey[900], 0.1)}`,
          }}
        >
          <Typography variant="overline" sx={{ color: 'info.dark', fontWeight: 800, letterSpacing: 1.2, mb: 1.5 }}>
            {learningJourney.eyebrow}
          </Typography>

          <FormatQuoteRoundedIcon
            sx={{
              fontSize: 48,
              color: (theme) => alpha(theme.palette.info.main, 0.25),
              transform: 'rotate(180deg)',
              mb: 1,
            }}
          />

          <Typography
            id="learning-journey-heading"
            component="blockquote"
            variant="body1"
            sx={{
              m: 0,
              mb: 2.5,
              fontSize: { xs: '1.05rem', sm: '1.1rem' },
              lineHeight: 1.75,
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'text.primary',
              flexGrow: 1,
            }}
          >
            &ldquo;{learningJourney.quote}&rdquo;
          </Typography>

          <Box
            sx={{
              pt: 2,
              borderTop: '1px solid',
              borderColor: (theme) => alpha(theme.palette.divider, 0.8),
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'info.dark' }}>
              {learningJourney.author}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {learningJourney.role}
            </Typography>
          </Box>
        </Box>

        {/* Beyond the Basics Card */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: { xs: 3.5, sm: 4.5 },
            borderRadius: 4,
            background: (theme) =>
              `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
            boxShadow: (theme) => `0 12px 32px -8px ${alpha(theme.palette.grey[900], 0.1)}`,
          }}
        >
          <Stack spacing={2}>
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
              }}
            >
              <TrendingUpRoundedIcon sx={{ fontSize: 24 }} />
            </Box>

            <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.3rem' }}>
              {beyondBasics.headline}
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              {beyondBasics.body}
            </Typography>
          </Stack>

          <Button
            component={Link}
            to={beyondBasics.link.to}
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{ mt: 3, alignSelf: 'flex-start', fontWeight: 800, py: 1.5, px: 3.5, borderRadius: 3 }}
          >
            {beyondBasics.link.label}
          </Button>
        </Box>
      </Box>
    </SectionContainer>
  );
}
