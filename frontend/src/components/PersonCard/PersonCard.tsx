import { useState } from 'react';
import { Box, IconButton, Stack, Typography, type TypographyProps } from '@mui/material';
import { alpha } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { personInitials, personPhotoUrl } from '../../utils/person';
import { Card, CardContent } from '../Card';

export interface PersonCardProps {
  name: string;
  role?: string;
  photo?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  size?: 'lg' | 'md';
}

const SIZE_CONFIG: Record<
  NonNullable<PersonCardProps['size']>,
  {
    imageHeight: number;
    fontSize: number;
    nameVariant: TypographyProps['variant'];
    roleVariant: TypographyProps['variant'];
    p: number;
  }
> = {
  lg: { imageHeight: 280, fontSize: 48, nameVariant: 'h6', roleVariant: 'body2', p: 3 },
  md: { imageHeight: 200, fontSize: 36, nameVariant: 'subtitle1', roleVariant: 'caption', p: 2.5 },
};

/** Executive profile card with full-width portrait photo filling top of card. */
export default function PersonCard({ name, role, photo, linkedin, twitter, email, size = 'md' }: PersonCardProps) {
  const cfg = SIZE_CONFIG[size];
  const photoSrc = photo || personPhotoUrl(name);
  const [imgError, setImgError] = useState(false);
  const hasSocials = Boolean(linkedin || twitter || email);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette.secondary.main, 0.18),
        boxShadow: (theme) => `0 10px 30px -10px ${alpha(theme.palette.grey[900], 0.06)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: 'secondary.main',
          boxShadow: (theme) => `0 20px 40px -10px ${alpha(theme.palette.secondary.main, 0.22)}`,
          '& .person-card-img': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {/* Top Image Banner Filling Card Width */}
      <Box
        sx={{
          width: '100%',
          height: cfg.imageHeight,
          position: 'relative',
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
          overflow: 'hidden',
        }}
      >
        {!imgError ? (
          <Box
            component="img"
            src={photoSrc}
            alt={name}
            onError={() => setImgError(true)}
            className="person-card-img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
              transition: 'transform 0.4s ease',
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.15),
              color: 'secondary.main',
              fontWeight: 800,
              fontSize: cfg.fontSize,
            }}
          >
            {personInitials(name)}
          </Box>
        )}
      </Box>

      {/* Card Body Content */}
      <CardContent
        sx={{
          p: cfg.p,
          textAlign: 'center',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant={cfg.nameVariant} component="p" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {name}
          </Typography>
          {role && (
            <Typography variant={cfg.roleVariant} sx={{ color: 'text.secondary', display: 'block', mt: 0.5, fontWeight: 500 }}>
              {role}
            </Typography>
          )}
        </Box>

        {hasSocials && (
          <Stack direction="row" spacing={1} sx={{ pt: 2, justifyContent: 'center' }}>
            {linkedin && (
              <IconButton
                component="a"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}'s LinkedIn profile`}
                size="small"
                sx={{
                  color: 'secondary.main',
                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                  '&:hover': { bgcolor: 'secondary.main', color: 'common.white' },
                  transition: 'all 0.2s ease',
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            )}
            {twitter && (
              <IconButton
                component="a"
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}'s Twitter profile`}
                size="small"
                sx={{
                  color: 'secondary.main',
                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                  '&:hover': { bgcolor: 'secondary.main', color: 'common.white' },
                  transition: 'all 0.2s ease',
                }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
            )}
            {email && (
              <IconButton
                component="a"
                href={`mailto:${email}`}
                aria-label={`Email ${name}`}
                size="small"
                sx={{
                  color: 'secondary.main',
                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                  '&:hover': { bgcolor: 'secondary.main', color: 'common.white' },
                  transition: 'all 0.2s ease',
                }}
              >
                <EmailRoundedIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}


