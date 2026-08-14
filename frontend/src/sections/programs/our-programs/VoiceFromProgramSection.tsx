import { PullQuote } from '../../../components';
import { voiceFromProgramContent } from '../../../pages/programs/ourProgramsContent';

export default function VoiceFromProgramSection() {
  return (
    <PullQuote
      eyebrow={voiceFromProgramContent.eyebrow}
      quote={voiceFromProgramContent.quote}
      body={`— ${voiceFromProgramContent.author}, ${voiceFromProgramContent.role}`}
      titleId="voice-from-program-heading"
      bgcolor="background.paper"
    />
  );
}
