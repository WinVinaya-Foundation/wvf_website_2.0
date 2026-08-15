import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link } from '@tanstack/react-router';
import { Chip } from '../../../components';
import type { BlogPostItem } from '../../../store/api/blogApi';
import { getCategoryMuiColor } from '../../../pages/resources/blogContent';
import { estimateReadingTime } from '../../../utils/readingTime';
import BlogCoverArt from './BlogCoverArt';
import BlogMeta from './BlogMeta';

export interface BlogCardProps {
  post: BlogPostItem;
}

/** Blog card used in the grid — cover art, category, title, excerpt, and the date/read-time/author row. */
export default function BlogCard({ post }: BlogCardProps) {
  const color = getCategoryMuiColor(post.category?.color);
  const categoryLabel = post.category?.label || 'Article';
  const readingMinutes = estimateReadingTime(post.body);
  const authorName = post.authorName;

  return (
    <Link to="/resources/blog/$slug" params={{ slug: post.slug }} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.grey[900], 0.08),
          boxShadow: (theme) => `0 8px 24px -8px ${alpha(theme.palette.grey[900], 0.08)}`,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: (theme) => `0 20px 40px -12px ${alpha(theme.palette[color].main, 0.28)}`,
            '& .blog-card-title': { color: `${color}.dark` },
          },
        }}
      >
        <Box sx={{ position: 'relative', aspectRatio: '16 / 9' }}>
          <BlogCoverArt category={categoryLabel} color={color} coverImageUrl={post.coverImageUrl} height="100%" iconSize={44} />
          <Chip
            label={categoryLabel}
            size="small"
            sx={{
              position: 'absolute',
              top: 14,
              left: 14,
              fontWeight: 800,
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.92),
              color: `${color}.dark`,
            }}
          />
        </Box>

        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography
            className="blog-card-title"
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
              fontSize: '1.1rem',
              lineHeight: 1.35,
              mb: 1.25,
              transition: 'color 0.25s ease',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.6,
              fontSize: '0.9rem',
              mb: 2.5,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </Typography>

          <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: (theme) => alpha(theme.palette.divider, 0.8) }}>
            <BlogMeta publishedAt={post.publishedAt} readingMinutes={readingMinutes} authorName={authorName} />
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
