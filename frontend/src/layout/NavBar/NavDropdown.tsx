import { useRef, useState } from 'react';
import { Box, ListItemText, Menu, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '../../components';
import type { NavGroup } from './navItems';

interface NavDropdownProps {
  group: NavGroup;
}

export default function NavDropdown({ group }: NavDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isActive = group.items.some((item) => pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to)));

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setAnchorEl(null), 200);
  };

  const handleOpen = () => {
    clearCloseTimer();
    if (buttonRef.current) {
      setAnchorEl(buttonRef.current);
    }
  };

  return (
    <Box
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
      sx={{ position: 'relative' }}
    >
      <Button
        ref={buttonRef}
        color="inherit"
        onClick={() => {
          clearCloseTimer();
          setAnchorEl(open ? null : buttonRef.current);
        }}
        aria-haspopup="true"
        aria-expanded={open}
        endIcon={
          <KeyboardArrowDownRoundedIcon
            sx={{
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform 200ms ease',
              fontSize: 18,
            }}
          />
        }
        sx={{
          color: open || isActive ? 'primary.dark' : 'text.primary',
          fontWeight: 700,
          fontSize: { lg: '1.08rem', xl: '1.08rem' },
          borderRadius: 2.5,
          px: { lg: 1.25, xl: 2 },
          py: 0.85,
          minHeight: 40,
          bgcolor: open || isActive ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            color: 'primary.dark',
          },
          transition: 'all 0.2s ease',
        }}
      >
        {group.label}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableScrollLock
        disableRestoreFocus
        autoFocus={false}
        slotProps={{
          list: {
            onMouseEnter: clearCloseTimer,
            onMouseLeave: scheduleClose,
            sx: { py: 1 },
          },
          paper: {
            onMouseEnter: clearCloseTimer,
            onMouseLeave: scheduleClose,
            sx: {
              minWidth: 330,
              maxWidth: 380,
              mt: 0.75,
              borderRadius: 3,
              boxShadow: (theme) => `0 14px 36px -6px ${alpha(theme.palette.grey[900], 0.14)}`,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.15),
              overflow: 'hidden',
            },
          },
        }}
      >
        {group.items.map((item) => {
          const isItemActive = pathname === item.to;
          return (
            <MenuItem
              key={item.to}
              component={Link}
              to={item.to}
              onClick={() => {
                clearCloseTimer();
                setAnchorEl(null);
              }}
              sx={{
                whiteSpace: 'normal',
                px: 2.25,
                py: 1.25,
                borderRadius: 2,
                mx: 1,
                my: 0.25,
                bgcolor: isItemActive ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  transform: 'translateX(3px)',
                  '& .item-primary-text': {
                    color: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemText
                primary={item.label}
                secondary={item.description}
                slotProps={{
                  primary: {
                    className: 'item-primary-text',
                    sx: {
                      fontWeight: 700,
                      fontSize: '1.025rem',
                      color: isItemActive ? 'primary.dark' : 'text.primary',
                      transition: 'color 0.2s ease',
                    },
                  },
                  secondary: {
                    sx: {
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      lineHeight: 1.4,
                      mt: 0.25,
                    },
                  },
                }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}

