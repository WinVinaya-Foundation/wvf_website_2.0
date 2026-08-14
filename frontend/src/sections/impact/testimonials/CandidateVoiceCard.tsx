import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { Chip } from '../../../components';
import type { CandidateVoice } from '../../../pages/impact/testimonialsContent';
import { personInitials } from '../../../utils/person';
import type { VoiceAccent } from './voiceAccents';

const EXPAND_THRESHOLD = 160;

export interface CandidateVoiceCardProps {
  voice: CandidateVoice;
  accent: VoiceAccent;
}

/** Modernized glass tile in candidate voices grid with larger, clear quote typography and hover lift */
export default function CandidateVoiceCard({ voice, accent }: CandidateVoiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = voice.quote.length > EXPAND_THRESHOLD;

  return (
    <Box
      component="figure"
      sx={{
        breakInside: 'avoid',
        position: 'relative',
        overflow: 'hidden',
        m: 0,
        mb: 3.5,
        p: { xs: 3, sm: 3.5 },
        borderRadius: 4,
        bgcolor: 'background.paper',
        background: (theme) =>
          `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette[accent].main, 0.04)} 100%)`,
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette[accent].main, 0.22),
        boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          borderColor: `${accent}.main`,
          boxShadow: (theme) => `0 20px 36px -12px ${alpha(theme.palette[accent].main, 0.22)}`,
        },
      }}
    >
      {/* Decorative oversized floating quote mark backdrop */}
      <FormatQuoteRoundedIcon
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 12,
          right: 16,
          fontSize: 64,
          color: (theme) => alpha(theme.palette[accent].main, 0.12),
          pointerEvents: 'none',
          transform: 'rotate(180deg)',
        }}
      />

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2.5, position: 'relative', zIndex: 1 }}>
        <Box
          aria-hidden="true"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            flexShrink: 0,
            bgcolor: (theme) => alpha(theme.palette[accent].main, 0.15),
            color: `${accent}.dark`,
            fontWeight: 800,
            fontSize: '1rem',
            border: '2px solid',
            borderColor: (theme) => alpha(theme.palette[accent].main, 0.35),
            boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette[accent].main, 0.2)}`,
          }}
        >
          {personInitials(voice.name)}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.3 }}>
            {voice.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mt: 0.25 }}>
            {voice.role}
          </Typography>
        </Box>
      </Stack>

      <Typography
        component="blockquote"
        variant="body1"
        sx={{
          m: 0,
          position: 'relative',
          zIndex: 1,
          color: 'text.primary',
          fontSize: { xs: '0.975rem', sm: '1.025rem' },
          lineHeight: 1.75,
          fontWeight: 400,
          display: expanded ? 'block' : '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        &ldquo;{voice.quote}&rdquo;
      </Typography>

      {isLong && (
        <Box
          component="button"
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            mt: 1.5,
            p: 0,
            border: 0,
            bgcolor: 'transparent',
            color: `${accent}.dark`,
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'color 0.2s ease',
            '&:hover': { color: `${accent}.main` },
            '&:focus-visible': { outline: (theme) => `2px solid ${theme.palette.primary.dark}`, outlineOffset: 2 },
          }}
        >
          {expanded ? (
            <>
              Show less <ExpandLessRoundedIcon sx={{ fontSize: 18 }} />
            </>
          ) : (
            <>
              Read more <ExpandMoreRoundedIcon sx={{ fontSize: 18 }} />
            </>
          )}
        </Box>
      )}

      {voice.disability && (
        <Box sx={{ mt: 2.5, pt: 1.5, borderTop: '1px stroke', borderColor: (theme) => alpha(theme.palette.divider, 0.6) }}>
          <Chip
            icon={<WorkspacePremiumRoundedIcon sx={{ fontSize: 16 }} />}
            label={voice.disability}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: '0.8rem',
              py: 0.5,
              px: 0.5,
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette[accent].main, 0.12),
              color: `${accent}.dark`,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette[accent].main, 0.25),
            }}
          />
        </Box>
      )}
    </Box>
  );
}

