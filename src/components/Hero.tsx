import heroBg from '../assets/figma/hero-bg.png'
import noise from '../assets/figma/noise.jpg'
import logoMark from '../assets/figma/logo-mark.svg'
import logoText from '../assets/figma/logo-text.svg'
import iconX from '../assets/figma/icon-x.svg'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden>
        <img className="hero__bg-image" src={heroBg} alt="" />
        <img className="hero__bg-noise" src={noise} alt="" />
        <div className="hero__bg-vignette" />
      </div>

      <header className="hero__header">
        <a className="hero__logo" href="/" aria-label="Superteam Vietnam">
          <img src={logoMark} alt="" className="hero__logo-mark" />
          <img src={logoText} alt="superteamvn" className="hero__logo-text" />
        </a>
        <nav className="hero__nav">
          <a
            className="hero__nav-link"
            href="https://x.com/SuperteamVN"
            target="_blank"
            rel="noreferrer"
          >
            <img src={iconX} alt="" />
            Connect on X
          </a>
          <a
            className="hero__nav-link"
            href="https://solana.com/news"
            target="_blank"
            rel="noreferrer"
          >
            News
          </a>
        </nav>
      </header>

      <div className="hero__content">
        <h1 className="hero__title">
          Vietnam's Home for
          <br />
          Solana Builders,
          <br />
          Founders &amp; Capital
        </h1>
        <p className="hero__sub">
          Shipping a product, raising a round, or backing the next one?
          <br />
          {' '}Find the people and resources to do it right here.
        </p>
        <div className="hero__actions">
          <a 
          className="btn btn--primary" 
          href="https://x.com/lynnwwins/status/2067959617397850121?s=46&t=WVuhZKP31n-CeEAK9wcf-g"
          target="_blank"
          rel="noreferrer"
          >
            Learn More
          </a>
          <a
            className="btn btn--outline"
            href="https://x.com/SuperteamVN"
            target="_blank"
            rel="noreferrer"
          >
            <img src={iconX} alt="" />
            Follow Us On X
          </a>
        </div>
      </div>
    </section>
  )
}
