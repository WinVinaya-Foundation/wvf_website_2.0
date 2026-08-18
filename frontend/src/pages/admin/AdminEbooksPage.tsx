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
  FormControlLabel,
  IconButton,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { resolveUploadUrl } from '../../utils/uploads';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { useAdminSession } from '../../hooks/useAdminSession';
import { DataGrid, StatCard, type DataTableColumn } from '../../components';
import {
  type EbookItem,
  useGetAdminEbooksQuery,
  useCreateEbookMutation,
  useUpdateEbookMutation,
  useToggleEbookStatusMutation,
  useDeleteEbookMutation,
} from '../../store/api/ebookApi';
import { formatDate } from '../../utils/date';

interface EbookFormState {
  title: string;
  author: string;
  publishedAt: string;
  description: string;
  coverImageUrl: string;
  isActive: boolean;
}

const initialFormState: EbookFormState = {
  title: '',
  author: '',
  publishedAt: new Date().toISOString().split('T')[0],
  description: '',
  coverImageUrl: '',
  isActive: true,
};

export default function AdminEbooksPage() {
  const { user, isLoading: isSessionLoading } = useAdminSession();
  const { data: ebooks = [], isLoading: isEbooksLoading, isFetching, refetch } = useGetAdminEbooksQuery();

  const [createEbook] = useCreateEbookMutation();
  const [updateEbook] = useUpdateEbookMutation();
  const [toggleStatus] = useToggleEbookStatusMutation();
  const [deleteEbook] = useDeleteEbookMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEbook, setEditingEbook] = useState<EbookItem | null>(null);
  const [form, setForm] = useState<EbookFormState>(initialFormState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
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

  const activeCount = ebooks.filter((e) => e.isActive).length;
  const draftCount = ebooks.length - activeCount;

  const handleOpenCreate = () => {
    setEditingEbook(null);
    setSelectedFile(null);
    setCoverFile(null);
    setForm(initialFormState);
    setModalOpen(true);
  };

  const handleOpenEdit = (ebook: EbookItem) => {
    setEditingEbook(ebook);
    setSelectedFile(null);
    setCoverFile(null);
    setForm({
      title: ebook.title,
      author: ebook.author,
      publishedAt: ebook.publishedAt.split('T')[0],
      description: ebook.description,
      coverImageUrl: ebook.coverImageUrl || '',
      isActive: ebook.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.description.trim()) {
      setToast({ open: true, message: 'Title, author, and description are required', severity: 'error' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', form.title.trim());
      formData.append('author', form.author.trim());
      formData.append('publishedAt', form.publishedAt);
      formData.append('description', form.description.trim());
      formData.append('coverImageUrl', form.coverImageUrl.trim());
      formData.append('isActive', String(form.isActive));

      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      if (coverFile) {
        formData.append('coverImage', coverFile);
      }

      if (editingEbook) {
        await updateEbook({ id: editingEbook.id, formData }).unwrap();
        setToast({ open: true, message: 'E-book updated successfully', severity: 'success' });
      } else {
        await createEbook(formData).unwrap();
        setToast({ open: true, message: 'E-book created successfully', severity: 'success' });
      }
      setModalOpen(false);
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string } };
      setToast({ open: true, message: apiErr.data?.error || 'Failed to save e-book', severity: 'error' });
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await toggleStatus({ id, isActive: !currentStatus }).unwrap();
      setToast({ open: true, message: `E-book ${!currentStatus ? 'published' : 'hidden'}`, severity: 'success' });
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string } };
      setToast({ open: true, message: apiErr.data?.error || 'Failed to update status', severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deleteEbook(deleteId).unwrap();
      setToast({ open: true, message: 'E-book deleted successfully', severity: 'success' });
      setDeleteId(null);
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string } };
      setToast({ open: true, message: apiErr.data?.error || 'Failed to delete e-book', severity: 'error' });
    }
  };

  const columns: DataTableColumn<EbookItem>[] = [
    {
      key: 'title',
      header: 'Title / Author',
      render: (item: EbookItem) => (
        <Stack spacing={0.5}>
          <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }}>
            {item.title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            By {item.author}
          </Typography>
        </Stack>
      ),
    },
    {
      key: 'publishedAt',
      header: 'Publish Date',
      render: (item: EbookItem) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {formatDate(item.publishedAt)}
        </Typography>
      ),
    },
    {
      key: 'file',
      header: 'PDF Document',
      render: (item: EbookItem) =>
        item.fileUrl ? (
          <Button
            component="a"
            href={resolveUploadUrl(item.fileUrl)}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            startIcon={<PictureAsPdfRoundedIcon sx={{ fontSize: 16 }} />}
            sx={{ fontWeight: 700, textTransform: 'none' }}
          >
            {item.fileName || 'View PDF'}
          </Button>
        ) : (
          <Chip label="No PDF attached" size="small" variant="outlined" sx={{ color: 'text.secondary' }} />
        ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: EbookItem) => (
        <Chip label={item.isActive ? 'Published' : 'Hidden'} size="small" color={item.isActive ? 'success' : 'default'} sx={{ fontWeight: 700 }} />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (item: EbookItem) => (
        <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
          <Tooltip title={item.isActive ? 'Hide from public website' : 'Publish publicly'}>
            <IconButton size="small" color={item.isActive ? 'success' : 'default'} onClick={() => handleToggleStatus(item.id, item.isActive)}>
              {item.isActive ? <VisibilityRoundedIcon fontSize="small" /> : <VisibilityOffRoundedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit E-book">
            <IconButton size="small" color="primary" onClick={() => handleOpenEdit(item)}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete E-book">
            <IconButton size="small" color="error" onClick={() => setDeleteId(item.id)}>
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <AdminLayout user={user} title="eBook Library Management">
      <Stack spacing={4}>
        {/* Metric Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          <StatCard label="Total eBooks" value={String(ebooks.length)} icon={<MenuBookRoundedIcon fontSize="large" />} color="secondary" />
          <StatCard label="Published" value={String(activeCount)} icon={<VisibilityRoundedIcon fontSize="large" />} color="success" />
          <StatCard label="Hidden / Draft" value={String(draftCount)} icon={<VisibilityOffRoundedIcon fontSize="large" />} color="warning" />
        </Box>

        {/* Toolbar & Add Action */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            All eBooks ({ebooks.length})
          </Typography>
          <Button variant="contained" color="secondary" startIcon={<AddRoundedIcon />} onClick={handleOpenCreate}>
            Add eBook
          </Button>
        </Stack>

        {/* Data Table */}
        {isEbooksLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid<EbookItem>
            title="eBook Library"
            rows={ebooks}
            getRowKey={(item: EbookItem) => item.id}
            getSearchValue={(item: EbookItem) => `${item.title} ${item.author} ${item.description}`}
            loading={isFetching}
            onRefresh={() => {
              refetch();
            }}
            columns={columns}
          />
        )}
      </Stack>

      {/* Create / Edit Dialog */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth component="form" onSubmit={handleSave}>
        <DialogTitle sx={{ fontWeight: 700 }}>{editingEbook ? 'Edit eBook' : 'Add eBook'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="eBook Title"
              fullWidth
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. The Inclusive Hiring Playbook"
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Author / Team"
                fullWidth
                required
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                placeholder="e.g. Corporate Engagement Team"
              />
              <TextField
                label="Publish Date"
                type="date"
                fullWidth
                required
                value={form.publishedAt}
                onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Stack>

            <TextField
              label="eBook Description / Summary"
              fullWidth
              required
              multiline
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="A practical guide for HR teams and hiring managers..."
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                  PDF Document File
                </Typography>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  id="ebook-pdf-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="ebook-pdf-upload">
                  <Button variant="outlined" component="span" fullWidth startIcon={<PictureAsPdfRoundedIcon />}>
                    {selectedFile ? selectedFile.name : editingEbook?.fileName ? `Change PDF` : 'Choose PDF File'}
                  </Button>
                </label>
                {selectedFile && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'success.main', fontWeight: 600 }}>
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                )}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                  Tile Cover Image File (Optional)
                </Typography>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  id="ebook-cover-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCoverFile(e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="ebook-cover-upload">
                  <Button variant="outlined" component="span" fullWidth>
                    {coverFile ? coverFile.name : form.coverImageUrl ? 'Change Cover Image' : 'Choose Cover Image'}
                  </Button>
                </label>
                {coverFile && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'success.main', fontWeight: 600 }}>
                    Selected: {coverFile.name} ({(coverFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                )}
                {!coverFile && form.coverImageUrl && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }} noWrap>
                    Current: {form.coverImageUrl}
                  </Typography>
                )}
              </Box>
            </Stack>

            <FormControlLabel
              control={<Switch checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} color="success" />}
              label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Publish publicly on website</Typography>}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            {editingEbook ? 'Save Changes' : 'Upload & Create eBook'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Are you sure you want to delete this e-book? This action will permanently remove the record, PDF document, and cover image.</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete eBook
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
