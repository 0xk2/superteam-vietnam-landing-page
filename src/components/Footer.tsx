import footerCaro from '../assets/figma/footer-caro.png'
import logoMark from '../assets/figma/footer-logo-mark.svg'
import logoText from '../assets/figma/footer-logo-text.svg'
import iconXLogo from '../assets/figma/icon-x-logo.svg'
import iconLinkedin from '../assets/figma/icon-linkedin.svg'
import iconEmail from '../assets/figma/icon-email.svg'
import iconFacebook from '../assets/figma/icon-facebook.svg'
import iconTelegram from '../assets/figma/icon-telegram.svg'
import './Footer.css'

const SOCIALS = [
  { icon: iconXLogo, label: 'Follow us on X', href: 'https://x.com/SuperteamVN' },
  {
    icon: iconTelegram,
    label: 'Join our Telegram channel',
    href: 'https://t.me/solanainvietnam',
  },
  {
    icon: iconLinkedin,
    label: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/company/superteam-vietnam/posts',
  },
  {
    icon: iconFacebook,
    label: 'Follow us on Facebook',
    href: 'https://www.facebook.com/solanasuperteamvietnam',
  },
  { icon: iconEmail, label: 'Email us', href: 'mailto:vietnam@superteam.fun' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__bg" aria-hidden>
        <img src={footerCaro} alt="" />
      </div>
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="footer__logo" href="/" aria-label="Superteam Vietnam">
              <img src={logoMark} alt="" className="footer__logo-mark" />
              <img src={logoText} alt="superteamvn" className="footer__logo-text" />
            </a>
            <p className="footer__tagline">
              Vietnam's home for Solana builders, founders &amp; capital. Keeping the value home.
              🇻🇳
            </p>
          </div>
          <div className="footer__connect">
            <p className="footer__connect-label">Connect With Us</p>
            <div className="footer__socials">
              {SOCIALS.map((social) => (
                <a
                  className="footer__social"
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  {...(social.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  <img src={social.icon} alt="" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="footer__copyright">© 2026 Superteam Vietnam. All rights reserved.</p>
      </div>
    </footer>
  )
}
