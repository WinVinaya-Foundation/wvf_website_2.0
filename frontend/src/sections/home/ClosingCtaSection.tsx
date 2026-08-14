import { ClosingCtaBanner } from '../../components';
import { closingCtaContent } from '../../pages/home/homeContent';

export default function ClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={closingCtaContent.headline}
      body={closingCtaContent.body}
      ctas={closingCtaContent.ctas}
      headingId="closing-cta-heading"
    />
  );
}
