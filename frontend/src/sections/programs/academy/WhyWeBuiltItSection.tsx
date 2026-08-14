import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { whyWeBuiltItContent } from '../../../pages/programs/academyContent';

const TIMELINE_ICONS = [AccessTimeRoundedIcon, CloudDoneRoundedIcon, WorkspacePremiumRoundedIcon];

export default function WhyWeBuiltItSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="why-we-built-it-heading">
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
          eyebrow={whyWeBuiltItContent.eyebrow}
          title={whyWeBuiltItContent.headline}
          titleId="why-we-built-it-heading"
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
            {whyWeBuiltItContent.body}
          </Typography>

          <Stack spacing={2}>
            {whyWeBuiltItContent.highlights.map((item, idx) => {
              const Icon = TIMELINE_ICONS[idx % TIMELINE_ICONS.length];
              return (
                <Stack
                  key={item.title}
                  direction="row"
                  spacing={2.5}
                  sx={{
                    alignItems: 'center',
                    p: { xs: 2.25, sm: 2.75 },
                    borderRadius: 3.5,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette.secondary.main, 0.18),
                    boxShadow: (theme) => `0 6px 20px -6px ${alpha(theme.palette.grey[900], 0.05)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(6px)',
                      borderColor: 'secondary.main',
                      boxShadow: (theme) => `0 12px 28px -6px ${alpha(theme.palette.secondary.main, 0.2)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
                      color: 'secondary.dark',
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 24 }} />
                  </Box>

                  <Box>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.05rem' }}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 1,
                          py: 0.25,
                          borderRadius: 50,
                          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
                          color: 'secondary.dark',
                          fontWeight: 700,
                        }}
                      >
                        {item.year}
                      </Typography>
                    </Stack>
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
