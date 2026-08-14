import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../../components';
import { samarthClosingCtaContent } from '../../../pages/programs/samarthContent';

const AUDIENCE_ICONS = [VolunteerActivismRoundedIcon, StorefrontRoundedIcon, HandshakeRoundedIcon];

export default function SamarthSplitAudienceCtaSection() {
  const { forDonors, forParticipants, forPartners } = samarthClosingCtaContent;
  const cards = [
    { ...forDonors, icon: AUDIENCE_ICONS[0] },
    { ...forParticipants, icon: AUDIENCE_ICONS[1] },
    { ...forPartners, icon: AUDIENCE_ICONS[2] },
  ];

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="samarth-split-cta-heading">
      <Box
        id="samarth-split-cta-heading"
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
      >
        Samarth Livelihood Actions
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
          gap: 3.5,
        }}
      >
        {cards.map((card) => {
          const Icon = card.icon;
          const colorKey = card.ctaColor;

          return (
            <Box
              key={card.eyebrow}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: { xs: 3.5, sm: 4 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '2px solid',
                borderColor: (theme) => alpha(theme.palette[colorKey].main, 0.25),
                boxShadow: (theme) => `0 12px 32px -8px ${alpha(theme.palette[colorKey].main, 0.15)}`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: (theme) => theme.palette[colorKey].main,
                  boxShadow: (theme) => `0 18px 40px -8px ${alpha(theme.palette[colorKey].main, 0.25)}`,
                },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.08),
                  pointerEvents: 'none',
                }}
              />

              <Stack spacing={2} sx={{ position: 'relative', zIndex: 1, mb: 3 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 0.75,
                    width: 'fit-content',
                    borderRadius: 50,
                    bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.12),
                    color: `${colorKey}.dark`,
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                  <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.2 }}>
                    {card.eyebrow}
                  </Typography>
                </Box>

                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    color: 'text.primary',
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    lineHeight: 1.25,
                  }}
                >
                  {card.headline}
                </Typography>

                {'body' in card && card.body && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {card.body}
                  </Typography>
                )}
              </Stack>

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Button
                  component={Link}
                  to={card.link}
                  variant="contained"
                  color={colorKey}
                  size="large"
                  fullWidth
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{ py: 1.5, borderRadius: 3, fontWeight: 800 }}
                >
                  {card.buttonText}
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
