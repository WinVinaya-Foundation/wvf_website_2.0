import DocumentGridSection from './DocumentGridSection';
import { annualReports, annualReportsGapNote } from '../../../pages/about/reportsContent';
import { useGetPublicReportsQuery } from '../../../store/api/reportsApi';

export default function AnnualReportsSection() {
  const { data: apiReports } = useGetPublicReportsQuery({ category: 'ANNUAL' });
  const documents =
    apiReports && apiReports.length > 0
      ? apiReports.map((r) => ({
          title: r.title,
          year: r.year || undefined,
          description: r.description || undefined,
          fileUrl: r.fileUrl,
        }))
      : annualReports;

  return (
    <DocumentGridSection
      title="Annual Reports"
      description="A year-by-year record of our programs, reach, and impact."
      documents={documents}
      titleId="annual-reports-heading"
      bgcolor="background.paper"
      note={annualReportsGapNote}
    />
  );
}
