import { useCallback, useEffect, useState } from 'react'
import { EVENT } from '../data'
import Layout from '../Layout'

type Slide = {
  section: string
  title: string
  accent: string
  lede: string
  points: string[]
  resource?: { label: string; href: string }
  visual: 'thesis' | 'gap' | 'niches' | 'loop' | 'agents' | 'station'
}

const SLIDES: Slide[] = [
  {
    section: 'The prompt',
    title: 'Time became a market.',
    accent: 'What did it become for the user?',
    lede: 'time.fun explored a sharp idea: creators could publish access, communities could discover it, and time could become an exchangeable product.',
    points: [
      'The mechanism made a scarce human resource visible.',
      'Trading created attention, but attention alone did not prove repeatable user value.',
      'Your job is to keep the useful insight and redesign the product around one real community.',
    ],
    resource: { label: 'Explore Solana developer resources', href: 'https://solana.com/developers' },
    visual: 'thesis',
  },
  {
    section: 'The product gap',
    title: 'A market is not yet',
    accent: 'a complete product.',
    lede: 'A token can express demand. The product still needs to make the promised interaction clear, useful, and reliably delivered.',
    points: [
      'Who is the creator, and what kind of time are they actually offering?',
      'Why does the buyer need this interaction more than a message, booking link, or community membership?',
      'What happens after the trade so both sides trust the experience enough to repeat it?',
    ],
    resource: { label: 'Review Solana core concepts', href: 'https://solana.com/docs/core' },
    visual: 'gap',
  },
  {
    section: 'Choose a niche',
    title: 'Narrow users create',
    accent: 'stronger products.',
    lede: 'Do not begin with “everyone who has time.” Begin with a group that already exchanges expertise, attention, access, or collaboration.',
    points: [
      'Name the user narrowly enough that you could interview five of them this week.',
      'Identify the exact moment when time changes hands and what outcome follows.',
      'Only use an onchain mechanism when it improves discovery, coordination, ownership, or trust.',
    ],
    visual: 'niches',
  },
  {
    section: 'Build the loop',
    title: 'Design the exchange',
    accent: 'end to end.',
    lede: 'A working prototype should let one person move through the essential journey without the team explaining every step.',
    points: [
      'Publish: make the offer, rules, and availability legible.',
      'Exchange: show what the participant commits and what they receive.',
      'Deliver: complete the interaction, record evidence, and make the next action obvious.',
    ],
    resource: { label: 'Learn Solana development', href: 'https://solana.com/developers/courses' },
    visual: 'loop',
  },
  {
    section: 'Build with agents',
    title: 'Use AI to shorten',
    accent: 'the feedback loop.',
    lede: 'Agents are most useful when the team gives them a precise problem, checks the output, and returns with real evidence. They don’t replace product judgment.',
    points: [
      'Write a one-page product spec before generating the first interface.',
      'Ask the agent to implement one testable journey, then run and inspect it.',
      'Put the prototype in front of a user, record friction, and revise the spec before the next build.',
    ],
    visual: 'agents',
  },
  {
    section: 'The Build Station',
    title: 'Three days in Da Nang.',
    accent: 'Then on to Colosseum.',
    lede: 'Da Nang #BuildStation (25–27 September, Da Nang Blockchain Hub) is where teams push the work they started online, with mentors in the room. Prizes are awarded through Road to Colosseum.',
    points: [
      'Friday night: lock the user, problem, and smallest credible build.',
      'Saturday: implement, test, collect evidence, and publish the next version.',
      'Sunday: demonstrate, submit your project, and plan the next Colosseum iteration.',
    ],
    resource: { label: 'Join Colosseum', href: EVENT.colosseumUrl },
    visual: 'station',
  },
]

