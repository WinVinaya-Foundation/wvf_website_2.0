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

  // Seed all original success stories & candidate/partner testimonials
  const initialStories = [
    {
      name: 'Symonne Kotian',
      role: 'Graphic Designer',
      description:
        'Symonne Kotian is a creative person with a pleasant smile. She is skilled at graphic designing, proficient in software like Adobe Photoshop, Illustrator, and Canva. She is an amazing artist and a person with Cerebral Palsy. Watch the video to know more about her journey.',
      videoUrl: 'https://www.youtube.com/embed/2j45mfZ9iFI?autoplay=1',
      sortOrder: 1,
    },
    {
      name: 'Hemanth',
      role: 'Aspiring Director',
      description:
        "Hemanth is an M.Com graduate and an aspiring director. A cheerful, optimistic go-getter and a person with Cerebral Palsy, he's never let his disability stand in the way of his dreams. He shares his life, his dreams, and his support system — along with a thought-provoking message. Watch his story to know more.",
      videoUrl: 'https://www.youtube.com/embed/ntu7SKSjfUw?autoplay=1',
      sortOrder: 2,
    },
    {
      name: 'Anoop',
      role: 'Sign Language Advocate',
      description:
        "Anoop is a Deaf individual from Kerala who communicates using Sign Language. Though India has 400+ educational institutions for the deaf, almost 95% of them lack qualified sign language instructors — a gap Anoop's story speaks directly to. Watch his story to know more.",
      videoUrl: 'https://www.youtube.com/embed/b-rXnVXsSo4?autoplay=1',
      sortOrder: 3,
    },
    {
      name: 'Harikumar',
      role: 'QA-Automation Engineer, Caterpillar-Randstad',
      description:
        'They trained me in Java, SQL and Soft Skills. I later got placed in Caterpillar as an Associate Engineer. They are working for a great cause in society.',
      videoUrl: 'https://www.youtube.com/embed/2j45mfZ9iFI',
      sortOrder: 4,
    },
    {
      name: 'Priyanka Kumari',
      role: 'Associate, Mindtree Limited',
      description:
        'My English was also not good, but they helped me improve my speaking skills and prepare for interviews. After some effort, I was placed in an internship with Allstate.',
      videoUrl: 'https://www.youtube.com/embed/ntu7SKSjfUw',
      sortOrder: 5,
    },
    {
      name: 'Kartik Vurukonda',
      role: 'Inductee, ICICI Prudential',
      description:
        'Today was my induction into ICICI Prudential, and no words would suffice to explain how much I am indebted to all of you. Thank you Shiva Sir and Akila Madam — you are the pillars of this organization.',
      videoUrl: 'https://www.youtube.com/embed/b-rXnVXsSo4',
      sortOrder: 6,
    },
    {
      name: 'Corporate Hiring Partner',
      role: 'Corporate Partner',
      description:
        'I want to thank you and your whole team for your tireless effort and patience helping us onboard two talented candidates. The support from interview through onboarding was fantastic and spot on.',
      videoUrl: 'https://www.youtube.com/embed/2j45mfZ9iFI',
      sortOrder: 7,
    },
    {
      name: 'Chippersage',
      role: 'English Training Partner',
      description:
        'Chippersage has been associated with WinVinaya helping differently-abled candidates develop fluency in communicative English. Our team members rejoice whenever their mentees receive job offers.',
      videoUrl: 'https://www.youtube.com/embed/ntu7SKSjfUw',
      sortOrder: 8,
    },
  ];

  for (const story of initialStories) {
    const existing = await prisma.story.findFirst({
      where: { name: story.name },
    });

    if (!existing) {
      await prisma.story.create({
        data: {
          name: story.name,
          role: story.role,
          description: story.description,
          videoUrl: story.videoUrl,
          sortOrder: story.sortOrder,
          isActive: true,
        },
      });
      console.log(`Seeded story: ${story.name}`);
    } else {
      await prisma.story.update({
        where: { id: existing.id },
        data: {
          role: story.role,
          description: story.description,
          videoUrl: story.videoUrl,
          sortOrder: story.sortOrder,
        },
      });
      console.log(`Updated story: ${story.name}`);
    }
  }

  // Seed sample testimonials across Candidate, Corporate, and Institutional categories
  const initialTestimonials = [
    {
      category: 'CANDIDATE' as const,
      name: 'Harikumar',
      role: 'QA-Automation Engineer, Caterpillar-Randstad',
      disability: 'Visual Impairment',
      quote:
        'They trained me in Java, SQL and Soft Skills. I later got placed in Caterpillar as an Associate Engineer. They are working for a great cause in society.',
      sortOrder: 1,
    },
    {
      category: 'CANDIDATE' as const,
      name: 'Priyanka Kumari',
      role: 'Associate, Mindtree Limited',
      disability: 'Cerebral Palsy',
      quote:
        'My English was also not good, but they helped me improve my speaking skills and prepare for interviews. After some effort, I was placed in an internship with Allstate.',
      sortOrder: 2,
    },
    {
      category: 'CANDIDATE' as const,
      name: 'Kartik Vurukonda',
      role: 'Inductee, ICICI Prudential',
      quote:
        'Today was my induction into ICICI Prudential, and no words would suffice to explain how much I am indebted to all of you. Thank you Shiva Sir and Akila Madam — you are the pillars of this organization.',
      sortOrder: 3,
    },
    {
      category: 'CORPORATE' as const,
      name: 'Corporate Hiring Partner',
      role: 'Talent Acquisition Team',
      quote:
        'I want to thank you and your whole team for your tireless effort and patience helping us onboard two talented candidates. The support from interview through onboarding was fantastic and spot on.',
      sortOrder: 4,
    },
    {
      category: 'CORPORATE' as const,
      name: 'Corporate Partner',
      role: 'Engineering Director',
      quote:
        "They don't just do social work — they develop some of the best talent and build real careers for differently-abled people. People from Shiva's organization continue working for us and deliver equal to or more than an abled person.",
      sortOrder: 5,
    },
    {
      category: 'INSTITUTIONAL' as const,
      name: 'Chippersage',
      role: 'English Training Partner',
      title: 'Communicative Fluency Partner',
      quote:
        'Chippersage has been associated with WinVinaya helping differently-abled candidates develop fluency in communicative English. Our team members rejoice whenever their mentees receive job offers.',
      sortOrder: 6,
    },
  ];

  for (const item of initialTestimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: item.name, category: item.category },
    });

    if (!existing) {
      await prisma.testimonial.create({
        data: {
          category: item.category,
          name: item.name,
          role: item.role,
          quote: item.quote,
          disability: item.disability || null,
          title: item.title || null,
          sortOrder: item.sortOrder,
          isActive: true,
        },
      });
      console.log(`Seeded testimonial: [${item.category}] ${item.name}`);
    } else {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: {
          role: item.role,
          quote: item.quote,
          disability: item.disability || null,
          title: item.title || null,
          sortOrder: item.sortOrder,
        },
      });
      console.log(`Updated testimonial: [${item.category}] ${item.name}`);
    }
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
