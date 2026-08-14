import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import { Chip, SectionContainer } from '../../../components';
import { trustRegistration } from '../../../pages/impact/certificationsContent';

/** Trust Registration section showcasing official legal registration status and reg number */
export default function TrustRegistrationSection() {
  return (
    <SectionContainer labelledBy="trust-reg-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 5, md: 6 },
          borderRadius: 5,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
          gap: 4,
          alignItems: 'center',
        }}
      >
        <Stack spacing={2.5}>
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
              <GavelRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Chip
              icon={<VerifiedRoundedIcon sx={{ fontSize: '18px !important', color: 'success.main' }} />}
              label="Legal Entity Status"
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.12),
                color: 'success.dark',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.success.main, 0.3),
              }}
            />
          </Stack>

          <Typography
            id="trust-reg-heading"
            variant="h3"
            component="h2"
            sx={{ fontWeight: 900, fontSize: { xs: '1.8rem', md: '2.3rem' }, color: 'text.primary' }}
          >
            {trustRegistration.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            {trustRegistration.body}
          </Typography>
        </Stack>

        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
            border: '1px dashed',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.35),
            textAlign: { xs: 'left', md: 'center' },
            minWidth: { md: 280 },
          }}
        >
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: 1.2, display: 'block' }}>
            Registration Number
          </Typography>
          <Typography variant="h6" component="div" sx={{ fontWeight: 900, color: 'primary.dark', mt: 0.5, wordBreak: 'break-word' }}>
            {trustRegistration.regNumber}
          </Typography>
        </Box>
      </Box>
    </SectionContainer>
  );
}
