import { PageHero } from '../../../components';
import { successStoriesHero } from '../../../pages/impact/successStoriesContent';

export default function StoriesHeroSection() {
  return <PageHero title={successStoriesHero.headline} subtitle={successStoriesHero.subheadline} />;
}
