import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, Chip, SectionContainer } from '../../../components';
import { corporateVolunteeringSpotlight } from '../../../pages/involve/volunteerContent';

/** Corporate Volunteering Spotlight Section highlighting team CSR engagement */
export default function CorporateVolunteeringSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="corporate-spotlight-heading">
      <Box
        sx={{
          p: { xs: 4, sm: 5, md: 6 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.08)} 0%, ${alpha(theme.palette.info.main, 0.08)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
          boxShadow: (theme) => `0 12px 36px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 4,
        }}
      >
        <Stack spacing={2.5} sx={{ maxWidth: 780 }}>
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
                flexShrink: 0,
              }}
            >
              <GroupsRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Chip
              label="Corporate CSR &amp; D&amp;I Partnering"
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
                color: 'secondary.dark',
              }}
            />
          </Stack>

          <Typography
            id="corporate-spotlight-heading"
            variant="h3"
            component="h2"
            sx={{ fontWeight: 900, fontSize: { xs: '1.8rem', md: '2.3rem' }, color: 'text.primary' }}
          >
            {corporateVolunteeringSpotlight.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            {corporateVolunteeringSpotlight.body}
          </Typography>
        </Stack>

        <Button
          component={Link}
          to={corporateVolunteeringSpotlight.link.to}
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{ flexShrink: 0, fontWeight: 800, px: 3.5, py: 1.5 }}
        >
          {corporateVolunteeringSpotlight.link.label}
        </Button>
      </Box>
    </SectionContainer>
  );
}
