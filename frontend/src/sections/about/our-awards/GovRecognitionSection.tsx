import AccountBalanceRounded from '@mui/icons-material/AccountBalanceRounded';
import NarrativeSection from '../shared/NarrativeSection';
import { govRecognition } from '../../../pages/about/awardsContent';

export default function GovRecognitionSection() {
  return (
    <NarrativeSection
      eyebrow={govRecognition.eyebrow}
      title={govRecognition.title}
      body={govRecognition.body}
      icon={<AccountBalanceRounded />}
      bgcolor="background.paper"
      titleId="gov-recognition-heading"
      link={govRecognition.link}
    />
  );
}
