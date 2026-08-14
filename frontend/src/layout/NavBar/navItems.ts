export interface NavLeafItem {
  label: string;
  to: string;
  description: string;
}

export interface NavGroup {
  label: string;
  items: NavLeafItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: 'About',
    items: [
      { label: 'Our Story', to: '/about/our-story', description: 'Our mission, founders, and the journey so far' },
      { label: 'Our Team', to: '/about/team', description: 'The people behind the foundation' },
      { label: 'Awards & Recognition', to: '/about/awards', description: 'Milestones and honours we have earned' },
      { label: 'Annual Reports / Downloads', to: '/about/reports', description: 'Yearly reports, readable online' },
    ],
  },
  {
    label: 'Programs',
    items: [
      { label: 'Our Programs', to: '/programs', description: 'Full Stack Dev, RPA, Data Viz, Testing, BFSI, English & soft skills' },
      { label: 'WinVinaya Academy', to: '/programs/academy', description: 'Our flagship skilling program' },
      { label: 'Samarth – MSME Initiative', to: '/programs/samarth', description: 'Enabling MSMEs to hire inclusively' },
      { label: 'Events & Gallery', to: '/programs/events-gallery', description: 'Moments from our programs and events' },
    ],
  },
  {
    label: 'Impact',
    items: [
      { label: 'Success Stories', to: '/impact/success-stories', description: 'Video testimonials from our alumni' },
      { label: 'Testimonials / Reflections', to: '/impact/testimonials', description: 'Voices from our community' },
      { label: 'Performance Reports', to: '/impact/performance-reports', description: 'Outcomes and metrics we track' },
      { label: 'Approvals & Certifications', to: '/impact/certifications', description: 'Our compliance and credentials' },
    ],
  },
  {
    label: 'Involve',
    items: [
      { label: 'Volunteer', to: '/involve/volunteer', description: 'Give your time and skills' },
      { label: 'Internships', to: '/involve/internships', description: 'Work with us and learn' },
      { label: 'Corporate Engagement / D&I Services', to: '/involve/corporate-engagement', description: 'Partner with us on workplace inclusion' },
      { label: 'Get Sensitized / Learn Sign Language', to: '/involve/sign-language', description: 'Build disability awareness and skills' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Blog', to: '/resources/blog', description: 'Stories, updates, and perspectives' },
      { label: 'Newsletter Archive', to: '/resources/newsletter', description: 'Past issues of our newsletter' },
      { label: 'eBook', to: '/resources/ebook', description: 'Download our latest publication' },
      { label: 'Careers', to: '/resources/careers', description: 'Join our team' },
      { label: 'Contact Us', to: '/contact', description: 'Get in touch with the foundation' },
    ],
  },
];

export const homeItem: NavLeafItem = { label: 'Home', to: '/', description: 'Return to home page' };
export const donateItem: NavLeafItem = { label: 'Donate', to: '/donate', description: 'Support an inclusive society' };
