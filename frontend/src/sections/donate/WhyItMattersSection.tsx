import { Stack, Typography } from '@mui/material';
import { SectionContainer } from '../../components';
import { whyItMatters } from '../../pages/donate/donateContent';

export default function WhyItMattersSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="why-it-matters-heading">
      <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 780, mx: 'auto' }}>
        <Typography
          id="why-it-matters-heading"
          variant="h2"
          sx={{ fontWeight: 800, fontSize: { xs: '1.9rem', sm: '2.4rem' }, color: 'text.primary' }}
        >
          {whyItMatters.headline}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1.05rem', sm: '1.15rem' }, lineHeight: 1.75 }}>
          {whyItMatters.body}
        </Typography>
      </Stack>
    </SectionContainer>
  );
}
