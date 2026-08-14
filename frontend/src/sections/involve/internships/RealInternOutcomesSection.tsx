import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Chip, SectionContainer } from '../../../components';
import { realInternOutcomes } from '../../../pages/involve/internshipsContent';

/** Real Intern Outcomes Section showcasing Prachi Pandey & Varun Anand success stories */
export default function RealInternOutcomesSection() {
  return (
    <SectionContainer labelledBy="intern-outcomes-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.22),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
        }}
      >
        <Stack spacing={3.5} sx={{ maxWidth: 880 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
                color: 'primary.dark',
              }}
            >
              <StarRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800, letterSpacing: 1.2 }}>
              {realInternOutcomes.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="intern-outcomes-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {realInternOutcomes.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.05rem', sm: '1.2rem' },
              lineHeight: 1.8,
              color: 'text.secondary',
              fontWeight: 450,
            }}
          >
            {realInternOutcomes.body}
          </Typography>

          {/* Featured Alumni Story Tags */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Box
              sx={{
                flex: 1,
                p: 2.5,
                borderRadius: 3,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.divider, 0.8),
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
                <Chip label="Prachi Pandey" size="small" color="primary" sx={{ fontWeight: 800 }} />
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Coding Track
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Transitioned from zero coding background to an internship role at <strong style={{ color: '#245418' }}>Allstate Solutions</strong>.
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                p: 2.5,
                borderRadius: 3,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.divider, 0.8),
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
                <Chip label="Varun Anand" size="small" color="secondary" sx={{ fontWeight: 800 }} />
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Accessibility Track
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Mastered accessible document remediation, transforming awareness into workplace inclusion.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
