import { PageHero } from '../../components';
import { careersHero } from './careersContent';
import {
  CareerBenefitsSection,
  CareersClosingCtaSection,
  CareersListSection,
  HiringProcessSection,
  WhyWorkWithUsSection,
} from '../../sections/resources/careers';

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow={careersHero.eyebrow} title={careersHero.headline} subtitle={careersHero.subheadline} />
      <WhyWorkWithUsSection />
      <CareerBenefitsSection />
      <CareersListSection />
      <HiringProcessSection />
      <CareersClosingCtaSection />
    </>
  );
}
