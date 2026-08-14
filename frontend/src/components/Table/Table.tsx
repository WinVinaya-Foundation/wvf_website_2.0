import type { ReactNode } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyMessage?: string;
  stickyHeader?: boolean;
  maxHeight?: number | string;
  /** Drops the container's own border/radius — for nesting inside another bordered
   * surface (e.g. DataGrid's Card) where an outer boundary already exists. */
  disableContainerStyles?: boolean;
}

export default function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = 'No data yet',
  stickyHeader = false,
  maxHeight,
  disableContainerStyles = false,
}: DataTableProps<T>) {
  return (
    <TableContainer
      sx={disableContainerStyles ? { maxHeight } : { border: '1px solid', borderColor: 'divider', borderRadius: 2, maxHeight }}
    >
      <MuiTable stickyHeader={stickyHeader}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} align={column.align} sx={{ width: column.width, fontWeight: 700 }}>
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} sx={{ textAlign: 'center', py: 6 }}>
                <Typography color="text.secondary">{emptyMessage}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={getRowKey(row)} hover>
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align}>
                    {column.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
