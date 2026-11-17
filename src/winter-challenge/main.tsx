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
  ['Program', 'program'],
  ['Timeline', 'timeline'],
  ['Prizes', 'prizes'],
  ['Mentors', 'mentors'],
  ['FAQ', 'faq'],
] as const

const audiences = [
  ['Solana builders', 'Ship ahead of Colosseum 2027.'],
  ['Students', 'Learn Solana in Vietnamese.'],
  ['Cross-chain devs', 'Move to Solana and deploy fast.'],
]

const whyVietnam = [
  ['Top 5', 'Global crypto adoption, 2025'],
  ['560,000+', 'IT professionals'],
  ['200,000', 'More tech talent needed in 3 years (estimate)'],
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

const rtcStats = [
  ['111', 'Registrants'],
  ['34', 'Global submissions'],
  ['16', 'Demo Day teams'],
  ['3', 'Colosseum interviews so far'],
]

const partnerOptions = [
  ['Ecosystem partner', 'Demo Day spot, X announcement, your logo on all materials, optional workshop. You offer perks or credits to teams.'],
  ['Media partner', 'Official Media Partner across program channels, logo on Demo Day POSM, Demo Day invitation. You help distribute registration.'],
  ['University partner', 'A Solana workshop on your campus, 12 Vietnamese bootcamp videos, a student track. You host and share with students.'],
]

const faqs = [
  ['Who can join?', 'Students, developers moving from other chains, and Solana builders preparing for Colosseum 2027.'],
  ['Do I need Solana experience?', 'No. Start with the campus and online workshops, plus 12 bootcamp videos and 4 product videos in Vietnamese.'],
  ['Can I join online?', 'Yes. The kickoff call, workshops and office hours run online. Build Stations and co-working days happen in person in HCMC and Da Nang.'],
  ['How are prizes paid?', 'Planned amounts are in USD, paid in USDC. A team can win one track prize and one award.'],
  ['What happens after Demo Day?', 'Winter Challenge leads into Colosseum 2027. The previous edition, Road to Colosseum, sent 34 projects to Colosseum.'],
]

function Head({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <header className="head">
      <p className="kicker">
        <span>{n}</span>
        {label}
      </p>
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
            <span>Dec 1, 2026 — Jan 16, 2027</span>
          </div>
          <div className="cover-grid">
            <div className="cover-title">
              <h1 id="title">
                Build Station: Winter Challenge <em>2026.</em>
              </h1>
              <p className="cover-lede">A build challenge for Vietnam’s developers on Solana, after Road to Colosseum.</p>
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
              <a className="link" href="#timeline">
                See the timeline ↓
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
                <dt>Format</dt>
                <dd>7 weeks · 2 tracks · 2 awards</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* PROGRAM */}
        <section className="section wrap" id="program">
          <Head n="01" label="The program">
            Winter Challenge runs for <em>7 weeks</em> in 3 cities and online.
          </Head>
          <div className="program">
            <p className="prose">
              Learn at campus workshops. Build next to other teams at Build Stations in HCMC and Da Nang. Get unblocked at office hours. Bring what you
              built to Demo Day on January 16.
            </p>
            <ol className="rows">
              {audiences.map(([t, d], i) => (
                <li key={t}>
                  <span className="idx">0{i + 1}</span>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="why">
            <p className="why-title">Vietnam has the devs but few structured ways to learn Solana.</p>
            <div className="figures">
              {whyVietnam.map(([n, l]) => (
                <div key={l}>
                  <b>{n}</b>
                  <span>{l}</span>
                </div>
              ))}
            </div>
            <p className="source">Sources: Chainalysis via VnEconomy 9/2025, TopDev 2025, Tiger Research 8/2024</p>
          </div>
        </section>

        <figure className="bleed wrap">
          <img src={`${A}/photos/community.jpg`} width="2000" height="1000" alt="Road to Colosseum builders and the Superteam Vietnam community, group photo" loading="lazy" decoding="async" />
          <figcaption>Road to Colosseum, the previous edition.</figcaption>
        </figure>

        {/* TIMELINE */}
        <section className="section wrap" id="timeline">
          <Head n="02" label="Timeline">
            7 weeks from registration to <em>Demo Day on Jan 16.</em>
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
          <Head n="03" label="Prize structure">
            USD 10,000 across <em>2 tracks and 2 awards.</em>
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

        {/* MENTORS */}
        <section className="section wrap" id="mentors">
          <Head n="04" label="Judges and mentors">
            Investors and builders mentored <em>Road to Colosseum teams.</em>
          </Head>
          <ul className="people">
            {mentors.map(([id, name, org]) => (
              <li key={id}>
                <img src={`${A}/people/${id}.jpg`} alt="" width="400" height="400" loading="lazy" decoding="async" />
                <b>{name}</b>
                <span>{org}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* LAST EDITION */}
        <section className="section wrap" id="previous">
          <Head n="05" label="Last hackathon: Road to Colosseum">
            Road to Colosseum sent <em>34 projects to Colosseum.</em>
          </Head>
          <div className="figures figures-4">
            {rtcStats.map(([n, l]) => (
              <div key={l}>
                <b>{n}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
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
          <div className="reach">
            <p>
              <b>185.3K</b> X impressions in 32 days, <b>34</b> press placements in Vietnamese media.
            </p>
            <a className="link" href={REPORT}>
              Read the full Road to Colosseum report →
            </a>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="section wrap" id="partners">
          <Head n="06" label="Partners">
            28 partners backed <em>Road to Colosseum.</em>
          </Head>
          <div className="logos">
            <div>
              <p>
                <b>13</b> Ecosystem partners and sponsors
              </p>
              <img src={`${A}/logos/ecosystem.png`} width="2048" height="753" alt="NSSC, DISSC, Solscan, Birdeye, Solami, Fystack, Hashgraph, MonkeDAO, Solflare, PayMoji, Souls Lab, Flux RPC, Themis" loading="lazy" decoding="async" />
            </div>
            <div>
              <p>
                <b>15</b> Media and community partners
              </p>
              <img src={`${A}/logos/media.png`} width="2048" height="753" alt="Startup Vietnam Foundation, Swissep, 68 Cam Sixty Eight, SGB DAO, APAC DAO, Sotatek, Varmeta, Dev3pack, TAO Startup, Overseas Vietnamese, GOE Alliance, Activ8, CraftStack, Corelia Academy, DUT Superteam University Club" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="options">
            <div className="options-head">
              <h3>Partner with Winter Challenge</h3>
              <p>Tell us which partnership fits and we’ll confirm the details.</p>
              <a className="link" href={CONTACT} target="_blank" rel="noopener noreferrer">
                Daphne, Operations Lead · @dieubui on Telegram →
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
          <Head n="07" label="FAQ">
            Good to know.
          </Head>
          <div className="qs">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* REGISTER */}
        <section className="register" id="register">
          <div className="wrap register-inner">
            <div className="register-copy">
              <p className="kicker kicker-light">
                <span>08</span>Register
              </p>
              <h2>
                Build Station: <em>Winter Challenge.</em>
              </h2>
              <p>Seven weeks of building on Solana with Vietnam’s developer community.</p>
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
