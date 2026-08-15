import { useState, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import {
  candidateVoices,
  corporatePartnerVoices,
  institutionalPartnerVoices,
  voiceFilters,
  type VoiceCategory,
  type CandidateVoice,
  type PartnerVoice,
} from '../../../pages/impact/testimonialsContent';
import { useGetPublicTestimonialsQuery } from '../../../store/api/testimonialsApi';
import CandidateVoiceCard from './CandidateVoiceCard';
import PartnerVoiceCard from './PartnerVoiceCard';
import { accentForIndex } from './voiceAccents';

type FilterKey = VoiceCategory | 'all';

const filterIcons: Record<FilterKey, React.ReactNode> = {
  all: <FormatQuoteRoundedIcon sx={{ fontSize: 18 }} />,
  candidate: <RecordVoiceOverRoundedIcon sx={{ fontSize: 18 }} />,
  corporate: <BusinessCenterRoundedIcon sx={{ fontSize: 18 }} />,
  institutional: <SchoolRoundedIcon sx={{ fontSize: 18 }} />,
};

/** Filterable testimonials section with modern glass segmented filter bar and responsive masonry layouts */
export default function VoicesSection() {
  const { data: dbTestimonials = [] } = useGetPublicTestimonialsQuery();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const candidatesList: CandidateVoice[] = useMemo(() => {
    const dbCandidates = dbTestimonials
      .filter((t) => t.category === 'CANDIDATE')
      .map((t) => ({ quote: t.quote.replace(/<[^>]*>/g, ''), name: t.name, role: t.role, disability: t.disability || undefined }));
    return dbCandidates.length > 0 ? dbCandidates : candidateVoices;
  }, [dbTestimonials]);

  const corporateList: PartnerVoice[] = useMemo(() => {
    const dbCorporate = dbTestimonials
      .filter((t) => t.category === 'CORPORATE')
      .map((t) => ({ quote: t.quote.replace(/<[^>]*>/g, ''), name: t.name, title: t.role }));
    return dbCorporate.length > 0 ? dbCorporate : corporatePartnerVoices;
  }, [dbTestimonials]);

  const institutionalList: PartnerVoice[] = useMemo(() => {
    const dbInst = dbTestimonials
      .filter((t) => t.category === 'INSTITUTIONAL')
      .map((t) => ({ quote: t.quote.replace(/<[^>]*>/g, ''), name: t.name, title: t.role }));
    return dbInst.length > 0 ? dbInst : institutionalPartnerVoices;
  }, [dbTestimonials]);

  const filterCounts: Record<FilterKey, number> = {
    all: candidatesList.length + corporateList.length + institutionalList.length,
    candidate: candidatesList.length,
    corporate: corporateList.length,
    institutional: institutionalList.length,
  };

  const showCandidates = activeFilter === 'all' || activeFilter === 'candidate';
  const showCorporate = activeFilter === 'all' || activeFilter === 'corporate';
  const showInstitutional = activeFilter === 'all' || activeFilter === 'institutional';

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="voices-heading">
      <SectionHeading
        eyebrow="In Their Words"
        title="What people are saying"
        description="Filter by who's speaking, or read every voice below."
        align="center"
        titleId="voices-heading"
      />

      {/* Modern Segmented Filter Navigation Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: { xs: 6, md: 8 },
        }}
      >
        <Stack
          direction="row"
          role="group"
          aria-label="Filter testimonials by voice category"
          sx={{
            flexWrap: 'wrap',
            gap: 1,
            p: 1,
            borderRadius: 5,
            bgcolor: (theme) => alpha(theme.palette.grey[200], 0.6),
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.divider, 0.8),
            justifyContent: 'center',
          }}
        >
          {voiceFilters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <Box
                key={filter.key}
                component="button"
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                aria-pressed={isActive}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1,
                  px: 2.25,
                  borderRadius: 4,
                  border: 0,
                  bgcolor: isActive ? 'background.paper' : 'transparent',
                  color: isActive ? 'primary.dark' : 'text.secondary',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: isActive ? (theme) => `0 4px 14px ${alpha(theme.palette.grey[900], 0.1)}` : 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    color: isActive ? 'primary.dark' : 'text.primary',
                    bgcolor: isActive ? 'background.paper' : (theme) => alpha(theme.palette.background.paper, 0.6),
                  },
                  '&:focus-visible': {
                    outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isActive ? 'primary.main' : 'inherit',
                  }}
                >
                  {filterIcons[filter.key]}
                </Box>
                <span>{filter.label}</span>
                <Box
                  component="span"
                  sx={{
                    px: 0.85,
                    py: 0.15,
                    borderRadius: 3,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    bgcolor: isActive ? (theme) => alpha(theme.palette.primary.main, 0.14) : (theme) => alpha(theme.palette.grey[400], 0.2),
                    color: isActive ? 'primary.dark' : 'text.secondary',
                  }}
                >
                  {filterCounts[filter.key]}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>

      <Stack spacing={{ xs: 7, md: 9 }}>
        {showCandidates && (
          <Box component="section" aria-labelledby="candidate-voices-heading">
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3.5 }}>
              <Box
                sx={{
                  width: 6,
                  height: 28,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                }}
              />
              <Typography
                id="candidate-voices-heading"
                variant="h4"
                component="h3"
                sx={{ fontWeight: 900, fontSize: { xs: '1.5rem', md: '1.85rem' }, color: 'text.primary' }}
              >
                Candidate Voices
              </Typography>
            </Stack>

            <Box sx={{ columnCount: { xs: 1, sm: 2, lg: 3 }, columnGap: { xs: 0, sm: '28px' } }}>
              {candidatesList.map((voice, index) => (
                <CandidateVoiceCard key={voice.name + index} voice={voice} accent={accentForIndex(index)} />
              ))}
            </Box>
          </Box>
        )}

        {showCorporate && (
          <Box component="section" aria-labelledby="corporate-voices-heading">
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3.5 }}>
              <Box
                sx={{
                  width: 6,
                  height: 28,
                  borderRadius: 2,
                  bgcolor: 'secondary.main',
                }}
              />
              <Typography
                id="corporate-voices-heading"
                variant="h4"
                component="h3"
                sx={{ fontWeight: 900, fontSize: { xs: '1.5rem', md: '1.85rem' }, color: 'text.primary' }}
              >
                Corporate Partner Voices
              </Typography>
            </Stack>

            <Stack spacing={3.5}>
              {corporateList.map((voice, index) => (
                <PartnerVoiceCard
                  key={voice.name + index}
                  voice={voice}
                  icon={<BusinessCenterRoundedIcon />}
                  accent={accentForIndex(index)}
                />
              ))}
            </Stack>
          </Box>
        )}

        {showInstitutional && (
          <Box component="section" aria-labelledby="institutional-voices-heading">
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3.5 }}>
              <Box
                sx={{
                  width: 6,
                  height: 28,
                  borderRadius: 2,
                  bgcolor: 'info.main',
                }}
              />
              <Typography
                id="institutional-voices-heading"
                variant="h4"
                component="h3"
                sx={{ fontWeight: 900, fontSize: { xs: '1.5rem', md: '1.85rem' }, color: 'text.primary' }}
              >
                Institutional &amp; Training Partner Voices
              </Typography>
            </Stack>

            <Stack spacing={3.5}>
              {institutionalList.map((voice, index) => (
                <PartnerVoiceCard key={voice.name + index} voice={voice} icon={<SchoolRoundedIcon />} accent={accentForIndex(index)} />
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </SectionContainer>
  );
}

