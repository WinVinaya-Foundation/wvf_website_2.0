import { ClosingCtaBanner } from '../../components';
import { donateClosingCta } from '../../pages/donate/donateContent';

export default function DonateClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={donateClosingCta.headline}
      body={donateClosingCta.body}
      ctas={donateClosingCta.ctas}
      headingId="donate-closing-cta-heading"
    />
  );
}
