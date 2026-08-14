import { Box, Stack, Typography } from '@mui/material';
import { alpha, type Theme } from '@mui/material/styles';
import { SectionContainer } from '../SectionContainer';

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bgcolor?: string | ((theme: Theme) => string);
}

/** Centered intro banner for interior pages — headline (h1) + optional eyebrow/subtitle, on a
 * soft two-tone brand wash. */
export default function PageHero({ eyebrow, title, subtitle, bgcolor = 'background.default' }: PageHeroProps) {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -120,
          left: '18%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          filter: 'blur(90px)',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -160,
          right: '12%',
          width: 340,
          height: 340,
          borderRadius: '50%',
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
          filter: 'blur(90px)',
        }}
      />

      <SectionContainer bgcolor={bgcolor}>
        <Stack spacing={2.5} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 780, mx: 'auto' }}>
          {eyebrow && (
            <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1.2 }}>
              {eyebrow}
            </Typography>
          )}
          <Typography variant="h1">{title}</Typography>
          {subtitle && (
            <Typography variant="h6" component="p" sx={{ fontWeight: 400, color: 'text.secondary' }}>
              {subtitle}
            </Typography>
          )}
        </Stack>
      </SectionContainer>
    </Box>
  );
}
