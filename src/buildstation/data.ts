export const EVENT = {
  tagline: 'Three days. One goal: get your product closer to ready.',
  summary:
    'An intensive IRL building sprint where teams review, build, test and demonstrate their products with mentor support.',
  closing: 'Less talking. More building, testing and shipping with Road to Colosseum.',
  dates: 'Fri 25 – Sun 27 September 2026',
  venue: 'Da Nang Blockchain Hub',
  chatUrl: 'https://t.me/+QS74md56VtkxOGQ1',
  // Referral link, so sign-ups are attributed to Superteam Vietnam.
  colosseumUrl: 'https://colosseum.com/?ref=superteamvn',
  // Road to Colosseum sign-up form.
  roadToColosseumUrl: 'https://forms.gle/MaCQbiJqtTDyuDvu8',
}

export const MENTORS = [
  { name: 'Hiếu', role: 'Member, Superteam Vietnam' },
  { name: 'Kelvin', role: 'Founder, Gaian' },
  { name: 'Daphne', role: 'Ops Lead, Superteam Vietnam' },
]

export const DAYS = [
  {
    date: 'Fri 25 Sep',
    time: '17:30–21:30',
    title: 'Team Plan Review + Mentor Office Hours',
    sessions: [
      ['17:30', 'Registration + light dinner'],
      ['18:15', 'Welcome'],
      ['18:35', 'Build prompt and submission briefing'],
      ['19:00', 'Team plan review + mentor office hours'],
      ['20:30', 'Starting checkpoint'],
      ['21:30', 'Close'],
    ],
  },
  {
    date: 'Sat 26 Sep',
    time: '09:00–17:00',
    title: 'Build, Testing + Mentor Rotations',
    sessions: [
      ['09:00', 'Stand-up'],
      ['09:20', 'Build block'],
      ['11:45', 'Checkpoint review'],
      ['12:00', 'Lunch'],
      ['13:00', 'Build, testing + mentor rotations'],
      ['15:15', 'Tea break'],
      ['15:35', 'Final build block'],
      ['17:00', 'Close'],
    ],
  },
  {
    date: 'Sun 27 Sep',
    time: '09:00–17:00',
    title: 'Demonstrate & Continue',
    // Detailed Sunday timings are not confirmed yet.
    sessions: [
      ['09:00', 'Doors open'],
      ['', 'Submissions, demos and mentor feedback (times to be announced)'],
      ['17:00', 'Close'],
    ],
  },
]

export const PREP = [
  'A laptop, charger, and any development credentials you need.',
  'A target user and the smallest flow your team can demo.',
  'Your repo, ready to share with mentors.',
]

// Original program content from the Onchain Time Builder Sprint site.
export const PROMPT = {
  thesis:
    'time.fun made creator time tradable. The mechanism was interesting; the audience, repeatable value, and delivery experience were still unresolved.',
  ask: 'This is not a request to clone time.fun. It asks teams to find a narrow community where a time-based exchange creates real, repeatable value.',
  principles: [
    'Choose one credible user niche',
    'Ship the essential product journey',
    'Collect evidence, not opinions',
    'Revise the product after feedback',
  ],
}

export const PROGRAM = [
  {
    title: 'Learn online',
    copy: 'Work through the learning deck: the time.fun idea, where it fell short, and Solana basics. Open from 4 September.',
  },
  {
    title: 'Build together',
    copy: 'Three days in Da Nang (25–27 September) to review your plan, build, test and demo with mentors.',
  },
  {
    title: 'Continue',
    copy: 'Keep building after the weekend and submit to Colosseum through Road to Colosseum.',
  },
]

export const ORGANIZERS = [
  {
    name: 'Hieu',
    role: 'Program lead',
    copy: 'Program design, learning direction, ecosystem coordination, and partner relationships.',
  },
  {
    name: 'Danh',
    role: 'Operations lead',
    copy: 'Event readiness, suppliers, crew, venue operations, participant service, and live escalation.',
  },
]
