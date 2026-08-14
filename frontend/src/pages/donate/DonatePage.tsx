import { useState } from 'react';
import type { DonationScheme } from '../../service/donationService';
import {
  DonateClosingCtaSection,
  DonateHeroSection,
  DonationFormSection,
  DonationTiersSection,
  OtherWaysToGiveSection,
  ProofYourMoneyWorksSection,
  TaxBenefitsSection,
  WhyItMattersSection,
} from '../../sections/donate';

export default function DonatePage() {
  const [selectedScheme, setSelectedScheme] = useState<DonationScheme>('STUDENT_ENGLISH');

  return (
    <>
      <DonateHeroSection />
      <DonationTiersSection selectedScheme={selectedScheme} onSelectScheme={setSelectedScheme} />
      <DonationFormSection selectedScheme={selectedScheme} onSelectScheme={setSelectedScheme} />
      <WhyItMattersSection />
      <ProofYourMoneyWorksSection />
      <OtherWaysToGiveSection />
      <TaxBenefitsSection />
      <DonateClosingCtaSection />
    </>
  );
}
