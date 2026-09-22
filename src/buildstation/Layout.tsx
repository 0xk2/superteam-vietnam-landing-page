import type { ReactNode } from 'react'
import partners from './assets/partners.webp'
import { PAGES } from './config'
import { EVENT } from './data'

type Page = 'home' | 'learn' | 'projects' | 'contact'

const NAV: [Page, string][] = [
  ['home', 'Event'],
  ['learn', 'Learn'],
  ['projects', 'Projects'],
  ['contact', 'Contact'],
]

export function Actions({ small = false }: { small?: boolean }) {
  const size = small ? ' bs-button--small' : ''
  return (
    <div className="bs-actions">
      <a className={`bs-button${size}`} href={EVENT.colosseumUrl} target="_blank" rel="noreferrer">
        Join Colosseum
      </a>
      <a
        className={`bs-button bs-button--outline${size}`}
        href={EVENT.chatUrl}
        target="_blank"
        rel="noreferrer"
      >
        Join the chat
      </a>
    </div>
  )
}

export default function Layout({ current, children }: { current: Page; children: ReactNode }) {
  return (
    <>
      <header className="bs-bar">
        <div className="bs-bar__inner">
          <div className="bs-bar__row">
            <a className="bs-bar__back" href="/" aria-label="Back to vn.superteam.fun">
              ← <span className="bs-bar__back-label">vn.superteam.fun</span>
            </a>
            <Actions small />
          </div>
          <nav className="bs-nav" aria-label="Build Station">
            {NAV.map(([page, label]) => (
              <a key={page} href={PAGES[page]} aria-current={page === current ? 'page' : undefined}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bs-foot">
        <img src={partners} alt="Superteam Vietnam, Colosseum and Solana" />
        <p>
          Da Nang #BuildStation · a track of Road to Colosseum, organized by Superteam Vietnam ·{' '}
          <a href="mailto:vietnam@superteam.fun">vietnam@superteam.fun</a>
        </p>
      </footer>
    </>
  )
}

// One programme section: its name in the margin on wide screens, above it on phones.
export function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bs-row">
      <h2 className="bs-row__title">{title}</h2>
      <div className="bs-row__body">{children}</div>
    </section>
  )
}

// Title block for the inner pages, set like the programme headings.
export function PageHead({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="bs-pagehead">
      <p className="bs-pagehead__kicker">{kicker}</p>
      <h1 className="bs-pagehead__title">{title}</h1>
      {children && <div className="bs-pagehead__text">{children}</div>}
    </div>
  )
}
