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
  { label: 'Workplace Inclusion', color: 'SECONDARY' as const },
  { label: 'Sign Language', color: 'PRIMARY' as const },
  { label: 'Community & Training', color: 'WARNING' as const },
  { label: 'Accessibility', color: 'INFO' as const },
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

  // Seed sample blog posts
  const initialBlogPosts = [
    {
      slug: 'pwd-employment-gap-should-alarm-every-employer',
      title: "Why India's 0.36% PWD Employment Number Should Alarm Every Employer",
      excerpt:
        "A workforce gap this large isn't a diversity footnote — it's a hiring strategy sitting untouched. Here's what the number actually means for your talent pipeline.",
      categoryLabel: 'Workplace Inclusion',
      authorName: 'Corporate Engagement Team',
      authorRole: 'WinVinaya Foundation',
      publishedAt: new Date('2026-08-13T00:00:00.000Z'),
      body: [
        { type: 'paragraph', text: "Every year, the same statistic gets repeated at panels and CSR briefings: private-sector employment of persons with disabilities (PWDs) in India sits at just 0.36%. It's usually delivered as a moral appeal. It should be read as a business one." },
        { type: 'heading', text: 'The number behind the number' },
        { type: 'paragraph', text: 'India has more than 20 million persons with disabilities of working age. A 0.36% private-sector employment rate means the overwhelming majority of that population is either unemployed, underemployed, or working entirely outside formal channels — despite having the same range of skills, ambitions, and qualifications as any other candidate pool.' },
        { type: 'paragraph', text: 'For an employer running a normal hiring funnel, this reads differently: it is a segment of skilled, job-ready talent that almost nobody is actively competing for.' },
        { type: 'quote', text: "Hiring inclusively isn't charity work bolted onto a business. Done right, it's just good recruiting into a pool almost nobody else is looking at." },
        { type: 'heading', text: 'What changes when companies actually look' },
        { type: 'bulletList', items: ["Retention improves — candidates who've had to fight for opportunity tend to stay when they find a workplace that backs them.", 'Problem-solving gets more diverse — different lived experience means different approaches to the same technical problem.', 'The workforce starts to reflect the customer base — a meaningful share of any customer base lives with disability too.'] },
        { type: 'paragraph', text: 'None of this requires lowering a bar. It requires building a pipeline that reaches candidates who were never going to show up in a standard job posting — and preparing hiring teams to evaluate them fairly once they do.' },
        { type: 'heading', text: 'Why the number stays flat year after year' },
        { type: 'paragraph', text: "0.36% has not moved much in years, and it is worth asking why, given how often the statistic gets cited in exactly the rooms where hiring decisions get made. The honest answer is that citing a number and building a pipeline against it are two completely different amounts of effort, and most organizations stop at the first one." },
        { type: 'paragraph', text: "A CSR report can mention the employment gap, fund an awareness campaign, and close the fiscal year having changed nothing about who actually gets interviewed. None of that is dishonest, exactly — it is just adjacent to the problem rather than aimed at it. The number only moves when a hiring pipeline changes, not when a report does." },
        { type: 'heading', text: 'What a real pipeline actually needs' },
        { type: 'paragraph', text: "A one-off job fair doesn't move this number. The employers who see real results treat sourcing as an ongoing relationship rather than a seasonal event — a standing line to organizations that already work with skilled PWD candidates, so open roles get matched continuously instead of scrambled together whenever a CSR deadline approaches." },
        { type: 'paragraph', text: "The second piece is internal readiness. A sourcing pipeline that dumps qualified candidates in front of hiring managers who've never had a structured conversation about disability etiquette just moves the friction one step later in the process — into interviews and onboarding, where it's harder to see and easier to misdiagnose as a 'fit' problem." },
        { type: 'heading', text: 'Where to start' },
        { type: 'paragraph', text: "The employers making real progress here aren't running one-off awareness weeks. They're pairing sensitization for hiring managers with an actual sourcing pipeline — so awareness turns into an offer letter, not just a better internal conversation." },
        { type: 'paragraph', text: 'That pairing is the whole model behind our Corporate Engagement work: a short consultation to understand where a company actually is, sensitization sized to that starting point, and candidate matching against roles that are genuinely open — not a symbolic placement designed to look good in a CSR report and nowhere else.' },
      ],
    },
    {
      slug: 'learning-indian-sign-language-as-a-beginner',
      title: 'What It Is Really Like to Learn Indian Sign Language as a Beginner',
      excerpt:
        'No prior experience, no classroom — just a willingness to feel a little awkward at first. Here is what the first few weeks of learning ISL actually look like.',
      categoryLabel: 'Sign Language',
      authorName: 'Sign Language & Accessibility Team',
      authorRole: 'WinVinaya Foundation',
      publishedAt: new Date('2026-07-30T00:00:00.000Z'),
      body: [
        { type: 'paragraph', text: "Most people who start learning Indian Sign Language (ISL) expect it to feel like learning vocabulary — a hand shape standing in for a word, memorized one at a time. The surprising part is how quickly it stops feeling like translation and starts feeling like a different way of talking altogether." },
        { type: 'heading', text: 'Week one: everything feels slow' },
        { type: 'paragraph', text: "The first signs most beginners learn are greetings — Good Morning, Good Evening, Good Night — because they're short, visual, and forgiving of imperfect form. Fumbling through \"Good Morning\" a dozen times before it feels natural is completely normal, and it's the same experience nearly everyone starting out reports." },
        { type: 'quote', text: 'I hope you can try learning it now, just like I learned by myself.', attribution: 'A WinVinaya trainer, on first attempting ISL alone' },
        { type: 'heading', text: 'Week two: phrases start connecting' },
        { type: 'paragraph', text: 'Once the alphabet and basic greetings settle in, common phrases — "How are you?", "Where are you from?" — start to click faster than expected, because they reuse hand shapes already learned. This is where most people notice the shift: ISL stops feeling like a list of separate signs and starts feeling like a language with its own grammar and rhythm.' },
        { type: 'bulletList', items: ['Facial expression carries real grammatical weight — not just emotion.', 'Word order in ISL often differs from spoken English or Hindi.', 'Space matters — where you sign something can indicate who or what you are referring to.'] },
        { type: 'heading', text: "Why it's worth the awkward stretch" },
        { type: 'paragraph', text: "India has over 400 educational institutions for the Deaf, and nearly 95% of them lack a qualified sign language instructor. That gap isn't abstract — it shows up in classrooms, in workplaces, and in ordinary conversations that don't happen because neither side knows where to start. Every person who learns even basic signs is one less place where that gap shows up." },
        { type: 'heading', text: "It's not a substitute for an interpreter — and that's fine" },
        { type: 'paragraph', text: "Learning a handful of greetings does not make anyone fluent, and it should not be mistaken for the fluency a qualified interpreter brings to a meeting, a classroom, or a medical appointment. That distinction matters, and beginners should hold it honestly rather than overstating what a few weeks of self-study can do." },
        { type: 'paragraph', text: "What it does change is the very first moment of contact. A hearing colleague who can sign 'Good Morning' unprompted signals something an interpreter booking form never will: that they bothered to learn, before there was any obligation to. That single gesture tends to set the tone for everything that follows in the working relationship." },
        { type: 'paragraph', text: "The honest advice for anyone starting out is the same advice that shows up in almost every account of learning ISL independently: begin with the signs you'll actually use every day, get comfortable being visibly a beginner in front of someone else, and treat the awkward first few weeks as the whole point rather than something to get past quickly." },
      ],
    },
    {
      slug: 'inside-a-disability-sensitization-workshop',
      title: 'Inside a Disability Sensitization Workshop: What Actually Happens',
      excerpt:
        "It's not a lecture with slides. Here's what a real sensitization session — movement, breathing, honest conversation — actually looks like in the room.",
      categoryLabel: 'Community & Training',
      authorName: 'Training & Sensitization Team',
      authorRole: 'WinVinaya Foundation',
      publishedAt: new Date('2026-07-16T00:00:00.000Z'),
      body: [
        { type: 'paragraph', text: "Say the word \"sensitization\" to most corporate teams and they picture a compliance slide deck — an hour of definitions, followed by a quiz nobody remembers a week later. That's not what happens in the room." },
        { type: 'heading', text: "It starts with the body, not a slide" },
        { type: 'paragraph', text: "A recent session at Athma Sakthi Vidyalaya in Bengaluru opened with movement and breathing exercises — not a single definition of \"disability\" on a screen. The goal wasn't to explain a category of people in the abstract. It was to get a room of participants and trainers to slow down enough to actually notice each other." },
        { type: 'paragraph', text: 'Simple Indian Sign Language was woven in throughout, so communication itself became part of the exercise rather than a side note about "accessibility."' },
        { type: 'heading', text: 'Assumption, not hostility, is the real barrier' },
        { type: 'paragraph', text: 'Most exclusion at work is not malicious. It is the quiet assumption that a visually impaired colleague cannot code, or that a Deaf teammate cannot run a meeting — assumptions nobody says out loud, but that shape who gets hired, mentored, and promoted.' },
        { type: 'orderedList', items: ['Notice the assumption before it becomes a decision.', 'Replace it with a direct question instead of a guess.', 'Let the answer — not the guess — inform what happens next.'] },
        { type: 'paragraph', text: 'That three-step shift is the entire point of a sensitization session. Not sympathy. Not a certificate. Just enough honest, uncomfortable conversation that assumption stops doing the deciding.' },
        { type: 'heading', text: 'Why experience beats explanation' },
        { type: 'paragraph', text: "A slide that states a fact is easy to nod along to and just as easy to forget by the following week. An exercise that asks a participant to navigate a simple task differently — guided by touch, or by a sign instead of a spoken instruction — tends to stay with people much longer, because it was felt rather than told." },
        { type: 'paragraph', text: "That is why trainers keep the format loose and physical instead of locking it to a fixed slide deck. The exercises change depending on the room — a school audience gets a different pace than a corporate one — but the underlying goal stays the same: get people out of the passive, note-taking posture they bring to most workplace training." },
        { type: 'paragraph', text: "Feedback from sessions like the one at Athma Sakthi Vidyalaya consistently mentions the same thing, in different words: participants expected to sit through a lecture, and instead left having had an actual conversation. That shift in expectation is usually the clearest sign the session worked." },
      ],
    },
    {
      slug: '5-workplace-myths-about-disability',
      title: 'Five Workplace Myths About Disability We Hear All the Time',
      excerpt:
        'We hear these in nearly every first conversation with a new hiring partner. None of them hold up once you look at what actually happens after hiring.',
      categoryLabel: 'Workplace Inclusion',
      authorName: 'Corporate Engagement Team',
      authorRole: 'WinVinaya Foundation',
      publishedAt: new Date('2026-07-02T00:00:00.000Z'),
      body: [
        { type: 'paragraph', text: 'Nearly every first conversation with a new corporate partner starts with the same handful of concerns — usually unspoken until someone finally asks. Here are the five we hear most, and what actually happens once a company hires inclusively.' },
        { type: 'heading', text: 'Myth 1: "It will slow down the team."' },
        { type: 'paragraph', text: 'In practice, most accommodations are inexpensive and quick to set up — screen-reader compatible software, a flexible seating arrangement, an interpreter for a handful of meetings a month. The slowdown teams actually notice is the one that happens before hiring, from hesitation.' },
        { type: 'paragraph', text: "That hesitation usually shows up as delay, not refusal — a role sits open for months while a hiring manager quietly decides not to move a strong candidate forward, without ever naming the concern out loud. The fix isn't a policy change. It's giving that manager one direct, low-stakes conversation before the decision gets made." },
        { type: 'heading', text: 'Myth 2: "We will not know how to communicate."' },
        { type: 'paragraph', text: 'This is the one sensitization sessions solve directly. A short orientation on etiquette and communication — not a certification course — is usually enough for a team to stop worrying about saying the wrong thing and start having a normal working relationship.' },
        { type: 'paragraph', text: "The interview itself rarely needs to change much either — extra time for a written assessment, an accessible format for take-home material, or an interpreter booked in advance usually covers it. What's being evaluated doesn't change; only a few logistics around it do." },
        { type: 'heading', text: 'Myth 3: "There are not enough qualified candidates."' },
        { type: 'paragraph', text: 'This is the myth the data pushes back on hardest. Persons with disabilities in India represent a skilled, underemployed population in the tens of millions — the shortage is in sourcing pipelines, not in qualified people.' },
        { type: 'paragraph', text: "Most companies that believe this myth have never actually run a sourcing pipeline built to reach this candidate pool — they've only posted a standard job listing and waited. A pipeline built with an organization already working with skilled PWD candidates produces a very different applicant pool within weeks, not months." },
        { type: 'heading', text: 'Myth 4: "It is mainly a compliance checkbox."' },
        { type: 'paragraph', text: 'Companies that treat it as a checkbox tend to hire once and stop. Companies that build a real pipeline keep hiring — because the retention and performance numbers hold up long after the first CSR report is filed.' },
        { type: 'heading', text: 'Myth 5: "Our managers will not know how to support someone long-term."' },
        { type: 'paragraph', text: 'This is usually the last concern raised, and the easiest to solve — regular check-ins during onboarding do most of the work, the same way they would for any new hire settling into a new team.' },
        { type: 'paragraph', text: 'None of these myths survive first contact with an actual hiring process. They survive because most companies never get that far.' },
        { type: 'heading', text: 'Why the list keeps repeating' },
        { type: 'paragraph', text: "These five concerns show up in almost the same order, almost every time, regardless of industry or company size. That consistency is actually useful — it means a hiring team can prepare for the conversation in advance instead of discovering the objections one at a time, mid-process, when momentum is easiest to lose." },
      ],
    },
    {
      slug: 'assistive-tech-101-screen-readers',
      title: 'Assistive Tech 101: What Screen Readers Are, and What Developers Get Wrong',
      excerpt:
        'A screen reader does not "see" your interface — it hears a structure. Here is what that means for the sites and apps you are building.',
      categoryLabel: 'Accessibility',
      authorName: 'Accessibility Design Team',
      authorRole: 'WinVinaya Foundation',
      publishedAt: new Date('2026-06-18T00:00:00.000Z'),
      body: [
        { type: 'paragraph', text: "A screen reader converts on-screen content into speech or braille output, letting someone who is blind or has low vision navigate software by ear or by touch instead of by sight. It doesn't interpret a page the way a sighted user does — it reads the underlying structure, in order, exactly as the code describes it." },
        { type: 'heading', text: 'The gap between "looks right" and "reads right"' },
        { type: 'paragraph', text: "A page can look perfectly organized on screen and still be unusable with a screen reader, because visual layout and code structure aren't the same thing. A heading that's styled to look big and bold but marked up as a plain paragraph is invisible to a screen reader's navigation — it just becomes more text in a wall of text." },
        { type: 'bulletList', items: ['Icon-only buttons need a text label a screen reader can announce — not just a tooltip.', 'Images that carry meaning need real alt text, not a blank or purely decorative tag.', 'Custom components (dropdowns, modals, tabs) need the same keyboard behavior a native element would have for free.'] },
        { type: 'heading', text: 'The fix is usually smaller than it sounds' },
        { type: 'paragraph', text: 'Most of this is not a redesign — it is using the correct HTML element in the first place, and writing alt text that describes function rather than appearance. A button coded as a button, a heading coded as a heading, and an image description that says what an image does rather than what it looks like will resolve the majority of real-world screen reader complaints.' },
        { type: 'quote', text: 'The only real test is trying your own interface with a screen reader turned on — not assuming it works because it looks fine.' },
        { type: 'paragraph', text: "It's a five-minute habit that catches problems no amount of visual QA ever will." },
        { type: 'heading', text: 'Screen readers are one part of a bigger picture' },
        { type: 'paragraph', text: 'Screen reader support is the assistive technology developers hear about most, but it is not the only one worth testing against. Keyboard-only navigation, sufficient color contrast, and predictable focus order matter to a much wider range of users — including people who cannot use a mouse at all, and people who simply prefer the keyboard.' },
        { type: 'paragraph', text: 'A quick, practical check: unplug the mouse, and try to complete a core task on your own product using only Tab, Shift+Tab, and Enter. If the focus indicator disappears, or a control becomes unreachable, that is very often the exact same underlying issue a screen reader user will hit — just visible without needing any assistive technology installed at all.' },
      ],
    },
    {
      slug: 'from-intern-to-hire-placement-model',
      title: "From Intern to Hire: What Makes WinVinaya's Placement Model Different",
      excerpt:
        'Most internship programs end with a certificate. Ours are built to end with an offer letter. Here is the difference in how that actually works.',
      categoryLabel: 'Community & Training',
      authorName: 'Talent & Placements Team',
      authorRole: 'WinVinaya Foundation',
      publishedAt: new Date('2026-06-04T00:00:00.000Z'),
      body: [
        { type: 'paragraph', text: 'A lot of internship programs are built around a fixed curriculum and a completion certificate. Ours is built around one different question: what does this person need in order to walk into a real hiring conversation ready?' },
        { type: 'heading', text: 'Real projects, not busywork' },
        { type: 'paragraph', text: 'Interns at WinVinaya work on the same systems, documents, and course material used by hundreds of live candidates — not simulated exercises built just for training. A redesigned course module or a remediated document goes into use almost immediately, which changes how seriously interns treat the work.' },
        { type: 'heading', text: 'The bridge most programs skip' },
        { type: 'paragraph', text: 'The step most internship programs miss is the handoff — connecting a strong intern to an actual hiring manager, at an actual company, before the internship ends. That is the part we build the program around, not the part we leave to chance.' },
        { type: 'orderedList', items: ['Interns are matched to a live, mission-critical project from week one.', 'Skill assessment happens continuously, not in a single exit interview.', 'Strong performers are introduced directly into our corporate placement pipeline — the same one used for our regular candidate placements.'] },
        { type: 'paragraph', text: "Prachi Pandey's path is a good example: she started with zero coding background and moved through a coding-focused engagement directly into an internship role at Allstate Solutions. That's not an outlier story we highlight because it's rare — it's the outcome the whole model is designed to produce." },
        { type: 'heading', text: 'What "ready" actually means' },
        { type: 'paragraph', text: 'Readiness, in this model, is not a certificate at the end of a fixed number of weeks. It is a specific, honest answer to the question of what a candidate can already do, what they still need, and which live roles those skills actually match — an answer that gets revisited continuously rather than decided once at the finish line.' },
        { type: 'paragraph', text: "That is also why internships here run anywhere from four to twelve weeks instead of a fixed term. Some interns are ready for a placement conversation early; others need longer with a given project before that conversation makes sense. Stretching or compressing the timeline to fit the person, instead of forcing the person to fit a fixed timeline, is a small operational choice that ends up mattering more than almost anything else in the program." },
      ],
    },
  ];

  for (const post of initialBlogPosts) {
    const categoryId = categoryMap.get(post.categoryLabel);
    if (!categoryId) continue;

    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
    });

    if (!existing) {
      await prisma.blogPost.create({
        data: {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          categoryId,
          authorName: post.authorName,
          authorRole: post.authorRole,
          publishedAt: post.publishedAt,
          body: post.body,
          isActive: true,
        },
      });
      console.log(`Seeded blog post: ${post.title}`);
    } else {
      await prisma.blogPost.update({
        where: { slug: post.slug },
        data: {
          title: post.title,
          excerpt: post.excerpt,
          categoryId,
          authorName: post.authorName,
          authorRole: post.authorRole,
          publishedAt: post.publishedAt,
          body: post.body,
        },
      });
      console.log(`Updated blog post: ${post.title}`);
    }
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
