import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link } from '@tanstack/react-router';
import type { CtaLink } from '../../model/content';
import { Button } from '../Button';
import { SectionContainer } from '../SectionContainer';

export interface ClosingCtaBannerProps {
  headline: string;
  body: string;
  ctas: CtaLink[];
  /** Id for the heading — exposes this banner as a named landmark region for screen reader navigation. */
  headingId: string;
}

function isHashLink(to: string): boolean {
  return to.startsWith('#');
}

export default function ClosingCtaBanner({ headline, body, ctas, headingId }: ClosingCtaBannerProps) {
  const [primaryCta, ...secondaryCtas] = ctas;
  const primaryIsDonateStyled = primaryCta?.to === '/donate' || (primaryCta ? isHashLink(primaryCta.to) : false);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1B365D 0%, #0F172A 50%, #0D9488 100%)',
        py: { xs: 4, sm: 5, md: 6 },
      }}
    >
      {/* Multi-Color Ambient Glow Flares */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -120,
          left: '20%',
          width: 450,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 90, 54, 0.3) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -120,
          right: '20%',
          width: 450,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <SectionContainer bgcolor="transparent" color="common.white" labelledBy={headingId}>
        <Stack spacing={2.5} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 760, mx: 'auto', position: 'relative', zIndex: 1 }}>
          <Typography
            id={headingId}
            variant="h2"
            sx={{
              color: '#ffffff',
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
            }}
          >
            {headline}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              color: alpha('#ffffff', 0.9),
              fontWeight: 400,
              fontSize: { xs: '1.05rem', sm: '1.2rem' },
              lineHeight: 1.6,
            }}
          >
            {body}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ pt: 1 }}>
            {primaryCta &&
              (() => {
                const primarySx = {
                  bgcolor: primaryIsDonateStyled ? '#3B6E2E' : '#FF5A36',
                  color: '#ffffff',
                  fontWeight: 800,
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  boxShadow: primaryIsDonateStyled
                    ? '0 10px 24px -4px rgba(59, 110, 46, 0.5)'
                    : '0 10px 24px -4px rgba(255, 90, 54, 0.5)',
                  '&:hover': {
                    bgcolor: primaryIsDonateStyled ? '#294F20' : '#E04826',
                    boxShadow: primaryIsDonateStyled
                      ? '0 16px 32px -4px rgba(59, 110, 46, 0.65)'
                      : '0 16px 32px -4px rgba(255, 90, 54, 0.65)',
                  },
                } as const;

                return isHashLink(primaryCta.to) ? (
                  <Button component="a" href={primaryCta.to} variant="contained" size="large" sx={primarySx}>
                    {primaryCta.label}
                  </Button>
                ) : (
                  <Button component={Link} to={primaryCta.to} variant="contained" size="large" sx={primarySx}>
                    {primaryCta.label}
                  </Button>
                );
              })()}

            {secondaryCtas.map((cta) => {
              const secondarySx = {
                color: '#ffffff',
                borderColor: alpha('#ffffff', 0.6),
                fontWeight: 800,
                py: 1.5,
                px: 4,
                borderRadius: 3,
                '&:hover': {
                  borderColor: '#ffffff',
                  bgcolor: alpha('#ffffff', 0.12),
                },
              } as const;

              return isHashLink(cta.to) ? (
                <Button key={cta.to} component="a" href={cta.to} variant="outlined" size="large" sx={secondarySx}>
                  {cta.label}
                </Button>
              ) : (
                <Button key={cta.to} component={Link} to={cta.to} variant="outlined" size="large" sx={secondarySx}>
                  {cta.label}
                </Button>
              );
            })}
          </Stack>
        </Stack>
      </SectionContainer>
    </Box>
  );
}
