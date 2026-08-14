import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SignLanguageRoundedIcon from '@mui/icons-material/SignLanguageRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../../components';
import { learnSignLanguageIntro } from '../../../pages/involve/signLanguageContent';

/** Part Two divider — a bold banner introducing the Learn Sign Language half of the page */
export default function LearnSignLanguageIntroSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="learn-sign-language-heading" id="learn-sign-language">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) => `linear-gradient(135deg, ${theme.palette.info.dark} 0%, ${theme.palette.info.main} 55%, #0B2E45 100%)`,
          color: 'common.white',
          boxShadow: (theme) => `0 24px 56px -16px ${alpha(theme.palette.info.dark, 0.5)}`,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: -120,
            right: '15%',
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.28)} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            bottom: -150,
            left: '10%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.common.white, 0.12)} 0%, transparent 70%)`,
            filter: 'blur(70px)',
            pointerEvents: 'none',
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.3fr 1fr' },
            gap: { xs: 4, lg: 6 },
            alignItems: 'center',
          }}
        >
          <Stack spacing={2.5}>
            <Box
              sx={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                alignItems: 'center',
                gap: 1,
                px: 2.25,
                py: 0.75,
                borderRadius: 50,
                bgcolor: (theme) => alpha(theme.palette.common.white, 0.14),
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.common.white, 0.3),
                backdropFilter: 'blur(8px)',
              }}
            >
              <SignLanguageRoundedIcon sx={{ fontSize: 18, color: '#FFC670' }} />
              <Typography variant="overline" sx={{ color: 'common.white', fontWeight: 800, letterSpacing: 1.5 }}>
                {learnSignLanguageIntro.eyebrow}
              </Typography>
            </Box>

            <Typography
              id="learn-sign-language-heading"
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '1.9rem', sm: '2.5rem', md: '2.9rem' },
                lineHeight: 1.2,
                color: 'common.white',
              }}
            >
              {learnSignLanguageIntro.headline}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                lineHeight: 1.8,
                color: (theme) => alpha(theme.palette.common.white, 0.9),
                fontWeight: 500,
              }}
            >
              {learnSignLanguageIntro.subheadline}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.98rem', sm: '1.05rem' },
                lineHeight: 1.8,
                color: (theme) => alpha(theme.palette.common.white, 0.82),
              }}
            >
              {learnSignLanguageIntro.body}
            </Typography>
          </Stack>

          {/* Stat Spotlight Card */}
          <Box
            sx={{
              p: { xs: 3.5, sm: 4 },
              borderRadius: 4,
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.1),
              backdropFilter: 'blur(16px)',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.common.white, 0.22),
              boxShadow: '0 20px 45px -18px rgba(0, 0, 0, 0.45)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h1"
              component="div"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '3.2rem', sm: '3.6rem' },
                color: 'common.white',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {learnSignLanguageIntro.stat.value}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: (theme) => alpha(theme.palette.common.white, 0.85), mt: 1.5, fontWeight: 500, lineHeight: 1.6 }}
            >
              {learnSignLanguageIntro.stat.label}
            </Typography>

            <Button
              component={Link}
              to={learnSignLanguageIntro.sourceLink.to}
              variant="text"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ mt: 2, color: 'common.white', fontWeight: 700, textDecoration: 'underline' }}
            >
              {learnSignLanguageIntro.sourceLink.label}
            </Button>
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  );
}
