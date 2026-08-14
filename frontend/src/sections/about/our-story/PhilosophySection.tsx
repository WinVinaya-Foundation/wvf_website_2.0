import { PullQuote } from '../../../components';
import { ourPhilosophy } from '../../../pages/about/ourStoryContent';

export default function PhilosophySection() {
  return (
    <PullQuote
      eyebrow="Our Philosophy"
      quote={ourPhilosophy.title}
      body={ourPhilosophy.body}
      titleId="philosophy-heading"
    />
  );
}
