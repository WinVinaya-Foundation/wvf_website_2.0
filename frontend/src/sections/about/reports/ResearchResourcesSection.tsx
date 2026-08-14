import DocumentGridSection from './DocumentGridSection';
import { researchResources } from '../../../pages/about/reportsContent';

export default function ResearchResourcesSection() {
  return (
    <DocumentGridSection
      title="Insights & Best Practices"
      description="Research and practical guides from our own experience training and placing persons with disabilities."
      documents={researchResources}
      titleId="research-resources-heading"
      bgcolor="background.default"
      footerLink={{ label: 'Explore how we partner with employers on inclusive hiring', to: '/involve/corporate-engagement' }}
    />
  );
}
