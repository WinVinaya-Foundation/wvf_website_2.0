import type { Shadows } from '@mui/material/styles';

const shadowColor = '28, 27, 23';

function elevation(level: number): string {
  const keyY = Math.min(1 + level * 0.9, 32);
  const keyBlur = Math.min(2 + level * 1.6, 56);
  const keyOpacity = Math.min(0.04 + level * 0.01, 0.24);
  const ambientBlur = Math.min(4 + level * 2, 80);
  const ambientOpacity = Math.min(0.03 + level * 0.006, 0.16);

  return [
    `0px ${keyY}px ${keyBlur}px rgba(${shadowColor}, ${keyOpacity.toFixed(3)})`,
    `0px 0px ${ambientBlur}px rgba(${shadowColor}, ${ambientOpacity.toFixed(3)})`,
  ].join(', ');
}

export const shadows = Array.from({ length: 25 }, (_, level) =>
  level === 0 ? 'none' : elevation(level),
) as Shadows;
