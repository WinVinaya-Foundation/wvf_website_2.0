import { useState, useMemo } from 'react';
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
  FormControlLabel,
  IconButton,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { countWords, DataGrid, RichTextEditor, StatCard, StatusChip } from '../../components';
import { useAdminSession } from '../../hooks/useAdminSession';
import {
  useGetAdminStoriesQuery,
  useCreateStoryMutation,
  useUpdateStoryMutation,
  useToggleStoryStatusMutation,
  useDeleteStoryMutation,
  type StoryItem,
} from '../../store/api/storiesApi';

const MAX_NAME_WORDS = 10;
const MAX_ROLE_WORDS = 10;
const MAX_DESC_WORDS = 100;

interface StoryFormState {
  name: string;
  role: string;
  description: string;
  videoUrl: string;
  isActive: boolean;
}

const initialFormState: StoryFormState = {
  name: '',
  role: '',
  description: '',
  videoUrl: '',
  isActive: true,
};

export default function AdminStoriesPage() {
  const { user } = useAdminSession();
  const { data: stories = [], isLoading, isFetching, refetch } = useGetAdminStoriesQuery();

  const [createStory] = useCreateStoryMutation();
  const [updateStory] = useUpdateStoryMutation();
  const [toggleStatus] = useToggleStoryStatusMutation();
  const [deleteStory] = useDeleteStoryMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<StoryItem | null>(null);
  const [form, setForm] = useState<StoryFormState>(initialFormState);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const activeCount = useMemo(() => stories.filter((s) => s.isActive).length, [stories]);
  const hiddenCount = useMemo(() => stories.filter((s) => !s.isActive).length, [stories]);

  function handleOpenCreate() {
    setEditingStory(null);
    setForm(initialFormState);
    setModalOpen(true);
  }

  function handleOpenEdit(story: StoryItem) {
    setEditingStory(story);
    setForm({
      name: story.name,
      role: story.role,
      description: story.description,
      videoUrl: story.videoUrl,
      isActive: story.isActive,
    });
    setModalOpen(true);
  }

  async function handleSaveStory() {
    if (!form.name.trim() || !form.role.trim() || !form.description.trim() || !form.videoUrl.trim()) {
      setToast({ open: true, message: 'Name, role, description, and video URL are required', severity: 'error' });
      return;
    }

    const nameWords = countWords(form.name);
    if (nameWords > MAX_NAME_WORDS) {
      setToast({ open: true, message: `Name exceeds limit of ${MAX_NAME_WORDS} words`, severity: 'error' });
      return;
    }

    const roleWords = countWords(form.role);
    if (roleWords > MAX_ROLE_WORDS) {
      setToast({ open: true, message: `Role exceeds limit of ${MAX_ROLE_WORDS} words`, severity: 'error' });
      return;
    }

    const descWords = countWords(form.description);
    if (descWords > MAX_DESC_WORDS) {
      setToast({ open: true, message: `Description exceeds limit of ${MAX_DESC_WORDS} words`, severity: 'error' });
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        description: form.description.trim(),
        videoUrl: form.videoUrl.trim(),
        isActive: form.isActive,
      };

      if (editingStory) {
        await updateStory({ id: editingStory.id, data: payload }).unwrap();
        setToast({ open: true, message: 'Success story updated successfully!', severity: 'success' });
      } else {
        await createStory(payload).unwrap();
        setToast({ open: true, message: 'Success story created successfully!', severity: 'success' });
      }

      setModalOpen(false);
      refetch();
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string }; message?: string };
      setToast({ open: true, message: apiErr.data?.error || apiErr.message || 'Failed to save story', severity: 'error' });
    }
  }

  async function handleToggleActive(story: StoryItem) {
    try {
      await toggleStatus({ id: story.id, isActive: !story.isActive }).unwrap();
      setToast({
        open: true,
        message: `Story "${story.name}" is now ${!story.isActive ? 'published' : 'hidden'}`,
        severity: 'success',
      });
      refetch();
    } catch {
      setToast({ open: true, message: 'Failed to update visibility', severity: 'error' });
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteId) return;
    try {
      await deleteStory(deleteId).unwrap();
      setToast({ open: true, message: 'Success story deleted successfully', severity: 'success' });
      setDeleteId(null);
      refetch();
    } catch {
      setToast({ open: true, message: 'Failed to delete story', severity: 'error' });
    }
  }

  if (!user) return null;

  return (
    <AdminLayout user={user} title="Success Stories Management">
      <Stack spacing={3}>
        {/* Header Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
          <StatCard label="Total Success Stories" value={String(stories.length)} icon={<AutoAwesomeRoundedIcon />} color="primary" />
          <StatCard label="Active Public Stories" value={String(activeCount)} icon={<VisibilityRoundedIcon />} color="success" />
          <StatCard label="Hidden / Inactive" value={String(hiddenCount)} icon={<VisibilityOffRoundedIcon />} color="warning" />
        </Box>

        {/* Toolbar Button */}
        <Stack direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={handleOpenCreate}>
            Add Success Story
          </Button>
        </Stack>

        {/* Data Table */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid<StoryItem>
            title="Success Stories"
            rows={stories}
            getRowKey={(item) => item.id}
            getSearchValue={(item) => `${item.name} ${item.role} ${item.description}`}
            loading={isFetching}
            onRefresh={() => {
              refetch();
            }}
            columns={[
              {
                key: 'name',
                header: 'Candidate Name',
                render: (item) => (
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {item.name}
                  </Typography>
                ),
              },
              {
                key: 'role',
                header: 'Role / Designation',
                render: (item) => (
                  <Chip label={item.role} size="small" variant="outlined" color="primary" sx={{ fontWeight: 600 }} />
                ),
              },
              {
                key: 'description',
                header: 'Story Description',
                render: (item) => {
                  const plainText = item.description.replace(/<[^>]*>/g, '');
                  return (
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 300 }}>
                      {plainText}
                    </Typography>
                  );
                },
              },
              {
                key: 'videoUrl',
                header: 'Video Link',
                render: (item) => (
                  <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                    <OndemandVideoRoundedIcon fontSize="small" color="error" />
                    <Typography
                      component="a"
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="caption"
                      sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      Watch Video
                    </Typography>
                  </Stack>
                ),
              },
              {
                key: 'status',
                header: 'Status',
                render: (item) => (
                  <StatusChip
                    status={item.isActive ? 'success' : 'default'}
                    label={item.isActive ? 'Public' : 'Hidden'}
                  />
                ),
              },
              {
                key: 'actions',
                header: 'Actions',
                render: (item) => (
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={item.isActive ? 'Hide from public website' : 'Make public'}>
                      <IconButton size="small" onClick={() => handleToggleActive(item)} color={item.isActive ? 'success' : 'default'}>
                        {item.isActive ? <VisibilityRoundedIcon fontSize="small" /> : <VisibilityOffRoundedIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit Story">
                      <IconButton size="small" onClick={() => handleOpenEdit(item)} color="primary">
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Story">
                      <IconButton size="small" onClick={() => setDeleteId(item.id)} color="error">
                        <DeleteRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                ),
              },
            ]}
          />
        )}
      </Stack>

      {/* Create / Edit Dialog */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{editingStory ? 'Edit Success Story' : 'Add Success Story'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 0.5 }}>
            {(() => {
              const nameWords = countWords(form.name);
              const isNameOver = nameWords > MAX_NAME_WORDS;
              return (
                <TextField
                  label="Candidate Name"
                  fullWidth
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Symonne Kotian"
                  error={isNameOver}
                  helperText={`Word count: ${nameWords} / ${MAX_NAME_WORDS} words`}
                  slotProps={{
                    formHelperText: {
                      sx: { textAlign: 'right', fontWeight: 600, color: isNameOver ? 'error.main' : 'text.secondary' },
                    },
                  }}
                />
              );
            })()}

            {(() => {
              const roleWords = countWords(form.role);
              const isRoleOver = roleWords > MAX_ROLE_WORDS;
              return (
                <TextField
                  label="Role / Designation"
                  fullWidth
                  required
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  placeholder="e.g. Graphic Designer or Sign Language Advocate"
                  error={isRoleOver}
                  helperText={`Word count: ${roleWords} / ${MAX_ROLE_WORDS} words`}
                  slotProps={{
                    formHelperText: {
                      sx: { textAlign: 'right', fontWeight: 600, color: isRoleOver ? 'error.main' : 'text.secondary' },
                    },
                  }}
                />
              );
            })()}

            <TextField
              label="YouTube Video URL"
              fullWidth
              required
              value={form.videoUrl}
              onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
              placeholder="e.g. https://www.youtube.com/embed/2j45mfZ9iFI?autoplay=1"
              helperText="Embed URL or direct YouTube video link"
            />

            <RichTextEditor
              label="Story Description"
              value={form.description}
              onChange={(val) => setForm((f) => ({ ...f, description: val }))}
              placeholder="Inspirational journey description... (Supports rich text formatting)"
              maxWords={MAX_DESC_WORDS}
              showWordCount
            />

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
                  Publish publicly on website
                </Typography>
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSaveStory} variant="contained" color="primary">
            {editingStory ? 'Save Changes' : 'Create Story'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete this success story? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete Story
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
