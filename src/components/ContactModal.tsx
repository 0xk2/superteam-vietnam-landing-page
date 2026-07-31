import { useEffect, useRef, type FormEvent } from 'react'
import iconClose from '../assets/figma/icon-close.svg'
import iconChevronDown from '../assets/figma/icon-chevron-down.svg'
import './ContactModal.css'

const INQUIRY_TYPES = ['Building a project', 'Investing', 'Partnership', 'Joining the community', 'Other']

const CONTACT_EMAIL = 'vietnam@superteam.fun'

type ContactModalProps = {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name') as string
    const contact = data.get('contact') as string
    const type = data.get('type') as string
    const message = data.get('message') as string
    const subject = encodeURIComponent(`[${type || 'Inquiry'}] from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nContact: ${contact}\nInquiry type: ${type}\n\n${message}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    onClose()
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

          <button className="btn btn--primary contact-modal__submit" type="submit">
            Send It Over
          </button>
        </form>
      </div>
    </div>
  )
}
