import { useState } from 'react';
import { Box, CircularProgress, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { Button, SectionContainer, SectionHeading, TextField } from '../../components';
import { contactReasons, mapEmbedSrc } from '../../pages/contact/contactContent';

const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name'),
  email: z.string().trim().min(1, 'Please enter your email').email('Enter a valid email address'),
  reason: z.string().min(1, 'Please select a reason'),
  message: z.string().trim().min(10, 'Tell us a little more (at least 10 characters)'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: ContactFormValues = { name: '', email: '', reason: '', message: '' };

/** Contact form + map — the primary conversion point on the page, so form and location sit
 * side by side rather than stacked, letting a visitor pick whichever path they'd rather take. */
export default function ContactFormMapSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit = async () => {
    // No backend endpoint exists yet for this form — simulate the round trip so the UX (loading,
    // then a confirmation state) is real, and swap in a real submit call once one exists.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitted(true);
  };

  const handleSendAnother = () => {
    reset(defaultValues);
    setSubmitted(false);
  };

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="contact-form-heading">
      <SectionHeading
        eyebrow="Send Us a Message"
        title="Tell us how we can help."
        description="Fill in the form and our team will get back to you — or find us on the map alongside it."
        titleId="contact-form-heading"
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: { xs: 4, lg: 5 }, alignItems: 'stretch' }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            pt: { xs: 4, sm: 5.5 },
            px: { xs: 3.5, sm: 5 },
            pb: { xs: 3.5, sm: 5 },
            borderRadius: 5,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: (theme) => `0 20px 48px -16px ${alpha(theme.palette.grey[900], 0.16)}`,
            display: 'flex',
            alignItems: submitted ? 'center' : 'stretch',
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
              background: (theme) =>
                `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          />
          {submitted ? (
            <Stack spacing={2.5} sx={{ alignItems: 'center', textAlign: 'center', py: { xs: 3, md: 4 }, width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.14),
                  color: 'secondary.dark',
                }}
              >
                <CheckCircleRoundedIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Message sent — thank you!
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 420 }}>
                We&apos;ve received your message and will get back to you soon. For anything urgent, reach us on WhatsApp
                or email above.
              </Typography>
              <Button variant="outlined" onClick={handleSendAnother} sx={{ fontWeight: 700, mt: 1 }}>
                Send Another Message
              </Button>
            </Stack>
          ) : (
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
              <Stack spacing={3}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Your Name"
                        placeholder="Full name"
                        fullWidth
                        required
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email Address"
                        placeholder="you@example.com"
                        type="email"
                        fullWidth
                        required
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Box>

                <Controller
                  name="reason"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Why are you contacting us?"
                      fullWidth
                      required
                      error={!!errors.reason}
                      helperText={errors.reason?.message}
                    >
                      <MenuItem value="" disabled>
                        Select a reason
                      </MenuItem>
                      {contactReasons.map((reason) => (
                        <MenuItem key={reason} value={reason}>
                          {reason}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="How can we help?"
                      placeholder="Tell us a bit more about what you need..."
                      multiline
                      minRows={5}
                      fullWidth
                      required
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  endIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : <SendRoundedIcon />}
                  sx={{
                    alignSelf: { xs: 'stretch', sm: 'flex-start' },
                    fontWeight: 800,
                    px: 4,
                    boxShadow: (theme) => `0 10px 24px -6px ${alpha(theme.palette.primary.main, 0.5)}`,
                    '&:hover': {
                      boxShadow: (theme) => `0 14px 32px -6px ${alpha(theme.palette.primary.main, 0.6)}`,
                    },
                  }}
                >
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </Button>
              </Stack>
            </Box>
          )}
        </Box>

        <Stack spacing={2}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 5,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: (theme) => `0 16px 40px -14px ${alpha(theme.palette.grey[900], 0.12)}`,
              flexGrow: 1,
              minHeight: 320,
            }}
          >
            <Box
              component="iframe"
              src={mapEmbedSrc}
              title="WinVinaya Foundation location on Google Maps"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
            <Stack
              direction="row"
              spacing={0.75}
              sx={{
                position: 'absolute',
                top: 14,
                left: 14,
                alignItems: 'center',
                px: 1.5,
                py: 0.75,
                borderRadius: 999,
                bgcolor: 'background.paper',
                boxShadow: (theme) => `0 6px 18px -4px ${alpha(theme.palette.grey[900], 0.28)}`,
              }}
            >
              <MapRoundedIcon fontSize="small" sx={{ color: 'primary.dark' }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                WinVinaya HQ, Bengaluru
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', color: 'text.secondary' }}>
            <MapRoundedIcon fontSize="small" sx={{ color: 'primary.dark' }} />
            <Typography sx={{ fontSize: '0.975rem', fontWeight: 500 }}>Royal Residency, BTM 4th Stage, Bengaluru</Typography>
          </Stack>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
