import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArticleRounded from '@mui/icons-material/ArticleRounded';
import MailRounded from '@mui/icons-material/MailRounded';
import WorkOutlineRounded from '@mui/icons-material/WorkOutlineRounded';
import EventRounded from '@mui/icons-material/EventRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Link } from '@tanstack/react-router';
import { SectionContainer } from '../../components';
import { newsItems } from '../../pages/home/homeContent';

const NEWS_CONFIG = [
  {
    icon: ArticleRounded,
    color: '#0D9488',
    ctaText: 'Read Articles',
    badge: 'Insights & Blog',
  },
  {
    icon: MailRounded,
    color: '#2563EB',
    ctaText: 'Read Newsletter',
    badge: 'Monthly Issue',
  },
  {
    icon: WorkOutlineRounded,
    color: '#FF5A36',
    ctaText: 'View Jobs',
    badge: 'We are Hiring',
  },
  {
    icon: EventRounded,
    color: '#8B5CF6',
    ctaText: 'Explore Events',
    badge: 'Community',
  },
];

export default function NewsStripSection() {
  return (
    <SectionContainer bgcolor="#F8FAFC" labelledBy="news-strip-heading">
      {/* Section Header with Eyebrow Badge */}
      <Stack spacing={1.5} sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: { xs: 5, md: 6 } }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            px: 2.25,
            py: 0.75,
            mx: 'auto',
            borderRadius: 50,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.22),
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 18, color: 'primary.dark' }} />
          <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1.5, fontWeight: 700 }}>
            Stay Connected
          </Typography>
        </Box>

        <Typography
          id="news-strip-heading"
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            fontSize: { xs: '1.85rem', sm: '2.5rem', md: '2.85rem' },
            lineHeight: 1.2,
          }}
        >
          What's Happening at WinVinaya
        </Typography>
      </Stack>

      {/* 4-Card Vibrant Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: { xs: 3, md: 3.5 },
        }}
      >
        {newsItems.map((item, index) => {
          const config = NEWS_CONFIG[index % NEWS_CONFIG.length];
          const Icon = config.icon;
          const cardColor = config.color;

          return (
            <Box
              key={item.label}
              component={Link}
              to={item.to}
              sx={{
                textDecoration: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                bgcolor: 'background.paper',
                borderRadius: '24px',
                p: 3.5,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: alpha(cardColor, 0.2),
                boxShadow: `0 10px 28px -8px ${alpha(cardColor, 0.12)}`,
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: cardColor,
                  boxShadow: `0 20px 40px -8px ${alpha(cardColor, 0.28)}`,
                  '& .news-icon-medallion': {
                    transform: 'scale(1.12) rotate(-6deg)',
                    boxShadow: `0 10px 24px -4px ${alpha(cardColor, 0.45)}`,
                  },
                  '& .news-arrow-icon': {
                    transform: 'translateX(4px)',
                    color: cardColor,
                  },
                  '& .news-cta-label': {
                    color: cardColor,
                  },
                },
              }}
            >
              {/* Top Accent Strip */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 5,
                  background: `linear-gradient(90deg, ${cardColor} 0%, ${alpha(cardColor, 0.4)} 100%)`,
                }}
              />

              <Box>
                {/* Header Row: Icon & Badge */}
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box
                    className="news-icon-medallion"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      borderRadius: '18px',
                      background: `linear-gradient(135deg, ${cardColor} 0%, ${alpha(cardColor, 0.85)} 100%)`,
                      color: '#ffffff',
                      boxShadow: `0 6px 16px -4px ${alpha(cardColor, 0.35)}`,
                      transition: 'all 0.35s ease',
                    }}
                  >
                    <Icon sx={{ fontSize: 28 }} />
                  </Box>

                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.4,
                      borderRadius: 50,
                      bgcolor: alpha(cardColor, 0.12),
                      color: cardColor,
                      fontWeight: 800,
                      fontSize: '0.725rem',
                      letterSpacing: 0.5,
                      border: '1px solid',
                      borderColor: alpha(cardColor, 0.25),
                    }}
                  >
                    {config.badge}
                  </Box>
                </Stack>

                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 800,
                    color: 'text.primary',
                    fontSize: '1.15rem',
                    mb: 1,
                    lineHeight: 1.3,
                  }}
                >
                  {item.label}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    fontSize: '0.925rem',
                    mb: 3,
                  }}
                >
                  {item.teaser}
                </Typography>
              </Box>

              {/* Bottom CTA Arrow Link */}
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', pt: 1 }}>
                <Typography className="news-cta-label" variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', transition: 'color 0.3s ease' }}>
                  {config.ctaText}
                </Typography>
                <ArrowForwardRoundedIcon className="news-arrow-icon" sx={{ fontSize: 18, color: 'text.secondary', transition: 'all 0.3s ease' }} />
              </Stack>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
