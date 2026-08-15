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
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { DataGrid, StatCard, StatusChip } from '../../components';
import { useAdminSession } from '../../hooks/useAdminSession';
import {
  useGetAdminReportsQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useToggleReportStatusMutation,
  useDeleteReportMutation,
  type ReportCategory,
  type ReportItem,
} from '../../store/api/reportsApi';
import { formatReportFileUrl } from '../../components/DocumentCard/DocumentCard';

const categoryLabels: Record<ReportCategory, string> = {
  ANNUAL: 'Annual Report',
  FINANCIAL: 'Financial Report',
  LEGAL: 'Legal Document',
  RESEARCH: 'Research & Insights',
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileIcon(mimeType: string, fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (mimeType.includes('pdf') || ext === 'pdf') {
    return <PictureAsPdfRoundedIcon color="error" />;
  }
  if (mimeType.includes('sheet') || mimeType.includes('excel') || ext === 'xls' || ext === 'xlsx') {
    return <TableChartRoundedIcon color="success" />;
  }
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint') || ext === 'ppt' || ext === 'pptx') {
    return <SlideshowRoundedIcon color="warning" />;
  }
  return <ArticleRoundedIcon color="primary" />;
}

export default function AdminReportsPage() {
  const { user, isLoading: isSessionLoading } = useAdminSession();
  const { data: adminReportsData, isFetching, refetch } = useGetAdminReportsQuery();

  const [createReport, { isLoading: isCreating }] = useCreateReportMutation();
  const [updateReport, { isLoading: isUpdating }] = useUpdateReportMutation();
  const [toggleStatus] = useToggleReportStatusMutation();
  const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();

  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<ReportItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ReportCategory>('ANNUAL');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Feedback state
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  if (isSessionLoading || !user || !adminReportsData) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const { reports, maxFileSizeMb } = adminReportsData;

  const totalCount = reports.length;
  const activeCount = reports.filter((r) => r.isActive).length;
  const inactiveCount = reports.filter((r) => !r.isActive).length;

  const filteredReports = reports.filter((report) => {
    if (activeTab === 'ALL') return true;
    return report.category === activeTab;
  });

  function handleOpenCreateModal() {
    setEditingReport(null);
    setTitle('');
    setCategory('ANNUAL');
    setYear('');
    setDescription('');
    setIsActive(true);
    setSelectedFile(null);
    setModalOpen(true);
  }

  function handleOpenEditModal(report: ReportItem) {
    setEditingReport(report);
    setTitle(report.title);
    setCategory(report.category);
    setYear(report.year || '');
    setDescription(report.description || '');
    setIsActive(report.isActive);
    setSelectedFile(null);
    setModalOpen(true);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > maxFileSizeMb * 1024 * 1024) {
        setToast({
          open: true,
          message: `File size exceeds maximum limit of ${maxFileSizeMb} MB`,
          severity: 'error',
        });
        return;
      }
      setSelectedFile(file);
    }
  }

  async function handleSaveReport() {
    if (!title.trim()) {
      setToast({ open: true, message: 'Title is required', severity: 'error' });
      return;
    }

    if (!editingReport && !selectedFile) {
      setToast({ open: true, message: 'Please select a document file to upload', severity: 'error' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('category', category);
      if (year.trim()) formData.append('year', year.trim());
      if (description.trim()) formData.append('description', description.trim());
      formData.append('isActive', String(isActive));

      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      if (editingReport) {
        await updateReport({ id: editingReport.id, formData }).unwrap();
        setToast({ open: true, message: 'Report updated successfully!', severity: 'success' });
      } else {
        await createReport(formData).unwrap();
        setToast({ open: true, message: 'Report uploaded and created successfully!', severity: 'success' });
      }

      setModalOpen(false);
      refetch();
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string }; message?: string };
      setToast({
        open: true,
        message: apiErr.data?.error || apiErr.message || 'Failed to save report',
        severity: 'error',
      });
    }
  }

  async function handleToggleActive(report: ReportItem) {
    try {
      await toggleStatus({ id: report.id, isActive: !report.isActive }).unwrap();
      setToast({
        open: true,
        message: `Report "${report.title}" is now ${!report.isActive ? 'Active' : 'Inactive'}`,
        severity: 'success',
      });
    } catch {
      setToast({ open: true, message: 'Failed to update report status', severity: 'error' });
    }
  }

  async function handleDeleteConfirmed() {
    if (!deleteConfirmId) return;
    try {
      await deleteReport(deleteConfirmId).unwrap();
      setToast({ open: true, message: 'Report deleted successfully', severity: 'success' });
      setDeleteConfirmId(null);
      refetch();
    } catch {
      setToast({ open: true, message: 'Failed to delete report', severity: 'error' });
    }
  }

  return (
    <AdminLayout user={user} title="Reports Management">
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Reports Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Upload, manage, and toggle visibility for public documents and reports.
            </Typography>
          </Box>
          <MuiButton
            variant="contained"
            color="primary"
            startIcon={<AddRoundedIcon />}
            onClick={handleOpenCreateModal}
            sx={{ borderRadius: 2, textTransform: 'none', px: 2.5, py: 1 }}
          >
            Upload New Report
          </MuiButton>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 2.5,
          }}
        >
          <StatCard icon={<DescriptionRoundedIcon />} label="Total Documents" value={totalCount.toString()} color="primary" />
          <StatCard icon={<CheckCircleRoundedIcon />} label="Active (Public)" value={activeCount.toString()} color="success" />
          <StatCard icon={<DescriptionRoundedIcon />} label="Inactive (Hidden)" value={inactiveCount.toString()} color="warning" />
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_e, newValue) => setActiveTab(newValue)} variant="scrollable" scrollButtons="auto">
            <Tab label={`All Reports (${reports.length})`} value="ALL" />
            <Tab label={`Annual Reports (${reports.filter((r) => r.category === 'ANNUAL').length})`} value="ANNUAL" />
            <Tab label={`Financial Reports (${reports.filter((r) => r.category === 'FINANCIAL').length})`} value="FINANCIAL" />
            <Tab label={`Legal Documents (${reports.filter((r) => r.category === 'LEGAL').length})`} value="LEGAL" />
            <Tab label={`Research & Insights (${reports.filter((r) => r.category === 'RESEARCH').length})`} value="RESEARCH" />
          </Tabs>
        </Box>

        <DataGrid
          title="Documents List"
          columns={[
            {
              key: 'document',
              header: 'Document Name',
              render: (row) => (
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'action.hover', display: 'flex', alignItems: 'center' }}>
                    {getFileIcon(row.mimeType, row.fileName)}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{row.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {row.fileName} • {formatBytes(row.fileSize)}
                    </Typography>
                  </Box>
                </Stack>
              ),
            },
            {
              key: 'category',
              header: 'Category',
              render: (row) => <Chip label={categoryLabels[row.category]} size="small" variant="outlined" color="primary" />,
            },
            {
              key: 'year',
              header: 'Period / Year',
              render: (row) => row.year || '—',
            },
            {
              key: 'status',
              header: 'Public Visibility',
              render: (row) => (
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Switch
                    size="small"
                    checked={row.isActive}
                    onChange={() => handleToggleActive(row)}
                    color="success"
                  />
                  <StatusChip
                    status={row.isActive ? 'success' : 'warning'}
                    label={row.isActive ? 'Active' : 'Inactive'}
                  />
                </Stack>
              ),
            },
            {
              key: 'actions',
              header: 'Actions',
              align: 'right',
              render: (row) => (
                <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                  <Tooltip title="View / Download Document">
                    <IconButton
                      component="a"
                      href={formatReportFileUrl(row.fileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      color="primary"
                    >
                      <VisibilityRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Metadata or Replace File">
                    <IconButton size="small" color="info" onClick={() => handleOpenEditModal(row)}>
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Document">
                    <IconButton size="small" color="error" onClick={() => setDeleteConfirmId(row.id)}>
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ),
            },
          ]}
          rows={filteredReports}
          getRowKey={(row) => row.id}
          getSearchValue={(row) => `${row.title} ${row.description ?? ''} ${row.year ?? ''} ${row.fileName}`}
          searchPlaceholder="Search reports by title, description or year..."
          onRefresh={() => { refetch(); }}
          loading={isFetching}
          emptyMessage="No reports found in this category"
          stickyHeader
          maxHeight={580}
        />
      </Stack>

      {/* Create / Edit Report Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingReport ? 'Edit Report Details' : 'Upload New Report'}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 0.5 }}>
            <TextField
              label="Document Title"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Report 2024–2025 or 80G Certificate"
            />

            <FormControl fullWidth required>
              <InputLabel id="category-select-label">Report Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={category}
                label="Report Category"
                onChange={(e) => setCategory(e.target.value as ReportCategory)}
              >
                <MenuItem value="ANNUAL">Annual Report</MenuItem>
                <MenuItem value="FINANCIAL">Financial Transparency Report</MenuItem>
                <MenuItem value="LEGAL">Legal Document & Certification</MenuItem>
                <MenuItem value="RESEARCH">Research & Insights Guide</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Period / Financial Year (Optional)"
              fullWidth
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. FY 2023–24 or 2024–2025"
            />

            <TextField
              label="Description (Optional)"
              fullWidth
              multiline
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short overview of the report contents..."
            />

            <FormControlLabel
              control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} color="success" />}
              label={
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Active (Show on public /about/reports page)
                </Typography>
              }
            />

            <Box sx={{ border: '2px dashed', borderColor: 'divider', borderRadius: 2, p: 3, textAlign: 'center', bgcolor: 'action.hover' }}>
              <CloudUploadRoundedIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {selectedFile ? selectedFile.name : editingReport ? 'Replace document file (Optional)' : 'Select Document File *'}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                Supported formats: <strong>PDF, PPT/PPTX, Word (DOC/DOCX), Excel (XLS/XLSX)</strong>
                <br />
                <strong>Max file size: {maxFileSizeMb} MB</strong>
              </Typography>
              <MuiButton component="label" variant="outlined" size="small">
                {selectedFile ? 'Change File' : 'Browse File'}
                <input type="file" hidden accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={handleFileChange} />
              </MuiButton>
              {selectedFile && (
                <Typography variant="caption" color="primary.main" sx={{ display: 'block', mt: 1, fontWeight: 600 }}>
                  Selected: {selectedFile.name} ({formatBytes(selectedFile.size)})
                </Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <MuiButton onClick={() => setModalOpen(false)} color="inherit">
            Cancel
          </MuiButton>
          <MuiButton
            onClick={handleSaveReport}
            variant="contained"
            disabled={isCreating || isUpdating}
            startIcon={(isCreating || isUpdating) ? <CircularProgress size={16} /> : undefined}
          >
            {editingReport ? 'Save Changes' : 'Upload Report'}
          </MuiButton>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Report Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this report document? This will permanently remove the record from the database and delete the file from the server's disk storage.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <MuiButton onClick={() => setDeleteConfirmId(null)} color="inherit">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleDeleteConfirmed} color="error" variant="contained" disabled={isDeleting}>
            Delete Report
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
