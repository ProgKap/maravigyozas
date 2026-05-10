import { useEffect, useState } from 'react'
import { MessageCircle, Menu, X } from 'lucide-react'

const PHONE = '56985756785'
const WA_MSG = encodeURIComponent('Hola, me gustaría hacer un pedido de Maravigyozas.')

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-[#FFF8F8]/90 backdrop-blur-md shadow-[0_4px_24px_rgba(155,28,58,0.08)] border border-[#F2B8C6]/30'
              : 'bg-[#0d0608]/45 backdrop-blur-sm border border-white/10'
          }`}
        >
          <a href="#" className={`font-display font-black text-lg tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#9B1C3A]' : 'text-white'}`}>
            Maravigyozas
          </a>

          <div className="hidden md:flex items-center gap-8">
            {[['#menu', 'Menú'], ['#nosotros', 'Nosotros'], ['#redes', 'Contacto']].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors duration-150 ${scrolled ? 'text-[#1A1A1A]/60 hover:text-[#9B1C3A]' : 'text-white/80 hover:text-white'}`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${PHONE}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#9B1C3A] text-[#FFF8F8] text-sm font-display font-semibold rounded-xl hover:bg-[#7d1630] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_14px_rgba(155,28,58,0.3)]"
            >
              <MessageCircle size={13} strokeWidth={2} />
              Pedir ahora
            </a>
            <button
              className={`md:hidden p-1.5 transition-colors ${scrolled ? 'text-[#9B1C3A]' : 'text-white'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menú"
            >
              {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-2 bg-[#FFF8F8]/95 backdrop-blur-md rounded-2xl p-5 shadow-[0_8px_32px_rgba(155,28,58,0.1)] border border-[#F2B8C6]/30">
            <div className="flex flex-col gap-4">
              {[['#menu', 'Menú'], ['#nosotros', 'Nosotros'], ['#redes', 'Contacto']].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm font-medium text-[#1A1A1A]/60 hover:text-[#9B1C3A] transition-colors py-0.5"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a
                href={`https://wa.me/${PHONE}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#9B1C3A] text-[#FFF8F8] text-sm font-display font-semibold rounded-xl mt-2"
              >
                <MessageCircle size={14} strokeWidth={2} />
                Pedir ahora
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
