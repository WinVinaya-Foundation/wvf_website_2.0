import DocumentGridSection from './DocumentGridSection';
import { financialReports } from '../../../pages/about/reportsContent';
import { useGetPublicReportsQuery } from '../../../store/api/reportsApi';

export default function FinancialReportsSection() {
  const { data: apiReports } = useGetPublicReportsQuery({ category: 'FINANCIAL' });
  const documents =
    apiReports && apiReports.length > 0
      ? apiReports.map((r) => ({
          title: r.title,
          year: r.year || undefined,
          description: r.description || undefined,
          fileUrl: r.fileUrl,
        }))
      : financialReports;

  return (
    <DocumentGridSection
      title="Financial Transparency"
      description="Independently audited financial statements, published annually for full donor and stakeholder visibility."
      documents={documents}
      titleId="financial-reports-heading"
      bgcolor="background.default"
    />
  );
}
