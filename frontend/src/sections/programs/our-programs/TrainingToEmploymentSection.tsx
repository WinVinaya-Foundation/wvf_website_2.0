import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer, SectionHeading } from '../../../components';
import { employmentContent } from '../../../pages/programs/ourProgramsContent';

export default function TrainingToEmploymentSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="employment-heading">
      <Box
        sx={{
          borderRadius: { xs: 4, md: 5 },
          p: { xs: 3.5, sm: 5, md: 6 },
          bgcolor: (theme) => alpha(theme.palette.info.main, 0.04),
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.info.main, 0.16),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.06)}`,
        }}
      >
        <SectionHeading
          eyebrow={employmentContent.eyebrow}
          title={employmentContent.headline}
          description={employmentContent.body}
          titleId="employment-heading"
        />

        <Stack spacing={3} sx={{ mt: -2 }}>
          <Typography variant="overline" sx={{ color: 'info.dark', fontWeight: 700, letterSpacing: 1.2 }}>
            Organizations Hiring Our Candidates
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {employmentContent.companies.map((company) => (
              <Stack
                key={company}
                direction="row"
                spacing={2}
                sx={{
                  alignItems: 'center',
                  p: 2.25,
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: (theme) => alpha(theme.palette.info.main, 0.2),
                  boxShadow: (theme) => `0 6px 20px -6px ${alpha(theme.palette.grey[900], 0.05)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    borderColor: 'info.main',
                    boxShadow: (theme) => `0 12px 24px -6px ${alpha(theme.palette.info.main, 0.2)}`,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 2.5,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.12),
                    color: 'info.dark',
                    flexShrink: 0,
                  }}
                >
                  <BusinessRoundedIcon sx={{ fontSize: 22 }} />
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3 }}>
                  {company}
                </Typography>
              </Stack>
            ))}
          </Box>

          <Box sx={{ pt: 2.5, display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              component={Link}
              to={employmentContent.link.to}
              variant="contained"
              color="info"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ py: 1.4, px: 3.5, borderRadius: 2.5, fontWeight: 700 }}
            >
              {employmentContent.link.label}
            </Button>
          </Box>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
