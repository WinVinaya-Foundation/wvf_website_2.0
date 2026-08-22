import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Avatar, Chip, SectionContainer, SectionHeading } from '../../../components';
import { alumni } from '../../../pages/about/ourTeamContent';
import { personInitials, personPhotoUrl } from '../../../utils/person';

export default function AlumniSection() {
  return (
    <SectionContainer bgcolor="background.default" labelledBy="alumni-heading">
      <SectionHeading
        eyebrow="With Gratitude"
        title="Alumni & Past Team"
        description="WinVinaya wouldn't be what it is without everyone who has been part of this journey."
        titleId="alumni-heading"
      />
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.25,
        }}
      >
        {alumni.map((person) => (
          <Box component="li" key={person.name}>
            <Chip
              label={person.name}
              variant="outlined"
              avatar={
                <Avatar
                  src={person.photo || personPhotoUrl(person.name)}
                  alt=""
                  sx={{
                    bgcolor: 'secondary.light',
                    color: 'secondary.contrastText',
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {personInitials(person.name)}
                </Avatar>
              }
              sx={{
                borderColor: 'divider',
                color: 'text.secondary',
                bgcolor: 'background.paper',
                pl: 0.25,
                '& .MuiChip-avatar': {
                  boxShadow: (theme) => `0 0 0 2px ${alpha(theme.palette.secondary.main, 0.12)}`,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </SectionContainer>
  );
}
