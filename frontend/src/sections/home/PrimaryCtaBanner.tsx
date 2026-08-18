import { Box, Container, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Link } from '@tanstack/react-router';
import { Button } from '../../components';
import { primaryCtaBanner } from '../../pages/home/homeContent';
import { brand } from '../../theme/brand';

const actionCards = [
  {
    icon: FavoriteRoundedIcon,
    title: primaryCtaBanner.ctas[0].label,
    description: 'Fund assistive technology, specialized laptops, and job-skill training for scholars with disabilities.',
    to: primaryCtaBanner.ctas[0].to,
    colorKey: 'primary' as const,
    badge: '80G Tax Exempt',
    buttonVariant: 'contained' as const,
  },
  {
    icon: GroupsRoundedIcon,
    title: primaryCtaBanner.ctas[1].label,
    description: 'Share your expertise through mock interviews, technical workshops, or career mentoring.',
    to: primaryCtaBanner.ctas[1].to,
    colorKey: 'secondary' as const,
    badge: 'Flexible Hours',
    buttonVariant: 'outlined' as const,
  },
  {
    icon: BusinessCenterRoundedIcon,
    title: primaryCtaBanner.ctas[2].label,
    description: 'Hire industry-trained, job-ready PwD talent and build inclusive corporate D&I workplaces.',
    to: primaryCtaBanner.ctas[2].to,
    colorKey: 'info' as const,
    badge: 'Hiring Partners',
    buttonVariant: 'outlined' as const,
  },
  {
    icon: SchoolRoundedIcon,
    title: 'Internship Opportunities',
    description: 'Gain hands-on corporate tech experience through structured internships and real-world project mentorship.',
    to: '/trainings',
    colorKey: 'info' as const,
    badge: 'Career Skilling',
    buttonVariant: 'contained' as const,
  },
];

const trustHighlights = [
  'Registered 12A & 80G Non-Profit',
  '1640+ Trainees Empowered',
  '725+ Placements',
];

export default function PrimaryCtaBanner() {
  return (
    <Box
      component="section"
      aria-labelledby="primary-cta-heading"
      sx={{
        py: { xs: 7, sm: 9, md: 11 },
        px: { xs: 2, sm: 3, md: 4 },
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Gradient Blobs */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -100,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: (theme) =>
            `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -80,
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: (theme) =>
            `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.18)} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Stack spacing={2} sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 5, md: 7 } }}>
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
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 18, color: 'primary.dark' }} />
            <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: 1.5, fontWeight: 700 }}>
              Join the Movement
            </Typography>
          </Box>

          <Typography
            id="primary-cta-heading"
            variant="h2"
            component="h2"
            sx={{
              color: 'text.primary',
              fontWeight: 800,
              fontSize: { xs: '1.85rem', sm: '2.5rem', md: '2.85rem' },
              lineHeight: 1.2,
            }}
          >
            {primaryCtaBanner.headline}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.15rem' },
              lineHeight: 1.6,
            }}
          >
            {primaryCtaBanner.body}
          </Typography>
        </Stack>

        {/* 4-Card Action Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: { xs: 3, md: 3.5 },
          }}
        >
          {actionCards.map((card, idx) => {
            const Icon = card.icon;
            const vibrantColor = idx === 0 ? '#3B6E2E' : idx === 1 ? brand.maroon : idx === 2 ? '#E08712' : '#1D6FA5';

            return (
              <Box
                key={card.title}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  bgcolor: vibrantColor,
                  borderRadius: '24px',
                  p: { xs: 3.5, sm: 4 },
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 14px 32px -8px ${alpha(vibrantColor, 0.45)}`,
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 24px 48px -8px ${alpha(vibrantColor, 0.6)}`,
                    '& .card-icon-box': {
                      transform: 'scale(1.1) rotate(-4deg)',
                    },
                    '& .card-cta-btn': {
                      bgcolor: '#ffffff',
                      color: vibrantColor,
                    },
                  },
                }}
              >
                <Box>
                  {/* Header Row: Icon & Badge */}
                  <Stack
                    direction="row"
                    sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}
                  >
                    <Box
                      className="card-icon-box"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: '18px',
                        bgcolor: alpha('#ffffff', 0.2),
                        color: '#ffffff',
                        transition: 'all 0.35s ease',
                      }}
                    >
                      <Icon sx={{ fontSize: 32 }} />
                    </Box>

                    <Box
                      sx={{
                        px: 1.75,
                        py: 0.5,
                        borderRadius: 50,
                        bgcolor: alpha('#ffffff', 0.2),
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        letterSpacing: 1,
                        border: '1px solid',
                        borderColor: alpha('#ffffff', 0.35),
                      }}
                    >
                      {card.badge}
                    </Box>
                  </Stack>

                  {/* Title & Description */}
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 800, color: '#ffffff', mb: 1.5, lineHeight: 1.25 }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: alpha('#ffffff', 0.9), lineHeight: 1.6, fontSize: '0.96rem', mb: 4 }}
                  >
                    {card.description}
                  </Typography>
                </Box>

                {/* Bottom CTA Button */}
                <Button
                  className="card-cta-btn"
                  component={Link}
                  to={card.to}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    bgcolor: alpha('#ffffff', 0.9),
                    color: vibrantColor,
                    fontWeight: 800,
                    borderRadius: 2.5,
                    py: 1.4,
                    '&:hover': {
                      bgcolor: '#ffffff',
                    },
                  }}
                >
                  {card.title}
                </Button>
              </Box>
            );
          })}
        </Box>

        {/* Bottom Trust & Accreditation Bar */}
        <Box
          sx={{
            mt: { xs: 5, md: 7 },
            p: { xs: 2.5, sm: 3 },
            borderRadius: 4,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.15),
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2,
              alignItems: 'center',
            }}
          >
            {trustHighlights.map((text) => (
              <Stack
                key={text}
                direction="row"
                spacing={1.25}
                sx={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <CheckCircleRoundedIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.9rem' }}>
                  {text}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}




