import { Box } from '@mui/material';
import { SectionContainer, SectionHeading } from '../../../components';
import type { BlogPostItem } from '../../../store/api/blogApi';
import BlogCard from './BlogCard';

export interface BlogListSectionProps {
  posts?: BlogPostItem[];
}

/** Grid of all posts other than the featured one at the top of the page */
export default function BlogListSection({ posts = [] }: BlogListSectionProps) {
  if (posts.length === 0) return null;

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="blog-list-heading">
      <SectionHeading eyebrow="More From the Blog" title="Recent Articles" align="left" titleId="blog-list-heading" />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3.5 }}>
        {posts.map((post) => (
          <BlogCard key={post.id || post.slug} post={post} />
        ))}
      </Box>
    </SectionContainer>
  );
}
