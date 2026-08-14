import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { builtWithPartnersContent } from '../../../pages/programs/academyContent';

export default function BuiltWithPartnersSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="built-partners-heading">
      <SectionHeading
        eyebrow={builtWithPartnersContent.eyebrow}
        title={builtWithPartnersContent.headline}
        description={builtWithPartnersContent.body}
        titleId="built-partners-heading"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          pt: 1,
        }}
      >
        {builtWithPartnersContent.partners.map((partner) => (
          <Box
            key={partner.name}
            sx={{
              p: { xs: 3, sm: 3.5 },
              borderRadius: 3.5,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
              boxShadow: (theme) => `0 8px 24px -6px ${alpha(theme.palette.grey[900], 0.05)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: 'secondary.main',
                boxShadow: (theme) => `0 14px 28px -6px ${alpha(theme.palette.secondary.main, 0.2)}`,
              },
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
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
                  }}
                >
                  <ExtensionRoundedIcon sx={{ fontSize: 26 }} />
                </Box>

                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1.5,
                    py: 0.4,
                    borderRadius: 50,
                    bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                    color: 'secondary.dark',
                  }}
                >
                  <HandshakeRoundedIcon sx={{ fontSize: 15 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {partner.role}
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.25rem' }}>
                {partner.name}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {partner.description}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Box>
    </SectionContainer>
  );
}
