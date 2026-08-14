import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, MenuItem, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useNavigate } from '@tanstack/react-router';
import { Button, SectionContainer, SectionHeading, TextField } from '../../components';
import { useRazorpayCheckout } from '../../hooks/useRazorpayCheckout';
import { donationTiers, indianStates } from '../../pages/donate/donateContent';
import {
  cancelDonationOrder,
  createDonationOrder,
  verifyDonationPayment,
  type DonationScheme,
} from '../../service/donationService';

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const mobileRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^\d{6}$/;

const donationFormSchema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your full name'),
    email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
    pan: z
      .string()
      .trim()
      .toUpperCase()
      .regex(panRegex, 'Enter a valid PAN (e.g. ABCDE1234F)'),
    mobile: z.string().trim().regex(mobileRegex, 'Enter a valid 10-digit mobile number'),
    phone: z.string().trim().regex(mobileRegex, 'Enter a valid 10-digit phone number').optional().or(z.literal('')),
    scheme: z.custom<DonationScheme>((value) => typeof value === 'string' && value.length > 0, 'Select a donation scheme'),
    amount: z.union([z.string(), z.number()]).optional(),
    addressLine1: z.string().trim().min(1, 'Address line 1 is required'),
    addressLine2: z.string().trim().optional().or(z.literal('')),
    city: z.string().trim().min(1, 'City is required'),
    state: z.string().min(1, 'Select a state'),
    pincode: z.string().trim().regex(pincodeRegex, 'Enter a valid 6-digit PIN code'),
  })
  .superRefine((values, ctx) => {
    if (values.scheme === 'GENERAL') {
      const amount = Number(values.amount);
      if (!values.amount || Number.isNaN(amount) || amount < 500) {
        ctx.addIssue({ code: 'custom', path: ['amount'], message: 'Enter at least ₹500' });
      }
    }
  });

type DonationFormValues = z.infer<typeof donationFormSchema>;

