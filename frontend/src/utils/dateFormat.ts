export type DateFormatStyle =
  | 'LONG_MONTH_DAY_YEAR'
  | 'DAY_SHORT_MONTH_YEAR'
  | 'MONTH_YEAR'
  | 'SHORT_DATE';

export interface DateFormatOption {
  key: DateFormatStyle;
  label: string;
  example: string;
}

export const DATE_FORMAT_OPTIONS: DateFormatOption[] = [
  { key: 'LONG_MONTH_DAY_YEAR', label: 'Month Day, Year', example: 'November 15, 2026' },
  { key: 'DAY_SHORT_MONTH_YEAR', label: 'Day Short-Month Year', example: '15 Nov 2026' },
  { key: 'MONTH_YEAR', label: 'Month Year', example: 'September 2026' },
  { key: 'SHORT_DATE', label: 'DD/MM/YYYY', example: '15/11/2026' },
];

/**
 * Formats a Date object or YYYY-MM-DD date string into one of 3+ display format styles:
 * 1. LONG_MONTH_DAY_YEAR  -> "November 15, 2026"
 * 2. DAY_SHORT_MONTH_YEAR -> "15 Nov 2026"
 * 3. MONTH_YEAR           -> "September 2026"
 * 4. SHORT_DATE           -> "15/11/2026"
 */
export function formatDateLabel(dateInput: Date | string, style: DateFormatStyle = 'LONG_MONTH_DAY_YEAR'): string {
  if (!dateInput) return '';

  let d: Date;
  if (typeof dateInput === 'string') {
    // If YYYY-MM-DD input, parse local date to avoid UTC offset shifts
    const parts = dateInput.split('-');
    if (parts.length === 3) {
      d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    } else {
      d = new Date(dateInput);
    }
  } else {
    d = dateInput;
  }

  if (isNaN(d.getTime())) return typeof dateInput === 'string' ? dateInput : '';

  const day = d.getDate();
  const year = d.getFullYear();

  const monthNamesLong = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const monthNamesShort = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const longMonth = monthNamesLong[d.getMonth()];
  const shortMonth = monthNamesShort[d.getMonth()];

  switch (style) {
    case 'LONG_MONTH_DAY_YEAR':
      return `${longMonth} ${day}, ${year}`;
    case 'DAY_SHORT_MONTH_YEAR':
      return `${day} ${shortMonth} ${year}`;
    case 'MONTH_YEAR':
      return `${longMonth} ${year}`;
    case 'SHORT_DATE':
      return `${day.toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${year}`;
    default:
      return `${longMonth} ${day}, ${year}`;
  }
}
