import {
  AlignedMovementSection,
  BusinessCaseSection,
  CorporateClosingCtaSection,
  CorporateHeroSection,
  CsrComplianceSection,
  HowPartnershipWorksSection,
  ProvenResultsSection,
  ServicesSection,
  WhatWeHelpSection,
} from '../../sections/involve/corporate-engagement';

export default function CorporateEngagementPage() {
  return (
    <>
      <CorporateHeroSection />
      <BusinessCaseSection />
      <WhatWeHelpSection />
      <ServicesSection />
      <CsrComplianceSection />
      <ProvenResultsSection />
      <HowPartnershipWorksSection />
      <AlignedMovementSection />
      <CorporateClosingCtaSection />
    </>
  );
}