const defaultValues: DonationFormValues = {
  name: '',
  email: '',
  pan: '',
  mobile: '',
  phone: '',
  scheme: 'STUDENT_ENGLISH',
  amount: 5000,
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

export interface DonationFormSectionProps {
  selectedScheme: DonationScheme;
  onSelectScheme: (scheme: DonationScheme) => void;
}

/** The donation form — id="donate-form" so the hero, tier cards, and closing CTA can all
 * scroll straight to it. Mirrors ContactFormMapSection's react-hook-form + zod + MUI Controller
 * pattern, then hands off to Razorpay Checkout on submit instead of a simple success state. */
export default function DonationFormSection({ selectedScheme, onSelectScheme }: DonationFormSectionProps) {
  const navigate = useNavigate();
  const { open: openCheckout } = useRazorpayCheckout();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues,
  });

  const scheme = watch('scheme');
  const activeTier = donationTiers.find((tier) => tier.scheme === scheme);
  const isFixedTier = Boolean(activeTier && activeTier.amountRupees !== null);

  // Keeps the form's scheme/amount in sync when a tier card is clicked elsewhere on the page.
  useEffect(() => {
    setValue('scheme', selectedScheme);
    const tier = donationTiers.find((t) => t.scheme === selectedScheme);
    if (tier?.amountRupees !== null && tier?.amountRupees !== undefined) {
      setValue('amount', tier.amountRupees);
    } else {
      setValue('amount', '');
    }
  }, [selectedScheme, setValue]);

  const onSubmit = async (values: DonationFormValues) => {
    setSubmitError(null);
    try {
      const order = await createDonationOrder({
        scheme: values.scheme,
        amount: values.scheme === 'GENERAL' ? Number(values.amount) : undefined,
        donor: {
          name: values.name,
          email: values.email,
          pan: values.pan,
          mobile: values.mobile,
          phone: values.phone || undefined,
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2 || undefined,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
        },
      });

      openCheckout({
        key: order.razorpayKeyId,
        amount: order.amountPaise,
        currency: order.currency,
        name: 'WinVinaya Foundation',
        description: activeTier?.headline ?? 'Donation',
        order_id: order.razorpayOrderId,
        prefill: {
          name: order.donorName,
          email: order.donorEmail,
          contact: order.donorMobile,
        },
        notes: {
          reference: order.reference,
          scheme: values.scheme,
        },
        theme: { color: '#FAA43A' },
        handler: (response) => {
          verifyDonationPayment(order.reference, {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          })
            .catch(() => undefined)
            .finally(() => {
              navigate({ to: '/donate/thank-you/$reference', params: { reference: order.reference } });
            });
        },
        modal: {
          ondismiss: () => {
            cancelDonationOrder(order.reference)
              .catch(() => undefined)
              .finally(() => {
                navigate({ to: '/donate/thank-you/$reference', params: { reference: order.reference } });
              });
          },
        },
      });
    } catch {
      setSubmitError('We could not start your donation. Please check your details and try again.');
    }
  };

  return (
    <SectionContainer id="donate-form" bgcolor="background.paper" labelledBy="donate-form-heading">
      <SectionHeading
        eyebrow="Make Your Donation"
        title="Fill in your details to donate."
        description="* marked fields are mandatory. You'll be taken to our secure payment provider to complete the donation."
        titleId="donate-form-heading"
      />

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          maxWidth: 880,
          mx: 'auto',
          pt: { xs: 4, sm: 5.5 },
          px: { xs: 3.5, sm: 5 },
          pb: { xs: 3.5, sm: 5 },
          borderRadius: 5,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: (theme) => `0 20px 48px -16px ${alpha(theme.palette.grey[900], 0.16)}`,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
        />

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {submitError && <Alert severity="error">{submitError}</Alert>}

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Full Name" fullWidth required error={!!errors.name} helperText={errors.name?.message} />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
              <Controller
                name="pan"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="PAN Number"
                    placeholder="ABCDE1234F"
                    fullWidth
                    required
                    error={!!errors.pan}
                    helperText={errors.pan?.message}
                  />
                )}
              />
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mobile"
                    fullWidth
                    required
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Phone (optional)" fullWidth error={!!errors.phone} helperText={errors.phone?.message} />
                )}
              />
              <Controller
                name="scheme"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Donation Scheme"
                    fullWidth
                    required
                    error={!!errors.scheme}
                    helperText={errors.scheme?.message}
                    onChange={(event) => {
                      field.onChange(event);
                      onSelectScheme(event.target.value as DonationScheme);
                    }}
                  >
                    {donationTiers.map((tier) => (
                      <MenuItem key={tier.scheme} value={tier.scheme}>
                        {tier.headline} ({tier.amountLabel})
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>

            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount (INR)"
                  fullWidth
                  required
                  disabled={isFixedTier}
                  error={!!errors.amount}
                  helperText={errors.amount?.message ?? (isFixedTier ? 'Fixed amount for this scheme' : 'Minimum ₹500')}
                />
              )}
            />

            <Controller
              name="addressLine1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address Line 1"
                  fullWidth
                  required
                  error={!!errors.addressLine1}
                  helperText={errors.addressLine1?.message}
                />
              )}
            />
            <Controller
              name="addressLine2"
              control={control}
              render={({ field }) => <TextField {...field} label="Address Line 2 (optional)" fullWidth />}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="City" fullWidth required error={!!errors.city} helperText={errors.city?.message} />
                )}
              />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="State"
                    fullWidth
                    required
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  >
                    <MenuItem value="" disabled>
                      Select a state
                    </MenuItem>
                    {indianStates.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>

            <Controller
              name="pincode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="PIN Code"
                  fullWidth
                  required
                  error={!!errors.pincode}
                  helperText={errors.pincode?.message}
                  sx={{ maxWidth: { sm: '50%' } }}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : <FavoriteRoundedIcon />}
              sx={{
                alignSelf: { xs: 'stretch', sm: 'center' },
                fontWeight: 800,
                px: 5,
                boxShadow: (theme) => `0 10px 24px -6px ${alpha(theme.palette.primary.main, 0.5)}`,
                '&:hover': {
                  boxShadow: (theme) => `0 14px 32px -6px ${alpha(theme.palette.primary.main, 0.6)}`,
                },
              }}
            >
              {isSubmitting ? 'Processing…' : 'Donate Now'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </SectionContainer>
  );
}
