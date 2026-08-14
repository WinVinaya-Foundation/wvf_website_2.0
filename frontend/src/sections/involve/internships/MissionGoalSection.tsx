import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';
import { SectionContainer } from '../../../components';
import { missionGoal } from '../../../pages/involve/internshipsContent';

/** Extracts the leading number from a stat string like "0.36%" for the progress bar fill. */
function parseStatPercent(value: string): number | null {
  const match = value.match(/[\d.]+/);
  if (!match) return null;
  const num = parseFloat(match[0]);
  return Number.isFinite(num) ? num : null;
}

/** Mission Goal Section tying internship work directly to India's 0.36% PWD employment gap */
export default function MissionGoalSection() {
  const statPercent = parseStatPercent(missionGoal.statHighlight);

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="mission-goal-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 55%, #1F4A16 100%)`,
          color: 'common.white',
          boxShadow: (theme) => `0 24px 56px -16px ${alpha(theme.palette.secondary.dark, 0.5)}`,
        }}
      >
        {/* Ambient decorative glows */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: -120,
            right: -90,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.35)} 0%, transparent 70%)`,
            filter: 'blur(70px)',
            pointerEvents: 'none',
          }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -110,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.common.white, 0.12)} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' },
            gap: { xs: 5, md: 6 },
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
              <TrackChangesRoundedIcon sx={{ fontSize: 18, color: '#FFC670' }} />
              <Typography variant="overline" sx={{ color: 'common.white', fontWeight: 800, letterSpacing: 1.5 }}>
                {missionGoal.eyebrow}
              </Typography>
            </Box>

            <Typography
              id="mission-goal-heading"
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                color: 'common.white',
                maxWidth: 560,
              }}
            >
              {missionGoal.headline}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                lineHeight: 1.75,
                color: (theme) => alpha(theme.palette.common.white, 0.88),
                fontWeight: 400,
                maxWidth: 540,
              }}
            >
              {missionGoal.body}
            </Typography>
          </Stack>

          {/* Stat Spotlight Card */}
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3.5, sm: 4.5 },
              borderRadius: 4,
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.1),
              backdropFilter: 'blur(16px)',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.common.white, 0.22),
              boxShadow: '0 20px 45px -18px rgba(0, 0, 0, 0.45)',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: '16px',
                mb: 2,
                background: 'linear-gradient(135deg, #FFC670 0%, #FAA43A 100%)',
                boxShadow: '0 10px 24px -6px rgba(250, 164, 58, 0.55)',
              }}
            >
              <TrendingUpRoundedIcon sx={{ fontSize: 28, color: '#2B1400' }} />
            </Box>

            <Typography
              variant="h1"
              component="div"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '3.2rem', sm: '3.6rem', md: '4rem' },
                color: 'common.white',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {missionGoal.statHighlight}
            </Typography>

            {statPercent !== null && (
              <Box aria-hidden="true" sx={{ mt: 2.5 }}>
                <Box
                  sx={{
                    height: 8,
                    borderRadius: 99,
                    bgcolor: (theme) => alpha(theme.palette.common.white, 0.15),
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${Math.min(Math.max(statPercent * 6, 3), 100)}%`,
                      borderRadius: 99,
                      background: 'linear-gradient(90deg, #FFC670 0%, #FAA43A 100%)',
                    }}
                  />
                </Box>
                <Stack direction="row" sx={{ justifyContent: 'space-between', mt: 0.75 }}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: (theme) => alpha(theme.palette.common.white, 0.6) }}>
                    Today
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: (theme) => alpha(theme.palette.common.white, 0.6) }}>
                    Full inclusion
                  </Typography>
                </Stack>
              </Box>
            )}

            <Typography
              variant="body2"
              sx={{
                color: (theme) => alpha(theme.palette.common.white, 0.85),
                mt: 2,
                fontWeight: 500,
                lineHeight: 1.6,
              }}
            >
              {missionGoal.statDescription}
            </Typography>
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  );
}
