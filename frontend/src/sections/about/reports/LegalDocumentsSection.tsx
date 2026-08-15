import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import AccountBalanceRounded from '@mui/icons-material/AccountBalanceRounded';
import { DocumentCard, SectionContainer, SectionHeading } from '../../../components';
import { legalDocuments } from '../../../pages/about/reportsContent';
import { useGetPublicReportsQuery } from '../../../store/api/reportsApi';

/** Distinctly styled — a tinted band, not another plain white/grey section — because this is
 * the block corporate donors and CSR teams actually came here to check. */
export default function LegalDocumentsSection() {
  const { data: apiReports } = useGetPublicReportsQuery({ category: 'LEGAL' });
  return (
    <SectionContainer
      bgcolor={(theme) => alpha(theme.palette.secondary.main, 0.06)}
      labelledBy="legal-documents-heading"
    >
      <SectionHeading
        eyebrow={legalDocuments.eyebrow}
        title={legalDocuments.title}
        description={legalDocuments.body}
        titleId="legal-documents-heading"
      />

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          flexWrap: 'wrap',
          rowGap: 1,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 999,
          px: 2.5,
          py: 1.25,
          mb: 4,
        }}
      >
        <AccountBalanceRounded aria-hidden="true" fontSize="small" sx={{ color: 'secondary.main' }} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Registered Trust
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Registration No. {legalDocuments.registrationNumber}
        </Typography>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
        {(apiReports && apiReports.length > 0
          ? apiReports.map((r) => ({
              title: r.title,
              description: r.description || undefined,
              fileUrl: r.fileUrl as string | undefined,
            }))
          : legalDocuments.documents.map((d) => ({
              title: d.title,
              description: d.description,
              fileUrl: undefined as string | undefined,
            }))
        ).map((doc) => (
          <DocumentCard key={doc.title} title={doc.title} description={doc.description} fileUrl={doc.fileUrl} icon={<VerifiedRounded />} />
        ))}
      </Box>
    </SectionContainer>
  );
}
