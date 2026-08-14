import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import { SectionContainer } from '../../../components';
import { programsHeroContent } from '../../../pages/programs/ourProgramsContent';

const STAT_ICONS = [SchoolRoundedIcon, PublicRoundedIcon, CategoryRoundedIcon];

export default function ProgramsHeroSection() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'background.paper', py: { xs: 4, md: 6 } }}>
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
        <Stack spacing={3.5} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 840, mx: 'auto' }}>
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
              {programsHeroContent.eyebrow}
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
            {programsHeroContent.headline}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: 400,
              color: 'text.secondary',
              fontSize: { xs: '1.05rem', sm: '1.2rem' },
              lineHeight: 1.6,
              maxWidth: 760,
            }}
          >
            {programsHeroContent.subheadline}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2.5,
              width: '100%',
              pt: 2,
            }}
          >
            {programsHeroContent.impactStats.map((stat, idx) => {
              const IconComponent = STAT_ICONS[idx % STAT_ICONS.length];
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
                    borderColor: (theme) => alpha(theme.palette.primary.main, 0.16),
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      borderColor: 'primary.main',
                      boxShadow: (theme) => `0 12px 28px -6px ${alpha(theme.palette.primary.main, 0.18)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 46,
                      height: 46,
                      borderRadius: 2.5,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                      color: 'primary.dark',
                      flexShrink: 0,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 24 }} />
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h5" component="span" sx={{ fontWeight: 800, color: 'text.primary', display: 'block', lineHeight: 1.2 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, lineHeight: 1.3, display: 'block' }}>
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
