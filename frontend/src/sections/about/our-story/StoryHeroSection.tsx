import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { SectionContainer } from '../../../components';
import { storyHero } from '../../../pages/about/ourStoryContent';

const HERO_STATS = [
  { icon: WorkspacePremiumRoundedIcon, label: 'Established', value: '2016' },
  { icon: GroupsRoundedIcon, label: 'Scholars Trained', value: '4,500+' },
  { icon: TrendingUpRoundedIcon, label: 'Career Placements', value: '3,200+' },
];

export default function StoryHeroSection() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'background.paper', py: { xs: 4, md: 6 } }}>
      {/* Ambient Gradient Flares */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -120,
          left: '20%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -120,
          right: '15%',
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.12)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <SectionContainer>
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 820, mx: 'auto' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.25,
              py: 0.75,
              borderRadius: 50,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 18, color: 'primary.dark' }} />
            <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1.5, fontWeight: 700 }}>
              Our Origin & Mission
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1.15,
              color: 'text.primary',
            }}
          >
            {storyHero.headline}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: 400,
              color: 'text.secondary',
              fontSize: { xs: '1.05rem', sm: '1.2rem' },
              lineHeight: 1.6,
            }}
          >
            {storyHero.subheadline}
          </Typography>

          {/* Quick Highlight Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2.5,
              width: '100%',
              pt: 3,
            }}
          >
            {HERO_STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <Stack
                  key={stat.label}
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: 'center',
                    p: 2.5,
                    borderRadius: 3.5,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette.primary.main, 0.15),
                  }}
                >
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
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
              );
            })}
          </Box>
        </Stack>
      </SectionContainer>
    </Box>
  );
}

