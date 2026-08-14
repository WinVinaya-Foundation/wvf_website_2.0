import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { howItWorks } from '../../../pages/involve/volunteerContent';

/** How It Works Section featuring a visual 3-step onboarding flow */
export default function HowItWorksSection() {
  return (
    <SectionContainer labelledBy="how-it-works-heading">
      <SectionHeading
        eyebrow="Simple Onboarding"
        title={howItWorks.headline}
        description="Getting started as a volunteer is quick, transparent, and matched to your schedule."
        align="center"
        titleId="how-it-works-heading"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3.5,
          maxWidth: 1100,
          mx: 'auto',
        }}
      >
        {howItWorks.steps.map((step, index) => (
          <Box
            key={step.stepNumber}
            sx={{
              position: 'relative',
              height: '100%',
              p: { xs: 3.5, sm: 4 },
              borderRadius: 4,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: (theme) => `0 20px 40px -12px ${alpha(theme.palette.primary.main, 0.2)}`,
              },
            }}
          >
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography
                variant="h2"
                component="span"
                sx={{
                  fontWeight: 900,
                  fontSize: '2.5rem',
                  color: (theme) => alpha(theme.palette.primary.main, 0.35),
                  lineHeight: 1,
                }}
              >
                {step.stepNumber}
              </Typography>

              {index < howItWorks.steps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    color: (theme) => alpha(theme.palette.primary.main, 0.4),
                  }}
                >
                  <ArrowForwardRoundedIcon sx={{ fontSize: 24 }} />
                </Box>
              )}
            </Stack>

            <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5 }}>
              {step.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {step.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </SectionContainer>
  );
}
