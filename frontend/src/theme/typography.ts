import type { TypographyVariantsOptions } from '@mui/material/styles';

const headingFontFamily = '"Lexend", "Helvetica", "Arial", sans-serif';
const bodyFontFamily = '"Source Sans 3", "Helvetica", "Arial", sans-serif';

export const typography: TypographyVariantsOptions = {
  fontFamily: bodyFontFamily,
  htmlFontSize: 16,
  h1: { fontFamily: headingFontFamily, fontWeight: 700, fontSize: '2.75rem', lineHeight: 1.2, letterSpacing: '-0.02em' },
  h2: { fontFamily: headingFontFamily, fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.25, letterSpacing: '-0.01em' },
  h3: { fontFamily: headingFontFamily, fontWeight: 600, fontSize: '1.875rem', lineHeight: 1.3 },
  h4: { fontFamily: headingFontFamily, fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.35 },
  h5: { fontFamily: headingFontFamily, fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
  h6: { fontFamily: headingFontFamily, fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.4 },
  subtitle1: { fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 },
  subtitle2: { fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.5 },
  body1: { fontWeight: 400, fontSize: '1.085rem', lineHeight: 1.6 },
  body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6 },
  button: { fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.5, textTransform: 'none', letterSpacing: '0.01em' },
  caption: { fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.5 },
  overline: { fontWeight: 600, fontSize: '0.75rem', lineHeight: 1.5, textTransform: 'uppercase', letterSpacing: '0.08em' },
};
