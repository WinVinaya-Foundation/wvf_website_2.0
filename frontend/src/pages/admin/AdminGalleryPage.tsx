import { useState, type ChangeEvent } from 'react';
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
  IconButton,
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
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { DataGrid, StatCard, StatusChip } from '../../components';
import { useAdminSession } from '../../hooks/useAdminSession';
import {
  useGetAdminAlbumsQuery,
  useCreateAlbumMutation,
  useUpdateAlbumMutation,
  useToggleAlbumStatusMutation,
  useDeleteAlbumMutation,
  useAddPhotosMutation,
  useDeletePhotoMutation,
  type GalleryAlbumItem,
} from '../../store/api/galleryApi';
import { useGetCategoriesQuery } from '../../store/api/categoriesApi';
import { CATEGORY_COLOR_MAP } from '../../sections/programs/events-gallery/categoryVisuals';
import { resolveUploadUrl } from '../../utils/uploads';
import CategoryQuickAddDialog from './CategoryQuickAddDialog';

interface PendingPhoto {
  file: File;
  caption: string;
}

interface AlbumFormState {
  title: string;
  categoryId: string;
  dateLabel: string;
  isActive: boolean;
}

const emptyAlbumForm: AlbumFormState = {
  title: '',
  categoryId: '',
  dateLabel: '',
  isActive: true,
};

function filesToPending(files: FileList): PendingPhoto[] {
  return Array.from(files).map((file) => ({ file, caption: '' }));
}

