import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import SocialSection from './components/SocialSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#FAE8E8] min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <MenuSection />
      <SocialSection />
      <Footer />
    </div>
  )
}
