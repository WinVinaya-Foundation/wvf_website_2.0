import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { Card, CardContent } from '../../components';
import { useAdminSession } from '../../hooks/useAdminSession';

export default function AdminDashboardPage() {
  const { user, isLoading } = useAdminSession();

  if (isLoading || !user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AdminLayout user={user} title="Dashboard">
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
