import { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { formatDateLabel } from '../../utils/dateFormat';

export interface DatePickerWithFormatProps {
  dateLabelValue: string;
  onChangeDateLabel: (newLabel: string) => void;
  required?: boolean;
}

export function DatePickerWithFormat({
  dateLabelValue,
  onChangeDateLabel,
  required = true,
}: DatePickerWithFormatProps) {
  const [pickedDate, setPickedDate] = useState<string>('');

  function handleDateChange(newDateStr: string) {
    setPickedDate(newDateStr);
    if (newDateStr) {
      // Formats picked date as Month Day, Year (e.g., November 15, 2026)
      const formatted = formatDateLabel(newDateStr, 'LONG_MONTH_DAY_YEAR');
      onChangeDateLabel(formatted);
    }
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <TextField
        type="date"
        label="Select Event Date"
        fullWidth
        value={pickedDate}
        onChange={(e) => handleDateChange(e.target.value)}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            startAdornment: <CalendarTodayRoundedIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />,
          },
        }}
      />

      <TextField
        label="Date Label (Public Text)"
        fullWidth
        required={required}
        value={dateLabelValue}
        onChange={(e) => onChangeDateLabel(e.target.value)}
        placeholder="e.g. November 15, 2026"
        helperText="Auto-formatted as Month Day, Year (e.g. November 15, 2026) when date is selected"
      />
    </Stack>
  );
}
