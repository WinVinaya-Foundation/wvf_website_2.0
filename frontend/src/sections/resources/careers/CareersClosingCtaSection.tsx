import { ClosingCtaBanner } from '../../../components';
import { careersClosingCta } from '../../../pages/resources/careersContent';

export default function CareersClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={careersClosingCta.headline}
      body={careersClosingCta.body}
      ctas={careersClosingCta.ctas}
      headingId="careers-closing-cta-heading"
    />
  );
}
