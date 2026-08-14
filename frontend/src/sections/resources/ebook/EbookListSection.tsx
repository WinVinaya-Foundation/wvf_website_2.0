import { Box } from '@mui/material';
import { SectionContainer, SectionHeading } from '../../../components';
import { ebooks } from '../../../pages/resources/ebookContent';
import EbookCard from './EbookCard';

/** Grid of all eBooks other than the featured one at the top of the page */
export default function EbookListSection() {
  const otherEbooks = ebooks.slice(1);

  if (otherEbooks.length === 0) return null;

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="ebook-list-heading">
      <SectionHeading eyebrow="Browse the Library" title="More eBooks" align="left" titleId="ebook-list-heading" />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3.5 }}>
        {otherEbooks.map((ebook, index) => (
          // index + 1 keeps the accent cycle continuing from the featured eBook instead of resetting
          <EbookCard key={ebook.title} ebook={ebook} index={index + 1} />
        ))}
      </Box>
    </SectionContainer>
  );
}
