import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../../components';
import { provenResults } from '../../../pages/involve/corporateEngagementContent';

/** Proven Results Section pairing the 5x salary outcome with a real hiring-partner quote */
export default function ProvenResultsSection() {
  return (
    <SectionContainer labelledBy="proven-results-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.22),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.15fr 1fr' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'center',
        }}
      >
        <Stack spacing={3}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
                color: 'primary.dark',
              }}
            >
              <StarRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800, letterSpacing: 1.2 }}>
              {provenResults.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="proven-results-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {provenResults.headline}
          </Typography>

          <Stack direction="row" spacing={2.5} sx={{ alignItems: 'baseline' }}>
            <Typography
              variant="h1"
              component="span"
              sx={{ fontWeight: 900, fontSize: { xs: '3rem', sm: '3.5rem' }, color: 'primary.dark', lineHeight: 1 }}
            >
              {provenResults.statHighlight}
            </Typography>
          </Stack>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.05rem', sm: '1.2rem' },
              lineHeight: 1.8,
              color: 'text.secondary',
              fontWeight: 450,
            }}
          >
            {provenResults.statDescription}
          </Typography>

          <Stack sx={{ pt: 0.5 }}>
            <Button
              component={Link}
              to={provenResults.to}
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ alignSelf: 'flex-start', fontWeight: 800, py: 1.5, px: 3.5, borderRadius: 3 }}
            >
              {provenResults.linkText}
            </Button>
          </Stack>
        </Stack>

        {/* Hiring Partner Quote Card */}
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
              fontSize: { xs: '1.05rem', sm: '1.1rem' },
              lineHeight: 1.75,
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'text.primary',
            }}
          >
            &ldquo;{provenResults.quote.text}&rdquo;
          </Typography>

          <Box
            sx={{
              pt: 2,
              borderTop: '1px solid',
              borderColor: (theme) => alpha(theme.palette.divider, 0.8),
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.dark' }}>
              {provenResults.quote.author}
            </Typography>
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  );
}
