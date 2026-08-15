import { PageHero } from '../../components';
import { careersHero } from './careersContent';
import {
  CareerBenefitsSection,
  CareersClosingCtaSection,
  CareersListSection,
  HiringProcessSection,
  WhyWorkWithUsSection,
} from '../../sections/resources/careers';
import { useGetPublicCareersQuery } from '../../store/api/careersApi';

export default function CareersPage() {
  const { data: jobs = [] } = useGetPublicCareersQuery();

  return (
    <>
      <PageHero eyebrow={careersHero.eyebrow} title={careersHero.headline} subtitle={careersHero.subheadline} />
      <WhyWorkWithUsSection />
      <CareerBenefitsSection />
      <CareersListSection jobs={jobs} />
      <HiringProcessSection />
      <CareersClosingCtaSection />
    </>
  );
}
