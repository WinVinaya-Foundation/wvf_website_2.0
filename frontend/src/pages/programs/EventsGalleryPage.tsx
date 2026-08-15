import {
  EventsGalleryHeroSection,
  UpcomingEventsSection,
  CompletedEventsSection,
  GallerySection,
  EventsGalleryClosingCtaSection,
} from '../../sections/programs/events-gallery';

export default function EventsGalleryPage() {
  return (
    <>
      <EventsGalleryHeroSection />
      <UpcomingEventsSection />
      <CompletedEventsSection />
      <GallerySection />
      <EventsGalleryClosingCtaSection />
    </>
  );
}
