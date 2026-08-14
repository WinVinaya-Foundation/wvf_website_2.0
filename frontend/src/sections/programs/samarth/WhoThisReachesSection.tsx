import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import AccessibleRoundedIcon from '@mui/icons-material/AccessibleRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { whoThisReachesContent } from '../../../pages/programs/samarthContent';

const GROUP_ICONS = [FemaleRoundedIcon, AccessibleRoundedIcon];
const COLOR_KEYS = ['secondary', 'primary'] as const;

export default function WhoThisReachesSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="who-this-reaches-heading">
      <SectionHeading
        eyebrow={whoThisReachesContent.eyebrow}
        title={whoThisReachesContent.headline}
        description={whoThisReachesContent.body}
        titleId="who-this-reaches-heading"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3.5,
          pt: 1,
        }}
      >
        {whoThisReachesContent.targetGroups.map((group, idx) => {
          const Icon = GROUP_ICONS[idx % GROUP_ICONS.length];
          const colorKey = COLOR_KEYS[idx % COLOR_KEYS.length];

          return (
            <Box
              key={group.title}
              sx={{
                p: { xs: 3.5, sm: 4.5 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[colorKey].main, 0.22),
                boxShadow: (theme) => `0 10px 30px -8px ${alpha(theme.palette.grey[900], 0.06)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: (theme) => theme.palette[colorKey].main,
                  boxShadow: (theme) => `0 16px 36px -8px ${alpha(theme.palette[colorKey].main, 0.2)}`,
                },
              }}
            >
              <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: 3.5,
                    bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.12),
                    color: (theme) => theme.palette[colorKey].dark || theme.palette[colorKey].main,
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ fontSize: 30 }} />
                </Box>

                <Stack spacing={1}>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.3rem' }}>
                    {group.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {group.description}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
