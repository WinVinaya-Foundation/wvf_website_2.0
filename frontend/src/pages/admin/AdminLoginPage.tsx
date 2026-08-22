import { useState } from 'react';
import { Alert, Box, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, CardContent, TextField } from '../../components';
import { useLoginMutation } from '../../store/api/authApi';
import type { ApiError } from '../../store/api/baseApi';
import logo from '../../assets/logo/winvinaya_foundation.svg';

const loginFormSchema = z.object({
  identifier: z.string().trim().min(1, 'Enter your username or email'),
  password: z.string().min(1, 'Enter your password'),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { identifier: '', password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await login(values).unwrap();
      navigate({ to: '/admin/dashboard' });
    } catch (error) {
      const message = (error as ApiError)?.message || 'Login failed. Please check your credentials and try again.';
      setSubmitError(message);
    }
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400, boxShadow: (theme) => theme.shadows[6] }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={3} component="form" onSubmit={onSubmit} noValidate>
            <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Box component="img" src={logo} alt="WinVinaya Foundation" sx={{ height: 48 }} />
              <Typography variant="h5" component="h1">
                Admin Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in with your username or email.
              </Typography>
            </Stack>

            {submitError && <Alert severity="error">{submitError}</Alert>}

            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username or email"
                  autoComplete="username"
                  autoFocus
                  fullWidth
                  error={!!errors.identifier}
                  helperText={errors.identifier?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  autoComplete="current-password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button type="submit" variant="contained" color="primary" size="large" disabled={isLoading} fullWidth>
              {isLoading ? 'Signing in…' : 'Sign in'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
