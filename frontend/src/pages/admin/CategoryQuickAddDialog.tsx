import { useState } from 'react';
import {
  Alert,
  Box,
  Button as MuiButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import { Chip } from '../../components';
import {
  useCreateCategoryMutation,
  type CategoryColor,
  type CategoryItem,
} from '../../store/api/categoriesApi';
import { CATEGORY_COLOR_MAP } from '../../sections/programs/events-gallery/categoryVisuals';

export interface CategoryQuickAddDialogProps {
  open: boolean;
  onClose: () => void;
  onCategoryCreated?: (category: CategoryItem) => void;
}

const colorOptions: { value: CategoryColor; label: string }[] = [
  { value: 'PRIMARY', label: 'Primary (Blue)' },
  { value: 'SECONDARY', label: 'Secondary (Teal)' },
  { value: 'INFO', label: 'Info (Cyan)' },
  { value: 'WARNING', label: 'Warning (Amber)' },
  { value: 'SUCCESS', label: 'Success (Green)' },
  { value: 'ERROR', label: 'Error (Red)' },
];

export default function CategoryQuickAddDialog({ open, onClose, onCategoryCreated }: CategoryQuickAddDialogProps) {
  const [label, setLabel] = useState('');
  const [color, setColor] = useState<CategoryColor>('PRIMARY');
  const [errorMsg, setErrorMsg] = useState('');

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  function handleClose() {
    setLabel('');
    setColor('PRIMARY');
    setErrorMsg('');
    onClose();
  }

  async function handleSubmit() {
    if (!label.trim()) {
      setErrorMsg('Category name is required');
      return;
    }
    setErrorMsg('');

    try {
      const created = await createCategory({ label: label.trim(), color }).unwrap();
      if (onCategoryCreated) {
        onCategoryCreated(created);
      }
      handleClose();
    } catch (err: unknown) {
      const apiErr = err as { data?: { error?: string }; message?: string };
      setErrorMsg(apiErr.data?.error || apiErr.message || 'Failed to create category');
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AddRoundedIcon color="primary" />
        <span>Add New Category</span>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5} sx={{ pt: 0.5 }}>
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          <TextField
            label="Category Name"
            fullWidth
            required
            autoFocus
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Orientation & Workshops"
          />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 600, fontSize: 13, mb: 1, display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <PaletteRoundedIcon fontSize="small" />
              <span>Theme Color</span>
            </FormLabel>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {colorOptions.map((opt) => (
                <Chip
                  key={opt.value}
                  label={opt.label}
                  color={CATEGORY_COLOR_MAP[opt.value]}
                  variant={color === opt.value ? 'filled' : 'outlined'}
                  onClick={() => setColor(opt.value)}
                  sx={{ fontWeight: color === opt.value ? 700 : 500, cursor: 'pointer' }}
                />
              ))}
            </Box>
          </FormControl>

          {label.trim() && (
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'action.hover', border: '1px dashed', borderColor: 'divider' }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 600 }}>
                Badge Preview:
              </Typography>
              <Chip label={label.trim()} color={CATEGORY_COLOR_MAP[color]} size="small" sx={{ fontWeight: 700 }} />
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <MuiButton onClick={handleClose} color="inherit" disabled={isLoading}>
          Cancel
        </MuiButton>
        <MuiButton
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isLoading || !label.trim()}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          Create Category
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
}
