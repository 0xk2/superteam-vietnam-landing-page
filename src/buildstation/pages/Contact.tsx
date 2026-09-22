import { useState, type FormEvent } from 'react'
import { EVENT, ORGANIZERS } from '../data'
import Layout, { PageHead, Row } from '../Layout'

const ORGANIZER_EMAIL = 'trunghieubui88@gmail.com'

function ContactForm() {
  const [draftOpened, setDraftOpened] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const field = (name: string) => {
      const value = formData.get(name)
      return typeof value === 'string' ? value.trim() : ''
    }
    const body = [`Name: ${field('name')}`, `Reply email: ${field('email')}`, '', field('message')].join('\n')
    const subject = `[Da Nang #BuildStation] ${field('subject')}`

    setDraftOpened(true)
    window.location.href = `mailto:${ORGANIZER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="bs-form" onSubmit={onSubmit}>
      <p className="bs-field__hint">
        This opens an email draft in your mail app. Nothing is stored on this site.
      </p>
      <div className="bs-form__pair">
        <div className="bs-field">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" required maxLength={120} autoComplete="name" placeholder="Your name" />
        </div>
        <div className="bs-field">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            required
            type="email"
            maxLength={240}
            autoComplete="email"
            spellCheck={false}
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="bs-field">
        <label htmlFor="subject">Subject *</label>
        <input id="subject" name="subject" required maxLength={160} placeholder="Mentoring, participation, media…" />
      </div>
      <div className="bs-field">
        <label htmlFor="message">Message *</label>
        <textarea id="message" name="message" required maxLength={4000} rows={7} placeholder="How can the organizing team help?" />
      </div>
      {draftOpened && (
        <p role="status" className="bs-muted">
          Email draft opened. Review it and press Send in your email app.
        </p>
      )}
      <button type="submit" className="bs-button">
        Send message
      </button>
    </form>
  )
}

export default function Contact() {
  return (
    <Layout current="contact">
      <div className="bs-page">
        <PageHead kicker="Da Nang #BuildStation" title="Contact the organizers">
          Questions about joining, mentoring, partnerships or media? Write to us.
        </PageHead>

        <Row title="Organizing team">
          <dl className="bs-facts bs-facts--plain">
            {ORGANIZERS.map((person) => (
              <div key={person.name}>
                <dt>{person.role}</dt>
                <dd>
                  <span className="bs-facts__line">{person.name}</span>
                  <span className="bs-facts__line bs-muted">{person.copy}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="bs-sheet__small">
            For quick questions, ask in the{' '}
            <a href={EVENT.chatUrl} target="_blank" rel="noreferrer">
              participant chat
            </a>
            .
          </p>
        </Row>

        <Row title="Send a message">
          <ContactForm />
        </Row>
      </div>
    </Layout>
  )
}
