import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import SignLanguageRoundedIcon from '@mui/icons-material/SignLanguageRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import { Chip, SectionContainer, SectionHeading } from '../../../components';
import { waysToVolunteer } from '../../../pages/involve/volunteerContent';

const categoryIcons = [
  PsychologyRoundedIcon,
  SchoolRoundedIcon,
  SignLanguageRoundedIcon,
  BusinessCenterRoundedIcon,
  ArticleRoundedIcon,
  EventAvailableRoundedIcon,
];

const categoryAccents = ['primary', 'secondary', 'info', 'primary', 'secondary', 'info'] as const;

/** Ways to Volunteer Section featuring 6 interactive skill-matching category tiles */
export default function WaysToVolunteerSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="ways-to-volunteer-heading" id="ways-to-volunteer">
      <SectionHeading
        eyebrow="Volunteer Opportunities"
        title={waysToVolunteer.headline}
        description="Explore the key tracks where your time and talents make an immediate, lasting difference."
        align="center"
        titleId="ways-to-volunteer-heading"
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3.5 }}>
        {waysToVolunteer.categories.map((category, index) => {
          const Icon = categoryIcons[index % categoryIcons.length];
          const accent = categoryAccents[index % categoryAccents.length];

          return (
            <Box
              key={category.title}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 3.5, sm: 4 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                background: (theme) =>
                  `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette[accent].main, 0.04)} 100%)`,
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[accent].main, 0.22),
                boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  borderColor: `${accent}.main`,
                  boxShadow: (theme) => `0 20px 40px -12px ${alpha(theme.palette[accent].main, 0.22)}`,
                },
              }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    bgcolor: (theme) => alpha(theme.palette[accent].main, 0.14),
                    color: `${accent}.dark`,
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette[accent].main, 0.3),
                  }}
                >
                  <Icon sx={{ fontSize: 26 }} />
                </Box>

                <Chip
                  label={category.badge}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    bgcolor: (theme) => alpha(theme.palette[accent].main, 0.12),
                    color: `${accent}.dark`,
                  }}
                />
              </Stack>

              <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5, fontSize: '1.2rem' }}>
                {category.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {category.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
