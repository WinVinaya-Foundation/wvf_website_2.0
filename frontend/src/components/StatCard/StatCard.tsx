import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Card, CardContent } from '../Card';

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

/** A static metric tile — not clickable, so the theme's default Card hover-lift is
 * neutralized here (a jump-on-hover would wrongly imply the tile is interactive). */
export default function StatCard({ icon, label, value, color = 'primary' }: StatCardProps) {
  return (
    <Card sx={{ height: '100%', '&:hover': { boxShadow: (theme) => theme.shadows[2], transform: 'none' } }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette[color].main, 0.12),
            color: `${color}.dark`,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="p" sx={{ fontWeight: 800, fontSize: { xs: '1.15rem', lg: '1.35rem' } }} noWrap>
            {value}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3 }}
          >
            {label}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
