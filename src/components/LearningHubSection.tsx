import hubBg from '../assets/figma/hub-bg.png'
import iconArrowRight from '../assets/figma/icon-arrow-right.svg'
import './LearningHubSection.css'

export default function LearningHubSection() {
  return (
    <section className="hub">
      <div className="hub__bg" aria-hidden>
        <img src={hubBg} alt="" />
      </div>
      <div className="hub__content">
        <h2 className="hub__title">Superteam VN Learning Hub</h2>
        <p className="section-sub">
          A library full of tips, docs, and helpful materials for you to build faster!
        </p>
        <a
          className="btn btn--outline"
          href="https://silent-neptune-5fe.notion.site/Superteam-Vietnam-Education-Hub-230c5ae0b57382d9be5301b45878650f"
          target="_blank"
          rel="noreferrer"
        >
          Access To Learning Hub
          <img src={iconArrowRight} alt="" />
        </a>
      </div>
    </section>
  )
}
