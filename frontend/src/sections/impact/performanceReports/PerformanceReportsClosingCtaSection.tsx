import { ClosingCtaBanner } from '../../../components';
import { performanceReportsClosingCta } from '../../../pages/impact/performanceReportsContent';

export default function PerformanceReportsClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={performanceReportsClosingCta.headline}
      body={performanceReportsClosingCta.body}
      ctas={performanceReportsClosingCta.ctas}
      headingId="performance-reports-closing-cta-heading"
    />
  );
}
