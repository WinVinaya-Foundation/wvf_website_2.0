import { PageHero } from '../../components';
import { performanceReportsHero } from './performanceReportsContent';
import {
  LiveImpactDashboardSection,
  PerformanceReportsClosingCtaSection,
  RelatedReportsSection,
  WhyWePublishSection,
} from '../../sections/impact/performanceReports';

export default function PerformanceReportsPage() {
  return (
    <>
      <PageHero
        eyebrow={performanceReportsHero.eyebrow}
        title={performanceReportsHero.headline}
        subtitle={performanceReportsHero.subheadline}
      />
      <LiveImpactDashboardSection />
      <WhyWePublishSection />
      <RelatedReportsSection />
      <PerformanceReportsClosingCtaSection />
    </>
  );
}
