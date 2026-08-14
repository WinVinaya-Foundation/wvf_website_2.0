import { useCallback, useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { DataGrid, StatCard, StatusChip, type StatusChipStatus } from '../../components';
import { getCurrentUser, type AdminUser } from '../../service/adminAuthService';
import { exportDonors, getDonors, type AdminDonationListItem, type DonorStats } from '../../service/adminDonorsService';

const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

function formatAmount(amountPaise: number): string {
  return currencyFormatter.format(amountPaise / 100);
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
}

const statusChipMap: Record<AdminDonationListItem['status'], { status: StatusChipStatus; label: string }> = {
  PAID: { status: 'success', label: 'Paid' },
  CREATED: { status: 'warning', label: 'Pending' },
  FAILED: { status: 'error', label: 'Failed' },
  CANCELLED: { status: 'default', label: 'Cancelled' },
};

export default function AdminDonorsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [donations, setDonations] = useState<AdminDonationListItem[] | null>(null);
  const [stats, setStats] = useState<DonorStats | null>(null);

  const loadDonors = useCallback(async () => {
    const donors = await getDonors();
    setDonations(donors.donations);
    setStats(donors.stats);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [currentUser] = await Promise.all([getCurrentUser(), loadDonors()]);
        if (!cancelled) setUser(currentUser);
      } catch {
        if (!cancelled) {
          localStorage.removeItem('accessToken');
          navigate({ to: '/admin/login' });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [navigate, loadDonors]);

  function handleLogout() {
    localStorage.removeItem('accessToken');
    navigate({ to: '/admin/login' });
  }

  if (!user || !donations || !stats) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AdminLayout user={user} title="Donor Info" onLogout={handleLogout}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          Donor Info
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' },
            gap: 2.5,
          }}
        >
          <StatCard
            icon={<CurrencyRupeeRoundedIcon />}
            label="Total Raised"
            value={formatAmount(stats.totalRaisedPaise)}
            color="primary"
          />
          <StatCard
            icon={<ReceiptLongRoundedIcon />}
            label="Paid Donations"
            value={stats.paidDonationsCount.toLocaleString('en-IN')}
            color="secondary"
          />
          <StatCard
            icon={<GroupsRoundedIcon />}
            label="Unique Donors"
            value={stats.uniqueDonorsCount.toLocaleString('en-IN')}
            color="success"
          />
          <StatCard
            icon={<PendingActionsRoundedIcon />}
            label="Pending Donations"
            value={stats.pendingDonationsCount.toLocaleString('en-IN')}
            color="warning"
          />
          <StatCard
            icon={<CancelRoundedIcon />}
            label="Cancelled Donations"
            value={stats.cancelledDonationsCount.toLocaleString('en-IN')}
            color="error"
          />
        </Box>

        <DataGrid
          title="Donations"
          columns={[
            {
              key: 'donor',
              header: 'Donor',
              render: (row) => (
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{row.donorName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {row.donorEmail}
                  </Typography>
                </Box>
              ),
            },
            { key: 'mobile', header: 'Mobile', render: (row) => row.donorMobile },
            { key: 'scheme', header: 'Scheme', render: (row) => row.schemeLabel },
            { key: 'amount', header: 'Amount', render: (row) => formatAmount(row.amountPaise), align: 'right' },
            {
              key: 'status',
              header: 'Status',
              render: (row) => {
                const chip = statusChipMap[row.status];
                return <StatusChip status={chip.status} label={chip.label} />;
              },
            },
            { key: 'date', header: 'Date', render: (row) => formatDate(row.createdAt) },
          ]}
          rows={donations}
          getRowKey={(row) => row.id}
          getSearchValue={(row) => `${row.donorName} ${row.donorEmail} ${row.donorMobile} ${row.schemeLabel}`}
          searchPlaceholder="Search donors…"
          onRefresh={loadDonors}
          emptyMessage="No donations yet"
          stickyHeader
          maxHeight={560}
          exportFileName="donors"
          exportColumns={[
            { header: 'Donor Name', value: (row) => row.donorName },
            { header: 'Email', value: (row) => row.donorEmail },
            { header: 'Mobile', value: (row) => row.donorMobile },
            { header: 'Scheme', value: (row) => row.schemeLabel },
            { header: 'Amount (INR)', value: (row) => row.amountPaise / 100 },
            { header: 'Status', value: (row) => statusChipMap[row.status].label },
            { header: 'Date', value: (row) => formatDate(row.createdAt) },
          ]}
          onExportAll={({ from, to }) => exportDonors({ from, to })}
        />
      </Stack>
    </AdminLayout>
  );
}
