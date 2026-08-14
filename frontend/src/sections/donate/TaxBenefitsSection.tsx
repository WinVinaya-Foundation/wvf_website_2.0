import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { SectionContainer } from '../../components';
import { taxBenefits } from '../../pages/donate/donateContent';

export default function TaxBenefitsSection() {
  return (
    <SectionContainer bgcolor={(theme) => alpha(theme.palette.secondary.main, 0.06)} labelledBy="tax-benefits-heading">
      <Box
        sx={{
          maxWidth: 880,
          mx: 'auto',
          p: { xs: 3.5, sm: 5 },
          borderRadius: 5,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.22),
          boxShadow: (theme) => `0 16px 40px -14px ${alpha(theme.palette.grey[900], 0.12)}`,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: 3,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
              color: '#ffffff',
              boxShadow: (theme) => `0 8px 20px -6px ${alpha(theme.palette.secondary.main, 0.55)}`,
              flexShrink: 0,
            }}
          >
            <ReceiptLongRoundedIcon sx={{ fontSize: 27 }} />
          </Box>
          <Stack spacing={0.25}>
            <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 800, letterSpacing: 1.2 }}>
              {taxBenefits.eyebrow}
            </Typography>
            <Typography id="tax-benefits-heading" variant="h5" component="h2" sx={{ fontWeight: 800 }}>
              {taxBenefits.headline}
            </Typography>
          </Stack>
        </Stack>

        <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.75, mb: 3 }}>{taxBenefits.body}</Typography>

        <Stack spacing={1.5}>
          {taxBenefits.registrations.map((registration) => (
            <Stack key={registration} direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
              <VerifiedRoundedIcon sx={{ fontSize: 20, color: 'secondary.main', flexShrink: 0 }} />
              <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>{registration}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </SectionContainer>
  );
}
