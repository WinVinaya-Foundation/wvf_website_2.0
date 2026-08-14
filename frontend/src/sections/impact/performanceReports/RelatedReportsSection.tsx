import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { Link } from '@tanstack/react-router';
import { SectionContainer } from '../../../components';
import { relatedReports } from '../../../pages/impact/performanceReportsContent';

/** Related Reports section with interactive card links to Annual Reports & Financial Audits */
export default function RelatedReportsSection() {
  return (
    <SectionContainer labelledBy="related-reports-heading">
      <Stack spacing={4} sx={{ maxWidth: 860, mx: 'auto', textAlign: 'center', mb: 5 }}>
        <Typography
          id="related-reports-heading"
          variant="h3"
          component="h2"
          sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '2.5rem' }, color: 'text.primary' }}
        >
          {relatedReports.headline}
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.7 }}>
          {relatedReports.body}
        </Typography>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: 'center', maxWidth: 860, mx: 'auto' }}>
        {relatedReports.links.map((link, index) => {
          const isFinancial = link.label.toLowerCase().includes('financial');
          const Icon = isFinancial ? AccountBalanceRoundedIcon : DescriptionRoundedIcon;

          return (
            <Box
              key={link.label}
              component={Link}
              to={link.to}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                p: { xs: 3, sm: 3.5 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
                textDecoration: 'none',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: 'primary.main',
                  boxShadow: (theme) => `0 16px 36px -12px ${alpha(theme.palette.primary.main, 0.25)}`,
                  '& .link-arrow': { transform: 'translateX(6px)' },
                },
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    bgcolor: (theme) => alpha(index === 0 ? theme.palette.primary.main : theme.palette.secondary.main, 0.14),
                    color: index === 0 ? 'primary.dark' : 'secondary.dark',
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ fontSize: 26 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.05rem' }}>
                    {link.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Detailed PDF &amp; audited statements
                  </Typography>
                </Box>
              </Stack>

              <ArrowForwardRoundedIcon
                className="link-arrow"
                sx={{
                  color: 'primary.main',
                  fontSize: 24,
                  transition: 'transform 0.3s ease',
                  flexShrink: 0,
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </SectionContainer>
  );
}
