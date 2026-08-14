export const academyHeroContent = {
  eyebrow: 'WinVinaya Academy',
  awardBadge: 'Winner — ATF Award, Best Assistive Technology Initiative among NGOs (2023)',
  headline: "India's First Digital Learning Academy Built for Persons with Disabilities.",
  subheadline:
    'Learn anytime, anywhere — in Indian Sign Language or Simple English, with courses built for real jobs, not just certificates.',
};

export const whyWeBuiltItContent = {
  eyebrow: 'Why We Built It',
  headline: 'Born out of a crisis. Built to last beyond it.',
  body: 'When the pandemic shut down in-person training in 2020, WinVinaya Foundation launched WinVinaya Academy within weeks — a cloud-based learning platform that let candidates keep learning without ever losing momentum. What started as an emergency response became something bigger: India\'s first digital learning platform designed specifically for persons with disabilities, now a core part of how we train, years after the crisis that created it.',
  highlights: [
    { year: '2020', title: 'Crisis Response', description: 'Launched within weeks during lockdown to preserve candidate momentum.' },
    { year: 'Cloud-Based', title: 'Universal Access', description: 'Zero physical barriers, accessible from any location or device.' },
    { year: 'Permanent Shift', title: 'Core Flagship', description: 'Evolved into India\'s premier accessible digital learning academy.' },
  ],
};

export const whatMakesItDifferentContent = {
  eyebrow: 'What Makes It Different',
  headline: 'Built for accessibility first, not retrofitted for it.',
  pillars: [
    {
      title: 'Two Learning Mediums',
      description:
        'Every course is available in Simple English and Indian Sign Language, so hearing- and speech-impaired candidates learn in a language built for them, not translated for them.',
      icon: 'signLanguage',
    },
    {
      title: 'Experiential by Design',
      description:
        '90% of course content is hands-on — exercises, simulations, and activities aligned to real industry tasks, not passive video lectures.',
      icon: 'handsOn',
    },
    {
      title: 'Learn Anytime, Anywhere',
      description:
        'Fully cloud-based, so location, mobility, or access to a training center is never a barrier to learning.',
      icon: 'cloudAccess',
    },
  ],
};

export const whatYouCanLearnContent = {
  eyebrow: 'What You Can Learn',
  headline: 'Courses built around what employers are actually hiring for.',
  body: 'Courses are built for both STEM and non-STEM candidates — you don\'t need a technical background to start.',
  footnote: 'More courses added regularly — expansion is ongoing',
  courses: [
    {
      title: 'Full Stack Software Development',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Java', 'Python', 'MySQL'],
      description: 'Comprehensive software engineering stack for product and services companies.',
    },
    {
      title: 'Core Banking & Financial Accounting',
      skills: ['Tally', 'MS Excel', 'MS Word'],
      description: 'Essential accounting and financial tools for corporate and banking operations.',
    },
    {
      title: 'MS Power BI',
      skills: ['Business Intelligence', 'Data Visualization', 'Dashboard Design'],
      description: 'In-demand data analytics and reporting tools for business decision-making.',
    },
    {
      title: 'English & Soft Skills',
      skills: ['Communication', 'Confidence', 'Workplace Readiness', 'Interview Prep'],
      description: 'Foundational communication and professional etiquette for career success.',
    },
  ],
};

export const whoItsForContent = {
  eyebrow: "Who It's For",
  headline: 'One platform, three ways in.',
  audiences: [
    {
      title: 'For Individual Candidates',
      subtitle: 'Self-Paced & Mentored',
      description: 'Learn independently at your own pace, with trainer support when you need it.',
      badgeColor: 'primary' as const,
    },
    {
      title: 'For Colleges & Schools',
      subtitle: 'EduConnect Program',
      description:
        'Through our EduConnect program, we\'ve partnered with 4+ inclusive colleges to bring WinVinaya Academy directly into classrooms, alongside expert-led training — helping students with disabilities become campus-placement ready, just like their peers.',
      badgeColor: 'secondary' as const,
    },
    {
      title: 'For Partner NGOs & Institutions',
      subtitle: 'Ecosystem Sharing',
      description:
        'We share the platform and our training best practices so foundational skills like English and coding can be taught earlier, closing skill gaps before candidates ever reach the job market.',
      badgeColor: 'info' as const,
    },
  ],
};

export const impactSoFarContent = {
  eyebrow: 'The Impact So Far',
  headline: 'A platform that scaled trust into results.',
  stats: [
    { value: '1,440+', label: 'Candidates trained across all programs' },
    { value: '24', label: 'States of India, plus Nepal' },
    { value: '18', label: 'Disability categories represented' },
    { value: 'Fortune 500', label: 'Top-tier corporate placements' },
  ],
  placements: ['JPMorgan Chase', 'Wipro', 'HP', 'Dell', 'NetApp'],
};

export const builtWithPartnersContent = {
  eyebrow: 'Built With Partners',
  headline: "We didn't build this alone.",
  body: 'WinVinaya Academy exists because of technology and content partners who stepped up when it mattered — Amphisoft provided the digital platform, Yunikee helped build Indian Sign Language course content, and Chipper Sage powered our English learning courses. This is what\'s possible when technology companies commit to accessibility.',
  partners: [
    {
      name: 'Amphisoft',
      role: 'Digital Platform Partner',
      description: 'Provided the robust digital platform infrastructure powering WinVinaya Academy.',
    },
    {
      name: 'Yunikee',
      role: 'ISL Content Partner',
      description: 'Helped craft rich Indian Sign Language course content for hearing-impaired learners.',
    },
    {
      name: 'Chipper Sage',
      role: 'English Learning Partner',
      description: 'Powered interactive English language and communication learning modules.',
    },
  ],
};

export const academyClosingCtaContent = {
  forCandidates: {
    eyebrow: 'For Candidates',
    headline: 'Start learning today — no cost, no barriers.',
    buttonText: 'Enroll in WinVinaya Academy',
    link: '/contact',
    ctaColor: 'primary' as const,
  },
  forDonors: {
    eyebrow: 'For Donors',
    headline: 'Help us build the next course.',
    body: 'Your support funds new course development, sign language content creation, and platform expansion to reach more candidates.',
    buttonText: 'Support WinVinaya Academy',
    link: '/donate',
    ctaColor: 'secondary' as const,
  },
  forInstitutions: {
    eyebrow: 'For Institutions',
    headline: 'Bring WinVinaya Academy to your students.',
    buttonText: 'Partner With Us',
    link: '/involve/corporate-engagement',
    ctaColor: 'info' as const,
  },
};
