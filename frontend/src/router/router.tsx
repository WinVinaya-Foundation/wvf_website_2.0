import { createRootRoute, createRoute, createRouter, Outlet, redirect, useLocation } from '@tanstack/react-router';
import MainLayout from '../layout/MainLayout';
import { navGroups } from '../layout/NavBar';
import { legalLinks } from '../layout/Footer/footerLinks';
import {
  AdminDashboardPage,
  AdminDonorsPage,
  AdminEventsPage,
  AdminGalleryPage,
  AdminLoginPage,
  AdminReportsPage,
  BlogPage,
  BlogPostPage,
  CareersPage,
  CertificationsPage,
  ComingSoonPage,
  ContactPage,
  CorporateEngagementPage,
  DonatePage,
  DonateThankYouPage,
  EbookPage,
  EventsGalleryPage,
  HomePage,
  InternshipsPage,
  NewsletterPage,
  NotFoundPage,
  OurAwardsPage,
  OurProgramsPage,
  OurStoryPage,
  OurTeamPage,
  PerformanceReportsPage,
  ReportsPage,
  SamarthPage,
  SignLanguagePage,
  SuccessStoriesPage,
  TestimonialsPage,
  VolunteerPage,
  WinVinayaAcademyPage,
} from '../pages';

// The admin section is a separate surface with no public-site nav/footer chrome.
function RootComponent() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) {
    return <Outlet />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

// Paths with a real page component, built out beyond the ComingSoon placeholder. Kept as
// literal strings (not derived from the route objects below) — `route.path` doesn't reliably
// round-trip to the string passed into `createRoute`.
const BUILT_PATHS = [
  '/contact',
  '/about/our-story',
  '/about/team',
  '/about/awards',
  '/about/reports',
  '/programs',
  '/programs/academy',
  '/programs/samarth',
  '/programs/events-gallery',
  '/impact/success-stories',
  '/impact/testimonials',
  '/impact/performance-reports',
  '/impact/certifications',
  '/involve/volunteer',
  '/involve/internships',
  '/involve/corporate-engagement',
  '/involve/sign-language',
  '/resources/blog',
  '/resources/newsletter',
  '/resources/ebook',
  '/resources/careers',
  '/donate',
] as const;

const builtPageRoutes = [
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[0], component: ContactPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[1], component: OurStoryPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[2], component: OurTeamPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[3], component: OurAwardsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[4], component: ReportsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[5], component: OurProgramsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[6], component: WinVinayaAcademyPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[7], component: SamarthPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[8], component: EventsGalleryPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[9], component: SuccessStoriesPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[10], component: TestimonialsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[11], component: PerformanceReportsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[12], component: CertificationsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[13], component: VolunteerPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[14], component: InternshipsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[15], component: CorporateEngagementPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[16], component: SignLanguagePage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[17], component: BlogPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[18], component: NewsletterPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[19], component: EbookPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[20], component: CareersPage }),
  createRoute({ getParentRoute: () => rootRoute, path: BUILT_PATHS[21], component: DonatePage }),
];

function hasAdminSession(): boolean {
  return !!localStorage.getItem('accessToken');
}

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/login',
  beforeLoad: () => {
    if (hasAdminSession()) {
      throw redirect({ to: '/admin/dashboard' });
    }
  },
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  beforeLoad: () => {
    if (!hasAdminSession()) {
      throw redirect({ to: '/admin/login' });
    }
  },
  component: AdminDashboardPage,
});

const adminDonorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/donors',
  beforeLoad: () => {
    if (!hasAdminSession()) {
      throw redirect({ to: '/admin/login' });
    }
  },
  component: AdminDonorsPage,
});

const adminReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/reports',
  beforeLoad: () => {
    if (!hasAdminSession()) {
      throw redirect({ to: '/admin/login' });
    }
  },
  component: AdminReportsPage,
});

const adminEventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/events',
  beforeLoad: () => {
    if (!hasAdminSession()) {
      throw redirect({ to: '/admin/login' });
    }
  },
  component: AdminEventsPage,
});

const adminGalleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/gallery',
  beforeLoad: () => {
    if (!hasAdminSession()) {
      throw redirect({ to: '/admin/login' });
    }
  },
  component: AdminGalleryPage,
});

// Send bare /admin to whichever admin destination is appropriate instead of 404ing.
const adminIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  beforeLoad: () => {
    throw redirect({ to: hasAdminSession() ? '/admin/dashboard' : '/admin/login' });
  },
});

// Not part of BUILT_PATHS/navPaths since it's a dynamic detail route, not a static nav destination.
const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources/blog/$slug',
  component: BlogPostPage,
});

// Same reasoning as blogPostRoute — a dynamic receipt-lookup route, not a static nav destination.
const donationThankYouRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/donate/thank-you/$reference',
  component: DonateThankYouPage,
});





const builtPaths = new Set<string>(BUILT_PATHS);

// Linked to from a built page's content but not part of nav/footer — still needs a working
// (if placeholder) route so the link doesn't 404.
const extraPlaceholderPaths = ['/about/awards/rdpr-approval'];

const navPaths = Array.from(
  new Set([
    ...navGroups.flatMap((group) => group.items.map((item) => item.to)),
    ...legalLinks.map((link) => link.to),
    ...extraPlaceholderPaths,
  ]),
);

const placeholderRoutes = navPaths
  .filter((path) => !builtPaths.has(path))
  .map((path) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path,
      component: ComingSoonPage,
    }),
  );

const routeTree = rootRoute.addChildren([
  homeRoute,
  ...builtPageRoutes,
  blogPostRoute,
  donationThankYouRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminDonorsRoute,
  adminReportsRoute,
  adminEventsRoute,
  adminGalleryRoute,
  adminIndexRoute,
  ...placeholderRoutes,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
