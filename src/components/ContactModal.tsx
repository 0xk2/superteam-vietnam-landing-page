import { useEffect, useRef, useState, type FormEvent } from 'react'
import iconClose from '../assets/figma/icon-close.svg'
import iconChevronDown from '../assets/figma/icon-chevron-down.svg'
import './ContactModal.css'

const INQUIRY_TYPES = ['Building a project', 'Investing', 'Partnership', 'Joining the community', 'Other']

const CONTACT_EMAIL = 'vietnam@superteam.fun'

// Apps Script web app: appends to the submissions sheet and mails a notification.
const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxjTUAPIzareof7gZyDQCOXWaN4-R4wV77-Z3efjP1ANtMOkilsw5UA9s1BUfPb13dJ/exec'
// Must match SECRET in the Apps Script. Public by nature - it only turns away drive-by bots.
const SECRET = 'st-vn-2c6747b43f12290f980b82426d8abe2c'

type Status = 'idle' | 'sending' | 'sent' | 'error'

type ContactModalProps = {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (open) setStatus('idle')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')

    try {
      // text/plain keeps this a simple request; Apps Script cannot answer a CORS preflight.
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          secret: SECRET,
          name: data.get('name'),
          contact: data.get('contact'),
          type: data.get('type'),
          message: data.get('message'),
          company: data.get('company'),
        }),
      })
      const result = await response.json()
      if (!result.ok) throw new Error(result.error ?? 'rejected')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="contact-modal__overlay"
      onMouseDown={(event) => {
        if (!dialogRef.current?.contains(event.target as Node)) onClose()
      }}
    >
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        ref={dialogRef}
      >
        <div className="contact-modal__header">
          <h3 className="contact-modal__title" id="contact-modal-title">
            Having a question,
            <br />
            or an idea worth building?
          </h3>
          <button className="contact-modal__close" onClick={onClose} aria-label="Close">
            <img src={iconClose} alt="" />
          </button>
        </div>

        <form className="contact-modal__form" onSubmit={handleSubmit}>
          <input
            className="contact-modal__honeypot"
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="contact-modal__row">
            <label className="contact-field">
              <span className="contact-field__label">Name</span>
              <input
                className="contact-field__input"
                type="text"
                name="name"
                placeholder="Your name"
                required
                autoFocus
              />
            </label>
            <label className="contact-field">
              <span className="contact-field__label">Email or Telegram</span>
              <input
                className="contact-field__input"
                type="text"
                name="contact"
                placeholder="Your answer"
                required
              />
            </label>
          </div>

          <label className="contact-field">
            <span className="contact-field__label">Inquiry type</span>
            <span className="contact-field__select-wrap">
              <select className="contact-field__input contact-field__select" name="type" defaultValue="" required>
                <option value="" disabled>
                  Select type
                </option>
                {INQUIRY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <img className="contact-field__chevron" src={iconChevronDown} alt="" />
            </span>
          </label>

          <label className="contact-field">
            <span className="contact-field__label">Message</span>
            <textarea
              className="contact-field__input contact-field__textarea"
              name="message"
              placeholder="Tell us what in your mind"
              rows={3}
              required
            />
          </label>

          <button
            className="btn btn--primary contact-modal__submit"
            type="submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send It Over'}
          </button>

          {status === 'sent' ? (
            <p className="contact-modal__status" role="status">
              Thanks - we got it. We'll get back to you soon.
            </p>
          ) : status === 'error' ? (
            <p className="contact-modal__status contact-modal__status--error" role="status">
              Something went wrong. Reach us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  )
}
