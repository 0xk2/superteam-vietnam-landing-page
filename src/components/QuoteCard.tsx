import quoteBg from '../assets/figma/quote-bg.png'
import quoteMark from '../assets/figma/quote-mark.svg'
import arrowDown from '../assets/figma/arrow-down-sm.svg'
import './QuoteCard.css'

export default function QuoteCard() {
  return (
    <figure className="quote-card">
      <img className="quote-card__bg" src={quoteBg} alt="" aria-hidden />
      <img className="quote-card__mark" src={quoteMark} alt="" aria-hidden />
      <blockquote className="quote-card__text">
        The real question for Vietnam was never access. It was conversion - turning volume into
        value, and keeping that value home.
      </blockquote>
      <figcaption className="quote-card__author">
        <span className="quote-card__author-text">
          <span className="quote-card__author-name">Lynn Nguyen</span>
          <span className="quote-card__author-role">Country Lead</span>
        </span>
        <img src={arrowDown} alt="" />
      </figcaption>
    </figure>
  )
}
