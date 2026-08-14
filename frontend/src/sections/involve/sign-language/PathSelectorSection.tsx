import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import SignLanguageRoundedIcon from '@mui/icons-material/SignLanguageRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../../components';
import { pathSelector } from '../../../pages/involve/signLanguageContent';

const PATH_ICONS = [PsychologyRoundedIcon, SignLanguageRoundedIcon];

/** Quick-nav Section letting visitors jump straight to whichever half of the page they want */
export default function PathSelectorSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="path-selector-heading">
      <Box
        id="path-selector-heading"
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
        Choose Your Path
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3.5 }}>
        {pathSelector.paths.map((path, index) => {
          const Icon = PATH_ICONS[index % PATH_ICONS.length];
          const colorKey = path.ctaColor;

          return (
            <Box
              key={path.eyebrow}
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
                    {path.eyebrow}
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
                  {path.headline}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {path.body}
                </Typography>
              </Stack>

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Button
                  component={Link}
                  to={path.link}
                  variant="contained"
                  color={colorKey}
                  size="large"
                  fullWidth
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{ py: 1.5, borderRadius: 3, fontWeight: 800 }}
                >
                  {path.buttonText}
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
