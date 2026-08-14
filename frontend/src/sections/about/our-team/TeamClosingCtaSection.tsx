import { ClosingCtaBanner } from '../../../components';
import { teamClosingCta } from '../../../pages/about/ourTeamContent';

export default function TeamClosingCtaSection() {
  return (
    <ClosingCtaBanner
      headline={teamClosingCta.headline}
      body={teamClosingCta.body}
      ctas={teamClosingCta.ctas}
      headingId="team-closing-cta-heading"
    />
  );
}
