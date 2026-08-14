import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { Chip, SectionContainer, SectionHeading } from '../../../components';
import { dashboardContext, liveImpactDashboard } from '../../../pages/impact/performanceReportsContent';

/** Live Power BI Impact Dashboard embed section wrapped in a modern glass container with context framing */
export default function LiveImpactDashboardSection() {
  return (
    <SectionContainer labelledBy="dashboard-heading">
      <SectionHeading
        eyebrow="Interactive Analytics"
        title={liveImpactDashboard.headline}
        description={liveImpactDashboard.body}
        align="center"
        titleId="dashboard-heading"
      />

      {/* Main Glass Frame Container for the Power BI Embed */}
      <Box
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
          boxShadow: (theme) => `0 20px 48px -12px ${alpha(theme.palette.grey[900], 0.12)}`,
          mb: 6,
        }}
      >
        {/* Frame Header Bar */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: { xs: 2.5, sm: 3.5 },
            py: 2,
            bgcolor: (theme) => alpha(theme.palette.grey[100], 0.8),
            borderBottom: '1px solid',
            borderColor: (theme) => alpha(theme.palette.divider, 0.8),
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
                color: 'primary.dark',
              }}
            >
              <AnalyticsRoundedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary' }}>
              WinVinaya Impact Analytics
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Chip
              icon={
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                    boxShadow: (theme) => `0 0 8px ${theme.palette.success.main}`,
                  }}
                />
              }
              label="Live Data Feed"
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.12),
                color: 'success.dark',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.success.main, 0.3),
              }}
            />
            <Box
              component="a"
              href={liveImpactDashboard.powerBiUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'primary.dark',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Open Fullscreen <LaunchRoundedIcon sx={{ fontSize: 16 }} />
            </Box>
          </Stack>
        </Box>

        {/* Power BI iframe container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            minHeight: { xs: 550, sm: 650, md: 720 },
            bgcolor: 'common.white',
          }}
        >
          <iframe
            title="WinVinaya Foundation Live Impact Dashboard"
            src={liveImpactDashboard.powerBiUrl}
            style={{
              width: '100%',
              height: '100%',
              minHeight: '650px',
              border: 0,
              display: 'block',
            }}
            allowFullScreen
          />
        </Box>
      </Box>

      {/* What the Dashboard Shows Context Framing Box */}
      <Box
        sx={{
          p: { xs: 3.5, sm: 4.5 },
          borderRadius: 4,
          bgcolor: (theme) => alpha(theme.palette.info.main, 0.05),
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.info.main, 0.2),
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
          gap: { xs: 2.5, md: 3.5 },
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 3,
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.14),
            color: 'info.dark',
            flexShrink: 0,
          }}
        >
          <InfoOutlinedIcon sx={{ fontSize: 26 }} />
        </Box>

        <Box>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
            {dashboardContext.headline}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.75 }}>
            {dashboardContext.body}
          </Typography>
        </Box>
      </Box>
    </SectionContainer>
  );
}
