import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { Link } from '@tanstack/react-router';
import { Button, Chip, SectionContainer } from '../../components';
import { proofItWorks } from '../../pages/home/homeContent';

const STAT_ICONS = [TrendingUpRoundedIcon, BusinessCenterRoundedIcon, AccessTimeRoundedIcon];

function getYouTubeThumbnail(url?: string, quality: 'maxres' | 'sd' | 'hq' = 'maxres'): string | null {
  if (!url) return null;
  const match = url.match(/embed\/([^?]+)/);
  if (!match) return null;
  const id = match[1];
  if (quality === 'maxres') return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  if (quality === 'sd') return `https://img.youtube.com/vi/${id}/sddefault.jpg`;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

const STORY_ACCENTS = ['#FF5A36', '#2563EB', '#0D9488', '#8B5CF6', '#EC4899'];

export default function ProofItWorksSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  const stories = proofItWorks.stories.filter((s) => !('isPlaceholder' in s && s.isPlaceholder));
  const activeStory = stories[selectedIndex] || stories[0];
  const activeThumbnail = getYouTubeThumbnail(activeStory.videoUrl, 'maxres');
  const activeAccent = STORY_ACCENTS[selectedIndex % STORY_ACCENTS.length];

  const handleSelectStory = (index: number) => {
    setSelectedIndex(index);
    setIsPlayingInline(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F2027 100%)',
        color: '#ffffff',
        py: { xs: 8, md: 11 },
      }}
    >
      {/* Ambient Gradient Flares */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -140,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 90, 54, 0.25) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -140,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <SectionContainer bgcolor="transparent" color="common.white" labelledBy="proof-it-works-heading">
        {/* Section Header */}
        <Stack spacing={2} sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              px: 2.5,
              py: 0.85,
              mx: 'auto',
              borderRadius: 50,
              bgcolor: alpha('#ffffff', 0.1),
              border: '1px solid',
              borderColor: alpha('#ffffff', 0.25),
              backdropFilter: 'blur(8px)',
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 18, color: '#FFD700' }} />
            <Typography variant="overline" sx={{ color: '#ffffff', letterSpacing: 1.5, fontWeight: 800 }}>
              Real Stories, Real Careers
            </Typography>
          </Box>

          <Typography
            id="proof-it-works-heading"
            variant="h2"
            component="h2"
            sx={{
              color: '#ffffff',
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
            }}
          >
            {proofItWorks.headline}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              color: alpha('#ffffff', 0.85),
              fontWeight: 400,
              fontSize: { xs: '1.05rem', sm: '1.2rem' },
              lineHeight: 1.6,
            }}
          >
            Watch how candidates with disabilities transform their potential into high-growth tech careers at leading companies.
          </Typography>
        </Stack>

        {/* Featured Video Spotlight & Story Selector Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
            gap: { xs: 4, lg: 5 },
            alignItems: 'start',
          }}
        >
          {/* Main Video Spotlight */}
          <Box
            sx={{
              minWidth: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: alpha('#0F172A', 0.8),
              backdropFilter: 'blur(16px)',
              borderRadius: '28px',
              overflow: 'hidden',
              border: '1px solid',
              borderColor: alpha(activeAccent, 0.4),
              boxShadow: `0 20px 50px -12px ${alpha(activeAccent, 0.35)}`,
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
            }}
          >
            {/* 16:9 Video Player Container */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                pt: '56.25%', // 16:9 aspect ratio
                bgcolor: '#000000',
                overflow: 'hidden',
              }}
            >
              {isPlayingInline && activeStory.videoUrl ? (
                <iframe
                  src={activeStory.videoUrl}
                  title={`${activeStory.name}'s Success Story`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                />
              ) : (
                <Box
                  onClick={() => setIsPlayingInline(true)}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    '&:hover .play-overlay-button': {
                      transform: 'translate(-50%, -50%) scale(1.1)',
                      bgcolor: activeAccent,
                    },
                  }}
                >
                  {activeThumbnail ? (
                    <Box
                      component="img"
                      src={activeThumbnail}
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.currentTarget;
                        if (target.src.includes('maxresdefault')) {
                          target.src = target.src.replace('maxresdefault', 'hqdefault');
                        }
                      }}
                      alt={`${activeStory.name} video thumbnail`}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(activeAccent, 0.2),
                      }}
                    >
                      <PersonRoundedIcon sx={{ fontSize: 64, color: activeAccent }} />
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                    }}
                  />
                  <Box
                    className="play-overlay-button"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      px: 3.5,
                      py: 1.75,
                      borderRadius: 50,
                      bgcolor: alpha(activeAccent, 0.9),
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      border: '1px solid',
                      borderColor: alpha('#ffffff', 0.4),
                      boxShadow: `0 14px 36px ${alpha(activeAccent, 0.6)}`,
                      transition: 'all 0.35s ease',
                    }}
                  >
                    <PlayArrowRoundedIcon sx={{ fontSize: 32 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '1rem', letterSpacing: 0.5 }}>
                      Watch Story Video
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Active Story Info Banner */}
            <Box sx={{ p: { xs: 3.5, sm: 4 }, flexGrow: 1, minWidth: 0 }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Chip
                    label="Featured Candidate Story"
                    size="small"
                    icon={<VolumeUpRoundedIcon sx={{ fontSize: '16px !important', color: '#ffffff !important' }} />}
                    sx={{
                      fontWeight: 800,
                      borderRadius: 2,
                      bgcolor: activeAccent,
                      color: '#ffffff',
                      px: 1,
                    }}
                  />
                  <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.7), fontWeight: 700 }}>
                    Story {selectedIndex + 1} of {stories.length}
                  </Typography>
                </Stack>

                <Typography variant="h4" component="h3" sx={{ fontWeight: 800, color: '#ffffff', lineHeight: 1.25 }}>
                  {activeStory.name}
                </Typography>

                <Typography variant="body1" sx={{ color: alpha('#ffffff', 0.85), lineHeight: 1.65, fontSize: '1.025rem' }}>
                  {activeStory.description}
                </Typography>
              </Stack>
            </Box>
          </Box>

          {/* Story Selector List */}
          <Stack spacing={2.5} sx={{ minWidth: 0, width: '100%', justifyContent: 'center' }}>
            <Typography variant="overline" sx={{ color: alpha('#ffffff', 0.7), fontWeight: 800, letterSpacing: 1.5 }}>
              Select Candidate Story to Play:
            </Typography>

            {stories.map((story, idx) => {
              const isSelected = idx === selectedIndex;
              const thumb = getYouTubeThumbnail(story.videoUrl, 'maxres');
              const accent = STORY_ACCENTS[idx % STORY_ACCENTS.length];

              return (
                <Box
                  key={story.name}
                  onClick={() => handleSelectStory(idx)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Watch ${story.name}'s story`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelectStory(idx);
                    }
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    p: { xs: 2, sm: 2.5 },
                    borderRadius: '20px',
                    bgcolor: isSelected
                      ? alpha(accent, 0.2)
                      : alpha('#ffffff', 0.05),
                    backdropFilter: 'blur(10px)',
                    border: '1.5px solid',
                    borderColor: isSelected
                      ? accent
                      : alpha('#ffffff', 0.12),
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isSelected
                      ? `0 10px 28px ${alpha(accent, 0.35)}`
                      : 'none',
                    '&:hover': {
                      borderColor: accent,
                      bgcolor: alpha(accent, 0.15),
                      transform: 'translateX(6px)',
                      '& .story-play-icon': {
                        bgcolor: accent,
                        color: '#ffffff',
                        transform: 'scale(1.15)',
                      },
                    },
                  }}
                >
                  {/* Candidate Thumbnail Preview */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: 84,
                      height: 60,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      bgcolor: '#000000',
                      flexShrink: 0,
                    }}
                  >
                    {thumb ? (
                      <Box
                        component="img"
                        src={thumb}
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const target = e.currentTarget;
                          if (target.src.includes('maxresdefault')) {
                            target.src = target.src.replace('maxresdefault', 'hqdefault');
                          }
                        }}
                        alt={`${story.name} thumbnail`}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: alpha(accent, 0.25),
                        }}
                      >
                        <PersonRoundedIcon sx={{ fontSize: 32, color: accent }} />
                      </Box>
                    )}
                    <Box
                      className="story-play-icon"
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: isSelected ? accent : alpha('#000000', 0.75),
                        color: '#ffffff',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <PlayArrowRoundedIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </Box>

                  {/* Story Text Info */}
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 800,
                          color: '#ffffff',
                          fontSize: '1.05rem',
                        }}
                      >
                        {story.name}
                      </Typography>

                      {isSelected && (
                        <Box
                          sx={{
                            px: 1.25,
                            py: 0.25,
                            borderRadius: 1,
                            bgcolor: accent,
                            color: '#ffffff',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            letterSpacing: 0.5,
                          }}
                        >
                          PLAYING
                        </Box>
                      )}
                    </Stack>

                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ color: alpha('#ffffff', 0.75), fontSize: '0.875rem', mt: 0.4 }}
                    >
                      {story.description}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* Impact Stats Banner */}
        <Box
          sx={{
            mt: { xs: 7, md: 9 },
            p: { xs: 3.5, sm: 4.5 },
            borderRadius: '28px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: { xs: 3, sm: 4 },
            }}
          >
            {proofItWorks.stats.map((stat, idx) => {
              const Icon = STAT_ICONS[idx % STAT_ICONS.length];
              const statColor = idx === 0 ? '#38BDF8' : idx === 1 ? '#FF5A36' : '#34D399';

              return (
                <Stack
                  key={stat.label}
                  direction="row"
                  spacing={2.5}
                  sx={{ alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'center' } }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 58,
                      height: 58,
                      borderRadius: '18px',
                      background: `linear-gradient(135deg, ${statColor} 0%, ${alpha(statColor, 0.7)} 100%)`,
                      color: '#ffffff',
                      flexShrink: 0,
                      boxShadow: `0 8px 20px -4px ${alpha(statColor, 0.45)}`,
                    }}
                  >
                    <Icon sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="h3" component="p" sx={{ fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: alpha('#ffffff', 0.8), fontWeight: 700, mt: 0.4, fontSize: '0.925rem' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
              );
            })}
          </Box>
        </Box>

        <Stack sx={{ alignItems: 'center', mt: 6 }}>
          <Button
            component={Link}
            to={proofItWorks.link.to}
            variant="contained"
            size="large"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 3,
              fontWeight: 800,
              bgcolor: '#FF5A36',
              color: '#ffffff',
              boxShadow: '0 10px 24px -4px rgba(255, 90, 54, 0.5)',
              '&:hover': {
                bgcolor: '#E04826',
                boxShadow: '0 16px 32px -4px rgba(255, 90, 54, 0.65)',
              },
            }}
          >
            {proofItWorks.link.label}
          </Button>
        </Stack>
      </SectionContainer>
    </Box>
  );
}



