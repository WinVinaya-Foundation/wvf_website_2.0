import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { careerBenefits } from '../../../pages/resources/careersContent';

const benefitIcons = [VisibilityRoundedIcon, HomeWorkRoundedIcon, Diversity3RoundedIcon, RocketLaunchRoundedIcon];
const benefitAccents = ['primary', 'secondary', 'info', 'primary'] as const;

/** What You Can Expect Section — four practical, day-to-day reasons to work here */
export default function CareerBenefitsSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="career-benefits-heading">
      <SectionHeading
        eyebrow="Life at WinVinaya"
        title={careerBenefits.headline}
        description={careerBenefits.description}
        align="center"
        titleId="career-benefits-heading"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 3.5,
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        {careerBenefits.items.map((benefit, index) => {
          const Icon = benefitIcons[index % benefitIcons.length];
          const accent = benefitAccents[index % benefitAccents.length];

          return (
            <Box
              key={benefit.title}
              sx={{
                p: { xs: 3.5, sm: 4 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[accent].main, 0.22),
                boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => `0 16px 36px -12px ${alpha(theme.palette[accent].main, 0.22)}`,
                },
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 46,
                    height: 46,
                    borderRadius: 3,
                    bgcolor: (theme) => alpha(theme.palette[accent].main, 0.14),
                    color: `${accent}.dark`,
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ fontSize: 26 }} />
                </Box>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.2rem' }}>
                  {benefit.title}
                </Typography>
              </Stack>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '1rem' }}>
                {benefit.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
