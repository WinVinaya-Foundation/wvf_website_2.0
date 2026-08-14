import { Box } from '@mui/material';
import { PersonCard, SectionContainer, SectionHeading } from '../../../components';
import { advisors } from '../../../pages/about/ourTeamContent';

export default function AdvisorsSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="advisors-heading">
      <SectionHeading
        eyebrow="Guidance"
        title="Board of Advisors"
        description="Experienced voices who help shape our strategy and impact."
        titleId="advisors-heading"
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: `repeat(${advisors.length}, 1fr)` },
          gap: 3,
          maxWidth: 1100,
          mx: 'auto',
        }}
      >
        {advisors.map((person) => (
          <PersonCard
            key={person.name}
            name={person.name}
            role={person.role}
            photo={person.photo}
            linkedin={person.linkedin}
            twitter={person.twitter}
            email={person.email}
            size="md"
          />
        ))}
      </Box>
    </SectionContainer>
  );
}
