import { PageHero } from '../../../components';
import { awardsHero } from '../../../pages/about/awardsContent';

export default function AwardsHeroSection() {
  return <PageHero title={awardsHero.headline} subtitle={awardsHero.subheadline} />;
}
