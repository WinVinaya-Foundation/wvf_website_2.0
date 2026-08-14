import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AddRounded from '@mui/icons-material/AddRounded';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import WorkspacePremiumRounded from '@mui/icons-material/WorkspacePremiumRounded';
import { Card, CardContent, SectionContainer, SectionHeading } from '../../../components';
import { awardGrid } from '../../../pages/about/awardsContent';
import type { TimelineIconKey } from '../../../model/content';

const ICONS: Record<TimelineIconKey, typeof EmojiEventsRounded> = {
  flag: EmojiEventsRounded,
  school: EmojiEventsRounded,
  academy: EmojiEventsRounded,
  handshake: EmojiEventsRounded,
  award: EmojiEventsRounded,
  premium: WorkspacePremiumRounded,
  trending: EmojiEventsRounded,
};

export default function AwardGridSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="award-grid-heading">
      <SectionHeading
        title="Other recognitions"
        description="More honors that reflect the trust placed in our work."
        titleId="award-grid-heading"
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
        {awardGrid.map((award) => {
          const Icon = ICONS[award.icon];
          return (
            <Card key={award.title} sx={{ height: '100%', overflow: 'hidden' }}>
              <Box sx={{ height: 4, bgcolor: 'primary.main' }} />
              <CardContent sx={{ p: 3 }}>
                <Box
                  aria-hidden="true"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                    boxShadow: (theme) => `0 0 0 6px ${alpha(theme.palette.primary.main, 0.1)}`,
                    mb: 2,
                  }}
                >
                  <Icon fontSize="medium" />
                </Box>
                <Typography variant="h6" component="p" gutterBottom>
                  {award.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {award.body}
                </Typography>
              </CardContent>
            </Card>
          );
        })}

        <Card
          sx={{
            height: '100%',
            display: 'flex',
            border: '1px dashed',
            borderColor: 'divider',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none', transform: 'none' },
          }}
        >
          <CardContent
            sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flex: 1 }}
          >
            <Box
              aria-hidden="true"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: 'grey.100',
                color: 'grey.500',
                mb: 2,
              }}
            >
              <AddRounded fontSize="medium" />
            </Box>
            <Typography variant="subtitle1" component="p" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              More recognitions coming soon
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </SectionContainer>
  );
}
