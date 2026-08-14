import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Button, SectionContainer, SectionHeading } from '../../components';
import { donationTiers } from '../../pages/donate/donateContent';
import type { DonationScheme } from '../../store/api/donationsApi';

const TIER_ACCENTS = ['primary', 'info', 'secondary', 'primary', 'secondary'] as const;

export interface DonationTiersSectionProps {
  selectedScheme: DonationScheme;
  onSelectScheme: (scheme: DonationScheme) => void;
}

/** The 5 sponsorship tiers — selecting one syncs the donation form below and scrolls to it. */
export default function DonationTiersSection({ selectedScheme, onSelectScheme }: DonationTiersSectionProps) {
  const handleSelect = (scheme: DonationScheme) => {
    onSelectScheme(scheme);
    document.getElementById('donate-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <SectionContainer bgcolor={(theme) => alpha(theme.palette.primary.main, 0.05)} labelledBy="donation-tiers-heading">
      <SectionHeading
        eyebrow="Ways to Give"
        title="Choose what your gift builds."
        description="Every tier funds a specific, named outcome — not a general fund."
        titleId="donation-tiers-heading"
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3.5 }}>
        {donationTiers.map((tier, index) => {
          const accent = TIER_ACCENTS[index % TIER_ACCENTS.length];
          const isSelected = tier.scheme === selectedScheme;

          return (
            <Box
              key={tier.scheme}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                pt: { xs: 3, sm: 3.5 },
                px: { xs: 3.5, sm: 4 },
                pb: { xs: 3.5, sm: 4 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '2px solid',
                borderColor: isSelected ? `${accent}.main` : alpha('#000', 0.08),
                boxShadow: isSelected
                  ? (theme) => `0 16px 40px -12px ${alpha(theme.palette[accent].main, 0.35)}`
                  : (theme) => `0 10px 28px -10px ${alpha(theme.palette.grey[900], 0.12)}`,
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: (theme) => `0 22px 44px -14px ${alpha(theme.palette[accent].main, 0.32)}`,
                },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 5,
                  background: (theme) =>
                    `linear-gradient(90deg, ${theme.palette[accent].main} 0%, ${theme.palette[accent].light} 100%)`,
                }}
              />

              {tier.eyebrow && (
                <Typography variant="overline" sx={{ color: `${accent}.dark`, fontWeight: 800, letterSpacing: 1, mb: 1 }}>
                  {tier.eyebrow}
                </Typography>
              )}

              <Typography variant="h3" component="p" sx={{ fontWeight: 800, color: `${accent}.dark`, mb: 1.5 }}>
                {tier.amountLabel}
              </Typography>

              <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5 }}>
                {tier.headline}
              </Typography>

              <Typography sx={{ color: 'text.secondary', fontSize: '0.975rem', lineHeight: 1.7, flexGrow: 1, mb: 3 }}>
                {tier.description}
              </Typography>

              <Button
                onClick={() => handleSelect(tier.scheme)}
                variant={isSelected ? 'contained' : 'outlined'}
                color={accent}
                endIcon={<FavoriteRoundedIcon />}
                sx={{ fontWeight: 800 }}
              >
                Donate This Amount
              </Button>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
