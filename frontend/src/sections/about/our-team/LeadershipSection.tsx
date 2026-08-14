import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { PersonCard, SectionContainer, SectionHeading } from '../../../components';
import { leadership } from '../../../pages/about/ourTeamContent';

export default function LeadershipSection() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -100,
          right: -120,
          width: 340,
          height: 340,
          borderRadius: '50%',
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.09),
          filter: 'blur(90px)',
        }}
      />

      <SectionContainer bgcolor="background.paper" labelledBy="leadership-heading">
        <SectionHeading
          eyebrow="Leadership"
          title="Founders & Trustee"
          description="The people who started it all and continue to guide our mission."
          titleId="leadership-heading"
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 4,
            maxWidth: 1080,
            mx: 'auto',
          }}
        >
          {leadership.map((person) => (
            <PersonCard
              key={person.name}
              name={person.name}
              role={person.role}
              photo={person.photo}
              linkedin={person.linkedin}
              twitter={person.twitter}
              email={person.email}
              size="lg"
            />
          ))}
        </Box>
      </SectionContainer>
    </Box>
  );
}
