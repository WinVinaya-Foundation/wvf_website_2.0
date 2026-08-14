import {
  EventsGalleryHeroSection,
  UpcomingEventsSection,
  GallerySection,
  EventsGalleryClosingCtaSection,
} from '../../sections/programs/events-gallery';

export default function EventsGalleryPage() {
  return (
    <>
      <EventsGalleryHeroSection />
      <UpcomingEventsSection />
      <GallerySection />
      <EventsGalleryClosingCtaSection />
    </>
  );
}
