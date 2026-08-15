import type { CtaLink } from '../../model/content';

export const eventsGalleryHeroContent = {
  eyebrow: 'Events & Gallery',
  headline: 'Where our programs come to life.',
  subheadline:
    "From cohort orientations to village learning hub launches, here's what's coming up — and a look back at the moments that got us here.",
};

export const upcomingEventsContent = {
  eyebrow: 'Next Up',
  title: 'Upcoming events',
  description: 'Recurring milestones across our programs — dates are confirmed and shared closer to each date.',
  suggestEvent: {
    headline: 'Hosting something we should feature?',
    body: 'Tell us about your hiring drive, workshop, or campus session and we\'ll help spread the word.',
    cta: { label: 'Get in Touch', to: '/contact' } satisfies CtaLink,
  },
};

export const completedEventsContent = {
  eyebrow: 'Recently Wrapped',
  title: 'Completed events',
  description: 'A look back at milestones our programs have recently delivered.',
};

export const galleryContent = {
  eyebrow: 'Moments',
  title: 'Gallery',
  description: 'Browse by event — every album holds the photos from that day.',
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
