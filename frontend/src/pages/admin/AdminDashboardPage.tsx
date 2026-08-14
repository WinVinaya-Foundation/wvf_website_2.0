import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { Card, CardContent } from '../../components';
import { getCurrentUser, type AdminUser } from '../../service/adminAuthService';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    let cancelled = false;
    getCurrentUser()
      .then((fetchedUser) => {
        if (!cancelled) setUser(fetchedUser);
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
        navigate({ to: '/admin/login' });
      });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('accessToken');
    navigate({ to: '/admin/login' });
  }

  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AdminLayout user={user} title="Dashboard" onLogout={handleLogout}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          Welcome, {user.name.split(' ')[0]}
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
              Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email} · {user.username} · {user.role}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </AdminLayout>
  );
}
