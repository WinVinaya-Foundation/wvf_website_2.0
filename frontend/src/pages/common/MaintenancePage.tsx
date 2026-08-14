import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import { StatusPage } from '../../components';

export default function MaintenancePage() {
  return (
    <StatusPage
      icon={<BuildRoundedIcon fontSize="inherit" />}
      eyebrow="Under maintenance"
      title="We'll be right back"
      description="WinVinaya Foundation's website is currently undergoing scheduled maintenance. Please check back shortly."
    />
  );
}
