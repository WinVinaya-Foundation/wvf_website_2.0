import {
  AboutSection,
  AwardsSection,
  ClosingCtaSection,
  HeroSection,
  NewsStripSection,
  PartnersSection,
  PrimaryCtaBanner,
  ProofItWorksSection,
  SdgSection,
  TestimonialsSection,
  ValueWeBringSection,
  WhatWeDoSection,
} from '../../sections/home';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueWeBringSection />
      <SdgSection />
      <AboutSection />
      <WhatWeDoSection />
      <ProofItWorksSection />
      <PrimaryCtaBanner />
      <AwardsSection />
      <PartnersSection />
      <TestimonialsSection />
      <NewsStripSection />
      <ClosingCtaSection />
    </>
  );
}
