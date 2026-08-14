import MuiChip from '@mui/material/Chip';

export type StatusChipStatus = 'success' | 'warning' | 'error' | 'info' | 'default';

interface StatusChipProps {
  status: StatusChipStatus;
  label: string;
}

export default function StatusChip({ status, label }: StatusChipProps) {
  return <MuiChip size="small" label={label} color={status} variant={status === 'default' ? 'outlined' : 'filled'} />;
}
