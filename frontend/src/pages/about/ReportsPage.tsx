import {
  AnnualReportsSection,
  FinancialReportsSection,
  LegalDocumentsSection,
  ReportsClosingCtaSection,
  ReportsHeroSection,
  ResearchResourcesSection,
} from '../../sections/about';

export default function ReportsPage() {
  return (
    <>
      <ReportsHeroSection />
      <AnnualReportsSection />
      <FinancialReportsSection />
      <LegalDocumentsSection />
      <ResearchResourcesSection />
      <ReportsClosingCtaSection />
    </>
  );
}
