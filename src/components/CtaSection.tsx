import { useState } from 'react'
import ctaBg from '../assets/figma/cta-bg.png'
import ContactModal from './ContactModal'
import './CtaSection.css'

export default function CtaSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="cta">
      <div className="cta__card">
        <img className="cta__bg" src={ctaBg} alt="" aria-hidden />
        <div className="cta__content">
          <h2 className="cta__title">Let's build the home ground</h2>
          <button className="btn btn--primary" onClick={() => setModalOpen(true)}>
            Get In Touch
          </button>
          <p className="cta__sub">
            Builder, investor, or partner who wants to build from Vietnam
            <br />— not just for it? Come talk to us.
          </p>
        </div>
      </div>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
