import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import NarrativeSection from '../shared/NarrativeSection';
import { recognitionMeaning } from '../../../pages/about/awardsContent';

export default function RecognitionMeaningSection() {
  return (
    <NarrativeSection
      eyebrow={recognitionMeaning.eyebrow}
      title={recognitionMeaning.title}
      body={recognitionMeaning.body}
      icon={<VerifiedRounded />}
      bgcolor="background.default"
      titleId="recognition-meaning-heading"
      accent="secondary"
    />
  );
}
