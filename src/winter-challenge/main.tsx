import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './winter.css'

const FORM = 'https://forms.gle/uyWChBzPfz81TL1z5'
const FORM_EMBED =
  'https://docs.google.com/forms/d/e/1FAIpQLScGr8JbFpiY9GnwKhTsPrVqJUHx9rZGabOigH8AriC2gw2BUA/viewform?embedded=true'
const CONTACT = 'https://t.me/dieubui'
const REPORT = '/reports/rtc/'
const A = '/winter-challenge'

const nav = [
  ['How to get in', 'get-in'],
  ['Program', 'program'],
  ['Timeline', 'timeline'],
  ['Prizes', 'prizes'],
  ['Last program', 'track-record'],
  ['FAQ', 'faq'],
] as const

const audiences = [
  ['Solana builders', 'Ship ahead of Colosseum 2027.'],
  ['Students', 'Learn Solana in Vietnamese.'],
  ['Cross-chain devs', 'Move to Solana and deploy fast.'],
]

const weeks = [
  ['W1', 'Dec 1'],
  ['W2', 'Dec 7–13'],
  ['W3', 'Dec 14–20'],
  ['W4', 'Dec 21–27'],
  ['W5', 'Dec 28–Jan 3'],
  ['W6', 'Jan 4–11'],
  ['W7', 'Jan 16'],
]

type Block = { start: number; span: number; title: string; sub?: string; tone: 'campus' | 'person' | 'online' | 'finale' }
const lanes: { name: string; blocks: Block[] }[] = [
  {
    name: 'Campus workshop',
    blocks: [1, 2, 3, 4].map(n => ({ start: n, span: 1, title: `Campus ${n}`, tone: 'campus' as const })),
  },
  {
    name: 'In person',
    blocks: [
      { start: 3, span: 1, title: 'Build Station', sub: 'HCMC', tone: 'person' },
      { start: 4, span: 1, title: 'Build Station', sub: 'Da Nang', tone: 'person' },
      { start: 5, span: 2, title: 'Co-working Days', sub: 'Da Nang and HCMC', tone: 'person' },
      { start: 7, span: 1, title: 'Demo Day', tone: 'finale' },
    ],
  },
  {
    name: 'Online',
    blocks: [
      { start: 1, span: 1, title: 'Registration opens', sub: 'Kickoff Call', tone: 'online' },
      { start: 2, span: 1, title: 'Workshops', tone: 'online' },
      { start: 3, span: 4, title: 'Workshops and office hours', tone: 'online' },
    ],
  },
]

const openTrack = [
  ['1st', '3,000'],
  ['2nd', '2,000'],
  ['3rd', '1,200'],
  ['4th', '800'],
]
const otherPrizes = [
  ['Developer Tooling Track', '1st 700, 2nd 300', '1,000'],
  ['Best Integration', 'One team, any track', '1,000'],
  ['Best University Team', '1st 700, 2nd 300', '1,000'],
]

const mentors = [
  ['lynn', 'Lynn Nguyễn', 'Superteam Vietnam'],
  ['chaerin', 'Chaerin Kim', 'Solana Foundation'],
  ['josip', 'Josip Volarevic', 'Superteam Global'],
  ['will', 'Will Ross', 'Dragon Capital'],
  ['jeffrey', 'Jeffrey Tchui', 'Hashgraph'],
  ['zane', 'Zane Nguyen', 'Kyros Ventures'],
  ['david', 'David Kim', 'Angel Investor'],
  ['minh', 'Nhat Minh Pham', 'Solflare'],
  ['thi', 'Thi Nguyễn', 'Fystack'],
  ['hieu', 'Hiếu Bùi', 'Superteam Vietnam'],
  ['tuan', 'Tuan Pham Minh', 'Solana Foundation'],
  ['phuc', 'Phuc Thai', 'Sky Mavis'],
  ['kay', 'Kay', 'Superteam Vietnam'],
  ['chau', 'Châu Khắc', 'Superteam Vietnam'],
]

