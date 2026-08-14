import { ClosingCtaBanner } from '../../../components';
import { internshipsClosingCta } from '../../../pages/involve/internshipsContent';

export default function InternshipsClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={internshipsClosingCta.headline}
      body={internshipsClosingCta.body}
      ctas={internshipsClosingCta.ctas}
      headingId="internships-closing-cta-heading"
    />
  );
}
