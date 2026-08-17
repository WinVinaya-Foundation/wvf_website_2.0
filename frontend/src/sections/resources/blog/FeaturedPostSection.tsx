import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Link } from '@tanstack/react-router';
import { Button, Chip, SectionContainer } from '../../../components';
import type { BlogPostItem } from '../../../store/api/blogApi';
import { getCategoryMuiColor } from '../../../pages/resources/blogContent';
import { estimateReadingTime } from '../../../utils/readingTime';
import BlogCoverArt from './BlogCoverArt';
import BlogMeta from './BlogMeta';

export interface FeaturedPostSectionProps {
  latestPost?: BlogPostItem;
}

/** Spotlights the most recently published post at the top of the blog hub */
export default function FeaturedPostSection({ latestPost }: FeaturedPostSectionProps) {
  if (!latestPost) return null;

  const color = getCategoryMuiColor(latestPost.category?.color);
  const categoryLabel = latestPost.category?.label || 'Article';
  const readingMinutes = estimateReadingTime(latestPost.body);

  return (
    <SectionContainer labelledBy="featured-post-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.1fr' },
          borderRadius: 5,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.grey[900], 0.08),
          boxShadow: (theme) => `0 20px 48px -16px ${alpha(theme.palette.grey[900], 0.16)}`,
        }}
      >
        <BlogCoverArt category={categoryLabel} color={color} coverImageUrl={latestPost.coverImageUrl} height={{ xs: 220, md: '100%' }} iconSize={72} />

        <Box sx={{ p: { xs: 3.5, sm: 5, md: 6 }, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 1 }}>
              <Chip
                icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '16px !important' }} />}
                label="Latest Article"
                size="small"
                color="primary"
                sx={{ fontWeight: 800 }}
              />
              <Chip
                label={categoryLabel}
                size="small"
                sx={{
                  fontWeight: 700,
                  bgcolor: (theme) => alpha(theme.palette[color].main, 0.12),
                  color: `${color}.dark`,
                }}
              />
            </Stack>

            <Typography
              id="featured-post-heading"
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '1.7rem', sm: '2.1rem', md: '2.35rem' },
                lineHeight: 1.25,
                color: 'text.primary',
              }}
            >
              {latestPost.title}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'text.secondary' }}>
              {latestPost.excerpt}
            </Typography>

            <BlogMeta publishedAt={latestPost.publishedAt} readingMinutes={readingMinutes} authorName={latestPost.authorName} size="medium" />

            <Box sx={{ pt: 1 }}>
              <Link to="/resources/blog/$slug" params={{ slug: latestPost.slug }} style={{ textDecoration: 'none' }}>
                <Button
                  component="span"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{ fontWeight: 800, py: 1.5, px: 3.5, borderRadius: 3 }}
                >
                  Read Article
                </Button>
              </Link>
            </Box>
          </Stack>
        </Box>
      </Box>
    </SectionContainer>
  );
}
