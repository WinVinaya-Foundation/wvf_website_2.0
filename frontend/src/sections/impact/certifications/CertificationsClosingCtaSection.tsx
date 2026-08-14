import { ClosingCtaBanner } from '../../../components';
import { certificationsClosingCta } from '../../../pages/impact/certificationsContent';

export default function CertificationsClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={certificationsClosingCta.headline}
      body={certificationsClosingCta.body}
      ctas={certificationsClosingCta.ctas}
      headingId="certifications-closing-cta-heading"
    />
  );
}
