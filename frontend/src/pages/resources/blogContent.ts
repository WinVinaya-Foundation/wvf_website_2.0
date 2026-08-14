export const blogHero = {
  eyebrow: 'Resources',
  headline: 'The WinVinaya Blog',
  subheadline: 'Stories, ideas, and honest field notes from our work building inclusive workplaces and classrooms across India.',
};

export type BlogCategoryKey = 'workplace' | 'signLanguage' | 'community' | 'accessibility';

export interface BlogCategoryMeta {
  key: BlogCategoryKey;
  label: string;
  color: 'primary' | 'secondary' | 'info' | 'warning';
}

export const blogCategories: BlogCategoryMeta[] = [
  { key: 'workplace', label: 'Workplace Inclusion', color: 'secondary' },
  { key: 'signLanguage', label: 'Sign Language', color: 'primary' },
  { key: 'community', label: 'Community & Training', color: 'warning' },
  { key: 'accessibility', label: 'Accessibility', color: 'info' },
];

export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'bulletList'; items: string[] }
  | { type: 'orderedList'; items: string[] };

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryKey;
  author: BlogAuthor;
  /** ISO date string (YYYY-MM-DD) */
  publishedAt: string;
  body: BlogContentBlock[];
}

/** Ordered newest to oldest — the first entry is the featured post on the blog hub, and this
 * order also drives "previous / next" navigation on the article page. */
