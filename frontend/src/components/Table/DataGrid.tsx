import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TablePagination,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { Button } from '../Button';
import { Card } from '../Card';
import { AppDialog } from '../Dialog';
import { TextField } from '../Input';
import DataTable, { type DataTableColumn } from './Table';
import { exportRowsToExcel, type ExportColumn } from './exportToExcel';

const DEBOUNCE_MS = 250;

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export interface DataGridProps<T> {
  title: string;
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  /** Text a row is matched against when searching. Omit to hide the search box entirely. */
  getSearchValue?: (row: T) => string;
  searchPlaceholder?: string;
  /** Shows a refresh button in the header; awaited so the spinner reflects real completion. */
  onRefresh?: () => void | Promise<void>;
  /** External loading state (e.g. initial fetch) — also spins the refresh button. */
  loading?: boolean;
  emptyMessage?: string;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  stickyHeader?: boolean;
  maxHeight?: number | string;
  /** Base file name (no extension). Set together with exportColumns to show the Export button. */
  exportFileName?: string;
  /** Column shape for the exported file — separate from `columns` since those render JSX, not cell values. */
  exportColumns?: ExportColumn<T>[];
  /** Fetches the full date-filtered dataset for the "All records" export scope (e.g. a backend
   * call bypassing whatever row cap `rows` was loaded with). Falls back to the already-loaded
   * `rows`, unfiltered by date, if omitted. */
  onExportAll?: (range: { from: string | null; to: string | null }) => Promise<T[]>;
}

export default function DataGrid<T>({
  title,
  columns,
  rows,
  getRowKey,
  getSearchValue,
  searchPlaceholder = 'Search…',
  onRefresh,
  loading = false,
  emptyMessage = 'No data yet',
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRowsPerPage = 10,
  stickyHeader,
  maxHeight,
  exportFileName,
  exportColumns,
  onExportAll,
}: DataGridProps<T>) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS).trim();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [refreshing, setRefreshing] = useState(false);

  const [exportOpen, setExportOpen] = useState(false);
  const [exportScope, setExportScope] = useState<'page' | 'all'>('page');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const filteredRows = useMemo(() => {
    if (!getSearchValue || !debouncedSearch) return rows;
    const query = debouncedSearch.toLowerCase();
    return rows.filter((row) => getSearchValue(row).toLowerCase().includes(query));
  }, [rows, getSearchValue, debouncedSearch]);

  // Whenever the visible set changes shape (new search, refreshed data), the current
  // page can point past the end — snap back to the first page rather than show a blank one.
  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, rows]);

  const pageRows = useMemo(
    () => filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, page, rowsPerPage],
  );

  async function handleRefresh() {
    if (!onRefresh || refreshing) return;
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }

  function openExportDialog() {
    setExportScope('page');
    setFromDate('');
    setToDate('');
    setExportError(null);
    setExportOpen(true);
  }

  async function handleExport() {
    if (!exportFileName || !exportColumns) return;

    if (exportScope === 'all' && fromDate && toDate && fromDate > toDate) {
      setExportError('"From" date must be on or before "To" date');
      return;
    }

    setExportError(null);
    setExporting(true);
    try {
      const exportRows =
        exportScope === 'page'
          ? pageRows
          : onExportAll
            ? await onExportAll({ from: fromDate || null, to: toDate || null })
            : rows;

      await exportRowsToExcel(exportRows, exportColumns, `${exportFileName}-${todayIso()}.xlsx`);
      setExportOpen(false);
    } catch {
      setExportError('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  }

  const isBusy = loading || refreshing;
  const canExport = !!exportFileName && !!exportColumns;
  const resolvedEmptyMessage = debouncedSearch && filteredRows.length === 0 ? `No results for "${debouncedSearch}"` : emptyMessage;

  return (
    <Card sx={{ '&:hover': { boxShadow: (theme) => theme.shadows[2], transform: 'none' } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between', p: { xs: 2, sm: 2.5 } }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          {getSearchValue && (
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label={searchPlaceholder}
              sx={{ minWidth: { xs: '100%', sm: 260 } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
          {canExport && (
            <Button variant="outlined" color="primary" size="small" startIcon={<FileDownloadRoundedIcon />} onClick={openExportDialog}>
              Export
            </Button>
          )}
          {onRefresh && (
            <Tooltip title="Refresh">
              <span>
                <IconButton onClick={handleRefresh} disabled={isBusy} aria-label="Refresh">
                  {isBusy ? <CircularProgress size={20} /> : <RefreshRoundedIcon />}
                </IconButton>
              </span>
            </Tooltip>
          )}
        </Stack>
      </Stack>

      <Divider />

      <DataTable
        columns={columns}
        rows={pageRows}
        getRowKey={getRowKey}
        emptyMessage={resolvedEmptyMessage}
        stickyHeader={stickyHeader}
        maxHeight={maxHeight}
        disableContainerStyles
      />

      <Divider />

      <Box sx={{ px: { xs: 1, sm: 1.5 } }}>
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={(_event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Box>

      {canExport && (
        <AppDialog
          open={exportOpen}
          onClose={() => !exporting && setExportOpen(false)}
          title="Export to Excel"
          fullWidth
          maxWidth="xs"
          actions={
            <>
              <Button onClick={() => setExportOpen(false)} disabled={exporting}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleExport} disabled={exporting} startIcon={exporting ? <CircularProgress size={16} color="inherit" /> : undefined}>
                {exporting ? 'Exporting…' : 'Export'}
              </Button>
            </>
          }
        >
          <Stack spacing={2.5}>
            {exportError && <Alert severity="error">{exportError}</Alert>}

            <RadioGroup value={exportScope} onChange={(event) => setExportScope(event.target.value as 'page' | 'all')}>
              <FormControlLabel value="page" control={<Radio />} label={`Current page (${pageRows.length} rows)`} />
              <FormControlLabel value="all" control={<Radio />} label="All records" />
            </RadioGroup>

            <Stack direction="row" spacing={2}>
              <TextField
                label="From"
                type="date"
                size="small"
                fullWidth
                disabled={exportScope !== 'all'}
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="To"
                type="date"
                size="small"
                fullWidth
                disabled={exportScope !== 'all'}
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Stack>
            {exportScope === 'all' && (
              <Typography variant="caption" color="text.secondary">
                Leave dates blank to export the entire history.
              </Typography>
            )}
          </Stack>
        </AppDialog>
      )}
    </Card>
  );
}
