import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link } from '@tanstack/react-router';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import { Button, Card, CardContent, Chip, SectionContainer, SectionHeading } from '../../../components';
import { upcomingEventsContent } from '../../../pages/programs/eventsGalleryContent';
import { useGetPublicEventsQuery } from '../../../store/api/eventsApi';
import { getCategoryMeta } from './categoryVisuals';

export default function UpcomingEventsSection() {
  const { data: events = [], isFetching } = useGetPublicEventsQuery({ status: 'UPCOMING' });

  return (
    <SectionContainer id="upcoming-events" bgcolor="background.default" labelledBy="upcoming-events-heading">
      <SectionHeading
        eyebrow={upcomingEventsContent.eyebrow}
        title={upcomingEventsContent.title}
        description={upcomingEventsContent.description}
        titleId="upcoming-events-heading"
      />

      {isFetching ? (
        <Stack sx={{ alignItems: 'center', py: 6 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : events.length === 0 ? (
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <EventBusyRoundedIcon sx={{ fontSize: 36, opacity: 0.5 }} />
          <Typography variant="body1">No upcoming events right now — check back soon.</Typography>
        </Stack>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
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

                  <Typography variant="h6" component="p" sx={{ fontWeight: 700, mb: 1.5, minHeight: { sm: 56 }, display: 'flex', alignItems: 'flex-start' }}>
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

                  <Box sx={{ minHeight: 24, mb: 1.5 }}>
                    {event.isDateTBA && (
                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontStyle: 'italic' }}>
                        Exact date shared closer to the event — reach out to be notified.
                      </Typography>
                    )}
                  </Box>

                  <Box
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      flexGrow: 1,
                      '& p': { m: 0, mb: 1 },
                      '& p:last-child': { mb: 0 },
                      '& ul, & ol': { pl: 2.5, m: 0, mb: 1 },
                      '& li': { mb: 0.5 },
                      '& a': { color: 'primary.main', textDecoration: 'underline' },
                      '& strong': { color: 'text.primary', fontWeight: 600 },
                    }}
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />

                  {event.ctaLabel && event.ctaLink ? (
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
                  ) : (
                    <Box sx={{ mt: 'auto' }} />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      <Box
        sx={{
          mt: 4,
          p: { xs: 3, sm: 3.5 },
          borderRadius: 4,
          border: '1px dashed',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2.5,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box
            aria-hidden="true"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              flexShrink: 0,
              borderRadius: '50%',
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              color: 'text.secondary',
            }}
          >
            <AddCircleRoundedIcon />
          </Box>
          <Box>
            <Typography variant="subtitle1" component="p" sx={{ fontWeight: 700 }}>
              {upcomingEventsContent.suggestEvent.headline}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {upcomingEventsContent.suggestEvent.body}
            </Typography>
          </Box>
        </Stack>
        <Button
          component={Link}
          to={upcomingEventsContent.suggestEvent.cta.to}
          variant="text"
          color="primary"
          sx={{ fontWeight: 700, flexShrink: 0 }}
        >
          {upcomingEventsContent.suggestEvent.cta.label} →
        </Button>
      </Box>
    </SectionContainer>
  );
}
