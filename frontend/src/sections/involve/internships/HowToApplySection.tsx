import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { howToApply } from '../../../pages/involve/internshipsContent';

/** How to Apply Section featuring a visual 3-step application process flow */
export default function HowToApplySection() {
  return (
    <SectionContainer labelledBy="how-apply-heading" id="how-to-apply">
      <SectionHeading
        eyebrow="Application Process"
        title={howToApply.headline}
        description={howToApply.description}
        align="center"
        titleId="how-apply-heading"
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
        {howToApply.steps.map((step, index) => (
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

              {index < howToApply.steps.length - 1 && (
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
