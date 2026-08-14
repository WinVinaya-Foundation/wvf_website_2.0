import ExcelJS from 'exceljs';

export interface ExportColumn<T> {
  header: string;
  value: (row: T) => string | number;
}

/** Builds a single-sheet workbook from rows and triggers a browser download. */
export async function exportRowsToExcel<T>(rows: T[], columns: ExportColumn<T>[], fileName: string): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Data');

  sheet.columns = columns.map((column) => ({ header: column.header, key: column.header, width: 22 }));
  sheet.getRow(1).font = { bold: true };

  for (const row of rows) {
    const record: Record<string, string | number> = {};
    for (const column of columns) {
      record[column.header] = column.value(row);
    }
    sheet.addRow(record);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
