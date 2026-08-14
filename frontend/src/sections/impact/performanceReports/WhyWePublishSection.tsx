import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { SectionContainer } from '../../../components';
import { whyWePublish } from '../../../pages/impact/performanceReportsContent';

/** Why We Publish Openly Section with trust badge and high-impact transparency card */
export default function WhyWePublishSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="why-publish-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          boxShadow: (theme) => `0 12px 36px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
        }}
      >
        {/* Background decorative watermark */}
        <ShieldRoundedIcon
          aria-hidden="true"
          sx={{
            position: 'absolute',
            bottom: -30,
            right: -20,
            fontSize: 220,
            color: (theme) => alpha(theme.palette.primary.main, 0.05),
            pointerEvents: 'none',
          }}
        />

        <Stack spacing={3} sx={{ maxWidth: 840, position: 'relative', zIndex: 1 }}>
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
              <VerifiedUserRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.875rem' }}>
              {whyWePublish.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="why-publish-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {whyWePublish.headline}
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
            {whyWePublish.body}
          </Typography>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
