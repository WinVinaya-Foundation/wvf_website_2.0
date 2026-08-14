import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { SectionContainer } from '../../../components';
import { whoShouldApply } from '../../../pages/involve/internshipsContent';

/** Who Should Apply Section highlighting inclusive applicant criteria and encouraging PWD candidates */
export default function WhoShouldApplySection() {
  return (
    <SectionContainer labelledBy="who-apply-heading">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 7 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.08)} 0%, ${alpha(theme.palette.info.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.22),
          boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
        }}
      >
        <Stack spacing={3.5} sx={{ maxWidth: 860 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.14),
                color: 'secondary.dark',
              }}
            >
              <GroupsRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.875rem' }}>
              {whoShouldApply.eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="who-apply-heading"
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {whoShouldApply.headline}
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
            {whoShouldApply.body}
          </Typography>

          {/* Special PWD Callout Card */}
          <Box
            sx={{
              mt: 1,
              p: 3,
              borderRadius: 4,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.3),
              boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <FavoriteRoundedIcon sx={{ color: 'secondary.main', fontSize: 28, flexShrink: 0 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'secondary.dark', fontSize: '1.05rem' }}>
              {whoShouldApply.inclusiveCallout}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
