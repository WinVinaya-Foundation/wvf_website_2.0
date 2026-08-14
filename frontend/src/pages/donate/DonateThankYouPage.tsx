import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link, useParams } from '@tanstack/react-router';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { Button, DataTable, LoadingSpinner, SectionContainer, StatusPage } from '../../components';
import { getDonationReceipt, type DonationReceipt } from '../../service/donationService';

const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

function formatAmount(amountPaise: number): string {
  return currencyFormatter.format(amountPaise / 100);
}

function formatDate(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

/** Adds a noindex tag for the lifetime of this page — the receipt URL is unauthenticated and
 * permanent, so it shouldn't be crawlable even though it's reachable without a password. */
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
}

export default function DonateThankYouPage() {
  useNoIndex();
  const { reference } = useParams({ strict: false });
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-found'>('loading');

  useEffect(() => {
    if (!reference) {
      setStatus('not-found');
      return;
    }
    setStatus('loading');
    getDonationReceipt(reference)
      .then((data) => {
        setReceipt(data);
        setStatus('ready');
      })
      .catch(() => setStatus('not-found'));
  }, [reference]);

  if (status === 'loading') {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </Box>
    );
  }

  if (status === 'not-found' || !receipt) {
    return (
      <StatusPage
        icon={<SearchOffRoundedIcon fontSize="inherit" />}
        eyebrow="Not found"
        title="We couldn't find that donation"
        description="This link may be incorrect or the donation record is no longer available."
        action={
          <Button component={Link} to="/donate" variant="contained" color="primary">
            Back to Donate
          </Button>
        }
      />
    );
  }

  if (receipt.status !== 'PAID') {
    const isCancelled = receipt.status === 'CANCELLED';
    return (
      <StatusPage
        icon={<ErrorRoundedIcon fontSize="inherit" />}
        eyebrow={isCancelled ? 'Payment cancelled' : 'Payment not completed'}
        title={isCancelled ? "You didn't complete your donation" : 'We could not confirm this payment'}
        description={
          isCancelled
            ? 'No amount was charged. You can try again whenever you’re ready.'
            : 'If an amount was deducted from your account, it will be automatically refunded by your bank within a few business days. Please try again or contact us if you need help.'
        }
        action={
          <Button component={Link} to="/donate" variant="contained" color="primary">
            Try Again
          </Button>
        }
      />
    );
  }

  const rows = [
    { label: 'Reference No', value: receipt.reference },
    { label: 'Donation Scheme', value: receipt.schemeLabel },
    { label: 'Amount', value: formatAmount(receipt.amountPaise) },
    { label: 'Payment ID', value: receipt.razorpayPaymentId ?? '—' },
    { label: 'Payment Method', value: receipt.paymentMethod ?? '—' },
    ...(receipt.vpa ? [{ label: 'VPA', value: receipt.vpa }] : []),
    { label: 'Name', value: receipt.donorName },
    { label: 'Email', value: receipt.donorEmail },
    { label: 'Mobile', value: receipt.donorMobile },
    { label: 'PAN', value: receipt.donorPanMasked },
    {
      label: 'Address',
      value: [receipt.addressLine1, receipt.addressLine2, receipt.city, receipt.state, receipt.pincode].filter(Boolean).join(', '),
    },
    { label: 'Date', value: formatDate(receipt.razorpayCreatedAt) },
  ];

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="donate-thankyou-heading">
      <Stack spacing={3} sx={{ maxWidth: 760, mx: 'auto' }}>
        <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.14),
              color: 'secondary.dark',
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: 46 }} />
          </Box>
          <Typography id="donate-thankyou-heading" variant="h3" component="h1" sx={{ fontWeight: 800 }}>
            Thank you for your donation!
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 520 }}>
            Your generosity funds real training and real jobs. A receipt for your records is below — we've also noted it
            for your 80G tax exemption.
          </Typography>
        </Stack>

        <DataTable
          columns={[
            { key: 'label', header: 'Field', render: (row) => <Typography sx={{ fontWeight: 700 }}>{row.label}</Typography>, width: 200 },
            { key: 'value', header: 'Details', render: (row) => row.value },
          ]}
          rows={rows}
          getRowKey={(row) => row.label}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', pt: 1 }}>
          <Button component={Link} to="/" variant="contained" color="primary" sx={{ fontWeight: 700 }}>
            Back to Home
          </Button>
          <Button component={Link} to="/impact/performance-reports" variant="outlined" color="primary" sx={{ fontWeight: 700 }}>
            See Our Impact
          </Button>
        </Stack>
      </Stack>
    </SectionContainer>
  );
}