export default function AdminGalleryPage() {
  const { user, isLoading: isSessionLoading } = useAdminSession();
  const { data: galleryData, isFetching: isAlbumsFetching, refetch } = useGetAdminAlbumsQuery();
  const { data: categories = [], isFetching: isCategoriesFetching } = useGetCategoriesQuery();

  const [createAlbum, { isLoading: isCreating }] = useCreateAlbumMutation();
  const [updateAlbum, { isLoading: isUpdating }] = useUpdateAlbumMutation();
  const [toggleStatus] = useToggleAlbumStatusMutation();
  const [deleteAlbum, { isLoading: isDeleting }] = useDeleteAlbumMutation();
  const [addPhotos, { isLoading: isAddingPhotos }] = useAddPhotosMutation();
  const [deletePhoto] = useDeletePhotoMutation();

  const [activeTab, setActiveTab] = useState<'ALL' | string>('ALL');
  const [albumModalOpen, setAlbumModalOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbumItem | null>(null);
  const [albumForm, setAlbumForm] = useState<AlbumFormState>(emptyAlbumForm);
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);

  const [managingAlbum, setManagingAlbum] = useState<GalleryAlbumItem | null>(null);
  const [newPendingPhotos, setNewPendingPhotos] = useState<PendingPhoto[]>([]);
  const [deletePhotoTarget, setDeletePhotoTarget] = useState<{ albumId: string; photoId: string } | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  if (isSessionLoading || !user || !galleryData) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const { albums, maxFileSizeMb } = galleryData;

  const totalCount = albums.length;
  const activeCount = albums.filter((a) => a.isActive).length;
  const photoTotal = albums.reduce((sum, a) => sum + a.photos.length, 0);

  const filteredAlbums = albums.filter((album) => activeTab === 'ALL' || album.category?.id === activeTab);

  const currentManagingAlbum = managingAlbum ? albums.find((a) => a.id === managingAlbum.id) ?? null : null;

  function handleOpenCreateModal() {
    setEditingAlbum(null);
    setAlbumForm({
      ...emptyAlbumForm,
      categoryId: categories[0]?.id || '',
    });
    setPendingPhotos([]);
    setAlbumModalOpen(true);
  }

  function handleOpenEditModal(album: GalleryAlbumItem) {
    setEditingAlbum(album);
    setAlbumForm({
      title: album.title,
      categoryId: album.category?.id || categories[0]?.id || '',
      dateLabel: album.dateLabel,
      isActive: album.isActive,
    });
    setPendingPhotos([]);
    setAlbumModalOpen(true);
  }

  function handlePendingFilesChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const oversized = Array.from(e.target.files).find((f) => f.size > maxFileSizeMb * 1024 * 1024);
    if (oversized) {
      setToast({ open: true, message: `"${oversized.name}" exceeds the ${maxFileSizeMb} MB limit`, severity: 'error' });
      return;
    }
    setPendingPhotos((prev) => [...prev, ...filesToPending(e.target.files!)]);
    e.target.value = '';
  }

  function handleNewPendingFilesChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const oversized = Array.from(e.target.files).find((f) => f.size > maxFileSizeMb * 1024 * 1024);
    if (oversized) {
      setToast({ open: true, message: `"${oversized.name}" exceeds the ${maxFileSizeMb} MB limit`, severity: 'error' });
      return;
    }
    setNewPendingPhotos((prev) => [...prev, ...filesToPending(e.target.files!)]);
    e.target.value = '';
  }

  async function handleSaveAlbum() {
    if (!albumForm.title.trim() || !albumForm.categoryId || !albumForm.dateLabel.trim()) {
      setToast({ open: true, message: 'Title, category, and date label are required', severity: 'error' });
      return;
    }

    try {
      if (editingAlbum) {
        await updateAlbum({
          id: editingAlbum.id,
          data: {
            title: albumForm.title.trim(),
            categoryId: albumForm.categoryId,
            dateLabel: albumForm.dateLabel.trim(),
            isActive: albumForm.isActive,
          },
        }).unwrap();
        setToast({ open: true, message: 'Album updated successfully!', severity: 'success' });
      } else {
        const formData = new FormData();
        formData.append('title', albumForm.title.trim());
        formData.append('categoryId', albumForm.categoryId);
        formData.append('dateLabel', albumForm.dateLabel.trim());
        formData.append('isActive', String(albumForm.isActive));
        pendingPhotos.forEach((p) => formData.append('photos', p.file));
        formData.append('photosMeta', JSON.stringify(pendingPhotos.map((p) => ({ caption: p.caption, altText: p.caption }))));

        await createAlbum(formData).unwrap();
        setToast({ open: true, message: 'Album created successfully!', severity: 'success' });
      }

      setAlbumModalOpen(false);
      refetch();
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string }; message?: string };
      setToast({ open: true, message: apiErr.data?.error || apiErr.message || 'Failed to save album', severity: 'error' });
    }
  }

  async function handleToggleActive(album: GalleryAlbumItem) {
    try {
      await toggleStatus({ id: album.id, isActive: !album.isActive }).unwrap();
      setToast({
        open: true,
        message: `Album "${album.title}" is now ${!album.isActive ? 'Active' : 'Inactive'}`,
        severity: 'success',
      });
    } catch {
      setToast({ open: true, message: 'Failed to update album visibility', severity: 'error' });
    }
  }

  async function handleDeleteConfirmed() {
    if (!deleteConfirmId) return;
    try {
      await deleteAlbum(deleteConfirmId).unwrap();
      setToast({ open: true, message: 'Album deleted successfully', severity: 'success' });
      setDeleteConfirmId(null);
      refetch();
    } catch {
      setToast({ open: true, message: 'Failed to delete album', severity: 'error' });
    }
  }

  async function handleAddPhotos() {
    if (!managingAlbum || newPendingPhotos.length === 0) return;
    try {
      const formData = new FormData();
      newPendingPhotos.forEach((p) => formData.append('photos', p.file));
      formData.append('photosMeta', JSON.stringify(newPendingPhotos.map((p) => ({ caption: p.caption, altText: p.caption }))));

      await addPhotos({ albumId: managingAlbum.id, formData }).unwrap();
      setToast({ open: true, message: 'Photos added successfully!', severity: 'success' });
      setNewPendingPhotos([]);
      refetch();
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string }; message?: string };
      setToast({ open: true, message: apiErr.data?.error || apiErr.message || 'Failed to add photos', severity: 'error' });
    }
  }

  async function handleDeletePhotoConfirmed() {
    if (!deletePhotoTarget) return;
    try {
      await deletePhoto(deletePhotoTarget).unwrap();
      setToast({ open: true, message: 'Photo deleted successfully', severity: 'success' });
      setDeletePhotoTarget(null);
      refetch();
    } catch {
      setToast({ open: true, message: 'Failed to delete photo', severity: 'error' });
    }
  }

  return (
    <AdminLayout user={user} title="Gallery Management">
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Gallery Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Create photo albums and manage the photos shown in the public Gallery section.
            </Typography>
          </Box>
          <MuiButton
            variant="contained"
            color="primary"
            startIcon={<AddRoundedIcon />}
            onClick={handleOpenCreateModal}
            sx={{ borderRadius: 2, textTransform: 'none', px: 2.5, py: 1 }}
          >
            Add New Album
          </MuiButton>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          <StatCard icon={<CollectionsRoundedIcon />} label="Total Albums" value={totalCount.toString()} color="primary" />
          <StatCard icon={<CheckCircleRoundedIcon />} label="Active (Public)" value={activeCount.toString()} color="success" />
          <StatCard icon={<PhotoLibraryRoundedIcon />} label="Total Photos" value={photoTotal.toString()} color="secondary" />
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_e, newValue) => setActiveTab(newValue)} variant="scrollable" scrollButtons="auto">
            <Tab label={`All Albums (${albums.length})`} value="ALL" />
            {categories.map((cat) => (
              <Tab
                key={cat.id}
                label={`${cat.label} (${albums.filter((a) => a.category?.id === cat.id).length})`}
                value={cat.id}
              />
            ))}
          </Tabs>
        </Box>

        <DataGrid
          title="Albums List"
          columns={[
            {
              key: 'album',
              header: 'Album',
              render: (row) => (
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Box
                    component="img"
                    src={row.photos[0] ? resolveUploadUrl(row.photos[0].imageUrl) : undefined}
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 1.5,
                      objectFit: 'cover',
                      bgcolor: 'action.hover',
                      display: row.photos[0] ? 'block' : 'none',
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{row.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {row.dateLabel} • {row.photos.length} photo{row.photos.length === 1 ? '' : 's'}
                    </Typography>
                  </Box>
                </Stack>
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
                  <Tooltip title="Manage Photos">
                    <MuiButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setManagingAlbum(row);
                        setNewPendingPhotos([]);
                      }}
                      sx={{ minWidth: 0, p: 1 }}
                    >
                      <PhotoLibraryRoundedIcon fontSize="small" />
                    </MuiButton>
                  </Tooltip>
                  <Tooltip title="Edit Album">
                    <MuiButton size="small" color="info" onClick={() => handleOpenEditModal(row)} sx={{ minWidth: 0, p: 1 }}>
                      <EditRoundedIcon fontSize="small" />
                    </MuiButton>
                  </Tooltip>
                  <Tooltip title="Delete Album">
                    <MuiButton size="small" color="error" onClick={() => setDeleteConfirmId(row.id)} sx={{ minWidth: 0, p: 1 }}>
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </MuiButton>
                  </Tooltip>
                </Stack>
              ),
            },
          ]}
          rows={filteredAlbums}
          getRowKey={(row) => row.id}
          getSearchValue={(row) => `${row.title} ${row.dateLabel} ${row.category?.label || ''}`}
          searchPlaceholder="Search albums by title or date..."
          onRefresh={() => { refetch(); }}
          loading={isAlbumsFetching || isCategoriesFetching}
          emptyMessage="No albums found"
          stickyHeader
          maxHeight={580}
        />
      </Stack>

      {/* Create / Edit Album Modal */}
      <Dialog open={albumModalOpen} onClose={() => setAlbumModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{editingAlbum ? 'Edit Album' : 'Add New Album'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 0.5 }}>
            <TextField
              label="Album Title"
              fullWidth
              required
              value={albumForm.title}
              onChange={(e) => setAlbumForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Academy Graduation Day"
            />

            <Box>
              <FormControl fullWidth required>
                <InputLabel id="album-category-label">Category</InputLabel>
                <Select
                  labelId="album-category-label"
                  value={albumForm.categoryId}
                  label="Category"
                  onChange={(e) => setAlbumForm((f) => ({ ...f, categoryId: e.target.value }))}
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

            <TextField
              label="Date Label"
              fullWidth
              required
              value={albumForm.dateLabel}
              onChange={(e) => setAlbumForm((f) => ({ ...f, dateLabel: e.target.value }))}
              placeholder="e.g. March 2026 Batch"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={albumForm.isActive}
                  onChange={(e) => setAlbumForm((f) => ({ ...f, isActive: e.target.checked }))}
                  color="success"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Active (Show on public Gallery page)
                </Typography>
              }
            />

            {!editingAlbum && (
              <Box sx={{ border: '2px dashed', borderColor: 'divider', borderRadius: 2, p: 2.5, bgcolor: 'action.hover' }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
                  <CloudUploadRoundedIcon color="action" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Initial Photos (Optional)
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                  JPG, PNG or WEBP — max {maxFileSizeMb} MB each. You can add more photos later.
                </Typography>
                <MuiButton component="label" variant="outlined" size="small">
                  Select Photos
                  <input type="file" hidden multiple accept="image/jpeg,image/png,image/webp" onChange={handlePendingFilesChange} />
                </MuiButton>

                {pendingPhotos.length > 0 && (
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    {pendingPhotos.map((p, index) => (
                      <Stack key={`${p.file.name}-${index}`} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={URL.createObjectURL(p.file)}
                          sx={{ width: 40, height: 40, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }}
                        />
                        <TextField
                          size="small"
                          fullWidth
                          placeholder="Caption (optional)"
                          value={p.caption}
                          onChange={(e) =>
                            setPendingPhotos((prev) => prev.map((item, i) => (i === index ? { ...item, caption: e.target.value } : item)))
                          }
                        />
                        <IconButton size="small" onClick={() => setPendingPhotos((prev) => prev.filter((_, i) => i !== index))}>
                          <CloseRoundedIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <MuiButton onClick={() => setAlbumModalOpen(false)} color="inherit">
            Cancel
          </MuiButton>
          <MuiButton
            onClick={handleSaveAlbum}
            variant="contained"
            disabled={isCreating || isUpdating}
            startIcon={isCreating || isUpdating ? <CircularProgress size={16} /> : undefined}
          >
            {editingAlbum ? 'Save Changes' : 'Create Album'}
          </MuiButton>
        </DialogActions>
      </Dialog>

      {/* Shared Quick Add Category Dialog */}
      <CategoryQuickAddDialog
        open={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
        onCategoryCreated={(newCat) => {
          setAlbumForm((f) => ({ ...f, categoryId: newCat.id }));
          setToast({ open: true, message: `Category "${newCat.label}" created!`, severity: 'success' });
        }}
      />

      {/* Manage Photos Dialog */}
      <Dialog open={!!managingAlbum} onClose={() => setManagingAlbum(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Manage Photos — {currentManagingAlbum?.title}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5}>
            {currentManagingAlbum && currentManagingAlbum.photos.length > 0 && (
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
                {currentManagingAlbum.photos.map((photo) => (
                  <Box key={photo.id} sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={resolveUploadUrl(photo.imageUrl)}
                      alt={photo.altText || photo.caption || ''}
                      sx={{ width: '100%', aspectRatio: '4 / 3', borderRadius: 1.5, objectFit: 'cover', display: 'block' }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => setDeletePhotoTarget({ albumId: currentManagingAlbum.id, photoId: photo.id })}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        bgcolor: 'rgba(0,0,0,0.55)',
                        color: 'common.white',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' },
                      }}
                    >
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}

            <Box sx={{ border: '2px dashed', borderColor: 'divider', borderRadius: 2, p: 2.5, bgcolor: 'action.hover' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
                <CloudUploadRoundedIcon color="action" />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Add Photos
                </Typography>
              </Stack>
              <MuiButton component="label" variant="outlined" size="small">
                Select Photos
                <input type="file" hidden multiple accept="image/jpeg,image/png,image/webp" onChange={handleNewPendingFilesChange} />
              </MuiButton>

              {newPendingPhotos.length > 0 && (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  {newPendingPhotos.map((p, index) => (
                    <Stack key={`${p.file.name}-${index}`} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Box
                        component="img"
                        src={URL.createObjectURL(p.file)}
                        sx={{ width: 40, height: 40, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }}
                      />
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Caption (optional)"
                        value={p.caption}
                        onChange={(e) =>
                          setNewPendingPhotos((prev) => prev.map((item, i) => (i === index ? { ...item, caption: e.target.value } : item)))
                        }
                      />
                      <IconButton size="small" onClick={() => setNewPendingPhotos((prev) => prev.filter((_, i) => i !== index))}>
                        <CloseRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  ))}
                  <MuiButton
                    onClick={handleAddPhotos}
                    variant="contained"
                    size="small"
                    disabled={isAddingPhotos}
                    startIcon={isAddingPhotos ? <CircularProgress size={14} /> : undefined}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Upload {newPendingPhotos.length} Photo{newPendingPhotos.length === 1 ? '' : 's'}
                  </MuiButton>
                </Stack>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <MuiButton onClick={() => setManagingAlbum(null)} variant="contained">
            Done
          </MuiButton>
        </DialogActions>
      </Dialog>

      {/* Delete Album Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Album Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this album? This will permanently remove it and all its photos from the database and disk.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <MuiButton onClick={() => setDeleteConfirmId(null)} color="inherit">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleDeleteConfirmed} color="error" variant="contained" disabled={isDeleting}>
            Delete Album
          </MuiButton>
        </DialogActions>
      </Dialog>

      {/* Delete Photo Confirmation Dialog */}
      <Dialog open={!!deletePhotoTarget} onClose={() => setDeletePhotoTarget(null)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Photo Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this photo?</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <MuiButton onClick={() => setDeletePhotoTarget(null)} color="inherit">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleDeletePhotoConfirmed} color="error" variant="contained">
            Delete Photo
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
