import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../../components';
import { programsClosingCtaContent } from '../../../pages/programs/ourProgramsContent';

export default function ProgramsSplitAudienceCtaSection() {
  const { forCandidates, forDonors } = programsClosingCtaContent;

  return (
    <SectionContainer bgcolor="background.default" labelledBy="split-cta-heading">
      <Box
        id="split-cta-heading"
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
      >
        Program Action & Support
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: { xs: 3.5, sm: 4.5, md: 5 },
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: '2px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
            boxShadow: (theme) => `0 12px 32px -8px ${alpha(theme.palette.primary.main, 0.15)}`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: 'primary.main',
              boxShadow: (theme) => `0 18px 40px -8px ${alpha(theme.palette.primary.main, 0.25)}`,
            },
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 180,
              height: 180,
              borderRadius: '50%',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              pointerEvents: 'none',
            }}
          />

          <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1, mb: 3 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.75,
                width: 'fit-content',
                borderRadius: 50,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                color: 'primary.dark',
              }}
            >
              <SchoolRoundedIcon sx={{ fontSize: 18 }} />
              <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.2 }}>
                {forCandidates.eyebrow}
              </Typography>
            </Box>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                fontSize: { xs: '1.75rem', sm: '2.1rem' },
                lineHeight: 1.25,
              }}
            >
              {forCandidates.headline}
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              {forCandidates.body}
            </Typography>
          </Stack>

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Button
              component={Link}
              to={forCandidates.link}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ py: 1.6, borderRadius: 3, fontWeight: 800, fontSize: '1.05rem' }}
            >
              {forCandidates.buttonText}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: { xs: 3.5, sm: 4.5, md: 5 },
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: '2px solid',
            borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
            boxShadow: (theme) => `0 12px 32px -8px ${alpha(theme.palette.secondary.main, 0.15)}`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: 'secondary.main',
              boxShadow: (theme) => `0 18px 40px -8px ${alpha(theme.palette.secondary.main, 0.25)}`,
            },
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 180,
              height: 180,
              borderRadius: '50%',
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
              pointerEvents: 'none',
            }}
          />

          <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1, mb: 3 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.75,
                width: 'fit-content',
                borderRadius: 50,
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
                color: 'secondary.dark',
              }}
            >
              <VolunteerActivismRoundedIcon sx={{ fontSize: 18 }} />
              <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.2 }}>
                {forDonors.eyebrow}
              </Typography>
            </Box>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                fontSize: { xs: '1.75rem', sm: '2.1rem' },
                lineHeight: 1.25,
              }}
            >
              {forDonors.headline}
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              {forDonors.body}
            </Typography>
          </Stack>

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Button
              component={Link}
              to={forDonors.link}
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ py: 1.6, borderRadius: 3, fontWeight: 800, fontSize: '1.05rem' }}
            >
              {forDonors.buttonText}
            </Button>
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  );
}
