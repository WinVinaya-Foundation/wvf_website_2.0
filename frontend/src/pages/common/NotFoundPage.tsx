import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { Link } from '@tanstack/react-router';
import { Button, StatusPage } from '../../components';

export default function NotFoundPage() {
  return (
    <StatusPage
      icon={<SearchOffRoundedIcon fontSize="inherit" />}
      eyebrow="Error 404"
      title="Page not found"
      description="The page you're looking for doesn't exist or may have been moved."
      action={
        <Button component={Link} to="/" variant="contained" color="primary">
          Back to home
        </Button>
      }
    />
  );
}
