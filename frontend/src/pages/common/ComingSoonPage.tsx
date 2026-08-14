import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import { Link } from '@tanstack/react-router';
import { Button, StatusPage } from '../../components';

export default function ComingSoonPage() {
  return (
    <StatusPage
      icon={<ConstructionRoundedIcon fontSize="inherit" />}
      eyebrow="Coming soon"
      title="This page is on its way"
      description="We're building this section of the site. Please check back soon."
      action={
        <Button component={Link} to="/" variant="contained" color="primary">
          Back to home
        </Button>
      }
    />
  );
}
