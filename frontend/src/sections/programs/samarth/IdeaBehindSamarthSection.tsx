import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { ideaBehindSamarthContent } from '../../../pages/programs/samarthContent';

export default function IdeaBehindSamarthSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="idea-behind-heading">
      <Box
        sx={{
          borderRadius: { xs: 4, md: 5 },
          p: { xs: 3.5, sm: 5, md: 6 },
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.04),
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.16),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.06)}`,
        }}
      >
        <SectionHeading
          eyebrow={ideaBehindSamarthContent.eyebrow}
          title={ideaBehindSamarthContent.headline}
          titleId="idea-behind-heading"
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '6.5fr 5.5fr' },
            gap: { xs: 4, lg: 6 },
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1.05rem', sm: '1.15rem' },
              lineHeight: 1.8,
            }}
          >
            {ideaBehindSamarthContent.body}
          </Typography>

          <Stack spacing={3}>
            <Box
              sx={{
                p: { xs: 3, sm: 3.5 },
                borderRadius: 3.5,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
                boxShadow: (theme) => `0 10px 28px -6px ${alpha(theme.palette.secondary.main, 0.15)}`,
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', mb: 1.5 }}>
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
                    flexShrink: 0,
                  }}
                >
                  <LightbulbRoundedIcon sx={{ fontSize: 24 }} />
                </Box>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.3 }}>
                  The Core Insight
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontStyle: 'italic' }}>
                "{ideaBehindSamarthContent.keyTakeaway}"
              </Typography>
            </Box>

            <Box
              sx={{
                p: { xs: 3, sm: 3.5 },
                borderRadius: 3.5,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <StorefrontRoundedIcon sx={{ fontSize: 32, color: 'primary.dark' }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Micro & Small Livelihoods
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Enabling self-directed earning on local terms.
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </SectionContainer>
  );
}