export const blogPosts: BlogPost[] = [
  {
    slug: 'pwd-employment-gap-should-alarm-every-employer',
    title: "Why India's 0.36% PWD Employment Number Should Alarm Every Employer",
    excerpt:
      "A workforce gap this large isn't a diversity footnote — it's a hiring strategy sitting untouched. Here's what the number actually means for your talent pipeline.",
    category: 'workplace',
    author: { name: 'Corporate Engagement Team', role: 'WinVinaya Foundation' },
    publishedAt: '2026-08-13',
    body: [
      {
        type: 'paragraph',
        text: "Every year, the same statistic gets repeated at panels and CSR briefings: private-sector employment of persons with disabilities (PWDs) in India sits at just 0.36%. It's usually delivered as a moral appeal. It should be read as a business one.",
      },
      { type: 'heading', text: 'The number behind the number' },
      {
        type: 'paragraph',
        text: 'India has more than 20 million persons with disabilities of working age. A 0.36% private-sector employment rate means the overwhelming majority of that population is either unemployed, underemployed, or working entirely outside formal channels — despite having the same range of skills, ambitions, and qualifications as any other candidate pool.',
      },
      {
        type: 'paragraph',
        text: 'For an employer running a normal hiring funnel, this reads differently: it is a segment of skilled, job-ready talent that almost nobody is actively competing for.',
      },
      {
        type: 'quote',
        text: "Hiring inclusively isn't charity work bolted onto a business. Done right, it's just good recruiting into a pool almost nobody else is looking at.",
      },
      { type: 'heading', text: 'What changes when companies actually look' },
      {
        type: 'bulletList',
        items: [
          "Retention improves — candidates who've had to fight for opportunity tend to stay when they find a workplace that backs them.",
          'Problem-solving gets more diverse — different lived experience means different approaches to the same technical problem.',
          'The workforce starts to reflect the customer base — a meaningful share of any customer base lives with disability too.',
        ],
      },
      {
        type: 'paragraph',
        text: 'None of this requires lowering a bar. It requires building a pipeline that reaches candidates who were never going to show up in a standard job posting — and preparing hiring teams to evaluate them fairly once they do.',
      },
      { type: 'heading', text: 'Why the number stays flat year after year' },
      {
        type: 'paragraph',
        text: "0.36% has not moved much in years, and it is worth asking why, given how often the statistic gets cited in exactly the rooms where hiring decisions get made. The honest answer is that citing a number and building a pipeline against it are two completely different amounts of effort, and most organizations stop at the first one.",
      },
      {
        type: 'paragraph',
        text: "A CSR report can mention the employment gap, fund an awareness campaign, and close the fiscal year having changed nothing about who actually gets interviewed. None of that is dishonest, exactly — it is just adjacent to the problem rather than aimed at it. The number only moves when a hiring pipeline changes, not when a report does.",
      },
      { type: 'heading', text: 'What a real pipeline actually needs' },
      {
        type: 'paragraph',
        text: "A one-off job fair doesn't move this number. The employers who see real results treat sourcing as an ongoing relationship rather than a seasonal event — a standing line to organizations that already work with skilled PWD candidates, so open roles get matched continuously instead of scrambled together whenever a CSR deadline approaches.",
      },
      {
        type: 'paragraph',
        text: "The second piece is internal readiness. A sourcing pipeline that dumps qualified candidates in front of hiring managers who've never had a structured conversation about disability etiquette just moves the friction one step later in the process — into interviews and onboarding, where it's harder to see and easier to misdiagnose as a 'fit' problem.",
      },
      { type: 'heading', text: 'Where to start' },
      {
        type: 'paragraph',
        text: "The employers making real progress here aren't running one-off awareness weeks. They're pairing sensitization for hiring managers with an actual sourcing pipeline — so awareness turns into an offer letter, not just a better internal conversation.",
      },
      {
        type: 'paragraph',
        text: 'That pairing is the whole model behind our Corporate Engagement work: a short consultation to understand where a company actually is, sensitization sized to that starting point, and candidate matching against roles that are genuinely open — not a symbolic placement designed to look good in a CSR report and nowhere else.',
      },
    ],
  },
  {
    slug: 'learning-indian-sign-language-as-a-beginner',
    title: 'What It Is Really Like to Learn Indian Sign Language as a Beginner',
    excerpt:
      'No prior experience, no classroom — just a willingness to feel a little awkward at first. Here is what the first few weeks of learning ISL actually look like.',
    category: 'signLanguage',
    author: { name: 'Sign Language & Accessibility Team', role: 'WinVinaya Foundation' },
    publishedAt: '2026-07-30',
    body: [
      {
        type: 'paragraph',
        text: "Most people who start learning Indian Sign Language (ISL) expect it to feel like learning vocabulary — a hand shape standing in for a word, memorized one at a time. The surprising part is how quickly it stops feeling like translation and starts feeling like a different way of talking altogether.",
      },
      { type: 'heading', text: 'Week one: everything feels slow' },
      {
        type: 'paragraph',
        text: "The first signs most beginners learn are greetings — Good Morning, Good Evening, Good Night — because they're short, visual, and forgiving of imperfect form. Fumbling through \"Good Morning\" a dozen times before it feels natural is completely normal, and it's the same experience nearly everyone starting out reports.",
      },
      {
        type: 'quote',
        text: 'I hope you can try learning it now, just like I learned by myself.',
        attribution: 'A WinVinaya trainer, on first attempting ISL alone',
      },
      { type: 'heading', text: 'Week two: phrases start connecting' },
      {
        type: 'paragraph',
        text: 'Once the alphabet and basic greetings settle in, common phrases — "How are you?", "Where are you from?" — start to click faster than expected, because they reuse hand shapes already learned. This is where most people notice the shift: ISL stops feeling like a list of separate signs and starts feeling like a language with its own grammar and rhythm.',
      },
      {
        type: 'bulletList',
        items: [
          'Facial expression carries real grammatical weight — not just emotion.',
          'Word order in ISL often differs from spoken English or Hindi.',
          'Space matters — where you sign something can indicate who or what you are referring to.',
        ],
      },
      { type: 'heading', text: "Why it's worth the awkward stretch" },
      {
        type: 'paragraph',
        text: "India has over 400 educational institutions for the Deaf, and nearly 95% of them lack a qualified sign language instructor. That gap isn't abstract — it shows up in classrooms, in workplaces, and in ordinary conversations that don't happen because neither side knows where to start. Every person who learns even basic signs is one less place where that gap shows up.",
      },
      { type: 'heading', text: "It's not a substitute for an interpreter — and that's fine" },
      {
        type: 'paragraph',
        text: "Learning a handful of greetings does not make anyone fluent, and it should not be mistaken for the fluency a qualified interpreter brings to a meeting, a classroom, or a medical appointment. That distinction matters, and beginners should hold it honestly rather than overstating what a few weeks of self-study can do.",
      },
      {
        type: 'paragraph',
        text: "What it does change is the very first moment of contact. A hearing colleague who can sign 'Good Morning' unprompted signals something an interpreter booking form never will: that they bothered to learn, before there was any obligation to. That single gesture tends to set the tone for everything that follows in the working relationship.",
      },
      {
        type: 'paragraph',
        text: "The honest advice for anyone starting out is the same advice that shows up in almost every account of learning ISL independently: begin with the signs you'll actually use every day, get comfortable being visibly a beginner in front of someone else, and treat the awkward first few weeks as the whole point rather than something to get past quickly.",
      },
    ],
  },
  {
    slug: 'inside-a-disability-sensitization-workshop',
    title: 'Inside a Disability Sensitization Workshop: What Actually Happens',
    excerpt:
      "It's not a lecture with slides. Here's what a real sensitization session — movement, breathing, honest conversation — actually looks like in the room.",
    category: 'community',
    author: { name: 'Training & Sensitization Team', role: 'WinVinaya Foundation' },
    publishedAt: '2026-07-16',
    body: [
      {
        type: 'paragraph',
        text: "Say the word \"sensitization\" to most corporate teams and they picture a compliance slide deck — an hour of definitions, followed by a quiz nobody remembers a week later. That's not what happens in the room.",
      },
      { type: 'heading', text: "It starts with the body, not a slide" },
      {
        type: 'paragraph',
        text: "A recent session at Athma Sakthi Vidyalaya in Bengaluru opened with movement and breathing exercises — not a single definition of \"disability\" on a screen. The goal wasn't to explain a category of people in the abstract. It was to get a room of participants and trainers to slow down enough to actually notice each other.",
      },
      {
        type: 'paragraph',
        text: 'Simple Indian Sign Language was woven in throughout, so communication itself became part of the exercise rather than a side note about "accessibility."',
      },
      { type: 'heading', text: 'Assumption, not hostility, is the real barrier' },
      {
        type: 'paragraph',
        text: 'Most exclusion at work is not malicious. It is the quiet assumption that a visually impaired colleague cannot code, or that a Deaf teammate cannot run a meeting — assumptions nobody says out loud, but that shape who gets hired, mentored, and promoted.',
      },
      {
        type: 'orderedList',
        items: [
          'Notice the assumption before it becomes a decision.',
          'Replace it with a direct question instead of a guess.',
          'Let the answer — not the guess — inform what happens next.',
        ],
      },
      {
        type: 'paragraph',
        text: 'That three-step shift is the entire point of a sensitization session. Not sympathy. Not a certificate. Just enough honest, uncomfortable conversation that assumption stops doing the deciding.',
      },
      { type: 'heading', text: 'Why experience beats explanation' },
      {
        type: 'paragraph',
        text: "A slide that states a fact is easy to nod along to and just as easy to forget by the following week. An exercise that asks a participant to navigate a simple task differently — guided by touch, or by a sign instead of a spoken instruction — tends to stay with people much longer, because it was felt rather than told.",
      },
      {
        type: 'paragraph',
        text: "That is why trainers keep the format loose and physical instead of locking it to a fixed slide deck. The exercises change depending on the room — a school audience gets a different pace than a corporate one — but the underlying goal stays the same: get people out of the passive, note-taking posture they bring to most workplace training.",
      },
      {
        type: 'paragraph',
        text: "Feedback from sessions like the one at Athma Sakthi Vidyalaya consistently mentions the same thing, in different words: participants expected to sit through a lecture, and instead left having had an actual conversation. That shift in expectation is usually the clearest sign the session worked.",
      },
    ],
  },
  {
    slug: '5-workplace-myths-about-disability',
    title: 'Five Workplace Myths About Disability We Hear All the Time',
    excerpt:
      'We hear these in nearly every first conversation with a new hiring partner. None of them hold up once you look at what actually happens after hiring.',
    category: 'workplace',
    author: { name: 'Corporate Engagement Team', role: 'WinVinaya Foundation' },
    publishedAt: '2026-07-02',
    body: [
      {
        type: 'paragraph',
        text: 'Nearly every first conversation with a new corporate partner starts with the same handful of concerns — usually unspoken until someone finally asks. Here are the five we hear most, and what actually happens once a company hires inclusively.',
      },
      { type: 'heading', text: 'Myth 1: "It will slow down the team."' },
      {
        type: 'paragraph',
        text: 'In practice, most accommodations are inexpensive and quick to set up — screen-reader compatible software, a flexible seating arrangement, an interpreter for a handful of meetings a month. The slowdown teams actually notice is the one that happens before hiring, from hesitation.',
      },
      {
        type: 'paragraph',
        text: "That hesitation usually shows up as delay, not refusal — a role sits open for months while a hiring manager quietly decides not to move a strong candidate forward, without ever naming the concern out loud. The fix isn't a policy change. It's giving that manager one direct, low-stakes conversation before the decision gets made.",
      },
      { type: 'heading', text: 'Myth 2: "We will not know how to communicate."' },
      {
        type: 'paragraph',
        text: 'This is the one sensitization sessions solve directly. A short orientation on etiquette and communication — not a certification course — is usually enough for a team to stop worrying about saying the wrong thing and start having a normal working relationship.',
      },
      {
        type: 'paragraph',
        text: "The interview itself rarely needs to change much either — extra time for a written assessment, an accessible format for take-home material, or an interpreter booked in advance usually covers it. What's being evaluated doesn't change; only a few logistics around it do.",
      },
      { type: 'heading', text: 'Myth 3: "There are not enough qualified candidates."' },
      {
        type: 'paragraph',
        text: 'This is the myth the data pushes back on hardest. Persons with disabilities in India represent a skilled, underemployed population in the tens of millions — the shortage is in sourcing pipelines, not in qualified people.',
      },
      {
        type: 'paragraph',
        text: "Most companies that believe this myth have never actually run a sourcing pipeline built to reach this candidate pool — they've only posted a standard job listing and waited. A pipeline built with an organization already working with skilled PWD candidates produces a very different applicant pool within weeks, not months.",
      },
      { type: 'heading', text: 'Myth 4: "It is mainly a compliance checkbox."' },
      {
        type: 'paragraph',
        text: 'Companies that treat it as a checkbox tend to hire once and stop. Companies that build a real pipeline keep hiring — because the retention and performance numbers hold up long after the first CSR report is filed.',
      },
      { type: 'heading', text: 'Myth 5: "Our managers will not know how to support someone long-term."' },
      {
        type: 'paragraph',
        text: 'This is usually the last concern raised, and the easiest to solve — regular check-ins during onboarding do most of the work, the same way they would for any new hire settling into a new team.',
      },
      {
        type: 'paragraph',
        text: 'None of these myths survive first contact with an actual hiring process. They survive because most companies never get that far.',
      },
      { type: 'heading', text: 'Why the list keeps repeating' },
      {
        type: 'paragraph',
        text: "These five concerns show up in almost the same order, almost every time, regardless of industry or company size. That consistency is actually useful — it means a hiring team can prepare for the conversation in advance instead of discovering the objections one at a time, mid-process, when momentum is easiest to lose.",
      },
    ],
  },
  {
    slug: 'assistive-tech-101-screen-readers',
    title: 'Assistive Tech 101: What Screen Readers Are, and What Developers Get Wrong',
    excerpt:
      'A screen reader does not "see" your interface — it hears a structure. Here is what that means for the sites and apps you are building.',
    category: 'accessibility',
    author: { name: 'Accessibility Design Team', role: 'WinVinaya Foundation' },
    publishedAt: '2026-06-18',
    body: [
      {
        type: 'paragraph',
        text: "A screen reader converts on-screen content into speech or braille output, letting someone who is blind or has low vision navigate software by ear or by touch instead of by sight. It doesn't interpret a page the way a sighted user does — it reads the underlying structure, in order, exactly as the code describes it.",
      },
      { type: 'heading', text: 'The gap between "looks right" and "reads right"' },
      {
        type: 'paragraph',
        text: "A page can look perfectly organized on screen and still be unusable with a screen reader, because visual layout and code structure aren't the same thing. A heading that's styled to look big and bold but marked up as a plain paragraph is invisible to a screen reader's navigation — it just becomes more text in a wall of text.",
      },
      {
        type: 'bulletList',
        items: [
          'Icon-only buttons need a text label a screen reader can announce — not just a tooltip.',
          'Images that carry meaning need real alt text, not a blank or purely decorative tag.',
          'Custom components (dropdowns, modals, tabs) need the same keyboard behavior a native element would have for free.',
        ],
      },
      { type: 'heading', text: 'The fix is usually smaller than it sounds' },
      {
        type: 'paragraph',
        text: 'Most of this is not a redesign — it is using the correct HTML element in the first place, and writing alt text that describes function rather than appearance. A button coded as a button, a heading coded as a heading, and an image description that says what an image does rather than what it looks like will resolve the majority of real-world screen reader complaints.',
      },
      {
        type: 'quote',
        text: 'The only real test is trying your own interface with a screen reader turned on — not assuming it works because it looks fine.',
      },
      {
        type: 'paragraph',
        text: "It's a five-minute habit that catches problems no amount of visual QA ever will.",
      },
      { type: 'heading', text: 'Screen readers are one part of a bigger picture' },
      {
        type: 'paragraph',
        text: 'Screen reader support is the assistive technology developers hear about most, but it is not the only one worth testing against. Keyboard-only navigation, sufficient color contrast, and predictable focus order matter to a much wider range of users — including people who cannot use a mouse at all, and people who simply prefer the keyboard.',
      },
      {
        type: 'paragraph',
        text: 'A quick, practical check: unplug the mouse, and try to complete a core task on your own product using only Tab, Shift+Tab, and Enter. If the focus indicator disappears, or a control becomes unreachable, that is very often the exact same underlying issue a screen reader user will hit — just visible without needing any assistive technology installed at all.',
      },
    ],
  },
  {
    slug: 'from-intern-to-hire-placement-model',
    title: "From Intern to Hire: What Makes WinVinaya's Placement Model Different",
    excerpt:
      'Most internship programs end with a certificate. Ours are built to end with an offer letter. Here is the difference in how that actually works.',
    category: 'community',
    author: { name: 'Talent & Placements Team', role: 'WinVinaya Foundation' },
    publishedAt: '2026-06-04',
    body: [
      {
        type: 'paragraph',
        text: 'A lot of internship programs are built around a fixed curriculum and a completion certificate. Ours is built around one different question: what does this person need in order to walk into a real hiring conversation ready?',
      },
      { type: 'heading', text: 'Real projects, not busywork' },
      {
        type: 'paragraph',
        text: 'Interns at WinVinaya work on the same systems, documents, and course material used by hundreds of live candidates — not simulated exercises built just for training. A redesigned course module or a remediated document goes into use almost immediately, which changes how seriously interns treat the work.',
      },
      { type: 'heading', text: 'The bridge most programs skip' },
      {
        type: 'paragraph',
        text: 'The step most internship programs miss is the handoff — connecting a strong intern to an actual hiring manager, at an actual company, before the internship ends. That is the part we build the program around, not the part we leave to chance.',
      },
      {
        type: 'orderedList',
        items: [
          'Interns are matched to a live, mission-critical project from week one.',
          'Skill assessment happens continuously, not in a single exit interview.',
          'Strong performers are introduced directly into our corporate placement pipeline — the same one used for our regular candidate placements.',
        ],
      },
      {
        type: 'paragraph',
        text: "Prachi Pandey's path is a good example: she started with zero coding background and moved through a coding-focused engagement directly into an internship role at Allstate Solutions. That's not an outlier story we highlight because it's rare — it's the outcome the whole model is designed to produce.",
      },
      { type: 'heading', text: 'What "ready" actually means' },
      {
        type: 'paragraph',
        text: 'Readiness, in this model, is not a certificate at the end of a fixed number of weeks. It is a specific, honest answer to the question of what a candidate can already do, what they still need, and which live roles those skills actually match — an answer that gets revisited continuously rather than decided once at the finish line.',
      },
      {
        type: 'paragraph',
        text: "That is also why internships here run anywhere from four to twelve weeks instead of a fixed term. Some interns are ready for a placement conversation early; others need longer with a given project before that conversation makes sense. Stretching or compressing the timeline to fit the person, instead of forcing the person to fit a fixed timeline, is a small operational choice that ends up mattering more than almost anything else in the program.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getCategoryMeta(key: BlogCategoryKey): BlogCategoryMeta {
  return blogCategories.find((category) => category.key === key) ?? blogCategories[0];
}
