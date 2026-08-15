import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { useAdminSession } from '../../hooks/useAdminSession';
import { DataGrid, StatCard, type DataTableColumn } from '../../components';
import {
  type ContactInquiryItem,
  type InquiryStatus,
  useGetAdminInquiriesQuery,
  useUpdateInquiryStatusMutation,
  useDeleteInquiryMutation,
} from '../../store/api/contactApi';
import { formatDate } from '../../utils/date';

export default function AdminContactPage() {
  const { user, isLoading: isSessionLoading } = useAdminSession();
  const { data: inquiries = [], isLoading: isInquiriesLoading, isFetching, refetch } = useGetAdminInquiriesQuery();

  const [updateInquiryStatus] = useUpdateInquiryStatusMutation();
  const [deleteInquiry] = useDeleteInquiryMutation();

  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiryItem | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<InquiryStatus>('NEW');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  if (isSessionLoading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const newCount = inquiries.filter((i) => i.status === 'NEW').length;
  const inProgressCount = inquiries.filter((i) => i.status === 'IN_PROGRESS').length;
  const resolvedCount = inquiries.filter((i) => i.status === 'RESOLVED').length;

  const handleOpenDetail = (inquiry: ContactInquiryItem) => {
    setSelectedInquiry(inquiry);
    setStatus(inquiry.status);
    setNotes(inquiry.adminNotes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedInquiry) return;
    try {
      await updateInquiryStatus({ id: selectedInquiry.id, status, adminNotes: notes }).unwrap();
      setToast({ open: true, message: 'Inquiry status updated successfully', severity: 'success' });
      setSelectedInquiry(null);
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string } };
      setToast({ open: true, message: apiErr.data?.error || 'Failed to update inquiry', severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deleteInquiry(deleteId).unwrap();
      setToast({ open: true, message: 'Inquiry deleted successfully', severity: 'success' });
      setDeleteId(null);
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string } };
      setToast({ open: true, message: apiErr.data?.error || 'Failed to delete inquiry', severity: 'error' });
    }
  };

  const getStatusChip = (st: InquiryStatus) => {
    switch (st) {
      case 'NEW':
        return <Chip label="New" color="error" size="small" sx={{ fontWeight: 800 }} />;
      case 'IN_PROGRESS':
        return <Chip label="In Progress" color="warning" size="small" sx={{ fontWeight: 800 }} />;
      case 'RESOLVED':
        return <Chip label="Resolved" color="success" size="small" sx={{ fontWeight: 800 }} />;
      case 'ARCHIVED':
        return <Chip label="Archived" color="default" size="small" sx={{ fontWeight: 800 }} />;
    }
  };

  const columns: DataTableColumn<ContactInquiryItem>[] = [
    {
      key: 'sender',
      header: 'Sender Details',
      render: (item: ContactInquiryItem) => (
        <Stack spacing={0.5}>
          <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }}>
            {item.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {item.email} {item.phone ? `• ${item.phone}` : ''}
          </Typography>
        </Stack>
      ),
    },
    {
      key: 'reason',
      header: 'Reason / Category',
      render: (item: ContactInquiryItem) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
          {item.reason}
        </Typography>
      ),
    },
    {
      key: 'date',
      header: 'Received Date',
      render: (item: ContactInquiryItem) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {formatDate(item.createdAt)}
        </Typography>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: ContactInquiryItem) => getStatusChip(item.status),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (item: ContactInquiryItem) => (
        <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
          <Tooltip title="View Message Details & Notes">
            <IconButton size="small" color="primary" onClick={() => handleOpenDetail(item)}>
              <VisibilityRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Message">
            <IconButton size="small" color="error" onClick={() => setDeleteId(item.id)}>
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <AdminLayout user={user} title="Contact Form Inquiries">
      <Stack spacing={4}>
        {/* Metric Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          <StatCard label="New Messages" value={String(newCount)} icon={<MarkEmailUnreadRoundedIcon fontSize="large" />} color="error" />
          <StatCard label="In Progress" value={String(inProgressCount)} icon={<HourglassTopRoundedIcon fontSize="large" />} color="warning" />
          <StatCard label="Resolved" value={String(resolvedCount)} icon={<CheckCircleRoundedIcon fontSize="large" />} color="success" />
        </Box>

        {/* Data Table */}
        {isInquiriesLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid<ContactInquiryItem>
            title="Incoming Contact Messages"
            rows={inquiries}
            getRowKey={(item: ContactInquiryItem) => item.id}
            getSearchValue={(item: ContactInquiryItem) => `${item.name} ${item.email} ${item.reason} ${item.message}`}
            loading={isFetching}
            onRefresh={() => {
              refetch();
            }}
            columns={columns}
          />
        )}
      </Stack>

      {/* Message Details Modal */}
      <Dialog open={!!selectedInquiry} onClose={() => setSelectedInquiry(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Inquiry Message Details</DialogTitle>
        <DialogContent dividers>
          {selectedInquiry && (
            <Stack spacing={2.5} sx={{ pt: 1 }}>
              <Box sx={{ bgcolor: 'grey.50', p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {selectedInquiry.name} ({selectedInquiry.email})
                  </Typography>
                  {selectedInquiry.phone && (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Phone: {selectedInquiry.phone}
                    </Typography>
                  )}
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    Reason: {selectedInquiry.reason}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Submitted: {formatDate(selectedInquiry.createdAt)}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.5 }}>
                  Visitor Message:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', bgcolor: 'background.paper', p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                  {selectedInquiry.message}
                </Typography>
              </Box>

              <FormControl fullWidth>
                <InputLabel id="inquiry-status-label">Update Status</InputLabel>
                <Select
                  labelId="inquiry-status-label"
                  label="Update Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as InquiryStatus)}
                >
                  <MenuItem value="NEW">New</MenuItem>
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                  <MenuItem value="RESOLVED">Resolved</MenuItem>
                  <MenuItem value="ARCHIVED">Archived</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Admin Internal Notes"
                fullWidth
                multiline
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log follow-up details, response dates, or team notes..."
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setSelectedInquiry(null)} color="inherit">
            Close
          </Button>
          <Button onClick={handleSaveStatus} variant="contained" color="secondary">
            Save Status & Notes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Are you sure you want to delete this message record? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete Message
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast((t) => ({ ...t, open: false }))}>
        <Alert severity={toast.severity} onClose={() => setToast((t) => ({ ...t, open: false }))} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
}
