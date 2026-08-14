import type { CtaLink } from '../../model/content';

export type EventCategoryKey = 'academy' | 'samarth' | 'community' | 'corporate';

export interface EventCategoryMeta {
  key: EventCategoryKey;
  label: string;
  color: 'primary' | 'secondary' | 'info' | 'warning';
}

export const eventCategories: EventCategoryMeta[] = [
  { key: 'academy', label: 'WinVinaya Academy', color: 'primary' },
  { key: 'samarth', label: 'Samarth', color: 'secondary' },
  { key: 'community', label: 'Community & Outreach', color: 'info' },
  { key: 'corporate', label: 'Corporate & Awards', color: 'warning' },
];

export const eventsGalleryHeroContent = {
  eyebrow: 'Events & Gallery',
  headline: 'Where our programs come to life.',
  subheadline:
    "From cohort orientations to village learning hub launches, here's what's coming up — and a look back at the moments that got us here.",
};

export interface EventEntry {
  title: string;
  category: EventCategoryKey;
  dateLabel: string;
  /** True while the exact date isn't confirmed yet — shows an honest note instead of a fake precise date. */
  isPlaceholder?: boolean;
  location: string;
  description: string;
  cta: CtaLink;
}

export const upcomingEventsContent = {
  eyebrow: 'Next Up',
  title: 'Upcoming events',
  description: 'Recurring milestones across our programs — dates are confirmed and shared closer to each date.',
  events: [
    {
      title: 'WinVinaya Academy — New Cohort Orientation',
      category: 'academy',
      dateLabel: 'Next cohort — September 2026',
      isPlaceholder: true,
      location: 'Bengaluru & Online',
      description:
        'Orientation day for incoming Full Stack Development, RPA, and Data Visualization scholars — meet mentors and set a 90-day learning plan.',
      cta: { label: 'Apply to Academy', to: '/programs/academy' },
    },
    {
      title: 'Samarth Learning Hub Launch',
      category: 'samarth',
      dateLabel: 'Next hub opening — October 2026',
      isPlaceholder: true,
      location: 'Rural learning hub, Karnataka',
      description:
        'A new smartphone-friendly learning hub opens for rural women and persons with disabilities to begin their digital entrepreneurship journey.',
      cta: { label: 'Support a Learning Hub', to: '/donate' },
    },
    {
      title: 'Corporate Hiring & Sensitization Meet',
      category: 'corporate',
      dateLabel: 'Quarterly — next date to be announced',
      isPlaceholder: true,
      location: 'Partner corporate campus',
      description:
        'Job-ready scholars meet hiring partners for interviews, alongside a disability-sensitization session for employer teams.',
      cta: { label: 'Partner With Us', to: '/involve/corporate-engagement' },
    },
    {
      title: 'Indian Sign Language Awareness Workshop',
      category: 'community',
      dateLabel: 'Monthly — next date to be announced',
      isPlaceholder: true,
      location: 'Online',
      description:
        'A free introductory session to build basic ISL literacy and disability awareness for volunteers, allies, and partner teams.',
      cta: { label: 'Reserve a Seat', to: '/involve/sign-language' },
    },
  ] satisfies EventEntry[],
  suggestEvent: {
    headline: 'Hosting something we should feature?',
    body: 'Tell us about your hiring drive, workshop, or campus session and we\'ll help spread the word.',
    cta: { label: 'Get in Touch', to: '/contact' } satisfies CtaLink,
  },
};

export interface GalleryPhoto {
  caption: string;
  alt: string;
}

export interface GalleryEventAlbum {
  id: string;
  title: string;
  category: EventCategoryKey;
  dateLabel: string;
  photos: GalleryPhoto[];
}

