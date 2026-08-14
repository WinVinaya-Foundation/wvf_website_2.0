import { ClosingCtaBanner } from '../../../components';
import { signLanguageClosingCta } from '../../../pages/involve/signLanguageContent';

export default function SignLanguageClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={signLanguageClosingCta.headline}
      body={signLanguageClosingCta.body}
      ctas={signLanguageClosingCta.ctas}
      headingId="sign-language-closing-cta-heading"
    />
  );
}
