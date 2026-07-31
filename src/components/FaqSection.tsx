import { useState } from 'react'
import iconPlus from '../assets/figma/icon-plus.svg'
import watermark2 from '../assets/figma/watermark-logo2.png'
import './FaqSection.css'

/* Answers are placeholder copy drawn from the page's messaging — the design
   only specifies the questions. Edit freely. */
const FAQ_GROUPS = [
  {
    category: 'General',
    items: [
      {
        question: "What is Superteam Vietnam, and what's its mission?",
        answer:
          'The home for Solana builders, founders, and creators in Vietnam. Our mission is to turn local talent into funded companies, connecting builders to capital, partners, and institutions so the value they create stays in Vietnam.',
      },
      {
        question: 'How do I become a member?',
        answer:
          'Membership is earned through contribution: complete bounties on Superteam Earn, show up at events, and ship. Reach out to us on X to get started.',
      },
      {
        question: 'What are the benefits of joining?',
        answer:
          "Access to bounties and grants, warm intros to investors and mentors, ecosystem perks, and a network of people who've shipped and raised on Solana.",
      },
    ],
  },
  {
    category: 'Membership',
    items: [
      {
        question: 'Can I take part without being a "Member"?',
        answer:
          'Yes. Bounties, events, and most programs are open to everyone — membership just unlocks deeper access.',
      },
      {
        question: 'How active do I need to be to keep my membership?',
        answer:
          "There's no strict quota, but membership follows contribution. Stay engaged and keep building.",
      },
    ],
  },
  {
    category: 'For Projects',
    items: [
      {
        question: 'What kinds of projects do you support?',
        answer:
          'Teams building on Solana from Vietnam — DeFi, consumer, infra, payments, and more, from idea stage through raising.',
      },
      {
        question: 'What support can projects expect?',
        answer:
          'Grants, mentor matchmaking, investor intros, ecosystem perks, and hands-on help from operators.',
      },
      {
        question: 'Can international builders come build from Vietnam?',
        answer:
          'Absolutely — if you want to build from Vietnam, not just for it, come talk to us.',
      },
    ],
  },
  {
    category: 'Trust',
    items: [
      {
        question: 'Do you take equity or a cut?',
        answer: 'No. No token, no fees, no equity. Everything we do is free for builders.',
      },
    ],
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<string | null>(FAQ_GROUPS[0].items[0].question)

  return (
    <section className="faq" id="faq">
      <img className="faq__watermark" src={watermark2} alt="" aria-hidden />
      <div className="faq__inner">
        <h2 className="faq__heading">FAQ</h2>
        <div className="faq__groups">
          {FAQ_GROUPS.map((group) => (
            <div className="faq__group" key={group.category}>
              <p className="faq__category">{group.category}</p>
              <div>
                {group.items.map((item) => {
                    const isOpen = open === item.question
                    return (
                      <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`} key={item.question}>
                        <button
                          className="faq-item__toggle"
                          aria-expanded={isOpen}
                          onClick={() => setOpen(isOpen ? null : item.question)}
                        >
                          <span className="faq-item__question">{item.question}</span>
                          <img className="faq-item__icon" src={iconPlus} alt="" />
                        </button>
                        <div className="faq-item__answer">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
