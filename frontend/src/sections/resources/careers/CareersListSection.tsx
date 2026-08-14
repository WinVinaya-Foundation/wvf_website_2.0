import { useState } from 'react';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import WorkOffRoundedIcon from '@mui/icons-material/WorkOffRounded';
import { SectionContainer, SectionHeading } from '../../../components';
import { jobOpenings } from '../../../pages/resources/careersContent';
import JobCard from './JobCard';

type StatusFilter = 'active' | 'closed';

/** Job openings list — an Active / Closed tab switch above a stack of job cards. */
export default function CareersListSection() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active');

  const activeJobs = jobOpenings.filter((job) => job.status === 'active');
  const closedJobs = jobOpenings.filter((job) => job.status === 'closed');
  const visibleJobs = statusFilter === 'active' ? activeJobs : closedJobs;

  return (
    <SectionContainer bgcolor="background.paper" labelledBy="careers-list-heading">
      <SectionHeading
        eyebrow="Open Roles"
        title="Current Openings"
        description="Every role below works directly on closing India's disability employment gap — not adjacent to it."
        align="left"
        titleId="careers-list-heading"
      />

      <Tabs
        value={statusFilter}
        onChange={(_event, value: StatusFilter) => setStatusFilter(value)}
        sx={{
          mb: 4,
          minHeight: 0,
          borderBottom: '1px solid',
          borderColor: (theme) => alpha(theme.palette.divider, 0.8),
          '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', minHeight: 0, py: 1.5 },
        }}
      >
        <Tab value="active" label={`Active Openings (${activeJobs.length})`} />
        <Tab value="closed" label={`Closed Positions (${closedJobs.length})`} />
      </Tabs>

      {visibleJobs.length > 0 ? (
        <Stack spacing={2.5}>
          {visibleJobs.map((job) => (
            <JobCard key={job.title} job={job} />
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: 'center',
            border: '1px dashed',
            borderColor: 'divider',
          }}
        >
          <WorkOffRoundedIcon sx={{ fontSize: 36, color: 'text.secondary', mb: 1.5 }} />
          <Typography sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
            {statusFilter === 'active' ? 'No active openings right now' : 'No closed positions to show yet'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {statusFilter === 'active' ? 'Check back soon, or send us your resume anyway.' : 'Check back here once a role has been filled.'}
          </Typography>
        </Box>
      )}
    </SectionContainer>
  );
}
