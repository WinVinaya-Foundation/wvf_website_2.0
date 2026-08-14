import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from '@tanstack/react-router';
import { Button, SectionContainer } from '../../components';
import { useCountUp } from '../../hooks/useCountUp';
import { proofYourMoneyWorks } from '../../pages/donate/donateContent';

function ProofStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: animated, ref } = useCountUp({ end: value });

  return (
    <Box ref={ref} sx={{ textAlign: 'center' }} aria-label={`${value.toLocaleString()}${suffix} ${label}`}>
      <Typography aria-hidden="true" variant="h3" component="p" sx={{ fontWeight: 800, color: 'primary.dark' }}>
        {animated.toLocaleString()}
        {suffix}
      </Typography>
      <Typography aria-hidden="true" variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  );
}

export default function ProofYourMoneyWorksSection() {
  return (
    <SectionContainer bgcolor={(theme) => alpha(theme.palette.secondary.main, 0.06)} labelledBy="proof-heading">
      <Stack spacing={5} sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Stack spacing={1.5} sx={{ maxWidth: 680 }}>
          <Typography variant="overline" sx={{ color: 'secondary.dark', letterSpacing: 1.2, fontWeight: 800 }}>
            {proofYourMoneyWorks.eyebrow}
          </Typography>
          <Typography id="proof-heading" variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.9rem', sm: '2.4rem' } }}>
            {proofYourMoneyWorks.headline}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: { xs: 4, sm: 5 },
            width: '100%',
            maxWidth: 760,
          }}
        >
          {proofYourMoneyWorks.stats.map((stat) => (
            <ProofStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </Box>

        <Button
          component={Link}
          to={proofYourMoneyWorks.link.to}
          variant="outlined"
          color="secondary"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{ fontWeight: 800 }}
        >
          {proofYourMoneyWorks.link.label}
        </Button>
      </Stack>
    </SectionContainer>
  );
}
