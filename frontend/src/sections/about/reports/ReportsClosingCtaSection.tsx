import { ClosingCtaBanner } from '../../../components';
import { reportsClosingCta } from '../../../pages/about/reportsContent';

export default function ReportsClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={reportsClosingCta.headline}
      body={reportsClosingCta.body}
      ctas={reportsClosingCta.ctas}
      headingId="reports-closing-cta-heading"
    />
  );
}
