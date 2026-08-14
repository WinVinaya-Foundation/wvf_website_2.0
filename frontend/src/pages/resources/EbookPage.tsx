import { PageHero } from '../../components';
import { ebookHero } from './ebookContent';
import { EbookListSection, FeaturedEbookSection } from '../../sections/resources/ebook';

export default function EbookPage() {
  return (
    <>
      <PageHero eyebrow={ebookHero.eyebrow} title={ebookHero.headline} subtitle={ebookHero.subheadline} />
      <FeaturedEbookSection />
      <EbookListSection />
    </>
  );
}