function Model({ type }: { type: Slide['visual'] }) {
  if (type === 'gap') {
    return (
      <div className="bs-model-columns">
        <div>
          <p className="bs-model__label">Market layer</p>
          <p className="bs-model__big">Discover · price · exchange</p>
        </div>
        <div>
          <p className="bs-model__label">Product layer</p>
          <p className="bs-model__big">Promise · deliver · repeat</p>
        </div>
      </div>
    )
  }

  if (type === 'niches') {
    return (
      <ul className="bs-model-grid">
        {['Mentors', 'Coaches', 'Local experts', 'Creative collaborators'].map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
    )
  }

  if (type === 'station') {
    return (
      <ol className="bs-model-list">
        {[
          ['Fri 25', 'Scope'],
          ['Sat 26', 'Build + test'],
          ['Sun 27', 'Demo + submit'],
          ['After', 'Continue in Colosseum'],
        ].map(([date, label]) => (
          <li key={date}>
            <span>{date}</span>
            {label}
          </li>
        ))}
      </ol>
    )
  }

  const steps = {
    thesis: ['Creator publishes access', 'Community discovers demand', 'Time becomes an exchange'],
    loop: ['Publish', 'Discover', 'Exchange', 'Deliver', 'Repeat'],
    agents: ['Specify', 'Build', 'Test and revise'],
  }[type]

  return (
    <ol className="bs-model-list">
      {steps.map((label, index) => (
        <li key={label}>
          <span>0{index + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  )
}

function initialSlide() {
  const raw = Number(new URL(window.location.href).searchParams.get('slide'))
  return Number.isInteger(raw) && raw >= 1 && raw <= SLIDES.length ? raw - 1 : 0
}

export default function Learn() {
  const [slideIndex, setSlideIndex] = useState(initialSlide)
  const [reveal, setReveal] = useState(0)
  const slide = SLIDES[slideIndex]
  const atStart = slideIndex === 0 && reveal === 0
  const atEnd = slideIndex === SLIDES.length - 1 && reveal === slide.points.length - 1

  const goTo = useCallback((index: number, revealed: number) => {
    setSlideIndex(index)
    setReveal(revealed)
    const url = new URL(window.location.href)
    url.searchParams.set('slide', String(index + 1))
    window.history.replaceState(null, '', url)
  }, [])

  const next = useCallback(() => {
    if (reveal < slide.points.length - 1) setReveal(reveal + 1)
    else if (slideIndex < SLIDES.length - 1) goTo(slideIndex + 1, 0)
  }, [goTo, reveal, slide.points.length, slideIndex])

  const previous = useCallback(() => {
    if (reveal > 0) setReveal(reveal - 1)
    else if (slideIndex > 0) goTo(slideIndex - 1, SLIDES[slideIndex - 1].points.length - 1)
  }, [goTo, reveal, slideIndex])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.target as HTMLElement).closest('a,button,input,textarea,select')) return
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault()
        next()
      }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        previous()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [next, previous])

  const progress = (slideIndex + (reveal + 1) / slide.points.length) / SLIDES.length
  const number = (value: number) => String(value).padStart(2, '0')

  return (
    <Layout current="learn">
      <section className="bs-deck">
        <div className="bs-deck__top">
          <span>
            {number(slideIndex + 1)} · {slide.section}
          </span>
          <span>
            {number(slideIndex + 1)} / {number(SLIDES.length)}
          </span>
        </div>
        <div className="bs-deck__progress" aria-hidden>
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>

        <div key={slideIndex} className="bs-deck__slide">
          <div>
            <h1 className="bs-deck__title">
              {slide.title} <span className="bs-red">{slide.accent}</span>
            </h1>
            <p className="bs-deck__lede">{slide.lede}</p>
            <ol className="bs-deck__points" aria-live="polite">
              {slide.points.slice(0, reveal + 1).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ol>
            {slide.resource && (
              <p className="bs-sheet__more">
                <a href={slide.resource.href} target="_blank" rel="noreferrer">
                  {slide.resource.label} ↗
                </a>
              </p>
            )}
          </div>
          <aside className="bs-deck__model">
            <p className="bs-model__label">Working model</p>
            <Model type={slide.visual} />
          </aside>
        </div>

        <div className="bs-deck__controls">
          <button type="button" className="bs-button bs-button--outline" onClick={previous} disabled={atStart}>
            ← Back
          </button>
          <span className="bs-deck__hint">Arrow keys or Space move through the deck.</span>
          <button type="button" className="bs-button" onClick={next} disabled={atEnd}>
            {reveal < slide.points.length - 1
              ? 'Reveal'
              : slideIndex < SLIDES.length - 1
                ? 'Next slide'
                : 'Complete'}{' '}
            →
          </button>
        </div>
      </section>
    </Layout>
  )
}
