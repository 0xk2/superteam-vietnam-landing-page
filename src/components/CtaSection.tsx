import ctaBg from '../assets/figma/cta-bg.png'
import './CtaSection.css'

export default function CtaSection() {
  return (
    <section className="cta">
      <div className="cta__card">
        <img className="cta__bg" src={ctaBg} alt="" aria-hidden />
        <div className="cta__content">
          <h2 className="cta__title">Let's build the home ground</h2>
          <p className="cta__sub">
            Builder, investor, or partner who wants to build from Vietnam
            <br />— not just for it? Come talk to us.
          </p>
          <a
            className="btn btn--primary"
            href="https://x.com/SuperteamVN"
            target="_blank"
            rel="noreferrer"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}
