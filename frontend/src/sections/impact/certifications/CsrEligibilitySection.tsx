import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { Link } from '@tanstack/react-router';
import { Button, Chip, SectionContainer } from '../../../components';
import { csrEligibility } from '../../../pages/impact/certificationsContent';

/** Corporate CSR Eligibility Section showcasing MCA CSR-1 registration status */
export default function CsrEligibilitySection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="csr-eligibility-heading">
      <Box
        sx={{
          p: { xs: 4, sm: 5, md: 6 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
          boxShadow: (theme) => `0 12px 36px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: 880 }}>
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
              <BusinessCenterRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Chip
              label="MCA CSR-1 Registered"
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                color: 'primary.dark',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
              }}
            />
          </Stack>

          <Typography
            id="csr-eligibility-heading"
            variant="h3"
            component="h2"
            sx={{ fontWeight: 900, fontSize: { xs: '1.8rem', md: '2.3rem' }, color: 'text.primary' }}
          >
            {csrEligibility.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            {csrEligibility.body}
          </Typography>

          {/* CSR Approval Letter Action Box */}
          <Box
            sx={{
              mt: 1,
              p: 3,
              borderRadius: 4,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.divider, 0.8),
              boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2.5,
            }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                }}
              >
                <DescriptionRoundedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
                  {csrEligibility.documentTitle}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Ministry of Corporate Affairs Registration Document
                </Typography>
              </Box>
            </Stack>

            <Button
              component={Link}
              to={csrEligibility.to}
              variant="contained"
              color="primary"
              size="medium"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ flexShrink: 0, fontWeight: 800, px: 3 }}
            >
              {csrEligibility.linkText}
            </Button>
          </Box>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
