import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { Chip, SectionContainer, SectionHeading } from '../../../components';
import { trainingTracksContent } from '../../../pages/programs/ourProgramsContent';

const TRACK_ICONS = [CodeRoundedIcon, AccountBalanceRoundedIcon];

export default function TrainingTracksSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="training-tracks-heading">
      <SectionHeading
        eyebrow={trainingTracksContent.eyebrow}
        title={trainingTracksContent.headline}
        titleId="training-tracks-heading"
      />

      <Stack spacing={4}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3.5,
          }}
        >
          {trainingTracksContent.tracks.map((track, idx) => {
            const IconComponent = TRACK_ICONS[idx % TRACK_ICONS.length];
            const isPrimary = idx === 0;
            const accentColor = isPrimary ? 'primary' : 'secondary';

            return (
              <Box
                key={track.title}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: (theme) => alpha(theme.palette[accentColor].main, 0.2),
                  boxShadow: (theme) => `0 10px 30px -8px ${alpha(theme.palette.grey[900], 0.06)}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: (theme) => theme.palette[accentColor].main,
                    boxShadow: (theme) => `0 16px 36px -8px ${alpha(theme.palette[accentColor].main, 0.2)}`,
                  },
                }}
              >
                <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 52,
                        height: 52,
                        borderRadius: 3,
                        bgcolor: (theme) => alpha(theme.palette[accentColor].main, 0.12),
                        color: (theme) => theme.palette[accentColor].dark || theme.palette[accentColor].main,
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
                      {track.title}
                    </Typography>
                  </Stack>

                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.65 }}>
                    {track.description}
                  </Typography>

                  <Box sx={{ pt: 1 }}>
                    <Typography variant="overline" sx={{ color: `${accentColor}.dark`, fontWeight: 700, display: 'block', mb: 1.5, letterSpacing: 1 }}>
                      Key Modules & Tech Stack
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {track.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          color={accentColor}
                          variant="filled"
                        />
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.05),
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.info.main, 0.2),
            boxShadow: (theme) => `0 8px 24px -6px ${alpha(theme.palette.info.main, 0.08)}`,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '4.5fr 7.5fr' },
              gap: 3,
              alignItems: 'center',
            }}
          >
            <Stack spacing={1}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <VerifiedRoundedIcon sx={{ fontSize: 24, color: 'info.main' }} />
                <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
                  {trainingTracksContent.sharedFoundation.title}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {trainingTracksContent.sharedFoundation.description}
              </Typography>
            </Stack>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {trainingTracksContent.sharedFoundation.skills.map((skill) => (
                <Box
                  key={skill}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 50,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette.info.main, 0.25),
                  }}
                >
                  <CheckCircleOutlineRoundedIcon sx={{ fontSize: 18, color: 'info.main' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {skill}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Stack>
    </SectionContainer>
  );
}
