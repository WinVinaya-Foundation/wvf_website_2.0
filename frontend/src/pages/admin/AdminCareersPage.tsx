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
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { useAdminSession } from '../../hooks/useAdminSession';
import { DataGrid, StatCard, type DataTableColumn } from '../../components';
import {
  type JobItem,
  type EmploymentType,
  useGetAdminCareersQuery,
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useToggleCareerStatusMutation,
  useDeleteCareerMutation,
} from '../../store/api/careersApi';

interface CareerFormState {
  title: string;
  department: string;
  employmentType: EmploymentType;
  location: string;
  experience: string;
  description: string;
  requirements: string;
  isActive: boolean;
}

const initialFormState: CareerFormState = {
  title: '',
  department: '',
  employmentType: 'FULL_TIME',
  location: '',
  experience: '',
  description: '',
  requirements: '',
  isActive: true,
};

export default function AdminCareersPage() {
  const { user, isLoading: isSessionLoading } = useAdminSession();
  const { data: jobs = [], isLoading: isJobsLoading, isFetching, refetch } = useGetAdminCareersQuery();

  const [createCareer] = useCreateCareerMutation();
  const [updateCareer] = useUpdateCareerMutation();
  const [toggleStatus] = useToggleCareerStatusMutation();
  const [deleteCareer] = useDeleteCareerMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);
  const [form, setForm] = useState<CareerFormState>(initialFormState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const activeCount = jobs.filter((j) => j.isActive).length;
  const closedCount = jobs.length - activeCount;

  const handleOpenCreate = () => {
    setEditingJob(null);
    setSelectedFile(null);
    setForm(initialFormState);
    setModalOpen(true);
  };

  const handleOpenEdit = (job: JobItem) => {
    setEditingJob(job);
    setSelectedFile(null);
    setForm({
      title: job.title,
      department: job.department || '',
      employmentType: job.employmentType,
      location: job.location,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements || '',
      isActive: job.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.experience.trim() || !form.description.trim()) {
      setToast({ open: true, message: 'Title, location, experience, and description are required', severity: 'error' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', form.title.trim());
      formData.append('department', form.department.trim());
      formData.append('employmentType', form.employmentType);
      formData.append('location', form.location.trim());
      formData.append('experience', form.experience.trim());
      formData.append('description', form.description.trim());
      formData.append('requirements', form.requirements.trim());
      formData.append('isActive', String(form.isActive));

      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      if (editingJob) {
        await updateCareer({ id: editingJob.id, formData }).unwrap();
        setToast({ open: true, message: 'Job opening updated successfully', severity: 'success' });
      } else {
        await createCareer(formData).unwrap();
        setToast({ open: true, message: 'Job opening created successfully', severity: 'success' });
      }
      setModalOpen(false);
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string } };
      setToast({ open: true, message: apiErr.data?.error || 'Failed to save job opening', severity: 'error' });
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await toggleStatus({ id, isActive: !currentStatus }).unwrap();
      setToast({ open: true, message: `Job opening ${!currentStatus ? 'activated' : 'closed'}`, severity: 'success' });
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string } };
      setToast({ open: true, message: apiErr.data?.error || 'Failed to update status', severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deleteCareer(deleteId).unwrap();
      setToast({ open: true, message: 'Job opening deleted successfully', severity: 'success' });
      setDeleteId(null);
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string } };
      setToast({ open: true, message: apiErr.data?.error || 'Failed to delete job opening', severity: 'error' });
    }
  };

  const columns: DataTableColumn<JobItem>[] = [
    {
      key: 'title',
      header: 'Role / Department',
      render: (item: JobItem) => (
        <Stack spacing={0.5}>
          <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }}>
            {item.title}
          </Typography>
          {item.department && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              {item.department}
            </Typography>
          )}
        </Stack>
      ),
    },
    {
      key: 'details',
      header: 'Type & Experience',
      render: (item: JobItem) => (
        <Stack spacing={0.5}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'secondary.main' }}>
            {item.employmentType.replace('_', ' ')}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.825rem' }}>
            {item.experience} • {item.location}
          </Typography>
        </Stack>
      ),
    },
    {
      key: 'file',
      header: 'Job Description PDF',
      render: (item: JobItem) =>
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
      render: (item: JobItem) => (
        <Chip label={item.isActive ? 'Active' : 'Closed'} size="small" color={item.isActive ? 'success' : 'default'} sx={{ fontWeight: 700 }} />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (item: JobItem) => (
        <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
          <Tooltip title={item.isActive ? 'Mark as Closed' : 'Mark as Active'}>
            <IconButton size="small" color={item.isActive ? 'success' : 'default'} onClick={() => handleToggleStatus(item.id, item.isActive)}>
              {item.isActive ? <VisibilityRoundedIcon fontSize="small" /> : <VisibilityOffRoundedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Job Opening">
            <IconButton size="small" color="primary" onClick={() => handleOpenEdit(item)}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Job Opening">
            <IconButton size="small" color="error" onClick={() => setDeleteId(item.id)}>
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <AdminLayout user={user} title="Careers & Job Openings Management">
      <Stack spacing={4}>
        {/* Metric Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          <StatCard label="Total Roles" value={String(jobs.length)} icon={<WorkRoundedIcon fontSize="large" />} color="primary" />
          <StatCard label="Active Openings" value={String(activeCount)} icon={<VisibilityRoundedIcon fontSize="large" />} color="success" />
          <StatCard label="Closed Roles" value={String(closedCount)} icon={<VisibilityOffRoundedIcon fontSize="large" />} color="warning" />
        </Box>

        {/* Toolbar & Add Action */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Job Positions ({jobs.length})
          </Typography>
          <Button variant="contained" color="secondary" startIcon={<AddRoundedIcon />} onClick={handleOpenCreate}>
            Add Job Position
          </Button>
        </Stack>

        {/* Data Table */}
        {isJobsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid<JobItem>
            title="Careers Library"
            rows={jobs}
            getRowKey={(item: JobItem) => item.id}
            getSearchValue={(item: JobItem) => `${item.title} ${item.department} ${item.location} ${item.description}`}
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
        <DialogTitle sx={{ fontWeight: 700 }}>{editingJob ? 'Edit Job Opening' : 'Add Job Opening'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="Job Role Title"
              fullWidth
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Accessibility Engineer"
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Department"
                fullWidth
                value={form.department}
                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                placeholder="e.g. Engineering / Corporate Engagement"
              />
              <FormControl fullWidth required>
                <InputLabel id="employment-type-label">Employment Type</InputLabel>
                <Select
                  labelId="employment-type-label"
                  label="Employment Type"
                  value={form.employmentType}
                  onChange={(e) => setForm((f) => ({ ...f, employmentType: e.target.value as EmploymentType }))}
                >
                  <MenuItem value="FULL_TIME">Full-time</MenuItem>
                  <MenuItem value="PART_TIME">Part-time</MenuItem>
                  <MenuItem value="CONTRACT">Consultant / Contract</MenuItem>
                  <MenuItem value="INTERNSHIP">Internship</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Location"
                fullWidth
                required
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="e.g. Bengaluru, India (Hybrid)"
              />
              <TextField
                label="Required Experience"
                fullWidth
                required
                value={form.experience}
                onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                placeholder="e.g. 2–4 years"
              />
            </Stack>

            <TextField
              label="Role Overview / Summary"
              fullWidth
              required
              multiline
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Summary of responsibilities and scope..."
            />

            <TextField
              label="Requirements / Qualifications (Optional)"
              fullWidth
              multiline
              rows={3}
              value={form.requirements}
              onChange={(e) => setForm((f) => ({ ...f, requirements: e.target.value }))}
              placeholder="Key skills, technologies, or qualifications needed..."
            />

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                Job Description PDF Document
              </Typography>
              <input
                type="file"
                accept=".pdf,application/pdf"
                id="career-pdf-upload"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="career-pdf-upload">
                <Button variant="outlined" component="span" fullWidth startIcon={<PictureAsPdfRoundedIcon />}>
                  {selectedFile ? selectedFile.name : editingJob?.fileName ? 'Change PDF Document' : 'Upload Job Description PDF'}
                </Button>
              </label>
              {selectedFile && (
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'success.main', fontWeight: 600 }}>
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </Typography>
              )}
            </Box>

            <FormControlLabel
              control={<Switch checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} color="success" />}
              label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Active position (Listed publicly)</Typography>}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            {editingJob ? 'Save Changes' : 'Create Position'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Are you sure you want to delete this job opening? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete Position
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
