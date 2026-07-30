import ecoBg from '../assets/figma/eco-bg.png'
import objSphere from '../assets/figma/obj-sphere.png'
import objSquare from '../assets/figma/obj-square.png'
import objDynamic from '../assets/figma/obj-dynamic.png'
import quoteBg from '../assets/figma/quote-bg.png'
import quoteMark from '../assets/figma/quote-mark.svg'
import arrowDown from '../assets/figma/arrow-down-sm.svg'
import './PillarsSection.css'

const PILLARS = [
  { image: objSphere, title: ['Institutional', 'Access'], tilt: 'left' },
  { image: objSquare, title: ['Founder', 'Acceleration'], tilt: 'none' },
  { image: objDynamic, title: ['Talent', 'Pipeline'], tilt: 'right' },
] as const

export default function PillarsSection() {
  return (
    <section className="pillars" id="pillars">
      <div className="pillars__bg" aria-hidden>
        <img src={ecoBg} alt="" />
      </div>

      <div className="container">
        <div className="pillars__intro">
          <h2 className="section-heading">No token, no fees, no equity</h2>
          <p className="section-sub">
            We're here to help Vietnamese teams build, raise, and keep the value home.
          </p>
        </div>

        <div className="pillars__grid">
          {PILLARS.map((pillar, i) => (
            <div className="pillars__slot" key={pillar.title.join(' ')} style={{ ['--stagger' as string]: `${i * 40}px` }}>
              <article className={`pillar-card pillar-card--${pillar.tilt}`}>
                <div className="pillar-card__lines" aria-hidden />
                <div className="pillar-card__img">
                  <img src={pillar.image} alt="" />
                </div>
                <h3 className="pillar-card__title">
                  {pillar.title[0]}
                  <br />
                  {pillar.title[1]}
                </h3>
              </article>
            </div>
          ))}
        </div>

        <div className="pillars__quote-wrap">
          <figure className="quote-card">
            <img className="quote-card__bg" src={quoteBg} alt="" aria-hidden />
            <img className="quote-card__mark" src={quoteMark} alt="" aria-hidden />
            <blockquote className="quote-card__text">
              The real question for Vietnam was never access. It was conversion - turning volume
              into value, and keeping that value home.
            </blockquote>
            <figcaption className="quote-card__author">
              <span className="quote-card__author-text">
                <span className="quote-card__author-name">Lynn Nguyen</span>
                <span className="quote-card__author-role">Country Lead</span>
              </span>
              <img src={arrowDown} alt="" />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
