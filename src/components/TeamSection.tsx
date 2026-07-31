import photoLynn from '../assets/figma/photo-lynn.jpg'
import photoDaphne from '../assets/figma/photo-daphne.jpg'
import QuoteCard from './QuoteCard'
import './TeamSection.css'

const MEMBERS = [
  {
    photo: photoLynn,
    name: 'Lynn Nguyen',
    role: 'Country Lead',
    bio: "Paired with operators and investors who've actually shipped and raised on Solana - not a generic intro list.",
  },
  {
    photo: photoDaphne,
    name: 'Daphne',
    role: 'Operations Lead',
    bio: 'Driving Superteam Vietnam’s community programs, Solana partnerships, and local builder support with her marketing and growth expertise from Saros, Viction, and Coin98.',
  },
]

export default function TeamSection() {
  return (
    <section className="team">
      <div className="team__glow" aria-hidden />
      <div className="container team__quote">
        <QuoteCard />
      </div>
      <div className="container team__layout">
        <div className="team__intro">
          <h2 className="section-heading">The operators behind the builders</h2>
          <p className="section-sub">
            Our Members: Founders, operators, builders. A senior community of people building,
            funding, and operating Vietnam's most ambitious Solana teams.
          </p>
        </div>

        <div className="team__cards">
          {MEMBERS.map((member) => (
            <article className="team-card" key={member.name}>
              <img className="team-card__photo" src={member.photo} alt={member.name} />
              <div className="team-card__shade" aria-hidden />
              <div className="team-card__name">
                <span className="team-card__title">{member.name}</span>
                <span className="team-card__role">{member.role}</span>
              </div>
              <div className="team-card__bio">
                <span className="team-card__title team-card__title--lg">{member.name}</span>
                <span className="team-card__role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
