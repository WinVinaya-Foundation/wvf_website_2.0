import type { CtaLink, TimelineItem } from '../../model/content';

export const storyHero = {
  headline: 'Our Story',
  subheadline: 'How a simple belief — that anyone can learn — became a movement for inclusive employment.',
};

export const theBeginning = {
  title: 'It started with a question no one was answering.',
  body: 'WinVinaya Foundation was founded in 2016 by Sivasankar Jayagopal and Akila, who saw a gap that most of the tech and education world had overlooked: talented, capable persons with disabilities were being trained in basic skills, but rarely in the advanced, in-demand skills that actually lead to competitive jobs. The result was a cycle of goodwill without real economic independence.',
};

export const theProblem = {
  title: 'Capability was never the issue. Access was.',
  body: "India has millions of persons with disabilities who are willing and able to work, but employers often assume otherwise — and training programs for PWDs were rarely designed to match real industry hiring bars. WinVinaya was built to close that gap from both sides: preparing candidates to industry standard, and helping employers see what they'd been missing.",
};

export const ourPhilosophy = {
  title: '"Anyone can learn."',
  body: 'This belief sits at the center of everything WinVinaya does. Disability is treated as a difference in method, not a limit on potential — training is adapted (through sign language interpretation, assistive technology, and flexible formats), never diluted. The goal was never charity. It was competence, dignity, and a paycheck earned on merit.',
};

export const milestones: TimelineItem[] = [
  { year: 'Today', label: '4,500+ trained, 3,200+ placed across 60+ companies', icon: 'trending' },
  { year: '2023', label: 'ATF Award for Best Assistive Technology Initiative among NGOs', icon: 'award' },
  { year: 'TBD', label: 'Recognized as a Great Place to Work', icon: 'premium', isPlaceholder: true },
  { year: 'TBD', label: 'Samarth MSME Initiative launched', icon: 'handshake', isPlaceholder: true },
  {
    year: 'TBD',
    label: "Launch of WinVinaya Academy, India's first accessible digital learning platform for PWDs",
    icon: 'academy',
    isPlaceholder: true,
  },
  {
    year: 'TBD',
    label: 'Launch of core skills training programs (Full Stack, RPA, Data Viz, Testing)',
    icon: 'school',
    isPlaceholder: true,
  },
  { year: '2016', label: 'WinVinaya Foundation founded', icon: 'flag' },
];

export const whereWeAreToday = {
  title: 'A growing community of skilled, employed professionals.',
  body: 'What began as a small training initiative has grown into a full ecosystem — skills training, a dedicated learning academy, an MSME livelihood initiative, and corporate partnerships across industries. WinVinaya has trained persons with visual, hearing, physical, and other disabilities, placing many in respected roles at India’s leading companies.',
};

export const lookingAhead = {
  title: "The work isn't finished.",
  body: 'For every person WinVinaya has trained and placed, many more are still waiting for the same chance. The mission going forward is the same as it was in 2016 — reach further, train deeper, and keep proving that ability has no single definition.',
};

export const storyClosingCta = {
  headline: 'Be part of the next chapter.',
  body: 'Support our training programs, volunteer your skills, or partner with us to hire.',
  ctas: [
    { label: 'Donate Now', to: '/donate' },
    { label: 'Volunteer', to: '/involve/volunteer' },
    { label: 'Partner With Us', to: '/involve/corporate-engagement' },
  ] satisfies CtaLink[],
};
