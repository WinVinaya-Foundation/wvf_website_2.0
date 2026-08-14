import { ClosingCtaBanner } from '../../../components';
import { voicesClosingCta } from '../../../pages/impact/testimonialsContent';

export default function TestimonialsClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={voicesClosingCta.headline}
      body={voicesClosingCta.body}
      ctas={voicesClosingCta.ctas}
      headingId="testimonials-closing-cta-heading"
    />
  );
}
