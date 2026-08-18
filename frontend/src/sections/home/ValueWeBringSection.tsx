import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../components';
import { valueWeBringContent } from '../../pages/home/homeContent';
import featuredImg from '../../assets/hero/Gemini_Generated_Image_8ou4yq8ou4yq8ou4.png';

const ICON_MAP = {
  school: SchoolRoundedIcon,
  work: WorkOutlineRoundedIcon,
  trending: TrendingUpRoundedIcon,
};

export default function ValueWeBringSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="value-we-bring-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '6.5fr 5.5fr' },
          gap: { xs: 5, lg: 7 },
          alignItems: 'center',
        }}
      >
        {/* Left Column: Content & Heading */}
        <Stack spacing={3.5}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.25,
              py: 0.75,
              width: 'fit-content',
              borderRadius: 50,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 18, color: 'primary.dark' }} />
            <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1.5, fontWeight: 700 }}>
              {valueWeBringContent.eyebrow}
            </Typography>
          </Box>

          <Typography
            id="value-we-bring-heading"
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
              fontSize: { xs: '1.85rem', sm: '2.5rem', md: '2.85rem' },
              lineHeight: 1.2,
            }}
          >
            {valueWeBringContent.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1.025rem', sm: '1.125rem' },
              lineHeight: 1.7,
            }}
          >
            {valueWeBringContent.description}
          </Typography>

          {/* Key Value Point Cards with Vibrant Signature Accents */}
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            {valueWeBringContent.points.map((point, idx) => {
              const Icon = ICON_MAP[point.icon];
              const pointColor = idx === 0 ? '#0D9488' : idx === 1 ? '#2563EB' : '#FF5A36';

              return (
                <Box
                  key={point.title}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2.5,
                    p: 2.5,
                    borderRadius: 3.5,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: alpha(pointColor, 0.25),
                    boxShadow: `0 8px 24px -6px ${alpha(pointColor, 0.12)}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: pointColor,
                      boxShadow: `0 16px 32px -6px ${alpha(pointColor, 0.22)}`,
                      '& .point-icon': {
                        transform: 'scale(1.1) rotate(-4deg)',
                        boxShadow: `0 8px 20px -4px ${alpha(pointColor, 0.4)}`,
                      },
                    },
                  }}
                >
                  <Box
                    className="point-icon"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 52,
                      height: 52,
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, ${pointColor} 0%, ${alpha(pointColor, 0.85)} 100%)`,
                      color: '#ffffff',
                      flexShrink: 0,
                      boxShadow: `0 6px 16px -4px ${alpha(pointColor, 0.3)}`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Icon sx={{ fontSize: 26 }} />
                  </Box>

                  <Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.1rem', mb: 0.5 }}>
                      {point.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {point.description}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>

          {/* Action CTAs */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Button
              component={Link}
              to={valueWeBringContent.ctas[0].to}
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ py: 1.4, px: 3.5, borderRadius: 2.5, fontWeight: 700 }}
            >
              {valueWeBringContent.ctas[0].label}
            </Button>

            <Button
              component={Link}
              to={valueWeBringContent.ctas[1].to}
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ py: 1.4, px: 3, borderRadius: 2.5, fontWeight: 700 }}
            >
              {valueWeBringContent.ctas[1].label}
            </Button>
          </Stack>
        </Stack>

        {/* Right Column: Visual Image & Floating Badges */}
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              borderRadius: { xs: 4, sm: 5 },
              overflow: 'hidden',
              boxShadow: (theme) => `0 24px 60px -12px ${alpha(theme.palette.primary.main, 0.25)}`,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              position: 'relative',
              aspectRatio: '4 / 3',
            }}
          >
            <Box
              component="img"
              src={featuredImg}
              alt="WinVinaya Foundation inclusive skilling and career empowerment"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.5s ease',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            />
          </Box>

          {/* Top Left Floating Stat Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 16, sm: 24 },
              left: { xs: 16, sm: -20 },
              p: 2,
              borderRadius: 3.5,
              bgcolor: (theme) => alpha(theme.palette.background.paper, 0.92),
              backdropFilter: 'blur(12px)',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              boxShadow: (theme) => `0 12px 32px -8px ${alpha(theme.palette.grey[900], 0.15)}`,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                color: 'primary.dark',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircleRoundedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.1 }}>
                1640+ Scholars
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Trained in High-Demand Tech
              </Typography>
            </Box>
          </Box>

          {/* Bottom Right Floating Stat Badge */}
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 16, sm: 24 },
              right: { xs: 16, sm: -20 },
              p: 2,
              borderRadius: 3.5,
              bgcolor: (theme) => alpha(theme.palette.background.paper, 0.92),
              backdropFilter: 'blur(12px)',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
              boxShadow: (theme) => `0 12px 32px -8px ${alpha(theme.palette.grey[900], 0.15)}`,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.15),
                color: 'secondary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUpRoundedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.1 }}>
                725+ Placements
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Across 100+ Hiring Partners
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  );
}
