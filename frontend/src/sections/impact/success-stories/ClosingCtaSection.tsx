import { ClosingCtaBanner } from '../../../components';
import { successStoriesClosingCta } from '../../../pages/impact/successStoriesContent';

export default function ClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={successStoriesClosingCta.headline}
      body={successStoriesClosingCta.body}
      ctas={successStoriesClosingCta.ctas}
      headingId="success-stories-closing-cta-heading"
    />
  );
}
