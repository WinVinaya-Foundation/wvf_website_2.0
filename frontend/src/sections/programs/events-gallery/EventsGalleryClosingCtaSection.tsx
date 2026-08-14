import { ClosingCtaBanner } from '../../../components';
import { eventsGalleryClosingCtaContent } from '../../../pages/programs/eventsGalleryContent';

export default function EventsGalleryClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={eventsGalleryClosingCtaContent.headline}
      body={eventsGalleryClosingCtaContent.body}
      ctas={eventsGalleryClosingCtaContent.ctas}
      headingId="events-gallery-closing-cta-heading"
    />
  );
}
