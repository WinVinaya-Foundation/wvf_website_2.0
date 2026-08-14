export const contactHero = {
  eyebrow: 'Contact Us',
  headline: "Let's Start a Conversation.",
  subheadline:
    "Have a question about our programs, want to volunteer, or ready to partner with us? We'd love to hear from you — reach out any way that works for you.",
};

export interface ContactChannel {
  label: string;
  value: string;
  description: string;
  href: string;
  icon: 'whatsapp' | 'email';
}

export const contactChannels: ContactChannel[] = [
  {
    label: 'Chat or Call',
    value: '+91 80085 33359',
    description: 'Chat with us on WhatsApp or give us a call — we typically respond within a day.',
    href: 'https://wa.me/918008533359',
    icon: 'whatsapp',
  },
  {
    label: 'Email Us',
    value: 'info@WinVinayaFoundation.org',
    description: "Want to know what we do and how we do it? Mail us and we'll get back to you.",
    href: 'mailto:info@WinVinayaFoundation.org',
    icon: 'email',
  },
];

export interface OfficeAddress {
  city: string;
  label: string;
  note?: string;
  lines: string[];
}

export const offices: OfficeAddress[] = [
  {
    city: 'Bengaluru',
    label: 'Registered Address',
    lines: ['25/3 Brindavan, 3rd Cross,', 'Saraswathi Puram, IIM Post,', 'Bengaluru, Karnataka - 560 076'],
  },
  {
    city: 'Bengaluru',
    label: 'Operational Address',
    lines: [
      'WinVinaya Foundation',
      'Royal Residency, 55, 4th Cross Road,',
      'BDA Layout, BTM 4th Stage,',
      'Bengaluru, Karnataka – 560076',
    ],
  },
  {
    city: 'Tirupur',
    label: 'Programs Office',
    note: 'Jointly run with The Manoharan Charitable Trust',
    lines: ['SF No. 34, Sri Venkateswara Nagar 1st Street,', 'Near Velan Hotel, Kangayem Main Road,', 'Tirupur - 641 601'],
  },
];

export const contactReasons = [
  'General Inquiry',
  'Volunteer With Us',
  'Corporate Partnership / CSR',
  'Donate / Support Us',
  'Careers',
  'Media & Press',
  'Feedback or Complaint',
  'Other',
] as const;

export const mapEmbedSrc =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4613.590712675673!2d77.60902667572225!3d12.882379216826802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae151d41300001%3A0x6787be44636dde7c!2sWinVinaya%20Foundation!5e1!3m2!1sen!2sin!4v1786628828914!5m2!1sen!2sin';
