import DocumentGridSection from './DocumentGridSection';
import { annualReports, annualReportsGapNote } from '../../../pages/about/reportsContent';

export default function AnnualReportsSection() {
  return (
    <DocumentGridSection
      title="Annual Reports"
      description="A year-by-year record of our programs, reach, and impact."
      documents={annualReports}
      titleId="annual-reports-heading"
      bgcolor="background.paper"
      note={annualReportsGapNote}
    />
  );
}
