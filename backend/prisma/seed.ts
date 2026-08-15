import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var ${key} for seeding. Set it in backend/.env.`);
  }
  return value;
}

const owners = [
  {
    name: requireEnv('SEED_OWNER_1_NAME'),
    username: requireEnv('SEED_OWNER_1_USERNAME').toLowerCase(),
    email: requireEnv('SEED_OWNER_1_EMAIL').toLowerCase(),
    password: requireEnv('SEED_OWNER_1_PASSWORD'),
  },
  {
    name: requireEnv('SEED_OWNER_2_NAME'),
    username: requireEnv('SEED_OWNER_2_USERNAME').toLowerCase(),
    email: requireEnv('SEED_OWNER_2_EMAIL').toLowerCase(),
    password: requireEnv('SEED_OWNER_2_PASSWORD'),
  },
];

const defaultCategories = [
  { label: 'WinVinaya Academy', color: 'PRIMARY' as const },
  { label: 'Samarth', color: 'SECONDARY' as const },
  { label: 'Community & Outreach', color: 'INFO' as const },
  { label: 'Corporate & Awards', color: 'WARNING' as const },
];

async function main() {
  const categoryMap = new Map<string, string>();
  for (const category of defaultCategories) {
    const createdCat = await prisma.category.upsert({
      where: { label: category.label },
      update: {},
      create: { label: category.label, color: category.color },
    });
    categoryMap.set(createdCat.label, createdCat.id);
    console.log(`Seeded category: ${category.label}`);
  }

  for (const owner of owners) {
    const passwordHash = await bcrypt.hash(owner.password, 12);
    await prisma.user.upsert({
      where: { email: owner.email },
      update: { name: owner.name, username: owner.username, role: 'OWNER', passwordHash },
      create: { name: owner.name, username: owner.username, email: owner.email, role: 'OWNER', passwordHash },
    });
    console.log(`Seeded admin user: ${owner.email}`);
  }

  // Seed sample events
  const initialEvents = [
    {
      title: 'WinVinaya Academy — IT/BFSI Skill Development Cohort 18',
      categoryLabel: 'WinVinaya Academy',
      status: 'UPCOMING' as const,
      dateLabel: 'September 2026',
      isDateTBA: false,
      location: 'Bengaluru & Online',
      description:
        'Free 4-month intensive training program in Software Engineering, Core Java, SQL, and Soft Skills for Persons with Disabilities (Deaf, Hard of Hearing, Orthopedically Impaired, Visual Impairment).',
      ctaLabel: 'Apply Now',
      ctaLink: '/programs/academy',
    },
    {
      title: 'Samarth Rural Hub Launch — Nurturing Rural Entrepreneurs with Disabilities',
      categoryLabel: 'Samarth',
      status: 'UPCOMING' as const,
      dateLabel: 'October 2026',
      isDateTBA: true,
      location: 'Rural Tamil Nadu & Karnataka',
      description:
        'Launching localized training and mentorship centers for rural Persons with Disabilities to start sustainable micro-enterprises in their local communities.',
      ctaLabel: 'Learn About Samarth',
      ctaLink: '/programs/samarth',
    },
    {
      title: 'Inclusive Hiring & Workplace Accessibility Webinar',
      categoryLabel: 'Corporate & Awards',
      status: 'UPCOMING' as const,
      dateLabel: 'November 15, 2026',
      isDateTBA: false,
      location: 'Virtual (Zoom & YouTube Live)',
      description:
        'Interactive session for HR leaders, Talent Acquisition teams, and CSR managers on reasonable accommodation, sign language interpreters, and assistive tech.',
      ctaLabel: 'Register for Webinar',
      ctaLink: '/contact',
    },
    {
      title: 'Inclusive Job Fair 2026 — Connecting Talent with Corporate Partners',
      categoryLabel: 'Community & Outreach',
      status: 'COMPLETED' as const,
      dateLabel: 'June 2026',
      isDateTBA: false,
      location: 'Bengaluru Campus',
      description: 'Over 150 candidates with disabilities interviewed with top IT, BFSI, and retail corporate partners for full-time roles.',
      ctaLabel: 'Read Event Summary',
      ctaLink: '/resources/blog',
    },
    {
      title: 'WinVinaya Academy Cohort 17 Graduation & Placement Drive',
      categoryLabel: 'WinVinaya Academy',
      status: 'COMPLETED' as const,
      dateLabel: 'April 2026',
      isDateTBA: false,
      location: 'Bengaluru & Hybrid',
      description: 'Graduation ceremony celebrating 45 scholars with disabilities who successfully completed full-stack software development and financial services training.',
      ctaLabel: 'View Gallery Album',
      ctaLink: '/programs/events-gallery#gallery',
    },
    {
      title: 'National Sign Language Awareness & Inclusive Workplace Workshop',
      categoryLabel: 'Community & Outreach',
      status: 'COMPLETED' as const,
      dateLabel: 'January 2026',
      isDateTBA: false,
      location: 'Virtual',
      description: 'Awareness workshop for ally communities, corporate volunteers, and educators introducing basic Indian Sign Language (ISL) communication.',
      ctaLabel: 'Explore ISL Lessons',
      ctaLink: '/involve/sign-language',
    },
  ];

  for (const evt of initialEvents) {
    const categoryId = categoryMap.get(evt.categoryLabel);
    if (!categoryId) continue;

    const existing = await prisma.event.findFirst({
      where: { title: evt.title },
    });

    if (!existing) {
      await prisma.event.create({
        data: {
          title: evt.title,
          categoryId,
          status: evt.status,
          dateLabel: evt.dateLabel,
          isDateTBA: evt.isDateTBA,
          location: evt.location,
          description: evt.description,
          ctaLabel: evt.ctaLabel,
          ctaLink: evt.ctaLink,
          isActive: true,
        },
      });
      console.log(`Seeded event: [${evt.status}] ${evt.title}`);
    }
  }

  // Seed sample reports and ensure directory structure exists
  const path = await import('path');
  const fs = await import('fs');

  const baseUploadsDir = path.join(process.cwd(), 'uploads', 'reports');

  const initialReports = [
    // Annual Reports
    {
      title: 'Annual Report 2024–2025',
      category: 'ANNUAL' as const,
      year: '2024–2025',
      description: 'Annual impact, reach, and program milestone achievements.',
      fileName: 'Annual_Report_2024_2025.pdf',
      mimeType: 'application/pdf',
      subfolder: 'annual',
    },
    {
      title: 'Annual Report 2023–2024',
      category: 'ANNUAL' as const,
      year: '2023–2024',
      description: 'Comprehensive annual performance review.',
      fileName: 'Annual_Report_2023_2024.pdf',
      mimeType: 'application/pdf',
      subfolder: 'annual',
    },
    {
      title: 'Annual Report 2022–2023',
      category: 'ANNUAL' as const,
      year: '2022–2023',
      description: 'Yearly program metrics and scholar placements.',
      fileName: 'Annual_Report_2022_2023.pdf',
      mimeType: 'application/pdf',
      subfolder: 'annual',
    },
    {
      title: 'Annual Report 2021–2022',
      category: 'ANNUAL' as const,
      year: '2021–2022',
      description: 'Impact highlights and skilling metrics.',
      fileName: 'Annual_Report_2021_2022.pdf',
      mimeType: 'application/pdf',
      subfolder: 'annual',
    },
    {
      title: 'Annual Report 2016–2020',
      category: 'ANNUAL' as const,
      year: '2016–2020',
      description: 'Covers the founding years as a combined report.',
      fileName: 'Annual_Report_2016_2020.pdf',
      mimeType: 'application/pdf',
      subfolder: 'annual',
    },
    // Financial Reports
    {
      title: 'Financial Audited Report FY 2023–24',
      category: 'FINANCIAL' as const,
      year: 'FY 2023–24',
      description: 'Audited financial statements and balance sheet.',
      fileName: 'Financial_Report_FY_2023_24.pdf',
      mimeType: 'application/pdf',
      subfolder: 'financial',
    },
    {
      title: 'Financial Audited Report FY 2022–23',
      category: 'FINANCIAL' as const,
      year: 'FY 2022–23',
      description: 'Audited financial audit filing.',
      fileName: 'Financial_Report_FY_2022_23.pdf',
      mimeType: 'application/pdf',
      subfolder: 'financial',
    },
    {
      title: 'Financial Audited Report FY 2021–22',
      category: 'FINANCIAL' as const,
      year: 'FY 2021–22',
      description: 'Annual financial statement.',
      fileName: 'Financial_Report_FY_2021_22.pdf',
      mimeType: 'application/pdf',
      subfolder: 'financial',
    },
    {
      title: 'Financial Audited Report FY 2020–21',
      category: 'FINANCIAL' as const,
      year: 'FY 2020–21',
      description: 'Financial audit report.',
      fileName: 'Financial_Report_FY_2020_21.pdf',
      mimeType: 'application/pdf',
      subfolder: 'financial',
    },
    {
      title: 'Financial Audited Report FY 2019–20',
      category: 'FINANCIAL' as const,
      year: 'FY 2019–20',
      description: 'Audited balance sheet.',
      fileName: 'Financial_Report_FY_2019_20.pdf',
      mimeType: 'application/pdf',
      subfolder: 'financial',
    },
    // Legal Documents
    {
      title: '80G Certificate',
      category: 'LEGAL' as const,
      year: undefined,
      description: 'Tax exemption certificate for donors under Section 80G.',
      fileName: '80G_Certificate.pdf',
      mimeType: 'application/pdf',
      subfolder: 'legal',
    },
    {
      title: '12A Certificate',
      category: 'LEGAL' as const,
      year: undefined,
      description: 'Income tax exemption registration certificate for the trust.',
      fileName: '12A_Certificate.pdf',
      mimeType: 'application/pdf',
      subfolder: 'legal',
    },
    {
      title: 'CSR-1 MCA Approval Letter',
      category: 'LEGAL' as const,
      year: undefined,
      description: 'Ministry of Corporate Affairs CSR registration approval enabling corporate funding.',
      fileName: 'CSR1_Approval_Letter.pdf',
      mimeType: 'application/pdf',
      subfolder: 'legal',
    },
    // Research Resources
    {
      title: 'Disability Hiring Perspective Study — Feedback Insights',
      category: 'RESEARCH' as const,
      year: '2024',
      description: 'Field research insights on employer perceptions and PwD candidate integration.',
      fileName: 'Disability_Hiring_Perspective_Study.pdf',
      mimeType: 'application/pdf',
      subfolder: 'research',
    },
    {
      title: 'Recommendations for Training Persons with Disabilities',
      category: 'RESEARCH' as const,
      year: '2023',
      description: 'Guidelines on inclusive curriculum design and Indian Sign Language integration.',
      fileName: 'Recommendations_Training_PwDs.pdf',
      mimeType: 'application/pdf',
      subfolder: 'research',
    },
    {
      title: 'Recommendations for Hiring Persons with Disabilities',
      category: 'RESEARCH' as const,
      year: '2023',
      description: 'Actionable steps for talent acquisition teams sourcing PwD candidates.',
      fileName: 'Recommendations_Hiring_PwDs.pdf',
      mimeType: 'application/pdf',
      subfolder: 'research',
    },
    {
      title: 'Best Practices in Recruiting Deaf Candidates',
      category: 'RESEARCH' as const,
      year: '2023',
      description: 'Best practice guide for interview etiquette and ISL interpretation.',
      fileName: 'Best_Practices_Deaf_Recruitment.pdf',
      mimeType: 'application/pdf',
      subfolder: 'research',
    },
    {
      title: 'How Corporates Recruit & Integrate PwDs',
      category: 'RESEARCH' as const,
      year: '2022',
      description: 'Case studies of corporate onboarding and workplace accommodations.',
      fileName: 'Corporate_PwD_Integration_Guide.pdf',
      mimeType: 'application/pdf',
      subfolder: 'research',
    },
  ];

  for (const rep of initialReports) {
    const folderPath = path.join(baseUploadsDir, rep.subfolder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.join(folderPath, rep.fileName);
    if (!fs.existsSync(filePath)) {
      // Create sample PDF placeholder content if file doesn't exist
      const samplePdfContent = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kinds [] /Count 1 /Kids [3 0 R] >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 50 >>\nstream\nBT /F1 12 Tf 100 700 TD (${rep.title}) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000206 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n306\n%%EOF`;
      fs.writeFileSync(filePath, samplePdfContent);
    }

    const fileUrl = `/uploads/reports/${rep.subfolder}/${rep.fileName}`;
    const fileSize = fs.statSync(filePath).size;

    const existing = await prisma.report.findFirst({
      where: { title: rep.title, category: rep.category },
    });

    if (!existing) {
      await prisma.report.create({
        data: {
          title: rep.title,
          category: rep.category,
          year: rep.year,
          description: rep.description,
          fileUrl,
          fileName: rep.fileName,
          fileSize,
          mimeType: rep.mimeType,
          isActive: true,
        },
      });
      console.log(`Seeded report: [${rep.category}] ${rep.title}`);
    }
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
