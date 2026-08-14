import type { CtaLink } from '../../model/content';

export const successStoriesHero = {
  headline: 'Success Stories',
  subheadline:
    "There are stories that inspire us, that melt our hearts, and that give us goosebumps. At WinVinaya Foundation, we've seen it all.",
};

export interface FeaturedStory {
  name: string;
  role: string;
  description: string;
  videoUrl: string;
}

// Add new stories here — the grid and its accent colors scale automatically, no per-story
// layout changes needed.
export const featuredStories: FeaturedStory[] = [
  {
    name: 'Symonne Kotian',
    role: 'Graphic Designer',
    description:
      'Symonne Kotian is a creative person with a pleasant smile. She is skilled at graphic designing, proficient in software like Adobe Photoshop, Illustrator, and Canva. She is an amazing artist and a person with Cerebral Palsy. Watch the video to know more about her journey.',
    videoUrl: 'https://www.youtube.com/embed/2j45mfZ9iFI?autoplay=1',
  },
  {
    name: 'Hemanth',
    role: 'Aspiring Director',
    description:
      "Hemanth is an M.Com graduate and an aspiring director. A cheerful, optimistic go-getter and a person with Cerebral Palsy, he's never let his disability stand in the way of his dreams. He shares his life, his dreams, and his support system — along with a thought-provoking message. Watch his story to know more.",
    videoUrl: 'https://www.youtube.com/embed/ntu7SKSjfUw?autoplay=1',
  },
  {
    name: 'Anoop',
    role: 'Sign Language Advocate',
    description:
      "Anoop is a Deaf individual from Kerala who communicates using Sign Language. Though India has 400+ educational institutions for the deaf, almost 95% of them lack qualified sign language instructors — a gap Anoop's story speaks directly to. Watch his story to know more.",
    videoUrl: 'https://www.youtube.com/embed/b-rXnVXsSo4?autoplay=1',
  },
];

export const successStoriesClosingCta = {
  headline: 'Every story starts with an opportunity.',
  body: 'Your support helps create the next success story.',
  ctas: [
    { label: 'Donate Now', to: '/donate' },
    { label: 'Sponsor a Candidate', to: '/donate' },
  ] satisfies CtaLink[],
};