export const galleryContent = {
  eyebrow: 'Moments',
  title: 'Gallery',
  description: 'Browse by event — every album holds the photos from that day.',
  albums: [
    {
      id: 'academy-graduation-day',
      title: 'Academy Graduation Day',
      category: 'academy',
      dateLabel: 'March 2026 Batch',
      photos: [
        { caption: 'Academy Graduation Ceremony', alt: 'Scholars on stage receiving their WinVinaya Academy certificates' },
        { caption: 'Academy Graduates Group Photo', alt: 'Graduating scholars posing together with their mentors' },
        { caption: 'Academy Graduation Certificates', alt: 'Close-up of a scholar holding their completion certificate' },
      ],
    },
    {
      id: 'full-stack-dev-lab',
      title: 'Full Stack Dev — Hands-on Lab',
      category: 'academy',
      dateLabel: 'Ongoing Cohort',
      photos: [
        { caption: 'Full Stack Dev Lab Session', alt: 'Scholars working together during a Full Stack Development lab session' },
        { caption: 'Full Stack Dev Pair Programming', alt: 'Two scholars pair programming on a lab exercise' },
      ],
    },
    {
      id: 'samarth-hub-launch',
      title: 'Samarth Learning Hub Launch',
      category: 'samarth',
      dateLabel: 'Rural Karnataka',
      photos: [
        { caption: 'Samarth Hub Opening Day', alt: 'Ribbon-cutting at the opening of a new Samarth learning hub' },
        { caption: 'Samarth Learning Hub Session', alt: 'Rural women learning digital entrepreneurship skills at a Samarth learning hub' },
        { caption: 'Samarth Participants Group Photo', alt: 'Samarth participants posing together after a training session' },
      ],
    },
    {
      id: 'samarth-entrepreneur-showcase',
      title: 'Samarth Entrepreneur Showcase',
      category: 'samarth',
      dateLabel: 'Community Showcase',
      photos: [
        { caption: 'Samarth Entrepreneur Showcase', alt: 'A Samarth participant showcasing her small business products' },
        { caption: 'Samarth Showcase Stall', alt: 'A stall set up by a Samarth entrepreneur at the community showcase' },
      ],
    },
    {
      id: 'corporate-hiring-day',
      title: 'Corporate Hiring Day',
      category: 'corporate',
      dateLabel: 'Partner Hiring Drive',
      photos: [
        { caption: 'Corporate Hiring Day', alt: 'Scholars interviewing with corporate hiring partners' },
        { caption: 'Corporate Hiring Interview Panel', alt: 'A hiring partner panel interviewing a WinVinaya scholar' },
      ],
    },
    {
      id: 'atf-award-ceremony',
      title: 'ATF Award Ceremony',
      category: 'corporate',
      dateLabel: 'Bengaluru Tech Summit',
      photos: [
        { caption: 'ATF Award Ceremony', alt: 'WinVinaya representatives receiving the ATF Award on stage' },
        { caption: 'ATF Award Team Photo', alt: 'The WinVinaya team posing together with the ATF Award' },
      ],
    },
    {
      id: 'isl-awareness-workshop',
      title: 'ISL Awareness Workshop',
      category: 'community',
      dateLabel: 'Monthly Workshop',
      photos: [
        { caption: 'ISL Awareness Workshop', alt: 'Volunteers learning Indian Sign Language basics in a workshop' },
        { caption: 'ISL Sign Demonstration', alt: 'A trainer demonstrating Indian Sign Language signs to volunteers' },
      ],
    },
    {
      id: 'volunteer-community-day',
      title: 'Volunteer Community Day',
      category: 'community',
      dateLabel: 'Outreach Day',
      photos: [
        { caption: 'Volunteer Community Day', alt: 'Volunteers and staff at a community outreach day' },
        { caption: 'Volunteer Group Activity', alt: 'Volunteers taking part in a group activity during outreach day' },
      ],
    },
  ] satisfies GalleryEventAlbum[],
};

export const eventsGalleryClosingCtaContent = {
  headline: "Don't miss what's next.",
  body: 'Get event reminders, program updates, and new gallery moments — straight from the WinVinaya team.',
  ctas: [
    { label: 'Contact Us', to: '/contact' },
    { label: 'Volunteer With Us', to: '/involve/volunteer' },
    { label: 'Read Our Newsletter', to: '/resources/newsletter' },
  ] satisfies CtaLink[],
};
