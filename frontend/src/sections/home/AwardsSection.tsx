import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, Card, CardContent, Chip, SectionContainer, SectionHeading } from '../../components';
import { awardsContent } from '../../pages/home/homeContent';
import { brand } from '../../theme/brand';

interface ParsedAward {
  title: string;
  subtitle?: string;
  year?: string;
}

function parseAward(raw: string): ParsedAward {
  const yearMatch = raw.match(/\((\d{4})\)\s*$/);
  const year = yearMatch?.[1];
  const withoutYear = yearMatch ? raw.slice(0, yearMatch.index).trim() : raw;
  const [title, subtitle] = withoutYear.split(' — ').map((part) => part.trim());
  return { title, subtitle, year };
}

// Award showcase hero placeholder image
const AWARD_HERO_IMAGE = 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80';

export default function AwardsSection() {
  const awards = awardsContent.awards.map(parseAward);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambient Flares */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -80,
          left: -100,
          width: 380,
          height: 380,
          borderRadius: '50%',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
          filter: 'blur(80px)',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -80,
          right: -100,
          width: 380,
          height: 380,
          borderRadius: '50%',
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
          filter: 'blur(80px)',
        }}
      />

      <SectionContainer bgcolor="background.default" labelledBy="awards-heading">
        <SectionHeading
          eyebrow="RECOGNITION & HONORS"
          title={awardsContent.headline}
          description={awardsContent.body}
          titleId="awards-heading"
        />

        {/* 2-Column Pro Max Showcase Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '5fr 7fr' },
            gap: { xs: 4, lg: 5 },
            alignItems: 'center',
          }}
        >
          {/* Left Column: Image Showcase Card */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: (theme) => `0 20px 48px -12px ${alpha(theme.palette.common.black, 0.16)}`,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
              background: 'linear-gradient(135deg, #1E0705 0%, #3D0F0A 100%)',
              height: '100%',
              minHeight: { xs: 280, sm: 340, lg: 420 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            {/* Image Placeholder with Overlay Gradient */}
            <Box
              component="img"
              src={AWARD_HERO_IMAGE}
              alt="WinVinaya Awards & Recognition Ceremony Placeholder"
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.82,
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.04)',
                },
              }}
            />

            {/* Gradient Overlay for Text Readability */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(30, 7, 5, 0.1) 0%, rgba(30, 7, 5, 0.7) 60%, rgba(23, 4, 3, 0.95) 100%)',
              }}
            />

            {/* Top Badge Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.6,
                borderRadius: 50,
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ fontSize: 16, color: '#FFB74D' }} />
              National Excellence 🏆
            </Box>

            {/* Content Overlay at Bottom of Image Card */}
            <Stack spacing={1.5} sx={{ position: 'relative', zIndex: 2, p: { xs: 3, sm: 4 }, color: '#FFFFFF' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <VerifiedRoundedIcon sx={{ color: 'secondary.light', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFB74D', letterSpacing: 0.8 }}>
                  VERIFIED IMPACT HONORS
                </Typography>
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, fontSize: { xs: '1.4rem', sm: '1.75rem' } }}>
                Recognized for Transforming Inclusive Hiring in India
              </Typography>
              <Typography variant="body2" sx={{ color: alpha('#FFFFFF', 0.85), lineHeight: 1.6 }}>
                Awarded by Assistive Technology Foundation (ATF), Great Place to Work, and AssisTech for groundbreaking disability skilling.
              </Typography>
            </Stack>
          </Box>

          {/* Right Column: Interactive Award Cards */}
          <Stack spacing={3}>
            {awards.map((award, idx) => {
              const cardAccent = idx === 0 ? '#3B6E2E' : idx === 1 ? brand.maroon : '#E08712';

              return (
                <Card
                  key={award.title + (award.subtitle ?? '')}
                  sx={{
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: alpha(cardAccent, 0.22),
                    boxShadow: `0 8px 24px -6px ${alpha(cardAccent, 0.12)}`,
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateX(6px)',
                      borderColor: cardAccent,
                      boxShadow: `0 16px 36px -8px ${alpha(cardAccent, 0.28)}`,
                      '& .trophy-medallion': {
                        transform: 'scale(1.12) rotate(6deg)',
                      },
                    },
                  }}
                >
                  <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 5, bgcolor: cardAccent }} />
                  <CardContent sx={{ p: { xs: 2.5, sm: 3 }, pl: { xs: 3.5, sm: 4 } }}>
                    <Stack direction="row" spacing={2.5} sx={{ alignItems: 'flex-start' }}>
                      <Box
                        className="trophy-medallion"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 54,
                          height: 54,
                          borderRadius: '16px',
                          background: `linear-gradient(135deg, ${cardAccent} 0%, ${alpha(cardAccent, 0.8)} 100%)`,
                          color: '#ffffff',
                          boxShadow: `0 8px 20px -4px ${alpha(cardAccent, 0.45)}`,
                          flexShrink: 0,
                          transition: 'all 0.35s ease',
                        }}
                      >
                        <EmojiEventsRounded sx={{ fontSize: 28 }} aria-hidden="true" />
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1, gap: 1 }}>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.05rem', sm: '1.18rem' } }}>
                            {award.title}
                          </Typography>
                          {award.year && (
                            <Chip
                              label={award.year}
                              size="small"
                              sx={{
                                bgcolor: alpha(cardAccent, 0.12),
                                color: cardAccent,
                                fontWeight: 800,
                                border: '1px solid',
                                borderColor: alpha(cardAccent, 0.25),
                              }}
                              aria-label={`Awarded in ${award.year}`}
                            />
                          )}
                        </Stack>

                        {award.subtitle && (
                          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.925rem' }}>
                            {award.subtitle}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Box>

        {/* Bottom Action CTA */}
        <Stack sx={{ alignItems: 'center', mt: 6 }}>
          <Button
            component={Link}
            to={awardsContent.link.to}
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{ py: 1.4, px: 4, borderRadius: 2.5, fontWeight: 700 }}
          >
            {awardsContent.link.label}
          </Button>
        </Stack>
      </SectionContainer>
    </Box>
  );
}

