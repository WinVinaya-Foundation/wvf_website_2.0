import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { Link } from '@tanstack/react-router';
import { SectionContainer, SectionHeading } from '../../../components';
import { taxCertifications } from '../../../pages/impact/certificationsContent';

/** Tax & Donation Certifications Section featuring 80G and 12A exemption certificates */
export default function TaxCertificationsSection() {
  return (
    <SectionContainer labelledBy="tax-cert-heading">
      <SectionHeading
        eyebrow="Donor Benefits"
        title={taxCertifications.headline}
        description={taxCertifications.body}
        align="center"
        titleId="tax-cert-heading"
      />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3.5} sx={{ maxWidth: 1000, mx: 'auto' }}>
        {taxCertifications.items.map((item, index) => {
          const Icon = index === 0 ? ReceiptLongRoundedIcon : WorkspacePremiumRoundedIcon;
          const accentColor = index === 0 ? 'primary' : 'info';

          return (
            <Box
              key={item.title}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 3.5, sm: 4.5 },
                borderRadius: 5,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[accentColor].main, 0.25),
                boxShadow: (theme) => `0 12px 32px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: (theme) => `0 20px 40px -12px ${alpha(theme.palette[accentColor].main, 0.25)}`,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  bgcolor: (theme) => alpha(theme.palette[accentColor].main, 0.14),
                  color: `${accentColor}.dark`,
                  mb: 3,
                }}
              >
                <Icon sx={{ fontSize: 30 }} />
              </Box>

              <Typography variant="h4" component="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5 }}>
                {item.title}
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, flexGrow: 1, mb: 3 }}>
                {item.description}
              </Typography>

              <Box
                component={Link}
                to={item.to}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: `${accentColor}.dark`,
                  textDecoration: 'none',
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: (theme) => alpha(theme.palette.divider, 0.8),
                  '&:hover': {
                    color: `${accentColor}.main`,
                    '& svg': { transform: 'translateX(4px)' },
                  },
                }}
              >
                <span>{item.linkText}</span>
                <ArrowForwardRoundedIcon sx={{ fontSize: 20, transition: 'transform 0.2s ease' }} />
              </Box>
            </Box>
          );
        })}
      </Stack>
    </SectionContainer>
  );
}
