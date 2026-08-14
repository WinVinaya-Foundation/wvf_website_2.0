import { ClosingCtaBanner } from '../../../components';
import { storyClosingCta } from '../../../pages/about/ourStoryContent';

export default function ClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={storyClosingCta.headline}
      body={storyClosingCta.body}
      ctas={storyClosingCta.ctas}
      headingId="story-closing-cta-heading"
    />
  );
}
