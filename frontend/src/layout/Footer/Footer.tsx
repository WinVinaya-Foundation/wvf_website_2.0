import { Box, Container, Divider, IconButton, Link as MuiLink, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import LinkedIn from '@mui/icons-material/LinkedIn';
import YouTube from '@mui/icons-material/YouTube';
import Twitter from '@mui/icons-material/Twitter';
import { Link } from '@tanstack/react-router';
import logoMark from '../../assets/logo/winvinaya_mark.png';
import { footerColumns, legalLinks, socialLinks } from './footerLinks';

const SOCIAL_ICONS: Record<string, typeof Facebook> = {
  Facebook,
  Instagram,
  LinkedIn,
  YouTube,
  'Twitter/X': Twitter,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'common.white' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.6fr' },
            gap: { xs: 5, md: 6 },
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: 'inline-flex', p: 1, borderRadius: 2, bgcolor: 'common.white', width: 'fit-content' }}>
              <Box component="img" src={logoMark} alt="WinVinaya Foundation" sx={{ height: 40, width: 'auto', display: 'block' }} />
            </Box>
            <Typography variant="body2" sx={{ color: (theme) => alpha(theme.palette.common.white, 0.72), maxWidth: 320 }}>
              Enabling an inclusive society by training persons with disabilities in in-demand skills and connecting
              them with real careers.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                if (!Icon) return null;
                return (
                  <IconButton
                    key={social.label}
                    component="a"
                    href={social.href}
                    aria-label={social.label}
                    size="small"
                    sx={{
                      color: 'inherit',
                      border: '1px solid',
                      borderColor: (theme) => alpha(theme.palette.common.white, 0.24),
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                );
              })}
            </Stack>
          </Stack>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: { xs: 4, sm: 3 } }}>
            {footerColumns.map((column) => (
              <Stack key={column.heading} spacing={1.5}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {column.heading}
                </Typography>
                <Stack spacing={1}>
                  {column.links.map((link) => (
                    <MuiLink
                      key={link.to}
                      component={Link}
                      to={link.to}
                      variant="body2"
                      sx={{
                        color: (theme) => alpha(theme.palette.common.white, 0.72),
                        '&:hover': { color: 'common.white' },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 5, md: 6 }, borderColor: (theme) => alpha(theme.palette.common.white, 0.12) }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
        >
          <Typography variant="body2" sx={{ color: (theme) => alpha(theme.palette.common.white, 0.6) }}>
            © {year} WinVinaya InfoSystems. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
            {legalLinks.map((link) => (
              <MuiLink
                key={link.to}
                component={Link}
                to={link.to}
                variant="body2"
                underline="hover"
                sx={{ color: (theme) => alpha(theme.palette.common.white, 0.72) }}
              >
                {link.label}
              </MuiLink>
            ))}
            <MuiLink
              component={Link}
              to="/contact"
              variant="body2"
              underline="hover"
              sx={{ color: (theme) => alpha(theme.palette.common.white, 0.72) }}
            >
              Contact Us
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
