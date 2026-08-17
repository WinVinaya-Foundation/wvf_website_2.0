import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { SectionContainer } from '../../../components';
import type { BlogContentBlock } from '../../../store/api/blogApi';
import { sanitizeHtmlContent } from '../../../utils/security';

export interface ArticleBodySectionProps {
  body: BlogContentBlock[];
}

/** Renders rich article content — paragraphs, headings, quotes, and lists — with generous,
 * readable long-form typography (a constrained line length and open line-height throughout). */
export default function ArticleBodySection({ body }: ArticleBodySectionProps) {
  return (
    <SectionContainer>
      <Box sx={{ maxWidth: 760, mx: { md: 'auto' } }}>
        {body.map((block, index) => {
          const key = `${block.type}-${index}`;

          if (block.type === 'heading') {
            return (
              <Typography
                key={key}
                variant="h4"
                component="h2"
                sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.4rem', sm: '1.6rem' }, mt: index === 0 ? 0 : 5, mb: 2 }}
              >
                {sanitizeHtmlContent(block.text || '')}
              </Typography>
            );
          }

          if (block.type === 'quote') {
            return (
              <Box
                key={key}
                component="blockquote"
                sx={{
                  m: 0,
                  my: 4,
                  py: 2.5,
                  px: 3.5,
                  borderRadius: 3,
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                  position: 'relative',
                }}
              >
                <FormatQuoteRoundedIcon sx={{ fontSize: 30, color: (theme) => alpha(theme.palette.primary.main, 0.4), mb: 0.5 }} />
                <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.7, fontWeight: 600, fontStyle: 'italic', color: 'text.primary' }}>
                  {sanitizeHtmlContent(block.text || '')}
                </Typography>
                {block.attribution && (
                  <Typography sx={{ mt: 1.5, fontSize: '0.9rem', fontWeight: 700, color: 'primary.dark' }}>
                    — {sanitizeHtmlContent(block.attribution)}
                  </Typography>
                )}
              </Box>
            );
          }

          if (block.type === 'bulletList' && Array.isArray(block.items)) {
            return (
              <Box key={key} component="ul" sx={{ m: 0, my: 3, pl: 0, listStyle: 'none' }}>
                {block.items.map((item, idx) => (
                  <Box
                    key={`${item}-${idx}`}
                    component="li"
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5, '&:last-of-type': { mb: 0 } }}
                  >
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        mt: '0.55em',
                      }}
                    />
                    <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'text.secondary' }}>
                      {sanitizeHtmlContent(item)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            );
          }

          if (block.type === 'orderedList' && Array.isArray(block.items)) {
            return (
              <Box key={key} component="ol" sx={{ m: 0, my: 3, pl: 0, listStyle: 'none', counterReset: 'blog-ordered-list' }}>
                {block.items.map((item, idx) => (
                  <Box
                    key={`${item}-${idx}`}
                    component="li"
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      mb: 1.5,
                      counterIncrement: 'blog-ordered-list',
                      '&:last-of-type': { mb: 0 },
                      '&::before': {
                        content: 'counter(blog-ordered-list)',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
                        color: 'primary.dark',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'text.secondary', pt: '1px' }}>
                      {sanitizeHtmlContent(item)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            );
          }

          return (
            <Typography key={key} sx={{ fontSize: '1.08rem', lineHeight: 1.85, color: 'text.primary', mb: 2.75 }}>
              {sanitizeHtmlContent(block.text || '')}
            </Typography>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
