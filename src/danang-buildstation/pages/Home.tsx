import artMono from '../assets/art-mono.webp'
import titleLockup from '../assets/title-lockup.webp'
import partners from '../assets/partners.webp'
import { PAGES } from '../config'
import { DAYS, EVENT, MENTORS, PREP, PROGRAM, PROMPT } from '../data'
import Layout, { Row } from '../components/Layout'

export default function Home() {
  return (
    <Layout current="home">
      {/* The key visual, with "Da Nang #BuildStation" in place of the "Side Track Hackathon" line. */}
      <section className="bs-poster">
        <div className="bs-poster__type">
          <img className="bs-poster__partners" src={partners} alt="Superteam Vietnam, Colosseum and Solana" />
          <div className="bs-lockup">
            <h1 className="bs-poster__title">
              <img src={titleLockup} alt="Road to Colosseum" />
              <span className="bs-poster__track">Da Nang #BuildStation</span>
            </h1>
            <p className="bs-poster__tag">#ProofofBUILD</p>
          </div>
        </div>
        <div className="bs-poster__art">
          <img
            src={artMono}
            alt="Engraved Roman landscape with the Colosseum, a statue of Apollo, and a phoenix wrapped in a red ribbon"
          />
          <p className="bs-poster__date">
            <span aria-hidden className="bs-poster__square" />
            Sep 25 – 27
          </p>
        </div>
      </section>

      <div className="bs-sheet">
        <Row title="The event">
          <p className="bs-sheet__lead">{EVENT.tagline}</p>
          <p className="bs-sheet__text">{EVENT.summary}</p>

          <dl className="bs-facts">
            <div>
              <dt>When</dt>
              <dd>{EVENT.dates}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{EVENT.venue}</dd>
            </div>
            <div>
              <dt>Mentors</dt>
              <dd>
                {MENTORS.map((mentor) => (
                  <span key={mentor.name} className="bs-facts__line">
                    {mentor.name} <span className="bs-muted">({mentor.role})</span>
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Part of</dt>
              <dd>
                <a href={EVENT.roadToColosseumUrl} target="_blank" rel="noreferrer">
                  Road to Colosseum
                </a>
                , Superteam Vietnam&apos;s side track of the{' '}
                <a href={EVENT.colosseumUrl} target="_blank" rel="noreferrer">
                  Colosseum hackathon
                </a>{' '}
                (14 Sep – 12 Oct)
              </dd>
            </div>
            <div>
              <dt>Prize</dt>
              <dd>
                <span className="bs-facts__line">
                  <strong className="bs-red">$10,000 cash</strong> prize pool for Road to Colosseum
                </span>
                <span className="bs-facts__line bs-muted">
                  Plus sponsored infra credits &amp; perks
                </span>
              </dd>
            </div>
          </dl>
        </Row>

        <Row title="The prompt">
          <p className="bs-sheet__quote">{PROMPT.thesis}</p>
          <p className="bs-sheet__text">{PROMPT.ask}</p>
          <ul className="bs-bring bs-bring--pairs">
            {PROMPT.principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="bs-sheet__more">
            <a href={PAGES.learn}>Open the learning deck →</a>
          </p>
        </Row>

        <Row title="How it works">
          <ol className="bs-steps">
            {PROGRAM.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </Row>

        <Row title="Schedule">
          <div className="bs-days">
            {DAYS.map((day) => (
              <section key={day.date} className="bs-day">
                <h3 className="bs-day__head">
                  <span className="bs-day__when">
                    {day.date} · {day.time}
                  </span>
                  <span>{day.title}</span>
                </h3>
                <ul className="bs-day__list">
                  {day.sessions.map(([time, session]) => (
                    <li key={session}>
                      <span className="bs-day__time">{time}</span>
                      {session}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Row>

        <Row title="Bring">
          <ul className="bs-bring">
            {PREP.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="bs-sheet__small">
            Light dinner on Friday, lunch and tea on Saturday, water and coffee all weekend. We&apos;ll
            share arrival details in{' '}
            <a href={EVENT.chatUrl} target="_blank" rel="noreferrer">
              the chat
            </a>
            .
          </p>
        </Row>

        <Row title="Projects">
          <p className="bs-sheet__text">
            Teams submit through the Road to Colosseum form. Projects that choose to go public show
            up in the gallery.
          </p>
          <p className="bs-sheet__more bs-links">
            <a href={EVENT.roadToColosseumUrl} target="_blank" rel="noreferrer">
              Submit your project →
            </a>
            <a href={PAGES.projects}>See the project gallery →</a>
          </p>
        </Row>

        <div className="bs-close">
          <p>{EVENT.closing}</p>
        </div>
      </div>
    </Layout>
  )
}
