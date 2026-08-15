import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { SectionContainer } from '../../../components';
import type { BlogPostItem } from '../../../store/api/blogApi';
import { getCategoryMuiColor } from '../../../pages/resources/blogContent';
import BlogCoverArt from '../blog/BlogCoverArt';

export interface PrevNextNavSectionProps {
  previousPost?: BlogPostItem;
  nextPost?: BlogPostItem;
}

function NavTile({ post, direction }: { post: BlogPostItem; direction: 'previous' | 'next' }) {
  const isNext = direction === 'next';
  const color = getCategoryMuiColor(post.category?.color);
  const categoryLabel = post.category?.label || 'Article';

  return (
    <Link to="/resources/blog/$slug" params={{ slug: post.slug }} style={{ textDecoration: 'none', display: 'block' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isNext ? 'row' : 'row-reverse',
          alignItems: 'center',
          gap: 2,
          p: 2,
          borderRadius: 4,
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.grey[900], 0.1),
          bgcolor: 'background.paper',
          transition: 'all 0.25s ease',
          textAlign: isNext ? 'left' : 'right',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: (theme) => `0 12px 28px -12px ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        }}
      >
        <Box sx={{ flexShrink: 0, width: 84, height: 64, borderRadius: 3, overflow: 'hidden' }}>
          <BlogCoverArt category={categoryLabel} color={color} coverImageUrl={post.coverImageUrl} height="100%" iconSize={26} />
        </Box>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Stack direction={isNext ? 'row' : 'row-reverse'} spacing={0.5} sx={{ alignItems: 'center', mb: 0.5 }}>
            {isNext ? <ArrowForwardRoundedIcon sx={{ fontSize: 14, color: 'primary.main' }} /> : <ArrowBackRoundedIcon sx={{ fontSize: 14, color: 'primary.main' }} />}
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: 0.6, color: 'primary.dark', textTransform: 'uppercase' }}>
              {isNext ? 'Next Article' : 'Previous Article'}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              fontSize: '0.95rem',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.title}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

/** Previous / next article navigation at the bottom of the post — either tile is omitted when
 * there's no adjacent post (first/last in the list) rather than showing a disabled state. */
export default function PrevNextNavSection({ previousPost, nextPost }: PrevNextNavSectionProps) {
  if (!previousPost && !nextPost) return null;

  return (
    <SectionContainer bgcolor="background.paper">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
        }}
      >
        {previousPost ? <NavTile post={previousPost} direction="previous" /> : <Box />}
        {nextPost ? <NavTile post={nextPost} direction="next" /> : <Box />}
      </Box>
    </SectionContainer>
  );
}
