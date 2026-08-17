import { Box } from '@mui/material';
import { SectionContainer, SectionHeading } from '../../../components';
import type { EbookItem } from '../../../store/api/ebookApi';
import EbookCard from './EbookCard';

export interface EbookListSectionProps {
  ebooks: EbookItem[];
}

/** Grid of all eBooks other than the featured one at the top of the page */
export default function EbookListSection({ ebooks }: EbookListSectionProps) {
  if (!ebooks || ebooks.length === 0) return null;

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="ebook-list-heading">
      <SectionHeading eyebrow="Browse the Library" title="More eBooks" align="left" titleId="ebook-list-heading" />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3.5 }}>
        {ebooks.map((ebook, index) => (
          // index + 1 keeps the accent cycle continuing from the featured eBook instead of resetting
          <EbookCard key={ebook.id} ebook={ebook} index={index + 1} />
        ))}
      </Box>
    </SectionContainer>
  );
}
