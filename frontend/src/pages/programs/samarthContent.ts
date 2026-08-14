export const samarthHeroContent = {
  eyebrow: 'Samarth — MSME Initiative',
  headline: 'Samarth — Building Digital Entrepreneurs, Not Just Employees.',
  subheadline:
    'A livelihood initiative helping rural women and persons with disabilities build their own digital businesses — in their own language, on their own phones.',
};

export const ideaBehindSamarthContent = {
  eyebrow: 'The Idea Behind Samarth',
  headline: 'Not everyone needs a job. Some need a business.',
  body: "Employment isn't the only path to independence. Samarth is WinVinaya Foundation's MSME (Micro, Small & Medium Enterprises) initiative, built for rural women and persons with disabilities who want to build their own livelihood — as digital entrepreneurs, not job applicants. It's designed around a simple insight: skills alone don't unlock opportunity, but skills combined with the confidence and tools to sell, earn, and grow do.",
  keyTakeaway:
    'Skills alone don\'t unlock opportunity, but skills combined with the confidence and tools to sell, earn, and grow do.',
};

export const howItWorksContent = {
  eyebrow: 'How It Works',
  headline: 'Learning hubs built for where people actually are.',
  body: 'Samarth delivers training through simple, regional-language, smartphone-friendly learning hubs — no laptop, no fluent English, and no prior business background required. The model is designed to work in the reality of rural India: low-bandwidth, mobile-first, and locally relevant.',
  features: [
    { title: 'Regional Languages', description: 'Delivered in local vernacular languages for seamless comprehension.' },
    { title: 'Smartphone-Friendly', description: 'No expensive laptops needed — runs efficiently on basic mobile devices.' },
    { title: 'Low Bandwidth', description: 'Optimized to perform reliably in rural areas with limited connectivity.' },
    { title: 'Zero Prior Background', description: 'No prior business experience or fluent English required to get started.' },
  ],
};

export const whatParticipantsGainContent = {
  eyebrow: 'What Participants Gain',
  headline: 'More than a skill — a livelihood.',
  gains: [
    {
      title: 'Digital Independence',
      description: 'Confidence to operate independently in a digital economy.',
      icon: 'smartphone',
      badgeColor: 'primary' as const,
    },
    {
      title: 'Expanded Reach',
      description: 'Expanded customer reach through basic digital selling and marketing tools.',
      icon: 'trending',
      badgeColor: 'secondary' as const,
    },
    {
      title: 'Increased Income',
      description: 'Increased income from new or existing small businesses.',
      icon: 'payments',
      badgeColor: 'info' as const,
    },
    {
      title: 'Dignity of Self-Reliance',
      description: 'Earning on their own terms, not depending on charity.',
      icon: 'verified',
      badgeColor: 'warning' as const,
    },
  ],
};

export const sharedMissionContent = {
  eyebrow: 'Our Shared Mission',
  headline: '₹50 Lakhs. 1,000 rural entrepreneurs. One goal.',
  body: "We're working to raise ₹50 lakhs to train 1,000 rural entrepreneurs — strengthening local economies and making sure no one is left behind in India's digital revolution.",
  goalAmountLakhs: 50,
  currentAmountLakhs: 22.5,
  targetEntrepreneurs: 1000,
  currentEntrepreneurs: 450,
};

export const whoThisReachesContent = {
  eyebrow: 'Who This Reaches',
  headline: 'Built for the people most often left out.',
  body: 'Samarth is designed specifically for rural women and persons with disabilities — two groups with some of the lowest digital and economic participation rates in India, and the groups most likely to be excluded from mainstream entrepreneurship programs.',
  targetGroups: [
    {
      title: 'Rural Women',
      description: 'Empowering women in tier-2/3 villages to generate independent household income.',
    },
    {
      title: 'Persons with Disabilities',
      description: 'Overcoming physical and social barriers through accessible mobile entrepreneurship.',
    },
  ],
};

export const samarthClosingCtaContent = {
  forDonors: {
    eyebrow: 'For Donors',
    headline: '₹25,000 empowers 5 rural entrepreneurs.',
    body: 'Fund a complete digital entrepreneurship learning hub experience for five people.',
    buttonText: 'Sponsor Digital Entrepreneurs',
    link: '/donate',
    ctaColor: 'secondary' as const,
  },
  forParticipants: {
    eyebrow: 'For Participants',
    headline: 'Want to build your own digital business?',
    body: 'Training is completely free. Start your digital entrepreneurship journey today.',
    buttonText: 'Join Samarth',
    link: '/contact',
    ctaColor: 'primary' as const,
  },
  forPartners: {
    eyebrow: 'For Partners',
    headline: 'Help us scale Samarth to more villages.',
    body: 'Partner with us to expand digital learning hubs across more rural communities.',
    buttonText: 'Partner With Us',
    link: '/involve/corporate-engagement',
    ctaColor: 'info' as const,
  },
};
