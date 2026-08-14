export interface FooterLink {
  label: string;
  to: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    heading: 'About',
    links: [
      { label: 'Our Story', to: '/about/our-story' },
      { label: 'Our Team', to: '/about/team' },
      { label: 'Awards & Recognition', to: '/about/awards' },
      { label: 'Careers', to: '/resources/careers' },
    ],
  },
  {
    heading: 'Get Involved',
    links: [
      { label: 'Donate', to: '/donate' },
      { label: 'Volunteer', to: '/involve/volunteer' },
      { label: 'Internships', to: '/involve/internships' },
      { label: 'Corporate Engagement', to: '/involve/corporate-engagement' },
      { label: 'Get Sensitized / Sign Language', to: '/involve/sign-language' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', to: '/resources/blog' },
      { label: 'Newsletter', to: '/resources/newsletter' },
      { label: 'eBook', to: '/resources/ebook' },
      { label: 'Annual Reports', to: '/about/reports' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
];

export interface SocialLink {
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'YouTube', href: '#' },
];

export const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', to: '/legal/privacy-policy' },
  { label: 'Terms of Use', to: '/legal/terms' },
  { label: 'Cookie Policy', to: '/legal/cookie-policy' },
];
