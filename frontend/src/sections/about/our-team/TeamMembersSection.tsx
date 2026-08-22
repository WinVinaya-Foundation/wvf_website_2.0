import { Box, Typography } from '@mui/material';
import { PersonCard, SectionContainer, SectionHeading } from '../../../components';
import { consultants, employees } from '../../../pages/about/ourTeamContent';

const GRID_COLUMNS = { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' };

export default function TeamMembersSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="team-members-heading">
      <SectionHeading
        eyebrow="The Team"
        title="The people behind the work"
        description="Our staff and consultants who deliver training, placement, and support every day."
        titleId="team-members-heading"
      />

      <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
        Employees
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: GRID_COLUMNS, gap: 2.5, mb: { xs: 5, md: 7 } }}>
        {employees.map((person) => (
          <PersonCard key={person.name} name={person.name} role={person.role} photo={person.photo} linkedin={person.linkedin} size="md" />
        ))}
      </Box>

      <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
        Consultants
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: GRID_COLUMNS, gap: 2.5 }}>
        {consultants.map((person) => (
          <PersonCard key={person.name} name={person.name} size="md" />
        ))}
      </Box>
    </SectionContainer>
  );
}
