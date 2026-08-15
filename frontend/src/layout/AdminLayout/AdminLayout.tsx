import { useState, type ReactNode } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import logoMark from '../../assets/logo/winvinaya_mark.png';
import type { AdminUser } from '../../store/api/authApi';
import { baseApi } from '../../store/api/baseApi';
import { clearToken } from '../../store/slices/authSlice';
import { useAppDispatch } from '../../store/hooks';

const DRAWER_WIDTH = 260;

interface AdminNavItem {
  label: string;
  to: string;
  icon: ReactNode;
}

const navItems: AdminNavItem[] = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: <DashboardRoundedIcon /> },
  { label: 'Donor Info', to: '/admin/donors', icon: <GroupsRoundedIcon /> },
  { label: 'Reports & Documents', to: '/admin/reports', icon: <DescriptionRoundedIcon /> },
  { label: 'Events', to: '/admin/events', icon: <EventRoundedIcon /> },
  { label: 'Gallery', to: '/admin/gallery', icon: <CollectionsRoundedIcon /> },
  { label: 'Success Stories', to: '/admin/stories', icon: <AutoAwesomeRoundedIcon /> },
  { label: 'Testimonials', to: '/admin/testimonials', icon: <FormatQuoteRoundedIcon /> },
  { label: 'Blog Posts', to: '/admin/blog', icon: <ArticleRoundedIcon /> },
];

interface AdminLayoutProps {
  user: AdminUser;
  title: string;
  children: ReactNode;
}

export default function AdminLayout({ user, title, children }: AdminLayoutProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  function handleLogout() {
    dispatch(clearToken());
    // Drops every cached query result (donors, current user, …) so the next login starts clean.
    dispatch(baseApi.util.resetApiState());
    navigate({ to: '/admin/login' });
  }

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ gap: 1.25 }}>
        <Box component="img" src={logoMark} alt="" sx={{ height: 32, width: 'auto' }} />
        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
          WinVinaya Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, py: 1, px: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.to;
          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: isActive ? 'primary.dark' : 'text.primary',
                bgcolor: isActive ? (t) => alpha(t.palette.primary.main, 0.1) : 'transparent',
                '&:hover': { bgcolor: isActive ? (t) => alpha(t.palette.primary.main, 0.16) : 'action.hover' },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? 'primary.dark' : 'text.secondary', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: isActive ? 700 : 500 } } }} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: (t) => alpha(t.palette.background.paper, 0.95),
          backdropFilter: 'blur(12px)',
          ...(isDesktop && { width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px` }),
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {!isDesktop && (
            <IconButton edge="start" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
              <MenuRoundedIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flex: 1 }} noWrap>
            {title}
          </Typography>
          <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)} aria-label="Account menu">
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 15, fontWeight: 700 }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
            <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
              <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700 }}>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                {user.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem
              onClick={() => {
                setMenuAnchor(null);
                handleLogout();
              }}
            >
              <ListItemIcon>
                <LogoutRoundedIcon fontSize="small" />
              </ListItemIcon>
              Sign out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={isDesktop ? true : mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, ...(isDesktop && { width: `calc(100% - ${DRAWER_WIDTH}px)` }) }}>
        <Toolbar />
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
