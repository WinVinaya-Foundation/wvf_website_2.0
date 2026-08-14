import { Box, Typography } from '@mui/material';
import { useCountUp } from '../../hooks/useCountUp';

interface StatTileProps {
  value: number;
  suffix?: string;
  label: string;
  color?: string;
}

export default function StatTile({ value, suffix = '', label, color }: StatTileProps) {
  const { value: animated, ref } = useCountUp({ end: value });

  return (
    // The animated digits are decorative — aria-label carries the final value immediately,
    // rather than screen readers announcing whatever mid-count number JS happens to be on.
    <Box ref={ref} sx={{ textAlign: 'center' }} aria-label={`${value.toLocaleString()}${suffix} ${label}`}>
      <Typography aria-hidden="true" variant="h3" component="p" sx={{ fontWeight: 700, color: color ?? 'primary.dark' }}>
        {animated.toLocaleString()}
        {suffix}
      </Typography>
      <Typography aria-hidden="true" variant="body2" sx={{ color: color ?? 'text.secondary', opacity: color ? 0.85 : 1 }}>
        {label}
      </Typography>
    </Box>
  );
}
