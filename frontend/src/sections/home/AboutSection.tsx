import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../components';
import { aboutContent } from '../../pages/home/homeContent';

const ABOUT_PILLARS = [
  {
    icon: SchoolRoundedIcon,
    title: 'For Candidates: Free Tech & ISL Skilling',
    description: 'Software development, testing, RPA, and ISL-interpreted courses built for true accessibility.',
    colorKey: 'primary' as const,
    badge: 'Learn & Grow',
  },
  {
    icon: Diversity3RoundedIcon,
    title: 'For Employers: Merit & Ability First',
    description: 'Connecting job-ready talent living with disabilities to top corporate employers valuing skill over assumption.',
    colorKey: 'secondary' as const,
    badge: 'Hire Inclusion',
  },
  {
    icon: VolunteerActivismRoundedIcon,
    title: 'For Donors: High-Impact Transformation',
    description: 'Every rupee directly funds accessible classrooms, assistive technology, and sustainable economic independence.',
    colorKey: 'info' as const,
    badge: 'Fuel Impact',
  },
];

export default function AboutSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="about-heading">
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
            gridTemplateColumns: { xs: '1fr', lg: '6.5fr 5.5fr' },
            gap: { xs: 4, lg: 6 },
            alignItems: 'center',
          }}
        >
          {/* Main Story & Purpose Content */}
          <Stack spacing={3}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2.25,
                py: 0.75,
                width: 'fit-content',
                borderRadius: 50,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ fontSize: 18, color: 'primary.dark' }} />
              <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1.5, fontWeight: 700 }}>
                Who We Are & What Drives Us
              </Typography>
            </Box>

            <Typography
              id="about-heading"
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                fontSize: { xs: '1.85rem', sm: '2.4rem', md: '2.75rem' },
                lineHeight: 1.2,
              }}
            >
              {aboutContent.headline}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.7,
              }}
            >
              {aboutContent.body}
            </Typography>

            {/* Emphatic Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
              <Button
                component={Link}
                to={aboutContent.link.to}
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{ py: 1.4, px: 3.5, borderRadius: 2.5, fontWeight: 700 }}
              >
                {aboutContent.link.label}
              </Button>

              <Button
                component={Link}
                to="/donate"
                variant="outlined"
                color="secondary"
                size="large"
                sx={{ py: 1.4, px: 3, borderRadius: 2.5, fontWeight: 700 }}
              >
                Donate to a Scholar
              </Button>
            </Stack>
          </Stack>

          {/* Value Pillar Cards (Candidate, Employer, Donor) */}
          <Stack spacing={2.5}>
            {ABOUT_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Box
                  key={pillar.title}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2.5,
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: 3.5,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette[pillar.colorKey].main, 0.2),
                    boxShadow: (theme) => `0 8px 24px -6px ${alpha(theme.palette.grey[900], 0.06)}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: (theme) => theme.palette[pillar.colorKey].main,
                      boxShadow: (theme) => `0 16px 32px -8px ${alpha(theme.palette[pillar.colorKey].main, 0.22)}`,
                      '& .pillar-icon': {
                        transform: 'scale(1.08)',
                        bgcolor: (theme) => theme.palette[pillar.colorKey].main,
                        color: (theme) => theme.palette[pillar.colorKey].contrastText,
                      },
                    },
                  }}
                >
                  <Box
                    className="pillar-icon"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      bgcolor: (theme) => alpha(theme.palette[pillar.colorKey].main, 0.12),
                      color: (theme) => theme.palette[pillar.colorKey].dark || theme.palette[pillar.colorKey].main,
                      flexShrink: 0,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Icon sx={{ fontSize: 26 }} />
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.05rem' }}>
                        {pillar.title}
                      </Typography>
                      <Box
                        sx={{
                          px: 1.25,
                          py: 0.25,
                          borderRadius: 50,
                          bgcolor: (theme) => alpha(theme.palette[pillar.colorKey].main, 0.1),
                          color: (theme) => theme.palette[pillar.colorKey].dark || theme.palette[pillar.colorKey].main,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: 0.5,
                        }}
                      >
                        {pillar.badge}
                      </Box>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.55 }}>
                      {pillar.description}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </SectionContainer>
  );
}


