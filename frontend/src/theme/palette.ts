import type { PaletteOptions } from '@mui/material/styles';
import { brand } from './brand';

export const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: brand.orange,
    light: '#FFC670',
    dark: '#A05F12',
    contrastText: '#2B1400',
  },
  secondary: {
    main: '#3B6E2E',
    light: brand.green,
    dark: '#245418',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#1D6FA5',
    light: '#5FA8D9',
    dark: '#124D73',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#3B6E2E',
    light: '#83C36A',
    dark: '#245418',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#CA8A04',
    light: '#FDE68A',
    dark: '#7A5203',
    contrastText: '#1F1300',
  },
  error: {
    main: '#DC2626',
    light: '#F87171',
    dark: '#991B1B',
    contrastText: '#FFFFFF',
  },
  grey: {
    50: '#FAF9F7',
    100: '#F3F1EE',
    200: '#E4E1DC',
    300: '#CFCBC3',
    400: '#A8A39A',
    500: '#7A756C',
    600: '#5F5B54',
    700: '#454239',
    800: '#2E2C27',
    900: '#1C1B17',
  },
  background: {
    default: '#FAF9F7',
    paper: '#FFFFFF',
  },
  text: {
    primary: brand.charcoal,
    secondary: '#6B6560',
    disabled: '#A8A39A',
  },
  divider: '#E4E1DC',
};
