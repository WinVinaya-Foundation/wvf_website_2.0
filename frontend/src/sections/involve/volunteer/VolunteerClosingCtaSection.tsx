import { ClosingCtaBanner } from '../../../components';
import { volunteerClosingCta } from '../../../pages/involve/volunteerContent';

export default function VolunteerClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={volunteerClosingCta.headline}
      body={volunteerClosingCta.body}
      ctas={volunteerClosingCta.ctas}
      headingId="volunteer-closing-cta-heading"
    />
  );
}
