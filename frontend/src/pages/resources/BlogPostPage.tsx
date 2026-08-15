import { useParams } from '@tanstack/react-router';
import { Box, CircularProgress } from '@mui/material';
import { NotFoundPage } from '../common';
import { ArticleBodySection, ArticleHeaderSection, PrevNextNavSection } from '../../sections/resources/blog-post';
import { useGetPublicBlogPostBySlugQuery } from '../../store/api/blogApi';

export default function BlogPostPage() {
  const { slug } = useParams({ strict: false });
  const { data, isLoading, isError } = useGetPublicBlogPostBySlugQuery(slug || '', { skip: !slug });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data?.post) {
    return <NotFoundPage />;
  }

  const { post, previousPost, nextPost } = data;

  return (
    <>
      <ArticleHeaderSection post={post} />
      <ArticleBodySection body={post.body} />
      <PrevNextNavSection previousPost={previousPost} nextPost={nextPost} />
    </>
  );
}
