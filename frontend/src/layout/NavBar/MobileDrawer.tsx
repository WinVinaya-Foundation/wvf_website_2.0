import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '../../components';
import logoMark from '../../assets/logo/winvinaya_mark.png';
import { donateItem, homeItem, navGroups } from './navItems';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHomeActive = pathname === '/';

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 380,
            maxWidth: '100vw',
            boxSizing: 'border-box',
            '@media (max-width: 600px)': {
              width: '100vw',
            },
          },
        },
      }}
    >
      <Stack sx={{ height: '100%', width: '100%', boxSizing: 'border-box' }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minWidth: 0, flex: 1, mr: 1 }}>
            <Box component="img" src={logoMark} alt="" sx={{ height: 32, width: 'auto', flexShrink: 0 }} />
            <Typography
              variant="subtitle1"
              noWrap
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                color: 'text.primary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              WinVinaya Foundation
            </Typography>
          </Stack>
          <IconButton onClick={onClose} aria-label="Close menu" sx={{ flexShrink: 0 }}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {/* Candidate Registration Announcement Banner */}
          <Box
            component="a"
            href="https://crm.winvinaya.com/candidate-registration"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2.25,
              mx: 1.5,
              my: 1.5,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2D0B08 0%, #4D130D 100%)',
              border: '1px solid rgba(255, 167, 38, 0.35)',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(45, 11, 8, 0.25)',
              transition: 'all 0.25s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #380E0A 0%, #5C1811 100%)',
                borderColor: 'rgba(255, 183, 77, 0.6)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <Stack spacing={0.5}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  alignSelf: 'flex-start',
                  px: 1,
                  py: 0.15,
                  borderRadius: 4,
                  bgcolor: 'rgba(255, 167, 38, 0.15)',
                  border: '1px solid rgba(255, 167, 38, 0.3)',
                  color: '#FFA726',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                For PwD Job Seekers
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: '0.975rem', color: '#FFF8E1' }}>
                Register as Candidate
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: alpha('#ffffff', 0.85) }}>
                Get free career guidance & corporate placement support
              </Typography>
            </Stack>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 167, 38, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                ml: 1,
              }}
            >
              <OpenInNewRoundedIcon sx={{ color: '#FFA726', fontSize: 18 }} />
            </Box>
          </Box>

          <ListItemButton
            component={Link}
            to={homeItem.to}
            onClick={onClose}
            sx={{
              px: 2,
              py: 1.75,
              minHeight: 56,
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: isHomeActive ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.125rem' },
                color: isHomeActive ? 'primary.dark' : 'text.primary',
              }}
            >
              {homeItem.label}
            </Typography>
          </ListItemButton>
          {navGroups.map((group) => {
            const hasActiveChild = group.items.some(
              (item) => pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to)),
            );
            return (
              <Accordion
                key={group.label}
                defaultExpanded={hasActiveChild}
                disableGutters
                elevation={0}
                square
                sx={{
                  '&:before': { display: 'none' },
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} sx={{ px: 2, minHeight: 56 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.125rem' },
                      color: hasActiveChild ? 'primary.dark' : 'text.primary',
                    }}
                  >
                    {group.label}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <List disablePadding>
                    {group.items.map((item) => {
                      const isItemActive = pathname === item.to;
                      return (
                        <ListItemButton
                          key={item.to}
                          component={Link}
                          to={item.to}
                          onClick={onClose}
                          sx={{
                            px: 3,
                            py: 1.25,
                            bgcolor: isItemActive ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
                          }}
                        >
                          <ListItemText
                            primary={item.label}
                            secondary={item.description}
                            slotProps={{
                              primary: {
                                sx: {
                                  fontWeight: 600,
                                  fontSize: { xs: '0.95rem', sm: '1.05rem' },
                                  color: isItemActive ? 'primary.dark' : 'text.primary',
                                },
                              },
                              secondary: { sx: { color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            component={Link}
            to={donateItem.to}
            onClick={onClose}
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<VolunteerActivismRoundedIcon />}
            sx={{ fontSize: { xs: '1rem', sm: '1.05rem' }, fontWeight: 700 }}
          >
            Donate
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
}
