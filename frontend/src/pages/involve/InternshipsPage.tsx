import { PageHero } from '../../components';
import { internshipsHero } from './internshipsContent';
import {
  HowToApplySection,
  InternshipsClosingCtaSection,
  InternshipTracksSection,
  MissionGoalSection,
  RealInternOutcomesSection,
  WhatYouWillGainSection,
  WhoShouldApplySection,
  WhyInternSection,
} from '../../sections/involve/internships';

export default function InternshipsPage() {
  return (
    <>
      <PageHero
        eyebrow={internshipsHero.eyebrow}
        title={internshipsHero.headline}
        subtitle={internshipsHero.subheadline}
      />
      <WhyInternSection />
      <InternshipTracksSection />
      <WhoShouldApplySection />
      <WhatYouWillGainSection />
      <RealInternOutcomesSection />
      <MissionGoalSection />
      <HowToApplySection />
      <InternshipsClosingCtaSection />
    </>
  );
}
