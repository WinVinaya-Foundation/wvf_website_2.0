import { Box, Stack, Typography } from '@mui/material';
import FormatQuoteRounded from '@mui/icons-material/FormatQuoteRounded';
import { alpha } from '@mui/material/styles';
import { Link } from '@tanstack/react-router';
import { Button, Card, CardContent, SectionContainer, SectionHeading } from '../../components';
import { testimonialsContent } from '../../pages/home/homeContent';

export default function TestimonialsSection() {
  return (
    <SectionContainer bgcolor="#F8FAFC" labelledBy="testimonials-heading">
      <SectionHeading title={testimonialsContent.headline} titleId="testimonials-heading" />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3.5 }}>
        {testimonialsContent.quotes.map((item, idx) => {
          const cardBg = idx === 0 ? '#1B365D' : '#0D9488';
          const accentColor = idx === 0 ? '#FF5A36' : '#8B5CF6';

          return (
            <Card
              key={item.name}
              component="figure"
              sx={{
                height: '100%',
                m: 0,
                borderRadius: '24px',
                bgcolor: cardBg,
                color: '#ffffff',
                border: '1px solid',
                borderColor: alpha(accentColor, 0.35),
                boxShadow: `0 14px 32px -8px ${alpha(cardBg, 0.4)}`,
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 24px 48px -8px ${alpha(cardBg, 0.55)}`,
                  '& .quote-icon': {
                    transform: 'scale(1.15) rotate(-6deg)',
                  },
                },
              }}
            >
              <CardContent sx={{ p: { xs: 3.5, sm: 4.5 } }}>
                <FormatQuoteRounded className="quote-icon" sx={{ color: accentColor, fontSize: 48, mb: 1, transition: 'transform 0.35s ease' }} />
                <Typography component="blockquote" variant="body1" sx={{ m: 0, mb: 3, color: alpha('#ffffff', 0.95), lineHeight: 1.7, fontSize: { xs: '1rem', sm: '1.08rem' } }}>
                  "{item.quote}"
                </Typography>
                <Box component="figcaption">
                  <Typography variant="subtitle1" component="p" sx={{ m: 0, fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha('#ffffff', 0.8), fontSize: '0.9rem', mt: 0.25 }}>
                    {item.title}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Stack sx={{ alignItems: 'center', mt: 5 }}>
        <Button component={Link} to={testimonialsContent.link.to} variant="outlined" color="primary" size="large">
          {testimonialsContent.link.label}
        </Button>
      </Stack>
    </SectionContainer>
  );
}
