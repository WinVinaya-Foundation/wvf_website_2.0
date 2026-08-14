import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { breakpoints } from './breakpoints';
import { shape } from './shape';
import { shadows } from './shadows';
import { buildComponents } from './components';

const baseTheme = createTheme({
  palette,
  typography,
  breakpoints,
  shape,
  shadows,
  spacing: 8,
});

const themeWithComponents = createTheme(baseTheme, {
  components: buildComponents(baseTheme),
});

export const theme = responsiveFontSizes(themeWithComponents, {
  breakpoints: ['sm', 'md', 'lg'],
  factor: 2,
});