const lastStats = [
  ['111', 'Registrants'],
  ['34', 'Global submissions to Colosseum'],
  ['16', 'Demo Day teams'],
  ['3', 'Teams shortlisted for a Colosseum interview'],
]

const partnerOptions = [
  ['Ecosystem partner', 'You get a Demo Day spot, an X announcement, your logo on marketing materials and the option of a workshop. You offer credits or perks to teams.'],
  ['Media partner', 'You are named Official Media Partner, with your logo on marketing materials and Demo Day POSM, and a Demo Day invitation. You share registration with your community.'],
  ['University partner', 'Your students get a campus workshop, 12 bootcamp videos in Vietnamese and a shot at Best University Team. You host the workshop and share registration.'],
]

const steps = [
  ['Fill in the form', 'The registration form is at the bottom of this page.'],
  ['Join the kickoff call', 'Week 1 starts on December 1 with an online kickoff call.'],
  ['Pick a track', 'Open Track for any product, or Developer Tooling for tools other builders use.'],
  ['Come to a Build Station', 'HCMC on Dec 14–20 or Da Nang on Dec 21–27. Can’t travel? Workshops and office hours also run online.'],
]

const weGive = [
  'Campus workshops and online sessions',
  'Build Stations in HCMC and Da Nang, then co-working days',
  'Office hours through to Demo Day',
  '12 bootcamp videos and 4 product videos in Vietnamese',
  'A shot at USD 10,000 in prizes',
]
const youGive = ['Come to the sessions', 'Keep building between them', 'Show your project at Demo Day on January 16']

const faqGroups: { group: string; items: string[][] }[] = [
  {
    group: 'Getting in',
    items: [
      ['Who can join?', 'Students, developers coming from other chains, and developers already building on Solana.'],
      ['Do I need Solana experience?', 'No. The campus and online workshops start from the basics, and there are 12 bootcamp videos and 4 product videos in Vietnamese.'],
      ['Can I join online?', 'Yes. The kickoff call, workshops and office hours run online. Build Stations and co-working days happen in person in HCMC and Da Nang.'],
    ],
  },
  {
    group: 'Prizes',
    items: [
      ['How are prizes paid?', 'In USDC. The amounts on this page are planned amounts in USD.'],
      ['Can a team win more than one prize?', 'A team can win one track prize and one award.'],
    ],
  },
  {
    group: 'Colosseum',
    items: [
      [
        'What is Colosseum?',
        'Colosseum runs Solana’s global hackathons. Winter Challenge is a separate program run by Superteam Vietnam, and a chance to get a product ready before Colosseum 2027.',
      ],
      ['What was Road to Colosseum?', 'Our previous program, from Sep 12 to Oct 13, 2026. It had 111 registrants, 34 submissions to Colosseum and 16 teams at Demo Day.'],
    ],
  },
]


function Head({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <header className="head">
      <p className="kicker">{label}</p>
      <h2>{children}</h2>
    </header>
  )
}

