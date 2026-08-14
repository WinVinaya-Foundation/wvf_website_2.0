import type { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import type { Theme } from '@mui/material/styles';

export interface SectionContainerProps {
  children: ReactNode;
  bgcolor?: string | ((theme: Theme) => string);
  color?: string;
  /** Id of this section's heading — exposes the section as a named landmark region for screen reader navigation. */
  labelledBy?: string;
  /** Id on the section element itself — lets in-page nav (e.g. a hero "jump to" link) scroll to it. */
  id?: string;
}

export default function SectionContainer({ children, bgcolor = 'transparent', color, labelledBy, id }: SectionContainerProps) {
  return (
    <Box
      id={id}
      component="section"
      aria-labelledby={labelledBy}
      sx={{ bgcolor: (theme) => (typeof bgcolor === 'function' ? bgcolor(theme) : bgcolor), color }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {children}
      </Container>
    </Box>
  );
}
