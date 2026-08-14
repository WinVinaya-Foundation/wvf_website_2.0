import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { Link } from '@tanstack/react-router';
import { Button, Chip, SectionContainer } from '../../../components';
import { csrCompliance } from '../../../pages/involve/corporateEngagementContent';

/** CSR & Compliance Alignment Section — MCA CSR-1 registration as a due-diligence shortcut */
export default function CsrComplianceSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="csr-compliance-heading">
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
              icon={<VerifiedRoundedIcon sx={{ fontSize: '16px !important' }} />}
              label={csrCompliance.documentTitle}
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
            id="csr-compliance-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {csrCompliance.headline}
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
            {csrCompliance.body}
          </Typography>

          <Stack sx={{ pt: 1 }}>
            <Button
              component={Link}
              to={csrCompliance.to}
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ alignSelf: 'flex-start', fontWeight: 800, py: 1.5, px: 3.5, borderRadius: 3 }}
            >
              {csrCompliance.linkText}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
