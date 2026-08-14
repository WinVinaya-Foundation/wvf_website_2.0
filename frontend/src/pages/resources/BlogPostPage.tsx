import { useParams } from '@tanstack/react-router';
import { NotFoundPage } from '../common';
import { ArticleBodySection, ArticleHeaderSection, PrevNextNavSection } from '../../sections/resources/blog-post';
import { blogPosts, getPostBySlug } from './blogContent';

export default function BlogPostPage() {
  const { slug } = useParams({ strict: false });
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFoundPage />;
  }

  const index = blogPosts.findIndex((candidate) => candidate.slug === post.slug);
  const previousPost = blogPosts[index + 1];
  const nextPost = index > 0 ? blogPosts[index - 1] : undefined;

  return (
    <>
      <ArticleHeaderSection post={post} />
      <ArticleBodySection body={post.body} />
      <PrevNextNavSection previousPost={previousPost} nextPost={nextPost} />
    </>
  );
}
