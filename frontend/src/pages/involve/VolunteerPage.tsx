import { PageHero } from '../../components';
import { volunteerHero } from './volunteerContent';
import {
  CorporateVolunteeringSection,
  HowItWorksSection,
  PitchIdeaSection,
  RealImpactExamplesSection,
  VolunteerClosingCtaSection,
  WaysToVolunteerSection,
  WhyVolunteerSection,
} from '../../sections/involve/volunteer';

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow={volunteerHero.eyebrow}
        title={volunteerHero.headline}
        subtitle={volunteerHero.subheadline}
      />
      <WhyVolunteerSection />
      <WaysToVolunteerSection />
      <PitchIdeaSection />
      <RealImpactExamplesSection />
      <HowItWorksSection />
      <CorporateVolunteeringSection />
      <VolunteerClosingCtaSection />
    </>
  );
}
