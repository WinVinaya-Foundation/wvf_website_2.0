import type { CtaLink, PersonEntry } from '../../model/content';
import seethalakshmiImg from '../../assets/team/founders/Seethalakshmi_Kupuraj.png';
// import sivasankarImg from '../../assets/team/founders/Sivasankar.png';
import vijayImg from '../../assets/team/founders/Vijay_Kirpalani.png';

export const teamHero = {
  headline: 'Our Team',
  subheadline: 'The people who show up every day to turn belief into opportunity.',
};

export const leadership: PersonEntry[] = [
  {
    name: 'Seethalakshmi Kupuraj',
    role: 'Co-Founder',
    photo: seethalakshmiImg,
    linkedin: 'https://www.linkedin.com/in/seethalakshmi-kupuraj',
  },
  {
    name: 'Sivasankar Jayagopal',
    role: 'Founder Chairman',
    photo: "../../../assets/team/founders/sivasankar-1.png",
    linkedin: 'https://www.linkedin.com/in/sivasankarjayagopal',
  },
  {
    name: 'Vijay Kirpalani',
    role: 'Trustee',
    photo: vijayImg,
    linkedin: 'https://www.linkedin.com/company/winvinaya-foundation',
  },
];

export const advisors: PersonEntry[] = [
  { name: 'Anand Vissa', role: 'Advisor', linkedin: 'https://www.linkedin.com/company/winvinaya-foundation' },
  { name: 'Gopal Garg', role: 'Advisor', linkedin: 'https://www.linkedin.com/company/winvinaya-foundation' },
  { name: 'Sashi Rajamani', role: 'Advisor', linkedin: 'https://www.linkedin.com/company/winvinaya-foundation' },
  { name: 'Shantha', role: 'Advisor', linkedin: 'https://www.linkedin.com/company/winvinaya-foundation' },
];

export const employees: PersonEntry[] = [
  'Baskaran Arumugam',
  'Aravindan Ganesamoorthy',
  'Menaga Veeramani',
  'Ayyappan',
  'Dharanidaran',
  'Arun kumar',
  'Ann Jannet',
  'Saravana',
  'Rahul',
  'Solai Raj',
  'Magam Suresh',
  'Rajat Nautiyal',
  'Mari Muthu',
  'Jogeswara Rao',
  'Nagarathna',
  'Rathna PM',
  'Yogasri',
].map((name) => ({ name }));

export const consultants: PersonEntry[] = [
  'Kasthuri V',
  'Anusha Hana',
  'Ambika',
  'Christel Naomi Roberts',
  'Pricilla',
  'Maddali Gayathri',
  'Joshuva',
].map((name) => ({ name }));

export const alumni: string[] = [
  'Siva Sankar Vaddi',
  'Arti Arvind',
  'Guruprasad Rao Mudradi',
  'Sharon Coelho',
  'Meriba Kothapally',
  'Nedunchezhiyan',
  'Mereena Kurian',
  'Helenmary',
  'Leonardo Chutiya',
  'Vigneshwaran Rajagopal',
  'Dhanya',
  'Ashwin Ganesan',
  'Asbiya PS',
  'Ashin PJ',
  'Golla Manoj',
  'Mustaq Ahamad',
  'Pinipe Avinash',
  'Yogitha',
  'Bommineni Naveen',
  'Surya R Sagar',
  'Pavan Kumar',
  'Catherina Sebastian',
  'Sandra Reji',
  'Ushas Devasia',
  'Liyona Joby',
  'Santi Ratnam',
  'Vimal Mathew',
  'Divya',
  'Amutha',
  'Sulatha Venkatesh',
  'Vijaya',
  'Neeraja',
  'Laharee',
  'Dhanraj Poojary',
  'Ani Sunny',
  'Ramya Devika',
  'Josephine Shanthi',
  'Uma Jagannath',
  'Veeresh',
  'Sanjeeta Kakati',
  'Sushmitha Sunder',
  'Anupa Raichel Mathew',
  'Anusha',
  'Akhil Sakella',
  'Nataraja',
  'Vignesh Muthusubramanian',
  'Yashika Godugu',
  'Rashmi Venugopal',
  'Vaishnavi Gaitonde',
  'Susan George',
];

export const teamClosingCta = {
  headline: 'Want to be part of the team?',
  body: "We're always looking for passionate people to join us — as staff, volunteers, or partners.",
  ctas: [
    { label: 'View Open Roles', to: '/resources/careers' },
    { label: 'Volunteer With Us', to: '/involve/volunteer' },
  ] satisfies CtaLink[],
};
