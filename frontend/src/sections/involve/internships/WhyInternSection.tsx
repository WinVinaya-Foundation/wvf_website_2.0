import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { SectionContainer } from '../../../components';
import { whyIntern } from '../../../pages/involve/internshipsContent';

/** Why Intern at WinVinaya Section featuring real intern testimonial by Varun Anand */
export default function WhyInternSection() {
  return (
    <SectionContainer labelledBy="why-intern-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.22),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'center',
        }}
      >
        <Stack spacing={3.5}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                color: 'primary.dark',
              }}
            >
              <WorkspacePremiumRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.875rem' }}>
              {whyIntern.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="why-intern-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {whyIntern.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.05rem', sm: '1.2rem' },
              lineHeight: 1.8,
              color: 'text.secondary',
              fontWeight: 450,
            }}
          >
            {whyIntern.body}
          </Typography>
        </Stack>

        {/* Featured Real Intern Quote Card */}
        <Box
          sx={{
            position: 'relative',
            p: { xs: 3.5, sm: 4.5 },
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
            boxShadow: (theme) => `0 12px 32px -8px ${alpha(theme.palette.grey[900], 0.1)}`,
          }}
        >
          <FormatQuoteRoundedIcon
            sx={{
              fontSize: 54,
              color: (theme) => alpha(theme.palette.primary.main, 0.25),
              transform: 'rotate(180deg)',
              mb: 1,
            }}
          />

          <Typography
            component="blockquote"
            variant="body1"
            sx={{
              m: 0,
              mb: 2.5,
              fontSize: { xs: '1.05rem', sm: '1.15rem' },
              lineHeight: 1.75,
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'text.primary',
            }}
          >
            &ldquo;{whyIntern.quote.text}&rdquo;
          </Typography>

          <Box
            sx={{
              pt: 2,
              borderTop: '1px solid',
              borderColor: (theme) => alpha(theme.palette.divider, 0.8),
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.dark' }}>
              {whyIntern.quote.author}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {whyIntern.quote.role}
            </Typography>
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  );
}
