import { Box, Stack, Typography, LinearProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer, SectionHeading } from '../../../components';
import { sharedMissionContent } from '../../../pages/programs/samarthContent';

export default function SharedMissionSection() {
  const {
    eyebrow,
    headline,
    body,
    goalAmountLakhs,
    currentAmountLakhs,
    targetEntrepreneurs,
    currentEntrepreneurs,
  } = sharedMissionContent;

  const percentageRaised = Math.round((currentAmountLakhs / goalAmountLakhs) * 100);
  const percentageEntrepreneurs = Math.round((currentEntrepreneurs / targetEntrepreneurs) * 100);

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="shared-mission-heading">
      <Box
        sx={{
          borderRadius: { xs: 4, md: 5 },
          p: { xs: 3.5, sm: 5, md: 6 },
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.05),
          border: '2px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.secondary.main, 0.12)}`,
        }}
      >
        <SectionHeading
          eyebrow={eyebrow}
          title={headline}
          description={body}
          titleId="shared-mission-heading"
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '6fr 6fr' },
            gap: 4,
            alignItems: 'center',
            pt: 1,
          }}
        >
          {/* Live Tracker Card 1: Funding Progress */}
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3.5,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
              boxShadow: (theme) => `0 10px 28px -6px ${alpha(theme.palette.grey[900], 0.06)}`,
            }}
          >
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 44,
                      height: 44,
                      borderRadius: 2.5,
                      bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
                      color: 'secondary.dark',
                    }}
                  >
                    <SavingsRoundedIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                      ₹{currentAmountLakhs} Lakhs Raised
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      Target: ₹{goalAmountLakhs} Lakhs
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 50,
                    bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
                    color: 'secondary.dark',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {percentageRaised}% Raised
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  value={percentageRaised}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 6,
                      bgcolor: 'secondary.main',
                    },
                  }}
                />
              </Box>
            </Stack>
          </Box>

          {/* Live Tracker Card 2: Entrepreneurs Trained */}
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3.5,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
              boxShadow: (theme) => `0 10px 28px -6px ${alpha(theme.palette.grey[900], 0.06)}`,
            }}
          >
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 44,
                      height: 44,
                      borderRadius: 2.5,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                      color: 'primary.dark',
                    }}
                  >
                    <GroupsRoundedIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                      {currentEntrepreneurs} Entrepreneurs Trained
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      Goal: {targetEntrepreneurs} Rural Entrepreneurs
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 50,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                    color: 'primary.dark',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {percentageEntrepreneurs}% Complete
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  value={percentageEntrepreneurs}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 6,
                      bgcolor: 'primary.main',
                    },
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ pt: 4, textAlign: 'center' }}>
          <Button
            component={Link}
            to="/donate"
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<VolunteerActivismRoundedIcon />}
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{ py: 1.5, px: 4, borderRadius: 3, fontWeight: 800 }}
          >
            Help Us Reach Our Goal
          </Button>
        </Box>
      </Box>
    </SectionContainer>
  );
}
