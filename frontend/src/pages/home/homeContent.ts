import type { CtaLink } from '../../model/content';

export const heroContent = {
  headline: 'Where disability meets dignity. Where skill becomes a career.',
  subheadline:
    'WinVinaya Foundation trains persons with disabilities in in-demand tech and business skills — and helps them build real, independent careers.',
  ctas: [
    { label: 'Donate Now', to: '/donate' },
    { label: 'Volunteer With Us', to: '/involve/volunteer' },
    { label: 'Hire Our Talent', to: '/involve/corporate-engagement' },
  ] satisfies CtaLink[],
};

export const impactCounters = [
  { label: 'Trained', value: 4500, suffix: '+' },
  { label: 'Placed', value: 3200, suffix: '+' },
  { label: 'Job-ready candidates', value: 85, suffix: '%' },
];

export const primaryCtaBanner = {
  headline: 'Every rupee, every hour, every opportunity changes a life.',
  body: 'Your support funds training, assistive technology, and job placement for persons with disabilities across India.',
  ctas: [
    { label: 'Donate Now', to: '/donate' },
    { label: 'Become a Volunteer', to: '/involve/volunteer' },
    { label: 'Partner With Us', to: '/involve/corporate-engagement' },
  ] satisfies CtaLink[],
};

export const valueWeBringContent = {
  eyebrow: 'THE VALUE WE BRING',
  headline: 'Empowering Persons with Disabilities. Transforming Corporate Diversity.',
  description:
    'We bridge the gap between talented individuals living with disabilities and top corporate employers through free skilling, accessibility solutions, and merit-based placement.',
  points: [
    {
      title: 'Free Industry-Grade Skilling',
      description: 'Hands-on courses in Software Development, Testing, RPA, and Data Tools integrated with Indian Sign Language (ISL) support.',
      icon: 'school' as const,
    },
    {
      title: 'Direct Corporate Career Placement',
      description: 'Job-ready candidates placed with 60+ corporate partners including Wipro, Amazon, TCS, Infosys, and Wells Fargo.',
      icon: 'work' as const,
    },
    {
      title: '85% Measurable Career Impact',
      description: 'Over 4,500+ scholars trained and 3,200+ placed in dignified, high-growth careers across India.',
      icon: 'trending' as const,
    },
  ],
  ctas: [
    { label: 'Explore Our Programs', to: '/programs' },
    { label: 'Partner With Us', to: '/involve/corporate-engagement' },
  ] satisfies CtaLink[],
};

export const sdgContent = {
  headline: 'Aligning our vision & impact with National & Global goals.',
  subheadline: 'Sustainable Development Goals (SDGs)',
  rightDescription:
    "WinVinaya Foundation is committed to India's promise of meeting the SDG 2030 milestones. Each programme is designed keeping in mind the key tenets defined under the Sustainable Development Goals below:",
  goals: [
    {
      title: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE',
      description: 'Build good and safe structures and new ideas.',
      color: '#FD6925',
      iconKey: 'industry' as const,
    },
    {
      title: 'REDUCED INEQUALITIES',
      description: 'Make things more fair between and inside countries.',
      color: '#DD1367',
      iconKey: 'equality' as const,
    },
    {
      title: 'PARTNERSHIPS FOR THE GOALS',
      description: 'Work together as countries to finish the plan.',
      color: '#19486A',
      iconKey: 'partnerships' as const,
    },
    {
      title: 'QUALITY EDUCATION',
      description: 'Give fair and good learning chances to everyone.',
      color: '#C5192D',
      iconKey: 'education' as const,
    },
    {
      title: 'NO POVERTY',
      description: 'End all forms of poverty everywhere.',
      color: '#E5243B',
      iconKey: 'poverty' as const,
    },
    {
      title: 'GENDER EQUALITY',
      description: 'Treat women and girls with fairness and give them power.',
      color: '#FF3A21',
      iconKey: 'gender' as const,
    },
    {
      title: 'DECENT WORK & ECONOMIC GROWTH',
      description: 'Help jobs grow in a fair and safe way.',
      color: '#A21942',
      iconKey: 'work' as const,
    },
  ],
};

export const aboutContent = {
  headline: 'A bridge between talent and opportunity.',
  body: "WinVinaya Foundation is a Charitable Trust training persons with disabilities in software development, data visualization, RPA, and core business skills — then connecting them with employers who value ability over assumption. Since 2016, we've worked to close the gap between capable candidates and companies ready to hire them.",
  link: { label: 'Read Our Full Story', to: '/about/our-story' } satisfies CtaLink,
};

export interface WhatWeDoCard {
  icon: 'school' | 'work' | 'handshake' | 'academy';
  title: string;
  badge: string;
  description: string;
  color: string;
  to: string;
}

