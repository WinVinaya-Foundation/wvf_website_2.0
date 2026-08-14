import type { ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';

interface StatusPageProps {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function StatusPage({ icon, eyebrow, title, description, action }: StatusPageProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 3 },
        py: { xs: 6, md: 10 },
      }}
    >
      <Stack spacing={2.5} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 480, mx: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 88,
            height: 88,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: 44,
            boxShadow: (theme) => theme.shadows[4],
          }}
        >
          {icon}
        </Box>
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.2 }}>
          {eyebrow}
        </Typography>
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
        {action}
      </Stack>
    </Box>
  );
}
