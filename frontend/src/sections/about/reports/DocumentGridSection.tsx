import { Box, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { Link } from '@tanstack/react-router';
import type { CtaLink, DocumentEntry } from '../../../model/content';
import { Button, DocumentCard, SectionContainer, SectionHeading } from '../../../components';

interface DocumentGridSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  documents: DocumentEntry[];
  titleId: string;
  bgcolor: string | ((theme: Theme) => string);
  /** A short, honestly-worded note about a gap or caveat in the list above — shown, not hidden. */
  note?: string;
  footerLink?: CtaLink;
}

/** Shared shape for the document-list sections (Annual Reports, Financial Reports, Research
 * Resources) — heading, then a grid of DocumentCards. */
export default function DocumentGridSection({
  eyebrow,
  title,
  description,
  documents,
  titleId,
  bgcolor,
  note,
  footerLink,
}: DocumentGridSectionProps) {
  return (
    <SectionContainer bgcolor={bgcolor} labelledBy={titleId}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} titleId={titleId} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {documents.map((doc) => (
          <DocumentCard
            key={`${doc.title}-${doc.year ?? doc.fileUrl ?? ''}`}
            title={doc.title}
            year={doc.year || undefined}
            description={doc.description || undefined}
            fileUrl={doc.fileUrl}
          />
        ))}
      </Box>
      {note && (
        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', mt: 3 }}>
          {note}
        </Typography>
      )}
      {footerLink && (
        <Button component={Link} to={footerLink.to} variant="text" color="primary" size="large" sx={{ mt: 3 }}>
          {footerLink.label} →
        </Button>
      )}
    </SectionContainer>
  );
}
