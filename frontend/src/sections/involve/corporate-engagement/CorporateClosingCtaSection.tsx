import { ClosingCtaBanner } from '../../../components';
import { corporateClosingCta } from '../../../pages/involve/corporateEngagementContent';

export default function CorporateClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={corporateClosingCta.headline}
      body={corporateClosingCta.body}
      ctas={corporateClosingCta.ctas}
      headingId="corporate-closing-cta-heading"
    />
  );
}
