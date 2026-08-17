import { PageHero } from '../../components';
import { ebookHero } from './ebookContent';
import { EbookListSection, FeaturedEbookSection } from '../../sections/resources/ebook';
import { useGetPublicEbooksQuery } from '../../store/api/ebookApi';

export default function EbookPage() {
  const { data: ebooks = [] } = useGetPublicEbooksQuery();
  const latestEbook = ebooks[0];
  const otherEbooks = ebooks.slice(1);

  return (
    <>
      <PageHero eyebrow={ebookHero.eyebrow} title={ebookHero.headline} subtitle={ebookHero.subheadline} />
      <FeaturedEbookSection latestEbook={latestEbook} />
      <EbookListSection ebooks={otherEbooks} />
    </>
  );
}
