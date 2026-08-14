import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { partnershipsContent } from '../../../pages/programs/ourProgramsContent';

export default function PartnershipsSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="partnerships-heading">
      <SectionHeading
        eyebrow={partnershipsContent.eyebrow}
        title={partnershipsContent.headline}
        description={partnershipsContent.body}
        titleId="partnerships-heading"
      />

      <Box sx={{ pt: 1 }}>
        <Stack spacing={2} sx={{ mb: 3.5, alignItems: 'center' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: 50,
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
            }}
          >
            <HandshakeRoundedIcon sx={{ fontSize: 18, color: 'secondary.dark' }} />
            <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 700, letterSpacing: 1.2 }}>
              Current Academic & Institutional Partners
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 2.5,
          }}
        >
          {partnershipsContent.partners.map((partner) => (
            <Box
              key={partner.name}
              sx={{
                p: 3,
                borderRadius: 3.5,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
                boxShadow: (theme) => `0 8px 24px -6px ${alpha(theme.palette.grey[900], 0.05)}`,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: 'secondary.main',
                  boxShadow: (theme) => `0 14px 28px -6px ${alpha(theme.palette.secondary.main, 0.2)}`,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: 3,
                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
                  color: 'secondary.dark',
                  mb: 2,
                }}
              >
                <AccountBalanceRoundedIcon sx={{ fontSize: 26 }} />
              </Box>

              <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1, lineHeight: 1.3 }}>
                {partner.name}
              </Typography>

              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.5,
                  py: 0.4,
                  borderRadius: 50,
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.1),
                  color: 'text.secondary',
                }}
              >
                <LocationOnRoundedIcon sx={{ fontSize: 15, color: 'secondary.main' }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {partner.location}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </SectionContainer>
  );
}
