import { useState } from 'react';
import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import { alpha } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '../../components';
import logo from '../../assets/logo/winvinaya_foundation.png';
import logoMark from '../../assets/logo/winvinaya_mark.png';
import NavDropdown from './NavDropdown';
import MobileDrawer from './MobileDrawer';
import TopAnnouncementBar from './TopAnnouncementBar';
import { donateItem, homeItem, navGroups } from './navItems';

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHomeActive = pathname === '/';

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: (theme) => alpha(theme.palette.grey[300], 0.5),
        boxShadow: (theme) => `0 4px 20px -4px ${alpha(theme.palette.grey[900], 0.05)}`,
      }}
    >
      <TopAnnouncementBar />
      <Toolbar sx={{ minHeight: { xs: 64, md: 80 }, px: { xs: 2, sm: 3, md: 4, lg: 6 }, gap: 2 }}>
        <Box
          component={Link}
          to="/"
          aria-label="WinVinaya Foundation home"
          sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <Box
            component="img"
            src={logo}
            alt="WinVinaya Foundation"
            sx={{ display: { xs: 'none', sm: 'block' }, height: { sm: 54, md: 64, lg: 74 }, width: 'auto' }}
          />
          <Box
            component="img"
            src={logoMark}
            alt="WinVinaya Foundation"
            sx={{ display: { xs: 'block', sm: 'none' }, height: 40, width: 'auto' }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={{ lg: 0.25, xl: 0.75 }}
          sx={{ alignItems: 'center', display: { xs: 'none', lg: 'flex' }, ml: 'auto' }}
        >
          <Button
            component={Link}
            to={homeItem.to}
            color="inherit"
            sx={{
              color: isHomeActive ? 'primary.dark' : 'text.primary',
              fontWeight: 700,
              fontSize: { lg: '1.08rem', xl: '1.08rem' },
              borderRadius: 2.5,
              px: { lg: 1.25, xl: 2 },
              py: 0.85,
              minHeight: 40,
              bgcolor: isHomeActive ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: 'primary.dark',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {homeItem.label}
          </Button>
          {navGroups.map((group) => (
            <NavDropdown key={group.label} group={group} />
          ))}
          <Button
            component={Link}
            to={donateItem.to}
            variant="contained"
            color="secondary"
            startIcon={<VolunteerActivismRoundedIcon />}
            sx={{ ml: { lg: 1, xl: 1.5 }, fontSize: { lg: '1.05rem', xl: '1.05rem' }, fontWeight: 600 }}
          >
            Donate
          </Button>
        </Stack>

        <Box sx={{ display: { xs: 'flex', lg: 'none' }, ml: 'auto' }}>
          <IconButton onClick={() => setMobileOpen(true)} aria-label="Open menu" color="inherit">
            <MenuRoundedIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>
      </Toolbar>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </AppBar>
  );
}
