import type { ReactNode } from 'react';
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  type DialogProps as MuiDialogProps,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export interface AppDialogProps extends Omit<MuiDialogProps, 'title'> {
  title: ReactNode;
  actions?: ReactNode;
  onClose: () => void;
  children: ReactNode;
}

export default function AppDialog({ title, actions, onClose, children, ...dialogProps }: AppDialogProps) {
  return (
    <MuiDialog onClose={onClose} slotProps={{ paper: { sx: { borderRadius: 3 } } }} {...dialogProps}>
      <Stack
        direction="row"
        sx={{ alignItems: 'center', justifyContent: 'space-between', pl: 3, pr: 1.5, py: 1.5 }}
      >
        <DialogTitle sx={{ p: 0, fontWeight: 700 }}>{title}</DialogTitle>
        <IconButton onClick={onClose} aria-label="Close dialog" size="small">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
      <DialogContent dividers sx={{ px: 3 }}>
        {children}
      </DialogContent>
      {actions && <DialogActions sx={{ px: 3, py: 2 }}>{actions}</DialogActions>}
    </MuiDialog>
  );
}
