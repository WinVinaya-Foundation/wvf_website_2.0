import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './env.js';
import { authRouter } from './auth/auth.routes.js';
import { adminDonationsRouter } from './donations/donations.admin.routes.js';
import { donationsRouter } from './donations/donations.routes.js';
import { reportsRouter } from './reports/reports.routes.js';
import { adminReportsRouter } from './reports/reports.admin.routes.js';
import { eventsRouter } from './events/events.routes.js';
import { adminEventsRouter } from './events/events.admin.routes.js';
import { galleryRouter } from './gallery/gallery.routes.js';
import { adminGalleryRouter } from './gallery/gallery.admin.routes.js';
import { categoriesRouter } from './categories/categories.routes.js';
import { adminCategoriesRouter } from './categories/categories.admin.routes.js';
import { storiesRouter } from './stories/stories.routes.js';
import { adminStoriesRouter } from './stories/stories.admin.routes.js';
import { testimonialsRouter } from './testimonials/testimonials.routes.js';
import { adminTestimonialsRouter } from './testimonials/testimonials.admin.routes.js';
import { publicBlogRouter } from './blog/blog.routes.js';
import { adminBlogRouter } from './blog/blog.admin.routes.js';
import { publicNewsletterRouter } from './newsletter/newsletter.routes.js';
import { adminNewsletterRouter } from './newsletter/newsletter.admin.routes.js';
import { publicEbookRouter } from './ebook/ebook.routes.js';
import { adminEbookRouter } from './ebook/ebook.admin.routes.js';
import { publicCareersRouter } from './careers/careers.routes.js';
import { adminCareersRouter } from './careers/careers.admin.routes.js';
import { publicContactRouter } from './contact/contact.routes.js';
import { adminContactRouter } from './contact/contact.admin.routes.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { sanitizeRequestBody } from './middleware/sanitizeRequest.js';
import { globalLimiter, formSubmissionLimiter, loginLimiter } from './middleware/rateLimiter.js';

export const app = express();

// Advanced Cyber Security Headers (Helmet)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    frameguard: { action: 'deny' }, // Block Clickjacking attacks
    xContentTypeOptions: true, // Block MIME-sniffing exploits (nosniff)
    hidePoweredBy: true, // Disable X-Powered-By fingerprint header
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    hsts: {
      maxAge: 31536000, // 1 year HSTS
      includeSubDomains: true,
      preload: true,
    },
  })
);

app.use(cors({ origin: env.FRONTEND_ORIGIN }));

// Input Payload Size Controls (Block Payload Overload / Memory Exhaustion Attacks)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// Global XSS Input Sanitization Middleware
app.use(sanitizeRequestBody);

// Anti-DDoS Rate Limiting across all API routes
app.use('/api', globalLimiter);

// Serve static upload files (reports, documents, etc.)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Auth Route with Brute-Force & Credential Stuffing Protection
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth', authRouter);

// Public Form Submission Endpoints with Anti-Spam Rate Limiting
app.use('/api/contact', formSubmissionLimiter, publicContactRouter);
app.use('/api/donations', formSubmissionLimiter, donationsRouter);
app.use('/api/admin/donors', adminDonationsRouter);
app.use('/api/admin/reports', adminReportsRouter);
app.use('/api/admin/events', adminEventsRouter);
app.use('/api/admin/gallery', adminGalleryRouter);
app.use('/api/admin/categories', adminCategoriesRouter);
app.use('/api/admin/stories', adminStoriesRouter);
app.use('/api/admin/testimonials', adminTestimonialsRouter);
app.use('/api/admin/blog', adminBlogRouter);
app.use('/api/admin/newsletter', adminNewsletterRouter);
app.use('/api/admin/ebook', adminEbookRouter);
app.use('/api/admin/careers', adminCareersRouter);
app.use('/api/admin/contact', adminContactRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/blog', publicBlogRouter);
app.use('/api/newsletter', publicNewsletterRouter);
app.use('/api/ebook', publicEbookRouter);
app.use('/api/careers', publicCareersRouter);

app.use(notFoundHandler);
app.use(errorHandler);
