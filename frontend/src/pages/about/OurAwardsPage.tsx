import {
  AwardGridSection,
  AwardsClosingCtaSection,
  AwardsHeroSection,
  FeaturedAwardSection,
  GovRecognitionSection,
  RecognitionMeaningSection,
} from '../../sections/about';

export default function OurAwardsPage() {
  return (
    <>
      <AwardsHeroSection />
      <FeaturedAwardSection />
      <AwardGridSection />
      <GovRecognitionSection />
      <RecognitionMeaningSection />
      <AwardsClosingCtaSection />
    </>
  );
}
