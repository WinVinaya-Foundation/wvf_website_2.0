import DocumentGridSection from './DocumentGridSection';
import { researchResources } from '../../../pages/about/reportsContent';
import { useGetPublicReportsQuery } from '../../../store/api/reportsApi';

export default function ResearchResourcesSection() {
  const { data: apiReports } = useGetPublicReportsQuery({ category: 'RESEARCH' });
  const documents =
    apiReports && apiReports.length > 0
      ? apiReports.map((r) => ({
          title: r.title,
          year: r.year || undefined,
          description: r.description || undefined,
          fileUrl: r.fileUrl,
        }))
      : researchResources;

  return (
    <DocumentGridSection
      title="Insights & Best Practices"
      description="Research and practical guides from our own experience training and placing persons with disabilities."
      documents={documents}
      titleId="research-resources-heading"
      bgcolor="background.default"
      footerLink={{ label: 'Explore how we partner with employers on inclusive hiring', to: '/involve/corporate-engagement' }}
    />
  );
}
