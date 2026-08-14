import { Box, Stack, Typography } from '@mui/material';
import { alpha, type Theme } from '@mui/material/styles';
import FormatQuoteRounded from '@mui/icons-material/FormatQuoteRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { SectionContainer } from '../SectionContainer';

export interface PullQuoteProps {
  eyebrow?: string;
  quote: string;
  body?: string;
  bgcolor?: string | ((theme: Theme) => string);
  titleId: string;
}

export default function PullQuote({ eyebrow, quote, body, bgcolor = 'background.default', titleId }: PullQuoteProps) {
  return (
    <SectionContainer bgcolor={bgcolor} labelledBy={titleId}>
      <Box
        sx={{
          borderRadius: { xs: 4, md: 5 },
          p: { xs: 4, sm: 6, md: 7 },
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.06),
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.secondary.main, 0.15)}`,
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <FormatQuoteRounded
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: -10,
            right: 20,
            fontSize: { xs: 100, md: 160 },
            color: 'secondary.main',
            opacity: 0.12,
            pointerEvents: 'none',
          }}
        />

        <Stack spacing={2.5} sx={{ alignItems: 'center', maxWidth: 800, mx: 'auto', position: 'relative' }}>
          {eyebrow && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2.25,
                py: 0.75,
                borderRadius: 50,
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.14),
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.secondary.main, 0.3),
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
              <Typography variant="overline" sx={{ color: 'secondary.dark', letterSpacing: 1.5, fontWeight: 700 }}>
                {eyebrow}
              </Typography>
            </Box>
          )}

          <Typography
            id={titleId}
            variant="h2"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
              fontSize: { xs: '1.85rem', sm: '2.5rem', md: '2.85rem' },
              lineHeight: 1.25,
            }}
          >
            {quote}
          </Typography>

          {body && (
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1.05rem', sm: '1.18rem' },
                lineHeight: 1.7,
                maxWidth: 720,
              }}
            >
              {body}
            </Typography>
          )}

          <Box
            sx={{ width: 80, height: 4, borderRadius: 999, bgcolor: 'secondary.main', mt: 1 }}
            aria-hidden="true"
          />
        </Stack>
      </Box>
    </SectionContainer>
  );
}

