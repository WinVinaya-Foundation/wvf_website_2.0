import FlagRounded from '@mui/icons-material/FlagRounded';
import VisibilityRounded from '@mui/icons-material/VisibilityRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import { ClosingCtaSection, MilestonesSection, NarrativeSection, PhilosophySection, StoryHeroSection } from '../../sections/about';
import { lookingAhead, theBeginning, theProblem, whereWeAreToday } from './ourStoryContent';

export default function OurStoryPage() {
  return (
    <>
      <StoryHeroSection />
      <NarrativeSection
        eyebrow="The Beginning"
        title={theBeginning.title}
        body={theBeginning.body}
        icon={<FlagRounded />}
        bgcolor="background.paper"
        titleId="beginning-heading"
        accent="primary"
      />
      <NarrativeSection
        eyebrow="The Problem We Saw"
        title={theProblem.title}
        body={theProblem.body}
        icon={<VisibilityRounded />}
        bgcolor="background.default"
        titleId="problem-heading"
        accent="secondary"
      />
      <PhilosophySection />
      <MilestonesSection />
      <NarrativeSection
        eyebrow="Where We Are Today"
        title={whereWeAreToday.title}
        body={whereWeAreToday.body}
        icon={<TrendingUpRounded />}
        bgcolor="background.paper"
        titleId="today-heading"
        accent="info"
      />
      <NarrativeSection
        eyebrow="Looking Ahead"
        title={lookingAhead.title}
        body={lookingAhead.body}
        icon={<RocketLaunchRounded />}
        bgcolor="background.default"
        titleId="ahead-heading"
        accent="primary"
        link={{ label: 'Explore Our Programs', to: '/programs' }}
      />
      <ClosingCtaSection />
    </>
  );
}

