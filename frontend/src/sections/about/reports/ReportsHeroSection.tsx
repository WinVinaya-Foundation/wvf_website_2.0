import { PageHero } from '../../../components';
import { reportsHero } from '../../../pages/about/reportsContent';

export default function ReportsHeroSection() {
  return <PageHero title={reportsHero.headline} subtitle={reportsHero.subheadline} />;
}
