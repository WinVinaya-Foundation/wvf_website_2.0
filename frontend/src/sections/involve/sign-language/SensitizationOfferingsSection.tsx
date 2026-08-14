import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { sensitizationOfferings } from '../../../pages/involve/signLanguageContent';

const offeringIcons = [SchoolRoundedIcon, Diversity3RoundedIcon, GroupsRoundedIcon];
const offeringAccents = ['secondary', 'info', 'primary'] as const;

/** What Sensitization Looks Like With Us Section — the three delivery formats offered */
export default function SensitizationOfferingsSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="sensitization-offerings-heading">
      <SectionHeading
        eyebrow="How We Deliver It"
        title={sensitizationOfferings.headline}
        description={sensitizationOfferings.description}
        align="center"
        titleId="sensitization-offerings-heading"
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3.5 }}>
        {sensitizationOfferings.items.map((item, index) => {
          const Icon = offeringIcons[index % offeringIcons.length];
          const accent = offeringAccents[index % offeringAccents.length];

          return (
            <Box
              key={item.title}
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: 3,
                  mb: 2.5,
                  bgcolor: (theme) => alpha(theme.palette[accent].main, 0.14),
                  color: `${accent}.dark`,
                  border: '1px solid',
                  borderColor: (theme) => alpha(theme.palette[accent].main, 0.3),
                }}
              >
                <Icon sx={{ fontSize: 26 }} />
              </Box>

              <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5, fontSize: '1.15rem' }}>
                {item.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {item.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