function App() {
  const [menu, setMenu] = useState(false)
  const [showSticky, setShowSticky] = useState(false)

  // Sticky mobile CTA: only once the cover's own Register button has scrolled away,
  // and never while the form itself is on screen.
  useEffect(() => {
    const cta = document.getElementById('cover-cta')
    const reg = document.getElementById('register')
    if (!cta || !reg || !('IntersectionObserver' in window)) return
    let pastCover = false
    let atForm = false
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.target === cta) pastCover = !e.isIntersecting && e.boundingClientRect.top < 0
          if (e.target === reg) atForm = e.isIntersecting
        })
        setShowSticky(pastCover && !atForm)
      },
      { threshold: 0 },
    )
    io.observe(cta)
    io.observe(reg)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={`bar${menu ? ' open' : ''}`}>
        <div className="wrap bar-inner">
          <a className="brand" href="/" aria-label="Superteam Vietnam home">
            <img src={`${A}/logos/superteamvn.png`} alt="superteamvn" width="245" height="40" />
          </a>
          <nav aria-label="Sections">
            {nav.map(([name, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {name}
              </a>
            ))}
          </nav>
          <a className="bar-cta" href="#register" onClick={() => setMenu(false)}>
            Register →
          </a>
          <button className="burger" aria-label="Toggle menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
            {menu ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <main id="main">
        {/* COVER */}
        <section className="cover wrap" aria-labelledby="title">
          <div className="cover-meta">
            <span>Solana × Superteam Vietnam</span>
            <span>Dec 1, 2026 – Jan 16, 2027</span>
          </div>
          <div className="cover-grid">
            <div className="cover-title">
              <h1 id="title">
                Build Station: Winter Challenge <em>2026.</em>
              </h1>
              <p className="cover-lede">Seven weeks to build on Solana with Superteam Vietnam. Workshops, Build Stations in HCMC and Da Nang, and USD 10,000 in prizes at Demo Day.</p>
            </div>
            <figure className="cover-art">
              <img
                src={`${A}/poster-1200.jpg`}
                srcSet={`${A}/poster-800.jpg 800w, ${A}/poster-1200.jpg 1200w, ${A}/poster-2000.jpg 2000w`}
                sizes="(max-width: 860px) 100vw, 560px"
                width="2000"
                height="2000"
                fetchPriority="high"
                decoding="async"
                alt="Build Station: Winter Challenge poster. A snow globe with the Superteam logo, a keyboard, a phone and a PC on a USD 10,000 prize pool base."
              />
            </figure>
            <div className="cover-actions" id="cover-cta">
              <a className="btn" href="#register">
                Register now
              </a>
              <a className="link" href="#get-in">
                How to get in ↓
              </a>
            </div>
            <dl className="facts">
              <div>
                <dt>Dates</dt>
                <dd>Dec 1, 2026 – Jan 16, 2027</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>HCMC, Da Nang and online</dd>
              </div>
              <div>
                <dt>Prize pool</dt>
                <dd>USD 10,000, paid in USDC</dd>
              </div>
              <div>
                <dt>Tracks</dt>
                <dd>Open Track, Developer Tooling</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* HOW TO GET IN */}
        <section className="section wrap" id="get-in">
          <Head label="How to get in">Four steps from here to building.</Head>
          <ol className="steps">
            {steps.map(([t, d], i) => (
              <li key={t}>
                <span className="step-n">{i + 1}</span>
                <b>{t}</b>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <a className="btn" href="#register">
            Go to the form
          </a>
        </section>

        {/* PROGRAM */}
        <section className="section wrap" id="program">
          <Head label="The program">
            Seven weeks of workshops, Build Stations and office hours.
          </Head>
          <div className="deal">
            <div>
              <p className="rows-label">What you get</p>
              <ul className="ticks">
                {weGive.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="rows-label">What we ask in return</p>
              <ul className="ticks">
                {youGive.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="program">
            <div>
              <p className="rows-label">Who it’s for</p>
              <ol className="rows">
              {audiences.map(([t, d]) => (
                <li key={t}>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
              </ol>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="section wrap" id="timeline">
          <Head label="Timeline">
            Seven weeks, from kickoff to Demo Day on Jan 16.
          </Head>
          <div className="gantt" role="table" aria-label="Winter Challenge timeline by week">
            <div className="g-row g-weeks" role="row">
              <span role="columnheader" />
              {weeks.map(([w, d], i) => (
                <div key={w} className={i === 6 ? 'final' : ''} role="columnheader">
                  <b>{w}</b>
                  <span>{d}</span>
                </div>
              ))}
            </div>
            {lanes.map(lane => (
              <div className="g-row" key={lane.name} role="row">
                <span className="g-name" role="rowheader">
                  {lane.name}
                </span>
                {lane.blocks.map(b => (
                  <div key={b.title + b.start} role="cell" className={`g-cell t-${b.tone}`} style={{ gridColumn: `${b.start + 1} / span ${b.span}` }}>
                    <b>{b.title}</b>
                    {b.sub && <span>{b.sub}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <ol className="tl">
            {weeks.map(([w, d], i) => {
              const items = lanes.flatMap(l => l.blocks.filter(b => b.start === i + 1))
              const ongoing = lanes.flatMap(l => l.blocks.filter(b => b.start < i + 1 && b.start + b.span > i + 1))
              return (
                <li key={w} className={i === 6 ? 'final' : ''}>
                  <div className="tl-date">
                    <b>{w}</b>
                    <span>{d}</span>
                  </div>
                  <ul>
                    {items.map(b => (
                      <li key={b.title + b.start} className={`t-${b.tone}`}>
                        {b.title}
                        {b.sub ? `, ${b.sub}` : ''}
                      </li>
                    ))}
                    {ongoing.map(b => (
                      <li key={b.title} className={`t-${b.tone} cont`}>
                        {b.title} (cont.)
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
          <div className="legend">
            <span className="t-campus">Campus</span>
            <span className="t-person">In person</span>
            <span className="t-online">Online</span>
            <p>Tentative. Venues and session details go to registered builders.</p>
          </div>
        </section>

        {/* PRIZES */}
        <section className="section wrap" id="prizes">
          <Head label="Prize structure">
            USD 10,000, split across two tracks and two awards.
          </Head>
          <div className="prizes">
            <div className="prize-open">
              <div className="prize-row prize-top">
                <h3>Open Track</h3>
                <strong>7,000</strong>
              </div>
              {openTrack.map(([r, a]) => (
                <div className="prize-row" key={r}>
                  <span>{r}</span>
                  <b>{a}</b>
                </div>
              ))}
            </div>
            <div className="prize-rest">
              {otherPrizes.map(([t, d, a]) => (
                <div className="prize-row prize-item" key={t}>
                  <div>
                    <h3>{t}</h3>
                    <span>{d}</span>
                  </div>
                  <strong>{a}</strong>
                </div>
              ))}
              <p className="small">Planned amounts in USD, paid in USDC. A team can win one track prize and one award.</p>
            </div>
          </div>
        </section>

        {/* TRACK RECORD: everything about the previous program lives here */}
        <section className="section wrap" id="track-record">
          <Head label="Our last program">
            Last time, 34 Vietnamese projects made it to Colosseum.
          </Head>
          <div className="record-intro">
            <p className="prose">
              Before Winter Challenge, we ran <b>Road to Colosseum</b> from Sep 12 to Oct 13, 2026. It helped Vietnamese teams submit to Colosseum, Solana’s
              global hackathon, with 13 sessions, a Buildstation in Da Nang and a Demo Day in Ho Chi Minh City.
            </p>
            <a className="link" href={REPORT}>
              Read the full Road to Colosseum report →
            </a>
          </div>

          <figure className="record-photo">
            <img src={`${A}/photos/community.jpg`} width="2000" height="1000" alt="Builders and organizers at the Road to Colosseum Demo Day" loading="lazy" decoding="async" />
            <figcaption>Road to Colosseum Demo Day, Oct 4, 2026, Ho Chi Minh City.</figcaption>
          </figure>

          <div className="record-label">Road to Colosseum results</div>
          <div className="figures figures-4">
            {lastStats.map(([n, l]) => (
              <div key={l}>
                <b>{n}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <p className="reach-line">
            <b>185.3K</b> X impressions in 32 days. <b>34</b> placements in Vietnamese media.
          </p>

          <div className="photos">
            <figure className="ph-wide">
              <img src={`${A}/photos/winners.jpg`} width="1600" height="1068" alt="The winning team holding the first-prize board at Demo Day" loading="lazy" decoding="async" />
              <figcaption>Demo Day winners</figcaption>
            </figure>
            <figure>
              <img src={`${A}/photos/pitch.jpg`} width="836" height="1068" alt="A builder pitching in front of a slide at Demo Day" loading="lazy" decoding="async" />
              <figcaption>Pitching at Demo Day</figcaption>
            </figure>
            <figure>
              <img src={`${A}/photos/judging.jpg`} width="836" height="1068" alt="Judges scoring pitches in a circle on the floor" loading="lazy" decoding="async" />
              <figcaption>Judges scoring</figcaption>
            </figure>
          </div>

          <div className="sub" id="mentors">
            <div className="sub-head">
              <h3>Mentors and judges from last time</h3>
              <p>Mentors and judges at Road to Colosseum.</p>
            </div>
            <ul className="people">
              {mentors.map(([id, name, org]) => (
                <li key={id}>
                  <img src={`${A}/people/${id}.jpg`} alt="" width="400" height="400" loading="lazy" decoding="async" />
                  <b>{name}</b>
                  <span>{org}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sub">
            <div className="sub-head">
              <h3>27 partners backed it</h3>
              <p>Ecosystem, media and community partners of Road to Colosseum.</p>
            </div>
            <div className="logos">
              <div>
                <p>
                  <b>13</b> Ecosystem partners and sponsors
                </p>
                <img
                  src={`${A}/logos/ecosystem.png`}
                  width="2048"
                  height="753"
                  alt="NSSC, DISSC, Solscan, Birdeye, Solami, Fystack, Hashgraph, MonkeDAO, Solflare, PayMoji, Souls Lab, Flux RPC and Themis logos"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p>
                  <b>14</b> Media and community partners
                </p>
                <img
                  src={`${A}/logos/media.png`}
                  width="2048"
                  height="753"
                  alt="Startup Vietnam Foundation, Swiss EP, Coin68, sqrDAO, APAC DAO, Sotatek, Varmeta, Dev3Pack, TAO Startup, Overseas Vietnamese, GoE Alliance, Activ8, CraftStack and Corelia Academy logos"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PARTNER WITH US */}
        <section className="section wrap" id="partners">
          <Head label="Partner with us">
            Partner with Winter Challenge.
          </Head>
          <div className="options">
            <div className="options-head">
              <p>Tell us which partnership fits and we’ll confirm the details.</p>
              <a className="link" href={CONTACT} target="_blank" rel="noopener noreferrer">
                Message Daphne on Telegram →
              </a>
            </div>
            <ol>
              {partnerOptions.map(([t, d], i) => (
                <li key={t}>
                  <span className="idx">Option {i + 1}</span>
                  <b>{t}</b>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="section wrap faq" id="faq">
          <Head label="FAQ">What people ask us.</Head>
          <div className="qs">
            {faqGroups.map(g => (
              <div className="q-group" key={g.group}>
                <p className="rows-label">{g.group}</p>
                {g.items.map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      {q}
                      <span aria-hidden="true" />
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* REGISTER */}
        <section className="register" id="register">
          <div className="wrap register-inner">
            <div className="register-copy">
              <p className="kicker kicker-light">Register</p>
              <h2>
                Register for Winter Challenge.
              </h2>
              <dl className="reg-facts">
                <div>
                  <dt>Dates</dt>
                  <dd>Dec 1, 2026 – Jan 16, 2027</dd>
                </div>
                <div>
                  <dt>Where</dt>
                  <dd>HCMC, Da Nang and online</dd>
                </div>
                <div>
                  <dt>Prize pool</dt>
                  <dd>USD 10,000, paid in USDC</dd>
                </div>
                <div>
                  <dt>Questions</dt>
                  <dd>
                    <a href={CONTACT} target="_blank" rel="noopener noreferrer">
                      @dieubui on Telegram
                    </a>
                  </dd>
                </div>
              </dl>
              <a className="link link-light" href={FORM} target="_blank" rel="noopener noreferrer">
                Form not loading? Open it in a new tab →
              </a>
            </div>
            <div className="form">
              <iframe src={FORM_EMBED} title="Build Station: Winter Challenge registration form" loading="lazy">
                Loading form…
              </iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-inner">
          <span>© 2026 Superteam Vietnam</span>
          <nav aria-label="Footer">
            <a href="/">Superteam Vietnam</a>
            <a href={REPORT}>Road to Colosseum report</a>
            <a href={CONTACT} target="_blank" rel="noopener noreferrer">
              Partner with us
            </a>
          </nav>
        </div>
      </footer>

      <a className={`sticky-cta${showSticky ? '' : ' hide'}`} href="#register" aria-hidden={!showSticky} tabIndex={showSticky ? undefined : -1}>
        Register now →
      </a>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
