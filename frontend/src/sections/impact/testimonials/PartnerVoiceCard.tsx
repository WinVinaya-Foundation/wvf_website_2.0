import type { ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import type { PartnerVoice } from '../../../pages/impact/testimonialsContent';
import type { VoiceAccent } from './voiceAccents';

export interface PartnerVoiceCardProps {
  voice: PartnerVoice;
  icon: ReactNode;
  accent: VoiceAccent;
}

/** Wide, featured partner quote card with bold typography, prominent icon badge, and modern glass background */
export default function PartnerVoiceCard({ voice, icon, accent }: PartnerVoiceCardProps) {
  return (
    <Box
      component="figure"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        m: 0,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'auto 1fr' },
        gap: { xs: 2.5, sm: 3.5 },
        alignItems: 'flex-start',
        p: { xs: 3.5, sm: 4.5 },
        borderRadius: 4,
        bgcolor: 'background.paper',
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette[accent].main, 0.06)} 100%)`,
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette[accent].main, 0.25),
        boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: `${accent}.main`,
          boxShadow: (theme) => `0 20px 40px -12px ${alpha(theme.palette[accent].main, 0.22)}`,
        },
      }}
    >
      {/* Background oversized quote watermark */}
      <FormatQuoteRoundedIcon
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 12,
          right: 20,
          fontSize: 80,
          color: (theme) => alpha(theme.palette[accent].main, 0.1),
          pointerEvents: 'none',
          transform: 'rotate(180deg)',
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: 3.5,
          flexShrink: 0,
          bgcolor: (theme) => alpha(theme.palette[accent].main, 0.15),
          color: `${accent}.dark`,
          border: '2px solid',
          borderColor: (theme) => alpha(theme.palette[accent].main, 0.3),
          boxShadow: (theme) => `0 6px 16px ${alpha(theme.palette[accent].main, 0.2)}`,
          '& svg': { fontSize: 32 },
        }}
      >
        {icon}
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          component="blockquote"
          variant="body1"
          sx={{
            m: 0,
            mb: 2.5,
            color: 'text.primary',
            fontSize: { xs: '1.05rem', sm: '1.15rem' },
            lineHeight: 1.8,
            fontWeight: 450,
            fontStyle: 'italic',
          }}
        >
          &ldquo;{voice.quote}&rdquo;
        </Typography>

        <Box
          component="figcaption"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
            pt: 2,
            borderTop: '1px solid',
            borderColor: (theme) => alpha(theme.palette[accent].main, 0.18),
          }}
        >
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 800, fontSize: '1.1rem', color: 'text.primary' }}>
                {voice.name}
              </Typography>
              <VerifiedRoundedIcon sx={{ fontSize: 18, color: `${accent}.main` }} />
            </Stack>
            {voice.title && (
              <Typography variant="body2" sx={{ color: `${accent}.dark`, fontWeight: 600, mt: 0.25 }}>
                {voice.title}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

