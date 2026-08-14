import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import SignLanguageRoundedIcon from '@mui/icons-material/SignLanguageRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer, SectionHeading } from '../../../components';
import { teachingModelContent } from '../../../pages/programs/ourProgramsContent';

const MODEL_HIGHLIGHTS = [
  {
    icon: DevicesRoundedIcon,
    title: 'WinVinaya Academy',
    description: 'Digital learning platform offering self-paced flexibility with multi-format accessibility.',
  },
  {
    icon: RecordVoiceOverRoundedIcon,
    title: 'Human Mentorship',
    description: 'Direct, hands-on guidance from experienced industry trainers throughout the journey.',
  },
  {
    icon: SignLanguageRoundedIcon,
    title: 'Bilingual Delivery',
    description: 'Delivered in simple English and Indian Sign Language (ISL) to eliminate learning barriers.',
  },
];

export default function TeachingModelSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="teaching-model-heading">
      <Box
        sx={{
          borderRadius: { xs: 4, md: 5 },
          p: { xs: 3.5, sm: 5, md: 6 },
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.16),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.06)}`,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '6fr 6fr' },
            gap: { xs: 4, lg: 6 },
            alignItems: 'center',
          }}
        >
          <Stack spacing={3}>
            <SectionHeading
              eyebrow={teachingModelContent.eyebrow}
              title={teachingModelContent.headline}
              titleId="teaching-model-heading"
            />

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                lineHeight: 1.75,
                mt: -2,
              }}
            >
              {teachingModelContent.body}
            </Typography>

            <Box sx={{ pt: 1 }}>
              <Button
                component={Link}
                to={teachingModelContent.link.to}
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{ py: 1.4, px: 3.5, borderRadius: 2.5, fontWeight: 700 }}
              >
                {teachingModelContent.link.label}
              </Button>
            </Box>
          </Stack>

          <Stack spacing={2}>
            {MODEL_HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <Stack
                  key={item.title}
                  direction="row"
                  spacing={2.5}
                  sx={{
                    alignItems: 'center',
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: 3.5,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette.primary.main, 0.18),
                    boxShadow: (theme) => `0 8px 24px -6px ${alpha(theme.palette.grey[900], 0.05)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(6px)',
                      borderColor: 'primary.main',
                      boxShadow: (theme) => `0 12px 28px -6px ${alpha(theme.palette.primary.main, 0.2)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 3,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                      color: 'primary.dark',
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.55 }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </SectionContainer>
  );
}
