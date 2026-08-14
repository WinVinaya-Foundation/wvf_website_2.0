import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import { Chip, SectionContainer, SectionHeading } from '../../../components';
import { internshipTracks } from '../../../pages/involve/internshipsContent';

const trackIcons = [
  CodeRoundedIcon,
  AccessibilityNewRoundedIcon,
  SchoolRoundedIcon,
  CampaignRoundedIcon,
  BusinessCenterRoundedIcon,
];

const trackAccents = ['primary', 'secondary', 'info', 'primary', 'secondary'] as const;

/** Internship Tracks Section showcasing 5 hands-on project disciplines */
export default function InternshipTracksSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="internship-tracks-heading" id="tracks">
      <SectionHeading
        eyebrow="Specialization Tracks"
        title={internshipTracks.headline}
        description={internshipTracks.description}
        align="center"
        titleId="internship-tracks-heading"
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3.5 }}>
        {internshipTracks.tracks.map((track, index) => {
          const Icon = trackIcons[index % trackIcons.length];
          const accent = trackAccents[index % trackAccents.length];

          return (
            <Box
              key={track.title}
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
                  label={track.badge}
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
                {track.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {track.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
