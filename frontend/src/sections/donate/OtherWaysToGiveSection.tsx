import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { SectionContainer, SectionHeading } from '../../components';
import { otherWaysToGive } from '../../pages/donate/donateContent';

export default function OtherWaysToGiveSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="other-ways-heading">
      <SectionHeading
        eyebrow={otherWaysToGive.eyebrow}
        title={otherWaysToGive.headline}
        titleId="other-ways-heading"
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3.5, mb: 4 }}>
        <Box
          sx={{
            p: { xs: 3.5, sm: 4 },
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
            boxShadow: (theme) => `0 10px 28px -10px ${alpha(theme.palette.grey[900], 0.12)}`,
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 3,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: '#ffffff',
                boxShadow: (theme) => `0 8px 20px -6px ${alpha(theme.palette.primary.main, 0.55)}`,
              }}
            >
              <AccountBalanceRoundedIcon sx={{ fontSize: 27 }} />
            </Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 800 }}>
              {otherWaysToGive.bankTransfer.title}
            </Typography>
          </Stack>

          <Stack spacing={1}>
            {otherWaysToGive.bankTransfer.details.map((detail) => (
              <Stack key={detail.label} direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                <Typography sx={{ fontWeight: 700, color: 'text.primary', minWidth: 150 }}>{detail.label}:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{detail.value}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            p: { xs: 3.5, sm: 4 },
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
            boxShadow: (theme) => `0 10px 28px -10px ${alpha(theme.palette.grey[900], 0.12)}`,
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 3,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                color: '#ffffff',
                boxShadow: (theme) => `0 8px 20px -6px ${alpha(theme.palette.secondary.main, 0.55)}`,
              }}
            >
              <DraftsRoundedIcon sx={{ fontSize: 27 }} />
            </Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 800 }}>
              {otherWaysToGive.cheque.title}
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <Typography sx={{ fontWeight: 700, color: 'text.primary', minWidth: 150 }}>Payable to:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{otherWaysToGive.cheque.payableTo}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <Typography sx={{ fontWeight: 700, color: 'text.primary', minWidth: 150 }}>Mail to:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{otherWaysToGive.cheque.mailedTo}</Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: 'flex-start',
          p: { xs: 2.5, sm: 3 },
          borderRadius: 3,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.18),
        }}
      >
        <EmailRoundedIcon sx={{ color: 'primary.dark', flexShrink: 0, mt: 0.25 }} />
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
          {otherWaysToGive.receiptNote.split(otherWaysToGive.receiptEmail).map((part, index, arr) => (
            <span key={index}>
              {part}
              {index < arr.length - 1 && (
                <Typography
                  component="a"
                  href={`mailto:${otherWaysToGive.receiptEmail}`}
                  sx={{ color: 'primary.dark', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  {otherWaysToGive.receiptEmail}
                </Typography>
              )}
            </span>
          ))}
        </Typography>
      </Stack>
    </SectionContainer>
  );
}
