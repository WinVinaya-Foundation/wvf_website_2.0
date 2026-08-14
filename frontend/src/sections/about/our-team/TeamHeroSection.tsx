import { PageHero } from '../../../components';
import { teamHero } from '../../../pages/about/ourTeamContent';

export default function TeamHeroSection() {
  return <PageHero title={teamHero.headline} subtitle={teamHero.subheadline} />;
}
