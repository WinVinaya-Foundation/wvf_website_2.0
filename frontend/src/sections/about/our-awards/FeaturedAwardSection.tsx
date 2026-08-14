import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';
import PlaceRounded from '@mui/icons-material/PlaceRounded';
import CorporateFareRounded from '@mui/icons-material/CorporateFareRounded';
import { PhotoFrame, SectionContainer, SectionHeading } from '../../../components';
import { featuredAward } from '../../../pages/about/awardsContent';

const META = [
  { icon: CalendarMonthRounded, label: featuredAward.date },
  { icon: PlaceRounded, label: featuredAward.event },
  { icon: CorporateFareRounded, label: `Awarded by ${featuredAward.organization}` },
];

export default function FeaturedAwardSection() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -120,
          right: -140,
          width: 400,
          height: 400,
          borderRadius: '50%',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
          filter: 'blur(100px)',
        }}
      />

      <SectionContainer bgcolor="background.paper" labelledBy="featured-award-heading">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <PhotoFrame
              src={featuredAward.photoUrl}
              alt="WinVinaya representatives receiving the ATF Award on stage at the Bengaluru Tech Summit"
              fallbackIcon={<EmojiEventsRounded />}
              aspectRatio="4 / 3"
              sx={{ boxShadow: (theme) => theme.shadows[3] }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -20,
                left: 20,
                width: 76,
                height: 76,
                borderRadius: '50%',
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.shadows[4],
                p: 0.75,
              }}
            >
              <PhotoFrame
                src={featuredAward.badgeUrl}
                alt="AssisTech Foundation award badge"
                fallbackIcon={<EmojiEventsRounded fontSize="small" />}
                aspectRatio="1 / 1"
                objectFit="contain"
                fallbackBgcolor="primary.light"
                sx={{ borderRadius: '50%', '& svg': { fontSize: 24 } }}
              />
            </Box>
          </Box>

          <Box>
            <SectionHeading
              eyebrow={featuredAward.eyebrow}
              title={featuredAward.title}
              titleId="featured-award-heading"
              align="left"
            />
            <Stack direction="row" spacing={{ xs: 2, sm: 3 }} sx={{ flexWrap: 'wrap', rowGap: 1, mb: 2.5 }}>
              {META.map(({ icon: Icon, label }) => (
                <Stack key={label} direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                  <Icon fontSize="small" aria-hidden="true" sx={{ color: 'primary.dark' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {featuredAward.body}
            </Typography>
          </Box>
        </Box>
      </SectionContainer>
    </Box>
  );
}
