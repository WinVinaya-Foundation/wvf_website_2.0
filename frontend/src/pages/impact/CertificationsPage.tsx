import { PageHero } from '../../components';
import { certificationsHero } from './certificationsContent';
import {
  CertificationsClosingCtaSection,
  CsrEligibilitySection,
  GovernmentApprovalSection,
  TaxCertificationsSection,
  TrustRegistrationSection,
  WhyThisMattersSection,
} from '../../sections/impact/certifications';

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow={certificationsHero.eyebrow}
        title={certificationsHero.headline}
        subtitle={certificationsHero.subheadline}
      />
      <TrustRegistrationSection />
      <GovernmentApprovalSection />
      <TaxCertificationsSection />
      <CsrEligibilitySection />
      <WhyThisMattersSection />
      <CertificationsClosingCtaSection />
    </>
  );
}
