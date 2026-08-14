import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { whoItsForContent } from '../../../pages/programs/academyContent';

const AUDIENCE_ICONS = [PersonRoundedIcon, SchoolRoundedIcon, HandshakeRoundedIcon];

export default function WhoItsForSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="who-its-for-heading">
      <SectionHeading
        eyebrow={whoItsForContent.eyebrow}
        title={whoItsForContent.headline}
        titleId="who-its-for-heading"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3.5,
        }}
      >
        {whoItsForContent.audiences.map((audience, idx) => {
          const Icon = AUDIENCE_ICONS[idx % AUDIENCE_ICONS.length];
          const badgeColor = audience.badgeColor;

          return (
            <Box
              key={audience.title}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 3.5, sm: 4 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[badgeColor].main, 0.22),
                boxShadow: (theme) => `0 10px 30px -8px ${alpha(theme.palette.grey[900], 0.06)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  borderColor: (theme) => theme.palette[badgeColor].main,
                  boxShadow: (theme) => `0 18px 36px -8px ${alpha(theme.palette[badgeColor].main, 0.22)}`,
                },
              }}
            >
              <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      bgcolor: (theme) => alpha(theme.palette[badgeColor].main, 0.12),
                      color: (theme) => theme.palette[badgeColor].dark || theme.palette[badgeColor].main,
                    }}
                  >
                    <Icon sx={{ fontSize: 28 }} />
                  </Box>

                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 50,
                      bgcolor: (theme) => alpha(theme.palette[badgeColor].main, 0.1),
                      color: (theme) => theme.palette[badgeColor].dark || theme.palette[badgeColor].main,
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                      {audience.subtitle}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.25rem' }}>
                  {audience.title}
                </Typography>

                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {audience.description}
                </Typography>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
