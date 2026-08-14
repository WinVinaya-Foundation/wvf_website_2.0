import type { ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { alpha, type Theme } from '@mui/material/styles';
import { Link } from '@tanstack/react-router';
import type { CtaLink } from '../../../model/content';
import { Button, SectionContainer } from '../../../components';

interface NarrativeSectionProps {
  eyebrow?: string;
  title: string;
  body: string;
  icon: ReactNode;
  bgcolor: string | ((theme: Theme) => string);
  titleId: string;
  accent?: 'primary' | 'secondary' | 'info' | 'none';
  link?: CtaLink;
}

export default function NarrativeSection({
  eyebrow,
  title,
  body,
  icon,
  bgcolor,
  titleId,
  accent = 'primary',
  link,
}: NarrativeSectionProps) {
  const colorKey = accent === 'none' ? 'primary' : accent;

  return (
    <SectionContainer bgcolor={bgcolor} labelledBy={titleId}>
      <Box
        sx={{
          borderRadius: { xs: 4, md: 5 },
          p: { xs: 3.5, sm: 5, md: 6 },
          bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.04),
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette[colorKey].main, 0.18),
          boxShadow: (theme) => `0 12px 36px -12px ${alpha(theme.palette.grey[900], 0.06)}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Accent Strip */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: (theme) => theme.palette[colorKey].main,
          }}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '72px 1fr' },
            gap: { xs: 3, md: 4 },
            alignItems: 'start',
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 3,
              bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.12),
              color: (theme) => theme.palette[colorKey].dark || theme.palette[colorKey].main,
              boxShadow: (theme) => `0 0 0 6px ${alpha(theme.palette[colorKey].main, 0.1)}`,
              flexShrink: 0,
              '& svg': { fontSize: 32 },
            }}
          >
            {icon}
          </Box>

          <Stack spacing={2}>
            {eyebrow && (
              <Box
                sx={{
                  px: 1.75,
                  py: 0.5,
                  borderRadius: 50,
                  width: 'fit-content',
                  bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.12),
                  color: (theme) => theme.palette[colorKey].dark || theme.palette[colorKey].main,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                {eyebrow}
              </Box>
            )}

            <Typography
              id={titleId}
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                fontSize: { xs: '1.5rem', sm: '1.85rem', md: '2.1rem' },
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', sm: '1.08rem' },
                lineHeight: 1.7,
              }}
            >
              {body}
            </Typography>

            {link && (
              <Box sx={{ pt: 1 }}>
                <Button
                  component={Link}
                  to={link.to}
                  variant="outlined"
                  color={colorKey}
                  sx={{ borderRadius: 2.5, fontWeight: 700 }}
                >
                  {link.label} →
                </Button>
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </SectionContainer>
  );
}

