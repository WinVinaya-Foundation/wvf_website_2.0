import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import HistoryToggleOffRoundedIcon from '@mui/icons-material/HistoryToggleOffRounded';
import { Button, Card, CardContent, Chip, SectionContainer, SectionHeading } from '../../../components';
import { completedEventsContent } from '../../../pages/programs/eventsGalleryContent';
import { useGetPublicEventsQuery } from '../../../store/api/eventsApi';
import { getCategoryMeta } from './categoryVisuals';

export default function CompletedEventsSection() {
  const { data: events = [], isFetching } = useGetPublicEventsQuery({ status: 'COMPLETED' });

  return (
    <SectionContainer id="completed-events" bgcolor="background.paper" labelledBy="completed-events-heading">
      <SectionHeading
        eyebrow={completedEventsContent.eyebrow}
        title={completedEventsContent.title}
        description={completedEventsContent.description}
        titleId="completed-events-heading"
      />

      {isFetching ? (
        <Stack sx={{ alignItems: 'center', py: 6 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : events.length === 0 ? (
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <HistoryToggleOffRoundedIcon sx={{ fontSize: 36, opacity: 0.5 }} />
          <Typography variant="body1">No completed events to show yet.</Typography>
        </Stack>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
          {events.map((event) => {
            const meta = getCategoryMeta(event.category);
            const Icon = meta.Icon;

            return (
              <Card key={event.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Box sx={{ height: 4, bgcolor: `${meta.color}.main` }} />
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                    <Box
                      aria-hidden="true"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        borderRadius: '50%',
                        bgcolor: `${meta.color}.light`,
                        color: `${meta.color}.dark`,
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    <Chip
                      label={meta.label}
                      size="small"
                      color={meta.color}
                      sx={{ fontWeight: 700, color: `${meta.color}.contrastText` }}
                    />
                  </Stack>

                  <Typography variant="h6" component="p" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {event.title}
                  </Typography>

                  <Stack spacing={0.75} sx={{ mb: 1.5 }}>
                    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                      <CalendarMonthRoundedIcon fontSize="small" aria-hidden="true" sx={{ color: `${meta.color}.dark` }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {event.dateLabel}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                      <PlaceRoundedIcon fontSize="small" aria-hidden="true" sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {event.location}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1 }}>
                    {event.description}
                  </Typography>

                  {event.ctaLabel && event.ctaLink && (
                    <Button
                      component={Link}
                      to={event.ctaLink}
                      variant="outlined"
                      color={meta.color}
                      endIcon={<ArrowForwardRoundedIcon />}
                      sx={{ mt: 2.5, alignSelf: 'flex-start', fontWeight: 700 }}
                    >
                      {event.ctaLabel}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </SectionContainer>
  );
}
