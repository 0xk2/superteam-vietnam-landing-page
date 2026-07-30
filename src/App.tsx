import Hero from './components/Hero'
import PillarsSection from './components/PillarsSection'
import SystemSection from './components/SystemSection'
import TeamSection from './components/TeamSection'
import OfficeHoursSection from './components/OfficeHoursSection'
import LearningHubSection from './components/LearningHubSection'
import CtaSection from './components/CtaSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <PillarsSection />
        <SystemSection />
        <div className="grid-band">
          <TeamSection />
          <OfficeHoursSection />
        </div>
        <LearningHubSection />
        <CtaSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
