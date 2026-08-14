import { PageHero } from '../../components';
import { newsletterHero } from './newsletterContent';
import { FeaturedNewsletterSection, NewsletterListSection } from '../../sections/resources/newsletter';

export default function NewsletterPage() {
  return (
    <>
      <PageHero eyebrow={newsletterHero.eyebrow} title={newsletterHero.headline} subtitle={newsletterHero.subheadline} />
      <FeaturedNewsletterSection />
      <NewsletterListSection />
    </>
  );
}
