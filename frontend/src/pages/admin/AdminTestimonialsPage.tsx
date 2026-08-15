import { useState, useMemo } from 'react';
import {
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
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { DataGrid, StatCard, StatusChip, RichTextEditor, countWords, type DataTableColumn } from '../../components';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { useAdminSession } from '../../hooks/useAdminSession';
import {
  useGetAdminTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useToggleTestimonialStatusMutation,
  useDeleteTestimonialMutation,
  type TestimonialItem,
  type TestimonialCategoryType,
} from '../../store/api/testimonialsApi';

const MAX_NAME_WORDS = 15;
const MAX_ROLE_WORDS = 20;
const MAX_QUOTE_WORDS = 120;

export default function AdminTestimonialsPage() {
  const { user, isLoading: isSessionLoading } = useAdminSession();
  const { data: testimonials = [], isLoading, isFetching, refetch } = useGetAdminTestimonialsQuery();
  const [createTestimonial] = useCreateTestimonialMutation();
  const [updateTestimonial] = useUpdateTestimonialMutation();
  const [toggleStatus] = useToggleTestimonialStatusMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const [filterCategory, setFilterCategory] = useState<'ALL' | TestimonialCategoryType>('ALL');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form State
  const [category, setCategory] = useState<TestimonialCategoryType>('CANDIDATE');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [disability, setDisability] = useState('');
  const [title, setTitle] = useState('');
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);

  // Delete State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Error Messages
  const [nameError, setNameError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [quoteError, setQuoteError] = useState('');

  const nameWordCount = useMemo(() => countWords(name), [name]);
  const roleWordCount = useMemo(() => countWords(role), [role]);
  const quoteWordCount = useMemo(() => countWords(quote), [quote]);

  const candidateCount = useMemo(() => testimonials.filter((t) => t.category === 'CANDIDATE').length, [testimonials]);
  const corporateCount = useMemo(() => testimonials.filter((t) => t.category === 'CORPORATE').length, [testimonials]);
  const institutionalCount = useMemo(() => testimonials.filter((t) => t.category === 'INSTITUTIONAL').length, [testimonials]);

  const filteredTestimonials = useMemo(() => {
    if (filterCategory === 'ALL') return testimonials;
    return testimonials.filter((t) => t.category === filterCategory);
  }, [testimonials, filterCategory]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setCategory('CANDIDATE');
    setName('');
    setRole('');
    setQuote('');
    setDisability('');
    setTitle('');
    setSortOrder(testimonials.length + 1);
    setIsActive(true);

    setNameError('');
    setRoleError('');
    setQuoteError('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setCategory(item.category);
    setName(item.name);
    setRole(item.role);
    setQuote(item.quote);
    setDisability(item.disability || '');
    setTitle(item.title || '');
    setSortOrder(item.sortOrder);
    setIsActive(item.isActive);

    setNameError('');
    setRoleError('');
    setQuoteError('');
    setModalOpen(true);
  };

  const validateForm = (): boolean => {
    let valid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    } else if (nameWordCount > MAX_NAME_WORDS) {
      setNameError(`Name exceeds limit of ${MAX_NAME_WORDS} words (current: ${nameWordCount})`);
      valid = false;
    } else {
      setNameError('');
    }

    if (!role.trim()) {
      setRoleError('Role / Designation is required');
      valid = false;
    } else if (roleWordCount > MAX_ROLE_WORDS) {
      setRoleError(`Role exceeds limit of ${MAX_ROLE_WORDS} words (current: ${roleWordCount})`);
      valid = false;
    } else {
      setRoleError('');
    }

    if (!quote.trim() || quote === '<p><br></p>') {
      setQuoteError('Quote content is required');
      valid = false;
    } else if (quoteWordCount > MAX_QUOTE_WORDS) {
      setQuoteError(`Quote exceeds limit of ${MAX_QUOTE_WORDS} words (current: ${quoteWordCount})`);
      valid = false;
    } else {
      setQuoteError('');
    }

    return valid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const payload = {
      category,
      name: name.trim(),
      role: role.trim(),
      quote: quote.trim(),
      disability: disability.trim() || undefined,
      title: title.trim() || undefined,
      sortOrder,
      isActive,
    };

    try {
      if (editingItem) {
        await updateTestimonial({ id: editingItem.id, data: payload }).unwrap();
      } else {
        await createTestimonial(payload).unwrap();
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Failed to save testimonial:', err);
    }
  };

  const handleToggleStatus = async (item: TestimonialItem) => {
    try {
      await toggleStatus({ id: item.id, isActive: !item.isActive }).unwrap();
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      await deleteTestimonial(deletingId).unwrap();
      setDeleteDialogOpen(false);
      setDeletingId(null);
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
    }
  };

  const columns: DataTableColumn<TestimonialItem>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item: TestimonialItem) => (
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {item.name}
          </Typography>
          {item.disability && (
            <Chip label={item.disability} size="small" variant="outlined" color="primary" sx={{ width: 'fit-content' }} />
          )}
        </Stack>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (item: TestimonialItem) => {
        const colorMap: Record<TestimonialCategoryType, 'primary' | 'secondary' | 'warning'> = {
          CANDIDATE: 'primary',
          CORPORATE: 'secondary',
          INSTITUTIONAL: 'warning',
        };
        return <Chip label={item.category} size="small" color={colorMap[item.category]} />;
      },
    },
    {
      key: 'role',
      header: 'Role / Designation',
      render: (item: TestimonialItem) => (
        <Typography variant="body2" color="text.secondary">
          {item.role}
        </Typography>
      ),
    },
    {
      key: 'quote',
      header: 'Quote / Feedback',
      render: (item: TestimonialItem) => (
        <Typography
          variant="body2"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            maxWidth: 360,
          }}
          dangerouslySetInnerHTML={{ __html: item.quote }}
        />
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: TestimonialItem) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <StatusChip status={item.isActive ? 'success' : 'default'} label={item.isActive ? 'Active' : 'Hidden'} />
          <Switch size="small" checked={item.isActive} onChange={() => handleToggleStatus(item)} />
        </Stack>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: TestimonialItem) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" startIcon={<EditRoundedIcon />} onClick={() => handleOpenEdit(item)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteRoundedIcon />}
            onClick={() => {
              setDeletingId(item.id);
              setDeleteDialogOpen(true);
            }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  if (isSessionLoading || !user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AdminLayout user={user} title="Testimonials & Voices">
      <Stack spacing={3}>
        {/* Header Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' }, gap: 2 }}>
          <StatCard label="Total Testimonials" value={String(testimonials.length)} icon={<FormatQuoteRoundedIcon />} color="primary" />
          <StatCard label="Candidate Voices" value={String(candidateCount)} icon={<RecordVoiceOverRoundedIcon />} color="success" />
          <StatCard label="Corporate Partners" value={String(corporateCount)} icon={<BusinessCenterRoundedIcon />} color="secondary" />
          <StatCard label="Institutional Partners" value={String(institutionalCount)} icon={<SchoolRoundedIcon />} color="warning" />
        </Box>

        {/* Category Tabs & Add Action */}
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: { xs: 1, sm: 0 } }}>
            <Button
              variant={filterCategory === 'ALL' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterCategory('ALL')}
            >
              All ({testimonials.length})
            </Button>
            <Button
              variant={filterCategory === 'CANDIDATE' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterCategory('CANDIDATE')}
            >
              Candidates ({candidateCount})
            </Button>
            <Button
              variant={filterCategory === 'CORPORATE' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterCategory('CORPORATE')}
            >
              Corporate ({corporateCount})
            </Button>
            <Button
              variant={filterCategory === 'INSTITUTIONAL' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterCategory('INSTITUTIONAL')}
            >
              Institutional ({institutionalCount})
            </Button>
          </Stack>

          <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={handleOpenCreate}>
            Add Testimonial
          </Button>
        </Stack>

        {/* Data Table */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid<TestimonialItem>
            title="Testimonials & Voices"
            rows={filteredTestimonials}
            getRowKey={(item) => item.id}
            getSearchValue={(item) => `${item.name} ${item.role} ${item.quote}`}
            loading={isFetching}
            onRefresh={() => {
              refetch();
            }}
            columns={columns}
          />
        )}
      </Stack>

      {/* Create / Edit Dialog */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="testimonial-category-label">Voice Category</InputLabel>
              <Select
                labelId="testimonial-category-label"
                value={category}
                label="Voice Category"
                onChange={(e) => setCategory(e.target.value as TestimonialCategoryType)}
              >
                <MenuItem value="CANDIDATE">Candidate Voice</MenuItem>
                <MenuItem value="CORPORATE">Corporate Partner Voice</MenuItem>
                <MenuItem value="INSTITUTIONAL">Institutional / Training Partner Voice</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Person / Organization Name
                </Typography>
                <Typography variant="caption" color={nameWordCount > MAX_NAME_WORDS ? 'error.main' : 'text.secondary'}>
                  {nameWordCount}/{MAX_NAME_WORDS} words
                </Typography>
              </Stack>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!nameError}
                helperText={nameError}
                placeholder="e.g. Harikumar or Corporate Hiring Partner"
              />
            </Box>

            <Box>
              <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Role / Designation
                </Typography>
                <Typography variant="caption" color={roleWordCount > MAX_ROLE_WORDS ? 'error.main' : 'text.secondary'}>
                  {roleWordCount}/{MAX_ROLE_WORDS} words
                </Typography>
              </Stack>
              <TextField
                fullWidth
                label="Role / Designation"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                error={!!roleError}
                helperText={roleError}
                placeholder="e.g. QA-Automation Engineer, Caterpillar"
              />
            </Box>

            {category === 'CANDIDATE' && (
              <TextField
                fullWidth
                label="Disability Tag (Optional)"
                value={disability}
                onChange={(e) => setDisability(e.target.value)}
                placeholder="e.g. Visual Impairment, Cerebral Palsy"
              />
            )}

            <RichTextEditor
              label="Testimonial Quote / Feedback"
              value={quote}
              onChange={(html) => setQuote(html)}
              maxWords={MAX_QUOTE_WORDS}
              error={!!quoteError}
              helperText={quoteError}
              placeholder="Enter quote or testimonial text..."
            />

            <Stack direction="row" spacing={2}>
              <TextField
                type="number"
                label="Sort Order"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                sx={{ width: 140 }}
              />
              <FormControlLabel
                control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
                label="Active on Public Website"
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Testimonial
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Testimonial</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this testimonial? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
