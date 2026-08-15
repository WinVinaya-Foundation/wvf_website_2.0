import { Box, Breadcrumbs, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Link } from '@tanstack/react-router';
import { Chip, SectionContainer } from '../../../components';
import type { BlogPostItem } from '../../../store/api/blogApi';
import { getCategoryMuiColor } from '../../../pages/resources/blogContent';
import { estimateReadingTime } from '../../../utils/readingTime';
import BlogCoverArt from '../blog/BlogCoverArt';
import BlogMeta from '../blog/BlogMeta';

export interface ArticleHeaderSectionProps {
  post: BlogPostItem;
}

/** Breadcrumb, category, title, meta row, and cover banner at the top of the article page */
export default function ArticleHeaderSection({ post }: ArticleHeaderSectionProps) {
  const color = getCategoryMuiColor(post.category?.color);
  const categoryLabel = post.category?.label || 'Article';
  const readingMinutes = estimateReadingTime(post.body);
  const authorName = post.authorName;

  return (
    <SectionContainer labelledBy="article-title">
      <Stack spacing={3.5}>
        <Breadcrumbs separator={<NavigateNextRoundedIcon sx={{ fontSize: 16 }} />} aria-label="Breadcrumb">
          <Typography component={Link} to="/" sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.dark' } }}>
            Home
          </Typography>
          <Typography component={Link} to="/resources/blog" sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.dark' } }}>
            Blog
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary', maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {post.title}
          </Typography>
        </Breadcrumbs>

        <Stack spacing={2.25} sx={{ maxWidth: 820 }}>
          <Chip
            label={categoryLabel}
            size="small"
            sx={{
              alignSelf: 'flex-start',
              fontWeight: 700,
              bgcolor: (theme) => alpha(theme.palette[color].main, 0.12),
              color: `${color}.dark`,
            }}
          />

          <Typography
            id="article-title"
            variant="h1"
            sx={{ fontWeight: 900, fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' }, lineHeight: 1.18, color: 'text.primary' }}
          >
            {post.title}
          </Typography>

          <BlogMeta publishedAt={post.publishedAt} readingMinutes={readingMinutes} authorName={authorName} size="medium" />
        </Stack>

        <Box sx={{ borderRadius: 5, overflow: 'hidden', boxShadow: (theme) => `0 20px 48px -16px ${alpha(theme.palette.grey[900], 0.2)}` }}>
          <BlogCoverArt category={categoryLabel} color={color} coverImageUrl={post.bannerImageUrl || post.coverImageUrl} height={{ xs: 220, sm: 320, md: 420 }} iconSize={100} />
        </Box>
      </Stack>
    </SectionContainer>
  );
}
