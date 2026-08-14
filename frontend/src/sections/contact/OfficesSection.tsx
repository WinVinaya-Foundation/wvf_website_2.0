import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';
import { Chip, SectionContainer, SectionHeading } from '../../components';
import { offices } from '../../pages/contact/contactContent';

const CITY_ACCENTS: Record<string, 'primary' | 'secondary' | 'info'> = {
  Bengaluru: 'primary',
  Tirupur: 'info',
};

/** Our Offices Section — registered, operational, and program-partner addresses, each linking out to directions. */
export default function OfficesSection() {
  return (
    <SectionContainer bgcolor={(theme) => alpha(theme.palette.secondary.main, 0.06)} labelledBy="offices-heading">
      <SectionHeading
        eyebrow="Where We Are"
        title="Our Offices"
        description="Registered in Bengaluru, working out of two hubs — plus a dedicated programs office in Tirupur."
        titleId="offices-heading"
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3.5 }}>
        {offices.map((office) => {
          const accent = CITY_ACCENTS[office.city] ?? 'primary';
          const query = encodeURIComponent(`${office.label}, ${office.lines.join(' ')}`);

          return (
            <Box
              key={`${office.city}-${office.label}`}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                pt: { xs: 3, sm: 3.5 },
                px: { xs: 3.5, sm: 4 },
                pb: { xs: 3.5, sm: 4 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[accent].main, 0.16),
                boxShadow: (theme) => `0 10px 28px -10px ${alpha(theme.palette.grey[900], 0.14)}`,
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: (theme) => `0 22px 44px -14px ${alpha(theme.palette[accent].main, 0.32)}`,
                },
              }}
            >
              {/* Top accent bar — clipped by the card's own overflow:hidden, so no radius math needed */}
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 5,
                  background: (theme) =>
                    `linear-gradient(90deg, ${theme.palette[accent].main} 0%, ${theme.palette[accent].light} 100%)`,
                }}
              />

              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2.75 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 3,
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette[accent].main} 0%, ${theme.palette[accent].dark} 100%)`,
                    color: '#ffffff',
                    flexShrink: 0,
                    boxShadow: (theme) => `0 8px 20px -6px ${alpha(theme.palette[accent].main, 0.55)}`,
                  }}
                >
                  <LocationOnRoundedIcon sx={{ fontSize: 27 }} />
                </Box>
                <Chip
                  label={office.city}
                  size="small"
                  sx={{
                    fontWeight: 800,
                    bgcolor: (theme) => alpha(theme.palette[accent].main, 0.12),
                    color: `${accent}.dark`,
                  }}
                />
              </Stack>

              <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: office.note ? 0.5 : 1.75 }}>
                {office.label}
              </Typography>

              {office.note && (
                <Typography variant="body2" sx={{ color: 'text.disabled', fontStyle: 'italic', mb: 1.75, display: 'block' }}>
                  {office.note}
                </Typography>
              )}

              <Stack spacing={0.5} sx={{ flexGrow: 1, mb: 3 }}>
                {office.lines.map((line) => (
                  <Typography
                    key={line}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      fontSize: { xs: '1rem', sm: '1.0625rem' },
                      lineHeight: 1.75,
                      letterSpacing: 0.1,
                    }}
                  >
                    {line}
                  </Typography>
                ))}
              </Stack>

              <Box
                component="a"
                href={`https://www.google.com/maps/search/?api=1&query=${query}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  alignSelf: 'flex-start',
                  px: 1.75,
                  py: 0.75,
                  borderRadius: 999,
                  color: `${accent}.dark`,
                  bgcolor: (theme) => alpha(theme.palette[accent].main, 0.1),
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s ease',
                  '&:hover': { bgcolor: (theme) => alpha(theme.palette[accent].main, 0.18) },
                  '&:focus-visible': {
                    outline: (theme) => `2px solid ${theme.palette[accent].dark}`,
                    outlineOffset: 2,
                  },
                }}
              >
                <DirectionsRoundedIcon sx={{ fontSize: 18 }} />
                Get Directions
              </Box>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
