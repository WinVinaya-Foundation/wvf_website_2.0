import type { CtaLink } from '../../model/content';

export const programsHeroContent = {
  eyebrow: 'WinVinaya Training Programs',
  headline: 'Skills That Open Doors.',
  subheadline:
    'We train persons with disabilities in the same in-demand technical and business skills that top companies hire for — free of cost, and built around real accessibility.',
  impactStats: [
    { label: 'Candidates trained', value: '1,000+' },
    { label: 'States + Nepal', value: '24' },
    { label: 'Disability categories represented', value: '18' },
  ],
};

export const programNeedContent = {
  eyebrow: 'The Need — Why This Program Exists',
  headline: "The gap isn't ability. It's opportunity.",
  body: 'India is home to over 20 million persons with disabilities, yet only 13% complete secondary education and just 8.5% graduate. Despite this, private-sector employment of PWDs stands at a mere 0.36% — not because candidates lack ability, but because most training programs stop at basic vocational skills instead of the advanced, industry-grade skills employers actually hire for. WinVinaya Foundation exists to close that exact gap — training candidates to compete for real jobs, not just entry-level placements.',
  stats: [
    { value: '20M+', label: 'Persons with disabilities in India' },
    { value: '13%', label: 'Complete secondary education' },
    { value: '8.5%', label: 'Graduate from higher education' },
    { value: '0.36%', label: 'Private-sector employment of PWDs' },
  ],
};

export const trainingTracksContent = {
  eyebrow: 'Our Core Training Tracks',
  headline: 'Industry-grade skills, not just basic training.',
  tracks: [
    {
      title: 'Track 1 — IT Full Stack Program',
      skills: ['Java', 'SQL', 'HTML5', 'CSS3', 'Angular', 'Agile Methodology'],
      description:
        'The same stack used by product and IT services companies across India. Candidates leave job-ready for developer and QA roles, not just support functions.',
    },
    {
      title: 'Track 2 — Banking & Business Process Automation Program',
      skills: [
        'Banking Fundamentals',
        'Microsoft Power BI',
        'Power Automate',
        'Investment Banking Modules',
        'Reconciliation Modules',
      ],
      description:
        "Built for the BFSI sector's growing demand for automation and analytics talent.",
    },
  ],
  sharedFoundation: {
    title: 'Shared foundation (both tracks)',
    skills: ['English Communication', 'MS Office (Word & Excel)', 'Agile Fundamentals', 'Soft Skills'],
    description:
      "Because technical skill alone doesn't guarantee workplace success; confidence and communication do.",
  },
};

export const teachingModelContent = {
  eyebrow: 'How We Teach — Our Training Model',
  headline: 'A blended model built for real accessibility.',
  body: 'Training combines our own digital learning platform, WinVinaya Academy, with direct, hands-on guidance from experienced trainers — so candidates get self-paced flexibility and human mentorship together. Content is delivered in simple English and Indian Sign Language, removing barriers that most mainstream training programs never even consider.',
  link: {
    label: 'Explore WinVinaya Academy',
    to: '/programs/academy',
  } satisfies CtaLink,
};

export const partnershipsContent = {
  eyebrow: 'Our Reach — Academic & Institutional Partnerships',
  headline: 'Reaching candidates earlier, in more places.',
  body: 'We partner with inclusive schools, colleges, and universities to bring WinVinaya Academy directly to students — alongside a Train-the-Teachers program that helps institutions close foundational skill gaps (like English communication) long before a candidate reaches the job market.',
  partners: [
    { name: 'TEACH', location: 'Mumbai' },
    { name: 'NISH', location: 'Thiruvananthapuram' },
    { name: 'CDAP', location: 'Trichy' },
    { name: 'Bishop Moore College', location: 'Manakala, Kerala' },
  ],
};

export const employmentContent = {
  eyebrow: 'From Training to Employment',
  headline: 'Training that ends in a paycheck, not a certificate.',
  body: 'Every candidate receives free skill assessment and placement assistance once training is complete. We work directly with companies — from Fortune 500 names to MSMEs — helping them understand disability, skillsets, and how to hire well. Candidates have gone on to roles at organizations including JPMorgan Chase, Wipro, HP, Dell, NetApp, and Societe Generale Global Solution Center.',
  companies: [
    'JPMorgan Chase',
    'Wipro',
    'HP',
    'Dell',
    'NetApp',
    'Societe Generale Global Solution Center',
  ],
  link: {
    label: 'See Placement & Performance Reports',
    to: '/about/reports',
  } satisfies CtaLink,
};

export const voiceFromProgramContent = {
  eyebrow: 'A Voice From the Program',
  quote:
    'Most people assume visually challenged persons cannot do coding — I don\'t believe that. I lead the Sourcing team at WVF and still pursue coding in Java. WVF helped me create an identity for myself and support my family.',
  author: 'Dhanraj Poojary',
  role: 'Sourcing Specialist, WinVinaya Foundation',
};

export const programsClosingCtaContent = {
  forCandidates: {
    eyebrow: 'For Candidates',
    headline: 'Ready to build your career?',
    body: 'Training is free. All we ask is commitment.',
    buttonText: 'Apply for Training',
    link: '/contact',
  },
  forDonors: {
    eyebrow: 'For Donors',
    headline: '₹25,000 sponsors one candidate\'s full training.',
    body: 'Cover English, soft skills, and either IT or BFSI training for one person, start to finish.',
    buttonText: 'Sponsor a Candidate',
    link: '/donate',
  },
};
