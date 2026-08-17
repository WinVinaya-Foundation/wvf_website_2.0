import { Box, CircularProgress } from '@mui/material';
import { PageHero } from '../../components';
import { blogHero } from './blogContent';
import { BlogListSection, FeaturedPostSection } from '../../sections/resources/blog';
import { useGetPublicBlogPostsQuery } from '../../store/api/blogApi';

export default function BlogPage() {
  const { data: posts = [], isLoading } = useGetPublicBlogPostsQuery();

  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      <PageHero eyebrow={blogHero.eyebrow} title={blogHero.headline} subtitle={blogHero.subheadline} />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <FeaturedPostSection latestPost={latestPost} />
          <BlogListSection posts={otherPosts} />
        </>
      )}
    </>
  );
}
