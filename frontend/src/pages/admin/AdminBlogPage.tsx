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
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AdminLayout from '../../layout/AdminLayout/AdminLayout';
import { DataGrid, StatCard, StatusChip, type DataTableColumn } from '../../components';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useGetCategoriesQuery, type CategoryItem } from '../../store/api/categoriesApi';
import CategoryQuickAddDialog from './CategoryQuickAddDialog';
import {
  useGetAdminBlogPostsQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useToggleBlogPostStatusMutation,
  useDeleteBlogPostMutation,
  type BlogPostItem,
  type BlogContentBlock,
} from '../../store/api/blogApi';

interface BlogFormState {
  title: string;
  slug: string;
  excerpt: string;
  categoryId: string;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  bodyText: string;
  coverImageUrl: string;
  bannerImageUrl: string;
  isActive: boolean;
}

const initialFormState: BlogFormState = {
  title: '',
  slug: '',
  excerpt: '',
  categoryId: '',
  authorName: 'WinVinaya Team',
  authorRole: 'WinVinaya Foundation',
  publishedAt: new Date().toISOString().split('T')[0],
  bodyText: '',
  coverImageUrl: '',
  bannerImageUrl: '',
  isActive: true,
};

function parseBodyTextToBlocks(text: string): BlogContentBlock[] {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.map((p) => {
    if (p.startsWith('# ')) {
      return { type: 'heading', text: p.replace(/^#\s+/, '') };
    }
    if (p.startsWith('## ')) {
      return { type: 'heading', text: p.replace(/^##\s+/, '') };
    }
    if (p.startsWith('> ')) {
      return { type: 'quote', text: p.replace(/^>\s+/, '') };
    }
    return { type: 'paragraph', text: p };
  });
}

function convertBlocksToBodyText(blocks: BlogContentBlock[]): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .map((block) => {
      if (block.type === 'heading') return `## ${block.text || ''}`;
      if (block.type === 'quote') return `> ${block.text || ''}`;
      if (block.type === 'bulletList' && Array.isArray(block.items)) return block.items.map((i) => `- ${i}`).join('\n');
      if (block.type === 'orderedList' && Array.isArray(block.items)) return block.items.map((i, idx) => `${idx + 1}. ${i}`).join('\n');
      return block.text || '';
    })
    .join('\n\n');
}

export default function AdminBlogPage() {
  const { user, isLoading: isSessionLoading } = useAdminSession();
  const { data: posts = [], isLoading: isPostsLoading, isFetching, refetch } = useGetAdminBlogPostsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();

  const [createPost] = useCreateBlogPostMutation();
  const [updatePost] = useUpdateBlogPostMutation();
  const [toggleStatus] = useToggleBlogPostStatusMutation();
  const [deletePost] = useDeleteBlogPostMutation();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [form, setForm] = useState<BlogFormState>(initialFormState);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const activeCount = useMemo(() => posts.filter((p) => p.isActive).length, [posts]);
  const hiddenCount = useMemo(() => posts.filter((p) => !p.isActive).length, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategoryId === 'ALL') return posts;
    return posts.filter((p) => p.categoryId === selectedCategoryId);
  }, [posts, selectedCategoryId]);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const handleOpenCreate = () => {
    setEditingPost(null);
    setCoverFile(null);
    setBannerFile(null);
    setForm({
      ...initialFormState,
      categoryId: categories[0]?.id || '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPostItem) => {
    setEditingPost(post);
    setCoverFile(null);
    setBannerFile(null);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      categoryId: post.categoryId,
      authorName: post.authorName,
      authorRole: post.authorRole,
      publishedAt: post.publishedAt.split('T')[0],
      bodyText: convertBlocksToBodyText(post.body),
      coverImageUrl: post.coverImageUrl || '',
      bannerImageUrl: post.bannerImageUrl || '',
      isActive: post.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!form.title.trim() || !form.excerpt.trim() || !form.categoryId) {
      setToast({ open: true, message: 'Title, excerpt, and category are required', severity: 'error' });
      return;
    }

    try {
      const parsedBody = parseBodyTextToBlocks(form.bodyText);

      const formData = new FormData();
      formData.append('title', form.title.trim());
      if (form.slug.trim()) formData.append('slug', form.slug.trim());
      formData.append('excerpt', form.excerpt.trim());
      formData.append('categoryId', form.categoryId);
      formData.append('authorName', form.authorName.trim());
      formData.append('authorRole', form.authorRole.trim());
      formData.append('publishedAt', form.publishedAt);
      formData.append('body', JSON.stringify(parsedBody));
      formData.append('coverImageUrl', form.coverImageUrl.trim());
      formData.append('bannerImageUrl', form.bannerImageUrl.trim());
      formData.append('isActive', String(form.isActive));

      if (coverFile) formData.append('coverImage', coverFile);
      if (bannerFile) formData.append('bannerImage', bannerFile);

      if (editingPost) {
        await updatePost({ id: editingPost.id, formData }).unwrap();
        setToast({ open: true, message: 'Blog post updated successfully', severity: 'success' });
      } else {
        await createPost(formData).unwrap();
        setToast({ open: true, message: 'Blog post created successfully', severity: 'success' });
      }

      setModalOpen(false);
      refetch();
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string }; message?: string };
      setToast({ open: true, message: apiErr.data?.error || apiErr.message || 'Failed to save blog post', severity: 'error' });
    }
  };

  const handleToggleActive = async (post: BlogPostItem) => {
    try {
      await toggleStatus({ id: post.id, isActive: !post.isActive }).unwrap();
      setToast({
        open: true,
        message: `Post "${post.title}" is now ${!post.isActive ? 'published' : 'hidden'}`,
        severity: 'success',
      });
      refetch();
    } catch {
      setToast({ open: true, message: 'Failed to update visibility', severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deletePost(deleteId).unwrap();
      setToast({ open: true, message: 'Blog post deleted successfully', severity: 'success' });
      setDeleteId(null);
      refetch();
    } catch {
      setToast({ open: true, message: 'Failed to delete blog post', severity: 'error' });
    }
  };

  if (isSessionLoading || !user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const columns: DataTableColumn<BlogPostItem>[] = [
    {
      key: 'title',
      header: 'Title & Excerpt',
      render: (item) => (
        <Stack spacing={0.5} sx={{ maxWidth: 360 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {item.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {item.excerpt}
          </Typography>
        </Stack>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (item) => {
        const colorMap: Record<string, 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error'> = {
          PRIMARY: 'primary',
          SECONDARY: 'secondary',
          INFO: 'info',
          WARNING: 'warning',
          SUCCESS: 'success',
          ERROR: 'error',
        };
        const color = colorMap[item.category?.color] || 'primary';
        return <Chip label={item.category?.label || 'General'} size="small" color={color} sx={{ fontWeight: 600 }} />;
      },
    },
    {
      key: 'author',
      header: 'Author',
      render: (item) => (
        <Stack spacing={0.25}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {item.authorName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.authorRole}
          </Typography>
        </Stack>
      ),
    },
    {
      key: 'date',
      header: 'Published Date',
      render: (item) => (
        <Typography variant="body2" color="text.secondary">
          {new Date(item.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
        </Typography>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <StatusChip status={item.isActive ? 'success' : 'default'} label={item.isActive ? 'Public' : 'Hidden'} />
          <Switch size="small" checked={item.isActive} onChange={() => handleToggleActive(item)} />
        </Stack>
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

          <Tooltip title="Edit Post">
            <IconButton size="small" onClick={() => handleOpenEdit(item)} color="primary">
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Post">
            <IconButton size="small" onClick={() => setDeleteId(item.id)} color="error">
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <AdminLayout user={user} title="Blog Posts Management">
      <Stack spacing={3}>
        {/* Header Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
          <StatCard label="Total Blog Articles" value={String(posts.length)} icon={<ArticleRoundedIcon />} color="primary" />
          <StatCard label="Published Publicly" value={String(activeCount)} icon={<VisibilityRoundedIcon />} color="success" />
          <StatCard label="Draft / Hidden" value={String(hiddenCount)} icon={<VisibilityOffRoundedIcon />} color="warning" />
        </Box>

        {/* Category Toolbar & Add Action */}
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: { xs: 1, sm: 0 } }}>
            <Button
              variant={selectedCategoryId === 'ALL' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setSelectedCategoryId('ALL')}
            >
              All Posts ({posts.length})
            </Button>
            {categories.map((cat: CategoryItem) => {
              const count = posts.filter((p) => p.categoryId === cat.id).length;
              return (
                <Button
                  key={cat.id}
                  variant={selectedCategoryId === cat.id ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedCategoryId(cat.id)}
                >
                  {cat.label} ({count})
                </Button>
              );
            })}
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<CategoryRoundedIcon />} onClick={() => setCategoryDialogOpen(true)}>
              Manage Categories
            </Button>
            <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={handleOpenCreate}>
              Add Blog Article
            </Button>
          </Stack>
        </Stack>

        {/* Data Table */}
        {isPostsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid<BlogPostItem>
            title="Blog Posts & Articles"
            rows={filteredPosts}
            getRowKey={(item) => item.id}
            getSearchValue={(item) => `${item.title} ${item.excerpt} ${item.authorName} ${item.category?.label}`}
            loading={isFetching}
            onRefresh={() => {
              refetch();
            }}
            columns={columns}
          />
        )}
      </Stack>

      {/* Create / Edit Article Dialog */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{editingPost ? 'Edit Blog Article' : 'Add New Blog Article'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="Article Title"
              fullWidth
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Why India's PWD Employment Rate Matters"
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="URL Slug (Optional)"
                fullWidth
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="Auto-generated from title if blank"
                helperText="URL-friendly identifier"
              />
              <FormControl fullWidth required>
                <InputLabel id="blog-category-label">Category</InputLabel>
                <Select
                  labelId="blog-category-label"
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
            </Stack>

            <TextField
              label="Short Excerpt / Summary"
              fullWidth
              required
              multiline
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              placeholder="A brief summary displayed on the blog hub card..."
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Author Name"
                fullWidth
                required
                value={form.authorName}
                onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
              />
              <TextField
                label="Author Role"
                fullWidth
                required
                value={form.authorRole}
                onChange={(e) => setForm((f) => ({ ...f, authorRole: e.target.value }))}
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

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                  Tile Image (Grid Cards)
                </Typography>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  id="blog-cover-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCoverFile(e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="blog-cover-upload">
                  <Button variant="outlined" component="span" fullWidth>
                    {coverFile ? coverFile.name : form.coverImageUrl ? 'Change Tile Image File' : 'Choose Tile Image File'}
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

              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                  Banner Image (Detail Header)
                </Typography>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  id="blog-banner-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setBannerFile(e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="blog-banner-upload">
                  <Button variant="outlined" component="span" fullWidth>
                    {bannerFile ? bannerFile.name : form.bannerImageUrl ? 'Change Banner Image File' : 'Choose Banner Image File'}
                  </Button>
                </label>
                {bannerFile && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'success.main', fontWeight: 600 }}>
                    Selected: {bannerFile.name} ({(bannerFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                )}
                {!bannerFile && form.bannerImageUrl && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }} noWrap>
                    Current: {form.bannerImageUrl}
                  </Typography>
                )}
              </Box>
            </Stack>

            <TextField
              label="Article Body (Paragraphs, ## Headings, > Quotes)"
              fullWidth
              required
              multiline
              rows={12}
              value={form.bodyText}
              onChange={(e) => setForm((f) => ({ ...f, bodyText: e.target.value }))}
              placeholder={'Enter paragraphs separated by double newlines.\nUse "## Heading" for subheadings.\nUse "> Quote text" for quotes.'}
              helperText="Double newline creates a new paragraph block. Use '##' for headings."
            />

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
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingPost ? 'Save Changes' : 'Create Article'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Category Quick Add Dialog */}
      <CategoryQuickAddDialog open={categoryDialogOpen} onClose={() => setCategoryDialogOpen(false)} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Are you sure you want to delete this blog post? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete Post
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
