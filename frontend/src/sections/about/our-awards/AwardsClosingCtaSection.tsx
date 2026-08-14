import { ClosingCtaBanner } from '../../../components';
import { awardsClosingCta } from '../../../pages/about/awardsContent';

export default function AwardsClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={awardsClosingCta.headline}
      body={awardsClosingCta.body}
      ctas={awardsClosingCta.ctas}
      headingId="awards-closing-cta-heading"
    />
  );
}
