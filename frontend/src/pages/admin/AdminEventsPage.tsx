import { useState } from 'react';
import {
  Alert,
  Box,
  Button as MuiButton,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { DataGrid, StatCard, StatusChip } from '../../components';
import { useAdminSession } from '../../hooks/useAdminSession';
import {
  useGetAdminEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useToggleEventStatusMutation,
  useDeleteEventMutation,
  type EventStatus,
  type EventItem,
} from '../../store/api/eventsApi';
import { useGetCategoriesQuery } from '../../store/api/categoriesApi';
import { CATEGORY_COLOR_MAP } from '../../sections/programs/events-gallery/categoryVisuals';
import CategoryQuickAddDialog from './CategoryQuickAddDialog';

const statusLabels: Record<EventStatus, string> = {
  UPCOMING: 'Upcoming',
  COMPLETED: 'Completed',
};

interface EventFormState {
  title: string;
  categoryId: string;
  status: EventStatus;
  dateLabel: string;
  isDateTBA: boolean;
  location: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  isActive: boolean;
}

const emptyForm: EventFormState = {
  title: '',
  categoryId: '',
  status: 'UPCOMING',
  dateLabel: '',
  isDateTBA: false,
  location: '',
  description: '',
  ctaLabel: '',
  ctaLink: '',
  isActive: true,
};

export default function AdminEventsPage() {
  const { user, isLoading: isSessionLoading } = useAdminSession();
  const { data: events, isFetching: isEventsFetching, refetch } = useGetAdminEventsQuery();
  const { data: categories = [], isFetching: isCategoriesFetching } = useGetCategoriesQuery();

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [toggleStatus] = useToggleEventStatusMutation();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const [activeTab, setActiveTab] = useState<'ALL' | EventStatus>('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [form, setForm] = useState<EventFormState>(emptyForm);

  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  if (isSessionLoading || !user || !events) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const totalCount = events.length;
  const upcomingCount = events.filter((e) => e.status === 'UPCOMING').length;
  const completedCount = events.filter((e) => e.status === 'COMPLETED').length;
  const activeCount = events.filter((e) => e.isActive).length;

  const filteredEvents = events.filter((event) => activeTab === 'ALL' || event.status === activeTab);

  function handleOpenCreateModal() {
    setEditingEvent(null);
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id || '',
    });
    setModalOpen(true);
  }

  function handleOpenEditModal(event: EventItem) {
    setEditingEvent(event);
    setForm({
      title: event.title,
      categoryId: event.category?.id || categories[0]?.id || '',
      status: event.status,
      dateLabel: event.dateLabel,
      isDateTBA: event.isDateTBA,
      location: event.location,
      description: event.description,
      ctaLabel: event.ctaLabel || '',
      ctaLink: event.ctaLink || '',
      isActive: event.isActive,
    });
    setModalOpen(true);
  }

  async function handleSaveEvent() {
    if (!form.title.trim() || !form.categoryId || !form.dateLabel.trim() || !form.location.trim() || !form.description.trim()) {
      setToast({ open: true, message: 'Title, category, date label, location and description are required', severity: 'error' });
      return;
    }

    try {
      const data = {
        title: form.title.trim(),
        categoryId: form.categoryId,
        status: form.status,
        dateLabel: form.dateLabel.trim(),
        isDateTBA: form.isDateTBA,
        location: form.location.trim(),
        description: form.description.trim(),
        ctaLabel: form.ctaLabel.trim() || undefined,
        ctaLink: form.ctaLink.trim() || undefined,
        isActive: form.isActive,
      };

      if (editingEvent) {
        await updateEvent({ id: editingEvent.id, data }).unwrap();
        setToast({ open: true, message: 'Event updated successfully!', severity: 'success' });
      } else {
        await createEvent(data).unwrap();
        setToast({ open: true, message: 'Event created successfully!', severity: 'success' });
      }

      setModalOpen(false);
      refetch();
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string }; message?: string };
      setToast({ open: true, message: apiErr.data?.error || apiErr.message || 'Failed to save event', severity: 'error' });
    }
  }

  async function handleToggleActive(event: EventItem) {
    try {
      await toggleStatus({ id: event.id, isActive: !event.isActive }).unwrap();
      setToast({
        open: true,
        message: `Event "${event.title}" is now ${!event.isActive ? 'Active' : 'Inactive'}`,
        severity: 'success',
      });
    } catch {
      setToast({ open: true, message: 'Failed to update event visibility', severity: 'error' });
    }
  }

  async function handleDeleteConfirmed() {
    if (!deleteConfirmId) return;
    try {
      await deleteEvent(deleteConfirmId).unwrap();
      setToast({ open: true, message: 'Event deleted successfully', severity: 'success' });
      setDeleteConfirmId(null);
      refetch();
    } catch {
      setToast({ open: true, message: 'Failed to delete event', severity: 'error' });
    }
  }

  return (
    <AdminLayout user={user} title="Events Management">
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Events Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Create and manage upcoming and completed events shown on the public Events & Gallery page.
            </Typography>
          </Box>
          <MuiButton
            variant="contained"
            color="primary"
            startIcon={<AddRoundedIcon />}
            onClick={handleOpenCreateModal}
            sx={{ borderRadius: 2, textTransform: 'none', px: 2.5, py: 1 }}
          >
            Add New Event
          </MuiButton>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2.5 }}>
          <StatCard icon={<EventRoundedIcon />} label="Total Events" value={totalCount.toString()} color="primary" />
          <StatCard icon={<EventAvailableRoundedIcon />} label="Upcoming" value={upcomingCount.toString()} color="secondary" />
          <StatCard icon={<EventBusyRoundedIcon />} label="Completed" value={completedCount.toString()} color="warning" />
          <StatCard icon={<CheckCircleRoundedIcon />} label="Active (Public)" value={activeCount.toString()} color="success" />
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_e, newValue) => setActiveTab(newValue)} variant="scrollable" scrollButtons="auto">
            <Tab label={`All Events (${events.length})`} value="ALL" />
            <Tab label={`Upcoming (${upcomingCount})`} value="UPCOMING" />
            <Tab label={`Completed (${completedCount})`} value="COMPLETED" />
          </Tabs>
        </Box>

        <DataGrid
          title="Events List"
          columns={[
            {
              key: 'event',
              header: 'Event',
              render: (row) => (
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{row.title}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {row.dateLabel} • {row.location}
                  </Typography>
                </Box>
              ),
            },
            {
              key: 'category',
              header: 'Category',
              render: (row) => (
                <Chip
                  label={row.category?.label || 'General'}
                  size="small"
                  variant="outlined"
                  color={CATEGORY_COLOR_MAP[row.category?.color] || 'primary'}
                />
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <StatusChip status={row.status === 'UPCOMING' ? 'info' : 'default'} label={statusLabels[row.status]} />
              ),
            },
            {
              key: 'visibility',
              header: 'Public Visibility',
              render: (row) => (
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Switch size="small" checked={row.isActive} onChange={() => handleToggleActive(row)} color="success" />
                  <StatusChip status={row.isActive ? 'success' : 'warning'} label={row.isActive ? 'Active' : 'Inactive'} />
                </Stack>
              ),
            },
            {
              key: 'actions',
              header: 'Actions',
              align: 'right',
              render: (row) => (
                <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                  <Tooltip title="Edit Event">
                    <MuiButton size="small" color="info" onClick={() => handleOpenEditModal(row)} sx={{ minWidth: 0, p: 1 }}>
                      <EditRoundedIcon fontSize="small" />
                    </MuiButton>
                  </Tooltip>
                  <Tooltip title="Delete Event">
                    <MuiButton size="small" color="error" onClick={() => setDeleteConfirmId(row.id)} sx={{ minWidth: 0, p: 1 }}>
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </MuiButton>
                  </Tooltip>
                </Stack>
              ),
            },
          ]}
          rows={filteredEvents}
          getRowKey={(row) => row.id}
          getSearchValue={(row) => `${row.title} ${row.description} ${row.location} ${row.category?.label || ''}`}
          searchPlaceholder="Search events by title, description or location..."
          onRefresh={() => { refetch(); }}
          loading={isEventsFetching || isCategoriesFetching}
          emptyMessage="No events found"
          stickyHeader
          maxHeight={580}
        />
      </Stack>

      {/* Create / Edit Event Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 0.5 }}>
            <TextField
              label="Event Title"
              fullWidth
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. WinVinaya Academy — New Cohort Orientation"
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ flex: 1, width: '100%' }}>
                <FormControl fullWidth required>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    value={form.categoryId}
                    label="Category"
                    onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <MuiButton
                  size="small"
                  startIcon={<AddRoundedIcon />}
                  onClick={() => setQuickAddOpen(true)}
                  sx={{ mt: 0.5, textTransform: 'none', px: 0, fontWeight: 600 }}
                >
                  + Quick Add Category
                </MuiButton>
              </Box>

              <FormControl fullWidth required sx={{ flex: 1 }}>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={form.status}
                  label="Status"
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as EventStatus }))}
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <TextField
              label="Date Label"
              fullWidth
              required
              value={form.dateLabel}
              onChange={(e) => setForm((f) => ({ ...f, dateLabel: e.target.value }))}
              placeholder="e.g. Next cohort — September 2026"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={form.isDateTBA}
                  onChange={(e) => setForm((f) => ({ ...f, isDateTBA: e.target.checked }))}
                  color="warning"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Exact date not confirmed yet (shows a "date TBA" note)
                </Typography>
              }
            />

            <TextField
              label="Location"
              fullWidth
              required
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              placeholder="e.g. Bengaluru & Online"
            />

            <TextField
              label="Description"
              fullWidth
              required
              multiline
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Short description shown on the event card..."
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="CTA Button Label (Optional)"
                fullWidth
                value={form.ctaLabel}
                onChange={(e) => setForm((f) => ({ ...f, ctaLabel: e.target.value }))}
                placeholder="e.g. Apply to Academy"
              />
              <TextField
                label="CTA Link (Optional)"
                fullWidth
                value={form.ctaLink}
                onChange={(e) => setForm((f) => ({ ...f, ctaLink: e.target.value }))}
                placeholder="e.g. /programs/academy"
              />
            </Stack>

            <FormControlLabel
              control={
                <Switch
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  color="success"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Active (Show on public Events & Gallery page)
                </Typography>
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <MuiButton onClick={() => setModalOpen(false)} color="inherit">
            Cancel
          </MuiButton>
          <MuiButton
            onClick={handleSaveEvent}
            variant="contained"
            disabled={isCreating || isUpdating}
            startIcon={isCreating || isUpdating ? <CircularProgress size={16} /> : undefined}
          >
            {editingEvent ? 'Save Changes' : 'Create Event'}
          </MuiButton>
        </DialogActions>
      </Dialog>

      {/* Shared Quick Add Category Dialog */}
      <CategoryQuickAddDialog
        open={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
        onCategoryCreated={(newCat) => {
          setForm((f) => ({ ...f, categoryId: newCat.id }));
          setToast({ open: true, message: `Category "${newCat.label}" created!`, severity: 'success' });
        }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Event Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this event? This will permanently remove it from the database.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <MuiButton onClick={() => setDeleteConfirmId(null)} color="inherit">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleDeleteConfirmed} color="error" variant="contained" disabled={isDeleting}>
            Delete Event
          </MuiButton>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={toast.severity} onClose={() => setToast((prev) => ({ ...prev, open: false }))}>
          {toast.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
}
