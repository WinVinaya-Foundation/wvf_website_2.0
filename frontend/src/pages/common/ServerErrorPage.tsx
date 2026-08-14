import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { Link } from '@tanstack/react-router';
import { Button, StatusPage } from '../../components';

export default function ServerErrorPage() {
  return (
    <StatusPage
      icon={<ErrorOutlineRoundedIcon fontSize="inherit" />}
      eyebrow="Error 500"
      title="Something went wrong"
      description="An unexpected error occurred on our end. Please try again in a moment."
      action={
        <Button component={Link} to="/" variant="contained" color="primary">
          Back to home
        </Button>
      }
    />
  );
}
