import { PageHero } from '../../components';
import { blogHero } from './blogContent';
import { BlogListSection, FeaturedPostSection } from '../../sections/resources/blog';

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow={blogHero.eyebrow} title={blogHero.headline} subtitle={blogHero.subheadline} />
      <FeaturedPostSection />
      <BlogListSection />
    </>
  );
}
