import objCube from '../assets/figma/obj-cube.png'
import objChest from '../assets/figma/obj-chest.png'
import './OfficeHoursSection.css'

const OFFERS = [
  {
    image: objCube,
    title: 'Mentor Matchmaking',
    description:
      "Paired with operators and investors who've actually shipped and raised on Solana - not a generic intro list.",
  },
  {
    image: objChest,
    title: 'Ecosystem Perks',
    description:
      "Exclusive discounts across build, ship, and growth: cloud/RPC credits, audits, legal, marketing tools - from Superteam's partner network.",
  },
]

export default function OfficeHoursSection() {
  return (
    <section className="office-hours" id="office-hours">
      <div className="container office-hours__inner">
        <div className="office-hours__intro">
          <h2 className="section-heading">
            Capital buys you time.
            <br />
            It doesn't buy you the room
          </h2>
          <p className="section-sub office-hours__sub">
            Two ways Superteam Vietnam gets verified teams closer to what actually moves them
            forward.
          </p>
        </div>

        <div className="office-hours__cards">
          {OFFERS.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <img className="offer-card__img" src={offer.image} alt="" />
              <div className="offer-card__content">
                <h3 className="offer-card__title">{offer.title}</h3>
                <p className="offer-card__desc">{offer.description}</p>
              </div>
            </article>
          ))}
        </div>

        <a
          className="btn btn--primary"
          href="https://docs.google.com/forms/d/e/1FAIpQLSe58Eq2Ig_DYQ6c1QvXrLOh34N32HgOnL_iSxnY8Gu_1zEvwA/viewform"
          target="_blank"
          rel="noreferrer"
        >
          Apply to Office Hours
        </a>
      </div>
    </section>
  )
}
