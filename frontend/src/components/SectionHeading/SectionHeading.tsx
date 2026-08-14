import { Stack, Typography } from '@mui/material';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  color?: string;
  descriptionColor?: string;
  /** Id applied to the heading — pair with SectionContainer's `labelledBy` for a named landmark region. */
  titleId?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  color,
  descriptionColor,
  titleId,
}: SectionHeadingProps) {
  return (
    <Stack
      spacing={1.5}
      sx={{
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        maxWidth: 720,
        mx: align === 'center' ? 'auto' : 0,
        mb: { xs: 4, md: 6 },
      }}
    >
      {eyebrow && (
        <Typography variant="overline" sx={{ color: color ?? 'primary.dark', letterSpacing: 1.2 }}>
          {eyebrow}
        </Typography>
      )}
      <Typography id={titleId} variant="h2" sx={{ color }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" sx={{ color: descriptionColor ?? color ?? 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}
