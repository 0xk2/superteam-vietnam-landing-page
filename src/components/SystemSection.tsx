import iconCoin from '../assets/figma/icon-coin.svg'
import iconHandMetal from '../assets/figma/icon-hand-metal.svg'
import iconRocket from '../assets/figma/icon-rocket.svg'
import iconBoxes from '../assets/figma/icon-boxes.svg'
import iconLightbulb from '../assets/figma/icon-lightbulb.svg'
import iconUser from '../assets/figma/icon-user.svg'
import iconArrowLink from '../assets/figma/icon-arrow-link.svg'
import watermark1 from '../assets/figma/watermark-logo1.png'
import watermark2 from '../assets/figma/watermark-logo2.png'
import './SystemSection.css'

type SystemItem = {
  icon: string
  title: string
  description: string
  cta?: { label: string; href: string }
  comingSoon?: boolean
}

const SYSTEMS: SystemItem[] = [
  {
    icon: iconCoin,
    title: 'Superteam Earn',
    description:
      'Earn crypto for your skills in development, design, and content. One profile gives you bounties, freelance gigs, and full-time roles from across Solana.',
    cta: { label: 'Earn Now', href: 'https://earn.superteam.fun/' },
  },
  {
    icon: iconHandMetal,
    title: 'Education',
    description:
      "Learn by building: workshops, bounties, and mentors who've actually shipped and raised on Solana.",
    cta: { label: 'Subscribe Our Luma', href: 'https://luma.com/superteam-vietnam?k=c' },
  },
  {
    icon: iconRocket,
    title: 'Instagrants',
    description:
      'Fast, equity-free funding for builders. Apply in minutes and hear back fast. Grants for code, content, community, and events.',
    comingSoon: true,
  },
  {
    icon: iconBoxes,
    title: 'Capital & Institutions',
    description:
      'Warm intros to investors, accelerators, and the institutions coming onto Solana.',
    cta: { label: 'Subscribe to Office Hours', href: '#office-hours' },
  },
  {
    icon: iconLightbulb,
    title: 'Idea Bank',
    description: 'Stuck on what to build? Grab a vetted idea and get going.',
    comingSoon: true,
  },
  {
    icon: iconUser,
    title: 'Mentor',
    description: 'Insights and guidance from quality network of mentors.',
    comingSoon: true,
  },
]

export default function SystemSection() {
  return (
    <section className="system">
      <img className="system__watermark system__watermark--left" src={watermark1} alt="" aria-hidden />
      <img className="system__watermark system__watermark--right" src={watermark2} alt="" aria-hidden />

      <div className="system__inner">
        <div className="system__intro">
          <h2 className="section-heading">
            <span className="nowrap">Earn here.</span> <span className="nowrap">Build here.</span>{' '}
            <span className="nowrap">Raise here.</span>
          </h2>
          <p className="section-sub">
            One system. Each step feeds the next, and the value compounds here.
          </p>
        </div>

        <div className="system__grid">
          {SYSTEMS.map((item) => (
            <article className="system-item" key={item.title}>
              <img className="system-item__icon" src={item.icon} alt="" />
              <div className="system-item__body">
                <h3 className="system-item__title">{item.title}</h3>
                <p className="system-item__desc">{item.description}</p>
              </div>
              {item.cta ? (
                <a className="system-item__cta" href={item.cta.href}>
                  {item.cta.label}
                  <img src={iconArrowLink} alt="" />
                </a>
              ) : item.comingSoon ? (
                <span className="system-item__badge">Coming Soon</span>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
