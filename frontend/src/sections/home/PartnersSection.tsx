import { Box, GlobalStyles, Stack } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer, SectionHeading } from '../../components';
import { partnersContent } from '../../pages/home/homeContent';

/* Authentic Vector Logos for Hiring Partners */
const WiproLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="12" r="3.5" fill="#702F8A" />
    <circle cx="22" cy="16" r="3.5" fill="#00A9E0" />
    <circle cx="22" cy="24" r="3.5" fill="#74BF44" />
    <circle cx="14" cy="28" r="3.5" fill="#F26A36" />
    <circle cx="6" cy="24" r="3.5" fill="#E6007E" />
    <circle cx="6" cy="16" r="3.5" fill="#004B87" />
    <text x="32" y="27" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="23" fill="#1A1A1A">wipro</text>
  </svg>
);

const TcsLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 110 40" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="2" y="28" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="27" fill="#005696" letterSpacing="1">tcs</text>
    <text x="54" y="17" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="8" fill="#333333">TATA</text>
    <text x="54" y="26" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7" fill="#555555">CONSULTANCY</text>
    <text x="54" y="34" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7" fill="#555555">SERVICES</text>
  </svg>
);

const InfosysLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="28" fontFamily="Georgia, serif" fontWeight="bold" fontSize="26" fill="#007CC3" letterSpacing="0.5">Infosys</text>
  </svg>
);

const AmazonLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="24" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24" fill="#111111">amazon</text>
    <path d="M16 28C32 34 62 34 76 23" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M74 21L80 24L74 27Z" fill="#FF9900" />
  </svg>
);

const WellsFargoLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 115 40" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="30" height="30" rx="5" fill="#D71E28" />
    <text x="7" y="27" fontFamily="Georgia, serif" fontWeight="bold" fontSize="18" fill="#FFCC00">W</text>
    <text x="38" y="20" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14" fill="#D71E28">WELLS</text>
    <text x="38" y="33" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14" fill="#D71E28">FARGO</text>
  </svg>
);

const RoyalOrchidLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 125 40" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="20" r="13" fill="#8B0000" />
    <circle cx="16" cy="20" r="6.5" fill="#DAA520" />
    <text x="35" y="19" fontFamily="Times New Roman, serif" fontWeight="bold" fontSize="13" fill="#8B0000">ROYAL ORCHID</text>
    <text x="35" y="31" fontFamily="Times New Roman, serif" fontWeight="700" fontSize="10" fill="#DAA520" letterSpacing="1">HOTELS</text>
  </svg>
);

const SairaJobsLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 105 40" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="26" height="26" rx="6" fill="#0E76A8" />
    <path d="M9 19L14 24L21 13" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="33" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="16" fill="#0E76A8">SAIRA</text>
    <text x="33" y="33" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="12" fill="#444444" letterSpacing="1">JOBS</text>
  </svg>
);

const CarlonLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 110 40" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 20L18 9L30 20L18 31Z" fill="#004B87" />
    <text x="36" y="28" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="22" fill="#004B87" letterSpacing="0.5">CARLON</text>
  </svg>
);

const partnerLogoMap: Record<string, React.ElementType> = {
  Wipro: WiproLogo,
  TCS: TcsLogo,
  Infosys: InfosysLogo,
  Amazon: AmazonLogo,
  'Wells Fargo': WellsFargoLogo,
  'Royal Orchid': RoyalOrchidLogo,
  'Saira Jobs': SairaJobsLogo,
  Carlon: CarlonLogo,
};

export default function PartnersSection() {
  // Multiplied partners list for seamless infinite marquee looping from right to left
  const displayPartners = [
    ...partnersContent.partners,
    ...partnersContent.partners,
    ...partnersContent.partners,
    ...partnersContent.partners,
    ...partnersContent.partners,
    ...partnersContent.partners,
  ];

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="partners-heading">
      {/* Global CSS Keyframe for hardware-accelerated right-to-left marquee */}
      <GlobalStyles
        styles={{
          '@keyframes partnerTickerRightToLeft': {
            '0%': {
              transform: 'translate3d(0, 0, 0)',
            },
            '100%': {
              transform: 'translate3d(-50%, 0, 0)',
            },
          },
        }}
      />

      <SectionHeading title={partnersContent.headline} description={partnersContent.body} titleId="partners-heading" />

      {/* Infinite Right-to-Left Marquee Outer Wrapper */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          my: { xs: 4, md: 5 },
          py: 2,
        }}
      >
        {/* Left Edge Gradient Fade */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: { xs: 60, sm: 120 },
            zIndex: 2,
            background: (theme) => `linear-gradient(to right, ${theme.palette.background.paper} 0%, transparent 100%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Right Edge Gradient Fade */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: { xs: 60, sm: 120 },
            zIndex: 2,
            background: (theme) => `linear-gradient(to left, ${theme.palette.background.paper} 0%, transparent 100%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Continuous Right-to-Left Infinite Scrolling Track */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 2, sm: 3, md: 4 },
            width: 'max-content',
            animation: 'partnerTickerRightToLeft 25s linear infinite',
            willChange: 'transform',
            '&:hover': {
              animationPlayState: 'paused',
            },
          }}
        >
          {displayPartners.map((partner, index) => {
            const LogoComponent = partnerLogoMap[partner.name] || WiproLogo;

            return (
              <Box
                key={`${partner.name}-${index}`}
                tabIndex={0}
                aria-label={`Hiring partner ${partner.name}`}
                sx={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: 160, sm: 190, md: 220 },
                  height: 65,
                  cursor: 'pointer',
                  opacity: 0.85,
                  filter: 'grayscale(15%)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover, &:focus-visible': {
                    opacity: 1,
                    filter: 'grayscale(0%)',
                    transform: 'scale(1.12)',
                  },
                }}
              >
                <LogoComponent />
              </Box>
            );
          })}
        </Box>
      </Box>

      <Stack direction="row" sx={{ justifyContent: 'center', mt: 2 }}>
        <Button component={Link} to={partnersContent.link.to} variant="outlined" color="primary" size="large" endIcon={<ArrowForwardRoundedIcon />}>
          {partnersContent.link.label}
        </Button>
      </Stack>
    </SectionContainer>
  );
}



