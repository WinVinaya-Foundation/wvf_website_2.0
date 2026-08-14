import {
  LearningJourneySection,
  LearnSignLanguageIntroSection,
  PathSelectorSection,
  SensitizationImpactSection,
  SensitizationOfferingsSection,
  SignLanguageClosingCtaSection,
  SignLanguageHeroSection,
  StartWithBasicsSection,
  VideoLessonsSection,
  WhySensitizationSection,
} from '../../sections/involve/sign-language';

export default function SignLanguagePage() {
  return (
    <>
      <SignLanguageHeroSection />
      <PathSelectorSection />
      <WhySensitizationSection />
      <SensitizationOfferingsSection />
      <SensitizationImpactSection />
      <LearnSignLanguageIntroSection />
      <StartWithBasicsSection />
      <VideoLessonsSection />
      <LearningJourneySection />
      <SignLanguageClosingCtaSection />
    </>
  );
}
