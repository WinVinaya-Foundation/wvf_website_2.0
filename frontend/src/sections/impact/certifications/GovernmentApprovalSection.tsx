import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { Link } from '@tanstack/react-router';
import { Button, Chip, SectionContainer } from '../../../components';
import { governmentApproval } from '../../../pages/impact/certificationsContent';

/** Government Approval Section showcasing RDPR Govt of Karnataka formal approval letter */
export default function GovernmentApprovalSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="govt-approval-heading">
      <Box
        sx={{
          p: { xs: 4, sm: 5, md: 6 },
          borderRadius: 5,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.06)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
          boxShadow: (theme) => `0 12px 36px -12px ${alpha(theme.palette.grey[900], 0.08)}`,
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: 880 }}>
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
              <AccountBalanceRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Chip
              label="State Government Recognition"
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
                color: 'secondary.dark',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.secondary.main, 0.3),
              }}
            />
          </Stack>

          <Typography
            id="govt-approval-heading"
            variant="h3"
            component="h2"
            sx={{ fontWeight: 900, fontSize: { xs: '1.8rem', md: '2.3rem' }, color: 'text.primary' }}
          >
            {governmentApproval.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            {governmentApproval.body}
          </Typography>

          {/* Featured Document Card Box */}
          <Box
            sx={{
              mt: 1,
              p: 3,
              borderRadius: 4,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.divider, 0.8),
              boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2.5,
            }}
          >
            <Box>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
                {governmentApproval.documentTitle}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 0.5 }}>
                <CalendarTodayRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Date of Approval: {governmentApproval.documentDate}
                </Typography>
              </Stack>
            </Box>

            <Button
              component={Link}
              to={governmentApproval.link.to}
              variant="contained"
              color="secondary"
              size="medium"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ flexShrink: 0, fontWeight: 800, px: 3 }}
            >
              {governmentApproval.link.label}
            </Button>
          </Box>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
