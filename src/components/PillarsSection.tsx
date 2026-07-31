import ecoBg from '../assets/figma/eco-bg.png'
import objSphere from '../assets/figma/obj-sphere.png'
import objSquare from '../assets/figma/obj-square.png'
import objDynamic from '../assets/figma/obj-dynamic.png'
import './PillarsSection.css'

const PILLARS = [
  {
    image: objSphere,
    title: ['Institutional', 'Access'],
    tilt: 'left',
    description:
      'Bring banks, funds, and serious companies onto Solana — and open those doors for teams building here.',
  },
  {
    image: objSquare,
    title: ['Founder', 'Acceleration'],
    tilt: 'none',
    description:
      'Grow builders into founders who can raise: mentors, capital intros, and hands-on support.',
  },
  {
    image: objDynamic,
    title: ['Talent', 'Pipeline'],
    tilt: 'right',
    description:
      'A steady pipeline of proven builders — from bounties and workshops to full-time roles.',
  },
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
                <div className="pillar-card__meta">
                  <h3 className="pillar-card__title">
                    {pillar.title[0]}
                    <br />
                    {pillar.title[1]}
                  </h3>
                  <div className="pillar-card__desc-wrap">
                    <p className="pillar-card__desc">{pillar.description}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