export const whatWeDo: WhatWeDoCard[] = [
  {
    icon: 'school',
    badge: 'SKILLS & ISL',
    title: 'Inclusive Tech Skilling',
    description: 'Industry courses in Software, Data, BFSI & ISL for PwDs.',
    color: '#0D9488',
    to: '/programs',
  },
  {
    icon: 'work',
    badge: 'CAREER PLACEMENTS',
    title: 'Dignified Job Placements',
    description: 'Interview prep, employer matching & workplace support.',
    color: '#2563EB',
    to: '/programs',
  },
  {
    icon: 'handshake',
    badge: 'CORPORATE D&I',
    title: 'Corporate Inclusion',
    description: 'Sensitization training, accessibility & D&I sourcing.',
    color: '#FF5A36',
    to: '/involve/corporate-engagement',
  },
  {
    icon: 'academy',
    badge: 'FREE ACADEMY',
    title: 'Digital Learning Hub',
    description: 'Free self-paced e-learning & 1-on-1 industry mentorship.',
    color: '#8B5CF6',
    to: '/programs',
  },
];

export const proofItWorks = {
  headline: 'Real people. Real careers.',
  stories: [
    {
      name: 'Symonne Kotian',
      description: 'Graphic designer living with Cerebral Palsy, now working professionally in design software.',
      videoUrl: 'https://www.youtube.com/embed/2j45mfZ9iFI?autoplay=1',
    },
    {
      name: 'Hemanth',
      description:
        'M.Com graduate and aspiring director living with Cerebral Palsy. Never letting disability hinder his dreams, he shares his life and inspiring story.',
      videoUrl: 'https://www.youtube.com/embed/ntu7SKSjfUw?autoplay=1',
    },
    {
      name: 'Anoop',
      description:
        'Deaf professional from Kerala using Indian Sign Language. A strong-willed, hard-working individual who transformed his career against educational barriers.',
      videoUrl: 'https://www.youtube.com/embed/b-rXnVXsSo4?autoplay=1',
    },
    {
      name: 'A WinVinaya alumnus',
      description: 'Another verified success story — coming soon.',
      isPlaceholder: true,
    },
  ],
  link: { label: 'See more success stories', to: '/impact/success-stories' } satisfies CtaLink,
  stats: [
    { label: 'Placement rate', value: '85%' },
    { label: 'Hired across', value: '60+ companies' },
    { label: 'Average time to placement', value: '3 months' },
  ],
};

export const awardsContent = {
  headline: 'Recognized for impact.',
  body: 'These honors reflect the trust of the disability, tech, and employer communities in our approach.',
  awards: ['ATF Award — Best Assistive Technology Initiative among NGOs (2023)', 'Great Place to Work', 'AssisTech Award'],
  link: { label: 'See All Awards', to: '/about/awards' } satisfies CtaLink,
};

export interface PartnerCompany {
  name: string;
  category: string;
}

export const hiringPartners: PartnerCompany[] = [
  { name: 'Wipro', category: 'IT & Consulting' },
  { name: 'Saira Jobs', category: 'Inclusive Talent' },
  { name: 'Wells Fargo', category: 'BFSI & Banking' },
  { name: 'Carlon', category: 'Enterprise Services' },
  { name: 'Amazon', category: 'E-Commerce & Tech' },
  { name: 'TCS', category: 'IT Services' },
  { name: 'Royal Orchid', category: 'Hospitality' },
  { name: 'Infosys', category: 'IT & Technology' },
];

export const partnersContent = {
  headline: 'Trusted by employers who hire for ability.',
  body: 'Leading companies across IT, BFSI, Hospitality, and Enterprise sectors hire WinVinaya-trained talent.',
  partners: hiringPartners,
  link: { label: 'Become a Hiring Partner', to: '/involve/corporate-engagement' } satisfies CtaLink,
};

export const testimonialsContent = {
  headline: 'What people say about working with us.',
  quotes: [
    {
      quote:
        "WinVinaya's approach is innovative, professional, and builds real confidence in PWDs to be job-ready.",
      name: 'V S Basavaraju',
      title: 'State Commissioner, RPWD Act, Govt. of Karnataka',
    },
    {
      quote:
        'The passion of the founders is infectious, and their approach to training and placement is modern, authentic, and effective.',
      name: 'Bharath Ram Sundararajan',
      title: 'Business Leader, EY',
    },
  ],
  link: { label: 'Read More Testimonials', to: '/impact/testimonials' } satisfies CtaLink,
};

export interface NewsItem {
  label: string;
  teaser: string;
  to: string;
}

export const newsItems: NewsItem[] = [
  { label: 'Latest Blog Post', teaser: 'Stories, updates, and perspectives from the WinVinaya community.', to: '/resources/blog' },
  { label: 'Newsletter', teaser: 'Catch up on our most recent issue.', to: '/resources/newsletter' },
  { label: 'Open Careers', teaser: 'Join our team — current openings.', to: '/resources/careers' },
  { label: 'Upcoming Events', teaser: "What's happening at WinVinaya.", to: '/programs/events-gallery' },
];

export const closingCtaContent = {
  headline: 'Be part of the change.',
  body: 'Whether you give, volunteer, or hire — you help someone build a career on their own terms.',
  ctas: [
    { label: 'Donate Now', to: '/donate' },
    { label: 'Volunteer', to: '/involve/volunteer' },
    { label: 'Contact Us', to: '/contact' },
  ] satisfies CtaLink[],
};
