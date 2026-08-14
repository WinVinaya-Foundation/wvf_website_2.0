import DocumentGridSection from './DocumentGridSection';
import { financialReports } from '../../../pages/about/reportsContent';

export default function FinancialReportsSection() {
  return (
    <DocumentGridSection
      title="Financial Transparency"
      description="Independently audited financial statements, published annually for full donor and stakeholder visibility."
      documents={financialReports}
      titleId="financial-reports-heading"
      bgcolor="background.default"
    />
  );
}
