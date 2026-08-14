import { alpha, type Theme, type ThemeOptions } from '@mui/material/styles';

export function buildComponents(theme: Theme): ThemeOptions['components'] {
  const scrollbarThumb = alpha(theme.palette.primary.main, 0.35);
  const scrollbarThumbHover = alpha(theme.palette.primary.main, 0.55);
  const scrollbarTrack = theme.palette.grey[100];

  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        html: {
          minHeight: '100%',
          scrollBehavior: 'smooth',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textSizeAdjust: '100%',
        },
        body: {
          minHeight: '100%',
          margin: 0,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
        '#root': {
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        img: {
          maxWidth: '100%',
          display: 'block',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${scrollbarThumb} ${scrollbarTrack}`,
        },
        '*::-webkit-scrollbar': {
          width: 10,
          height: 10,
        },
        '*::-webkit-scrollbar-track': {
          background: scrollbarTrack,
        },
        '*::-webkit-scrollbar-thumb': {
          background: scrollbarThumb,
          borderRadius: 8,
          border: `2px solid ${scrollbarTrack}`,
          backgroundClip: 'padding-box',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: scrollbarThumbHover,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          },
          [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
          border: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(['box-shadow', 'transform'], {
            duration: 200,
          }),
          '&:hover': {
            boxShadow: theme.shadows[6],
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'transparent',
      },
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[1],
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          minHeight: 44,
          paddingInline: theme.spacing(2.5),
          boxShadow: 'none',
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            // primary.dark, not .main — primary.main is ~2:1 against light card backgrounds
            // and fails the 3:1 WCAG 1.4.11 non-text contrast requirement for focus indicators.
            outline: `2px solid ${theme.palette.primary.dark}`,
            outlineOffset: -2,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          minHeight: 44,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 500,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[900],
          fontSize: theme.typography.pxToRem(12),
          borderRadius: 6,
          boxShadow: theme.shadows[6],
        },
      },
    },
  };
}
